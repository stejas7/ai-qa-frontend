import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchDemoCatalog } from '../api/demoCatalog';

const outcomes=[
  ['Requirement coverage','See which business requirements became test conditions and executable UAT coverage.'],
  ['Functional evidence','Review PASS/FAIL execution, diagnostics and durable evidence for supported journeys.'],
  ['Performance evidence','Compare latency, throughput and error-rate results against release thresholds.'],
  ['Release recommendation','Get one evidence-backed READY / BLOCKED outcome instead of stitching reports together manually.']
] as const;

const releaseChecks=[
  ['Coverage','Were the uploaded business requirements converted into traceable UAT scenarios?'],
  ['Functional result','Did the supported user journeys pass with usable evidence?'],
  ['Business risk','Are any high-risk or business-critical scenarios failing or still not executed?'],
  ['Performance','Do latency, throughput and error-rate results remain inside the configured release thresholds?'],
  ['Evidence','Is there enough traceability and execution evidence to explain the decision?']
] as const;

const timeSavings=[
  ['Requirement analysis','Business intent, acceptance criteria and risk are extracted from the same upload instead of repeatedly analysed by hand.'],
  ['Test preparation','Traceable scenarios and test cases are generated from the requirement instead of rewritten across documents and tools.'],
  ['Environment setup','Teams select a registered product/environment instead of entering URLs and target details for every UAT cycle.'],
  ['Execution & evidence','Supported journeys, diagnostics, screenshots and execution history are collected in one flow.'],
  ['Release reporting','Coverage, failures, performance and evidence are consolidated into one release recommendation.']
] as const;

