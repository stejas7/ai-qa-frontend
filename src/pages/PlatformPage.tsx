import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { aiUatApi } from '../api/aiUat';
import { platformApi } from '../api/platform';

export default function PlatformPage(){
  const session=useQuery({queryKey:['current-user'],queryFn:aiUatApi.currentUser,retry:false});
  const enabled=session.data?.role==='SUPER_ADMIN'||session.data?.role==='PLATFORM_ADMIN';
  const diagnostics=useQuery({queryKey:['platform-diagnostics'],queryFn:platformApi.diagnostics,enabled,refetchInterval:15000});
  const companies=useQuery({queryKey:['platform-companies'],queryFn:platformApi.companies,enabled});
  const products=useQuery({queryKey:['platform-products'],queryFn:platformApi.products,enabled});
  const users=useQuery({queryKey:['platform-users'],queryFn:platformApi.users,enabled});
  const operations=useQuery({queryKey:['platform-operations'],queryFn:platformApi.operations,enabled,refetchInterval:10000});
  const audit=useQuery({queryKey:['platform-audit'],queryFn:platformApi.audit,enabled,refetchInterval:30000});
  const [search,setSearch]=useState('');
  const [companyFilter,setCompanyFilter]=useState('ALL');

  if(session.isLoading)return <main className="page"><p>Loading platform…</p></main>;
  if(!enabled)return <main className="page"><div className="eyebrow">M21 • PLATFORM ADMIN</div><h1>Super Admin access required</h1><p className="lead">This workspace is available only to the platform owner.</p></main>;

  const companyRows=companies.data??[];
  const productRows=products.data??[];
  const userRows=users.data??[];
  const operationRows=operations.data??[];
  const auditRows=audit.data??[];
  const health=diagnostics.data;
  const companyNameById=useMemo(()=>new Map(companyRows.map(c=>[c.id,c.name])),[companyRows]);
  const norm=search.trim().toLowerCase();
  const visibleCompanies=companyRows.filter(c=>(companyFilter==='ALL'||c.id===companyFilter)&&(!norm||`${c.name} ${c.slug}`.toLowerCase().includes(norm)));
  const visibleOperations=operationRows.filter(o=>(companyFilter==='ALL'||o.company===companyFilter)&&(!norm||`${o.fileName} ${o.status} ${o.currentStage} ${companyNameById.get(o.company)??o.company}`.toLowerCase().includes(norm)));
  const visibleAudit=auditRows.filter(a=>(companyFilter==='ALL'||a.scopeId===companyFilter||a.scopeId==='platform')&&(!norm||`${a.eventType} ${a.subject} ${a.detail}`.toLowerCase().includes(norm)));
  const fmtDuration=(ms:number|null)=>ms===null?'—':ms<1000?`${ms} ms`:`${Math.round(ms/1000)} s`;
  const fmtUptime=(ms:number)=>{const mins=Math.floor(ms/60000);const hours=Math.floor(mins/60);const days=Math.floor(hours/24);return days>0?`${days}d ${hours%24}h`:hours>0?`${hours}h ${mins%60}m`:`${mins}m`;};

  return <main className="page">
    <div className="eyebrow">M21 • SUPER ADMIN</div>
    <h1>Platform Control Center</h1>
    <p className="lead">See platform health, review companies, monitor UAT runs and trace important activity in one simple flow.</p>

    <section className="panel">
      <div className="section-heading"><div><div className="eyebrow">STEP 1</div><h2>Platform health</h2></div><span className={`status ${health?.health==='HEALTHY'?'completed':'failed'}`}>{health?.health??(diagnostics.isLoading?'CHECKING':'UNAVAILABLE')}</span></div>
      {diagnostics.isError?<p className="error-text">Unable to load platform diagnostics.</p>:<>
      <div className="summary-strip">
        <article><strong>{health?`${health.memory.remainingMb} MB`:'—'}</strong><span>Memory remaining</span></article>
        <article><strong>{health?.uatRuns.running??'—'}</strong><span>UAT running</span></article>
        <article><strong>{health?.traffic.uniqueVisitors??'—'}</strong><span>Unique visitors</span></article>
        <article><strong>{health?.tenants.products??'—'}</strong><span>Products</span></article>
      </div>
      <div className="role-grid">
        <article><strong>Memory</strong><p>{health?`${health.memory.usedMb} MB used of ${health.memory.maxMb} MB (${health.memory.usedPercent}%)`:'Loading…'}</p></article>
        <article><strong>Uptime</strong><p>{health?fmtUptime(health.uptimeMs):'Loading…'}</p></article>
        <article><strong>Traffic (24h)</strong><p>{health?`${health.traffic.visitsLast24h} visits • ${health.traffic.uniqueVisitorsLast24h} unique`:'Loading…'}</p></article>
        <article><strong>Failures (24h)</strong><p>{health?`${health.uatRuns.failedLast24h} failed UAT runs`:'Loading…'}</p></article>
        <article><strong>Companies / users</strong><p>{health?`${health.tenants.companies} companies • ${health.tenants.users} users`:'Loading…'}</p></article>
        <article><strong>Products active</strong><p>{health?`${health.tenants.activeProducts}/${health.tenants.products} active`:'Loading…'}</p></article>
      </div></>}
    </section>

    <section className="panel">
      <div className="section-heading"><div><div className="eyebrow">FILTER ONCE</div><h2>Choose what to inspect</h2></div></div>
      <div className="form-grid">
        <label className="field"><span>Company</span><select value={companyFilter} onChange={e=>setCompanyFilter(e.target.value)}><option value="ALL">All companies</option>{companyRows.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
        <label className="field"><span>Search</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Company, requirement, event…"/></label>
      </div>
    </section>

    <section className="panel">
      <div className="section-heading"><div><div className="eyebrow">STEP 2</div><h2>Companies</h2></div><span>{visibleCompanies.length} shown</span></div>
      <p className="lead">Start here when a tenant needs attention. Products and users are summarized so you can identify setup gaps quickly.</p>
      {companies.isError?<p className="error-text">Unable to load companies.</p>:<div className="table-wrap"><table><thead><tr><th>Company</th><th>Status</th><th>Products</th><th>Users</th><th>Next action</th></tr></thead><tbody>{visibleCompanies.map(c=><tr key={c.id}><td><strong>{c.name}</strong><br/><small>{c.slug}</small></td><td><span className={`status ${c.active?'completed':'failed'}`}>{c.active?'ACTIVE':'INACTIVE'}</span></td><td>{c.products}</td><td>{c.users}</td><td>{!c.active?'Review company':c.products===0?'Add product':c.users===0?'Add users':'Ready'}</td></tr>)}</tbody></table></div>}
      <div className="role-grid"><article><strong>Registered products</strong><p>{productRows.length} environments across the platform.</p></article><article><strong>Registered users</strong><p>{userRows.length} total user accounts.</p></article></div>
    </section>

    <section className="panel">
      <div className="section-heading"><div><div className="eyebrow">STEP 3</div><h2>Live UAT</h2></div><span className="status completed">AUTO REFRESH 10s</span></div>
      <p className="lead">Follow current and recent executions. Failed runs stay visible so the next investigation is obvious.</p>
      {operations.isError?<p className="error-text">Unable to load UAT operations.</p>:visibleOperations.length===0?<p>No UAT runs match this view.</p>:<div className="table-wrap"><table><thead><tr><th>Company</th><th>Requirement</th><th>Status</th><th>Stage</th><th>Duration</th></tr></thead><tbody>{visibleOperations.slice(0,30).map(o=><tr key={o.id}><td>{companyNameById.get(o.company)??o.company}</td><td><strong>{o.fileName}</strong></td><td><span className={`status ${o.status==='COMPLETED'?'completed':o.status==='FAILED'?'failed':''}`}>{o.status}</span></td><td>{o.currentStage}</td><td>{fmtDuration(o.durationMillis)}</td></tr>)}</tbody></table></div>}
    </section>

    <section className="panel">
      <div className="section-heading"><div><div className="eyebrow">STEP 4</div><h2>Activity</h2></div><span>Latest events</span></div>
      <p className="lead">Use the timeline only after checking company and UAT state. It provides the trace needed to understand what changed.</p>
      {audit.isError?<p className="error-text">Unable to load platform activity.</p>:visibleAudit.length===0?<p>No activity matches this view.</p>:<div className="table-wrap"><table><thead><tr><th>Time</th><th>Company</th><th>Event</th><th>Detail</th></tr></thead><tbody>{visibleAudit.slice(0,40).map((a,i)=><tr key={`${a.eventType}-${a.occurredAt}-${i}`}><td>{new Date(a.occurredAt).toLocaleString()}</td><td>{companyNameById.get(a.scopeId)??a.scopeId}</td><td><strong>{a.eventType}</strong></td><td>{a.detail}</td></tr>)}</tbody></table></div>}
    </section>
  </main>;
}