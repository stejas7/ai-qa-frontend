const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function request<T>(path:string,init?:RequestInit):Promise<T>{
  const response=await fetch(`${API_BASE}${path}`,{cache:'no-store',credentials:'include',...init});
  if(!response.ok){
    let message=`API ${response.status}: ${path}`;
    try{const body=await response.json();message=body.error||message}catch{}
    throw new Error(message);
  }
  return response.json();
}

export type PipelineRerunResponse={runId:string;status:string};

export const pipelineRerunApi={
  rerun:(runId:string)=>request<PipelineRerunResponse>(`/api/pipeline/runs/${encodeURIComponent(runId)}/rerun`,{method:'POST'})
};
