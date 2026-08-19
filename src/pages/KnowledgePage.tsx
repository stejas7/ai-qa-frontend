import { Link } from 'react-router-dom';

const problems=[
['Requirement-to-test translation','Automate interpretation of BRDs, PRDs and user stories while preserving traceability to the original requirement.'],
['Repetitive QA execution','Use deterministic Playwright execution so generated plans become repeatable browser tests.'],
['Fragmented evidence','Keep mission history, test results, screenshots and QA decisions in one product flow.'],
['Failure investigation','Separate automation problems from possible product defects before recovery or escalation.'],
['Knowledge loss','Use RAG and persisted project knowledge to ground future requirement and test reasoning.'],
['Slow release feedback','Move quality feedback earlier and build toward an evidence-backed CI/CD quality gate.']
] as const;

const future=[
['Requirement-driven QA','Provide a complete business requirement and UAT target; AI UAT Engineer owns the downstream flow with minimal manual intervention.'],
['Specialized AI agents','Requirement, knowledge, planning, execution, diagnosis and QA-decision responsibilities cooperate through controlled orchestration.'],
['Safe self-healing','Eligible technical automation failures can be repaired and retried without weakening the original business expectation.'],
['Learning regression','Historical missions and failures can guide smarter regression scope and reusable knowledge.'],
['Defect management','Genuine defects can become evidence-backed Jira, GitHub Issues or Azure DevOps work items after classification and duplicate checks.'],
['Continuous release confidence','CI/CD can eventually consume an auditable quality recommendation based on requirement coverage, execution and evidence.']
] as const;

export default function KnowledgePage(){return <main className="page">
<div className="eyebrow">KNOWLEDGE • REAL-WORLD VALUE</div><h1>What problem is AI UAT Engineer trying to solve?</h1><p className="lead">Business requirements often pass through several manual QA hand-offs before teams know whether a release actually satisfies the intended behavior. AI UAT Engineer provides an autonomous, explainable UAT workflow with strong Java controls and evidence at every step.</p>
<section className="impact-grid">{problems.map(([title,text],i)=><article className="panel impact-card" key={title}><span className="impact-number">{i+1}</span><h3>{title}</h3><p className="muted">{text}</p></article>)}</section>
<section className="content-grid two-col"><article className="panel"><div className="eyebrow">TRADITIONAL FLOW</div><h2>Manual quality hand-offs</h2><pre className="text-flow">Business Requirement
↓
Manual requirement analysis
↓
Manual test-case writing
↓
Automation scripting
↓
Manual / scheduled execution
↓
Failure investigation
↓
Regression re-run
↓
Release recommendation</pre></article><article className="panel future-panel"><div className="eyebrow">AI UAT ENGINEER TARGET STATE</div><h2>Autonomous UAT flow</h2><pre className="text-flow">Business Requirement / UAT Target
↓
Requirement Intelligence + RAG
↓
Intelligent Test Design
↓
Agentic Orchestration
↓
Deterministic Playwright Execution
↓
Failure Diagnosis + Safe Recovery
↓
Regression / Defect Intelligence
↓
Evidence-backed CI/CD Quality Gate</pre></article></section>
<section className="panel future-panel"><div className="eyebrow">WHEN THE ROADMAP IS COMPLETE</div><h2>What AI UAT Engineer is intended to become</h2><div className="impact-grid compact">{future.map(([title,text])=><article className="impact-card inner-card" key={title}><h3>{title}</h3><p className="muted">{text}</p></article>)}</div></section>
<section className="panel boundary-panel"><h2>Important engineering boundary</h2><p className="muted">AI UAT Engineer is not intended to hide real defects or blindly make tests pass. AI understands, plans and diagnoses; Java controls state, policy and tool boundaries; Playwright performs permitted browser actions; evidence shows what actually happened. Sensitive actions and low-confidence recovery should remain governed.</p></section>
<section className="panel"><h2>Why this matters as an AI engineering project</h2><p className="muted">The product brings Java/Spring Boot, React, RAG, AI agents, deterministic automation, PostgreSQL persistence, observability, Docker, CI/CD and AWS deployment around one meaningful end-to-end business problem instead of isolated AI demos.</p><div className="button-row"><Link className="primary-button" to="/mission">Start UAT</Link><Link className="secondary-button" to="/dashboard">View UAT Results</Link></div></section>
</main>}
