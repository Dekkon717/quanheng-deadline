export type LegalSource = {
  id: string;
  title: string;
  authority: string;
  effectiveFrom: string;
  provisions: string;
  url: string;
  verifiedAt: string;
};

export type LegalRule = {
  id: string;
  version: string;
  title: string;
  category: 'civil' | 'contract' | 'tort' | 'labor' | 'calendar' | 'transition';
  sourceIds: string[];
  provision: string;
  summary: string;
  duration?: { value: number; unit: 'year' };
  handling: 'automatic' | 'conditional' | 'manual';
  reviewStatus: 'pending_legal_review';
};

export const LEGAL_SOURCES: LegalSource[] = [
  {
    id: 'SRC-CIVIL-CODE',
    title: '《中华人民共和国民法典》',
    authority: '全国人民代表大会',
    effectiveFrom: '2021-01-01',
    provisions: '第188—203条',
    url: 'https://www.court.gov.cn/zixun/xiangqing/233181.html',
    verifiedAt: '2026-08-23',
  },
  {
    id: 'SRC-LIMITATION-JI',
    title: '《最高人民法院关于审理民事案件适用诉讼时效制度若干问题的规定》',
    authority: '最高人民法院',
    effectiveFrom: '2021-01-01',
    provisions: '第1—19条（2020年修正）',
    url: 'https://cicc.court.gov.cn/html/1/380/385/12837.html',
    verifiedAt: '2026-08-23',
  },
  {
    id: 'SRC-GENERAL-PART-JI',
    title: '《最高人民法院关于适用〈中华人民共和国民法典〉总则编若干问题的解释》',
    authority: '最高人民法院',
    effectiveFrom: '2022-03-01',
    provisions: '第35—38条',
    url: 'https://gongbao.court.gov.cn/Details/2dfca1b19663c57f990410a8a60795.html',
    verifiedAt: '2026-08-23',
  },
  {
    id: 'SRC-TEMPORAL-JI',
    title: '《最高人民法院关于适用〈中华人民共和国民法典〉时间效力的若干规定》',
    authority: '最高人民法院',
    effectiveFrom: '2021-01-01',
    provisions: '第1—4条及相关特别规定',
    url: 'https://www.court.gov.cn/fabu/xiangqing/282051.html',
    verifiedAt: '2026-08-23',
  },
  {
    id: 'SRC-LABOR-ARBITRATION',
    title: '《中华人民共和国劳动争议调解仲裁法》',
    authority: '全国人民代表大会常务委员会',
    effectiveFrom: '2008-05-01',
    provisions: '第27条',
    url: 'https://www.mohrss.gov.cn/SYrlzyhshbzb/ztzl/ldrszytjzc/fgzc/202207/t20220714_457857.html',
    verifiedAt: '2026-08-23',
  },
  {
    id: 'SRC-LABOR-CASE-RULES',
    title: '《劳动人事争议仲裁办案规则》',
    authority: '人力资源和社会保障部',
    effectiveFrom: '2017-07-01',
    provisions: '第19条、第26—28条',
    url: 'https://www.mohrss.gov.cn/wap/zc/zcwj/201705/t20170525_271415.html',
    verifiedAt: '2026-08-23',
  },
];

