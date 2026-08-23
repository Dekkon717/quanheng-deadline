'use client';

import { useMemo, useState } from 'react';
import {
  DEADLINE_GROUPS,
  DEADLINE_RULES,
  DEADLINE_SOURCES,
  getDeadlineSources,
  type DeadlineGroup,
  type DeadlineRule,
} from '../../lib/deadline-catalog';
import {
  calculateDeadline,
  formatChineseDate,
  type DeadlineCalculationResult,
} from '../../lib/deadline-engine';
import { CASE_REFERENCES } from '../../lib/case-references';

function todayISO() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function RuleBadge({ rule }: { rule: DeadlineRule }) {
  const label = rule.handling === 'automatic' ? '可直接计算' : rule.handling === 'conditional' ? '条件满足可算' : rule.handling === 'not_limited' ? '不适用时效' : '需人工判断';
  return <span className={`rule-badge badge-${rule.handling}`}>{label}</span>;
}

function printReference() {
  const androidBridge = (window as Window & { AndroidBridge?: { printPage: () => void } }).AndroidBridge;
  if (androidBridge?.printPage) androidBridge.printPage();
  else window.print();
}

function ResultPanel({ result, professional, onReset }: { result: DeadlineCalculationResult; professional: boolean; onReset: () => void }) {
  return (
    <div className="result-wrap v11-result">
      <div className={`result-status result-${result.status}`}>
        <span className="status-mark">{result.outcome === 'manual' ? '!' : result.outcome === 'not_limited' ? '免' : '期'}</span>
        <div>
          <p className="eyebrow">计算参考 · 截至 {formatChineseDate(result.evaluationDate)}</p>
          <h2>{result.headline}</h2>
          {result.deadline ? <p className="deadline-line">基础参考届满日 <strong>{formatChineseDate(result.deadline)}</strong></p> : null}
        </div>
      </div>

      <section className="result-section result-rule-title">
        <div><RuleBadge rule={result.rule} /><h3>{result.rule.title}</h3><p>{result.rule.ruleText}</p></div><span>{result.rule.provision}</span>
      </section>

      {result.manualReasons.length ? <section className="result-section attention-section"><h3>停止自动计算的原因</h3><ul>{result.manualReasons.map((item) => <li key={item}>{item}</li>)}</ul></section> : null}

      {result.timeline.length ? (
        <section className="result-section">
          <div className="section-heading"><h3>计算轨迹</h3><span>可追溯</span></div>
          <ol className="timeline">{result.timeline.map((item, index) => <li key={`${item.label}-${index}`}><span className="timeline-index">{index + 1}</span><div><strong>{item.label}</strong>{item.date ? <time>{formatChineseDate(item.date)}</time> : null}<p>{item.detail}</p></div></li>)}</ol>
        </section>
      ) : null}

      <section className="result-section">
        <div className="section-heading"><h3>法律依据</h3><span>{result.sources.length} 份现行文件</span></div>
        <div className="source-list">{result.sources.map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="source-item"><span><strong>{source.title}</strong><small>{source.authority} · {source.effectiveFrom} 起施行 · {source.status}</small></span><span>↗</span></a>)}</div>
        {professional ? <div className="rule-trace"><p>规则追溯</p><div><code>{result.rule.id}</code><span>{result.rule.provision} · 核验于 2026-08-23</span></div></div> : null}
      </section>

      {result.warnings.length ? <section className="warning-box"><strong>重要风险提示</strong>{result.warnings.map((item) => <p key={item}>{item}</p>)}</section> : null}
      <div className="result-actions"><button type="button" className="button-secondary" onClick={printReference}>打印参考</button><button type="button" className="button-primary" onClick={onReset}>重新计算</button></div>
    </div>
  );
}

