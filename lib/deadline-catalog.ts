export type DeadlineGroup =
  | 'general'
  | 'special'
  | 'arbitration'
  | 'exclusion'
  | 'security'
  | 'procedure'
  | 'not_limited'
  | 'criminal_prosecution'
  | 'administrative_litigation'
  | 'administrative_reconsideration';

export type DurationUnit = 'day' | 'month' | 'year';

export type DeadlineSource = {
  id: string;
  title: string;
  authority: string;
  effectiveFrom: string;
  status: '现行有效' | '历史规则';
  url: string;
  verifiedAt: string;
};

export type CalculatorConfig = {
  duration: { value: number; unit: DurationUnit };
  startLabel: string;
  startHint: string;
  outerDuration?: { value: number; unit: DurationUnit };
  outerStartLabel?: string;
  outerStartHint?: string;
  effectiveFrom?: string;
  transition?: 'ecology-2026';
  calendar: 'civil' | 'procedure' | 'criminal' | 'administrative';
};

export type DeadlineRule = {
  id: string;
  title: string;
  group: DeadlineGroup;
  domain: string;
  nature: string;
  provision: string;
  sourceIds: string[];
  ruleText: string;
  handling: 'automatic' | 'conditional' | 'manual' | 'not_limited';
  calculator?: CalculatorConfig;
  cautions: string[];
  keywords: string[];
};

export const DEADLINE_GROUPS: Array<{ id: DeadlineGroup; label: string; description: string }> = [
  { id: 'general', label: '普通诉讼时效', description: '民法典一般规则、特殊起算点与中止中断' },
  { id: 'special', label: '特别诉讼时效', description: '保险、产品、知识产权、生态环境、海事航空' },
  { id: 'arbitration', label: '仲裁时效', description: '劳动、农村土地和商事仲裁救济期限' },
  { id: 'exclusion', label: '除斥与权利行使期', description: '撤销权、解除权、优先购买权等不变期间' },
  { id: 'security', label: '担保与优先权', description: '保证期间、抵押权、工程价款优先权' },
  { id: 'procedure', label: '诉讼与执行期限', description: '上诉、生效、再审、第三人撤销和申请执行' },
  { id: 'not_limited', label: '不适用诉讼时效', description: '法律明确排除诉讼时效的请求权' },
  { id: 'criminal_prosecution', label: '刑事追诉期限', description: '按法定最高刑分档计算，并识别不受期限限制情形' },
  { id: 'administrative_litigation', label: '行政起诉期限', description: '直接起诉、复议后起诉、不履职和最长起诉期限' },
  { id: 'administrative_reconsideration', label: '行政复议申请期限', description: '六十日申请期、未告知情形与五年/二十年上限' },
];

export const DEADLINE_SOURCES: DeadlineSource[] = [
  { id: 'civil-code', title: '《中华人民共和国民法典》', authority: '全国人民代表大会', effectiveFrom: '2021-01-01', status: '现行有效', url: 'https://www.court.gov.cn/zixun/xiangqing/233181.html', verifiedAt: '2026-08-23' },
  { id: 'limitation-ji', title: '《最高人民法院关于审理民事案件适用诉讼时效制度若干问题的规定》', authority: '最高人民法院', effectiveFrom: '2021-01-01', status: '现行有效', url: 'https://cicc.court.gov.cn/html/1/380/385/12837.html', verifiedAt: '2026-08-23' },
  { id: 'general-part-ji', title: '《最高人民法院关于适用〈中华人民共和国民法典〉总则编若干问题的解释》', authority: '最高人民法院', effectiveFrom: '2022-03-01', status: '现行有效', url: 'https://gongbao.court.gov.cn/Details/2dfca1b19663c57f990410a8a60795.html', verifiedAt: '2026-08-23' },
  { id: 'temporal-ji', title: '《最高人民法院关于适用〈中华人民共和国民法典〉时间效力的若干规定》', authority: '最高人民法院', effectiveFrom: '2021-01-01', status: '现行有效', url: 'https://cicc.court.gov.cn/html/1/380/385/12836.html', verifiedAt: '2026-08-23' },
  { id: 'labor-arbitration', title: '《中华人民共和国劳动争议调解仲裁法》', authority: '全国人民代表大会常务委员会', effectiveFrom: '2008-05-01', status: '现行有效', url: 'https://www.npc.gov.cn/WZWSREL3pncmR3L25wYy8vLy94aW53ZW4vbGZnei96eGZsLzIwMDctMTIvMjkvY29udGVudF8xMzg3ODA5Lmh0bQ%3D%3D', verifiedAt: '2026-08-23' },
  { id: 'rural-arbitration', title: '《中华人民共和国农村土地承包经营纠纷调解仲裁法》', authority: '全国人民代表大会常务委员会', effectiveFrom: '2010-01-01', status: '现行有效', url: 'https://www.npc.gov.cn/c2/c12435/c12488/201905/t20190522_61926.html', verifiedAt: '2026-08-23' },
  { id: 'arbitration-law', title: '《中华人民共和国仲裁法》（2025年修订）', authority: '全国人民代表大会常务委员会', effectiveFrom: '2026-03-01', status: '现行有效', url: 'https://www.npc.gov.cn/npc/c2/c30834/202509/t20250912_447762.html', verifiedAt: '2026-08-23' },
  { id: 'insurance-law', title: '《中华人民共和国保险法》', authority: '全国人民代表大会常务委员会', effectiveFrom: '2015-04-24', status: '现行有效', url: 'https://www.npc.gov.cn/npc/c2/c183/c198/201905/t20190522_74168.html', verifiedAt: '2026-08-23' },
  { id: 'product-law', title: '《中华人民共和国产品质量法》', authority: '全国人民代表大会常务委员会', effectiveFrom: '2018-12-29', status: '现行有效', url: 'https://www.npc.gov.cn/zgrdw/npc/zfjc/zfjcelys/2017-06/07/content_2022958.htm', verifiedAt: '2026-08-23' },
  { id: 'patent-law', title: '《中华人民共和国专利法》', authority: '全国人民代表大会常务委员会', effectiveFrom: '2021-06-01', status: '现行有效', url: 'https://www.npc.gov.cn/npc/c2/c30834/202011/t20201119_308800.html', verifiedAt: '2026-08-23' },
  { id: 'ip-ji', title: '《最高人民法院关于修改十八件知识产权类司法解释的决定》', authority: '最高人民法院', effectiveFrom: '2021-01-01', status: '现行有效', url: 'https://www.court.gov.cn/xinshidai/xiangqing/282641.html', verifiedAt: '2026-08-23' },
  { id: 'ecology-code', title: '《中华人民共和国生态环境法典》', authority: '全国人民代表大会', effectiveFrom: '2026-08-15', status: '现行有效', url: 'https://www.npc.gov.cn/npc/c1773/c1848/c21114/sthjfdlf/', verifiedAt: '2026-08-23' },
  { id: 'ecology-temporal', title: '《最高人民法院关于适用〈中华人民共和国生态环境法典〉时间效力的若干规定》', authority: '最高人民法院', effectiveFrom: '2026-08-15', status: '现行有效', url: 'https://www.court.gov.cn/fabu/xiangqing/508001.html', verifiedAt: '2026-08-23' },
  { id: 'maritime-law', title: '《中华人民共和国海商法》（2025年修订）', authority: '全国人民代表大会常务委员会', effectiveFrom: '2026-05-01', status: '现行有效', url: 'https://www.npc.gov.cn/npc/c2/c30834/202510/t20251028_449061.html', verifiedAt: '2026-08-23' },
  { id: 'aviation-law', title: '《中华人民共和国民用航空法》（2025年修订）', authority: '全国人民代表大会常务委员会', effectiveFrom: '2026-07-01', status: '现行有效', url: 'https://www.npc.gov.cn/npc/c2/c30834/202512/t20251227_450737.html', verifiedAt: '2026-08-23' },
  { id: 'bills-law', title: '《中华人民共和国票据法》', authority: '全国人民代表大会常务委员会', effectiveFrom: '2004-08-28', status: '现行有效', url: 'https://www.npc.gov.cn/zgrdw/npc/flsyywd/flwd/2002-04/17/content_292687.htm', verifiedAt: '2026-08-23' },
  { id: 'trust-law', title: '《中华人民共和国信托法》', authority: '全国人民代表大会常务委员会', effectiveFrom: '2001-10-01', status: '现行有效', url: 'https://www.npc.gov.cn/zgrdw/npc/lfzt/rlyw/2016-02/23/content_1963510.htm', verifiedAt: '2026-08-23' },
  { id: 'company-law', title: '《中华人民共和国公司法》（2023年修订）', authority: '全国人民代表大会常务委员会', effectiveFrom: '2024-07-01', status: '现行有效', url: 'https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/fgs/art/2023/art_067c072db6ef4679a2e0180996be4cf8.html', verifiedAt: '2026-08-23' },
  { id: 'construction-ji', title: '《最高人民法院关于审理建设工程施工合同纠纷案件适用法律问题的解释（一）》', authority: '最高人民法院', effectiveFrom: '2021-01-01', status: '现行有效', url: 'https://www.court.gov.cn/zixun/xiangqing/282111.html', verifiedAt: '2026-08-23' },
  { id: 'security-ji', title: '《最高人民法院关于适用〈中华人民共和国民法典〉有关担保制度的解释》', authority: '最高人民法院', effectiveFrom: '2021-01-01', status: '现行有效', url: 'https://cicc.court.gov.cn/html/1/380/385/12834.html', verifiedAt: '2026-08-23' },
  { id: 'building-ji', title: '《最高人民法院关于审理建筑物区分所有权纠纷案件适用法律若干问题的解释》', authority: '最高人民法院', effectiveFrom: '2021-01-01', status: '现行有效', url: 'https://gongbao.court.gov.cn/Details/02366bc51bd3f8e9843808ce3eec93.html', verifiedAt: '2026-08-23' },
  { id: 'civil-procedure', title: '《中华人民共和国民事诉讼法》（2023年修正）', authority: '全国人民代表大会常务委员会', effectiveFrom: '2024-01-01', status: '现行有效', url: 'https://cicc.court.gov.cn/html/1/218/62/83/443.html', verifiedAt: '2026-08-23' },
  { id: 'civil-procedure-ji', title: '《最高人民法院关于适用〈中华人民共和国民事诉讼法〉的解释》', authority: '最高人民法院', effectiveFrom: '2022-04-10', status: '现行有效', url: 'https://wb.flk.npc.gov.cn/sfjs/texthtml/0d431c40e88f4a9fac8c4d1dbbefa934.html', verifiedAt: '2026-08-23' },
  { id: 'criminal-law', title: '《中华人民共和国刑法》（2023年修正）', authority: '全国人民代表大会', effectiveFrom: '2024-03-01', status: '现行有效', url: 'https://fgk.chinatax.gov.cn/zcfgk/c100009/c5212248/content.html', verifiedAt: '2026-08-28' },
  { id: 'administrative-litigation-law', title: '《中华人民共和国行政诉讼法》（2017年修正）', authority: '全国人民代表大会常务委员会', effectiveFrom: '2017-07-01', status: '现行有效', url: 'https://www.npc.gov.cn/zgrdw/npc/xinwen/2017-06/29/content_2024894.htm', verifiedAt: '2026-08-28' },
  { id: 'administrative-litigation-ji', title: '《最高人民法院关于适用〈中华人民共和国行政诉讼法〉的解释》', authority: '最高人民法院', effectiveFrom: '2018-02-08', status: '现行有效', url: 'https://gongbao.court.gov.cn/details/ff963094d7a6d678980d4972b5961e.html', verifiedAt: '2026-08-28' },
  { id: 'administrative-deadline-ji-2026', title: '《最高人民法院关于适用行政诉讼起诉期限若干问题的解释》', authority: '最高人民法院', effectiveFrom: '2026-05-01', status: '现行有效', url: 'https://www.court.gov.cn/zixun/xiangqing/498801.html', verifiedAt: '2026-08-28' },
  { id: 'administrative-reconsideration-law', title: '《中华人民共和国行政复议法》（2023年修订）', authority: '全国人民代表大会常务委员会', effectiveFrom: '2024-01-01', status: '现行有效', url: 'https://www.npc.gov.cn/WZWSREL25wYy8vLy9jMi9jMzA4MzQvMjAyMzA5L3QyMDIzMDkwMV80MzE0MDkuaHRtbA%3D%3D', verifiedAt: '2026-08-28' },
];

