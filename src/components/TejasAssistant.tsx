import { FormEvent, useMemo, useState } from 'react';

type Message={role:'user'|'assistant';text:string};
type Intent='roadmap'|'technology'|'mission'|'dashboard'|'agent'|'execution'|'rag'|'purpose'|'company'|'session'|'load'|'general';

const variants:Record<Intent,string[]>={
  roadmap:[
    'AI UAT Engineer is currently focused on M8 reliable autonomous UAT operations, M9 company/product workspaces, and M10 UAT session lifecycle. M11 is planned to add performance and load-testing intelligence after the current foundation is stable.',
    'The roadmap has moved beyond the early orchestration milestones. The active product work is reliability first, enterprise company/product boundaries next, then persisted UAT sessions. The next planned milestone is M11 performance and load testing.',
    'Today the priority chain is M8 → M9 → M10. M8 protects deployment and recovery, M9 adds company/product isolation, and M10 introduces auditable UAT sessions. M11 will be designed around load, performance and resilience testing.'
  ],
  technology:[
    'The platform is Java-first: Spring Boot and Spring AI handle APIs and intelligence, PostgreSQL persists product knowledge and evidence, Playwright performs browser execution, React/TypeScript provides the UI, and Docker/GitHub Actions/AWS EC2 handle delivery.',
    'The stack combines React + TypeScript, Java + Spring Boot, Spring AI, PostgreSQL, Playwright, Docker, GitHub Actions and AWS EC2. AI reasons, Java owns policy/state, Playwright executes, and persisted evidence proves the result.',
    'Think of the architecture in layers: React experience → Spring Boot APIs → Spring AI reasoning/RAG → deterministic Java policy → Playwright execution → PostgreSQL evidence → CI/CD and EC2 deployment.'
  ],
  mission:[
    'Start New Mission accepts TXT, Markdown, DOCX or PDF requirements plus product context. The backend persists the run, analyzes the requirement, retrieves relevant knowledge, generates tests and returns an evidence-backed QA decision.',
    'A mission begins with a business requirement and a UAT target. The pipeline persists it first, then performs requirement intelligence, test design, automation/execution, diagnosis and quality evaluation.',
    'Use New Mission when you want the system to turn a requirement document into an auditable UAT flow. The important design point is that mission state survives refreshes because it is persisted in PostgreSQL.'
  ],
  dashboard:[
    'Mission Dashboard restores persisted runs, Spring AI runtime state, processing metrics and product analytics. Select a run to see its structured result and export generated test cases.',
    'The dashboard is the operational view of persisted UAT work: mission history, runtime health, processing state, analytics and detailed results all come from backend APIs rather than UI-only state.',
    'Mission Dashboard is designed for traceability. It lets you reopen previous requirement runs, inspect outcomes and download generated JSON/Excel evidence.'
  ],
  agent:[
    'Agent Activity shows real persisted orchestration steps such as requirement analysis, test design, automation, execution, diagnosis and quality decision. It is an audit trail, not a simulated animation.',
    'The agent layer coordinates the QA workflow while deterministic Java services still enforce policy. Agent Activity exposes the recorded run and ordered steps so you can see what actually happened.',
    'Agents orchestrate the flow; they do not get unrestricted control. The product records each agent run and step so decisions remain observable and reviewable.'
  ],
  execution:[
    'Execution Center manages registered UAT targets and shows persisted Playwright results, PASS/FAIL metrics and evidence. M6 recovery rules allow only bounded healing for recoverable automation failures.',
    'Playwright is the deterministic browser executor. The Execution Center surfaces registered targets, historical executions and evidence while Java policy controls whether a recovery attempt is allowed.',
    'The execution layer is evidence-first: target, result, duration, diagnostics and screenshots are persisted so a release decision can be explained later.'
  ],
  rag:[
    'RAG grounds AI reasoning with persisted product knowledge instead of relying on prompt memory alone. It helps requirement analysis and future UAT sessions use relevant product context.',
    'The knowledge layer exists to make AI answers product-specific. Retrieval selects relevant persisted context, then Spring AI reasons over that context while Java controls what actions are allowed.',
    'RAG is the bridge between historical product knowledge and current UAT reasoning. The goal is better grounded test design, diagnosis and regression awareness without uncontrolled model training.'
  ],
  purpose:[
    'AI UAT Engineer is an end-to-end autonomous UAT engineering platform: understand requirements, design tests, execute supported flows, diagnose failures, collect evidence and produce release confidence.',
    'The product is focused on one meaningful problem: reducing manual UAT engineering effort while keeping execution deterministic, observable and evidence-backed.',
    'Its purpose is not just test generation. It connects requirement intelligence, RAG, orchestration, browser execution, recovery, evidence and release decisions into one auditable UAT workflow.'
  ],
  company:[
    'M9 introduces company and product workspaces. Products can belong to a company, inactive companies cannot receive new products, and product isolation rules prevent accidental cross-company use.',
    'Company/Product Workspace is the enterprise boundary: register a company, register its products, keep product ownership explicit, and reject invalid or inactive relationships before persistence.',
    'The company layer prepares the platform for multi-tenant use by making product ownership explicit before users, roles and deeper authorization are introduced.'
  ],
  session:[
    'M10 adds persisted UAT sessions scoped to a company and product. Sessions move through CREATED → RUNNING → COMPLETED/FAILED/CANCELLED with guarded transitions and timestamps.',
    'A UAT session is the execution workspace for one company/product/build objective. Cross-company product sessions are rejected, and terminal sessions cannot be reopened.',
    'M10 turns ad-hoc execution into an auditable lifecycle: create a session, bind it to the correct company/product, track state, and later connect that session to agent execution and evidence.'
  ],
  load:[
    'M11 is planned for load and performance testing. A safe design would start with configurable scenarios, concurrency/ramp profiles, latency percentiles, throughput/error-rate evidence and explicit guardrails before any autonomous scaling decisions.',
    'For M11, load testing should be evidence-driven: define a target, virtual-user profile, ramp-up, duration and SLOs; capture p50/p95/p99 latency, throughput and failures; then let AI explain bottlenecks without automatically changing infrastructure.',
    'The M11 direction should combine deterministic load generation with AI-assisted analysis. The load engine produces measurable evidence; AI summarizes regressions, likely bottlenecks and release risk.'
  ],
  general:[
    'I can help with AI UAT Engineer architecture, roadmap, missions, company/product workspaces, UAT sessions, RAG, agents, execution, recovery and the planned M11 load-testing work. Ask a specific question and I will focus the answer.',
    'Try asking me something concrete such as “How does M10 prevent cross-company sessions?”, “What should M11 load testing measure?” or “How does RAG improve UAT decisions?”',
    'I am the product guide for AI UAT Engineer. I can explain how requirements become tests, how agents are controlled, how deployment recovery works, and where company/product/session capabilities fit in the roadmap.'
  ]
};

