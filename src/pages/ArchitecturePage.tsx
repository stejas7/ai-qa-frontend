const layers = [
  ['Experience layer', 'React + TypeScript', 'Public product/technology/architecture pages, login, company workspace, UAT dashboards and Platform Admin oversight.'],
  ['Identity & access', 'Spring Security + OAuth2', 'Email/password authentication, Google SSO, GitHub SSO, company roles and PLATFORM_ADMIN authorization.'],
  ['Application services', 'Java 21 + Spring Boot', 'Tenant-aware APIs for products, requirements, execution, evidence, test management, analytics, performance and administration.'],
  ['AI engineering', 'Spring AI + OpenAI + RAG', 'Requirement understanding, retrieval-augmented context, controlled QA tools, agent orchestration and deterministic Java fallback.'],
  ['Automation engine', 'Playwright + generated automation', 'Browser execution, validation, screenshots, diagnostics, self-healing experiments and reusable automation assets.'],
  ['Data & evidence', 'PostgreSQL + persistent evidence storage', 'Companies, users, products, runs, traceability, analytics, knowledge metadata and execution evidence.'],
  ['Delivery & runtime', 'Docker + GHCR + GitHub Actions + AWS EC2 + Nginx', 'Immutable image build, deploy, health gates, Spring AI runtime verification, SSO verification and rollback protection.']
] as const;

const flow = [
  'User / Company',
  'React UI',
  'Nginx / HTTPS',
  'Spring Security',
  'Spring Boot APIs',
  'Spring AI / RAG / Agents',
  'Playwright UAT',
  'PostgreSQL + Evidence',
  'Release Decision'
] as const;

export default function ArchitecturePage(){
  return <main className="page">
    <div className="eyebrow">LEARNING ARCHITECTURE • END TO END</div>
    <h1>AI UAT Engineer Architecture</h1>
    <p className="lead">A learning-first view of how the product connects Java, Spring Boot, Spring AI, RAG, browser automation, data, security and cloud delivery into one autonomous UAT platform.</p>

    <section className="panel">
      <div className="eyebrow">REQUEST TO RELEASE FLOW</div>
      <div className="example-flow architecture-flow">
        {flow.map((item,index)=><span key={item}>{item}{index<flow.length-1&&<i>→</i>}</span>)}
      </div>
    </section>

    <section className="roadmap-grid">
      {layers.map(([title,tech,detail])=><article className="roadmap-card done" key={title}>
        <div><strong>{title}</strong><span>{tech}</span></div>
        <p>{detail}</p>
      </article>)}
    </section>

    <section className="panel">
      <div className="eyebrow">CONTROL & OBSERVABILITY</div>
      <h2>Platform Admin path</h2>
      <div className="example-flow">
        <span>Visitor analytics</span><i>→</i><span>Tenant oversight</span><i>→</i><span>Failure diagnostics</span><i>→</i><span>Performance</span><i>→</i><strong>Release confidence</strong>
      </div>
    </section>

    <section className="panel">
      <div className="eyebrow">CI/CD QUALITY GATE</div>
      <h2>Build to verified UAT runtime</h2>
      <div className="example-flow">
        <span>Maven package</span><i>→</i><span>Docker image</span><i>→</i><span>GHCR</span><i>→</i><span>EC2 deploy</span><i>→</i><span>Health</span><i>→</i><span>Spring AI</span><i>→</i><span>SSO</span><i>→</i><strong>GREEN</strong>
      </div>
    </section>
  </main>
}
