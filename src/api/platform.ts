const API_BASE=import.meta.env.VITE_API_BASE_URL||'';
async function get<T>(path:string):Promise<T>{const r=await fetch(`${API_BASE}${path}`,{credentials:'include',cache:'no-store'});if(!r.ok)throw new Error(`API ${r.status}: ${path}`);return r.json()}
export type PlatformCompany={id:string;name:string;slug:string;active:boolean;products:number;users:number};
export type PlatformProduct={id:string;companyId:string;name:string;environment:string;authType:string;active:boolean};
export type PlatformUser={id:string;companyId:string;email:string;role:string;active:boolean};
export const platformApi={companies:()=>get<PlatformCompany[]>('/api/platform/companies'),products:()=>get<PlatformProduct[]>('/api/platform/products'),users:()=>get<PlatformUser[]>('/api/platform/users')};