const intentKeywords:Record<Intent,string[]>={
  roadmap:['roadmap','milestone','m8','m9','m10','m11','next'],technology:['technology','stack','spring','java','react','architecture'],mission:['mission','upload','requirement','brd','prd'],dashboard:['dashboard','document','history','metric'],agent:['agent','orchestration','activity'],execution:['execution','playwright','browser','evidence'],rag:['rag','knowledge','vector','retrieval','ground'],purpose:['purpose','problem','why','goal'],company:['company','tenant','product registry','workspace'],session:['session','lifecycle','created','running','cancelled'],load:['load','performance','stress','concurrency','latency','throughput'],general:[]
};

function detectIntent(input:string):Intent{
  const q=input.toLowerCase();
  let best:Intent='general';let bestScore=0;
  (Object.keys(intentKeywords) as Intent[]).forEach(intent=>{
    const score=intentKeywords[intent].reduce((n,k)=>n+(q.includes(k)?1:0),0);
    if(score>bestScore){best=intent;bestScore=score}
  });
  return best;
}

function answer(input:string,turn:number){
  const intent=detectIntent(input);const choices=variants[intent];
  const hash=[...input].reduce((n,c)=>((n*31)+c.charCodeAt(0))>>>0,0);
  const base=choices[(hash+turn)%choices.length];
  const followups:Record<Intent,string>={roadmap:' Want me to explain one milestone in more detail?',technology:' I can also break this down as a request-to-deployment architecture flow.',mission:' I can explain each mission stage if you want.',dashboard:' I can also explain what each dashboard metric means.',agent:' Ask me about agent safety boundaries or step ordering.',execution:' I can also explain the self-healing guardrails.',rag:' I can compare RAG with model training if useful.',purpose:' I can map this purpose to a real company UAT workflow.',company:' I can explain the M9 isolation rules in detail.',session:' I can explain valid and invalid session transitions.',load:' I can draft the M11 load-testing acceptance criteria next.',general:' Try asking about M8, M9, M10 or M11.'};
  return base+followups[intent];
}

export default function ProductAssistant(){
  const [open,setOpen]=useState(false);const [text,setText]=useState('');
  const [messages,setMessages]=useState<Message[]>([{role:'assistant',text:'Hi, I’m NOVA, your AI UAT Engineer product guide. Ask me about the roadmap, architecture, UAT sessions, agents, RAG or the planned M11 load-testing work.'}]);
  const speechAvailable=useMemo(()=>typeof window!=='undefined'&&('webkitSpeechRecognition'in window||'SpeechRecognition'in window),[]);
  function send(e?:FormEvent){e?.preventDefault();const value=text.trim();if(!value)return;const turn=messages.filter(m=>m.role==='user').length;setMessages(m=>[...m,{role:'user',text:value},{role:'assistant',text:answer(value,turn)}]);setText('')}
  function listen(){const w=window as unknown as Record<string,any>;const R=w.SpeechRecognition||w.webkitSpeechRecognition;if(!R)return;const rec=new R();rec.lang='en-IN';rec.interimResults=false;rec.maxAlternatives=1;rec.onresult=(event:any)=>setText(event.results?.[0]?.[0]?.transcript||'');rec.start()}
  return <><button className="tejas-launcher" onClick={()=>setOpen(v=>!v)} aria-label="Open NOVA assistant"><span>AI</span><b>NOVA</b></button>{open&&<aside className="tejas-panel"><header><div><strong>NOVA</strong><small>AI UAT Engineer Product Guide</small></div><button onClick={()=>setOpen(false)} aria-label="Close assistant">×</button></header><div className="tejas-messages">{messages.map((m,i)=><div key={i} className={`tejas-message ${m.role}`}>{m.text}</div>)}</div><div className="tejas-suggestions"><button onClick={()=>setText('What is active in M8, M9 and M10?')}>Current Roadmap</button><button onClick={()=>setText('How do UAT sessions work?')}>UAT Sessions</button><button onClick={()=>setText('What should M11 load testing measure?')}>M11 Load Testing</button><button onClick={()=>setText('How does RAG help this product?')}>RAG</button></div><form onSubmit={send}><input value={text} onChange={e=>setText(e.target.value)} placeholder="Ask AI UAT Engineer…"/>{speechAvailable&&<button type="button" className="mic-btn" onClick={listen} title="Voice input">🎙</button>}<button type="submit" className="send-btn">Send</button></form><div className="tejas-note">Voice is input-only. NOVA responses vary by intent and conversation turn.</div></aside>}</>}
