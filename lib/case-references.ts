export type CaseReference = {
  title: string;
  docket?: string;
  authority: string;
  point: string;
  productBoundary: string;
  url: string;
};

export const CASE_REFERENCES: CaseReference[] = [
  {
    title: '杭州美某公司与浙江天某公司计算机软件著作权纠纷案',
    docket: '（2023）最高法知民终2573号',
    authority: '最高人民法院知识产权法庭',
    point: '裁判文书直接援引民法典第188、201、202条，对三年期间及对应日计算进行审查。',
    productBoundary: '验证按年计算的对应日；同时提示“知道或者应当知道”仍需结合证据判断。',
    url: 'https://ipc.court.gov.cn/zh-cn/news/view-5697.html',
  },
  {
    title: '长春某泽投资有限公司诉德惠市某原种场等金融借款合同纠纷案',
    docket: '指导性案例249号／（2023）最高法民再262号',
    authority: '最高人民法院',
    point: '涉及持续主张权利、普通时效多次中断与二十年期间的关系。',
    productBoundary: '证明“多次中断＋二十年”不能机械加减，第一版必须转人工判断。',
    url: 'https://www.court.gov.cn/shenpan/xiangqing/459211.html',
  },
  {
    title: '张某与某建筑公司加班费争议',
    authority: '最高人民法院、人力资源社会保障部联合发布典型案例',
    point: '加班费属于劳动报酬；劳动关系终止后，自终止之日起一年内提出。',
    productBoundary: '支持劳动报酬特别仲裁时效分支；公开页面未列案号，系统不自行补写。',
    url: 'https://www.court.gov.cn/zixun/xiangqing/319151.html',
  },
  {
    title: '丁育、丁小红与澳门第一环球公司其他侵权责任纠纷案',
    docket: '（2018）沪民终330号',
    authority: '上海市高级人民法院／最高人民法院国际商事法庭公开',
    point: '裁判对境内有住所当事人的十五日上诉期间及涉外当事人期限适用进行了具体审查。',
    productBoundary: '验证上诉期限必须按各当事人的住所和送达分别判断，不能只看裁判作出日。',
    url: 'https://cicc.court.gov.cn/html/1/218/347/329/428/434/1444.html',
  },
  {
    title: '最高人民法院婚姻家庭纠纷典型案例中的占有物返还纠纷',
    authority: '最高人民法院',
    point: '典型案例明确占有回复请求权应自侵夺之日起一年内行使，期满未行使的请求权消灭。',
    productBoundary: '验证占有保护的一年期间与基于所有权的返还原物请求权必须区分。',
    url: 'https://www.court.gov.cn/zixun/xiangqing/16211.html',
  },
  {
    title: '最高人民检察院第六批指导性案例：核准追诉案件',
    authority: '最高人民检察院',
    point: '指导性案例集中说明超过二十年后是否核准追诉，需要综合犯罪性质、后果、社会影响、证据条件和追诉必要性审查。',
    productBoundary: '验证二十年只是基础节点；系统不能把“超过二十年”直接输出为绝对不再追诉。',
    url: 'https://www.spp.gov.cn/xwfbh/wsfbt/201507/t20150708_100967.shtml',
  },
  {
    title: '最高人民法院行政诉讼起诉期限审查规则适用典型案例',
    authority: '最高人民法院',
    point: '四个案例分别明确内容和实施主体知悉、不履职起算、行政行为对外生效以及信访不当然扣除期限等问题。',
    productBoundary: '验证行政起诉期限不能只按行政行为作出日机械计算，信访维权也不当然暂停期限。',
    url: 'https://www.court.gov.cn/zixun/xiangqing/498791.html',
  },
];
