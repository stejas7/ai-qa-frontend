const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function post(path:string,payload:unknown){
  const response=await fetch(`${API_BASE}${path}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),credentials:'include'});
  const body=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(body.error||`Request failed (${response.status})`);
  return body as {message:string};
}

export const passwordResetApi={
  forgot:(email:string)=>post('/api/auth/password/forgot',{email}),
  reset:(token:string,password:string)=>post('/api/auth/password/reset',{token,password})
};