export const LEGAL_RULES: LegalRule[] = [
  {
    id: 'R-CIV-188-GENERAL',
    version: '2026.08.23-1',
    title: '一般三年诉讼时效',
    category: 'civil',
    sourceIds: ['SRC-CIVIL-CODE'],
    provision: '第188条',
    summary: '一般诉讼时效期间为三年；从权利人知道或者应当知道权利受损以及义务人之日起计算。',
    duration: { value: 3, unit: 'year' },
    handling: 'automatic',
    reviewStatus: 'pending_legal_review',
  },
  {
    id: 'R-CIV-189-INSTALLMENT',
    version: '2026.08.23-1',
    title: '同一债务分期履行',
    category: 'contract',
    sourceIds: ['SRC-CIVIL-CODE'],
    provision: '第189条',
    summary: '同一债务分期履行的，从最后一期履行期限届满之日起计算。',
    duration: { value: 3, unit: 'year' },
    handling: 'conditional',
    reviewStatus: 'pending_legal_review',
  },
  {
    id: 'R-CIV-194-SUSPENSION',
    version: '2026.08.23-1',
    title: '诉讼时效中止',
    category: 'civil',
    sourceIds: ['SRC-CIVIL-CODE', 'SRC-GENERAL-PART-JI'],
    provision: '民法典第194条、总则编司法解释第35条',
    summary: '最后六个月内出现法定障碍时适用专门计算；是否属于法定障碍往往需要事实判断。',
    handling: 'manual',
    reviewStatus: 'pending_legal_review',
  },
  {
    id: 'R-CIV-195-INTERRUPTION',
    version: '2026.08.23-1',
    title: '诉讼时效中断',
    category: 'civil',
    sourceIds: ['SRC-CIVIL-CODE', 'SRC-LIMITATION-JI', 'SRC-GENERAL-PART-JI'],
    provision: '民法典第195条、诉讼时效司法解释第8—16条、总则编司法解释第38条',
    summary: '法定中断事由发生后，从中断或有关程序终结时重新计算；第一版只处理证据明确的单次中断。',
    duration: { value: 3, unit: 'year' },
    handling: 'conditional',
    reviewStatus: 'pending_legal_review',
  },
  {
    id: 'R-CIV-200-CALENDAR',
    version: '2026.08.23-1',
    title: '民法期间计算',
    category: 'calendar',
    sourceIds: ['SRC-CIVIL-CODE'],
    provision: '第200—203条',
    summary: '按公历及对应日计算；开始当日不计入；没有对应日取月末；最后一日为法定休假日时依法顺延。',
    handling: 'automatic',
    reviewStatus: 'pending_legal_review',
  },
  {
    id: 'R-CONTRACT-NO-DUE',
    version: '2026.08.23-1',
    title: '未约定履行期限的合同',
    category: 'contract',
    sourceIds: ['SRC-LIMITATION-JI', 'SRC-CIVIL-CODE'],
    provision: '诉讼时效司法解释第4条；民法典第510—511条',
    summary: '依法可以确定履行期限的从期限届满日起算；不能确定的从催告宽限期届满日起算；首次主张时明确拒绝履行的，从明确拒绝日起算。',
    duration: { value: 3, unit: 'year' },
    handling: 'conditional',
    reviewStatus: 'pending_legal_review',
  },
  {
    id: 'R-TORT-GENERAL',
    version: '2026.08.23-1',
    title: '一般侵权请求权',
    category: 'tort',
    sourceIds: ['SRC-CIVIL-CODE'],
    provision: '第188条',
    summary: '在没有特别法时，适用一般三年期间；需同时确定知道或应当知道损害及义务人的时间。',
    duration: { value: 3, unit: 'year' },
    handling: 'conditional',
    reviewStatus: 'pending_legal_review',
  },
  {
    id: 'R-LABOR-27-GENERAL',
    version: '2026.08.23-1',
    title: '劳动争议一般仲裁时效',
    category: 'labor',
    sourceIds: ['SRC-LABOR-ARBITRATION'],
    provision: '第27条第1款',
    summary: '劳动争议申请仲裁的时效期间为一年，从知道或者应当知道权利被侵害之日起计算。',
    duration: { value: 1, unit: 'year' },
    handling: 'automatic',
    reviewStatus: 'pending_legal_review',
  },
  {
    id: 'R-LABOR-27-WAGE',
    version: '2026.08.23-1',
    title: '拖欠劳动报酬特别仲裁时效',
    category: 'labor',
    sourceIds: ['SRC-LABOR-ARBITRATION'],
    provision: '第27条第4款',
    summary: '劳动关系存续期间因拖欠劳动报酬发生争议，不受一般一年限制；劳动关系终止的，自终止之日起一年内提出。',
    duration: { value: 1, unit: 'year' },
    handling: 'conditional',
    reviewStatus: 'pending_legal_review',
  },
  {
    id: 'R-LABOR-27-INTERRUPTION',
    version: '2026.08.23-1',
    title: '劳动仲裁时效中断',
    category: 'labor',
    sourceIds: ['SRC-LABOR-ARBITRATION', 'SRC-LABOR-CASE-RULES'],
    provision: '调解仲裁法第27条第2款；仲裁办案规则第27条',
    summary: '向对方主张权利、请求有关部门救济或者对方同意履行义务时，仲裁时效中断并重新计算。第一版只处理证据明确的单次事件。',
    duration: { value: 1, unit: 'year' },
    handling: 'conditional',
    reviewStatus: 'pending_legal_review',
  },
  {
    id: 'R-LABOR-CALENDAR',
    version: '2026.08.23-1',
    title: '劳动仲裁期间计算衔接',
    category: 'calendar',
    sourceIds: ['SRC-LABOR-CASE-RULES'],
    provision: '仲裁办案规则第19条',
    summary: '仲裁期间的计算，本规则未规定的，仲裁委员会可以参照民事诉讼关于期间计算的规定执行。',
    handling: 'conditional',
    reviewStatus: 'pending_legal_review',
  },
  {
    id: 'R-TIME-CIVIL-CODE',
    version: '2026.08.23-1',
    title: '民法典时间效力',
    category: 'transition',
    sourceIds: ['SRC-TEMPORAL-JI'],
    provision: '第1—4条及相关特别规定',
    summary: '民法典施行前、施行后以及跨越施行日的法律事实，需先按时间效力规定选择法律。',
    handling: 'manual',
    reviewStatus: 'pending_legal_review',
  },
];

export function getRule(id: string) {
  return LEGAL_RULES.find((rule) => rule.id === id);
}

export function getSourcesForRules(ruleIds: string[]) {
  const sourceIds = new Set(
    ruleIds.flatMap((ruleId) => getRule(ruleId)?.sourceIds ?? []),
  );
  return LEGAL_SOURCES.filter((source) => sourceIds.has(source.id));
}
