import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { aiUatApi, ssoLoginUrl } from '../api/aiUat';

const DEMO_EMAIL='demo.viewer@aiuat.example';
const DEMO_PASSWORD='DemoWalkthrough2026!';

const GoogleMark=()=> <span aria-hidden="true" style={{width:22,height:22,borderRadius:'50%',display:'inline-flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:16,fontFamily:'Arial,sans-serif',color:'#4285F4',background:'#fff'}}>G</span>;
const GitHubMark=()=> <span aria-hidden="true" style={{width:22,height:22,borderRadius:'50%',display:'inline-flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,border:'2px solid currentColor'}}>GH</span>;

export default function PublicLoginPage(){
  const qc=useQueryClient();
  const navigate=useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [showRegistration,setShowRegistration]=useState(false);
  const [companyName,setCompanyName]=useState('');
  const [slug,setSlug]=useState('');
  const sso=useQuery({queryKey:['sso-providers'],queryFn:aiUatApi.ssoProviders,retry:false});
  const login=useMutation({mutationFn:()=>aiUatApi.login(email,password),onSuccess:async()=>{await qc.invalidateQueries({queryKey:['current-user']});navigate('/')}});
  const register=useMutation({mutationFn:async()=>{await aiUatApi.registerCompany({companyName,slug,adminEmail:email,password});return aiUatApi.login(email,password)},onSuccess:async()=>{await qc.invalidateQueries({queryKey:['current-user']});navigate('/')}});
  const submit=(e:FormEvent)=>{e.preventDefault();showRegistration?register.mutate():login.mutate()};
  const googleEnabled=sso.data?.providers.includes('google')??false;
  const githubEnabled=sso.data?.providers.includes('github')??false;
  const error=login.error||register.error;

  const ssoBase:React.CSSProperties={display:'flex',alignItems:'center',justifyContent:'center',gap:10,minHeight:48,padding:'0 18px',borderRadius:10,fontWeight:700,textDecoration:'none',flex:'1 1 220px',maxWidth:280,transition:'transform .15s ease, box-shadow .15s ease, opacity .15s ease'};

  return <main className="page auth-page">
    <section className="hero-grid">
      <div>
        <div className="eyebrow">AI UAT ENGINEER • UAT DEMO</div>
        <h1>Sign in and explore the product</h1>
        <p className="lead">Upload requirements, run evidence-backed UAT, review release decisions, and explore the Java + Spring AI engineering stack behind the product.</p>
        <div className="example-flow"><span>Requirement</span><i>→</i><span>AI + RAG</span><i>→</i><span>Automation</span><i>→</i><strong>READY / BLOCKED</strong></div>
        <div className="button-row"><Link className="secondary-btn" to="/technology">Technology</Link><Link className="secondary-btn" to="/roadmap">M1–M20 Roadmap</Link></div>
      </div>
      <section className="panel">
        <div className="eyebrow">SECURE ACCESS</div><h2>{showRegistration?'Create company workspace':'Welcome back'}</h2>
        <form onSubmit={submit}>
          {showRegistration&&<><label className="field"><span>Company name</span><input value={companyName} onChange={e=>setCompanyName(e.target.value)} required placeholder="Acme Technologies"/></label><label className="field"><span>Company slug <small>(optional)</small></span><input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="acme-technologies"/></label></>}
          <label className="field"><span>Work email</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email" placeholder="you@company.com"/></label>
          <label className="field"><span>Password</span><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={12} autoComplete={showRegistration?'new-password':'current-password'}/></label>
          <button className="primary-btn" disabled={login.isPending||register.isPending}>{login.isPending||register.isPending?'Please wait…':showRegistration?'Create workspace':'Sign in'}</button>
          {error&&<p className="error-text">{error.message}</p>}
        </form>
        {!showRegistration&&<><p className="muted" style={{textAlign:'center',margin:'18px 0 12px'}}>or continue with</p><div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href={googleEnabled?ssoLoginUrl('google'):undefined} aria-disabled={!googleEnabled} style={{...ssoBase,background:'#fff',color:'#202124',border:'1px solid #dadce0',boxShadow:'0 1px 2px rgba(60,64,67,.12)',opacity:googleEnabled?1:.55,cursor:googleEnabled?'pointer':'not-allowed'}}><GoogleMark/><span>Continue with Google</span></a>
          <a href={githubEnabled?ssoLoginUrl('github'):undefined} aria-disabled={!githubEnabled} style={{...ssoBase,background:'#24292f',color:'#fff',border:'1px solid #24292f',boxShadow:'0 1px 2px rgba(0,0,0,.2)',opacity:githubEnabled?1:.55,cursor:githubEnabled?'pointer':'not-allowed'}}><GitHubMark/><span>Continue with GitHub</span></a>
        </div>{!sso.isLoading&&(!googleEnabled||!githubEnabled)&&<p className="muted" style={{fontSize:12,textAlign:'center'}}>SSO buttons stay visible for the demo. A provider works when its OAuth client is active in the backend.</p>}</>}
        <p className="muted" style={{marginTop:16}}>{showRegistration?'Already registered? ':'New company? '}<button type="button" className="link-button" onClick={()=>setShowRegistration(v=>!v)}>{showRegistration?'Sign in instead':'Create your workspace from this page'}</button></p>
      </section>
    </section>
    <section className="panel"><div className="section-heading"><div><div className="eyebrow">DEMO WALKTHROUGH</div><h2>UAT visitor credential</h2></div><span className="status processing">UAT ONLY</span></div><p className="muted">Read-only demo access is being prepared for visitors. Do not use these credentials for production systems.</p><div className="two-col"><article className="inner-card"><strong>Email</strong><p>{DEMO_EMAIL}</p></article><article className="inner-card"><strong>Password</strong><p>{DEMO_PASSWORD}</p></article></div></section>
  </main>
}
