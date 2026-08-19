import { Link } from 'react-router-dom';

const roadmap = [
  ['M1','Autonomous Mission','Core UAT flow','done'],
  ['M2','Knowledge / RAG Foundation','Grounded QA reasoning','done'],
  ['M3','Intelligent Test Generation','Risk, traceability, Excel + JSON','done'],
  ['M4','Advanced Automation & Multi-App Support','Registered targets and evidence','done'],
  ['M5','Agentic Orchestration','Requirement → design → automation → execution → diagnosis → QA decision','done'],
  ['M6','Self-Healing & Smart Recovery','Failure classification, safety policy, controlled repair and one retry','done'],
  ['M7','Spring AI Intelligence + Regression','ChatClient, controlled tools, RAG and regression intelligence foundation','done'],
  ['M8','Reliable Autonomous UAT Operations','CI/CD diagnosis, health/runtime checks, rollback and recovery','done'],
  ['M9','Company & Product Workspace','Company registration, product ownership and isolation','done'],
  ['M10','UAT Session Lifecycle','Company/product scoped sessions with guarded lifecycle transitions','done'],
  ['M11','Performance & Load Testing','Load profiles, latency/throughput evidence and AI-assisted performance analysis','planned']
] as const;

const flow=['Business Requirement','Spring AI + RAG','Requirement Intelligence','Intelligent Test Design','Agent Orchestration','Playwright Execution','Failure Diagnosis / Healing','QA Decision'];

export default function OverviewPage(){
  return <main className="page overview-page">
    <section className="hero-grid">
      <div>
        <div className="eyebrow">AI UAT ENGINEER 3.0 • SPRING AI-NATIVE AUTONOMOUS QA ENGINEERING</div>
        <h1 className="hero-title">Your AI UAT Engineer. <span>Always On. Always Testing.</span></h1>
        <p className="lead">AI UAT Engineer combines Spring AI, controlled tool calling, RAG, agent orchestration, deterministic browser execution, self-healing, persisted evidence, company/product workspaces and auditable UAT sessions.</p>
        <div className="button-row"><Link className="primary-button" to="/mission">Start New Mission</Link><Link className="secondary-button" to="/dashboard">Mission Dashboard</Link><Link className="secondary-button" to="/technology">Technology Stack</Link></div>
      </div>
      <div className="hero-card"><div className="hero-logo">A</div><strong>AI UAT ENGINEER 3.0</strong><span>Spring AI-Native QA Platform</span><small>Learning • Experimentation • AI Engineering Portfolio</small></div>
    </section>

    <section className="mission-banner"><strong>M1–M10 COMPLETE</strong><p>The implemented foundation now covers autonomous missions, RAG, test generation, orchestration, controlled healing, reliable deployment operations, company/product workspaces and persisted UAT session lifecycle. M11 is planned for performance and load testing.</p></section>

    <section className="metric-grid metric-grid-five">
      <article><strong>Spring AI</strong><span>Intelligence Runtime</span></article><article><strong>10 / 10</strong><span>Implemented Milestones</span></article><article><strong>M11</strong><span>Next Planned</span></article><article><strong>Evidence</strong><span>Backed Decisions</span></article><article><strong>Java-first</strong><span>Controlled Execution</span></article>
    </section>

    <section className="content-grid three-col">
      <article className="panel"><div className="eyebrow">WHY AI UAT ENGINEER</div><h2>One meaningful AI engineering problem</h2><p className="muted">AI UAT Engineer is built as a full-cycle autonomous UAT engineering platform rather than a test-generation demo.</p><ul className="clean-list"><li>Spring AI ChatClient for model integration</li><li>Controlled model-to-Java tool boundaries</li><li>RAG-grounded test reasoning</li><li>Persisted agent orchestration and evidence</li><li>Company/product/session isolation</li><li>Performance and load intelligence planned in M11</li></ul></article>
      <article className="panel span-two"><div className="eyebrow">AUTONOMOUS UAT FLOW</div><h2>From requirement to release confidence</h2><div className="flow-grid">{flow.map((item,index)=><div className="flow-step" key={item}><span>{String(index+1).padStart(2,'0')}</span><strong>{item}</strong></div>)}</div></article>
    </section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">PRODUCT ROADMAP</div><h2>AI UAT Engineer Roadmap</h2></div><span className="roadmap-progress">M1–M10 complete • M11 planned</span></div><div className="roadmap-grid">{roadmap.map(([m,title,detail,status])=><article className={`roadmap-card ${status}`} key={m}><div><b>{m}</b><span>{status==='done'?'✓':'○'}</span></div><strong>{title}</strong><p>{detail}</p></article>)}</div></section>
  </main>
}
