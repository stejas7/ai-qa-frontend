import { FormEvent, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { aiUatApi } from '../api/aiUat';
import { releaseApprovalsApi } from '../api/releaseApprovals';

export default function ReleaseGovernancePage(){
  const qc=useQueryClient();
  const session=useQuery({queryKey:['current-user'],queryFn:aiUatApi.currentUser,retry:false});
  const runs=useQuery({queryKey:['pipeline-runs'],queryFn:aiUatApi.runs,enabled:!!session.data,retry:false});
  const approvals=useQuery({queryKey:['release-approvals'],queryFn:releaseApprovalsApi.list,enabled:!!session.data,retry:false});
  const canDecide=session.data?.role==='COMPANY_ADMIN'||session.data?.role==='QA_MANAGER';
  const [runId,setRunId]=useState('');const [note,setNote]=useState('');const [decisionNote,setDecisionNote]=useState('');
  const completedRuns=useMemo(()=>runs.data?.filter(r=>r.status==='COMPLETED')??[],[runs.data]);
  const requestedRunIds=new Set(approvals.data?.map(a=>a.runId)??[]);
  const availableRuns=completedRuns.filter(r=>!requestedRunIds.has(r.id));
  const requestApproval=useMutation({mutationFn:()=>releaseApprovalsApi.request(runId,note),onSuccess:async()=>{setRunId('');setNote('');await qc.invalidateQueries({queryKey:['release-approvals']})}});
  const decide=useMutation({mutationFn:({id,decision}:{id:string;decision:'APPROVED'|'BLOCKED'})=>releaseApprovalsApi.decide(id,decision,decisionNote),onSuccess:async()=>{setDecisionNote('');await qc.invalidateQueries({queryKey:['release-approvals']})}});
  const submit=(e:FormEvent)=>{e.preventDefault();requestApproval.mutate()};

  return <main className="page"><div className="eyebrow">M28 • RELEASE GOVERNANCE</div><h1>Release Approval</h1><p className="lead">Turn a completed UAT result into a human release decision. AI evidence informs the decision; an authorized person still approves or blocks the release.</p>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 1</div><h2>Choose completed UAT</h2></div><span>{availableRuns.length} available</span></div>
      {canDecide?<form onSubmit={submit}><div className="form-grid"><label className="field"><span>Completed UAT run</span><select value={runId} onChange={e=>setRunId(e.target.value)} required><option value="">Select run</option>{availableRuns.map(run=><option key={run.id} value={run.id}>{run.fileName} • {run.id.slice(0,8)}</option>)}</select></label><label className="field"><span>Release note</span><input value={note} onChange={e=>setNote(e.target.value)} placeholder="What is being released?"/></label></div><button className="primary-btn" disabled={requestApproval.isPending||!runId}>{requestApproval.isPending?'Creating…':'Request release approval'}</button>{requestApproval.isError&&<p className="error-text">{requestApproval.error.message}</p>}</form>:<p className="muted">Company Admin or QA Manager can create a release approval.</p>}
    </section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 2</div><h2>Pending decisions</h2></div><span>{approvals.data?.filter(a=>a.decision==='PENDING').length??0} pending</span></div>
      {canDecide&&<label className="field"><span>Decision note</span><input value={decisionNote} onChange={e=>setDecisionNote(e.target.value)} placeholder="Reason for approval or block"/></label>}
      <div className="stack-list">{approvals.data?.filter(a=>a.decision==='PENDING').map(a=><div className="list-card" key={a.id}><div><strong>Run {a.runId.slice(0,8)}…</strong><small>Requested by {a.requestedBy}<br/>{a.note||'No note'}</small></div><div className="button-row"><span className="status processing">PENDING</span>{canDecide&&<><button className="primary-btn" onClick={()=>decide.mutate({id:a.id,decision:'APPROVED'})} disabled={decide.isPending}>Approve</button><button className="secondary-btn" onClick={()=>decide.mutate({id:a.id,decision:'BLOCKED'})} disabled={decide.isPending}>Block</button></>}</div></div>)}</div>
    </section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 3</div><h2>Decision history</h2></div></div><div className="table-wrap"><table><thead><tr><th>Run</th><th>Decision</th><th>Decided by</th><th>Time</th></tr></thead><tbody>{approvals.data?.filter(a=>a.decision!=='PENDING').map(a=><tr key={a.id}><td>{a.runId.slice(0,8)}…</td><td><span className={`status ${a.decision==='APPROVED'?'completed':'failed'}`}>{a.decision}</span></td><td>{a.decidedBy||'—'}</td><td>{a.decidedAt?new Date(a.decidedAt).toLocaleString():'—'}</td></tr>)}</tbody></table></div></section>
  </main>;
}
