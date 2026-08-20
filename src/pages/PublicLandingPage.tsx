import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchDemoCatalog } from '../api/demoCatalog';

export default function PublicLandingPage(){
  const demo=useQuery({queryKey:['public-demo-catalog'],queryFn:fetchDemoCatalog,retry:false});
  const companies=demo.data?.companies??[];
  return <main className="page overview-page public-landing">
    <section className="hero-grid simple-hero"><div><div className="eyebrow">AI UAT ENGINEER</div><h1 className="hero-title">From business requirement to <span>release confidence.</span></h1><p className="lead">Register your company, add the product you want to validate, upload a requirement and let the platform build traceable UAT coverage, execute supported journeys and return evidence with a release recommendation.</p><div className="button-row"><Link className="primary-button" to="/account?mode=register">Register company</Link><Link className="secondary-button" to="/account?mode=login">Sign in</Link></div></div><div className="hero-card compact-brand"><div className="hero-logo">A</div><strong>ONE GUIDED FLOW</strong><span>Company → Product → Requirement → Autonomous UAT → Evidence → Report</span><small>No QA-tool knowledge required to start.</small></div></section>

    <section className="value-flow"><article><b>1</b><strong>Set up once</strong><p>Create your company workspace and register approved UAT product environments.</p></article><article><b>2</b><strong>Upload once</strong><p>Select a product and upload the BRD, PRD, story or requirement document.</p></article><article><b>3</b><strong>Get one outcome</strong><p>Review coverage, execution, evidence, failures and release readiness in one report.</p></article></section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">LIVE PRODUCT DEMO</div><h2>See what a populated workspace looks like</h2></div><span className="status processing">SIMULATED DATA</span></div><p className="muted">This read-only demo is intentionally labelled. It demonstrates the real company → product → requirement structure without pretending the records are customers.</p>
      {demo.isLoading&&<p className="muted">Loading demo workspace…</p>}
      {demo.isError&&<p className="muted">Demo preview is temporarily unavailable.</p>}
      {demo.data&&<><div className="summary-strip"><article><strong>{demo.data.companyCount}</strong><span>Demo companies</span></article><article><strong>{demo.data.productCount}</strong><span>Products</span></article><article><strong>{demo.data.userCount}</strong><span>Users</span></article><article><strong>{demo.data.requirementCount}</strong><span>Requirements</span></article></div><div className="use-case-grid">{companies.map(company=><article className="use-case-card" key={company.id}><strong>{company.name}</strong><p>{company.products.map(p=>p.name).join(' • ')}</p><span>{company.products.reduce((n,p)=>n+p.requirements.length,0)} requirement runs • {company.users.length} users</span></article>)}</div></>}
    </section>

    <section className="panel"><div className="eyebrow">WHY TEAMS USE IT</div><h2>Make UAT easier to understand and easier to prove</h2><div className="role-grid"><article><strong>QA team</strong><p>Less repetitive preparation and clearer failure/evidence handling.</p></article><article><strong>Product owner</strong><p>See whether business requirements became executable release coverage.</p></article><article><strong>Developer</strong><p>Get explainable failures and reproducible evidence earlier.</p></article><article><strong>Release manager</strong><p>Use traceability and test-completion evidence for the final decision.</p></article></div></section>
  </main>
}
