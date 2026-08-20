const milestones=[
['M1','Autonomous Mission','Requirement upload and end-to-end UAT mission flow'],
['M2','Knowledge / RAG Foundation','Persisted knowledge and retrieval foundation'],
['M3','Intelligent Test Generation','Requirement-to-test design generation'],
['M4','Multi-App Automation','Registered targets and broader application support'],
['M5','Agentic Orchestration','Coordinated AI/Java agent workflow'],
['M6','Self-Healing','Controlled recovery and failure diagnosis'],
['M7','Regression Intelligence','Learning, regression context and QA tools'],
['M8','Autonomous CI/CD Gate','Health, runtime verification and rollback'],
['M9','Evidence Reliability','Persisted evidence and report hardening'],
['M10','Release Intelligence','READY/BLOCKED release decision flow'],
['M11','Performance Validation','Load evidence, latency and SLO tracking'],
['M12','Automation Assets','Reusable generated automation scripts'],
['M13','Test Management','Traceability, execution status and exit criteria'],
['M14','Authentication Foundation','Persisted application identities and roles'],
['M15','Company Tenancy','Company-isolated users, products and UAT data'],
['M16','Product Credentials','Secure runtime credential references'],
['M17','Company Workspace','Company admin, team and registered product experience'],
['M18','Operational UX','Product onboarding, dashboards and reporting refinement'],
['M19','Tenant E2E UAT','Authenticated product → requirement → execution → evidence'],
['M20','Platform Owner Oversight','Cross-tenant monitoring, failure, performance, audit and drill-down']
] as const;

export default function RoadmapPage(){return <main className="page"><div className="eyebrow">PRODUCT JOURNEY • M1–M20</div><h1>AI UAT Engineer Roadmap</h1><p className="lead">A learning-first path from a Java/Spring Boot QA workflow into a multi-tenant, agentic UAT platform with evidence, security, performance and platform oversight.</p><section className="roadmap-grid">{milestones.map(([id,title,detail])=><article className="roadmap-card done" key={id}><div><strong>{id}</strong><span>IMPLEMENTED / STABILIZING</span></div><strong>{title}</strong><p>{detail}</p></article>)}</section><section className="panel"><div className="eyebrow">4.0 RELEASE PATH</div><h2>Current stabilization focus</h2><div className="example-flow"><span>Login + SSO</span><i>→</i><span>Platform Admin</span><i>→</i><span>M20.8</span><i>→</i><span>Load + Security</span><i>→</i><strong>4.0 Stable</strong></div></section></main>}
