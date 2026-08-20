import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { aiUatApi } from '../api/aiUat';
import { productRegistryApi } from '../api/productRegistry';

export default function NewMissionPage(){
  const [file,setFile]=useState<File|null>(null);const [targetId,setTargetId]=useState('');
  const navigate=useNavigate();const qc=useQueryClient();
  const session=useQuery({queryKey:['current-user'],queryFn:aiUatApi.currentUser,retry:false});
  const products=useQuery({queryKey:['company-products','active'],queryFn:()=>productRegistryApi.list(true),enabled:!!session.data,retry:false});
  const selected=products.data?.find(p=>p.id===targetId);
  const canExecute=['COMPANY_ADMIN','QA_MANAGER','TESTER'].includes(session.data?.role??'');
  const upload=useMutation({mutationFn:()=>{if(!file)throw new Error('Select a requirement file');if(!targetId)throw new Error('Select a registered product environment');return aiUatApi.uploadTenantUat(file,targetId)},onSuccess:async d=>{await qc.invalidateQueries({queryKey:['pipeline-runs']});navigate(`/dashboard?run=${encodeURIComponent(d.runId)}`)}});
  const submit=(e:FormEvent)=>{e.preventDefault();upload.mutate()};

  if(session.isLoading)return <main className="page"><p className="muted">Loading your workspace…</p></main>;
  if(!session.data)return <main className="page"><div className="eyebrow">4.0 • SECURE UAT</div><h1>Sign in to start UAT</h1><p className="lead">Every UAT run belongs to an authenticated company and registered product environment.</p><Link className="primary-btn" to="/account?mode=login">Sign in or register company</Link></main>;
  if(!canExecute)return <main className="page"><div className="eyebrow">4.0 • AUTHORIZATION</div><h1>Results access only</h1><p className="lead">Your Viewer role can review UAT results and evidence, but cannot start execution.</p><Link className="primary-btn" to="/dashboard">View results</Link></main>;

  return <main className="page"><div className="eyebrow">4.0 • M19 ONE-CLICK UAT</div><h1>Start Autonomous UAT</h1><p className="lead">Select an approved product environment and upload the requirement. Company identity and target URL are resolved securely by the backend — they cannot be supplied or changed from this screen.</p>
    <section className="panel mission-form"><form onSubmit={submit}>
      <label className="field"><span>Product / Environment</span><select value={targetId} onChange={e=>setTargetId(e.target.value)} required><option value="">Select registered target</option>{products.data?.map(p=><option key={p.id} value={p.id}>{p.name} — {p.environment}</option>)}</select>{products.isError&&<small className="error-text">Unable to load registered products.</small>}{products.data?.length===0&&<small>No active target yet. Register one under Account.</small>}</label>
      {selected&&<div className="summary-strip"><article><strong>{selected.name}</strong><span>Product</span></article><article><strong>{selected.environment}</strong><span>Environment</span></article><article><strong>{selected.authType}</strong><span>Authentication</span></article></div>}
      <label className="field"><span>Requirement Document</span><input type="file" accept=".txt,.md,.docx,.pdf" onChange={e=>setFile(e.target.files?.[0]||null)}/><small>{file?file.name:'TXT, MD, DOCX or PDF • max 10 MB'}</small></label>
      <div className="form-actions"><button className="primary-btn" disabled={upload.isPending||!file||!selected}>{upload.isPending?'Starting autonomous UAT…':'Start Autonomous UAT'}</button></div>
      {upload.isError&&<p className="error-text">{upload.error.message}</p>}
    </form></section>
    <section className="panel"><div className="eyebrow">ONE INPUT FLOW</div><div className="flow-grid">{['Authorize user + tenant','Resolve approved target','Read requirement','Retrieve product context','Generate tests','Generate automation','Execute UAT','Capture durable evidence','Return release report'].map((x,i)=><div className="flow-step" key={x}><b>{String(i+1).padStart(2,'0')}</b><span>{x}</span></div>)}</div></section>
  </main>
}
