import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { auravisApi, downloadUrl } from '../api/auravis';

function statusClass(status:string){const s=status.toLowerCase();if(s==='completed'||s==='pass')return 'status completed';if(s==='failed'||s==='fail')return 'status failed';return 'status processing'}

export default function DashboardPage(){
  const [params,setParams]=useSearchParams();
  const stats=useQuery({queryKey:['pipeline-stats'],queryFn:auravisApi.stats,refetchInterval:10000});
  const runs=useQuery({queryKey:['pipeline-runs'],queryFn:auravisApi.runs,refetchInterval:10000});
  const aiRuntime=useQuery({queryKey:['ai-runtime'],queryFn:auravisApi.aiRuntime,refetchInterval:15000});
  const selectedId=params.get('run')||runs.data?.[0]?.id;
  const detail=useQuery({queryKey:['pipeline-run',selectedId],queryFn:()=>auravisApi.run(selectedId!),enabled:!!selectedId,refetchInterval:q=>q.state.data?.status==='RUNNING'||q.state.data?.status==='QUEUED'?2500:false});
  const data=stats.data;let result:any=null;try{result=detail.data?.resultJson?JSON.parse(detail.data.resultJson):null}catch{}
  return <main className="page"><div className="eyebrow">AI UAT ENGINEER • RESULTS</div><h1>UAT Results</h1><p className="lead">See recent UAT work, release evidence and the runtime state without needing to understand the internal agent architecture.</p>

    <section className="summary-strip"><article><strong>M1–M10</strong><span>Roadmap complete</span></article><article><strong>{aiRuntime.data?.configured?'Connected':'Fallback ready'}</strong><span>AI runtime</span></article><article><strong>{data?.completed??'—'}</strong><span>Completed runs</span></article><article><strong>{data?.failed??'—'}</strong><span>Failed runs</span></article></section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">RECENT UAT</div><h2>Requirement runs</h2></div><Link className="primary-button" to="/mission">Start UAT</Link></div>{runs.isLoading&&<p className="muted">Loading UAT history…</p>}{runs.isError&&<p className="error-text">Unable to load UAT history.</p>}{runs.data?.length===0&&<p className="muted">No requirement runs yet.</p>}{runs.data&&runs.data.length>0&&<div className="table-wrap"><table><thead><tr><th>Requirement</th><th>Product / Project</th><th>Status</th><th>Stage</th><th>Created</th><th></th></tr></thead><tbody>{runs.data.map(run=><tr key={run.id} className={run.id===selectedId?'selected-row':''}><td><strong>{run.fileName}</strong></td><td>{run.company||'default'}</td><td><span className={statusClass(run.status)}>{run.status}</span></td><td>{run.currentStage||'—'}</td><td>{run.createdAt?new Date(run.createdAt).toLocaleString():'—'}</td><td><button className="link-button" onClick={()=>setParams({run:run.id})}>View result</button></td></tr>)}</tbody></table></div>}</section>

    {selectedId&&<section className="panel"><div className="section-heading"><div><div className="eyebrow">RELEASE EVIDENCE</div><h2>{detail.data?.fileName||'Loading result…'}</h2></div>{detail.data&&<span className={statusClass(detail.data.status)}>{detail.data.status}</span>}</div>{detail.isError&&<p className="error-text">Unable to load this result.</p>}{detail.data&&<><p className="muted">{detail.data.company||'default'} • {detail.data.currentStage||'—'}</p>{detail.data.errorMessage&&<p className="error-text">{detail.data.errorMessage}</p>}{result&&<div className="metric-grid four compact"><article><strong>{result.requirements?.length??result.totalRequirements??'—'}</strong><span>Requirements</span></article><article><strong>{result.totalTests??result.testCases?.length??'—'}</strong><span>Generated tests</span></article><article><strong>{(result.passedTests??0)+(result.failedTests??0)}</strong><span>Executed</span></article><article><strong>{result.qualityGate?.decision??result.decision??'—'}</strong><span>Release decision</span></article></div>}{detail.data.status==='COMPLETED'&&<div className="form-actions"><a className="primary-btn" href={downloadUrl(detail.data.id,'xlsx')}>Download Excel</a><a className="secondary-btn" href={downloadUrl(detail.data.id,'json')}>Download JSON</a></div>}{result&&<details className="result-json"><summary>Technical details</summary><pre>{JSON.stringify(result,null,2)}</pre></details>}</>}</section>}
  </main>
}
