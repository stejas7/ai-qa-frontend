const API_BASE=import.meta.env.VITE_API_BASE_URL||'';

export type AuthorizationCapabilities={
  role:string;
  platformOwner:boolean;
  permissions:Record<string,boolean>;
};

export async function fetchAuthorizationCapabilities():Promise<AuthorizationCapabilities>{
  const response=await fetch(`${API_BASE}/api/auth/capabilities`,{credentials:'include',cache:'no-store'});
  if(!response.ok)throw new Error(`API ${response.status}: /api/auth/capabilities`);
  return response.json();
}
