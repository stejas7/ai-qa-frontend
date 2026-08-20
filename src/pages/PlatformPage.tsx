import { useQuery } from '@tanstack/react-query';
import { aiUatApi } from '../api/aiUat';
import { platformApi } from '../api/platform';

export default function PlatformPage(){
 const session=useQuery({queryKey:['current-user'],queryFn:aiUatApi.currentUser,retry:false});
 const enabled=session.data?.role==='PLATFORM_ADMIN';
 const companies=useQuery({queryKey:['platform-companies'],queryFn:platformApi.companies,enabled});
 const products=useQuery({queryKey:['platform-products'],queryFn:platformApi.products,enabled});
 const users=useQuery({queryKey:['platform-users'],queryFn:platformApi.users,enabled});
 if(session.isLoading)return <main className="page"><p>Loading platform oversight…</p></main>;
 if(!enabled)return <main className="page"><div className="eyebrow">M20 • PLATFORM OVERSIGHT</div><h1>Platform owner access required</h1><p className="lead">This read-only console is restricted to PLATFORM_ADMIN.</p></main>;
 const activeCompanies=companies.data?.filter(x=>x.active).length??0;
 return <main className="page"><div className="eyebrow">4.0 • M20.1–M20.3</div><h1>Platform Owner Console</h1><p className="lead">Read-only oversight across companies, registered product environments and users. Credentials and password data are never shown.</p>
 <div className="summary-strip"><article><strong>{companies.data?.length??'—'}</strong><span>Companies</span></article><article><strong>{activeCompanies}</strong><span>Active companies</span></article><article><strong>{products.data?.length??'—'}</strong><span>Product environments</span></article><article><strong>{users.data?.length??'—'}</strong><span>Users</span></article></div>
 <section className="panel"><h2>Company directory</h2>{companies.isError?<p className="error-text">Unable to load companies.</p>:<div className="table-wrap"><table><thead><tr><th>Company</th><th>Status</th><th>Products</th><th>Users</th></tr></thead><tbody>{companies.data?.map(c=><tr key={c.id}><td><strong>{c.name}</strong><br/><small>{c.slug}</small></td><td>{c.active?'Active':'Inactive'}</td><td>{c.products}</td><td>{c.users}</td></tr>)}</tbody></table></div>}</section>
 <section className="panel"><h2>Products</h2><div className="table-wrap"><table><thead><tr><th>Product</th><th>Environment</th><th>Authentication</th><th>Status</th></tr></thead><tbody>{products.data?.map(p=><tr key={p.id}><td>{p.name}</td><td>{p.environment}</td><td>{p.authType}</td><td>{p.active?'Active':'Inactive'}</td></tr>)}</tbody></table></div></section>
 <section className="panel"><h2>Users</h2><div className="table-wrap"><table><thead><tr><th>User</th><th>Role</th><th>Status</th></tr></thead><tbody>{users.data?.map(u=><tr key={u.id}><td>{u.email}</td><td>{u.role}</td><td>{u.active?'Active':'Inactive'}</td></tr>)}</tbody></table></div></section>
 </main>;
}
