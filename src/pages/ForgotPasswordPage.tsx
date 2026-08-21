import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { passwordResetApi } from '../api/passwordReset';

export default function ForgotPasswordPage(){
  const [email,setEmail]=useState(''); const [message,setMessage]=useState(''); const [error,setError]=useState(''); const [pending,setPending]=useState(false);
  async function submit(e:FormEvent){e.preventDefault();setPending(true);setError('');try{const result=await passwordResetApi.forgot(email);setMessage(result.message)}catch(x){setError(x instanceof Error?x.message:'Unable to request reset')}finally{setPending(false)}}
  return <main className="page auth-page"><section className="panel" style={{maxWidth:520,margin:'0 auto'}}><div className="eyebrow">ACCOUNT RECOVERY</div><h1>Forgot password?</h1><p className="lead">Enter your work email. If the account exists, we’ll send a one-time reset link valid for 30 minutes.</p><form onSubmit={submit}><label className="field"><span>Email</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email" placeholder="you@company.com"/></label><button className="primary-btn" style={{width:'100%'}} disabled={pending}>{pending?'Sending…':'Send reset link'}</button>{message&&<p className="muted">{message}</p>}{error&&<p className="error-text">{error}</p>}</form><p className="muted"><Link to="/login">Back to sign in</Link></p></section></main>;
}
