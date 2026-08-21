const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export type PipelineRunSummary={id:string;company:string;fileName:string;status:string;currentStage?:string;createdAt?:string;completedAt?:string};
export type PipelineRunDetail=PipelineRunSummary&{errorMessage?:string;resultJson?:string};
export type PipelineStats={uploaded:number;processed:number;completed:number;failed:number;processing:number;completionRate:number};
export type ApplicationTarget={id?:string;companyId?:string;name:string;baseUrl:string;environment:string;authType:string;active?:boolean};
export type ExecutionStats={total:number;passed:number;failed:number;passRate:number};
export type ExecutionHistory={id?:string;testId:string;targetUrl:string;status:string;durationMs:number;screenshot?:string;diagnosticMessage?:string};
export type ExecutionResult={testId:string;status:string;durationMs:number;evidence?:string;message:string};
export type AgentSummary={totalRuns:number;running:number;completed:number;failed:number;milestone:string;status:string;flow?:string[]};
export type AgentRun={id:string;agentType:string;status:string;input?:string;decisionSummary?:string;createdAt?:string;startedAt?:string;completedAt?:string};
export type AgentStep={id:string;agentRunId:string;sequenceNo:number;stepType:string;status:string;input?:string;output?:string;createdAt?:string};
export type HealingStats={totalAttempts:number;autoHealAllowed:number;blocked:number;autoHealRate:number;milestone:string;status:string;policy?:string};
export type HealingAttempt={id:string;testId:string;category:string;originalFailure?:string;proposedRepair?:string;confidence:number;decision:string;createdAt?:string};
export type AiRuntime={framework:string;springAiVersion:string;provider:string;model:string;configured:boolean;chatClient:boolean;toolCalling:boolean;qaTools:number;m7Status:string;m7Focus:string;fallback:string};
export type DailyVisit={date:string;label:string;visits:number};
export type PageVisit={path:string;visits:number};
export type TrafficStats={totalVisits:number;visitsToday:number;uniqueVisitors:number;uniqueVisitorsToday:number;mostVisitedPage:string;last7Days:DailyVisit[];topPages:PageVisit[]};
export type RecentVisit={path:string;visitor:string;visitedAt:string};
export type LoadTestRequest={targetUrl:string;requests:number;concurrency:number;maxP95Ms:number;maxErrorRatePercent:number};
export type LoadTestResult={targetUrl:string;requests:number;concurrency:number;durationMs:number;p50Ms:number;p95Ms:number;p99Ms:number;throughputPerSecond:number;failures:number;errorRatePercent:number;maxP95Ms:number;maxErrorRatePercent:number;sloPassed:boolean;releaseRisk:string;summary:string};
export type LoadTestRun=LoadTestResult&{id:string;createdAt:string};
export type AutomationScript={id:string;companyId:string;productId:string;name:string;version:number;status:'DRAFT'|'APPROVED';steps:string[];createdAt:string;updatedAt?:string};
export type GeneratedAutomation={testId:string;framework:string;language:string;fileName:string;code:string};
export type TestTraceability={id:string;companyId:string;productId:string;requirementId:string;testCondition:string;testCaseId:string;automationScriptId?:string;riskLevel:'LOW'|'MEDIUM'|'HIGH';expectedResult:string;executionId?:string;actualResult?:string;status:'NOT_RUN'|'PASS'|'FAIL'|'BLOCKED';defectRef?:string;entryCriteriaMet:boolean;exitCriteriaMet:boolean;createdAt:string;updatedAt:string};
export type TestCompletionSummary={total:number;passed:number;failed:number;notRun:number;highRisk:number;failedHighRisk:number;automatedLinks:number;automationCoveragePercent:number;exitCriteriaMet:boolean;releaseRecommendation:string};
export type CurrentUser={id:string;companyId:string;email:string;role:string};
export type CompanyRegistration={companyId:string;companyName:string;slug:string;adminEmail:string;role:string};
export type CompanyUserRole='COMPANY_ADMIN'|'QA_MANAGER'|'TESTER'|'VIEWER';
export type CompanyUser={id:string;companyId:string;email:string;role:CompanyUserRole|string;active:boolean};

async function request<T>(path:string,init?:RequestInit):Promise<T>{const response=await fetch(`${API_BASE}${path}`,{cache:'no-store',credentials:'include',...init});if(!response.ok){let message=`API ${response.status}: ${path}`;try{const body=await response.json();message=body.error||message}catch{}throw new Error(message)}if(response.status===204)return undefined as T;return response.json()}

