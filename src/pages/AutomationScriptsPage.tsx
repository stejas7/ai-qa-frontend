import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { aiUatApi, evidenceUrl, GeneratedAutomation, ExecutionResult } from '../api/aiUat';
import { productRegistryApi } from '../api/productRegistry';

export default function AutomationScriptsPage(){
  const qc=useQueryClient();
  const session=useQuery({queryKey:['current-user'],queryFn:aiUatApi.currentUser,retry:false});
  const products=useQuery({queryKey:['company-products','active'],queryFn:()=>productRegistryApi.list(true),enabled:!!session.data,retry:false});
  const [productId,setProductId]=useState(''); const [name,setName]=useState('');
  const [steps,setSteps]=useState('open the application\nclick "Login"\nverify "Dashboard"'); const [generated,setGenerated]=useState<GeneratedAutomation>(); const [execution,setExecution]=useState<ExecutionResult>();
  const companyId=session.data?.companyId??'';
  const scripts=useQuery({queryKey:['automation-scripts',companyId,productId],queryFn:()=>aiUatApi.automationScripts(companyId,productId),enabled:!!companyId&&!!productId});
  const create=useMutation({mutationFn:()=>aiUatApi.createAutomationScript({companyId,productId,name,steps:steps.split('\n').map(x=>x.trim()).filter(Boolean)}),onSuccess:async()=>{setName('');await qc.invalidateQueries({queryKey:['automation-scripts',companyId,productId]})}});
  const approve=useMutation({mutationFn:(id:string)=>aiUatApi.approveAutomationScript(id),onSuccess:()=>qc.invalidateQueries({queryKey:['automation-scripts',companyId,productId]})});
  const generate=useMutation({mutationFn:(id:string)=>aiUatApi.generateAutomationScript(id,{}),onSuccess:setGenerated});
  const execute=useMutation({mutationFn:(id:string)=>aiUatApi.executeAutomationScript(id,{headless:true}),onSuccess:setExecution});
  const submit=(e:FormEvent)=>{e.preventDefault();create.mutate()};

  return <main className="page"><div className="eyebrow">AUTOMATION</div><h1>Automation Scripts</h1><p className="lead">Choose a product, create a draft, approve it, then generate or execute. Company identity comes from your signed-in workspace.</p>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 1</div><h2>Choose product</h2></div></div><label className="field"><span>Product / Environment</span><select value={productId} onChange={e=>setProductId(e.target.value)}><option value="">Select product</option>{products.data?.map(p=><option key={p.id} value={p.id}>{p.name} — {p.environment}</option>)}</select></label></section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 2</div><h2>Create draft</h2></div></div><form onSubmit={submit}><label className="field"><span>Script name</span><input value={name} onChange={e=>setName(e.target.value)} required placeholder="Login and open dashboard"/></label><label className="field"><span>Steps</span><textarea value={steps} onChange={e=>setSteps(e.target.value)} rows={6}/><small>One supported action per line.</small></label><button className="primary-btn" disabled={!productId||!name||create.isPending}>{create.isPending?'Creating…':'Create draft'}</button>{create.isError&&<p className="error-text">{create.error.message}</p>}</form></section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 3</div><h2>Approve & generate</h2></div></div>{!productId?<p className="lead">Choose a product first.</p>:<div className="stack-list">{scripts.data?.map(s=><div className="list-card" key={s.id}><div><strong>{s.name}</strong><small>v{s.version} • {s.steps.length} steps</small></div><div className="button-row"><span className={`status ${s.status==='APPROVED'?'completed':'processing'}`}>{s.status}</span>{s.status!=='APPROVED'&&<button className="secondary-btn" onClick={()=>approve.mutate(s.id)}>Approve</button>}<button className="secondary-btn" disabled={s.status!=='APPROVED'||generate.isPending} onClick={()=>generate.mutate(s.id)}>Generate</button><button className="primary-btn" disabled={s.status!=='APPROVED'||execute.isPending} onClick={()=>execute.mutate(s.id)}>Execute</button></div></div>)}{scripts.data?.length===0&&<p className="muted">No scripts for this product yet.</p>}</div>}</section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 4</div><h2>Result & evidence</h2></div></div>{execution?<><div className="summary-strip"><article><strong>{execution.testId}</strong><span>Test</span></article><article><strong>{execution.status}</strong><span>Status</span></article><article><strong>{execution.durationMs} ms</strong><span>Duration</span></article></div>{execution.evidence&&<a className="primary-btn" href={evidenceUrl(execution.evidence)} target="_blank" rel="noreferrer">Open evidence</a>}</>:<p className="lead">Execute an approved script to see the result here.</p>}{generated&&<details className="result-json"><summary>Generated code</summary><pre>{generated.code}</pre></details>}</section>
  </main>
}