const civilCalendar = { calendar: 'civil' as const };
const procedureCalendar = { calendar: 'procedure' as const };
const criminalCalendar = { calendar: 'criminal' as const };
const administrativeCalendar = { calendar: 'administrative' as const };

export const DEADLINE_RULES: DeadlineRule[] = [
  {
    id: 'general-3y', title: '一般民事请求权三年', group: 'general', domain: '合同、侵权、不当得利、无因管理等', nature: '诉讼时效', provision: '民法典第188条', sourceIds: ['civil-code', 'general-part-ji'],
    ruleText: '自权利人知道或者应当知道权利受到损害以及义务人之日起计算三年；自权利受到损害之日起超过二十年的，原则上不予保护。', handling: 'conditional',
    calculator: { duration: { value: 3, unit: 'year' }, startLabel: '两个知悉要素均具备之日', startHint: '须同时知道或应当知道权利受损和义务人；有争议请选择人工判断。', ...civilCalendar },
    cautions: ['二十年最长保护期间、知悉日争议、中止或多次中断不自动处理。'], keywords: ['三年', '一般', '合同', '侵权', '不当得利', '无因管理'],
  },
  {
    id: 'installment-3y', title: '同一债务分期履行', group: 'general', domain: '分期付款、分期还款', nature: '诉讼时效', provision: '民法典第189条', sourceIds: ['civil-code'],
    ruleText: '诉讼时效期间自最后一期履行期限届满之日起计算。', handling: 'conditional', calculator: { duration: { value: 3, unit: 'year' }, startLabel: '最后一期履行期限届满日', startHint: '只适用于各期属于同一债务的情形。', ...civilCalendar },
    cautions: ['多笔独立债务不能直接套用本规则。'], keywords: ['分期', '最后一期', '还款'],
  },
  {
    id: 'incapacity-agent-3y', title: '无/限制行为能力人对法定代理人的请求', group: 'general', domain: '监护、代理损害', nature: '特别起算', provision: '民法典第190条、总则编解释第36—37条', sourceIds: ['civil-code', 'general-part-ji'],
    ruleText: '诉讼时效期间自法定代理终止之日起计算；权利受损及知悉时间另有复杂情形的，依司法解释处理。', handling: 'conditional', calculator: { duration: { value: 3, unit: 'year' }, startLabel: '法定代理终止日', startHint: '仅在第190条直接适用且终止日期无争议时计算。', ...civilCalendar },
    cautions: ['新代理人何时确定、本人何时恢复完全行为能力可能改变起算判断。'], keywords: ['未成年人', '监护人', '法定代理人'],
  },
  {
    id: 'minor-sexual-assault-3y', title: '未成年人遭受性侵害损害赔偿', group: 'general', domain: '人格权、侵权', nature: '特别起算', provision: '民法典第191条', sourceIds: ['civil-code'],
    ruleText: '诉讼时效期间自受害人年满十八周岁之日起计算。', handling: 'automatic', calculator: { duration: { value: 3, unit: 'year' }, startLabel: '年满十八周岁之日', startHint: '填写十八周岁生日。', ...civilCalendar },
    cautions: ['其他责任主体、持续侵害或刑民交叉仍需个案判断。'], keywords: ['未成年', '性侵害', '十八周岁'],
  },
  {
    id: 'no-due-contract-3y', title: '合同未约定且不能确定履行期限', group: 'general', domain: '借款、货款、服务费', nature: '特别起算', provision: '诉讼时效司法解释第4条；民法典第510—511条', sourceIds: ['limitation-ji', 'civil-code'],
    ruleText: '从债权人要求履行所给宽限期届满之日起计算；债务人在首次主张时明确拒绝的，从明确拒绝之日起计算。', handling: 'conditional', calculator: { duration: { value: 3, unit: 'year' }, startLabel: '宽限期届满日或明确拒绝日', startHint: '催告、到达和拒绝均应有证据。', ...civilCalendar },
    cautions: ['依法能够另行确定履行期限的，应改用确定后的履行期限。'], keywords: ['未约定', '履行期限', '催告', '拒绝'],
  },
  {
    id: 'interruption', title: '诉讼时效中断', group: 'general', domain: '全部普通请求权', nature: '重新起算规则', provision: '民法典第195条；诉讼时效司法解释第8—16条', sourceIds: ['civil-code', 'limitation-ji', 'general-part-ji'],
    ruleText: '提出履行请求、义务人同意履行、提起诉讼或仲裁等法定事由发生后，从中断或有关程序终结时重新计算。', handling: 'manual',
    cautions: ['送达、主体、效力和多次事件需要逐项核验，系统不机械叠加。'], keywords: ['中断', '催款', '承认', '起诉', '仲裁'],
  },
  {
    id: 'suspension', title: '诉讼时效中止', group: 'general', domain: '全部普通请求权', nature: '届满推迟规则', provision: '民法典第194条；总则编解释第35条', sourceIds: ['civil-code', 'general-part-ji'],
    ruleText: '最后六个月内存在法定障碍不能行使请求权的，自障碍消除之日起满六个月届满。', handling: 'manual',
    cautions: ['是否属于不可抗力或其他法定障碍属于事实与法律判断。'], keywords: ['中止', '不可抗力', '最后六个月'],
  },
  {
    id: 'longstop-20y', title: '二十年最长保护期间', group: 'general', domain: '适用诉讼时效的民事请求权', nature: '最长保护期间', provision: '民法典第188条第2款', sourceIds: ['civil-code', 'general-part-ji'],
    ruleText: '自权利受到损害之日起超过二十年的，人民法院原则上不予保护；有特殊情况的，人民法院可以根据权利人的申请决定延长。', handling: 'manual',
    cautions: ['二十年期间不等同于一般三年时效；“权利受到损害之日”和特殊情况必须个案认定。'], keywords: ['二十年', '最长期间', '延长'],
  },
  {
    id: 'limitation-effects', title: '时效届满、抗辩与自愿履行', group: 'general', domain: '适用诉讼时效的民事请求权', nature: '时效法律后果', provision: '民法典第192—193条', sourceIds: ['civil-code'],
    ruleText: '诉讼时效届满后，义务人可以提出不履行义务的抗辩；义务人同意履行或已自愿履行的，分别不得再以届满为由抗辩或请求返还；人民法院不得主动适用诉讼时效。', handling: 'manual',
    cautions: ['系统只能提示期间风险，不能替代当事人是否提出抗辩、是否同意或自愿履行的事实判断。'], keywords: ['抗辩', '自愿履行', '法院不得主动适用'],
  },
  {
    id: 'limitation-agreement-invalid', title: '不得约定改变诉讼时效', group: 'general', domain: '合同及其他民事法律关系', nature: '强制性规则', provision: '民法典第197条', sourceIds: ['civil-code'],
    ruleText: '诉讼时效的期间、计算方法以及中止、中断事由由法律规定，当事人的约定无效；当事人对诉讼时效利益的预先放弃无效。', handling: 'manual',
    cautions: ['合同中的“永久有效”“不得提出时效抗辩”等约定不能替代法定规则。'], keywords: ['约定无效', '预先放弃', '强制性'],
  },
  {
    id: 'period-calculation', title: '民法期间计算规则', group: 'general', domain: '民事期限通用计算', nature: '计算规则', provision: '民法典第200—204条', sourceIds: ['civil-code'],
    ruleText: '按年、月、日计算期间时，开始当日不计入；按年、月计算到对应日，最后一月无对应日以月末为届满日；最后一日为法定休假日的，以休假日结束次日为届满日。', handling: 'manual',
    cautions: ['系统自动计算对应日，但未接入逐年度法定节假日和法院停止办公时间，应在办事前复核。'], keywords: ['期间计算', '对应日', '法定休假日', '月末'],
  },
  {
    id: 'product-2y', title: '缺陷产品损害赔偿', group: 'special', domain: '产品责任侵权', nature: '特别诉讼时效＋权利消灭期', provision: '产品质量法第45条', sourceIds: ['product-law'],
    ruleText: '自知道或者应当知道权益受损之日起二年；请求权通常在缺陷产品交付最初消费者满十年丧失，明示安全使用期尚未届满的除外。', handling: 'conditional',
    calculator: { duration: { value: 2, unit: 'year' }, startLabel: '知道或应当知道权益受损之日', startHint: '产品缺陷与损害均应明确。', outerDuration: { value: 10, unit: 'year' }, outerStartLabel: '产品交付最初消费者之日', outerStartHint: '如仍在明示安全使用期内，十年上限可能不适用。', ...civilCalendar },
    cautions: ['买卖合同瑕疵责任与缺陷产品侵权责任不是同一规则。'], keywords: ['产品', '缺陷', '消费者', '十年'],
  },
  {
    id: 'insurance-nonlife-2y', title: '非人寿保险金请求', group: 'special', domain: '财产保险、责任保险、健康/意外险适用需定性', nature: '特别诉讼时效', provision: '保险法第26条第1款', sourceIds: ['insurance-law'],
    ruleText: '自被保险人或者受益人知道或者应当知道保险事故发生之日起二年。', handling: 'conditional', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '知道或应当知道保险事故发生之日', startHint: '先核对险种是否属于人寿保险以外的其他保险。', ...civilCalendar },
    cautions: ['保险事故认定、理赔材料补充通常不当然改变法定起算点。'], keywords: ['保险', '财产险', '责任险', '两年'],
  },
  {
    id: 'insurance-life-5y', title: '人寿保险金请求', group: 'special', domain: '人寿保险', nature: '特别诉讼时效', provision: '保险法第26条第2款', sourceIds: ['insurance-law'],
    ruleText: '自被保险人或者受益人知道或者应当知道保险事故发生之日起五年。', handling: 'automatic', calculator: { duration: { value: 5, unit: 'year' }, startLabel: '知道或应当知道保险事故发生之日', startHint: '仅适用于人寿保险。', ...civilCalendar },
    cautions: ['险种性质有争议时转人工判断。'], keywords: ['人寿保险', '保险金', '五年'],
  },
  {
    id: 'patent-3y', title: '侵犯专利权', group: 'special', domain: '专利侵权', nature: '特别诉讼时效', provision: '专利法第74条', sourceIds: ['patent-law'],
    ruleText: '自权利人或者利害关系人知道或者应当知道侵权行为以及侵权人之日起三年。', handling: 'conditional', calculator: { duration: { value: 3, unit: 'year' }, startLabel: '知道侵权行为及侵权人之日', startHint: '两个知悉要素均具备。', ...civilCalendar },
    cautions: ['持续侵权的停止侵害与赔偿倒推范围需要分开处理。'], keywords: ['专利', '侵权', '知识产权'],
  },
  {
    id: 'copyright-3y', title: '侵害著作权', group: 'special', domain: '著作权侵权', nature: '诉讼时效', provision: '著作权司法解释第27条（2020年修正）', sourceIds: ['ip-ji'],
    ruleText: '自著作权人知道或者应当知道权利受损以及义务人之日起三年；持续侵权的停止侵害与赔偿倒推规则分别处理。', handling: 'conditional', calculator: { duration: { value: 3, unit: 'year' }, startLabel: '知道权利受损及义务人之日', startHint: '两个知悉要素均具备。', ...civilCalendar },
    cautions: ['持续侵权时不能仅以届满日判断全部诉请。'], keywords: ['著作权', '版权', '持续侵权'],
  },
  {
    id: 'trademark-3y', title: '侵犯注册商标专用权', group: 'special', domain: '商标侵权', nature: '诉讼时效', provision: '商标民事纠纷司法解释第18条（2020年修正）', sourceIds: ['ip-ji'],
    ruleText: '自商标注册人或者利害关系人知道或者应当知道权利受损以及义务人之日起三年。', handling: 'conditional', calculator: { duration: { value: 3, unit: 'year' }, startLabel: '知道权利受损及义务人之日', startHint: '两个知悉要素均具备。', ...civilCalendar },
    cautions: ['侵权持续时，停止侵害和赔偿倒推三年的处理不同。'], keywords: ['商标', '知识产权', '持续侵权'],
  },
  {
    id: 'ecology-5y', title: '生态环境损害赔偿', group: 'special', domain: '污染环境、破坏生态', nature: '特别诉讼时效', provision: '生态环境法典第1054条第2款；时间效力规定第5条', sourceIds: ['ecology-code', 'ecology-temporal'],
    ruleText: '生态环境民事损害赔偿请求适用五年诉讼时效；2026年8月15日旧三年期间尚未届满的，可适用五年，已经届满的不能恢复。', handling: 'conditional', calculator: { duration: { value: 5, unit: 'year' }, startLabel: '知道或应当知道损害及义务人之日', startHint: '如早于2026年8月15日，系统会按专门衔接条款检查。', transition: 'ecology-2026', ...civilCalendar },
    cautions: ['停止侵害、排除妨碍、消除危险不受该赔偿时效限制。'], keywords: ['环境', '污染', '生态', '五年'],
  },
  {
    id: 'aviation-transport-2y', title: '航空运输请求权', group: 'special', domain: '旅客、行李、货物航空运输', nature: '特别诉讼时效', provision: '民用航空法第143条', sourceIds: ['aviation-law'],
    ruleText: '自民用航空器到达目的地点、应当到达目的地点或者运输终止之日起二年。', handling: 'automatic', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '到达、应当到达或运输终止之日', startHint: '按三者中与案件对应的法定事件填写。', effectiveFrom: '2026-07-01', ...civilCalendar },
    cautions: ['国际公约另有适用规则时需优先核对。'], keywords: ['航空', '行李', '货物', '航班'],
  },
  {
    id: 'aviation-thirdparty-2y', title: '航空器第三人损害赔偿', group: 'special', domain: '航空器对地面第三人损害', nature: '特别诉讼时效＋最长期间', provision: '民用航空法第199条', sourceIds: ['aviation-law'],
    ruleText: '自损害发生之日起二年；任何情况下不得超过自损害发生之日起三年。', handling: 'automatic', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '损害发生日', startHint: '本条起算点即损害发生日。', outerDuration: { value: 3, unit: 'year' }, outerStartLabel: '同一损害发生日', outerStartHint: '法定最长期间。', effectiveFrom: '2026-07-01', ...civilCalendar },
    cautions: ['国际航空公约和责任限额问题不在本计算内。'], keywords: ['航空器', '第三人', '地面损害'],
  },
  {
    id: 'maritime-cargo-1y', title: '海上货物运输赔偿', group: 'special', domain: '海上货物运输', nature: '海商时效', provision: '海商法第284条第1款', sourceIds: ['maritime-law'],
    ruleText: '请求承运人、实际承运人赔偿的，自货物交付或者应当交付之日起一年。', handling: 'automatic', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '货物交付或应当交付日', startHint: '向托运人、收货人或单证持有人请求赔偿时起算点不同，应转人工。', effectiveFrom: '2026-05-01', ...civilCalendar },
    cautions: ['追偿请求另有九十日特别规则。'], keywords: ['海商', '货物运输', '承运人', '一年'],
  },
  {
    id: 'maritime-cargo-recourse-90d', title: '海上货物运输追偿补充期间', group: 'special', domain: '海上货物运输追偿', nature: '海商追偿特别期间', provision: '海商法第284条第2款', sourceIds: ['maritime-law'],
    ruleText: '负有赔偿责任的人向第三人提起追偿请求，如原一年期间已经届满或者剩余不足九十日，自解决原赔偿请求之日起享有九十日追偿期间。', handling: 'conditional', calculator: { duration: { value: 90, unit: 'day' }, startLabel: '解决原赔偿请求之日', startHint: '仅在原一年期间已届满或剩余不足九十日时使用。', effectiveFrom: '2026-05-01', ...civilCalendar },
    cautions: ['应先计算原一年期间并确认九十日补充条件已经成就。'], keywords: ['海运', '追偿', '九十日', '货物'],
  },
  {
    id: 'maritime-passenger-2y', title: '海上旅客伤害、行李灭失损坏', group: 'special', domain: '海上旅客运输', nature: '海商时效', provision: '海商法第285条', sourceIds: ['maritime-law'],
    ruleText: '旅客人身伤害、行李灭失或者损坏，自旅客离船或者应当离船之日起二年。', handling: 'automatic', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '旅客离船或应当离船日', startHint: '旅客死亡的起算和三年上限另行人工判断。', effectiveFrom: '2026-05-01', ...civilCalendar },
    cautions: ['运输中受伤后离船后死亡的，有死亡日起算及离船后三年上限。'], keywords: ['海商', '旅客', '行李', '离船'],
  },
  {
    id: 'maritime-passenger-death', title: '海上旅客离船后死亡', group: 'special', domain: '海上旅客运输人身损害', nature: '海商时效＋最长期间', provision: '海商法第285条第1项', sourceIds: ['maritime-law'],
    ruleText: '旅客因运输期间受伤而在离船后死亡的，自死亡之日起二年，但不得超过离船之日起三年。', handling: 'conditional', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '旅客死亡日', startHint: '仅适用于运输期间受伤、离船后死亡。', outerDuration: { value: 3, unit: 'year' }, outerStartLabel: '实际离船日', outerStartHint: '法定三年最长期间的起点。', effectiveFrom: '2026-05-01', ...civilCalendar },
    cautions: ['旅客在运输期间死亡的，应改按“应当离船之日起二年”单独核算。'], keywords: ['海上旅客', '死亡', '离船', '三年上限'],
  },
  {
    id: 'maritime-passenger-death-onboard', title: '海上旅客运输期间死亡', group: 'special', domain: '海上旅客运输人身损害', nature: '海商时效', provision: '海商法第285条第1项', sourceIds: ['maritime-law'],
    ruleText: '旅客在运输期间死亡的，自旅客应当离船之日起二年。', handling: 'automatic', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '旅客应当离船日', startHint: '仅适用于旅客在运输期间已经死亡。', effectiveFrom: '2026-05-01', ...civilCalendar },
    cautions: ['离船后死亡应改用含三年最长期间的专门规则。'], keywords: ['海上旅客', '运输期间死亡', '应当离船'],
  },
  {
    id: 'maritime-charter-2y', title: '租船合同请求权', group: 'special', domain: '航次、定期、光船租赁', nature: '海商时效', provision: '海商法第286条', sourceIds: ['maritime-law'],
    ruleText: '自知道或者应当知道权利被侵害之日起二年。', handling: 'conditional', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '知道或应当知道权利被侵害之日', startHint: '知悉日期须无争议。', effectiveFrom: '2026-05-01', ...civilCalendar }, cautions: [], keywords: ['租船', '海商'],
  },
  {
    id: 'maritime-towage-1y', title: '海上拖航请求权', group: 'special', domain: '海上拖航', nature: '海商时效', provision: '海商法第287条', sourceIds: ['maritime-law'],
    ruleText: '自知道或者应当知道权利被侵害之日起一年。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '知道或应当知道权利被侵害之日', startHint: '知悉日期须无争议。', effectiveFrom: '2026-05-01', ...civilCalendar }, cautions: [], keywords: ['拖航', '海商'],
  },
  {
    id: 'maritime-collision-2y', title: '船舶碰撞请求权', group: 'special', domain: '船舶碰撞', nature: '海商时效', provision: '海商法第288条', sourceIds: ['maritime-law'],
    ruleText: '自碰撞事故发生之日起二年；法定连带赔偿追偿请求自支付之日起一年。', handling: 'automatic', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '碰撞事故发生日', startHint: '本计算为原始碰撞请求，不是追偿请求。', effectiveFrom: '2026-05-01', ...civilCalendar }, cautions: ['追偿请选择人工核验或按支付日起一年单独计算。'], keywords: ['船舶碰撞', '海商'],
  },
  {
    id: 'maritime-collision-recourse-1y', title: '船舶碰撞追偿请求权', group: 'special', domain: '共同过失船舶之间追偿', nature: '海商追偿时效', provision: '海商法第288条第2款', sourceIds: ['maritime-law'],
    ruleText: '共同过失船舶相互间的追偿请求，自实际支付赔偿之日起一年内行使。', handling: 'automatic', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '实际支付赔偿之日', startHint: '填写追偿义务人实际对外支付日期。', effectiveFrom: '2026-05-01', ...civilCalendar },
    cautions: ['必须属于海商法规定的共同过失船舶内部追偿。'], keywords: ['船舶碰撞', '追偿', '支付', '一年'],
  },
  {
    id: 'maritime-salvage-2y', title: '海难救助请求权', group: 'special', domain: '海难救助', nature: '海商时效', provision: '海商法第289条', sourceIds: ['maritime-law'],
    ruleText: '自救助作业终止之日起二年。', handling: 'automatic', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '救助作业终止日', startHint: '填写全部救助作业终止日期。', effectiveFrom: '2026-05-01', ...civilCalendar }, cautions: [], keywords: ['海难救助', '海商'],
  },
  {
    id: 'maritime-average-1y', title: '共同海损分摊请求权', group: 'special', domain: '共同海损', nature: '海商时效＋最长期间', provision: '海商法第290条', sourceIds: ['maritime-law'],
    ruleText: '自共同海损理算结束之日起一年，但不得超过共同航程终止之日起六年。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '共同海损理算结束日', startHint: '须有明确理算结束日期。', outerDuration: { value: 6, unit: 'year' }, outerStartLabel: '共同航程终止日', outerStartHint: '法定最长期间起点。', effectiveFrom: '2026-05-01', ...civilCalendar }, cautions: [], keywords: ['共同海损', '理算', '海商'],
  },
  {
    id: 'marine-insurance-2y', title: '海上保险赔偿请求权', group: 'special', domain: '海上保险', nature: '海商时效', provision: '海商法第291条', sourceIds: ['maritime-law'],
    ruleText: '自知道或者应当知道海上保险事故发生之日起二年。', handling: 'conditional', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '知道或应当知道海上保险事故发生之日', startHint: '海上保险优先适用海商法特别规则。', effectiveFrom: '2026-05-01', ...civilCalendar }, cautions: [], keywords: ['海上保险', '海商'],
  },
  {
    id: 'oil-pollution-3y', title: '船舶油污损害请求权', group: 'special', domain: '船舶油类、燃油污染', nature: '海商时效＋最长期间', provision: '海商法第292条', sourceIds: ['maritime-law'],
    ruleText: '自损害发生之日起三年，但不得超过造成损害的事故发生之日起六年。', handling: 'conditional', calculator: { duration: { value: 3, unit: 'year' }, startLabel: '损害发生日', startHint: '如损害分期发生，应人工核对。', outerDuration: { value: 6, unit: 'year' }, outerStartLabel: '造成损害的事故发生日', outerStartHint: '法定最长期间起点。', effectiveFrom: '2026-05-01', ...civilCalendar }, cautions: [], keywords: ['油污', '船舶污染', '海商'],
  },
  {
    id: 'labor-1y', title: '普通劳动争议仲裁时效', group: 'arbitration', domain: '解除、补偿、赔偿等劳动争议', nature: '仲裁时效', provision: '劳动争议调解仲裁法第27条第1款', sourceIds: ['labor-arbitration'],
    ruleText: '自当事人知道或者应当知道其权利被侵害之日起一年。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '知道或应当知道权利被侵害之日', startHint: '不是拖欠劳动报酬的存续期特别规则。', ...civilCalendar }, cautions: ['劳动争议通常必须先申请仲裁。'], keywords: ['劳动', '解除', '经济补偿', '一年'],
  },
  {
    id: 'labor-wage-1y', title: '劳动关系终止后的拖欠劳动报酬', group: 'arbitration', domain: '工资、加班费等劳动报酬', nature: '仲裁时效', provision: '劳动争议调解仲裁法第27条第4款', sourceIds: ['labor-arbitration'],
    ruleText: '劳动关系存续期间不受一般一年限制；劳动关系终止的，自终止之日起一年内提出。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '劳动关系终止日', startHint: '仅在劳动关系已经终止时填写；仍存续请查看不适用一般一年限制规则。', ...civilCalendar }, cautions: ['请求项目是否属于劳动报酬可能存在争议。'], keywords: ['工资', '加班费', '劳动报酬'],
  },
  {
    id: 'rural-land-2y', title: '农村土地承包经营纠纷仲裁', group: 'arbitration', domain: '农村土地承包经营', nature: '仲裁时效', provision: '农村土地承包经营纠纷调解仲裁法第18条', sourceIds: ['rural-arbitration'],
    ruleText: '自当事人知道或者应当知道其权利被侵害之日起二年。', handling: 'conditional', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '知道或应当知道权利被侵害之日', startHint: '知悉日期须无争议。', ...civilCalendar }, cautions: [], keywords: ['农村土地', '承包', '仲裁'],
  },
  {
    id: 'arbitral-setaside-3m', title: '申请撤销商事仲裁裁决', group: 'arbitration', domain: '商事仲裁司法审查', nature: '法定申请期限', provision: '仲裁法第72条', sourceIds: ['arbitration-law'],
    ruleText: '应当自收到裁决书之日起三个月内提出。', handling: 'automatic', calculator: { duration: { value: 3, unit: 'month' }, startLabel: '收到仲裁裁决书之日', startHint: '适用2026年3月1日起施行的新仲裁法。', effectiveFrom: '2026-03-01', ...procedureCalendar }, cautions: ['旧法期间及新旧衔接案件需人工核对。'], keywords: ['仲裁裁决', '撤销', '三个月'],
  },
  {
    id: 'act-mistake-90d', title: '重大误解撤销民事法律行为', group: 'exclusion', domain: '合同及其他民事法律行为', nature: '撤销权存续期间', provision: '民法典第152条第1款第1项、第2款', sourceIds: ['civil-code'],
    ruleText: '自知道或者应当知道撤销事由之日起九十日；自民事法律行为发生之日起五年内未行使的，撤销权消灭。', handling: 'conditional', calculator: { duration: { value: 90, unit: 'day' }, startLabel: '知道或应当知道重大误解之日', startHint: '主观起算点。', outerDuration: { value: 5, unit: 'year' }, outerStartLabel: '民事法律行为发生日', outerStartHint: '五年最长存续期间。', ...civilCalendar }, cautions: ['不适用诉讼时效中止、中断和延长。'], keywords: ['重大误解', '撤销', '九十日'],
  },
  {
    id: 'act-fraud-1y', title: '欺诈、显失公平等撤销民事法律行为', group: 'exclusion', domain: '合同及其他民事法律行为', nature: '撤销权存续期间', provision: '民法典第152条第1款第1项、第2款', sourceIds: ['civil-code'],
    ruleText: '自知道或者应当知道撤销事由之日起一年；自民事法律行为发生之日起五年内未行使的，撤销权消灭。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '知道或应当知道撤销事由之日', startHint: '欺诈、第三人欺诈或显失公平等。', outerDuration: { value: 5, unit: 'year' }, outerStartLabel: '民事法律行为发生日', outerStartHint: '五年最长存续期间。', ...civilCalendar }, cautions: ['知道撤销事由后明确或以行为放弃的，撤销权也会消灭。'], keywords: ['欺诈', '显失公平', '撤销'],
  },
  {
    id: 'act-coercion-1y', title: '受胁迫撤销民事法律行为', group: 'exclusion', domain: '合同及其他民事法律行为', nature: '撤销权存续期间', provision: '民法典第152条第1款第2项、第2款', sourceIds: ['civil-code'],
    ruleText: '自胁迫行为终止之日起一年；并受民事法律行为发生之日起五年最长期间限制。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '胁迫行为终止日', startHint: '须与行为发生日区分。', outerDuration: { value: 5, unit: 'year' }, outerStartLabel: '民事法律行为发生日', outerStartHint: '五年最长存续期间。', ...civilCalendar }, cautions: ['胁迫是否持续、何时终止通常需要证据判断。'], keywords: ['胁迫', '撤销'],
  },
  {
    id: 'creditor-revocation-1y', title: '债权人撤销债务人行为', group: 'exclusion', domain: '债权保全', nature: '撤销权存续期间', provision: '民法典第541条', sourceIds: ['civil-code'],
    ruleText: '自债权人知道或者应当知道撤销事由之日起一年；自债务人行为发生之日起五年未行使的，撤销权消灭。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '知道或应当知道撤销事由之日', startHint: '主观起算点。', outerDuration: { value: 5, unit: 'year' }, outerStartLabel: '债务人行为发生日', outerStartHint: '五年最长存续期间。', ...civilCalendar }, cautions: ['需先判断是否符合民法典第538或539条。'], keywords: ['债权人撤销权', '转移财产', '五年'],
  },
  {
    id: 'contract-termination-1y', title: '合同解除权未约定期限', group: 'exclusion', domain: '合同解除', nature: '解除权存续期间', provision: '民法典第564条', sourceIds: ['civil-code', 'temporal-ji'],
    ruleText: '法律及当事人均未规定行使期限且对方未催告的，自知道或者应当知道解除事由之日起一年不行使，解除权消灭。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '知道或应当知道解除事由之日', startHint: '仅适用于没有法定或约定期限、也没有对方催告的情形。', ...civilCalendar }, cautions: ['有法定/约定期限或经催告的，应按该专门期限处理。'], keywords: ['解除权', '合同解除', '一年'],
  },
  {
    id: 'gift-revocation-1y', title: '赠与人法定撤销赠与', group: 'exclusion', domain: '赠与合同', nature: '撤销权存续期间', provision: '民法典第663条', sourceIds: ['civil-code'],
    ruleText: '赠与人的撤销权自知道或者应当知道撤销事由之日起一年内行使。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '知道或应当知道撤销事由之日', startHint: '须先满足第663条列举的撤销事由。', ...civilCalendar }, cautions: [], keywords: ['赠与', '撤销'],
  },
  {
    id: 'gift-heir-revocation-6m', title: '赠与人继承人或法定代理人撤销赠与', group: 'exclusion', domain: '赠与合同', nature: '撤销权存续期间', provision: '民法典第664条', sourceIds: ['civil-code'],
    ruleText: '自知道或者应当知道撤销事由之日起六个月内行使。', handling: 'conditional', calculator: { duration: { value: 6, unit: 'month' }, startLabel: '知道或应当知道撤销事由之日', startHint: '适用于受赠人违法行为致赠与人死亡或丧失行为能力。', ...civilCalendar }, cautions: [], keywords: ['赠与', '继承人', '六个月'],
  },
  {
    id: 'marriage-coercion-1y', title: '胁迫或非法限制人身自由撤销婚姻', group: 'exclusion', domain: '婚姻家庭', nature: '撤销婚姻期限', provision: '民法典第1052条', sourceIds: ['civil-code'],
    ruleText: '胁迫结婚自胁迫终止之日起一年；被非法限制人身自由的，自恢复人身自由之日起一年。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '胁迫终止或恢复人身自由之日', startHint: '选择与你案件对应的法定事件。', ...civilCalendar }, cautions: [], keywords: ['撤销婚姻', '胁迫', '限制自由'],
  },
  {
    id: 'marriage-disease-1y', title: '婚前重大疾病未如实告知撤销婚姻', group: 'exclusion', domain: '婚姻家庭', nature: '撤销婚姻期限', provision: '民法典第1053条', sourceIds: ['civil-code'],
    ruleText: '自知道或者应当知道撤销事由之日起一年内提出。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '知道或应当知道未如实告知之日', startHint: '是否属于重大疾病及是否已如实告知需个案判断。', ...civilCalendar }, cautions: [], keywords: ['重大疾病', '撤销婚姻'],
  },
  {
    id: 'possession-return-1y', title: '占有物返还请求权', group: 'exclusion', domain: '占有保护', nature: '权利消灭期间', provision: '民法典第462条', sourceIds: ['civil-code'],
    ruleText: '占有人返还原物的请求权，自侵占发生之日起一年内未行使的，该请求权消灭。', handling: 'automatic', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '侵占发生日', startHint: '注意区别基于所有权的返还原物请求权。', ...civilCalendar }, cautions: ['所有权人返还原物请求权可能适用不同规则。'], keywords: ['占有', '返还', '侵占'],
  },
  {
    id: 'lost-property-2y', title: '遗失物权利人向受让人请求返还', group: 'exclusion', domain: '遗失物、善意取得', nature: '选择权行使期间', provision: '民法典第312条', sourceIds: ['civil-code'],
    ruleText: '权利人自知道或者应当知道受让人之日起二年内，可以向受让人请求返还原物。', handling: 'conditional', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '知道或应当知道受让人之日', startHint: '遗失物通过转让被他人占有的情形。', ...civilCalendar }, cautions: ['受让途径及费用返还会影响法律后果。'], keywords: ['遗失物', '受让人', '返还'],
  },
  {
    id: 'owners-resolution-1y', title: '业主撤销业主大会/业委会决定', group: 'exclusion', domain: '建筑物区分所有权', nature: '撤销权存续期间', provision: '建筑物区分所有权司法解释第12条', sourceIds: ['civil-code', 'building-ji'],
    ruleText: '应当在知道或者应当知道业主大会或者业主委员会作出决定之日起一年内行使。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '知道或应当知道决定作出之日', startHint: '须以决定侵害业主合法权益或程序违法为前提。', ...civilCalendar }, cautions: [], keywords: ['业主大会', '业委会', '撤销'],
  },
  {
    id: 'trust-creditor-1y', title: '债权人申请撤销损害其利益的信托', group: 'exclusion', domain: '信托', nature: '申请权消灭期间', provision: '信托法第12条', sourceIds: ['trust-law'],
    ruleText: '自债权人知道或者应当知道撤销原因之日起一年内不行使的，申请权归于消灭。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '知道或应当知道撤销原因之日', startHint: '须先判断信托是否损害债权人利益。', ...civilCalendar }, cautions: [], keywords: ['信托', '债权人', '撤销'],
  },
  {
    id: 'trust-settlor-1y', title: '委托人撤销受托人不当处分', group: 'exclusion', domain: '信托', nature: '申请权消灭期间', provision: '信托法第22条', sourceIds: ['trust-law'],
    ruleText: '自委托人知道或者应当知道撤销原因之日起一年内不行使的，申请权归于消灭。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '知道或应当知道撤销原因之日', startHint: '须有违反信托目的或不当管理处分。', ...civilCalendar }, cautions: [], keywords: ['信托', '委托人', '处分'],
  },
  {
    id: 'company-resolution-60d', title: '股东请求撤销公司决议', group: 'exclusion', domain: '公司治理', nature: '撤销权期间', provision: '公司法第26条第1款', sourceIds: ['company-law'],
    ruleText: '股东自决议作出之日起六十日内可以请求人民法院撤销。', handling: 'automatic', calculator: { duration: { value: 60, unit: 'day' }, startLabel: '决议作出日', startHint: '适用于已被通知参会的一般情形。', effectiveFrom: '2024-07-01', ...civilCalendar }, cautions: ['轻微程序瑕疵且对决议无实质影响的除外。'], keywords: ['公司决议', '股东会', '董事会', '六十日'],
  },
  {
    id: 'company-resolution-unnotified', title: '未获通知股东撤销公司决议', group: 'exclusion', domain: '公司治理', nature: '撤销权期间＋最长期间', provision: '公司法第26条第2款', sourceIds: ['company-law'],
    ruleText: '自知道或者应当知道决议作出之日起六十日；自决议作出之日起一年未行使的，撤销权消灭。', handling: 'conditional', calculator: { duration: { value: 60, unit: 'day' }, startLabel: '知道或应当知道决议作出之日', startHint: '仅适用于未被通知参加股东会的股东。', outerDuration: { value: 1, unit: 'year' }, outerStartLabel: '决议作出日', outerStartHint: '一年最长存续期间。', effectiveFrom: '2024-07-01', ...civilCalendar }, cautions: [], keywords: ['未通知', '公司决议', '股东'],
  },
  {
    id: 'company-buyback-90d', title: '异议股东请求公司收购股权之诉', group: 'exclusion', domain: '有限责任公司股东退出', nature: '起诉期限', provision: '公司法第89条', sourceIds: ['company-law'],
    ruleText: '自股东会决议作出之日起六十日内不能达成收购协议的，可自决议作出之日起九十日内起诉。', handling: 'conditional', calculator: { duration: { value: 90, unit: 'day' }, startLabel: '股东会决议作出日', startHint: '前六十日协商阶段也从同一决议日计算。', effectiveFrom: '2024-07-01', ...civilCalendar }, cautions: ['须属于第89条列举情形并对决议投反对票。'], keywords: ['股权回购', '异议股东', '九十日'],
  },
  {
    id: 'ratification-30d', title: '效力待定行为催告追认', group: 'exclusion', domain: '限制行为能力、无权代理', nature: '追认催告期间', provision: '民法典第145条、第171条', sourceIds: ['civil-code'],
    ruleText: '相对人可以催告法定代理人或被代理人自收到通知之日起三十日内追认；未作表示的，视为拒绝追认。', handling: 'automatic', calculator: { duration: { value: 30, unit: 'day' }, startLabel: '追认催告通知到达日', startHint: '先确认通知已经到达有权追认的人。', ...civilCalendar },
    cautions: ['善意相对人的撤销权、行为是否纯获利益或与年龄智力相适应需另行判断。'], keywords: ['追认', '无权代理', '限制行为能力', '三十日'],
  },
  {
    id: 'buyer-inspection-2y', title: '买受人检验通知最长期间', group: 'exclusion', domain: '买卖合同标的物数量、质量异议', nature: '检验通知期间', provision: '民法典第621条', sourceIds: ['civil-code'],
    ruleText: '未约定检验期限的，买受人应在发现或应当发现不符合约定的合理期限内通知；自收到标的物之日起二年内未通知的，视为符合约定，但有质量保证期的适用质量保证期，出卖人知道或应当知道不符合约定的除外。', handling: 'conditional', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '收到标的物之日', startHint: '仅计算法定二年外层节点；合理期限和质量保证期优先核对。', ...civilCalendar },
    cautions: ['这不是一般诉讼时效，且“合理期限”、质量保证期和出卖人恶意均可能改变结果。'], keywords: ['买卖', '检验', '质量异议', '两年'],
  },
  {
    id: 'tenant-preemption-15d', title: '房屋承租人优先购买权答复期', group: 'exclusion', domain: '房屋租赁', nature: '权利行使期间', provision: '民法典第726条', sourceIds: ['civil-code'],
    ruleText: '出租人履行通知义务后，承租人在十五日内未明确表示购买的，视为放弃优先购买权。', handling: 'automatic', calculator: { duration: { value: 15, unit: 'day' }, startLabel: '出租人通知到达日', startHint: '须是包含同等条件等必要信息的有效通知。', ...civilCalendar },
    cautions: ['房屋按份共有人行使优先购买权或出租人卖给近亲属时另有规则。'], keywords: ['承租人', '优先购买权', '十五日', '房屋租赁'],
  },
  {
    id: 'bequest-acceptance-60d', title: '受遗赠人表示接受遗赠', group: 'exclusion', domain: '继承、遗赠', nature: '权利表示期间', provision: '民法典第1124条', sourceIds: ['civil-code'],
    ruleText: '受遗赠人应当在知道受遗赠后六十日内作出接受或者放弃受遗赠的表示；到期没有表示的，视为放弃受遗赠。', handling: 'automatic', calculator: { duration: { value: 60, unit: 'day' }, startLabel: '知道受遗赠之日', startHint: '知悉日期和接受表示的到达、证据应可证明。', ...civilCalendar },
    cautions: ['这是接受遗赠的表示期间，不是遗产分割请求的一般诉讼时效。'], keywords: ['遗赠', '继承', '六十日', '接受'],
  },
  {
    id: 'bill-payment-2y', title: '汇票/本票付款请求权', group: 'exclusion', domain: '票据', nature: '票据权利消灭时效', provision: '票据法第17条', sourceIds: ['bills-law'],
    ruleText: '持票人对票据出票人和承兑人的权利，通常自票据到期日起二年；见票即付汇票、本票自出票日起二年。', handling: 'conditional', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '票据到期日或见票即付票据出票日', startHint: '按票据类型选择正确起点。', ...civilCalendar }, cautions: ['支票、追索权和再追索权分别为六个月、六个月和三个月。'], keywords: ['票据', '汇票', '本票', '承兑'],
  },
  {
    id: 'bill-cheque-6m', title: '支票持票人对出票人权利', group: 'exclusion', domain: '票据', nature: '票据权利消灭时效', provision: '票据法第17条', sourceIds: ['bills-law'],
    ruleText: '自出票日起六个月。', handling: 'automatic', calculator: { duration: { value: 6, unit: 'month' }, startLabel: '支票出票日', startHint: '仅适用于支票持票人对出票人的权利。', ...civilCalendar }, cautions: [], keywords: ['支票', '出票人', '六个月'],
  },
  {
    id: 'bill-recourse-6m', title: '持票人对前手追索权', group: 'exclusion', domain: '票据', nature: '票据权利消灭时效', provision: '票据法第17条', sourceIds: ['bills-law'],
    ruleText: '自被拒绝承兑或者被拒绝付款之日起六个月。', handling: 'automatic', calculator: { duration: { value: 6, unit: 'month' }, startLabel: '被拒绝承兑或被拒绝付款日', startHint: '追索权起点。', ...civilCalendar }, cautions: [], keywords: ['票据', '追索权', '拒绝承兑'],
  },
  {
    id: 'bill-recourse-3m', title: '被追索人再追索权', group: 'exclusion', domain: '票据', nature: '票据权利消灭时效', provision: '票据法第17条', sourceIds: ['bills-law'],
    ruleText: '自清偿日或者被提起诉讼之日起三个月。', handling: 'automatic', calculator: { duration: { value: 3, unit: 'month' }, startLabel: '清偿日或被提起诉讼日', startHint: '选择先触发再追索权的法定事件。', ...civilCalendar }, cautions: [], keywords: ['票据', '再追索', '三个月'],
  },
  {
    id: 'guarantee-default-6m', title: '未约定或约定不明的保证期间', group: 'security', domain: '一般保证、连带责任保证', nature: '保证期间', provision: '民法典第692—693条；担保制度解释第32—34条', sourceIds: ['civil-code', 'security-ji'],
    ruleText: '没有约定或约定不明确的，保证期间为主债务履行期限届满之日起六个月；保证期间不发生中止、中断和延长。', handling: 'conditional', calculator: { duration: { value: 6, unit: 'month' }, startLabel: '主债务履行期限届满日', startHint: '主债务期限未约定时，应以催告宽限期届满日为起点。', ...civilCalendar }, cautions: ['一般保证须在期间内对债务人起诉或仲裁；连带保证须在期间内向保证人主张。'], keywords: ['保证期间', '担保', '六个月'],
  },
  {
    id: 'mortgage-main-limitation', title: '抵押权随主债权诉讼时效行使', group: 'security', domain: '抵押担保', nature: '担保物权行使限制', provision: '民法典第419条', sourceIds: ['civil-code'],
    ruleText: '抵押权人应当在主债权诉讼时效期间行使抵押权；未行使的，人民法院不予保护。', handling: 'manual', cautions: ['必须先计算主债权时效，不能另行固定加一个期间。'], keywords: ['抵押权', '主债权', '担保'],
  },
  {
    id: 'construction-priority-18m', title: '建设工程价款优先受偿权', group: 'security', domain: '建设工程施工合同', nature: '优先权行使期间', provision: '建设工程司法解释（一）第41条', sourceIds: ['construction-ji'],
    ruleText: '承包人应在合理期限内行使，但最长不得超过十八个月，自发包人应当给付建设工程价款之日起算。', handling: 'conditional', calculator: { duration: { value: 18, unit: 'month' }, startLabel: '发包人应当给付工程价款之日', startHint: '须先确定工程价款何时到期。', ...civilCalendar }, cautions: ['十八个月是最长期间，“合理期限”仍可能结合案件判断。'], keywords: ['建设工程', '工程款', '优先受偿权', '十八个月'],
  },
  {
    id: 'appeal-judgment-15d', title: '民事一审判决上诉及候选生效日', group: 'procedure', domain: '普通可上诉民事一审', nature: '法定上诉期间', provision: '民事诉讼法第171条、第178条；民诉法解释第244条', sourceIds: ['civil-procedure', 'civil-procedure-ji'],
    ruleText: '自判决书送达之日起十五日内上诉；可上诉裁判未同时送达各方的，各自从收到之日起计算；超过上诉期未上诉的裁判发生法律效力。', handling: 'conditional', calculator: { duration: { value: 15, unit: 'day' }, startLabel: '最后一名有上诉权当事人的送达日', startHint: '系统按最后送达日给出全案候选生效参考；每名当事人的上诉期仍应分别核对。', ...procedureCalendar }, cautions: ['任何一方依法上诉，一审判决即不按“无人上诉”路径生效。', '小额诉讼、最高法一审及依法不准上诉的裁判另有规则。'], keywords: ['一审判决', '上诉', '生效', '十五日'],
  },
  {
    id: 'appeal-ruling-10d', title: '民事一审裁定上诉及候选生效日', group: 'procedure', domain: '依法可上诉的一审裁定', nature: '法定上诉期间', provision: '民事诉讼法第171条、第178条；民诉法解释第244条', sourceIds: ['civil-procedure', 'civil-procedure-ji'],
    ruleText: '自裁定书送达之日起十日内上诉；各方分别起算，超过上诉期未上诉的裁定发生法律效力。', handling: 'conditional', calculator: { duration: { value: 10, unit: 'day' }, startLabel: '最后一名有上诉权当事人的送达日', startHint: '仅限依法可以上诉的裁定。', ...procedureCalendar }, cautions: ['并非所有民事裁定均可上诉。'], keywords: ['一审裁定', '上诉', '十日', '生效'],
  },
  {
    id: 'retrial-6m', title: '民事申请再审一般期限', group: 'procedure', domain: '生效民事判决、裁定', nature: '不变期间', provision: '民事诉讼法第216条；民诉法解释第127条', sourceIds: ['civil-procedure', 'civil-procedure-ji'],
    ruleText: '一般应在判决、裁定发生法律效力后六个月内提出；法定特殊事由从知道或者应当知道之日起六个月。', handling: 'conditional', calculator: { duration: { value: 6, unit: 'month' }, startLabel: '裁判发生法律效力日或特殊事由知悉日', startHint: '先确定适用一般路径还是法定特殊事由路径。', ...procedureCalendar }, cautions: ['该六个月为不变期间，不适用诉讼时效中止、中断、延长。'], keywords: ['再审', '六个月', '生效裁判'],
  },
  {
    id: 'thirdparty-revocation-6m', title: '第三人撤销之诉', group: 'procedure', domain: '未参加原诉的第三人', nature: '不变期间', provision: '民事诉讼法第59条第3款；民诉法解释第292条', sourceIds: ['civil-procedure', 'civil-procedure-ji'],
    ruleText: '自知道或者应当知道生效裁判、调解书损害其民事权益之日起六个月内提出。', handling: 'conditional', calculator: { duration: { value: 6, unit: 'month' }, startLabel: '知道或应当知道权益受损之日', startHint: '还须证明未参诉不能归责于本人及原裁判内容错误。', ...procedureCalendar }, cautions: ['该六个月为不变期间。'], keywords: ['第三人撤销之诉', '六个月'],
  },
  {
    id: 'execution-2y', title: '申请强制执行', group: 'procedure', domain: '生效法律文书', nature: '申请执行时效', provision: '民事诉讼法第250条', sourceIds: ['civil-procedure'],
    ruleText: '申请执行期间为二年；从法律文书规定履行期间最后一日起，分期履行从最后一期届满日起，未规定履行期间从文书生效日起计算。', handling: 'conditional', calculator: { duration: { value: 2, unit: 'year' }, startLabel: '法定申请执行起算日', startHint: '填写履行期最后一日、最后一期届满日或文书生效日。', ...procedureCalendar }, cautions: ['申请执行时效的中止、中断适用诉讼时效相关规定。'], keywords: ['强制执行', '二年', '生效文书'],
  },
  {
    id: 'deadline-restoration-10d', title: '耽误民事诉讼期限申请顺延', group: 'procedure', domain: '民事诉讼程序', nature: '申请顺延期限', provision: '民事诉讼法第86条', sourceIds: ['civil-procedure'],
    ruleText: '因不可抗拒事由或者其他正当理由耽误期限的，在障碍消除后十日内可以申请顺延，是否准许由法院决定。', handling: 'conditional', calculator: { duration: { value: 10, unit: 'day' }, startLabel: '障碍消除日', startHint: '系统只算申请窗口，不判断是否存在正当理由。', ...procedureCalendar }, cautions: ['最终是否顺延由人民法院决定。'], keywords: ['顺延', '耽误期限', '十日'],
  },
  {
    id: 'criminal-max-under-5-5y', title: '法定最高刑不满五年：追诉期限五年', group: 'criminal_prosecution', domain: '刑事犯罪追诉', nature: '追诉期限', provision: '刑法第87条第1项、第89条', sourceIds: ['criminal-law'],
    ruleText: '法定最高刑为不满五年有期徒刑的，经过五年不再追诉；追诉期限从犯罪之日起计算。', handling: 'conditional', calculator: { duration: { value: 5, unit: 'year' }, startLabel: '犯罪之日', startHint: '必须先依据具体罪名、情节和法定刑幅度确认“法定最高刑不满五年”。', ...criminalCalendar },
    cautions: ['连续犯、继续犯、追诉期限内又犯罪，以及刑法第88条情形不按本卡机械计算。', '法定最高刑不是预计判处的刑期，也不是宣告刑。'], keywords: ['刑事', '追诉时效', '五年', '法定最高刑'],
  },
  {
    id: 'criminal-max-5-under-10-10y', title: '法定最高刑五年以上不满十年：追诉期限十年', group: 'criminal_prosecution', domain: '刑事犯罪追诉', nature: '追诉期限', provision: '刑法第87条第2项、第89条', sourceIds: ['criminal-law'],
    ruleText: '法定最高刑为五年以上不满十年有期徒刑的，经过十年不再追诉；追诉期限从犯罪之日起计算。', handling: 'conditional', calculator: { duration: { value: 10, unit: 'year' }, startLabel: '犯罪之日', startHint: '“五年以上”包含五年；“不满十年”不包含十年。', ...criminalCalendar },
    cautions: ['应按依法适用的具体法定刑幅度判断，不得用可能的从轻、减轻结果替代法定最高刑。'], keywords: ['刑事', '追诉时效', '十年', '五年以上'],
  },
  {
    id: 'criminal-max-10-plus-15y', title: '法定最高刑十年以上有期徒刑：追诉期限十五年', group: 'criminal_prosecution', domain: '刑事犯罪追诉', nature: '追诉期限', provision: '刑法第87条第3项、第89条、第99条', sourceIds: ['criminal-law'],
    ruleText: '法定最高刑为十年以上有期徒刑的，经过十五年不再追诉；刑法所称“以上”包括本数。', handling: 'conditional', calculator: { duration: { value: 15, unit: 'year' }, startLabel: '犯罪之日', startHint: '适用于法定最高刑为十年以上有期徒刑、但不含无期徒刑或死刑的情形。', ...criminalCalendar },
    cautions: ['若法定最高刑包含无期徒刑或死刑，应改用二十年规则。'], keywords: ['刑事', '追诉时效', '十五年', '十年以上'],
  },
  {
    id: 'criminal-life-death-20y', title: '法定最高刑无期徒刑、死刑：追诉期限二十年', group: 'criminal_prosecution', domain: '刑事犯罪追诉', nature: '追诉期限＋核准追诉', provision: '刑法第87条第4项、第89条', sourceIds: ['criminal-law'],
    ruleText: '法定最高刑为无期徒刑、死刑的，经过二十年；二十年以后认为必须追诉的，须报请最高人民检察院核准。', handling: 'conditional', calculator: { duration: { value: 20, unit: 'year' }, startLabel: '犯罪之日', startHint: '仅计算二十年基础节点，不判断是否属于必须追诉。', ...criminalCalendar },
    cautions: ['超过二十年不等于绝对不能追诉；是否报请及是否核准由法定机关依法决定。'], keywords: ['刑事', '追诉时效', '二十年', '无期徒刑', '死刑', '核准追诉'],
  },
  {
    id: 'criminal-continuous-end', title: '连续或继续状态犯罪的起算', group: 'criminal_prosecution', domain: '连续犯、继续犯', nature: '特别起算', provision: '刑法第89条第1款', sourceIds: ['criminal-law'],
    ruleText: '犯罪行为有连续或者继续状态的，追诉期限从犯罪行为终了之日起计算。', handling: 'manual',
    cautions: ['是否属于连续状态或继续状态、何时终了以及适用哪个法定刑档，均需结合罪名和事实判断。'], keywords: ['连续犯', '继续犯', '犯罪终了', '起算'],
  },
  {
    id: 'criminal-new-offense-restart', title: '追诉期限内又犯罪的重新起算', group: 'criminal_prosecution', domain: '前罪追诉期限', nature: '重新起算', provision: '刑法第89条第2款', sourceIds: ['criminal-law'],
    ruleText: '在追诉期限以内又犯罪的，前罪追诉期限从犯后罪之日起计算。', handling: 'manual',
    cautions: ['必须先判断后罪是否发生在前罪追诉期限内，并分别确认前罪、后罪的犯罪日期和法定刑档。'], keywords: ['又犯罪', '重新起算', '前罪', '后罪'],
  },
  {
    id: 'criminal-escape-no-limit', title: '立案或法院受理后逃避侦查、审判', group: 'criminal_prosecution', domain: '刑事追诉例外', nature: '不受追诉期限限制', provision: '刑法第88条第1款', sourceIds: ['criminal-law'],
    ruleText: '在人民检察院、公安机关、国家安全机关立案侦查或者人民法院受理案件以后，逃避侦查或者审判的，不受追诉期限限制。', handling: 'manual',
    cautions: ['“立案侦查”“受理案件”和“逃避侦查或者审判”均需由办案材料证明，不能仅凭长期未归案推定。'], keywords: ['逃避侦查', '逃避审判', '不受限制', '立案'],
  },
  {
    id: 'criminal-victim-report-no-limit', title: '追诉期限内控告而应立案未立案', group: 'criminal_prosecution', domain: '被害人控告', nature: '不受追诉期限限制', provision: '刑法第88条第2款', sourceIds: ['criminal-law'],
    ruleText: '被害人在追诉期限内提出控告，人民法院、人民检察院、公安机关应当立案而不予立案的，不受追诉期限限制。', handling: 'manual',
    cautions: ['控告时间、控告内容、受理机关以及是否“应当立案”均需证据和法律判断。'], keywords: ['被害人控告', '应立案未立案', '不受限制'],
  },
  {
    id: 'admin-direct-general-6m', title: '直接提起行政诉讼：一般六个月＋五年上限', group: 'administrative_litigation', domain: '非不动产行政行为', nature: '行政起诉期限', provision: '行政诉讼法第46条；法释〔2026〕3号第2—3条', sourceIds: ['administrative-litigation-law', 'administrative-deadline-ji-2026'],
    ruleText: '直接起诉的一般期限为六个月，自知道或者应当知道行政行为的内容和实施主体之日起计算；其他案件自行政行为作出之日起超过五年，人民法院不予立案。', handling: 'conditional', calculator: { duration: { value: 6, unit: 'month' }, startLabel: '知道或应当知道行政行为内容和实施主体之日', startHint: '一般以法律文书送达日为重要依据；未制作、未送达时需结合证据认定。', outerDuration: { value: 5, unit: 'year' }, outerStartLabel: '行政行为作出之日', outerStartHint: '非不动产案件的最长起诉期限。', ...administrativeCalendar },
    cautions: ['法律另有特别起诉期限、复议前置、未告知诉权或期限、期限扣除等情形不能直接套用。'], keywords: ['行政诉讼', '直接起诉', '六个月', '五年', '实施主体'],
  },
  {
    id: 'admin-direct-realestate-6m', title: '因不动产直接起诉：六个月＋二十年上限', group: 'administrative_litigation', domain: '不动产物权变动行政行为', nature: '行政起诉期限', provision: '行政诉讼法第46条；法释〔2026〕3号第2—3条', sourceIds: ['administrative-litigation-law', 'administrative-deadline-ji-2026'],
    ruleText: '一般六个月从知道或者应当知道行政行为内容和实施主体之日起计算；因行政行为直接导致不动产所有权、用益物权或担保物权设立、变更、转让、消灭的，自行政行为作出之日起超过二十年不予立案。', handling: 'conditional', calculator: { duration: { value: 6, unit: 'month' }, startLabel: '知道或应当知道行政行为内容和实施主体之日', startHint: '须同时明确行政行为内容和实施主体。', outerDuration: { value: 20, unit: 'year' }, outerStartLabel: '行政行为作出之日', outerStartHint: '仅限法释〔2026〕3号第3条界定的因不动产提起诉讼。', ...administrativeCalendar },
    cautions: ['仅与土地、房屋有关并不当然属于二十年规则，必须是行政行为直接引起特定不动产物权变动。'], keywords: ['行政诉讼', '不动产', '二十年', '六个月', '物权变动'],
  },
  {
    id: 'admin-uninformed-1y', title: '未告知起诉期限：最长一年节点', group: 'administrative_litigation', domain: '行政机关未告知诉权或起诉期限', nature: '最长起诉期限', provision: '行政诉讼法司法解释第64条；法释〔2026〕3号第2条、第6条第2款', sourceIds: ['administrative-litigation-ji', 'administrative-deadline-ji-2026'],
    ruleText: '行政机关或复议机关应当告知而未告知起诉权利或者期限的，适用最长不得超过一年的规则；该一年从知道或者应当知道行政行为内容和实施主体之日起计算。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '知道或应当知道行政行为内容和实施主体之日', startHint: '这里只计算最长一年节点，仍须核对何时知道起诉权利和期限。', ...administrativeCalendar },
    cautions: ['一年是未告知情形的最长节点，并不排除六个月或特别期限更早届满；同时仍受五年/二十年最长期间控制。'], keywords: ['未告知', '诉权', '一年', '行政诉讼'],
  },
  {
    id: 'admin-after-review-15d', title: '不服行政复议相关决定：送达后十五日', group: 'administrative_litigation', domain: '复议决定、不予受理决定、驳回申请决定', nature: '行政起诉期限', provision: '行政诉讼法第45条；法释〔2026〕3号第6条', sourceIds: ['administrative-litigation-law', 'administrative-deadline-ji-2026'],
    ruleText: '对复议机关作出的不予受理决定、驳回申请决定或复议决定提起诉讼的，期限为十五日，从决定书送达之日起计算；法律另有规定的除外。', handling: 'automatic', calculator: { duration: { value: 15, unit: 'day' }, startLabel: '复议相关决定书送达日', startHint: '以依法送达并可证明的日期为准。', ...administrativeCalendar },
    cautions: ['复议机关未告知诉权或期限的，应改用未告知规则；法律规定复议终局的不得起诉。'], keywords: ['行政复议', '十五日', '送达', '不予受理', '驳回申请'],
  },
  {
    id: 'admin-review-overdue-15d', title: '复议机关逾期不作决定：期满后十五日', group: 'administrative_litigation', domain: '行政复议逾期未决定', nature: '行政起诉期限', provision: '行政诉讼法第45条', sourceIds: ['administrative-litigation-law'],
    ruleText: '复议机关逾期不作决定的，申请人可以在复议期限届满之日起十五日内向人民法院提起诉讼；法律另有规定的除外。', handling: 'conditional', calculator: { duration: { value: 15, unit: 'day' }, startLabel: '行政复议法定审理期限届满日', startHint: '须先核对复议审理期限是否依法中止、延长或适用简易程序。', ...administrativeCalendar },
    cautions: ['复议审理期限本身存在中止或延长时，不得按受理日机械推算。'], keywords: ['复议逾期', '十五日', '不作决定'],
  },
  {
    id: 'admin-failure-duty-6m', title: '行政机关不履行法定职责：六个月', group: 'administrative_litigation', domain: '履职申请、行政不作为', nature: '行政起诉期限', provision: '行政诉讼法第47条；行政诉讼法司法解释第66条；法释〔2026〕3号第7条；行政复议法第23条', sourceIds: ['administrative-litigation-law', 'administrative-litigation-ji', 'administrative-deadline-ji-2026', 'administrative-reconsideration-law'],
    ruleText: '对履职申请既不答复也不履行职责的，一般可在行政机关接到申请两个月后起诉；起诉应在行政机关履行法定职责期限届满之日起六个月内提出。', handling: 'conditional', calculator: { duration: { value: 6, unit: 'month' }, startLabel: '行政机关履行法定职责期限届满日', startHint: '无特别履职期限时，通常先以行政机关接到申请满两个月作为可起诉节点。', ...administrativeCalendar },
    cautions: ['现行行政复议法对未履行法定职责原则上设置复议前置，须先核对是否应当申请行政复议。', '紧急保护请求、依职权履职、已有答复或特别履职期限均需另行判断。'], keywords: ['不履职', '行政不作为', '两个月', '六个月', '复议前置'],
  },
  {
    id: 'admin-deadline-delay', title: '行政起诉期限的扣除与延长', group: 'administrative_litigation', domain: '不可抗力、非自身原因、特殊情况', nature: '期限扣除／延长', provision: '行政诉讼法第48条；法释〔2026〕3号第4—5条', sourceIds: ['administrative-litigation-law', 'administrative-deadline-ji-2026'],
    ruleText: '因不可抗力或其他不属于自身的原因耽误起诉期限，被耽误时间不计算；其他特殊情况可在障碍消除后十日内申请延长，由人民法院决定。', handling: 'manual',
    cautions: ['行政机关承诺改变行为、参加多元化解、无诉讼行为能力人无代理人等可能构成扣除事由，但需举证；单纯信访维权不当然扣除。'], keywords: ['期限扣除', '延长', '不可抗力', '多元化解', '十日'],
  },
  {
    id: 'admin-incorrect-notice', title: '行政机关错误告知起诉期限', group: 'administrative_litigation', domain: '行政法律文书告知错误', nature: '期限校正规则', provision: '法释〔2026〕3号第5条', sourceIds: ['administrative-deadline-ji-2026'],
    ruleText: '告知期限长于法定期限并导致耽误的，被耽误时间不计算；告知期限短于法定期限的，按照法定期限执行；多人送达或告知不同的，原则上分别计算。', handling: 'manual',
    cautions: ['需要逐人核对送达日期、告知内容、实际耽误时间及证据，不能用单一日期计算。'], keywords: ['错误告知', '期限长于', '期限短于', '分别计算'],
  },
  {
    id: 'admin-registration-correction', title: '行政登记身份信息错误的更正之诉', group: 'administrative_litigation', domain: '名称、身份证号码等登记错误', nature: '特别起算', provision: '法释〔2026〕3号第9条', sourceIds: ['administrative-deadline-ji-2026'],
    ruleText: '有证据证明行政登记中的名称、公民身份号码等身份信息确有错误，行政机关拒绝履行更正职责的，可以从拒绝履行更正职责之日起提起诉讼。', handling: 'manual',
    cautions: ['本条明确起诉起点但未单独规定固定期间，仍需结合一般期限、复议前置及具体登记法规范判断。'], keywords: ['行政登记', '身份信息', '更正', '拒绝履职'],
  },
  {
    id: 'admin-impersonation-marriage', title: '冒名顶替等虚假身份婚姻登记', group: 'administrative_litigation', domain: '婚姻登记行政诉讼', nature: '特别起算', provision: '法释〔2026〕3号第10条', sourceIds: ['administrative-deadline-ji-2026'],
    ruleText: '对冒名顶替等利用虚假身份信息办理的婚姻登记，相关当事人可以自知道或者应当知道婚姻登记之日起提起诉讼。', handling: 'manual',
    cautions: ['是否属于利用虚假身份信息办理婚姻登记及相关当事人范围需个案认定，系统不据此输出确定的“不受期限限制”结论。'], keywords: ['冒名顶替', '虚假身份', '婚姻登记'],
  },
  {
    id: 'admin-appeal-judgment-15d', title: '行政一审判决上诉期限', group: 'administrative_litigation', domain: '行政诉讼一审判决', nature: '法定上诉期限', provision: '行政诉讼法第85条', sourceIds: ['administrative-litigation-law'],
    ruleText: '当事人不服人民法院第一审判决的，有权在判决书送达之日起十五日内向上一级人民法院提起上诉。', handling: 'automatic', calculator: { duration: { value: 15, unit: 'day' }, startLabel: '一审判决书送达日', startHint: '每名有上诉权当事人的期限应按各自送达日期分别计算。', ...administrativeCalendar },
    cautions: ['这里计算单个当事人的上诉期限，不直接判断全案生效日期。'], keywords: ['行政上诉', '一审判决', '十五日'],
  },
  {
    id: 'admin-appeal-ruling-10d', title: '行政一审裁定上诉期限', group: 'administrative_litigation', domain: '依法可上诉的行政一审裁定', nature: '法定上诉期限', provision: '行政诉讼法第85条', sourceIds: ['administrative-litigation-law'],
    ruleText: '当事人不服人民法院第一审裁定的，有权在裁定书送达之日起十日内向上一级人民法院提起上诉。', handling: 'automatic', calculator: { duration: { value: 10, unit: 'day' }, startLabel: '一审裁定书送达日', startHint: '先确认该裁定依法允许上诉。', ...administrativeCalendar },
    cautions: ['并非所有行政裁定均可上诉。'], keywords: ['行政上诉', '一审裁定', '十日'],
  },
  {
    id: 'admin-review-general-60d', title: '行政复议申请：一般六十日＋五年上限', group: 'administrative_reconsideration', domain: '非不动产行政行为', nature: '行政复议申请期限', provision: '行政复议法第20—21条', sourceIds: ['administrative-reconsideration-law'],
    ruleText: '一般自知道或者应当知道行政行为之日起六十日内申请行政复议；其他行政复议申请自行政行为作出之日起超过五年的，行政复议机关不予受理。', handling: 'conditional', calculator: { duration: { value: 60, unit: 'day' }, startLabel: '知道或应当知道行政行为之日', startHint: '法律文书送达、公告或其他知悉方式可能影响起算。', outerDuration: { value: 5, unit: 'year' }, outerStartLabel: '行政行为作出之日', outerStartHint: '非不动产行政复议申请的最长受理期限。', ...administrativeCalendar },
    cautions: ['法律规定申请期限超过六十日的，适用特别规定；不可抗力或其他正当理由可能导致继续计算。'], keywords: ['行政复议', '六十日', '五年'],
  },
  {
    id: 'admin-review-realestate-60d', title: '不动产行政复议：六十日＋二十年上限', group: 'administrative_reconsideration', domain: '因不动产提出行政复议', nature: '行政复议申请期限', provision: '行政复议法第20—21条', sourceIds: ['administrative-reconsideration-law'],
    ruleText: '一般自知道或者应当知道行政行为之日起六十日内申请；因不动产提出的行政复议申请，自行政行为作出之日起超过二十年的不予受理。', handling: 'conditional', calculator: { duration: { value: 60, unit: 'day' }, startLabel: '知道或应当知道行政行为之日', startHint: '须先确认争议属于因不动产提出的行政复议申请。', outerDuration: { value: 20, unit: 'year' }, outerStartLabel: '行政行为作出之日', outerStartHint: '不动产行政复议申请的最长受理期限。', ...administrativeCalendar },
    cautions: ['六十日一般期间与二十年最长期间同时适用，不能只看二十年。'], keywords: ['行政复议', '不动产', '六十日', '二十年'],
  },
  {
    id: 'admin-review-uninformed-1y', title: '行政复议未告知：最长一年节点', group: 'administrative_reconsideration', domain: '未告知复议权利、机关和申请期限', nature: '最长申请期限', provision: '行政复议法第20条第3款', sourceIds: ['administrative-reconsideration-law'],
    ruleText: '行政机关未告知申请行政复议的权利、行政复议机关和申请期限的，申请期限从知道或者应当知道上述事项之日起计算，但自知道或者应当知道行政行为内容之日起最长不得超过一年。', handling: 'conditional', calculator: { duration: { value: 1, unit: 'year' }, startLabel: '知道或应当知道行政行为内容之日', startHint: '这里只计算最长一年节点，实际申请期起算还要核对何时知道复议权利、机关和期限。', ...administrativeCalendar },
    cautions: ['同时仍受五年/二十年最长受理期限控制。'], keywords: ['行政复议', '未告知', '一年', '复议机关'],
  },
  {
    id: 'admin-review-delay', title: '行政复议申请期限因障碍继续计算', group: 'administrative_reconsideration', domain: '不可抗力或其他正当理由', nature: '期限继续计算', provision: '行政复议法第20条第2款', sourceIds: ['administrative-reconsideration-law'],
    ruleText: '因不可抗力或者其他正当理由耽误法定申请期限的，申请期限自障碍消除之日起继续计算。', handling: 'manual',
    cautions: ['“继续计算”不是重新完整计算六十日，必须确定障碍发生前已经经过的天数和障碍存续期间。'], keywords: ['行政复议', '不可抗力', '继续计算', '正当理由'],
  },
  {
    id: 'admin-review-special-term', title: '法律规定超过六十日的复议申请期限', group: 'administrative_reconsideration', domain: '特别行政管理领域', nature: '特别申请期限', provision: '行政复议法第20条第1款但书', sourceIds: ['administrative-reconsideration-law'],
    ruleText: '法律规定的行政复议申请期限超过六十日的，适用该特别规定。', handling: 'manual',
    cautions: ['必须先找到具体单行法律的明确期限；法规、规章或执法文书不能随意缩短法律规定的六十日。'], keywords: ['行政复议', '特别期限', '超过六十日'],
  },
  {
    id: 'not-limited-stop', title: '停止侵害、排除妨碍、消除危险', group: 'not_limited', domain: '物权、人格权、侵权', nature: '不适用诉讼时效', provision: '民法典第196条第1项、第995条', sourceIds: ['civil-code'],
    ruleText: '法律明确规定相关请求权不适用诉讼时效。', handling: 'not_limited', cautions: ['已经发生的损害赔偿请求仍可能适用诉讼时效。'], keywords: ['停止侵害', '排除妨碍', '消除危险'],
  },
  {
    id: 'not-limited-property-return', title: '不动产及登记动产返还财产', group: 'not_limited', domain: '物权保护', nature: '不适用诉讼时效', provision: '民法典第196条第2项', sourceIds: ['civil-code'],
    ruleText: '不动产物权和登记的动产物权的权利人请求返还财产，不适用诉讼时效。', handling: 'not_limited', cautions: ['未登记动产、占有保护请求与损害赔偿请求需另行区分。'], keywords: ['返还原物', '不动产', '登记动产'],
  },
  {
    id: 'not-limited-support', title: '抚养费、赡养费、扶养费', group: 'not_limited', domain: '婚姻家庭', nature: '不适用诉讼时效', provision: '民法典第196条第3项', sourceIds: ['civil-code'],
    ruleText: '请求支付抚养费、赡养费或者扶养费，不适用诉讼时效。', handling: 'not_limited', cautions: ['具体给付范围和历史欠付部分仍可能需要审理判断。'], keywords: ['抚养费', '赡养费', '扶养费'],
  },
  {
    id: 'not-limited-finance', title: '存款、特定债券、出资请求', group: 'not_limited', domain: '金融、公司出资', nature: '不适用诉讼时效', provision: '诉讼时效司法解释第1条', sourceIds: ['limitation-ji'],
    ruleText: '支付存款本金及利息、兑付国债/金融债券及向不特定对象发行的企业债券本息、基于投资关系的缴付出资请求，不支持诉讼时效抗辩。', handling: 'not_limited', cautions: ['普通借款、定向债券或股权转让价款不能当然套用。'], keywords: ['存款', '国债', '金融债券', '出资'],
  },
];

export function getDeadlineRule(id: string) {
  return DEADLINE_RULES.find((rule) => rule.id === id);
}

export function getDeadlineSources(sourceIds: string[]) {
  const ids = new Set(sourceIds);
  return DEADLINE_SOURCES.filter((source) => ids.has(source.id));
}
