import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { auravisApi, evidenceUrl } from '../api/auravis';

export default function ExecutionCenterPage(){
  const qc=useQueryClient();const [name,setName]=useState('');const [baseUrl,setBaseUrl]=useState('');
  const stats=useQuery({queryKey:['execution-stats'],queryFn:auravisApi.executionStats,refetchInterval:10000});
  const apps=useQuery({queryKey:['applications'],queryFn:auravisApi.applications,refetchInterval:15000});
  const history=useQuery({queryKey:['execution-history'],queryFn:auravisApi.executionHistory,refetchInterval:10000});
  const add=useMutation({mutationFn:()=>auravisApi.addApplication({name,baseUrl,environment:'UAT',authType:'NONE'}),onSuccess:async()=>{setName('');setBaseUrl('');await qc.invalidateQueries({queryKey:['applications']})}});
  const submit=(e:FormEvent)=>{e.preventDefault();if(name.trim()&&baseUrl.trim())add.mutate()};const s=stats.data;
  return <main className="page"><div className="eyebrow">UAT EXECUTION</div><h1>Execution Center</h1><p className="lead">Registered UAT applications, Playwright execution metrics and persisted evidence from the Spring Boot backend.</p>
    <section className="metric-grid four"><article><strong>{s?.total??'—'}</strong><span>Total Executions</span></article><article><strong>{s?.passed??'—'}</strong><span>Passed</span></article><article><strong>{s?.failed??'—'}</strong><span>Failed</span></article><article><strong>{s?`${s.passRate.toFixed(1)}%`:'—'}</strong><span>Pass Rate</span></article></section>
    <div className="two-col"><section className="panel"><div className="section-heading"><div><div className="eyebrow">TARGET REGISTRY</div><h2>Registered UAT Applications</h2></div></div><form className="inline-form" onSubmit={submit}><input value={name} onChange={e=>setName(e.target.value)} placeholder="Checkout UAT" required/><input value={baseUrl} onChange={e=>setBaseUrl(e.target.value)} placeholder="https://uat.example.com" required/><button className="primary-btn" disabled={add.isPending}>Add</button></form>{add.isError&&<p className="error-text">{add.error.message}</p>}<div className="stack-list">{apps.data?.map((a,i)=><div className="list-card" key={a.id||`${a.name}-${i}`}><div><strong>{a.name}</strong><small>{a.environment} • {a.baseUrl}</small></div><span className="status completed">{a.authType}</span></div>)}{apps.data?.length===0&&<p className="muted">No application targets yet.</p>}</div></section>
    <section className="panel"><div className="section-heading"><div><div className="eyebrow">AUDIT TRAIL</div><h2>Execution Evidence</h2></div><span className="live">● Live</span></div><div className="stack-list">{history.data?.slice(0,30).map((x,i)=><div className="list-card" key={x.id||`${x.testId}-${i}`}><div><strong>{x.testId}</strong><small>{x.targetUrl} • {x.durationMs}ms{x.diagnosticMessage?` • ${x.diagnosticMessage}`:''}</small></div><div><span className={`status ${x.status==='PASS'?'completed':'failed'}`}>{x.status}</span>{x.screenshot&&<a className="view-link evidence-link" href={evidenceUrl(x.screenshot)} target="_blank" rel="noreferrer">Evidence</a>}</div></div>)}{history.data?.length===0&&<p className="muted">No executions yet.</p>}</div></section></div>
  </main>
}
