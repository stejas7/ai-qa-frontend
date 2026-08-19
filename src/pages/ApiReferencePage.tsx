type Endpoint={method:string;path:string;purpose:string;milestone:string};
type Group={title:string;description:string;endpoints:Endpoint[]};
const groups:Group[]=[
  {title:'Mission Pipeline',description:'Requirement upload, persisted mission history, status and generated test exports.',endpoints:[
    {method:'POST',path:'/api/pipeline/upload',purpose:'Upload BRD/PRD/requirement file and start an asynchronous AI UAT Engineer mission.',milestone:'M1–M6'},
    {method:'GET',path:'/api/pipeline/runs',purpose:'List persisted requirement-processing runs.',milestone:'M1'},
    {method:'GET',path:'/api/pipeline/stats',purpose:'Mission processing dashboard metrics.',milestone:'M1'},
    {method:'GET',path:'/api/pipeline/runs/{id}',purpose:'Get one mission including status, stage, errors and structured result.',milestone:'M1'},
    {method:'GET',path:'/api/pipeline/runs/{id}/test-cases.json',purpose:'Download the structured mission result as JSON.',milestone:'M3'},
    {method:'GET',path:'/api/pipeline/runs/{id}/test-cases.xlsx',purpose:'Download generated test cases as Excel.',milestone:'M3'}]},
  {title:'Execution & Evidence',description:'Deterministic Playwright execution, history, metrics, screenshots and M6-controlled recovery.',endpoints:[
    {method:'POST',path:'/api/execution/run',purpose:'Execute a controlled Playwright test request with M6 self-healing policy integrated into runtime failures.',milestone:'M4/M6'},
    {method:'GET',path:'/api/execution/history',purpose:'Read the latest persisted execution records.',milestone:'M4'},
    {method:'GET',path:'/api/execution/stats',purpose:'Execution totals, PASS/FAIL and pass rate.',milestone:'M4'},
    {method:'GET',path:'/api/execution/evidence/{file}',purpose:'Retrieve execution screenshot evidence.',milestone:'M4/M6'}]},
  {title:'Application Targets',description:'Registered UAT applications used by missions and execution.',endpoints:[
    {method:'GET',path:'/api/applications?activeOnly=true',purpose:'List active registered UAT targets.',milestone:'M4'},
    {method:'POST',path:'/api/applications',purpose:'Register a UAT application target.',milestone:'M4'},
    {method:'PATCH',path:'/api/applications/{id}/active?value=true',purpose:'Enable or disable an application target.',milestone:'M4'}]},
  {title:'Agent Orchestration',description:'Completed M5 end-to-end orchestration plus persisted run/step observability.',endpoints:[
    {method:'POST',path:'/api/agents/pipeline',purpose:'Run the full M5 flow: requirement analysis → test design → automation generation → UAT execution → diagnosis → quality decision.',milestone:'M5'},
    {method:'GET',path:'/api/agent-activity/summary',purpose:'Agent-run totals, completed M5 status and orchestration flow.',milestone:'M5'},
    {method:'GET',path:'/api/agent-activity/runs?limit=20',purpose:'Recent persisted agent orchestration runs.',milestone:'M5'},
    {method:'GET',path:'/api/agent-activity/runs/{runId}/steps',purpose:'Ordered agent execution trace for a selected run.',milestone:'M5'}]},
  {title:'Self-Healing',description:'Completed M6 conservative healing policy. Only recoverable automation failures may heal; assertion/business failures are protected.',endpoints:[
    {method:'POST',path:'/api/healing/evaluate',purpose:'Evaluate a proposed repair against the deterministic healing policy.',milestone:'M6'},
    {method:'GET',path:'/api/healing/history',purpose:'Read persisted healing decisions and proposed repairs.',milestone:'M6'},
    {method:'GET',path:'/api/healing/stats',purpose:'Healing attempts, allowed/blocked counts, auto-heal rate and M6 policy/status.',milestone:'M6'}]},
  {title:'Failure Intelligence & Quality',description:'Failure diagnosis and deterministic release-quality evaluation used by M5/M6.',endpoints:[
    {method:'POST',path:'/api/failure-analysis/analyze',purpose:'Diagnose a failed test with deterministic fallback and optional AI analysis.',milestone:'M5/M6'},
    {method:'POST',path:'/api/quality-gate/evaluate',purpose:'Return an evidence-based APPROVED or BLOCKED release decision.',milestone:'M5/M8'}]},
  {title:'Product Analytics',description:'Privacy-friendly anonymous visitor analytics used by the React UAT Results experience.',endpoints:[
    {method:'POST',path:'/api/analytics/visit',purpose:'Record an anonymous React route visit.',milestone:'Product'},
    {method:'GET',path:'/api/analytics/stats',purpose:'Visitor and page-view summary with seven-day traffic.',milestone:'Product'},
    {method:'GET',path:'/api/analytics/recent',purpose:'Recent anonymous visitor activity.',milestone:'Product'}]}
];
const methodClass=(method:string)=>`api-method ${method.toLowerCase()}`;
export default function ApiReferencePage(){
  const total=groups.reduce((n,g)=>n+g.endpoints.length,0);
  return <main className="page api-page">
    <div className="eyebrow">ENGINEERING SHOWCASE • BACKEND CONTRACT</div>
    <h1>AI UAT Engineer Backend API Reference</h1>
    <p className="lead">This page documents the product-facing REST contract between the React frontend and the Java/Spring Boot backend.</p>
    <section className="metric-grid four compact"><article><strong>{total}</strong><span>Documented endpoints</span></article><article><strong>{groups.length}</strong><span>API domains</span></article><article><strong>REST + JSON</strong><span>Primary contract</span></article><article><strong>/actuator/health</strong><span>Deployment health</span></article></section>
    <section className="panel api-note"><div className="eyebrow">LIVE DEPLOYMENT</div><h2>Configured public endpoint</h2><p className="muted">React is served by Nginx. Requests under <code>/api/*</code> and <code>/actuator/*</code> are proxied to the Spring Boot backend running on EC2.</p></section>
    {groups.map(group=><section className="panel" key={group.title}><div className="section-heading"><div><div className="eyebrow">API DOMAIN</div><h2>{group.title}</h2><p className="muted">{group.description}</p></div><span className="status completed">{group.endpoints.length} endpoints</span></div><div className="table-wrap"><table className="api-table"><thead><tr><th>Method</th><th>Endpoint</th><th>Purpose</th><th>Milestone</th></tr></thead><tbody>{group.endpoints.map(endpoint=><tr key={`${endpoint.method}-${endpoint.path}`}><td><span className={methodClass(endpoint.method)}>{endpoint.method}</span></td><td><code>{endpoint.path}</code></td><td>{endpoint.purpose}</td><td><span className="tech-chip">{endpoint.milestone}</span></td></tr>)}</tbody></table></div></section>)}
    <section className="panel boundary-panel"><div className="eyebrow">ENGINEERING BOUNDARY</div><h2>Why this API layer matters</h2><p className="lead">AI UAT Engineer keeps AI reasoning, React presentation and deterministic system actions separated. React talks to documented REST endpoints; Java owns policy and persisted state; Playwright performs allowed browser actions; PostgreSQL stores evidence and history.</p></section>
  </main>
}
