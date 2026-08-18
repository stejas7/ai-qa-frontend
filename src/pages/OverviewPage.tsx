import { Link } from 'react-router-dom';

const roadmap = [
  ['M1','Autonomous Mission','Core UAT flow','done'],
  ['M2','Knowledge / RAG Foundation','Grounded QA reasoning','done'],
  ['M3','Intelligent Test Generation','Risk, traceability, Excel + JSON','done'],
  ['M4','Advanced Automation & Multi-App Support','Registered targets and evidence','done'],
  ['M5','Agentic Orchestration','Requirement → design → automation → execution → diagnosis → QA decision','done'],
  ['M6','Self-Healing & Smart Recovery','Failure classification, safety policy, controlled repair and one retry','done'],
  ['M7','Spring AI Intelligence + Regression','ChatClient, controlled tools, RAG/pgvector and historical regression intelligence','progress'],
  ['M8','Defect Management & CI/CD Quality Gate','Jira/GitHub/Azure DevOps + release decision','planned']
] as const;

const flow=['Business Requirement','Spring AI + RAG','Requirement Intelligence','Intelligent Test Design','Agent Orchestration','Playwright Execution','Failure Diagnosis / Healing','QA Decision'];

export default function OverviewPage(){
  return <main className="page overview-page">
    <section className="hero-grid">
      <div>
        <div className="eyebrow">AURAVIS 3.0 • SPRING AI-NATIVE AUTONOMOUS QA ENGINEERING</div>
        <h1 className="hero-title">Your AI UAT Engineer. <span>Always On. Always Testing.</span></h1>
        <p className="lead">Auravis 3.0 evolves the platform around Spring AI, controlled tool calling, RAG, agent orchestration, deterministic browser execution, self-healing, persisted evidence and regression intelligence.</p>
        <div className="button-row"><Link className="primary-button" to="/mission">Start New Mission</Link><Link className="secondary-button" to="/dashboard">Mission Dashboard</Link><Link className="secondary-button" to="/technology">Technology Stack</Link></div>
      </div>
      <div className="hero-card"><div className="hero-logo">A</div><strong>AURAVIS 3.0</strong><span>Spring AI-Native QA Platform</span><small>Learning • Experimentation • AI Engineering Portfolio</small></div>
    </section>

    <section className="mission-banner"><strong>M7 IN PROGRESS</strong><p>Spring AI is now the active intelligence layer for requirement analysis and failure diagnosis. M7 is adding controlled QA tools first, followed by Spring AI RAG/pgvector and regression learning.</p></section>

    <section className="metric-grid metric-grid-five">
      <article><strong>Spring AI</strong><span>Intelligence Runtime</span></article><article><strong>6 / 8</strong><span>Milestones Complete</span></article><article><strong>M7</strong><span>Now In Progress</span></article><article><strong>Evidence</strong><span>Backed Decisions</span></article><article><strong>Java-first</strong><span>Controlled Execution</span></article>
    </section>

    <section className="content-grid three-col">
      <article className="panel"><div className="eyebrow">WHY AURAVIS 3.0</div><h2>One meaningful AI engineering problem</h2><p className="muted">Auravis is being built as a full-cycle autonomous AI QA engineering platform rather than a test-generation demo.</p><ul className="clean-list"><li>Spring AI ChatClient for model integration</li><li>Controlled model-to-Java tool boundaries</li><li>RAG-grounded test reasoning</li><li>Persisted agent orchestration and evidence</li><li>Historical regression intelligence next</li></ul></article>
      <article className="panel span-two"><div className="eyebrow">AUTONOMOUS UAT FLOW</div><h2>From requirement to release confidence</h2><div className="flow-grid">{flow.map((item,index)=><div className="flow-step" key={item}><span>{String(index+1).padStart(2,'0')}</span><strong>{item}</strong></div>)}</div></article>
    </section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">PRODUCT ROADMAP</div><h2>Auravis 3.0 Roadmap</h2></div><span className="roadmap-progress">6 / 8 complete • M7 in progress</span></div><div className="roadmap-grid">{roadmap.map(([m,title,detail,status])=><article className={`roadmap-card ${status}`} key={m}><div><b>{m}</b><span>{status==='done'?'✓':status==='progress'?'→':'○'}</span></div><strong>{title}</strong><p>{detail}</p></article>)}</div></section>
  </main>
}
