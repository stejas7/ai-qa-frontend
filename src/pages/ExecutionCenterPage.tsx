import { useQuery } from '@tanstack/react-query';
import { auravisApi, evidenceUrl } from '../api/auravis';

export default function ExecutionCenterPage(){
  const stats=useQuery({queryKey:['execution-stats'],queryFn:auravisApi.executionStats,refetchInterval:10000});
  const history=useQuery({queryKey:['execution-history'],queryFn:auravisApi.executionHistory,refetchInterval:10000});
  const s=stats.data;
  const latest=history.data?.[0];
  const failures=history.data?.filter(x=>x.status!=='PASS')??[];

  return <main className="page"><div className="eyebrow">EXECUTION</div><h1>Execution Details</h1><p className="lead">Use this page only when you need to understand what happened during browser execution.</p>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 1</div><h2>Execution health</h2></div><span className="status completed">LIVE</span></div><div className="summary-strip"><article><strong>{s?.total??'—'}</strong><span>Total</span></article><article><strong>{s?.passed??'—'}</strong><span>Passed</span></article><article><strong>{s?.failed??'—'}</strong><span>Failed</span></article><article><strong>{s?`${s.passRate.toFixed(1)}%`:'—'}</strong><span>Pass rate</span></article></div></section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 2</div><h2>Latest execution</h2></div>{latest&&<span className={`status ${latest.status==='PASS'?'completed':'failed'}`}>{latest.status}</span>}</div>{latest?<div className="role-grid"><article><strong>Test</strong><p>{latest.testId}</p></article><article><strong>Target</strong><p>{latest.targetUrl}</p></article><article><strong>Duration</strong><p>{latest.durationMs} ms</p></article><article><strong>Diagnosis</strong><p>{latest.diagnosticMessage||'No issue reported.'}</p></article></div>:<p className="lead">No execution has been recorded yet.</p>}</section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 3</div><h2>Failures</h2></div><span>{failures.length} found</span></div>{failures.length===0?<p className="lead">No failed execution steps need attention.</p>:<div className="stack-list">{failures.slice(0,20).map((x,i)=><div className="list-card" key={x.id||`${x.testId}-${i}`}><div><strong>{x.testId}</strong><small>{x.targetUrl} • {x.diagnosticMessage||'Execution failed'}</small></div><span className="status failed">{x.status}</span></div>)}</div>}</section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 4</div><h2>Evidence</h2></div></div><p className="lead">Open screenshots only when you need to verify a pass or diagnose a failure.</p><div className="stack-list">{history.data?.slice(0,30).map((x,i)=><div className="list-card" key={x.id||`${x.testId}-${i}`}><div><strong>{x.testId}</strong><small>{x.durationMs} ms</small></div><div className="button-row"><span className={`status ${x.status==='PASS'?'completed':'failed'}`}>{x.status}</span>{x.screenshot&&<a className="secondary-btn" href={evidenceUrl(x.screenshot)} target="_blank" rel="noreferrer">Open evidence</a>}</div></div>)}{history.data?.length===0&&<p className="muted">No execution evidence yet.</p>}</div></section>
  </main>
}
