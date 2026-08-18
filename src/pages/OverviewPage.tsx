import { Link } from 'react-router-dom';

const roadmap = [
  ['M1','Autonomous Mission','Core UAT flow','done'],
  ['M2','Knowledge / RAG Foundation','Grounded QA reasoning','done'],
  ['M3','Intelligent Test Generation','Risk, traceability, Excel + JSON','done'],
  ['M4','Advanced Automation & Multi-App Support','Registered targets and evidence','done'],
  ['M5','Agentic Orchestration','Specialized agents coordinated in one mission','progress'],
  ['M6','Self-Healing & Smart Recovery','Controlled retries and repair','planned'],
  ['M7','Regression & Learning Intelligence','Historical learning and smarter regression','planned'],
  ['M8','Defect Management & CI/CD Quality Gate','Jira/GitHub/Azure DevOps + release decision','planned']
] as const;

const flow=['Business Requirement','Knowledge / RAG','Requirement Intelligence','Intelligent Test Design','Playwright Automation','UAT Execution','Failure Diagnosis','QA Decision'];

export default function OverviewPage(){
  return <main className="page overview-page">
    <section className="hero-grid">
      <div>
        <div className="eyebrow">AURAVIS 2.0 • AUTONOMOUS AI UAT ENGINEER</div>
        <h1 className="hero-title">Your AI UAT Engineer. <span>Always On. Always Testing.</span></h1>
        <p className="lead">From business requirement to release confidence — autonomously. Auravis explores how Java, AI, RAG, browser automation, evidence and cloud delivery can work together in one end-to-end UAT product.</p>
        <div className="button-row"><Link className="primary-button" to="/mission">Start New Mission</Link><Link className="secondary-button" to="/dashboard">Mission Dashboard</Link></div>
      </div>
      <div className="hero-card"><div className="hero-logo">A</div><strong>AURAVIS</strong><span>Autonomous UAT Engineer</span><small>Learning • Experimentation • AI Engineering Portfolio</small></div>
    </section>

    <section className="mission-banner"><strong>MISSION</strong><p>Build an autonomous, explainable UAT workflow that reduces repetitive QA execution while keeping deterministic controls, traceability and evidence at every step.</p></section>

    <section className="metric-grid metric-grid-five">
      <article><strong>24×7</strong><span>Autonomous Testing Target</span></article><article><strong>Higher</strong><span>Test Coverage</span></article><article><strong>Faster</strong><span>Release Feedback</span></article><article><strong>Evidence</strong><span>Backed Decisions</span></article><article><strong>Java-first</strong><span>Controlled Execution</span></article>
    </section>

    <section className="content-grid three-col">
      <article className="panel"><div className="eyebrow">WHY AURAVIS</div><h2>One meaningful AI engineering problem</h2><p className="muted">Auravis is being built as a full-cycle autonomous AI QA engineer rather than a test-generation demo.</p><ul className="clean-list"><li>Requirement understanding with traceability</li><li>RAG-grounded test design</li><li>Deterministic Playwright execution</li><li>Persisted evidence and mission history</li><li>Failure diagnosis before future self-healing</li></ul></article>
      <article className="panel span-two"><div className="eyebrow">AUTONOMOUS UAT FLOW</div><h2>From requirement to release confidence</h2><div className="flow-grid">{flow.map((item,index)=><div className="flow-step" key={item}><span>{String(index+1).padStart(2,'0')}</span><strong>{item}</strong></div>)}</div></article>
    </section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">PRODUCT ROADMAP</div><h2>Auravis 2.0 Roadmap</h2></div><span className="roadmap-progress">4 / 8 complete • M5 in progress</span></div><div className="roadmap-grid">{roadmap.map(([m,title,detail,status])=><article className={`roadmap-card ${status}`} key={m}><div><b>{m}</b><span>{status==='done'?'✓':status==='progress'?'→':'○'}</span></div><strong>{title}</strong><p>{detail}</p></article>)}</div></section>
  </main>
}