export default function CalculatorApp({ edition = 'web' }: { edition?: 'web' | 'android-offline' }) {
  const offline = edition === 'android-offline';
  const [professional, setProfessional] = useState(false);
  const [view, setView] = useState<'calculator' | 'library'>('calculator');
  const [group, setGroup] = useState<DeadlineGroup>('general');
  const [ruleId, setRuleId] = useState('general-3y');
  const [startDate, setStartDate] = useState('');
  const [outerStartDate, setOuterStartDate] = useState('');
  const [evaluationDate, setEvaluationDate] = useState(todayISO());
  const [disputed, setDisputed] = useState(false);
  const [complexEvent, setComplexEvent] = useState(false);
  const [anyAppeal, setAnyAppeal] = useState(false);
  const [result, setResult] = useState<DeadlineCalculationResult | null>(null);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [libraryGroup, setLibraryGroup] = useState<DeadlineGroup | 'all'>('all');

  const selectedRule = DEADLINE_RULES.find((item) => item.id === ruleId) ?? DEADLINE_RULES[0];
  const groupedRules = DEADLINE_RULES.filter((item) => item.group === group);
  const automaticCount = DEADLINE_RULES.filter((item) => item.calculator).length;
  const libraryRules = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return DEADLINE_RULES.filter((rule) => {
      const groupMatch = libraryGroup === 'all' || rule.group === libraryGroup;
      const haystack = [rule.title, rule.domain, rule.nature, rule.provision, rule.ruleText, ...rule.keywords].join(' ').toLowerCase();
      return groupMatch && (!needle || haystack.includes(needle));
    });
  }, [query, libraryGroup]);

  function resetFields() {
    setResult(null); setMessage(''); setStartDate(''); setOuterStartDate(''); setDisputed(false); setComplexEvent(false); setAnyAppeal(false);
  }
  function selectGroup(next: DeadlineGroup) {
    setGroup(next); const first = DEADLINE_RULES.find((item) => item.group === next); if (first) setRuleId(first.id); resetFields();
  }
  function selectRule(next: string) { setRuleId(next); resetFields(); }
  function runCalculation() {
    if (selectedRule.calculator && !startDate) { setMessage(`请填写“${selectedRule.calculator.startLabel}”。`); return; }
    if (selectedRule.calculator?.outerDuration && !outerStartDate) { setMessage(`请填写“${selectedRule.calculator.outerStartLabel}”。`); return; }
    setResult(calculateDeadline({ ruleId, startDate, outerStartDate, evaluationDate, disputed, complexEvent, anyAppeal })); setMessage(''); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="app-shell v11-shell">
      <header className="topbar"><div className="topbar-inner">
        <button type="button" className="brand" onClick={() => { setView('calculator'); resetFields(); }}><span className="brand-mark">时</span><span><strong>权衡 · 民事法律期限助手</strong><small>{offline ? '规则与计算均在本机运行 · 离线版' : '每个日期，都能回到现行法条'}</small></span></button>
        <div className="top-actions"><div className="view-switch"><button className={view === 'calculator' ? 'active' : ''} onClick={() => setView('calculator')}>期限计算</button><button className={view === 'library' ? 'active' : ''} onClick={() => setView('library')}>规则库</button></div><div className="mode-switch"><button className={!professional ? 'active' : ''} onClick={() => setProfessional(false)}>普通</button><button className={professional ? 'active' : ''} onClick={() => setProfessional(true)}>专业</button></div></div>
      </div></header>

      <section className="catalog-hero"><div><p className="eyebrow">中国大陆 · 现行国家层面规则 · 核验至 2026-08-23</p><h1>先识别是哪一种期限，<br />再开始算日期。</h1><p>覆盖普通与特别诉讼时效、仲裁时效、除斥期间、担保期限和核心民事程序期限。复杂事实不猜，直接转人工判断。</p></div><div className="hero-stats"><div><strong>{DEADLINE_RULES.length}</strong><span>项规则</span></div><div><strong>{automaticCount}</strong><span>项可计算</span></div><div><strong>{DEADLINE_SOURCES.length}</strong><span>份官方法源</span></div></div></section>

      {view === 'calculator' ? (
        <div className="v11-grid">
          <aside className="category-panel"><p className="nav-label">1 · 选择期限类型</p>{DEADLINE_GROUPS.map((item) => <button key={item.id} type="button" className={group === item.id ? 'active' : ''} onClick={() => selectGroup(item.id)}><strong>{item.label}</strong><small>{item.description}</small></button>)}<div className="privacy-note"><span>◌</span><p><strong>无需个人信息</strong>不要填写姓名、身份证号、案号或完整案情。</p></div></aside>

          <section className="calculator-stage">{result ? <ResultPanel result={result} professional={professional} onReset={() => { setResult(null); setMessage(''); }} /> : <>
            <div className="stage-intro"><p className="eyebrow">2 · 选择具体规则</p><h2>{DEADLINE_GROUPS.find((item) => item.id === group)?.label}</h2><p>找不到合适规则时，可到“规则库”搜索关键词。</p></div>
            <div className="rule-picker">{groupedRules.map((rule) => <button key={rule.id} type="button" className={ruleId === rule.id ? 'active' : ''} onClick={() => selectRule(rule.id)}><span><RuleBadge rule={rule} /><strong>{rule.title}</strong><small>{rule.domain}</small></span><b>›</b></button>)}</div>
            <div className="selected-rule-card">
              <div className="selected-rule-head"><div><p className="eyebrow">3 · 填写法定日期</p><h2>{selectedRule.title}</h2></div><span>{selectedRule.provision}</span></div>
              <p className="verbatim-rule">{selectedRule.ruleText}</p>
              {selectedRule.calculator ? <div className="fields-grid v11-fields"><label className="field"><span className="field-label">{selectedRule.calculator.startLabel}</span><input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /><span className="field-hint">{selectedRule.calculator.startHint}</span></label>{selectedRule.calculator.outerDuration ? <label className="field"><span className="field-label">{selectedRule.calculator.outerStartLabel}</span><input type="date" value={outerStartDate} onChange={(event) => setOuterStartDate(event.target.value)} /><span className="field-hint">{selectedRule.calculator.outerStartHint}</span></label> : null}<label className="field"><span className="field-label">用于判断的日期</span><input type="date" value={evaluationDate} onChange={(event) => setEvaluationDate(event.target.value)} /><span className="field-hint">默认今天，也可填写起诉、申请仲裁或提交材料日。</span></label></div> : <div className="manual-callout"><strong>这项规则不能只用一个日期计算</strong><p>{selectedRule.cautions[0] ?? '需要结合案件事实和证据进行人工判断。'}</p></div>}
              {(selectedRule.handling === 'conditional' || selectedRule.calculator) ? <div className="risk-checks"><label><input type="checkbox" checked={disputed} onChange={(event) => setDisputed(event.target.checked)} /><span><strong>起算日期存在争议</strong><small>例如“知道或者应当知道”、送达、到期或事故日期不确定</small></span></label><label><input type="checkbox" checked={complexEvent} onChange={(event) => setComplexEvent(event.target.checked)} /><span><strong>存在复杂事件</strong><small>例如中止、多次中断、持续侵害、多人送达不明或新旧法争议</small></span></label>{(selectedRule.id === 'appeal-judgment-15d' || selectedRule.id === 'appeal-ruling-10d') ? <label><input type="checkbox" checked={anyAppeal} onChange={(event) => setAnyAppeal(event.target.checked)} /><span><strong>已有任一方在期间内上诉</strong><small>勾选后不再计算一审裁判的无人上诉生效日</small></span></label> : null}</div> : null}
              {message ? <p className="form-message">{message}</p> : null}
              <div className="form-actions"><button type="button" className="button-ghost" onClick={() => { setView('library'); setQuery(selectedRule.title); }}>查看规则卡片</button><button type="button" className="button-primary" onClick={runCalculation}>{selectedRule.handling === 'not_limited' ? '查看法律结论' : selectedRule.calculator ? '生成计算参考' : '查看人工判断边界'}</button></div>
            </div>
          </>}</section>

          <aside className="source-rail v11-rail"><div className="principle-card"><p className="eyebrow">系统原则</p><h2>没有明确法条，<br />就不自动算。</h2><p>规则只来自现行法律、行政法规和司法解释。案例用于验证边界，不代替成文法。</p></div><div className="rail-card"><div className="section-heading"><h3>当前规则法源</h3><span>官方原文</span></div>{getDeadlineSources(selectedRule.sourceIds).map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><span><strong>{source.title}</strong><small>{source.authority} · {source.status}</small></span><span>↗</span></a>)}</div></aside>
        </div>
      ) : (
        <section className="library-shell">
          <div className="library-tools"><div><p className="eyebrow">民事法律期限规则库</p><h2>检索法条、权利和案件类型</h2></div><input aria-label="搜索规则" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例如：保险、保证期间、上诉、撤销权…" /></div>
          <div className="library-filters"><button className={libraryGroup === 'all' ? 'active' : ''} onClick={() => setLibraryGroup('all')}>全部 {DEADLINE_RULES.length}</button>{DEADLINE_GROUPS.map((item) => <button key={item.id} className={libraryGroup === item.id ? 'active' : ''} onClick={() => setLibraryGroup(item.id)}>{item.label}</button>)}</div>
          <p className="library-count">找到 {libraryRules.length} 项规则</p>
          <div className="library-grid">{libraryRules.map((rule) => <article key={rule.id} className="library-card"><div><RuleBadge rule={rule} /><span className="nature-label">{rule.nature}</span></div><h3>{rule.title}</h3><p className="domain-line">{rule.domain}</p><p>{rule.ruleText}</p><div className="basis-line"><strong>{rule.provision}</strong><small>{getDeadlineSources(rule.sourceIds).map((source) => source.title).join('、')}</small></div><button onClick={() => { setGroup(rule.group); setRuleId(rule.id); setView('calculator'); resetFields(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{rule.calculator || rule.handling === 'not_limited' ? '使用这项规则 →' : '查看判断边界 →'}</button></article>)}</div>
          {!libraryRules.length ? <div className="empty-state"><strong>没有匹配的规则</strong><p>换一个法律关系或权利名称搜索；系统不会用相近词强行匹配。</p></div> : null}
        </section>
      )}

      <section className="case-evidence"><div className="evidence-heading"><div><p className="eyebrow">真实裁判校验</p><h2>案例只用于验证规则边界</h2></div><p>以下案例均来自人民法院公开页面；系统不自行补写案号，也不把个案裁判当作普遍法条。</p></div><div className="evidence-grid">{CASE_REFERENCES.map((item) => <a className="evidence-card" key={item.title} href={item.url} target="_blank" rel="noreferrer"><span className="evidence-authority">{item.authority}</span><h3>{item.title}</h3>{item.docket ? <code>{item.docket}</code> : null}<p>{item.point}</p><div><strong>产品边界</strong><span>{item.productBoundary}</span></div><b>查看公开原文 ↗</b></a>)}</div></section>
      <footer className="site-footer"><p>权衡 · 民事法律期限助手 {offline ? 'v1.2 离线版' : 'v1.1'}</p><span>输出为“计算参考＋风险提示”，不构成确定法律结论。法源核验至 2026-08-23。</span></footer>
    </main>
  );
}
