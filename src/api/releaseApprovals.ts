const API_BASE=import.meta.env.VITE_API_BASE_URL||'';

async function request<T>(path:string,init?:RequestInit):Promise<T>{
  const response=await fetch(`${API_BASE}${path}`,{credentials:'include',cache:'no-store',...init});
  if(!response.ok){let message=`API ${response.status}: ${path}`;try{const body=await response.json();message=body.error||message}catch{}throw new Error(message)}
  return response.json();
}

export type ReleaseApproval={id:string;companyId:string;runId:string;requestedBy:string;decidedBy?:string|null;decision:'PENDING'|'APPROVED'|'BLOCKED';note?:string|null;createdAt:string;decidedAt?:string|null};

export const releaseApprovalsApi={
  list:()=>request<ReleaseApproval[]>('/api/release-approvals'),
  request:(runId:string,note:string)=>request<ReleaseApproval>('/api/release-approvals',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId,note})}),
  decide:(id:string,decision:'APPROVED'|'BLOCKED',note:string)=>request<ReleaseApproval>(`/api/release-approvals/${id}/decision`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({decision,note})})
};
