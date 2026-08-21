import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { aiUatApi, downloadUrl } from '../api/aiUat';
import { pipelineRerunApi } from '../api/pipelineRerun';

function statusClass(status:string){const s=status.toLowerCase();if(s==='completed'||s==='pass'||s==='approved')return 'status completed';if(s==='failed'||s==='fail'||s==='blocked')return 'status failed';return 'status processing'}

export default function DashboardPage(){
  const [params,setParams]=useSearchParams();
  const qc=useQueryClient();
  const stats=useQuery({queryKey:['pipeline-stats'],queryFn:aiUatApi.stats,refetchInterval:10000});
  const runs=useQuery({queryKey:['pipeline-runs'],queryFn:aiUatApi.runs,refetchInterval:10000});
  const selectedId=params.get('run')||runs.data?.[0]?.id;
  const detail=useQuery({queryKey:['pipeline-run',selectedId],queryFn:()=>aiUatApi.run(selectedId!),enabled:!!selectedId,refetchInterval:q=>q.state.data?.status==='RUNNING'||q.state.data?.status==='QUEUED'?2500:false});
  const rerun=useMutation({mutationFn:(runId:string)=>pipelineRerunApi.rerun(runId),onSuccess:async response=>{setParams({run:response.runId});await Promise.all([qc.invalidateQueries({queryKey:['pipeline-runs']}),qc.invalidateQueries({queryKey:['pipeline-stats']})])}});
  let result:any=null; try{result=detail.data?.resultJson?JSON.parse(detail.data.resultJson):null}catch{}

  const totalTests=result?.totalTests??0;
  const passed=result?.passedTests??0;
  const failed=result?.failedTests??0;
  const decision=result?.qualityGate?.decision??result?.decision;
  const completed=detail.data?.status==='COMPLETED';
  const failedRun=detail.data?.status==='FAILED';
  const working=detail.data?.status==='RUNNING'||detail.data?.status==='QUEUED';

  return <main className="page"><div className="eyebrow">RESULTS</div><h1>Release Decision</h1><p className="lead">Open one run and answer one question first: is the product ready to release?</p>

    {!selectedId&&<section className="panel"><h2>No UAT result yet</h2><p className="lead">Start a UAT run to generate an evidence-backed release decision.</p><Link className="primary-btn" to="/mission">Start UAT</Link></section>}

    {selectedId&&<>
      <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 1</div><h2>Run status</h2></div>{detail.data&&<span className={statusClass(detail.data.status)}>{detail.data.status}</span>}</div><div className="summary-strip"><article><strong>{detail.data?.fileName||'Loading…'}</strong><span>Requirement</span></article><article><strong>{detail.data?.currentStage||'Preparing'}</strong><span>Current stage</span></article><article><strong>{totalTests||'—'}</strong><span>Tests</span></article><article><strong>{passed+failed||'—'}</strong><span>Executed</span></article></div>{working&&<p className="lead">UAT is still running. This page refreshes automatically until the release decision is ready.</p>}{failedRun&&<p className="error-text">{detail.data?.errorMessage||'The UAT run stopped before completion.'}</p>}</section>

      <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 2</div><h2>Release decision</h2></div>{completed&&<span className={statusClass(decision||'processing')}>{decision||'PENDING'}</span>}</div>{completed&&result?<><div className="summary-strip"><article><strong>{decision??'—'}</strong><span>Decision</span></article><article><strong>{passed}</strong><span>Passed</span></article><article><strong>{failed}</strong><span>Failed</span></article><article><strong>{result.requirements?.length??result.totalRequirements??'—'}</strong><span>Requirements covered</span></article></div><p className="lead">{decision==='APPROVED'?'Evidence supports release readiness.':'Review the failed or blocked evidence before release.'}</p></>:<p className="lead">The final decision appears when execution completes.</p>}</section>

      <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 3</div><h2>What needs attention?</h2></div></div>{failed>0?<p className="error-text">{failed} test{failed===1?'':'s'} failed. Review execution and evidence before release.</p>:completed?<p className="lead">No failed tests were reported for this run.</p>:<p className="lead">Failure summary will appear after execution.</p>}<div className="form-actions"><Link className="secondary-btn" to="/execution">Open execution details</Link>{detail.data?.id&&<button className="secondary-btn" onClick={()=>rerun.mutate(detail.data!.id)} disabled={rerun.isPending}>{rerun.isPending?'Starting…':'Re-run requirement'}</button>}</div>{rerun.isError&&<p className="error-text">{rerun.error.message}</p>}</section>

      <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 4</div><h2>Evidence & report</h2></div></div><p className="lead">Use the report for review or audit. Raw JSON stays optional.</p>{detail.data?.id&&<div className="form-actions"><a className="primary-btn" href={downloadUrl(detail.data.id,'xlsx')}>Download report</a><a className="secondary-btn" href={downloadUrl(detail.data.id,'json')}>Download JSON</a></div>}{completed&&result&&<details className="result-json"><summary>Advanced technical details</summary><pre>{JSON.stringify(result,null,2)}</pre></details>}</section>

      <section className="panel"><div className="section-heading"><div><div className="eyebrow">HISTORY</div><h2>Previous runs</h2></div><Link className="secondary-btn" to="/mission">Start another UAT</Link></div><div className="table-wrap"><table><thead><tr><th>Requirement</th><th>Status</th><th>Stage</th><th>Created</th><th></th></tr></thead><tbody>{runs.data?.map(run=><tr key={run.id} className={run.id===selectedId?'selected-row':''}><td><strong>{run.fileName}</strong></td><td><span className={statusClass(run.status)}>{run.status}</span></td><td>{run.currentStage||'—'}</td><td>{run.createdAt?new Date(run.createdAt).toLocaleString():'—'}</td><td><button className="link-button" onClick={()=>setParams({run:run.id})}>Open</button></td></tr>)}</tbody></table></div></section>
    </>}

    <section className="summary-strip"><article><strong>{stats.data?.completed??'—'}</strong><span>Completed</span></article><article><strong>{stats.data?.failed??'—'}</strong><span>Needs attention</span></article></section>
  </main>
}
