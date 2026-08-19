import { Link } from 'react-router-dom';

const roadmap=[
  ['M1','Autonomous Mission'],['M2','Knowledge / RAG'],['M3','Intelligent Test Generation'],['M4','Automation & Multi-App'],['M5','Agentic Orchestration'],['M6','Controlled Self-Healing'],['M7','Spring AI Intelligence'],['M8','Reliable UAT Operations'],['M9','Company & Product Workspace'],['M10','UAT Session Lifecycle']
] as const;

const useCases=[
  ['Validate a release before production','Turn a new feature or change request into UAT scenarios, execute supported journeys, capture evidence and produce a release decision.','Start UAT'],
  ['Reduce repetitive manual UAT','Generate traceable coverage from requirements and reuse product knowledge so QA engineers spend less time rebuilding the same validation manually.','Generate coverage'],
  ['Protect critical customer journeys','Validate complete flows such as login → search → checkout instead of checking isolated screens without business context.','Run journeys'],
  ['Understand failures faster','Classify failures, diagnose likely causes and allow controlled recovery only for safe automation issues while preserving business failures for review.','Analyze failures'],
  ['Give teams one quality view','Keep requirements, execution history, evidence, session state and release decisions together so QA, developers and product owners share the same facts.','Review evidence'],
  ['Validate continuously with delivery','Use reliable CI/CD health, runtime, RAG and rollback verification so UAT automation remains trustworthy as the product is deployed.','Release safely']
] as const;

const roles=[
  ['QA Team','Reduce repetitive UAT preparation and focus attention on risk, coverage and failed business scenarios.'],
  ['Product Owner','See whether acceptance requirements became real executable coverage before approving a release.'],
  ['Developer','Get explainable failure feedback and evidence earlier instead of waiting for a manual UAT cycle.'],
  ['Release Manager','Use persisted test evidence and quality decisions to judge whether a build is ready to move forward.']
] as const;

export default function OverviewPage(){return <main className="page overview-page">
  <section className="hero-grid simple-hero"><div><div className="eyebrow">AI UAT ENGINEER</div><h1 className="hero-title">Know if your release is <span>ready before production.</span></h1><p className="lead">Give AI UAT Engineer a business requirement and product target. It creates UAT coverage, executes supported customer journeys, explains failures, keeps evidence and helps your team decide whether the release is ready.</p><div className="button-row"><Link className="primary-button" to="/mission">Start UAT</Link><Link className="secondary-button" to="/dashboard">See Results</Link></div></div><div className="hero-card compact-brand"><div className="hero-logo">A</div><strong>AI UAT ENGINEER</strong><span>Requirement → UAT → Evidence → Release Decision</span><small>M1–M10 complete • M11 performance testing next</small></div></section>

  <section className="value-flow"><article><b>1</b><strong>Describe the change</strong><p>Upload a requirement and choose the product/build that needs validation.</p></article><article><b>2</b><strong>Validate the journey</strong><p>Create coverage, run supported end-to-end UAT and analyze failures.</p></article><article><b>3</b><strong>Decide with evidence</strong><p>Review what passed, what failed, why it failed and whether the release should proceed.</p></article></section>

  <section className="panel"><div className="section-heading"><div><div className="eyebrow">BUSINESS USE CASES</div><h2>Where AI UAT Engineer helps an IT team</h2></div></div><div className="use-case-grid">{useCases.map(([title,detail,action])=><article className="use-case-card" key={title}><strong>{title}</strong><p>{detail}</p><span>{action}</span></article>)}</div></section>

  <section className="panel"><div className="eyebrow">ONE REAL FLOW</div><h2>Example: checkout release</h2><div className="example-flow"><span>Checkout requirement</span><i>→</i><span>Acceptance coverage</span><i>→</i><span>Customer journey execution</span><i>→</i><span>Failure analysis</span><i>→</i><span>Evidence</span><i>→</i><strong>Release decision</strong></div><p className="muted">The business outcome comes first. Spring AI, RAG, agents and Playwright remain available underneath as engineering capabilities rather than becoming the first thing a visitor has to understand.</p></section>

  <section className="panel"><div className="eyebrow">WHO USES IT</div><h2>One quality workflow for the release team</h2><div className="role-grid">{roles.map(([title,detail])=><article key={title}><strong>{title}</strong><p>{detail}</p></article>)}</div></section>

  <section className="panel"><div className="section-heading"><div><div className="eyebrow">PRODUCT ROADMAP</div><h2>Foundation complete through M10</h2></div><span className="roadmap-progress">M11: Performance & Load Testing</span></div><div className="roadmap-grid compact-roadmap">{roadmap.map(([m,title])=><article className="roadmap-card done" key={m}><div><b>{m}</b><span>✓</span></div><strong>{title}</strong></article>)}<article className="roadmap-card planned"><div><b>M11</b><span>○</span></div><strong>Performance & Load Testing</strong><p>Define workload, measure latency/throughput/errors, compare SLOs and explain performance release risk.</p></article></div></section>

  <section className="advanced-links"><span>Engineering details</span><Link to="/technology">Technology</Link><Link to="/agents">Agent Activity</Link><Link to="/healing">Self-Healing</Link><Link to="/api-reference">API Reference</Link></section>
</main>}
