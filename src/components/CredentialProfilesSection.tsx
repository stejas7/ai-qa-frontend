import { FormEvent, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { credentialRegistryApi } from '../api/credentialRegistry';
import type { ProductEnvironment } from '../api/productRegistry';

export default function CredentialProfilesSection({products,canManage}:{products:ProductEnvironment[];canManage:boolean}){
  const qc=useQueryClient();
  const profiles=useQuery({queryKey:['credential-profiles'],queryFn:credentialRegistryApi.list,retry:false});
  const configurableProducts=useMemo(()=>products.filter(p=>p.active&&p.authType!=='NONE'),[products]);
  const [targetId,setTargetId]=useState('');
  const [type,setType]=useState<'USERNAME_PASSWORD'|'API_TOKEN'|'OAUTH_CLIENT'>('USERNAME_PASSWORD');
  const [secretReference,setSecretReference]=useState('');

  const configure=useMutation({mutationFn:()=>credentialRegistryApi.configure({applicationTargetId:targetId,type,secretReference}),onSuccess:async()=>{setSecretReference('');await qc.invalidateQueries({queryKey:['credential-profiles']})}});
  const setActive=useMutation({mutationFn:({id,value}:{id:string;value:boolean})=>credentialRegistryApi.setActive(id,value),onSuccess:()=>qc.invalidateQueries({queryKey:['credential-profiles']})});
  const submit=(e:FormEvent)=>{e.preventDefault();configure.mutate()};
  const productName=(id:string)=>{const product=products.find(p=>p.id===id);return product?`${product.name} • ${product.environment}`:id.slice(0,8)};

  return <section className="panel"><div className="section-heading"><div><div className="eyebrow">M17 SECURE CREDENTIALS</div><h2>Product credential profiles</h2></div></div><p className="muted">AI UAT Engineer stores only a runtime secret reference. Never paste a username, password, API token or client secret into this form.</p>
    {canManage&&<form onSubmit={submit}><div className="form-grid"><label className="field"><span>Product environment</span><select value={targetId} onChange={e=>setTargetId(e.target.value)} required><option value="">Select product</option>{configurableProducts.map(product=><option key={product.id} value={product.id}>{product.name} • {product.environment}</option>)}</select></label><label className="field"><span>Credential type</span><select value={type} onChange={e=>setType(e.target.value as typeof type)}><option value="USERNAME_PASSWORD">Username & password</option><option value="API_TOKEN">API token</option><option value="OAUTH_CLIENT">OAuth client</option></select></label><label className="field"><span>Runtime secret reference</span><input value={secretReference} onChange={e=>setSecretReference(e.target.value.toUpperCase())} required placeholder="env:CUSTOMER_PORTAL_UAT_CREDENTIAL"/><small>Reference only. Format: env:VARIABLE_NAME</small></label></div><button className="primary-btn" disabled={configure.isPending||!targetId}>{configure.isPending?'Configuring…':'Configure credential profile'}</button>{configure.isError&&<p className="error-text">{configure.error.message}</p>}</form>}
    {profiles.isLoading&&<p className="muted">Loading credential profiles…</p>}{profiles.isError&&<p className="error-text">Unable to load credential profiles.</p>}<div className="stack-list">{profiles.data?.map(profile=><div className="list-card" key={profile.id}><div><strong>{productName(profile.applicationTargetId)}</strong><small>{profile.type} • secret hidden • {profile.configured?'Configured':'Not configured'}</small></div><div className="button-row"><span className={`status ${profile.active?'completed':'failed'}`}>{profile.active?'ACTIVE':'INACTIVE'}</span>{canManage&&<button className="secondary-btn" onClick={()=>setActive.mutate({id:profile.id,value:!profile.active})} disabled={setActive.isPending}>{profile.active?'Deactivate':'Activate'}</button>}</div></div>)}</div>{setActive.isError&&<p className="error-text">{setActive.error.message}</p>}
  </section>;
}
