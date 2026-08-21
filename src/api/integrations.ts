const API_BASE=import.meta.env.VITE_API_BASE_URL||'';

async function request<T>(path:string,init?:RequestInit):Promise<T>{
  const response=await fetch(`${API_BASE}${path}`,{credentials:'include',cache:'no-store',...init});
  if(!response.ok){let message=`API ${response.status}: ${path}`;try{const body=await response.json();message=body.error||message}catch{}throw new Error(message)}
  return response.json();
}

export type IntegrationEndpoint={id:string;companyId:string;name:string;url:string;eventTypes:string[];active:boolean;createdAt:string};
export type WebhookDelivery={id:string;endpointId:string;eventType:string;statusCode:number;success:boolean;message:string;createdAt:string};

export const integrationsApi={
  list:()=>request<IntegrationEndpoint[]>('/api/integrations'),
  create:(payload:{name:string;url:string;eventTypes:string[]})=>request<IntegrationEndpoint>('/api/integrations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),
  setActive:(id:string,active:boolean)=>request<IntegrationEndpoint>(`/api/integrations/${id}/active`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({active})}),
  test:(id:string)=>request<WebhookDelivery>(`/api/integrations/${id}/test`,{method:'POST'}),
  deliveries:()=>request<WebhookDelivery[]>('/api/integrations/deliveries')
};
