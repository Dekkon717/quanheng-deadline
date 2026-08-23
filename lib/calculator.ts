import { getRule, getSourcesForRules, type LegalSource } from './legal-rules.ts';

export type CaseType = 'contract' | 'tort' | 'labor';
export type InterruptionType = 'demand' | 'acknowledgement' | 'proceeding';

export type CalculationInput = {
  caseType: CaseType;
  evaluationDate: string;
  contractKind?: 'fixed' | 'installment' | 'no_due';
  dueDate?: string;
  lastInstallmentDate?: string;
  noDueTrigger?: 'grace_end' | 'refusal';
  graceEndDate?: string;
  refusalDate?: string;
  tortKind?: 'general' | 'possible_special';
  harmDate?: string;
  knownHarmDate?: string;
  knownObligorDate?: string;
  knowledgeDisputed?: boolean;
  continuousOrHidden?: boolean;
  laborKind?: 'wage' | 'overtime' | 'other';
  employmentEnded?: boolean;
  employmentEndDate?: string;
  laborKnownDate?: string;
  suspension?: 'none' | 'yes' | 'unsure';
  interruptionCount?: 'none' | 'one' | 'multiple' | 'unsure';
  interruptionType?: InterruptionType;
  interruptionDate?: string;
  proceedingEndDate?: string;
  interruptionDocumented?: boolean;
};

export type TimelineItem = {
  label: string;
  date?: string;
  detail: string;
};

export type CalculationResult = {
  outcome: 'calculated' | 'manual' | 'not_limited';
  status: 'not_due' | 'near' | 'possibly_expired' | 'manual' | 'not_limited';
  headline: string;
  deadline?: string;
  startDate?: string;
  evaluationDate: string;
  ruleIds: string[];
  sources: LegalSource[];
  timeline: TimelineItem[];
  assumptions: string[];
  warnings: string[];
  manualReasons: string[];
};

const CIVIL_CODE_EFFECTIVE = '2021-01-01';

