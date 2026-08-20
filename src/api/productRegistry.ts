const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export type ProductEnvironment={
  id:string;
  name:string;
  baseUrl:string;
  environment:string;
  authType:string;
  companyId:string;
  active:boolean;
  createdAt:string;
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

export const productRegistryApi={
  list:(activeOnly=true)=>request<ProductEnvironment[]>(`/api/company/products?activeOnly=${activeOnly}`),
  create:(payload:{name:string;baseUrl:string;environment:string;authType:string})=>request<ProductEnvironment>('/api/company/products',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),
  setActive:(id:string,value:boolean)=>request<ProductEnvironment>(`/api/company/products/${id}/active?value=${value}`,{method:'PATCH'})
};
