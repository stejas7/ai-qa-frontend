import { Link } from 'react-router-dom';

const roadmap=[
  ['M1','Autonomous Mission'],['M2','Knowledge / RAG'],['M3','Intelligent Test Generation'],['M4','Automation & Multi-App'],['M5','Agentic Orchestration'],['M6','Controlled Self-Healing'],['M7','Spring AI Intelligence'],['M8','Reliable UAT Operations'],['M9','Company & Product Workspace'],['M10','UAT Session Lifecycle'],['M11','Performance & Load Testing'],['M12','Automation Script Intelligence'],['M13','ISTQB-Aligned Test Management']
] as const;

const useCases=[
  ['Validate a release before production','Turn a new feature or change request into UAT scenarios, execute supported journeys, capture evidence and produce a release decision.','Start UAT'],
  ['Reduce repetitive manual UAT','Generate traceable coverage from requirements and reuse product knowledge so QA engineers spend less time rebuilding the same validation manually.','Generate coverage'],
  ['Protect critical customer journeys','Validate complete flows such as login → search → checkout instead of checking isolated screens without business context.','Run journeys'],
  ['Understand failures faster','Classify failures, diagnose likely causes and allow controlled recovery only for safe automation issues while preserving business failures for review.','Analyze failures'],
  ['Manage automation as testware','Version, validate and approve reusable automation before generating inspectable Playwright/JUnit assets.','Manage scripts'],
  ['Prove test completion','Trace requirement → test → automation → execution → defect/evidence and apply risk-based exit criteria before release review.','Review traceability']
] as const;

const roles=[
  ['QA Team','Reduce repetitive UAT preparation and focus attention on risk, coverage and failed business scenarios.'],
  ['Product Owner','See whether acceptance requirements became real executable coverage before approving a release.'],
  ['Developer','Get explainable failure feedback and evidence earlier instead of waiting for a manual UAT cycle.'],
  ['Release Manager','Use persisted functional, performance and test-completion evidence to judge whether a build is ready to move forward.']
] as const;

export default function OverviewPage(){return <main className="page overview-page">
  <section className="hero-grid simple-hero"><div><div className="eyebrow">AI UAT ENGINEER</div><h1 className="hero-title">Know if your release is <span>ready before production.</span></h1><p className="lead">Give AI UAT Engineer a business requirement and product target. It creates UAT coverage, manages governed automation, validates supported customer journeys and performance, keeps evidence and applies ISTQB-aligned test completion controls.</p><div className="button-row"><Link className="primary-button" to="/mission">Start UAT</Link><Link className="secondary-button" to="/test-management">Test Management</Link></div></div><div className="hero-card compact-brand"><div className="hero-logo">A</div><strong>AI UAT ENGINEER</strong><span>Requirement → Testware → Execution → Evidence → Release Decision</span><small>M1–M13 implemented</small></div></section>

  <section className="value-flow"><article><b>1</b><strong>Understand & trace</strong><p>Connect the business requirement to risk-based test conditions and test cases.</p></article><article><b>2</b><strong>Validate the release</strong><p>Run governed automation and bounded performance checks with persisted evidence.</p></article><article><b>3</b><strong>Complete with evidence</strong><p>Compare expected vs actual, track defects and apply exit criteria for release review.</p></article></section>

  <section className="panel"><div className="section-heading"><div><div className="eyebrow">BUSINESS USE CASES</div><h2>Where AI UAT Engineer helps an IT team</h2></div></div><div className="use-case-grid">{useCases.map(([title,detail,action])=><article className="use-case-card" key={title}><strong>{title}</strong><p>{detail}</p><span>{action}</span></article>)}</div></section>

  <section className="panel"><div className="eyebrow">ONE REAL FLOW</div><h2>Example: checkout release</h2><div className="example-flow"><span>REQ-001</span><i>→</i><span>TC-001 HIGH risk</span><i>→</i><span>Approved automation</span><i>→</i><span>Functional + performance evidence</span><i>→</i><span>Defect if failed</span><i>→</i><strong>Test completion decision</strong></div></section>

  <section className="panel"><div className="eyebrow">WHO USES IT</div><h2>One quality workflow for the release team</h2><div className="role-grid">{roles.map(([title,detail])=><article key={title}><strong>{title}</strong><p>{detail}</p></article>)}</div></section>

  <section className="panel"><div className="section-heading"><div><div className="eyebrow">PRODUCT ROADMAP</div><h2>Implemented through M13</h2></div><span className="roadmap-progress">ISTQB-aligned workflow foundation</span></div><div className="roadmap-grid compact-roadmap">{roadmap.map(([m,title])=><article className="roadmap-card done" key={m}><div><b>{m}</b><span>✓</span></div><strong>{title}</strong></article>)}</div></section>

  <section className="advanced-links"><span>Engineering details</span><Link to="/technology">Technology</Link><Link to="/agents">Agent Activity</Link><Link to="/healing">Self-Healing</Link><Link to="/api-reference">API Reference</Link></section>
</main>}
