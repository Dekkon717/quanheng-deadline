import assert from 'node:assert/strict';
import { addCalendarYears, calculateLimitation, type CalculationInput } from '../lib/calculator.ts';
import { DEADLINE_RULES, DEADLINE_SOURCES } from '../lib/deadline-catalog.ts';
import { addCalendarMonths, calculateDeadline } from '../lib/deadline-engine.ts';

const base = (overrides: Partial<CalculationInput>): CalculationInput => ({
  caseType: 'contract',
  evaluationDate: '2026-08-23',
  suspension: 'none',
  interruptionCount: 'none',
  ...overrides,
});

const tests: Array<[string, () => void]> = [
  ['闰日按无对应日规则落到月末', () => {
    assert.equal(addCalendarYears('2024-02-29', 3), '2027-02-28');
  }],
  ['固定履行期限按三年对应日计算', () => {
    const result = calculateLimitation(base({ contractKind: 'fixed', dueDate: '2023-08-23' }));
    assert.equal(result.deadline, '2026-08-23');
    assert.equal(result.status, 'near');
  }],
  ['对应日次日才标记可能超过期间', () => {
    const result = calculateLimitation(base({ evaluationDate: '2026-08-24', contractKind: 'fixed', dueDate: '2023-08-23' }));
    assert.equal(result.status, 'possibly_expired');
  }],
  ['同一债务分期履行取最后一期', () => {
    const result = calculateLimitation(base({ contractKind: 'installment', lastInstallmentDate: '2024-01-31' }));
    assert.equal(result.deadline, '2027-01-31');
    assert.ok(result.ruleIds.includes('R-CIV-189-INSTALLMENT'));
  }],
  ['无履行期限按明确宽限期届满日', () => {
    const result = calculateLimitation(base({ contractKind: 'no_due', noDueTrigger: 'grace_end', graceEndDate: '2024-06-30' }));
    assert.equal(result.deadline, '2027-06-30');
  }],
  ['侵权起算取两个知悉日期的较晚者', () => {
    const result = calculateLimitation(base({ caseType: 'tort', tortKind: 'general', harmDate: '2023-01-01', knownHarmDate: '2023-02-01', knownObligorDate: '2023-04-15', knowledgeDisputed: false, continuousOrHidden: false }));
    assert.equal(result.startDate, '2023-04-15');
    assert.equal(result.deadline, '2026-04-15');
  }],
  ['知悉日期有争议时停止自动计算', () => {
    const result = calculateLimitation(base({ caseType: 'tort', tortKind: 'general', harmDate: '2023-01-01', knownHarmDate: '2023-02-01', knownObligorDate: '2023-04-15', knowledgeDisputed: true }));
    assert.equal(result.outcome, 'manual');
  }],
  ['民法典施行前事实进入时间效力门控', () => {
    const result = calculateLimitation(base({ contractKind: 'fixed', dueDate: '2020-12-31' }));
    assert.equal(result.outcome, 'manual');
    assert.ok(result.ruleIds.includes('R-TIME-CIVIL-CODE'));
  }],
  ['劳动关系存续中的报酬争议优先适用特别规则', () => {
    const result = calculateLimitation(base({ caseType: 'labor', laborKind: 'wage', employmentEnded: false, interruptionCount: 'multiple', suspension: 'unsure' }));
    assert.equal(result.outcome, 'not_limited');
  }],
  ['劳动关系终止后按一年计算', () => {
    const result = calculateLimitation(base({ caseType: 'labor', laborKind: 'overtime', employmentEnded: true, employmentEndDate: '2025-02-28' }));
    assert.equal(result.deadline, '2026-02-28');
    assert.ok(result.ruleIds.includes('R-LABOR-27-WAGE'));
  }],
  ['劳动仲裁单次中断调用劳动法源并重新计算一年', () => {
    const result = calculateLimitation(base({ caseType: 'labor', laborKind: 'other', laborKnownDate: '2025-01-01', interruptionCount: 'one', interruptionType: 'demand', interruptionDate: '2025-06-01', interruptionDocumented: true }));
    assert.equal(result.deadline, '2026-06-01');
    assert.ok(result.ruleIds.includes('R-LABOR-27-INTERRUPTION'));
    assert.ok(!result.ruleIds.includes('R-CIV-195-INTERRUPTION'));
  }],
  ['发生在基础期间届满后的中断事件转人工', () => {
    const result = calculateLimitation(base({ contractKind: 'fixed', dueDate: '2021-01-01', interruptionCount: 'one', interruptionType: 'demand', interruptionDate: '2024-01-02', interruptionDocumented: true }));
    assert.equal(result.outcome, 'manual');
  }],
  ['诉讼或仲裁程序从程序终结日重新计算', () => {
    const result = calculateLimitation(base({ contractKind: 'fixed', dueDate: '2023-01-01', interruptionCount: 'one', interruptionType: 'proceeding', interruptionDate: '2024-01-01', proceedingEndDate: '2025-03-18', interruptionDocumented: true }));
    assert.equal(result.deadline, '2028-03-18');
  }],
  ['规则库每项法源均可追溯且规则编号不重复', () => {
    const sourceIds = new Set(DEADLINE_SOURCES.map((source) => source.id));
    assert.equal(new Set(DEADLINE_RULES.map((rule) => rule.id)).size, DEADLINE_RULES.length);
    assert.ok(DEADLINE_RULES.length >= 60);
    for (const rule of DEADLINE_RULES) {
      assert.ok(rule.sourceIds.length > 0, `${rule.id} 缺少法源`);
      for (const sourceId of rule.sourceIds) assert.ok(sourceIds.has(sourceId), `${rule.id} 引用了未知法源 ${sourceId}`);
    }
  }],
  ['按月计算遇到无对应日取月末', () => {
    assert.equal(addCalendarMonths('2026-08-31', 6), '2027-02-28');
  }],
  ['产品责任采用两年并受十年最长期间控制', () => {
    const result = calculateDeadline({ ruleId: 'product-2y', startDate: '2025-01-01', outerStartDate: '2017-01-01', evaluationDate: '2026-08-23' });
    assert.equal(result.deadline, '2027-01-01');
    assert.equal(result.outerDeadline, '2027-01-01');
  }],
  ['生态环境旧三年已届满时不自动恢复为五年', () => {
    const result = calculateDeadline({ ruleId: 'ecology-5y', startDate: '2023-08-14', evaluationDate: '2026-08-23' });
    assert.equal(result.outcome, 'manual');
  }],
  ['生态环境旧三年未届满时按五年新规则衔接', () => {
    const result = calculateDeadline({ ruleId: 'ecology-5y', startDate: '2023-08-16', evaluationDate: '2026-08-23' });
    assert.equal(result.deadline, '2028-08-16');
  }],
  ['新仲裁法撤销裁决期限为收到后三个月', () => {
    const result = calculateDeadline({ ruleId: 'arbitral-setaside-3m', startDate: '2026-03-31', evaluationDate: '2026-04-01' });
    assert.equal(result.deadline, '2026-06-30');
  }],
  ['一审判决无人上诉候选生效节点为最后送达后十五日', () => {
    const result = calculateDeadline({ ruleId: 'appeal-judgment-15d', startDate: '2026-08-01', evaluationDate: '2026-08-10', anyAppeal: false });
    assert.equal(result.deadline, '2026-08-16');
    assert.equal(result.effectiveDate, '2026-08-16');
  }],
  ['一审判决已有上诉时停止计算无人上诉生效日', () => {
    const result = calculateDeadline({ ruleId: 'appeal-judgment-15d', startDate: '2026-08-01', evaluationDate: '2026-08-10', anyAppeal: true });
    assert.equal(result.outcome, 'manual');
  }],
  ['不适用诉讼时效规则不生成届满日', () => {
    const result = calculateDeadline({ ruleId: 'not-limited-property-return', startDate: '', evaluationDate: '2026-08-23' });
    assert.equal(result.outcome, 'not_limited');
    assert.equal(result.deadline, undefined);
  }],
  ['海运货物追偿补充期间按九十日计算', () => {
    const result = calculateDeadline({ ruleId: 'maritime-cargo-recourse-90d', startDate: '2026-05-01', evaluationDate: '2026-05-02' });
    assert.equal(result.deadline, '2026-07-30');
  }],
];

for (const [name, run] of tests) {
  run();
  console.log(`✓ ${name}`);
}

console.log(`\n${tests.length} 项规则测试全部通过。`);
