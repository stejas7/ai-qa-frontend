import { useQuery } from '@tanstack/react-query';
import { platformEvolutionApi } from '../api/platformEvolution';

const foundation=[
['M1–M20','Platform foundation','Mission, RAG, generation, orchestration, evidence, security, tenancy and platform oversight'],
['M21–M30','Enterprise foundation','Operational hardening, integrations, access and product workflows'],
['M31–M36','Agent + integration foundation','100-agent workforce, SSO, enterprise provider catalog and tenant-safe planning'],
] as const;

export default function RoadmapPage(){
 const evolution=useQuery({queryKey:['platform-evolution'],queryFn:platformEvolutionApi.milestones,retry:false});
 return <main className="page"><div className="eyebrow">PRODUCT JOURNEY • M1–M100</div><h1>AI UAT Engineer Roadmap</h1><p className="lead">From Java/Spring Boot UAT automation to a governed enterprise autonomy platform. M37–M60 establish governed adaptive UAT; M61–M80 add dependency, contract and business-journey intelligence; M81–M90 add portfolio/workforce orchestration; M91–M100 complete governance, resilience, model controls and enterprise autonomy readiness.</p>
 <section className="roadmap-grid">{foundation.map(([id,title,detail])=><article className="roadmap-card done" key={id}><div><strong>{id}</strong><span>FOUNDATION</span></div><strong>{title}</strong><p>{detail}</p></article>)}</section>
 <section className="panel"><div className="section-heading"><div><div className="eyebrow">M37–M100 • PLATFORM EVOLUTION</div><h2>Governed enterprise autonomy</h2></div><span>{evolution.data?.length??0} live contracts</span></div>{evolution.isError&&<p className="error-text">{evolution.error.message}</p>}<div className="roadmap-grid"><article className="roadmap-card"><div><strong>M37</strong><span>IMPLEMENTED</span></div><strong>Enterprise Event Routing</strong><p>Deterministic UAT/release event routing to Jira, GitHub, Slack and Teams actions.</p></article><article className="roadmap-card"><div><strong>M38</strong><span>IMPLEMENTED</span></div><strong>Reliable Delivery</strong><p>Idempotency, bounded retry/backoff and transient/permanent failure classification.</p></article>{evolution.data?.map(m=><article className="roadmap-card" key={m.number}><div><strong>M{m.number}</strong><span>{m.domain}</span></div><strong>{m.name}</strong><p>{m.capabilities.join(' • ')}</p></article>)}</div></section>
 </main>;
}
