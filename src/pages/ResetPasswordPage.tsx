import { FormEvent, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { passwordResetApi } from '../api/passwordReset';

export default function ResetPasswordPage(){
  const [params]=useSearchParams();
  const token=params.get('token')||'';
  const [password,setPassword]=useState('');
  const [confirm,setConfirm]=useState('');
  const [message,setMessage]=useState('');
  const [error,setError]=useState('');
  const [pending,setPending]=useState(false);

  async function submit(e:FormEvent){
    e.preventDefault();setError('');setMessage('');
    if(!token){setError('Reset token is missing or invalid.');return;}
    if(password!==confirm){setError('Passwords do not match.');return;}
    setPending(true);
    try{const result=await passwordResetApi.reset(token,password);setMessage(result.message);setPassword('');setConfirm('');}
    catch(x){setError(x instanceof Error?x.message:'Unable to reset password');}
    finally{setPending(false);}
  }

  return <main className="page auth-page"><section className="panel" style={{maxWidth:520,margin:'0 auto'}}>
    <div className="eyebrow">ACCOUNT RECOVERY</div><h1>Create a new password</h1>
    <p className="lead">Choose a new password with at least 12 characters.</p>
    <form onSubmit={submit}>
      <label className="field"><span>New password</span><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={12} autoComplete="new-password"/></label>
      <label className="field"><span>Confirm password</span><input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required minLength={12} autoComplete="new-password"/></label>
      <button className="primary-btn" style={{width:'100%'}} disabled={pending}>{pending?'Resetting…':'Reset password'}</button>
      {message&&<p className="muted">{message}</p>}{error&&<p className="error-text">{error}</p>}
    </form>
    <p className="muted"><Link to="/login">Back to sign in</Link></p>
  </section></main>;
}
