const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export type PipelineRunSummary = { id:string; company:string; fileName:string; status:string; currentStage?:string; createdAt?:string; completedAt?:string };
export type PipelineRunDetail = PipelineRunSummary & { errorMessage?:string; resultJson?:string };
export type PipelineStats = { uploaded:number; processed:number; completed:number; failed:number; processing:number; completionRate:number };
export type ApplicationTarget = { id?:string; name:string; baseUrl:string; environment:string; authType:string; active?:boolean };
export type ExecutionStats = { total:number; passed:number; failed:number; passRate:number };
export type ExecutionHistory = { id?:string; testId:string; targetUrl:string; status:string; durationMs:number; screenshot?:string; diagnosticMessage?:string; executedAt?:string };
export type AgentSummary = { totalRuns:number; running:number; completed:number; failed:number; milestone:string; status:string; flow?:string[] };
export type AgentRun = { id:string; agentType:string; status:string; input?:string; decisionSummary?:string; createdAt?:string; startedAt?:string; completedAt?:string };
export type AgentStep = { id:string; agentRunId:string; sequenceNo:number; stepType:string; status:string; input?:string; output?:string; createdAt?:string };
export type HealingStats = { totalAttempts:number; autoHealAllowed:number; blocked:number; autoHealRate:number; milestone:string; status:string; policy?:string };
export type HealingAttempt = { id:string; testId:string; category:string; originalFailure?:string; proposedRepair?:string; confidence:number; decision:string; createdAt?:string };
export type AiRuntime = { framework:string; springAiVersion:string; provider:string; model:string; configured:boolean; chatClient:boolean; toolCalling:boolean; qaTools:number; m7Status:string; m7Focus:string; fallback:string };
export type DailyVisit = { date:string; label:string; visits:number };
export type PageVisit = { path:string; visits:number };
export type TrafficStats = { totalVisits:number; visitsToday:number; uniqueVisitors:number; uniqueVisitorsToday:number; mostVisitedPage:string; last7Days:DailyVisit[]; topPages:PageVisit[] };
export type RecentVisit = { path:string; visitor:string; visitedAt:string };

async function request<T>(path:string, init?:RequestInit):Promise<T>{
  const response=await fetch(`${API_BASE}${path}`,{cache:'no-store',...init});
  if(!response.ok){let message=`API ${response.status}: ${path}`;try{const body=await response.json();message=body.error||message}catch{}throw new Error(message)}
  if(response.status===204) return undefined as T;
  return response.json();
}

export const auravisApi={
  runs:()=>request<PipelineRunSummary[]>('/api/pipeline/runs'),
  stats:()=>request<PipelineStats>('/api/pipeline/stats'),
  run:(id:string)=>request<PipelineRunDetail>(`/api/pipeline/runs/${id}`),
  upload:async(file:File, company:string, targetUrl:string)=>{const form=new FormData();form.append('file',file);if(company.trim())form.append('company',company.trim());if(targetUrl.trim())form.append('targetUrl',targetUrl.trim());form.append('executeAutomation','true');return request<{runId:string;status:string}>('/api/pipeline/upload',{method:'POST',body:form})},
  applications:()=>request<ApplicationTarget[]>('/api/applications?activeOnly=true'),
  addApplication:(target:ApplicationTarget)=>request<ApplicationTarget>('/api/applications',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(target)}),
  executionStats:()=>request<ExecutionStats>('/api/execution/stats'),
  executionHistory:()=>request<ExecutionHistory[]>('/api/execution/history'),
  agentSummary:()=>request<AgentSummary>('/api/agent-activity/summary'),
  agentRuns:(limit=20)=>request<AgentRun[]>(`/api/agent-activity/runs?limit=${limit}`),
  agentSteps:(runId:string)=>request<AgentStep[]>(`/api/agent-activity/runs/${runId}/steps`),
  healingStats:()=>request<HealingStats>('/api/healing/stats'),
  healingHistory:()=>request<HealingAttempt[]>('/api/healing/history'),
  aiRuntime:()=>request<AiRuntime>('/api/ai/runtime'),
  askAi:(question:string)=>request<{answer:string}>('/api/ai/ask',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question})}),
  trafficStats:()=>request<TrafficStats>('/api/analytics/stats'),
  recentVisits:(limit=20)=>request<RecentVisit[]>(`/api/analytics/recent?limit=${limit}`),
  recordVisit:(path:string,visitorId:string)=>request<{recorded:boolean}>('/api/analytics/visit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({path,visitorId})})
};

export const downloadUrl=(runId:string,type:'json'|'xlsx')=>`${API_BASE}/api/pipeline/runs/${runId}/test-cases.${type}`;
