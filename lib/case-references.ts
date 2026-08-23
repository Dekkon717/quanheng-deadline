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
];
