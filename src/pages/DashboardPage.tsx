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
  let result:any=null;try{result=detail.data?.resultJson?JSON.parse(detail.data.resultJson):null}catch{}

  const totalTests=result?.totalTests??0;
  const passed=result?.passedTests??0;
  const failed=result?.failedTests??0;
  const automated=result?.automatedTests??0;
  const decision=result?.qualityGate?.decision??result?.decision;
  const completed=detail.data?.status==='COMPLETED';
  const failedRun=detail.data?.status==='FAILED';
  const working=detail.data?.status==='RUNNING'||detail.data?.status==='QUEUED';

  return <main className="page"><div className="eyebrow">AI UAT ENGINEER • AUTONOMOUS REPORT</div><h1>Release confidence</h1><p className="lead">Upload once, then review one outcome. AI UAT Engineer handles the internal testing flow and keeps technical drill-downs optional.</p>

    {!selectedId&&<section className="panel"><h2>No UAT run yet</h2><p className="muted">Start with a requirement document and product target. The downstream analysis, test design, automation and execution flow runs automatically.</p><Link className="primary-button" to="/mission">Start autonomous UAT</Link></section>}

    {selectedId&&<>
      <section className="panel"><div className="section-heading"><div><div className="eyebrow">CURRENT UAT</div><h2>{detail.data?.fileName||'Loading result…'}</h2><p className="muted">{detail.data?.company||'default'} • {detail.data?.currentStage||'Preparing run'}</p></div>{detail.data&&<span className={statusClass(detail.data.status)}>{detail.data.status}</span>}</div>
        {working&&<div className="example-flow"><span>Requirement ✓</span><i>→</i><span>Tests</span><i>→</i><span>Automation</span><i>→</i><span>Execution</span><i>→</i><strong>Release decision</strong></div>}
        {failedRun&&<><h3>Needs attention</h3><p className="error-text">{detail.data?.errorMessage||'The autonomous UAT flow stopped before completion.'}</p><p className="muted">The run is preserved for diagnosis; no manual re-entry of earlier steps is required.</p></>}
        {completed&&result&&<><div className="summary-strip"><article><strong>{result.requirements?.length??result.totalRequirements??'—'}</strong><span>Requirements covered</span></article><article><strong>{totalTests}</strong><span>Tests generated</span></article><article><strong>{passed}/{passed+failed}</strong><span>Executed passed</span></article><article><strong>{decision??'—'}</strong><span>Release recommendation</span></article></div>
          <section className="value-flow"><article><b>1</b><strong>Coverage</strong><p>{automated} of {totalTests} tests were automation candidates.</p></article><article><b>2</b><strong>Execution</strong><p>{passed} passed and {failed} failed in the autonomous execution flow.</p></article><article><b>3</b><strong>Decision</strong><p>{decision==='APPROVED'?'Evidence supports release readiness.':'Review failed or blocked evidence before release.'}</p></article></section>
          <div className="form-actions"><button className="primary-btn" onClick={()=>rerun.mutate(detail.data!.id)} disabled={rerun.isPending}>{rerun.isPending?'Starting re-run…':'Re-run this requirement'}</button><a className="secondary-btn" href={downloadUrl(detail.data!.id,'xlsx')}>Download report</a><a className="secondary-btn" href={downloadUrl(detail.data!.id,'json')}>Download raw JSON</a></div>
          {rerun.isError&&<p className="error-text">{rerun.error.message}</p>}
          <details className="result-json"><summary>Advanced technical details</summary><pre>{JSON.stringify(result,null,2)}</pre></details></>}
      </section>

      <section className="panel"><div className="section-heading"><div><div className="eyebrow">HISTORY</div><h2>Previous UAT runs</h2></div><Link className="secondary-button" to="/mission">Start another UAT</Link></div>{runs.isLoading&&<p className="muted">Loading UAT history…</p>}{runs.isError&&<p className="error-text">Unable to load UAT history.</p>}<div className="table-wrap"><table><thead><tr><th>Requirement</th><th>Status</th><th>Stage</th><th>Created</th><th></th></tr></thead><tbody>{runs.data?.map(run=><tr key={run.id} className={run.id===selectedId?'selected-row':''}><td><strong>{run.fileName}</strong></td><td><span className={statusClass(run.status)}>{run.status}</span></td><td>{run.currentStage||'—'}</td><td>{run.createdAt?new Date(run.createdAt).toLocaleString():'—'}</td><td><div className="button-row"><button className="link-button" onClick={()=>setParams({run:run.id})}>Open</button>{run.status==='COMPLETED'&&<button className="link-button" onClick={()=>rerun.mutate(run.id)} disabled={rerun.isPending}>Re-run</button>}</div></td></tr>)}</tbody></table></div></section>
    </>}

    <section className="summary-strip"><article><strong>{stats.data?.completed??'—'}</strong><span>Completed runs</span></article><article><strong>{stats.data?.failed??'—'}</strong><span>Runs needing attention</span></article><article><strong>M1–M17</strong><span>Integrated capability</span></article><article><strong>1</strong><span>Main user flow</span></article></section>
  </main>
}
