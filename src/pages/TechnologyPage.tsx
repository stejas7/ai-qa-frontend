const groups = [
  ['Backend & Architecture',['Java 21','Spring Boot 3.5','Spring Data JPA','REST APIs','Maven']],
  ['Frontend',['React 19','TypeScript','Vite','React Router','TanStack Query']],
  ['AI & Agentic Engineering',['Spring AI 1.1.8','ChatClient','OpenAI Model Integration','RAG','AI Agents','Deterministic Fallback']],
  ['QA Automation',['Playwright for Java','UAT Automation','Assertions','Screenshots / Evidence','Excel + JSON Export']],
  ['Data & Knowledge',['PostgreSQL 16','pgvector-ready','JPA Persistence','RAG Knowledge Store','Execution History']],
  ['Cloud & DevOps',['Docker','Docker Compose','GitHub Actions','GHCR','AWS EC2']],
  ['Edge & Delivery',['Nginx','HTTPS / TLS','DuckDNS','Health Checks','Rollback']],
  ['Engineering Controls',['Controlled Tool Boundaries','Auditability','Evidence-backed Decisions','No UI Secrets']]
] as const;

export default function TechnologyPage(){return <main className="page">
  <div className="eyebrow">ENGINEERING SHOWCASE</div><h1>Technology Behind Auravis</h1>
  <p className="lead">A Java-first AI engineering portfolio project using Spring AI as the model integration layer for requirement intelligence and failure diagnosis, while deterministic Java services keep execution, policy, evidence and fallback behavior under application control.</p>
  <section className="tech-grid">{groups.map(([title,items])=><article className="panel tech-card" key={title}><h3>{title}</h3><div className="chip-row">{items.map(item=><span className="tech-chip" key={item}>{item}</span>)}</div></article>)}</section>
  <section className="architecture-flow">Business Requirement → React UI → Spring Boot APIs → Spring AI ChatClient → Requirement / Failure Intelligence → RAG / Knowledge → Agentic Java Orchestration → Playwright Execution → PostgreSQL Evidence → QA Decision → GitHub Actions → AWS EC2</section>
  <section className="panel portfolio-note"><strong>Why Spring AI 1.1.8?</strong><p className="muted">Auravis currently runs Spring Boot 3.5.x, so the Spring AI 1.1.x line is used for compatibility. Spring AI 2.0.x requires Spring Boot 4.x. This keeps the live product stable while still using the Spring-native ChatClient abstraction instead of hand-written OpenAI HTTP calls.</p></section>
</main>}
