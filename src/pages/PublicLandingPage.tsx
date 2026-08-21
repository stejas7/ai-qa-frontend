import { Link } from 'react-router-dom';
import ProductExplainer from '../components/ProductExplainer';

const steps=[
  ['1','Tell us what changed','Choose your product and add the business requirement or feature you want to validate.'],
  ['2','AI prepares and checks it','AI UAT Engineer turns the requirement into UAT scenarios, runs supported user journeys and keeps proof of what happened.'],
  ['3','Get one clear release view','See what passed, what failed, the evidence behind it and whether the release looks READY or BLOCKED.']
] as const;

const benefits=[
  ['Less manual preparation','Reduce repeated requirement reading, test writing, setup and reporting work.'],
  ['Real evidence','Screenshots, execution results and traceability stay connected to the requirement.'],
  ['Faster understanding','Teams can see the important failures and business risks without combining many reports.'],
  ['Clearer release decision','Coverage, functional results, risk and evidence come together in one place.']
] as const;

const roles=[
  ['QA / UAT team','Spend more time reviewing risk and failures, and less time repeating preparation work.'],
  ['Product owner','See whether the requested feature was actually covered and validated.'],
  ['Developer','Get clearer failure information and evidence for faster investigation.'],
  ['Release manager','Review one evidence-backed view before deciding whether to move forward.']
] as const;

export default function PublicLandingPage(){
  return <main className="page overview-page public-landing">
    <section className="hero-grid simple-hero">
      <div>
        <div className="eyebrow">AI UAT ENGINEER</div>
        <h1 className="hero-title">From a business requirement to <span>release confidence.</span></h1>
        <p className="lead">AI UAT Engineer helps a team understand what needs to be tested, checks supported customer journeys, keeps evidence and brings the result into one simple release view.</p>
        <div className="button-row">
          <Link className="primary-button" to="/login">Try the product</Link>
          <Link className="secondary-button" to="/product-blueprint">See how it works</Link>
        </div>
        <p className="muted">Learning project • UAT environment • Built to explore how AI can participate in real software delivery.</p>
      </div>
      <div className="hero-card compact-brand">
        <div className="hero-logo">A</div>
        <strong>ONE SIMPLE FLOW</strong>
        <span>Requirement → Test → Check → Evidence → Release Decision</span>
        <small>You describe the change. The platform helps turn it into evidence you can review.</small>
      </div>
    </section>

    <ProductExplainer/>

    <section className="panel">
      <div className="eyebrow">HOW IT WORKS</div>
      <h2>Three steps a non-technical stakeholder can follow</h2>
      <div className="value-flow">
        {steps.map(([number,title,detail])=><article key={number}><b>{number}</b><strong>{title}</strong><p>{detail}</p></article>)}
      </div>
    </section>

    <section className="panel">
      <div className="eyebrow">SIMPLE EXAMPLE</div>
      <h2>A checkout feature is ready for UAT</h2>
      <p className="muted">The product owner provides the checkout requirement. AI UAT Engineer prepares the important scenarios, checks the supported flow, records what happened and gives the team one reviewable outcome.</p>
      <div className="example-flow">
        <span>Checkout requirement</span><i>→</i><span>Important scenarios</span><i>→</i><span>User journey checked</span><i>→</i><span>Evidence collected</span><i>→</i><strong>READY / BLOCKED</strong>
      </div>
    </section>

    <section className="panel">
      <div className="eyebrow">WHY A TEAM WOULD USE IT</div>
      <h2>Make UAT easier to understand and easier to review</h2>
      <div className="use-case-grid">
        {benefits.map(([title,detail])=><article className="use-case-card" key={title}><strong>{title}</strong><p>{detail}</p></article>)}
      </div>
    </section>

    <section className="panel">
      <div className="eyebrow">WHO IT HELPS</div>
      <h2>One shared view for the release team</h2>
      <div className="role-grid">
        {roles.map(([title,detail])=><article key={title}><strong>{title}</strong><p>{detail}</p></article>)}
      </div>
    </section>

    <section className="panel">
      <div className="eyebrow">WANT THE TECHNICAL DETAIL?</div>
      <h2>Open the Product Blueprint</h2>
      <p className="muted">The Product Blueprint keeps the technical learning material separate from this simple product explanation. It includes product flow, architecture, technology stack, database structure and the M1–M30 learning roadmap.</p>
      <div className="button-row">
        <Link className="primary-button" to="/product-blueprint">Open Product Blueprint</Link>
        <Link className="secondary-button" to="/login">Sign in</Link>
      </div>
    </section>
  </main>
}