function parseISO(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function toISO(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function addCalendarYears(value: string, years: number) {
  const date = parseISO(value);
  const targetYear = date.getUTCFullYear() + years;
  const targetMonth = date.getUTCMonth();
  const originalDay = date.getUTCDate();
  const lastDay = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
  return toISO(new Date(Date.UTC(targetYear, targetMonth, Math.min(originalDay, lastDay))));
}

function dayDiff(from: string, to: string) {
  return Math.floor((parseISO(to).getTime() - parseISO(from).getTime()) / 86_400_000);
}

function laterDate(a: string, b: string) {
  return a >= b ? a : b;
}

function manualResult(input: CalculationInput, reasons: string[], ruleIds: string[], warnings: string[] = []): CalculationResult {
  return {
    outcome: 'manual',
    status: 'manual',
    headline: '当前事实需要人工判断',
    evaluationDate: input.evaluationDate,
    ruleIds,
    sources: getSourcesForRules(ruleIds),
    timeline: [],
    assumptions: [],
    warnings,
    manualReasons: reasons,
  };
}

function resultStatus(deadline: string, evaluationDate: string) {
  const remaining = dayDiff(evaluationDate, deadline);
  if (remaining < 0) return 'possibly_expired' as const;
  if (remaining <= 60) return 'near' as const;
  return 'not_due' as const;
}

function finalize(
  input: CalculationInput,
  startDate: string,
  years: number,
  ruleIds: string[],
  timeline: TimelineItem[],
  assumptions: string[],
  originalRightDate?: string,
): CalculationResult {
  let deadline = addCalendarYears(startDate, years);
  const interruptionRuleId = input.caseType === 'labor'
    ? 'R-LABOR-27-INTERRUPTION'
    : 'R-CIV-195-INTERRUPTION';
  const warnings = [
    '基础届满日如属于法定休假日，应依法顺延至休假结束的次日。本版本未接入届满年度的国务院放假安排，请在实际办理前核对。',
    '计算只依据你填写的日期和已选择规则，不代表法院或仲裁机构对证据及法律性质的最终认定。',
  ];

  if (input.interruptionCount === 'one') {
    const initialDeadline = deadline;
    if (!input.interruptionDocumented || !input.interruptionDate) {
      return manualResult(input, ['单次中断事件缺少明确日期或可核验凭证，不能安全地重新起算。'], [...ruleIds, interruptionRuleId]);
    }
    if (input.interruptionDate < startDate) {
      return manualResult(input, ['填写的中断日期早于原起算日，需要核对事件顺序。'], [...ruleIds, interruptionRuleId]);
    }
    if (input.interruptionDate > initialDeadline) {
      return manualResult(input, ['该事件发生在基础诉讼时效届满之后，是否构成放弃时效抗辩或产生其他法律效果需要另行判断。'], [...ruleIds, interruptionRuleId]);
    }
    let resetDate = input.interruptionDate;
    if (input.interruptionType === 'proceeding') {
      if (!input.proceedingEndDate || input.proceedingEndDate < input.interruptionDate) {
        return manualResult(input, ['诉讼或仲裁程序中断需要有关程序终结日期，当前信息不足。'], [...ruleIds, interruptionRuleId]);
      }
      resetDate = input.proceedingEndDate;
    }
    deadline = addCalendarYears(resetDate, years);
    ruleIds.push(interruptionRuleId);
    timeline.push({
      label: '时效重新计算',
      date: resetDate,
      detail: input.interruptionType === 'proceeding' ? '按有关程序终结日重新计算。' : '按有凭证的单次中断事件重新计算。',
    });
    assumptions.push('你填写的中断事件真实、有效，且相关凭证能够证明事件发生及到达。');
  }

  if (originalRightDate && addCalendarYears(originalRightDate, 20) < deadline) {
    return manualResult(input, ['候选届满日触及二十年最长保护期间；持续主张、多次中断等情形不能机械截断，第一版不自动计算。'], [...ruleIds, 'R-CIV-188-GENERAL']);
  }

  timeline.push({ label: '基础届满日', date: deadline, detail: `按公历对应日计算${years}年。` });
  const status = resultStatus(deadline, input.evaluationDate);
  return {
    outcome: 'calculated',
    status,
    headline: status === 'possibly_expired' ? '可能已经超过期间' : status === 'near' ? '期间临近，请尽快处理' : '按当前信息，期间尚未届满',
    deadline,
    startDate,
    evaluationDate: input.evaluationDate,
    ruleIds,
    sources: getSourcesForRules(ruleIds),
    timeline,
    assumptions,
    warnings,
    manualReasons: [],
  };
}

export function calculateLimitation(input: CalculationInput): CalculationResult {
  if (!input.evaluationDate) {
    return manualResult(input, ['缺少用于判断的日期。'], []);
  }

  // 劳动关系存续期间的拖欠劳动报酬适用特别规则，不先套用普通的一年时效及其中止、中断。
  if (
    input.caseType === 'labor'
    && (input.laborKind === 'wage' || input.laborKind === 'overtime')
    && !input.employmentEnded
  ) {
    const ruleIds = ['R-LABOR-27-GENERAL', 'R-LABOR-27-WAGE', 'R-LABOR-CALENDAR'];
    return {
      outcome: 'not_limited',
      status: 'not_limited',
      headline: '劳动关系存续期间不受一般一年限制',
      evaluationDate: input.evaluationDate,
      ruleIds,
      sources: getSourcesForRules(ruleIds),
      timeline: [{ label: '劳动关系仍在存续', detail: '拖欠劳动报酬争议适用特别仲裁时效规则。' }],
      assumptions: ['请求项目确实属于劳动报酬；加班费按最高人民法院、人力资源社会保障部联合发布的典型案例作为劳动报酬处理。'],
      warnings: ['这不表示权利永久不受限制；劳动关系终止后，应自终止之日起一年内提出。', '请求项目是否属于劳动报酬仍可能依案件事实产生争议。'],
      manualReasons: [],
    };
  }

  if (input.suspension !== 'none') {
    const ruleIds = input.caseType === 'labor'
      ? ['R-LABOR-27-GENERAL']
      : ['R-CIV-194-SUSPENSION'];
    return manualResult(input, ['存在或可能存在时效中止事由。第一版不对法定障碍及其消除时间自动定性。'], ruleIds);
  }
  if (input.interruptionCount === 'multiple' || input.interruptionCount === 'unsure') {
    const interruptionRuleId = input.caseType === 'labor'
      ? 'R-LABOR-27-INTERRUPTION'
      : 'R-CIV-195-INTERRUPTION';
    return manualResult(input, ['存在多次中断或中断次数不确定，需要逐一核验事件效力与重新起算顺序。'], [interruptionRuleId]);
  }

  if (input.caseType === 'contract') {
    let startDate = '';
    const ruleIds = ['R-CIV-188-GENERAL', 'R-CIV-200-CALENDAR'];
    const timeline: TimelineItem[] = [];
    const assumptions = ['该请求权不适用其他特别法时效，也不属于除斥期间或不适用诉讼时效的请求权。'];

    if (input.contractKind === 'fixed' && input.dueDate) {
      startDate = input.dueDate;
      timeline.push({ label: '履行期限届满', date: startDate, detail: '按你提供的书面合同履行期限作为基础起算事件。' });
      assumptions.push('合同约定的履行期限明确、有效，且到期未履行。');
    } else if (input.contractKind === 'installment' && input.lastInstallmentDate) {
      startDate = input.lastInstallmentDate;
      ruleIds.push('R-CIV-189-INSTALLMENT');
      timeline.push({ label: '最后一期履行期限届满', date: startDate, detail: '按同一债务分期履行规则计算。' });
      assumptions.push('各期属于同一债务，而非相互独立的多笔债务。');
    } else if (input.contractKind === 'no_due') {
      ruleIds.push('R-CONTRACT-NO-DUE');
      if (input.noDueTrigger === 'grace_end' && input.graceEndDate) {
        startDate = input.graceEndDate;
        timeline.push({ label: '催告宽限期届满', date: startDate, detail: '未约定履行期限且不能另行确定时，按明确宽限期届满日计算。' });
        assumptions.push('合同履行期限无法依民法典第510、511条确定，且催告及宽限期已经有效到达债务人。');
      } else if (input.noDueTrigger === 'refusal' && input.refusalDate) {
        startDate = input.refusalDate;
        timeline.push({ label: '债务人明确拒绝履行', date: startDate, detail: '按债务人在首次主张时明确拒绝履行之日计算。' });
        assumptions.push('债务人的表示足以构成明确拒绝履行，并有证据固定。');
      } else {
        return manualResult(input, ['未约定履行期限的合同缺少宽限期届满日或明确拒绝履行日。'], ruleIds);
      }
    } else {
      return manualResult(input, ['合同履行方式或关键日期未填写完整。'], ruleIds);
    }

    if (startDate < CIVIL_CODE_EFFECTIVE) {
      return manualResult(input, ['基础起算事件发生在民法典施行前，需要先适用时间效力规定选择新旧法律。'], [...ruleIds, 'R-TIME-CIVIL-CODE']);
    }
    return finalize(input, startDate, getRule('R-CIV-188-GENERAL')?.duration?.value ?? 3, ruleIds, timeline, assumptions, startDate);
  }

  if (input.caseType === 'tort') {
    const ruleIds = ['R-CIV-188-GENERAL', 'R-TORT-GENERAL', 'R-CIV-200-CALENDAR'];
    if (input.tortKind !== 'general') {
      return manualResult(input, ['该侵权可能适用知识产权、产品责任、环境、海事等特别法律期限，未找到并匹配特别法前不能套用一般三年期间。'], ruleIds);
    }
    if (input.continuousOrHidden) {
      return manualResult(input, ['持续侵权、隐蔽侵权或损害结果迟延显现，需要结合证据判断起算点。'], ruleIds);
    }
    if (input.knowledgeDisputed) {
      return manualResult(input, ['“知道或者应当知道”的时间存在争议，日期算法不能代替法院的证据判断。'], ruleIds);
    }
    if (!input.harmDate || !input.knownHarmDate || !input.knownObligorDate) {
      return manualResult(input, ['缺少损害发生日、知道损害日或知道义务人日。'], ruleIds);
    }
    if (input.harmDate < CIVIL_CODE_EFFECTIVE) {
      return manualResult(input, ['侵权事实发生在民法典施行前，需要先按时间效力规定选择法律。'], [...ruleIds, 'R-TIME-CIVIL-CODE']);
    }
    const startDate = laterDate(input.knownHarmDate, input.knownObligorDate);
    return finalize(
      input,
      startDate,
      3,
      ruleIds,
      [{ label: '两个知悉要素均已具备', date: startDate, detail: '取知道损害与知道义务人两个日期中较晚者，仅作为你所填事实下的计算。' }],
      ['损害、义务人和知悉日期均无争议。', '该侵权不适用任何特别法时效。'],
      input.harmDate,
    );
  }

  const ruleIds = ['R-LABOR-27-GENERAL', 'R-LABOR-CALENDAR'];
  if (input.laborKind === 'wage' || input.laborKind === 'overtime') {
    ruleIds.push('R-LABOR-27-WAGE');
    if (!input.employmentEndDate) {
      return manualResult(input, ['劳动关系已经终止，但缺少终止日期。'], ruleIds);
    }
    return finalize(
      input,
      input.employmentEndDate,
      1,
      ruleIds,
      [{ label: '劳动关系终止', date: input.employmentEndDate, detail: '拖欠劳动报酬争议从劳动关系终止日起计算一年。' }],
      ['请求项目属于劳动报酬，劳动关系终止日期无争议。'],
    );
  }

  if (!input.laborKnownDate || input.knowledgeDisputed) {
    return manualResult(input, ['普通劳动争议缺少无争议的“知道或者应当知道权利被侵害”日期。'], ruleIds);
  }
  return finalize(
    input,
    input.laborKnownDate,
    1,
    ruleIds,
    [{ label: '知道权利被侵害', date: input.laborKnownDate, detail: '普通劳动争议从该日计算一年仲裁时效。' }],
    ['该请求不属于劳动关系存续期间拖欠劳动报酬的特别情形。'],
  );
}

export function formatChineseDate(value?: string) {
  if (!value) return '—';
  const [year, month, day] = value.split('-').map(Number);
  return `${year}年${month}月${day}日`;
}
