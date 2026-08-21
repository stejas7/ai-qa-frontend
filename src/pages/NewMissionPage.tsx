import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { aiUatApi } from '../api/aiUat';
import { productRegistryApi } from '../api/productRegistry';

export default function NewMissionPage(){
  const [file,setFile]=useState<File|null>(null); const [targetId,setTargetId]=useState('');
  const navigate=useNavigate(); const qc=useQueryClient();
  const session=useQuery({queryKey:['current-user'],queryFn:aiUatApi.currentUser,retry:false});
  const products=useQuery({queryKey:['company-products','active'],queryFn:()=>productRegistryApi.list(true),enabled:!!session.data,retry:false});
  const selected=products.data?.find(p=>p.id===targetId);
  const canExecute=['COMPANY_ADMIN','QA_MANAGER','TESTER'].includes(session.data?.role??'');
  const ready=!!selected&&!!file;
  const upload=useMutation({mutationFn:()=>{if(!file)throw new Error('Select a requirement file');if(!targetId)throw new Error('Select a registered product environment');return aiUatApi.uploadTenantUat(file,targetId)},onSuccess:async d=>{await qc.invalidateQueries({queryKey:['pipeline-runs']});navigate(`/dashboard?run=${encodeURIComponent(d.runId)}`)}});
  const submit=(e:FormEvent)=>{e.preventDefault();upload.mutate()};

  if(session.isLoading)return <main className="page"><p className="muted">Loading your workspace…</p></main>;
  if(!session.data)return <main className="page"><div className="eyebrow">START UAT</div><h1>Sign in first</h1><p className="lead">UAT runs must belong to a company workspace.</p><Link className="primary-btn" to="/account?mode=login">Sign in</Link></main>;
  if(!canExecute)return <main className="page"><div className="eyebrow">ACCESS</div><h1>Results access only</h1><p className="lead">Your role can review results but cannot start a new UAT run.</p><Link className="primary-btn" to="/dashboard">View results</Link></main>;

  return <main className="page"><div className="eyebrow">START UAT</div><h1>Run UAT in four steps</h1><p className="lead">Choose the approved target, upload the requirement, confirm readiness and start. Everything else is handled by the platform.</p>
    <form onSubmit={submit}>
      <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 1</div><h2>Choose product</h2></div>{selected&&<span className="status completed">SELECTED</span>}</div><label className="field"><span>Product / Environment</span><select value={targetId} onChange={e=>setTargetId(e.target.value)} required><option value="">Select registered target</option>{products.data?.map(p=><option key={p.id} value={p.id}>{p.name} — {p.environment}</option>)}</select>{products.isError&&<small className="error-text">Unable to load registered products.</small>}{products.data?.length===0&&<small>No active product yet. Register one under Account.</small>}</label>{selected&&<div className="summary-strip"><article><strong>{selected.name}</strong><span>Product</span></article><article><strong>{selected.environment}</strong><span>Environment</span></article><article><strong>{selected.authType}</strong><span>Authentication</span></article></div>}</section>

      <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 2</div><h2>Upload requirement</h2></div>{file&&<span className="status completed">READY</span>}</div><label className="field"><span>Requirement document</span><input type="file" accept=".txt,.md,.docx,.pdf" onChange={e=>setFile(e.target.files?.[0]||null)}/><small>{file?file.name:'TXT, MD, DOCX or PDF • max 10 MB'}</small></label></section>

      <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 3</div><h2>Confirm readiness</h2></div><span className={`status ${ready?'completed':'failed'}`}>{ready?'READY':'NOT READY'}</span></div><div className="role-grid"><article><strong>Company</strong><p>Resolved from your signed-in account.</p></article><article><strong>Target URL</strong><p>{selected?'Resolved from registered product.':'Choose a product first.'}</p></article><article><strong>Requirement</strong><p>{file?file.name:'Upload a requirement file.'}</p></article></div></section>

      <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 4</div><h2>Start UAT</h2></div></div><p className="lead">AI will analyse the requirement, generate tests, execute automation, capture evidence and return a READY or BLOCKED result.</p><button className="primary-btn" disabled={upload.isPending||!ready}>{upload.isPending?'Running UAT…':'Start UAT'}</button>{upload.isError&&<p className="error-text">{upload.error.message}</p>}</section>
    </form>
  </main>
}