export default function PublicLandingPage(){
  const demo=useQuery({queryKey:['public-demo-catalog'],queryFn:fetchDemoCatalog,retry:false});
  const companies=demo.data?.companies??[];
  return <main className="page overview-page public-landing">
    <section className="hero-grid simple-hero"><div><div className="eyebrow">AI UAT ENGINEER</div><h1 className="hero-title">Turn a business requirement into <span>release evidence.</span></h1><p className="lead">Register the company and product once, upload a requirement, then let AI UAT Engineer build traceable coverage, execute supported journeys, collect evidence and return a controlled release recommendation.</p><div className="button-row"><Link className="primary-button" to="/account?mode=register">Register company</Link><Link className="secondary-button" to="/account?mode=login">Sign in</Link></div><p className="muted">Understand the product and inspect the simulated workspace below without registering.</p></div><div className="hero-card compact-brand"><div className="hero-logo">A</div><strong>ONE BUSINESS FLOW</strong><span>Company → Product → Requirement → Tests → Execution → Evidence → Release Decision</span><small>AI reasons. Java controls policy. Playwright executes. Evidence supports the decision.</small></div></section>

    <section className="value-flow"><article><b>1</b><strong>Set up once</strong><p>Create the company workspace, users and approved UAT product environments.</p></article><article><b>2</b><strong>Upload once</strong><p>Select the product and upload a BRD, PRD, story or requirement document.</p></article><article><b>3</b><strong>Review one outcome</strong><p>See coverage, execution, evidence, failures, performance and release readiness together.</p></article></section>

    <section className="panel"><div className="eyebrow">HOW RELEASE IS HANDLED</div><h2>Release readiness comes from evidence, not an AI guess</h2><p className="muted">The platform combines requirement traceability, functional execution, business risk, performance thresholds and evidence. A failed high-risk scenario or failed release threshold can block the recommendation even when many tests pass.</p><div className="use-case-grid">{releaseChecks.map(([title,detail])=><article className="use-case-card" key={title}><strong>{title}</strong><p>{detail}</p></article>)}</div><div className="example-flow"><span>Requirement</span><i>→</i><span>Coverage</span><i>→</i><span>Execution</span><i>→</i><span>Risk + Performance</span><i>→</i><strong>READY / BLOCKED</strong></div></section>

    <section className="panel"><div className="eyebrow">HOW IT SAVES TEAM TIME</div><h2>Remove repeated UAT preparation and reporting work</h2><p className="muted">The time saving comes from removing duplicate hand-offs: reading the same requirement, rewriting tests, configuring the same target, collecting screenshots, reconciling failures and manually assembling release reports.</p><div className="use-case-grid">{timeSavings.map(([title,detail])=><article className="use-case-card" key={title}><strong>{title}</strong><p>{detail}</p></article>)}</div><div className="example-flow"><strong>Manual</strong><span>Review → Design → Configure → Execute → Evidence → Report</span><i>→</i><strong>AI UAT Engineer</strong><span>Upload once → Review one report</span></div></section>

    <section className="panel"><div className="eyebrow">WHAT YOU RECEIVE</div><h2>One UAT report instead of disconnected manual steps</h2><div className="use-case-grid">{outcomes.map(([title,detail])=><article className="use-case-card" key={title}><strong>{title}</strong><p>{detail}</p></article>)}</div><div className="example-flow"><span>REQ-001</span><i>→</i><span>High-risk test</span><i>→</i><span>Automation</span><i>→</i><span>Evidence</span><i>→</i><strong>Release Ready / Blocked</strong></div></section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">SIMULATED PRODUCT WORKSPACE</div><h2>Explore what a populated company workspace looks like</h2></div><span className="status processing">DEMO DATA</span></div><p className="muted">This is intentionally simulated data, not customer data. It demonstrates the real company → users → products → requirements structure visitors will work with after registration.</p>
      {demo.isLoading&&<p className="muted">Loading demo workspace…</p>}
      {demo.isError&&<p className="muted">Demo preview is temporarily unavailable. Registration and sign-in remain available.</p>}
      {demo.data&&<><div className="summary-strip"><article><strong>{demo.data.companyCount}</strong><span>Companies</span></article><article><strong>{demo.data.productCount}</strong><span>Products</span></article><article><strong>{demo.data.userCount}</strong><span>Users</span></article><article><strong>{demo.data.requirementCount}</strong><span>Requirement runs</span></article></div><div className="use-case-grid">{companies.map(company=><article className="use-case-card" key={company.id}><strong>{company.name}</strong><p>{company.products.map(p=>p.name).join(' • ')}</p><span>{company.users.length} users • {company.products.reduce((n,p)=>n+p.requirements.length,0)} requirement runs</span></article>)}</div></>}
    </section>

    <section className="panel"><div className="eyebrow">WHO GETS VALUE</div><h2>Useful across the release team</h2><div className="role-grid"><article><strong>QA team</strong><p>Reduce repetitive UAT preparation and focus attention on business risk.</p></article><article><strong>Product owner</strong><p>See whether acceptance requirements became real executable coverage.</p></article><article><strong>Developer</strong><p>Receive explainable failures and reproducible evidence instead of vague feedback.</p></article><article><strong>Release manager</strong><p>Use traceability, functional evidence and performance evidence for the final decision.</p></article></div></section>

    <section className="panel"><div className="eyebrow">WHY IT IS DIFFERENT</div><h2>AI helps with reasoning; Java and Playwright keep execution controlled</h2><div className="value-flow"><article><b>AI</b><strong>Understand</strong><p>Requirement analysis, risk reasoning, grounded product context and failure explanation.</p></article><article><b>QA</b><strong>Control</strong><p>Versioned automation, bounded healing, tenant scope and auditable evidence.</p></article><article><b>UAT</b><strong>Decide</strong><p>Expected vs actual results, traceability and completion evidence drive the release outcome.</p></article></div></section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">START WHEN READY</div><h2>Create your company workspace</h2></div></div><p className="muted">Registration creates the first Company Admin. From there you can add users, register products and start autonomous UAT against approved environments.</p><div className="button-row"><Link className="primary-button" to="/account?mode=register">Register company</Link><Link className="secondary-button" to="/account?mode=login">Already registered? Sign in</Link></div></section>
  </main>
}
