import { FormEvent, useMemo, useState } from 'react';

type Message={role:'user'|'assistant';text:string};
type Intent='value'|'roadmap'|'admin'|'diagnostics'|'account'|'rag'|'execution'|'performance'|'general';

const fallback:Record<Intent,string[]>={
  value:[
    'AI UAT Engineer connects requirement understanding, test design, execution, evidence, diagnosis and release confidence in one product flow.',
    'The product is designed to reduce repetitive UAT engineering work while keeping execution and policy deterministic in Java.',
    'The strongest value is traceability: requirement → tests → automation → evidence → release decision, with persisted history for review.'
  ],
  roadmap:[
    'M21 is the active platform and security milestone: Super Admin, multi-Company-Admin support, tenant-safe external API access and authorization hardening. M22–M30 are the next evolution sequence and should be treated as in progress until implemented.',
    'The roadmap has moved well beyond the older M10/M11 view. The current focus is M21 platform administration and external access, followed by M22–M30 in sequence.',
    'I can explain the planned M21–M30 sequence, but I will distinguish current capabilities from future milestone work rather than claiming unfinished features are live.'
  ],
  admin:[
    'Super Admin is the platform-owner role. Legacy PLATFORM_ADMIN remains compatible, while COMPANY_ADMIN manages users and setup only inside its own tenant.',
    'A company can have multiple Company Admins. The platform protects against removing or demoting the last active Company Admin.',
    'Platform administration is intentionally separated from tenant administration so company users cannot cross tenant boundaries or manage platform-owner identities.'
  ],
  diagnostics:[
    'The platform diagnostics view consolidates JVM memory, uptime, running/failed UATs, visitors, companies, users and products in one admin-only snapshot.',
    'Use Platform Diagnostics when you want a quick operational view: memory remaining, current UAT load, recent failures, traffic and tenant/product counts.',
    'Diagnostics is read-only and intended for fast health checks. It refreshes from one consolidated backend endpoint instead of many UI requests.'
  ],
  account:[
    'Account is the setup flow: account → team → product → secure access → start UAT. Password recovery uses a one-time reset link with a 30-minute expiry.',
    'Company Admin setup belongs in Account. Product registration, users, credentials and secure access should stay there instead of being duplicated across execution pages.',
    'Forgot password is part of the login flow. The reset token is single-use, expires quickly and is never stored in plain text.'
  ],
  rag:[
    'RAG grounds UAT reasoning with product-specific requirements and knowledge so the model reasons from relevant context instead of generic model memory.',
    'Spring AI handles model interaction while retrieval supplies product context and Java keeps authorization, orchestration and execution boundaries deterministic.',
    'RAG acts as controlled product memory for design and diagnosis; it does not replace deterministic validation or execution evidence.'
  ],
  execution:[
    'The operational flow is intentionally simple: choose product → upload requirement → confirm readiness → start UAT → review release decision → investigate failures and evidence.',
    'Execution is controlled by Java and Playwright. AI can reason and diagnose, while evidence and state transitions remain persisted and reviewable.',
    'When execution fails, the platform separates diagnosable automation issues from business/assertion failures; bounded healing is never allowed to hide a real product defect.'
  ],
  performance:[
    'Performance validation records workload, latency percentiles, throughput, error rate and SLO outcome so release decisions have measurable evidence.',
    'The performance page is simplified to Configure → Measured result → Release decision, with only the metrics that drive the gate emphasized.',
    'AI can summarize performance evidence, but the underlying measurements and thresholds remain deterministic.'
  ],
  general:[
    'Ask me about the current UAT flow, Super Admin, Company Admin, diagnostics, password recovery, RAG, execution, performance, automation, test management or the M21–M30 roadmap.',
    'I’m the AI UAT Copilot for the current platform. Give me a product workflow, admin question or release problem and I’ll explain the relevant path.',
    'I can explain both the business flow and the technical implementation, while distinguishing live capabilities from roadmap work.'
  ]
};

function intentOf(input:string):Intent{
  const q=input.toLowerCase();
  if(/help|useful|benefit|qa team|company|problem|purpose|why/.test(q))return 'value';
  if(/roadmap|milestone|m21|m22|m23|m24|m25|m26|m27|m28|m29|m30|next/.test(q))return 'roadmap';
  if(/super admin|platform admin|company admin|role|tenant|authorization|oauth|api client/.test(q))return 'admin';
  if(/diagnostic|memory|visitor|uptime|health|running|traffic/.test(q))return 'diagnostics';
  if(/forgot|password|login|account|user|credential|sso/.test(q))return 'account';
  if(/rag|knowledge|retrieval|ground/.test(q))return 'rag';
  if(/execution|playwright|failure|healing|evidence|release|uat flow/.test(q))return 'execution';
  if(/load|performance|stress|latency|throughput|concurrency|p95|p99/.test(q))return 'performance';
  return 'general';
}

function fallbackAnswer(input:string,turn:number){
  const intent=intentOf(input);const choices=fallback[intent];
  const hash=[...input].reduce((n,c)=>((n*33)+c.charCodeAt(0))>>>0,0);
  return choices[(hash+turn)%choices.length];
}

async function askBackend(question:string){
  const response=await fetch('/api/ai/ask',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question}),credentials:'include'});
  if(!response.ok)throw new Error('guide unavailable');
  const data=await response.json() as {answer?:string};
  if(!data.answer?.trim())throw new Error('empty guide answer');
  return data.answer.trim();
}

export default function ProductAssistant(){
  const [open,setOpen]=useState(false);const [text,setText]=useState('');const [busy,setBusy]=useState(false);
  const [messages,setMessages]=useState<Message[]>([{role:'assistant',text:'Hi, I’m NOVA, your AI UAT Copilot. I understand the current platform flow, Super Admin, Company Admin, diagnostics, password recovery, UAT execution and the M21–M30 roadmap.'}]);
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

  const suggestions=['Show me the current UAT flow','What is new in M21?','How do platform diagnostics work?','How does forgot password work?'];
  return <><button className="assistant-launcher" onClick={()=>setOpen(v=>!v)} aria-label="Open NOVA assistant"><span>AI</span><b>NOVA</b></button>{open&&<aside className="assistant-panel"><header><div><strong>NOVA</strong><small>AI UAT Copilot</small></div><button onClick={()=>setOpen(false)} aria-label="Close assistant">×</button></header><div className="assistant-messages">{messages.map((m,i)=><div key={i} className={`assistant-message ${m.role}`}>{m.text}</div>)}{busy&&<div className="assistant-message assistant">Thinking…</div>}</div><div className="assistant-suggestions">{suggestions.map(s=><button key={s} onClick={()=>setText(s)}>{s}</button>)}</div><form onSubmit={send}><input value={text} onChange={e=>setText(e.target.value)} placeholder="Ask NOVA about the platform…"/>{speechAvailable&&<button type="button" className="mic-btn" onClick={listen} title="Voice input">🎙</button>}<button type="submit" className="send-btn" disabled={busy}>Send</button></form><div className="assistant-note">Uses live Spring AI when available, with current product-aware fallback guidance.</div></aside>}</>}
