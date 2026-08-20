import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { aiUatApi } from '../api/aiUat';
import { productRegistryApi } from '../api/productRegistry';

export default function NewMissionPage(){
  const [file,setFile]=useState<File|null>(null);
  const [targetId,setTargetId]=useState('');
  const navigate=useNavigate();const qc=useQueryClient();
  const session=useQuery({queryKey:['current-user'],queryFn:aiUatApi.currentUser,retry:false});
  const products=useQuery({queryKey:['company-products','active'],queryFn:()=>productRegistryApi.list(true),enabled:!!session.data,retry:false});
  const selected=products.data?.find(p=>p.id===targetId);
  const upload=useMutation({mutationFn:()=>{if(!file)throw new Error('Select a requirement file');if(!session.data)throw new Error('Sign in first');if(!selected)throw new Error('Select a registered product environment');return aiUatApi.upload(file,session.data.companyId,selected.baseUrl)},onSuccess:async d=>{await qc.invalidateQueries({queryKey:['pipeline-runs']});navigate(`/dashboard?run=${encodeURIComponent(d.runId)}`)}});
  const submit=(e:FormEvent)=>{e.preventDefault();upload.mutate()};

  if(session.isLoading)return <main className="page"><p className="muted">Loading your workspace…</p></main>;
  if(!session.data)return <main className="page"><div className="eyebrow">4.0 • SECURE UAT</div><h1>Sign in to start UAT</h1><p className="lead">UAT runs are now associated with a registered company and product environment.</p><Link className="primary-btn" to="/account">Sign in or register company</Link></main>;

  return <main className="page"><div className="eyebrow">4.0 • M16 AUTONOMOUS UAT</div><h1>Start UAT</h1><p className="lead">Choose a registered product environment and upload the business requirement. AI UAT Engineer uses the approved URL automatically.</p>
    <section className="panel mission-form"><form onSubmit={submit}>
      <label className="field"><span>Product / Environment</span><select value={targetId} onChange={e=>setTargetId(e.target.value)} required><option value="">Select registered target</option>{products.data?.map(p=><option key={p.id} value={p.id}>{p.name} — {p.environment}</option>)}</select>{products.isError&&<small className="error-text">Unable to load registered products.</small>}{products.data?.length===0&&<small>No active target yet. Register one under Account.</small>}</label>
      {selected&&<div className="summary-strip"><article><strong>{selected.name}</strong><span>Product</span></article><article><strong>{selected.environment}</strong><span>Environment</span></article><article><strong>{selected.authType}</strong><span>Authentication</span></article></div>}
      <label className="field"><span>Requirement Document</span><input type="file" accept=".txt,.md,.docx,.pdf" onChange={e=>setFile(e.target.files?.[0]||null)}/><small>{file?file.name:'TXT, MD, DOCX or PDF • max 10 MB'}</small></label>
      <div className="form-actions"><button className="primary-btn" disabled={upload.isPending||!file||!selected}>{upload.isPending?'Starting autonomous UAT…':'Start Autonomous UAT'}</button></div>
      {upload.isError&&<p className="error-text">{upload.error.message}</p>}
    </form></section>
    <section className="panel"><div className="eyebrow">ONE INPUT FLOW</div><div className="flow-grid">{['Use registered target','Read requirement','Retrieve product context','Generate tests','Generate automation','Execute UAT','Capture evidence','Return release report'].map((x,i)=><div className="flow-step" key={x}><b>{String(i+1).padStart(2,'0')}</b><span>{x}</span></div>)}</div></section>
  </main>
}
