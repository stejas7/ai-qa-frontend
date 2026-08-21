export type PlatformMilestone={number:number;name:string;domain:string;capabilities:string[]};
export type EnterpriseRoute={providerKey:string;action:string};

async function request<T>(path:string):Promise<T>{
  const response=await fetch(path,{credentials:'include'});
  if(!response.ok) throw new Error((await response.text())||`Request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export const platformEvolutionApi={
  milestones:()=>request<PlatformMilestone[]>('/api/platform/evolution/milestones'),
  routes:(eventType:string)=>request<EnterpriseRoute[]>(`/api/platform/evolution/routes?eventType=${encodeURIComponent(eventType)}`),
};
