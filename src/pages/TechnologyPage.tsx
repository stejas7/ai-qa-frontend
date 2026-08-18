const groups = [
  ['Backend & Architecture',['Java 21','Spring Boot 3.5','Spring Data JPA','REST APIs','Maven']],
  ['Frontend',['React 19','TypeScript','Vite','React Router','TanStack Query']],
  ['Spring AI Runtime',['Spring AI 1.1.8','ChatClient','OpenAI Integration','Tool Calling','Typed AI Services']],
  ['AI & Agentic Engineering',['Requirement Intelligence','Failure Diagnosis','RAG','AI Agents','Agent Orchestration','Deterministic Fallback']],
  ['M7 Intelligence Platform',['Controlled QA Tools','Spring AI RAG - integrating','pgvector - integrating','Regression Intelligence - next','TEJAS Spring AI - next']],
  ['QA Automation',['Playwright for Java','UAT Automation','Assertions','Screenshots / Evidence','Excel + JSON Export']],
  ['Data & Knowledge',['PostgreSQL 16','pgvector-ready','JPA Persistence','RAG Knowledge Store','Execution History']],
  ['Cloud & DevOps',['Docker','Docker Compose','GitHub Actions','GHCR','AWS EC2']],
  ['Edge & Delivery',['Nginx','HTTPS / TLS','DuckDNS','Health Checks','Rollback']],
  ['Engineering Controls',['Controlled Tool Boundaries','Read-only AI Tools','Auditability','Evidence-backed Decisions','No UI Secrets']]
] as const;

export default function TechnologyPage(){return <main className="page">
  <div className="eyebrow">ENGINEERING SHOWCASE • AURAVIS 3.0</div><h1>Technology Behind Auravis</h1>
  <p className="lead">A Java-first autonomous QA engineering platform using Spring AI as the intelligence layer, deterministic Java services for policy and state, Playwright for browser execution, PostgreSQL for persisted evidence and React for the product experience.</p>
  <section className="tech-grid">{groups.map(([title,items])=><article className="panel tech-card" key={title}><h3>{title}</h3><div className="chip-row">{items.map(item=><span className="tech-chip" key={item}>{item}</span>)}</div></article>)}</section>
  <section className="architecture-flow">Business Requirement → React UI → Spring Boot APIs → Spring AI ChatClient → RAG / Knowledge → Controlled QA Tools → Agentic Java Orchestration → Playwright Execution → PostgreSQL Evidence → QA Decision → GitHub Actions → AWS EC2</section>
  <section className="panel portfolio-note"><strong>Spring AI is running now</strong><p className="muted">Requirement Intelligence and Failure Diagnosis use Spring AI ChatClient. M7 has started adding controlled Spring AI tool calling over persisted Auravis QA facts. RAG/pgvector and regression intelligence remain clearly marked as integration work until they are fully connected and verified.</p></section>
</main>}
