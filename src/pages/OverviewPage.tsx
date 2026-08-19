import { Link } from 'react-router-dom';

const roadmap=[
  ['M1','Autonomous Mission'],['M2','Knowledge / RAG'],['M3','Intelligent Test Generation'],['M4','Automation & Multi-App'],['M5','Agentic Orchestration'],['M6','Controlled Self-Healing'],['M7','Spring AI Intelligence'],['M8','Reliable UAT Operations'],['M9','Company & Product Workspace'],['M10','UAT Session Lifecycle']
] as const;

const roles=[
  ['QA Team','Reduce repetitive UAT preparation and keep evidence in one place.'],
  ['Product Owner','See how requirements translate into executable acceptance coverage.'],
  ['Developer','Get faster, explainable failure feedback before release.'],
  ['Release Manager','Use persisted evidence and quality decisions to judge release readiness.']
] as const;

export default function OverviewPage(){return <main className="page overview-page">
  <section className="hero-grid simple-hero"><div><div className="eyebrow">AI UAT ENGINEER</div><h1 className="hero-title">From requirement to <span>release confidence.</span></h1><p className="lead">AI UAT Engineer turns product requirements into UAT scenarios, executes supported flows, analyzes failures, collects evidence and helps teams decide whether a release is ready.</p><div className="button-row"><Link className="primary-button" to="/mission">Start UAT</Link><Link className="secondary-button" to="/dashboard">View Results</Link></div></div><div className="hero-card compact-brand"><div className="hero-logo">A</div><strong>AI UAT ENGINEER</strong><span>Autonomous UAT Engineering Platform</span><small>M1–M10 complete • M11 planned</small></div></section>

  <section className="value-flow"><article><b>1</b><strong>Give Requirement</strong><p>Upload a business requirement and select what product/build you want to validate.</p></article><article><b>2</b><strong>Run UAT</strong><p>Generate tests, execute supported flows and diagnose failures with controlled recovery.</p></article><article><b>3</b><strong>Get Release Decision</strong><p>Review evidence, failures and release confidence instead of only a generated test list.</p></article></section>

  <section className="panel"><div className="section-heading"><div><div className="eyebrow">REAL PRODUCT VALUE</div><h2>What the platform actually does</h2></div></div><div className="example-flow"><span>Checkout requirement</span><i>→</i><span>UAT scenarios</span><i>→</i><span>Browser execution</span><i>→</i><span>Failure diagnosis</span><i>→</i><span>Evidence</span><i>→</i><strong>Release decision</strong></div><p className="muted">AI reasons about requirements and failures. Java controls state and policy. Playwright executes. Persisted evidence proves what happened.</p></section>

  <section className="panel"><div className="eyebrow">WHO BENEFITS</div><h2>Useful across the release team</h2><div className="role-grid">{roles.map(([title,detail])=><article key={title}><strong>{title}</strong><p>{detail}</p></article>)}</div></section>

  <section className="panel"><div className="section-heading"><div><div className="eyebrow">PRODUCT ROADMAP</div><h2>Foundation complete through M10</h2></div><span className="roadmap-progress">M11: Performance & Load Testing</span></div><div className="roadmap-grid compact-roadmap">{roadmap.map(([m,title])=><article className="roadmap-card done" key={m}><div><b>{m}</b><span>✓</span></div><strong>{title}</strong></article>)}<article className="roadmap-card planned"><div><b>M11</b><span>○</span></div><strong>Performance & Load Testing</strong><p>Deterministic load generation, latency/throughput evidence and AI-assisted analysis.</p></article></div></section>

  <section className="advanced-links"><span>Want engineering details?</span><Link to="/technology">Technology</Link><Link to="/agents">Agent Activity</Link><Link to="/healing">Self-Healing</Link><Link to="/api-reference">API Reference</Link></section>
</main>}
