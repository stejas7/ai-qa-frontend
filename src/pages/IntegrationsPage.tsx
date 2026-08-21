import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { integrationsApi } from '../api/integrations';
import { enterpriseIntegrationsApi } from '../api/enterpriseIntegrations';
import { aiUatApi } from '../api/aiUat';

const events=['UAT_COMPLETED','UAT_FAILED','RELEASE_READY','RELEASE_BLOCKED'];

export default function IntegrationsPage(){
  const qc=useQueryClient();
  const session=useQuery({queryKey:['current-user'],queryFn:aiUatApi.currentUser,retry:false});
  const canManage=session.data?.role==='COMPANY_ADMIN'||session.data?.role==='QA_MANAGER';
  const [name,setName]=useState('');const [url,setUrl]=useState('');const [selected,setSelected]=useState<string[]>(['UAT_COMPLETED','UAT_FAILED']);
  const enterpriseCatalog=useQuery({queryKey:['enterprise-integration-catalog'],queryFn:enterpriseIntegrationsApi.catalog,enabled:!!session.data,retry:false});
  const integrations=useQuery({queryKey:['integrations'],queryFn:integrationsApi.list,enabled:!!session.data,retry:false});
  const deliveries=useQuery({queryKey:['integration-deliveries'],queryFn:integrationsApi.deliveries,enabled:!!session.data,retry:false});
  const create=useMutation({mutationFn:()=>integrationsApi.create({name,url,eventTypes:selected}),onSuccess:async()=>{setName('');setUrl('');await qc.invalidateQueries({queryKey:['integrations']})}});
  const active=useMutation({mutationFn:({id,value}:{id:string;value:boolean})=>integrationsApi.setActive(id,value),onSuccess:()=>qc.invalidateQueries({queryKey:['integrations']})});
  const test=useMutation({mutationFn:(id:string)=>integrationsApi.test(id),onSuccess:async()=>{await qc.invalidateQueries({queryKey:['integration-deliveries']})}});
  const submit=(e:FormEvent)=>{e.preventDefault();create.mutate()};
  const toggle=(event:string)=>setSelected(v=>v.includes(event)?v.filter(x=>x!==event):[...v,event]);

  return <main className="page">
    <div className="eyebrow">M25–M26 + M35 • INTEGRATIONS</div><h1>Integrations</h1><p className="lead">Connect AI UAT Engineer to secure HTTPS endpoints and discover enterprise integration capabilities for Jira, GitHub, Slack and Microsoft Teams.</p>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">M35 • ENTERPRISE PROVIDERS</div><h2>Provider catalog</h2></div><span>{enterpriseCatalog.data?.length??0} supported</span></div>
      {enterpriseCatalog.isError&&<p className="error-text">{enterpriseCatalog.error.message}</p>}
      <div className="stack-list">{enterpriseCatalog.data?.map(provider=><div className="list-card" key={provider.key}><div><strong>{provider.displayName}</strong><small>{provider.category}<br/>Auth: {provider.authenticationMode}<br/>Events: {provider.supportedEvents.join(' • ')}</small></div><div><small>{provider.supportedActions.join(' • ')}</small></div></div>)}</div>
      <p className="muted">The catalog exposes capability metadata only. Tokens, OAuth credentials and provider secrets are never returned to the browser.</p>
    </section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 1</div><h2>Register endpoint</h2></div></div>
      {canManage?<form onSubmit={submit}><div className="form-grid"><label className="field"><span>Name</span><input value={name} onChange={e=>setName(e.target.value)} required placeholder="Release webhook"/></label><label className="field"><span>HTTPS endpoint</span><input type="url" value={url} onChange={e=>setUrl(e.target.value)} required placeholder="https://hooks.example.com/ai-uat"/></label></div><div className="button-row">{events.map(event=><button key={event} type="button" className={selected.includes(event)?'primary-btn':'secondary-btn'} onClick={()=>toggle(event)}>{event}</button>)}</div><button className="primary-btn" disabled={create.isPending||selected.length===0}>{create.isPending?'Saving…':'Save integration'}</button>{create.isError&&<p className="error-text">{create.error.message}</p>}</form>:<p className="muted">Company Admin or QA Manager can register integrations.</p>}
    </section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 2</div><h2>Endpoints</h2></div><span>{integrations.data?.length??0} configured</span></div>
      <div className="stack-list">{integrations.data?.map(item=><div className="list-card" key={item.id}><div><strong>{item.name}</strong><small>{item.url}<br/>{item.eventTypes.join(' • ')}</small></div><div className="button-row"><span className={`status ${item.active?'completed':'failed'}`}>{item.active?'ACTIVE':'INACTIVE'}</span>{canManage&&<><button className="secondary-btn" onClick={()=>test.mutate(item.id)} disabled={test.isPending||!item.active}>Test</button><button className="secondary-btn" onClick={()=>active.mutate({id:item.id,value:!item.active})} disabled={active.isPending}>{item.active?'Deactivate':'Activate'}</button></>}</div></div>)}</div>
    </section>

    <section className="panel"><div className="section-heading"><div><div className="eyebrow">STEP 3</div><h2>Delivery history</h2></div></div>
      <div className="table-wrap"><table><thead><tr><th>Time</th><th>Event</th><th>Status</th><th>Result</th></tr></thead><tbody>{deliveries.data?.slice(0,30).map(d=><tr key={d.id}><td>{new Date(d.createdAt).toLocaleString()}</td><td>{d.eventType}</td><td>{d.statusCode||'—'}</td><td><span className={`status ${d.success?'completed':'failed'}`}>{d.success?'DELIVERED':'FAILED'}</span> {d.message}</td></tr>)}</tbody></table></div>
    </section>
  </main>;
}
