const API_BASE=import.meta.env.VITE_API_BASE_URL||'';
async function request<T>(path:string,init?:RequestInit):Promise<T>{const r=await fetch(`${API_BASE}${path}`,{credentials:'include',cache:'no-store',...init});if(!r.ok)throw new Error(`API ${r.status}: ${path}`);return r.json()}
export type AgentDefinition={id:number;name:string;team:string;purpose:string;capabilities:string[]};
export type WorkforceView={totalAgents:number;teams:Record<string,number>;agents:AgentDefinition[]};
export type MissionTeamView={availableAgents:number;selectedAgents:number;requestedCapabilities:string[];team:AgentDefinition[];policy:string};
export type RiskScore={score:number;band:string;recommendedRegressionPercent:number;rationale:string};
export const workforceApi={
  catalog:()=>request<WorkforceView>('/api/agent-workforce/catalog'),
  plan:(capabilities:string,maxAgents=10)=>request<MissionTeamView>(`/api/agent-workforce/plan?capabilities=${encodeURIComponent(capabilities)}&maxAgents=${maxAgents}`),
  risk:(payload:{businessCriticality:number;changeComplexity:number;failureHistory:number;authenticationTouched:boolean;paymentOrFinancialFlow:boolean;crossSystemChange:boolean})=>request<RiskScore>('/api/intelligence/risk-score',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
};
