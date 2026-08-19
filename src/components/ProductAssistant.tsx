import { FormEvent, useMemo, useState } from 'react';

type Message={role:'user'|'assistant';text:string};
type Intent='value'|'roadmap'|'session'|'load'|'rag'|'execution'|'general';

const fallback:Record<Intent,string[]>={
  value:[
    'AI UAT Engineer turns requirements into UAT scenarios, executes supported flows, gathers evidence, diagnoses failures and helps teams make a release decision.',
    'The product reduces repetitive UAT engineering work by connecting requirement understanding, test design, execution, failure analysis and release evidence in one flow.',
    'For an IT team, the value is traceability: requirement → tests → execution → evidence → release confidence, with every important step persisted and reviewable.'
  ],
  roadmap:[
    'M1–M10 are complete in the current product roadmap. The next planned milestone is M11, focused on deterministic performance and load testing with AI-assisted analysis.',
    'The current roadmap foundation is complete through M10: autonomous UAT, RAG, orchestration, healing, reliable operations, company/product workspaces and UAT sessions. M11 is next.',
    'M10 closes the persisted UAT session lifecycle. M11 will extend release confidence into load, latency, throughput and resilience evidence.'
  ],
  session:[
    'A UAT session belongs to one company and one product. Its guarded lifecycle is CREATED → RUNNING → COMPLETED, FAILED or CANCELLED, with invalid cross-company or terminal-state transitions rejected.',
    'Sessions make UAT auditable. Each one captures product context, build version, objective, state and timestamps before it is linked to execution and evidence.',
    'Think of a UAT session as the release-validation workspace for one product/build objective, rather than an isolated test run.'
  ],
  load:[
    'M11 should start with safe, configurable load profiles: virtual users, ramp-up, duration, p50/p95/p99 latency, throughput and error rate. AI should explain the evidence, not autonomously scale infrastructure.',
    'For M11, the load engine should stay deterministic while AI compares baselines, highlights regressions and summarizes likely bottlenecks and release risk.',
    'A useful M11 result is not just “load test passed”; it should show workload profile, latency percentiles, throughput, failures, SLO comparison and an evidence-backed recommendation.'
  ],
  rag:[
    'RAG grounds UAT reasoning with product-specific knowledge so test design and diagnosis use relevant requirements and historical context instead of generic model memory.',
    'The knowledge layer retrieves relevant product context first, then Spring AI reasons over it while Java keeps policy and execution boundaries deterministic.',
    'RAG is used as controlled product memory. It improves grounding without turning every test result into uncontrolled model training.'
  ],
  execution:[
    'Execution is controlled by Java and Playwright. AI can reason and diagnose, but recovery stays bounded and evidence is persisted so a release decision can be explained.',
    'The execution layer focuses on repeatability: registered target, test action, result, duration, diagnostics and evidence are recorded rather than hidden behind an AI response.',
    'When automation fails, the platform classifies the failure first. Only safe recoverable automation issues can use the bounded healing path; business/assertion failures are not auto-healed.'
  ],
  general:[
    'Ask me about how AI UAT Engineer helps a QA team, how a UAT session works, why a release can be blocked, how RAG is used, or what M11 load testing will measure.',
    'I can explain the product from a QA, developer, product-owner or release-manager perspective. Try asking about one real workflow or problem you want to solve.',
    'Give me a concrete question about requirements, tests, execution, failures, evidence, sessions or load testing and I will focus the answer on that part of the product.'
  ]
};

function intentOf(input:string):Intent{
  const q=input.toLowerCase();
  if(/help|useful|benefit|qa team|company|problem|purpose|why/.test(q))return 'value';
  if(/roadmap|milestone|m8|m9|m10|m11|next/.test(q))return 'roadmap';
  if(/session|lifecycle|created|running|cancel/.test(q))return 'session';
  if(/load|performance|stress|latency|throughput|concurrency/.test(q))return 'load';
  if(/rag|knowledge|retrieval|ground/.test(q))return 'rag';
  if(/execution|playwright|failure|healing|evidence|release/.test(q))return 'execution';
  return 'general';
}

function fallbackAnswer(input:string,turn:number){
  const intent=intentOf(input);const choices=fallback[intent];
  const hash=[...input].reduce((n,c)=>((n*33)+c.charCodeAt(0))>>>0,0);
  return choices[(hash+turn)%choices.length];
}

async function askBackend(question:string){
  const response=await fetch('/api/ai/ask',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question})});
  if(!response.ok)throw new Error('guide unavailable');
  const data=await response.json() as {answer?:string};
  if(!data.answer?.trim())throw new Error('empty guide answer');
  return data.answer.trim();
}

export default function ProductAssistant(){
  const [open,setOpen]=useState(false);const [text,setText]=useState('');const [busy,setBusy]=useState(false);
  const [messages,setMessages]=useState<Message[]>([{role:'assistant',text:'Hi, I’m NOVA. I can explain how AI UAT Engineer helps teams move from requirement to release confidence. Ask me anything about the product.'}]);
  const speechAvailable=useMemo(()=>typeof window!=='undefined'&&('webkitSpeechRecognition'in window||'SpeechRecognition'in window),[]);

  async function send(e?:FormEvent){
    e?.preventDefault();const value=text.trim();if(!value||busy)return;
    const turn=messages.filter(m=>m.role==='user').length;
    setMessages(m=>[...m,{role:'user',text:value}]);setText('');setBusy(true);
    try{const answer=await askBackend(value);setMessages(m=>[...m,{role:'assistant',text:answer}]);}
    catch{setMessages(m=>[...m,{role:'assistant',text:fallbackAnswer(value,turn)}]);}
    finally{setBusy(false)}
  }

  function listen(){const w=window as unknown as Record<string,any>;const R=w.SpeechRecognition||w.webkitSpeechRecognition;if(!R)return;const rec=new R();rec.lang='en-IN';rec.interimResults=false;rec.maxAlternatives=1;rec.onresult=(event:any)=>setText(event.results?.[0]?.[0]?.transcript||'');rec.start()}

  const suggestions=['How can this help my QA team?','Show me the UAT flow','Why can a release be blocked?','What will M11 load testing measure?'];
  return <><button className="assistant-launcher" onClick={()=>setOpen(v=>!v)} aria-label="Open NOVA assistant"><span>AI</span><b>NOVA</b></button>{open&&<aside className="assistant-panel"><header><div><strong>NOVA</strong><small>AI UAT Engineer guide</small></div><button onClick={()=>setOpen(false)} aria-label="Close assistant">×</button></header><div className="assistant-messages">{messages.map((m,i)=><div key={i} className={`assistant-message ${m.role}`}>{m.text}</div>)}{busy&&<div className="assistant-message assistant">Thinking…</div>}</div><div className="assistant-suggestions">{suggestions.map(s=><button key={s} onClick={()=>setText(s)}>{s}</button>)}</div><form onSubmit={send}><input value={text} onChange={e=>setText(e.target.value)} placeholder="Ask about AI UAT Engineer…"/>{speechAvailable&&<button type="button" className="mic-btn" onClick={listen} title="Voice input">🎙</button>}<button type="submit" className="send-btn" disabled={busy}>Send</button></form><div className="assistant-note">Uses live Spring AI when available, with a local fallback if AI is unavailable.</div></aside>}</>}
