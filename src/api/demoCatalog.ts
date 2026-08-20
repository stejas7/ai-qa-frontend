const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export type DemoRequirement={id:string;title:string;risk:string;status:string;generatedTests:number;failedTests:number;evidenceSummary:string};
export type DemoProduct={id:string;name:string;environment:string;baseUrl:string;authType:string;requirements:DemoRequirement[]};
export type DemoUser={email:string;role:string;active:boolean};
export type DemoCompany={id:string;name:string;slug:string;users:DemoUser[];products:DemoProduct[]};
export type DemoCatalog={demo:boolean;companyCount:number;productCount:number;userCount:number;requirementCount:number;companies:DemoCompany[]};

export async function fetchDemoCatalog():Promise<DemoCatalog>{
  const response=await fetch(`${API_BASE}/api/demo/catalog`,{cache:'no-store',credentials:'include'});
  if(!response.ok)throw new Error(`Demo catalog unavailable (${response.status})`);
  return response.json();
}