export const aiUatApi={
  registerCompany:(payload:{companyName:string;slug?:string;adminEmail:string;password:string})=>request<CompanyRegistration>('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),
  login:(email:string,password:string)=>request<CurrentUser>('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})}),
  currentUser:()=>request<CurrentUser>('/api/auth/me'),
  logout:async()=>{const result=await request<{loggedOut:boolean}>('/api/auth/logout',{method:'POST'});window.location.assign('/');return result},
  ssoProviders:()=>request<{providers:string[]}>('/api/auth/sso/providers'),
  companyUsers:()=>request<CompanyUser[]>('/api/company/users'),createCompanyUser:(payload:{email:string;password:string;role:CompanyUserRole})=>request<CompanyUser>('/api/company/users',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),deactivateCompanyUser:(id:string)=>request<CompanyUser>(`/api/company/users/${id}/deactivate`,{method:'PATCH'}),
  runs:()=>request<PipelineRunSummary[]>('/api/pipeline/runs'),stats:()=>request<PipelineStats>('/api/pipeline/stats'),run:(id:string)=>request<PipelineRunDetail>(`/api/pipeline/runs/${id}`),
  uploadTenantUat:async(file:File,targetId:string)=>{const form=new FormData();form.append('file',file);form.append('targetId',targetId);return request<{runId:string;status:string}>('/api/company/uat/upload',{method:'POST',body:form})},
  upload:async(file:File,company:string,targetUrl:string)=>{const form=new FormData();form.append('file',file);if(company.trim())form.append('company',company.trim());if(targetUrl.trim())form.append('targetUrl',targetUrl.trim());form.append('executeAutomation','true');return request<{runId:string;status:string}>('/api/pipeline/upload',{method:'POST',body:form})},
  applications:()=>request<ApplicationTarget[]>('/api/applications?activeOnly=true'),addApplication:(target:ApplicationTarget)=>request<ApplicationTarget>('/api/applications',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(target)}),
  executionStats:()=>request<ExecutionStats>('/api/execution/stats'),executionHistory:()=>request<ExecutionHistory[]>('/api/execution/history'),agentSummary:()=>request<AgentSummary>('/api/agent-activity/summary'),agentRuns:(limit=20)=>request<AgentRun[]>(`/api/agent-activity/runs?limit=${limit}`),agentSteps:(runId:string)=>request<AgentStep[]>(`/api/agent-activity/runs/${runId}/steps`),
  healingStats:()=>request<HealingStats>('/api/healing/stats'),healingHistory:()=>request<HealingAttempt[]>('/api/healing/history'),aiRuntime:()=>request<AiRuntime>('/api/ai/runtime'),askAi:(question:string)=>request<{answer:string}>('/api/ai/ask',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question})}),
  trafficStats:()=>request<TrafficStats>('/api/analytics/stats'),recentVisits:(limit=20)=>request<RecentVisit[]>(`/api/analytics/recent?limit=${limit}`),recordVisit:(path:string,visitorId:string)=>request<{recorded:boolean}>('/api/analytics/visit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({path,visitorId})}),
  loadTest:(payload:LoadTestRequest)=>request<LoadTestResult>('/api/performance/load-test',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),loadTestHistory:()=>request<LoadTestRun[]>('/api/performance/history'),
  automationScripts:(companyId:string,productId:string)=>request<AutomationScript[]>(`/api/automation-scripts?companyId=${encodeURIComponent(companyId)}&productId=${encodeURIComponent(productId)}`),createAutomationScript:(payload:{companyId:string;productId:string;name:string;steps:string[]})=>request<AutomationScript>('/api/automation-scripts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),approveAutomationScript:(id:string)=>request<AutomationScript>(`/api/automation-scripts/${id}/approve`,{method:'PATCH'}),reviseAutomationScript:(id:string,steps:string[])=>request<AutomationScript>(`/api/automation-scripts/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({steps})}),generateAutomationScript:(id:string,payload:{url?:string;expectedResult?:string})=>request<GeneratedAutomation>(`/api/automation-scripts/${id}/generate`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),executeAutomationScript:(id:string,payload:{expectedResult?:string;headless?:boolean})=>request<ExecutionResult>(`/api/automation-scripts/${id}/execute`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),
  traceability:(companyId:string,productId:string)=>request<TestTraceability[]>(`/api/test-management/traceability?companyId=${encodeURIComponent(companyId)}&productId=${encodeURIComponent(productId)}`),createTraceability:(payload:{companyId:string;productId:string;requirementId:string;testCondition:string;testCaseId:string;automationScriptId?:string;riskLevel:string;expectedResult:string;entryCriteriaMet:boolean})=>request<TestTraceability>('/api/test-management/traceability',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),recordTraceabilityExecution:(id:string,payload:{executionId:string;status:string;actualResult:string;defectRef?:string})=>request<TestTraceability>(`/api/test-management/traceability/${id}/execution`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),testCompletionSummary:(companyId:string,productId:string)=>request<TestCompletionSummary>(`/api/test-management/summary?companyId=${encodeURIComponent(companyId)}&productId=${encodeURIComponent(productId)}`)
};

export const ssoLoginUrl=(provider:'google'|'github')=>`${API_BASE}/api/auth/sso/authorization/${provider}`;
export const downloadUrl=(runId:string,type:'json'|'xlsx')=>`${API_BASE}/api/pipeline/runs/${runId}/test-cases.${type}`;
export const evidenceUrl=(path:string)=>{if(/^https?:\/\//i.test(path))return path;const normalized=path.replace(/\\/g,'/');const marker='/api/execution/evidence/';const markerIndex=normalized.indexOf(marker);if(markerIndex>=0)return `${API_BASE}${normalized.substring(markerIndex)}`;const fileName=normalized.split('/').filter(Boolean).pop();return fileName?`${API_BASE}${marker}${encodeURIComponent(fileName)}`:'#'};
