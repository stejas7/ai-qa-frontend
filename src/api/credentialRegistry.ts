const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export type CredentialProfile={
  id:string;
  applicationTargetId:string;
  type:'USERNAME_PASSWORD'|'API_TOKEN'|'OAUTH_CLIENT';
  configured:boolean;
  active:boolean;
};

async function request<T>(path:string,init?:RequestInit):Promise<T>{
  const response=await fetch(`${API_BASE}${path}`,{cache:'no-store',credentials:'include',...init});
  if(!response.ok){
    let message=`API ${response.status}: ${path}`;
    try{const body=await response.json();message=body.error||message}catch{}
    throw new Error(message);
  }
  return response.json();
}

export const credentialRegistryApi={
  list:()=>request<CredentialProfile[]>('/api/company/credentials'),
  configure:(payload:{applicationTargetId:string;type:string;secretReference:string})=>request<CredentialProfile>('/api/company/credentials',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),
  setActive:(id:string,value:boolean)=>request<CredentialProfile>(`/api/company/credentials/${id}/active?value=${value}`,{method:'PATCH'})
};
