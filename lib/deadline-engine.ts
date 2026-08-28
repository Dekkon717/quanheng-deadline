import {
  getDeadlineRule,
  getDeadlineSources,
  type DeadlineRule,
  type DeadlineSource,
  type DurationUnit,
} from './deadline-catalog.ts';

export type DeadlineCalculationInput = {
  ruleId: string;
  startDate: string;
  outerStartDate?: string;
  evaluationDate: string;
  disputed?: boolean;
  complexEvent?: boolean;
  anyAppeal?: boolean;
};

export type DeadlineCalculationResult = {
  outcome: 'calculated' | 'manual' | 'not_limited';
  status: 'not_due' | 'near' | 'possibly_expired' | 'manual' | 'not_limited';
  headline: string;
  deadline?: string;
  baseDeadline?: string;
  outerDeadline?: string;
  effectiveDate?: string;
  evaluationDate: string;
  rule: DeadlineRule;
  sources: DeadlineSource[];
  timeline: Array<{ label: string; date?: string; detail: string }>;
  warnings: string[];
  manualReasons: string[];
};

const DAY_MS = 86_400_000;

function parseISO(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function toISO(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function addCalendarDays(value: string, days: number) {
  return toISO(new Date(parseISO(value).getTime() + days * DAY_MS));
}

export function addCalendarMonths(value: string, months: number) {
  const date = parseISO(value);
  const targetMonthIndex = date.getUTCMonth() + months;
  const targetYear = date.getUTCFullYear() + Math.floor(targetMonthIndex / 12);
  const normalizedMonth = ((targetMonthIndex % 12) + 12) % 12;
  const lastDay = new Date(Date.UTC(targetYear, normalizedMonth + 1, 0)).getUTCDate();
  return toISO(new Date(Date.UTC(targetYear, normalizedMonth, Math.min(date.getUTCDate(), lastDay))));
}

export function addCalendarYears(value: string, years: number) {
  return addCalendarMonths(value, years * 12);
}

export function addDuration(value: string, duration: { value: number; unit: DurationUnit }) {
  if (duration.unit === 'day') return addCalendarDays(value, duration.value);
  if (duration.unit === 'month') return addCalendarMonths(value, duration.value);
  return addCalendarYears(value, duration.value);
}

function dayDiff(from: string, to: string) {
  return Math.floor((parseISO(to).getTime() - parseISO(from).getTime()) / DAY_MS);
}

function resultStatus(deadline: string, evaluationDate: string) {
  const remaining = dayDiff(evaluationDate, deadline);
  if (remaining < 0) return 'possibly_expired' as const;
  if (remaining <= 60) return 'near' as const;
  return 'not_due' as const;
}

function manual(rule: DeadlineRule, input: DeadlineCalculationInput, reasons: string[]): DeadlineCalculationResult {
  return {
    outcome: 'manual',
    status: 'manual',
    headline: '需要人工核对后再计算',
    evaluationDate: input.evaluationDate,
    rule,
    sources: getDeadlineSources(rule.sourceIds),
    timeline: [],
    warnings: ['系统不会用推测日期替代法定起算事实。'],
    manualReasons: reasons,
  };
}

export function calculateDeadline(input: DeadlineCalculationInput): DeadlineCalculationResult {
  const rule = getDeadlineRule(input.ruleId);
  if (!rule) throw new Error(`未知规则：${input.ruleId}`);
  const sources = getDeadlineSources(rule.sourceIds);

  if (rule.handling === 'not_limited') {
    return {
      outcome: 'not_limited', status: 'not_limited', headline: '法律明确：该请求权不适用诉讼时效', evaluationDate: input.evaluationDate,
      rule, sources, timeline: [{ label: '规则性质', detail: rule.ruleText }], warnings: rule.cautions, manualReasons: [],
    };
  }
  if (!rule.calculator || rule.handling === 'manual') {
    return manual(rule, input, ['该规则需要先完成法律性质、事实或多次事件判断，不能只凭一个日期自动计算。']);
  }
  if (!input.startDate || !input.evaluationDate) {
    return manual(rule, input, ['缺少法定起算日期或判断日期。']);
  }
  if (input.disputed) {
    return manual(rule, input, ['法定起算事实或“知道／应当知道”的日期存在争议。']);
  }
  if (input.complexEvent) {
    return manual(rule, input, ['存在中止、中断、持续侵害、多人送达争议或其他复杂事件。']);
  }
  if (rule.calculator.effectiveFrom && input.startDate < rule.calculator.effectiveFrom) {
    return manual(rule, input, [`起算事件早于该规则的施行日 ${rule.calculator.effectiveFrom}，应先进行新旧法衔接判断。`]);
  }
  if ((rule.id === 'appeal-judgment-15d' || rule.id === 'appeal-ruling-10d') && input.anyAppeal) {
    return manual(rule, input, ['已有当事人在法定期间内上诉，一审裁判不能按“无人上诉”路径计算生效日，应转入二审程序。']);
  }

  const baseDeadline = addDuration(input.startDate, rule.calculator.duration);
  const timeline = [
    { label: rule.calculator.startLabel, date: input.startDate, detail: rule.calculator.startHint },
    { label: '按法定期间计算的基础届满日', date: baseDeadline, detail: `${rule.calculator.duration.value}${rule.calculator.duration.unit === 'day' ? '日' : rule.calculator.duration.unit === 'month' ? '个月' : '年'}。` },
  ];

  if (rule.calculator.transition === 'ecology-2026' && input.startDate < '2026-08-15') {
    const oldDeadline = addCalendarYears(input.startDate, 3);
    if (oldDeadline < '2026-08-15') {
      return manual(rule, input, ['按原三年规则在2026年8月15日前已经届满，新法五年期间不恢复；仍需核对中止、中断等事实。']);
    }
    timeline.splice(1, 0, { label: '新旧法衔接检查', date: '2026-08-15', detail: '旧三年期间在法典施行日尚未届满，按时间效力规定适用五年期间。' });
  }

  let outerDeadline: string | undefined;
  let deadline = baseDeadline;
  if (rule.calculator.outerDuration) {
    if (!input.outerStartDate) return manual(rule, input, ['该规则同时存在最长期间，缺少最长期间的法定起算日期。']);
    if (input.outerStartDate > input.startDate) {
      return manual(rule, input, ['最长期间的起算日晚于一般期间起算日，日期关系可能填写错误，需要先核对事实。']);
    }
    outerDeadline = addDuration(input.outerStartDate, rule.calculator.outerDuration);
    timeline.push({ label: '最长期间届满日', date: outerDeadline, detail: rule.calculator.outerStartHint ?? '按法定最长期间计算。' });
    if (outerDeadline < deadline) {
      deadline = outerDeadline;
      timeline.push({ label: '采用更早届满日', date: deadline, detail: '最长期间早于主观起算期间，因此按最长期间控制。' });
    }
  }

  const status = resultStatus(deadline, input.evaluationDate);
  const isAppeal = rule.id === 'appeal-judgment-15d' || rule.id === 'appeal-ruling-10d';
  const effectiveDate = isAppeal ? deadline : undefined;
  const calendarWarning = rule.calculator.calendar === 'procedure'
    ? '诉讼期间开始当日不计入；最后一日为法定休假日的，依法顺延。系统当前给出未接入年度放假安排的基础日期。'
    : rule.calculator.calendar === 'administrative'
      ? '行政程序期限通常从法定起算事件次日起计；休假日顺延及特别程序规则应在提交材料前向受理机关复核。'
      : rule.calculator.calendar === 'criminal'
        ? '系统按公历对应日给出追诉期限基础节点；罪名、法定刑档、犯罪之日及刑法时间效力必须由办案人员复核。'
        : '按民法典期间规则计算；最后一日为法定休假日的，依法顺延。系统当前给出未接入年度放假安排的基础日期。';
  const warnings = [
    ...rule.cautions,
    calendarWarning,
    '结果仅为计算参考，不替代人民法院、检察机关、公安机关、行政复议机关、仲裁机构或其他有权机关对事实、证据和法律适用的认定。',
  ];

  if (isAppeal) {
    timeline.push({ label: '候选生效日', date: deadline, detail: '按无人上诉且所有有上诉权当事人期间均届满的前提给出；实务办事前应以法院生效证明或案件状态为准。' });
  }

  return {
    outcome: 'calculated', status,
    headline: status === 'possibly_expired'
      ? `按当前事实，可能已经超过${rule.nature}`
      : status === 'near'
        ? `${rule.nature}临近，请尽快处理`
        : `按当前事实，${rule.nature}尚未届满`,
    deadline, baseDeadline, outerDeadline, effectiveDate, evaluationDate: input.evaluationDate,
    rule, sources, timeline, warnings, manualReasons: [],
  };
}

export function formatChineseDate(value?: string) {
  if (!value) return '—';
  const [year, month, day] = value.split('-').map(Number);
  return `${year}年${month}月${day}日`;
}
