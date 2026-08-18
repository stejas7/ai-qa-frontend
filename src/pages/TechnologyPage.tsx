const groups = [
  ['Backend & Architecture',['Java 21','Spring Boot 3.5','Spring Data JPA','REST APIs','Maven']],
  ['Frontend',['React 19','TypeScript','Vite','React Router','TanStack Query']],
  ['AI & Agentic Engineering',['OpenAI-compatible API','RAG','AI Agents','Agent Orchestration','Deterministic Fallback']],
  ['QA Automation',['Playwright for Java','UAT Automation','Assertions','Screenshots / Evidence','Excel + JSON Export']],
  ['Data & Knowledge',['PostgreSQL 16','pgvector-ready','JPA Persistence','RAG Knowledge Store','Execution History']],
  ['Cloud & DevOps',['Docker','Docker Compose','GitHub Actions','GHCR','AWS EC2']],
  ['Edge & Delivery',['Nginx','HTTPS / TLS','DuckDNS','Health Checks','Rollback']],
  ['Engineering Controls',['Controlled Tool Boundaries','Auditability','Evidence-backed Decisions','No UI Secrets']]
] as const;

export default function TechnologyPage(){return <main className="page">
  <div className="eyebrow">ENGINEERING SHOWCASE</div><h1>Technology Behind Auravis</h1>
  <p className="lead">A Java-first AI engineering portfolio project exploring requirement intelligence, RAG, agentic orchestration, deterministic browser automation, persistent evidence, a React product experience and cloud delivery.</p>
  <section className="tech-grid">{groups.map(([title,items])=><article className="panel tech-card" key={title}><h3>{title}</h3><div className="chip-row">{items.map(item=><span className="tech-chip" key={item}>{item}</span>)}</div></article>)}</section>
  <section className="architecture-flow">Business Requirement → React UI → Spring Boot APIs → RAG / Knowledge → Intelligent Test Design → Agentic Java Orchestration → Playwright Execution → PostgreSQL Evidence → QA Decision → GitHub Actions → AWS EC2</section>
  <section className="panel portfolio-note"><strong>Portfolio focus</strong><p className="muted">Auravis is for learning, experimentation and building an AI Engineering portfolio. Technology shown here should represent implemented or directly integrated capabilities; planned roadmap items stay identified as planned.</p></section>
</main>}
