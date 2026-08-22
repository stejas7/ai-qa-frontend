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
  const traffic=useQuery({queryKey:['platform-traffic'],queryFn:platformApi.traffic,enabled,refetchInterval:15000});
  const recentVisits=useQuery({queryKey:['platform-recent-visits'],queryFn:()=>platformApi.recentVisits(50),enabled,refetchInterval:15000});
  const dbTables=useQuery({queryKey:['platform-db-tables'],queryFn:platformApi.databaseTables,enabled});
  const [search,setSearch]=useState('');
  const [companyFilter,setCompanyFilter]=useState('ALL');
  const [selectedTable,setSelectedTable]=useState('');
  const [dbPage,setDbPage]=useState(0);
  const [dbSize,setDbSize]=useState(20);
  const dbRows=useQuery({queryKey:['platform-db-rows',selectedTable,dbPage,dbSize],queryFn:()=>platformApi.databaseRows(selectedTable,dbPage,dbSize),enabled:enabled&&!!selectedTable});

  if(session.isLoading)return <main className="page"><p>Loading platform…</p></main>;
  if(!enabled)return <main className="page"><div className="eyebrow">PLATFORM ADMIN</div><h1>Platform owner access required</h1><p className="lead">This workspace is available only to the platform owner.</p></main>;

  const companyRows=companies.data??[];
  const productRows=products.data??[];
  const userRows=users.data??[];
  const operationRows=operations.data??[];
  const auditRows=audit.data??[];
  const visitRows=recentVisits.data??[];
  const health=diagnostics.data;
  const companyNameById=useMemo(()=>new Map(companyRows.map(c=>[c.id,c.name])),[companyRows]);
  const norm=search.trim().toLowerCase();
  const visibleCompanies=companyRows.filter(c=>(companyFilter==='ALL'||c.id===companyFilter)&&(!norm||`${c.name} ${c.slug}`.toLowerCase().includes(norm)));
  const visibleOperations=operationRows.filter(o=>(companyFilter==='ALL'||o.company===companyFilter)&&(!norm||`${o.fileName} ${o.status} ${o.currentStage} ${companyNameById.get(o.company)??o.company}`.toLowerCase().includes(norm)));
  const visibleAudit=auditRows.filter(a=>(companyFilter==='ALL'||a.scopeId===companyFilter||a.scopeId==='platform')&&(!norm||`${a.eventType} ${a.subject} ${a.detail}`.toLowerCase().includes(norm)));
  const visibleVisits=visitRows.filter(v=>(companyFilter==='ALL'||v.companyId===companyFilter||(!v.companyId&&companyFilter==='ALL'))&&(!norm||`${v.identity} ${v.path} ${v.visitor}`.toLowerCase().includes(norm)));
  const fmtDuration=(ms:number|null)=>ms===null?'—':ms<1000?`${ms} ms`:`${Math.round(ms/1000)} s`;
  const fmtUptime=(ms:number)=>{const mins=Math.floor(ms/60000);const hours=Math.floor(mins/60);const days=Math.floor(hours/24);return days>0?`${days}d ${hours%24}h`:hours>0?`${hours}h ${mins%60}m`:`${mins}m`;};
  const displayValue=(value:unknown)=>value===null||value===undefined?'—':typeof value==='object'?JSON.stringify(value):String(value);

  return <main className="page">
    <div className="eyebrow">PLATFORM ADMIN</div>
    <h1>Platform Control Center</h1>
    <p className="lead">One place to watch companies, users, products, traffic, database activity, UAT execution and platform health.</p>

    <section className="panel">
      <div className="section-heading"><div><div className="eyebrow">OVERVIEW</div><h2>Platform health</h2></div><span className={`status ${health?.health==='HEALTHY'?'completed':'failed'}`}>{health?.health??(diagnostics.isLoading?'CHECKING':'UNAVAILABLE')}</span></div>
      {diagnostics.isError?<p className="error-text">Unable to load platform diagnostics. Retry shortly.</p>:<>
      <div className="summary-strip">
        <article><strong>{health?`${health.memory.remainingMb} MB`:'—'}</strong><span>Memory remaining</span></article>
        <article><strong>{health?.uatRuns.running??0}</strong><span>UAT running</span></article>
        <article><strong>{traffic.data?.uniqueVisitorsToday??health?.traffic.uniqueVisitorsLast24h??0}</strong><span>Visitors today</span></article>
        <article><strong>{health?.tenants.products??0}</strong><span>Products</span></article>
      </div>
      <div className="role-grid">
        <article><strong>Companies / users</strong><p>{health?`${health.tenants.companies} companies • ${health.tenants.users} users`:'0 companies • 0 users'}</p></article>
        <article><strong>Products active</strong><p>{health?`${health.tenants.activeProducts}/${health.tenants.products} active`:'0/0 active'}</p></article>
        <article><strong>Authenticated visitors today</strong><p>{traffic.data?.authenticatedVisitorsToday??0}</p></article>
        <article><strong>Active users (15 min)</strong><p>{traffic.data?.activeAuthenticatedUsers??0}</p></article>
        <article><strong>Most visited page</strong><p>{traffic.data?.mostVisitedPage??'—'}</p></article>
        <article><strong>Uptime</strong><p>{health?fmtUptime(health.uptimeMs):'—'}</p></article>
      </div></>}
    </section>

    <section className="panel">
      <div className="section-heading"><div><div className="eyebrow">LIVE TRAFFIC</div><h2>Who visited which page</h2></div><span className="status completed">AUTO REFRESH 15s</span></div>
      <p className="lead">Authenticated visits show the known account email and company. Public traffic remains Anonymous by design; no fake name and no raw IP/session ID is stored.</p>
      {traffic.isError||recentVisits.isError?<p className="error-text">Unable to load visitor analytics.</p>:<>
        <div className="summary-strip"><article><strong>{traffic.data?.visitsToday??0}</strong><span>Page views today</span></article><article><strong>{traffic.data?.uniqueVisitorsToday??0}</strong><span>Unique visitors today</span></article><article><strong>{traffic.data?.authenticatedVisitorsToday??0}</strong><span>Known users today</span></article><article><strong>{traffic.data?.activeAuthenticatedUsers??0}</strong><span>Active now (15 min)</span></article></div>
        <div className="table-wrap"><table><thead><tr><th>Time</th><th>Visitor</th><th>Company</th><th>Page</th><th>Browser ID</th></tr></thead><tbody>{visibleVisits.length===0?<tr><td colSpan={5}>No visits match this view.</td></tr>:visibleVisits.map((v,i)=><tr key={`${v.visitedAt}-${v.visitor}-${i}`}><td>{new Date(v.visitedAt).toLocaleString()}</td><td><strong>{v.identity}</strong></td><td>{v.companyId?companyNameById.get(v.companyId)??v.companyId:'Public'}</td><td>{v.path}</td><td>{v.visitor}</td></tr>)}</tbody></table></div>
        {traffic.data?.topPages?.length?<div className="role-grid">{traffic.data.topPages.slice(0,6).map(p=><article key={p.path}><strong>{p.path}</strong><p>{p.visits} views</p></article>)}</div>:null}
      </>}
    </section>

    <section className="panel">
      <div className="section-heading"><div><div className="eyebrow">DATABASE</div><h2>Read-only data explorer</h2></div><span>{dbTables.data?.length??0} tables</span></div>
      <p className="lead">Platform Admin can inspect safe application data only. Passwords, tokens, secrets, cookies, sessions and credential fields are removed server-side.</p>
      {dbTables.isError?<p className="error-text">Unable to load database tables.</p>:<div className="form-grid"><label className="field"><span>Table</span><select value={selectedTable} onChange={e=>{setSelectedTable(e.target.value);setDbPage(0)}}><option value="">Choose table…</option>{(dbTables.data??[]).map(t=><option key={t.name} value={t.name}>{t.name} ({t.rows} rows)</option>)}</select></label><label className="field"><span>Rows per page</span><select value={dbSize} onChange={e=>{setDbSize(Number(e.target.value));setDbPage(0)}}><option value={20}>20</option><option value={50}>50</option><option value={100}>100</option></select></label></div>}
      {selectedTable&&dbRows.isLoading?<p>Loading table…</p>:null}
      {selectedTable&&dbRows.isError?<p className="error-text">Unable to load table data.</p>:null}
      {dbRows.data?<>
        <div className="section-heading"><div><strong>{dbRows.data.table}</strong><small> {dbRows.data.totalRows} total rows • page {dbRows.data.page+1} of {Math.max(1,dbRows.data.totalPages)}</small></div></div>
        <div className="table-wrap"><table><thead><tr>{dbRows.data.columns.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{dbRows.data.rows.length===0?<tr><td colSpan={Math.max(1,dbRows.data.columns.length)}>No rows.</td></tr>:dbRows.data.rows.map((row,i)=><tr key={i}>{dbRows.data.columns.map(c=><td key={c}>{displayValue(row[c])}</td>)}</tr>)}</tbody></table></div>
        <div className="button-row"><button type="button" className="secondary-btn" disabled={dbPage<=0} onClick={()=>setDbPage(p=>Math.max(0,p-1))}>Previous</button><span>Page {dbRows.data.page+1} / {Math.max(1,dbRows.data.totalPages)}</span><button type="button" className="secondary-btn" disabled={dbRows.data.totalPages===0||dbPage+1>=dbRows.data.totalPages} onClick={()=>setDbPage(p=>p+1)}>Next</button></div>
      </>:null}
    </section>

    <section className="panel">
      <div className="section-heading"><div><div className="eyebrow">FILTER</div><h2>Choose what to inspect</h2></div></div>
      <div className="form-grid"><label className="field"><span>Company</span><select value={companyFilter} onChange={e=>setCompanyFilter(e.target.value)}><option value="ALL">All companies</option>{companyRows.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label className="field"><span>Search</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Company, user, page, requirement, event…"/></label></div>
    </section>

    <section className="panel">
      <div className="section-heading"><div><div className="eyebrow">COMPANIES</div><h2>Tenants</h2></div><span>{visibleCompanies.length} shown</span></div>
      {companies.isError?<p className="error-text">Unable to load companies.</p>:<div className="table-wrap"><table><thead><tr><th>Company</th><th>Status</th><th>Products</th><th>Users</th><th>Next action</th></tr></thead><tbody>{visibleCompanies.length===0?<tr><td colSpan={5}>No companies match this view.</td></tr>:visibleCompanies.map(c=><tr key={c.id}><td><strong>{c.name}</strong><br/><small>{c.slug}</small></td><td><span className={`status ${c.active?'completed':'failed'}`}>{c.active?'ACTIVE':'INACTIVE'}</span></td><td>{c.products}</td><td>{c.users}</td><td>{!c.active?'Review company':c.products===0?'Add product':c.users===0?'Add users':'Ready'}</td></tr>)}</tbody></table></div>}
      <div className="role-grid"><article><strong>Registered products</strong><p>{productRows.length} environments across the platform.</p></article><article><strong>Registered users</strong><p>{userRows.length} total user accounts.</p></article></div>
    </section>

    <section className="panel">
      <div className="section-heading"><div><div className="eyebrow">LIVE UAT</div><h2>Executions</h2></div><span className="status completed">AUTO REFRESH 10s</span></div>
      {operations.isError?<p className="error-text">Unable to load UAT operations.</p>:visibleOperations.length===0?<p>No UAT runs match this view.</p>:<div className="table-wrap"><table><thead><tr><th>Company</th><th>Requirement</th><th>Status</th><th>Stage</th><th>Duration</th></tr></thead><tbody>{visibleOperations.slice(0,30).map(o=><tr key={o.id}><td>{companyNameById.get(o.company)??o.company}</td><td><strong>{o.fileName}</strong></td><td><span className={`status ${o.status==='COMPLETED'?'completed':o.status==='FAILED'?'failed':''}`}>{o.status}</span></td><td>{o.currentStage}</td><td>{fmtDuration(o.durationMillis)}</td></tr>)}</tbody></table></div>}
    </section>

    <section className="panel">
      <div className="section-heading"><div><div className="eyebrow">ACTIVITY</div><h2>Platform audit</h2></div><span>Latest events</span></div>
      {audit.isError?<p className="error-text">Unable to load platform activity.</p>:visibleAudit.length===0?<p>No activity matches this view.</p>:<div className="table-wrap"><table><thead><tr><th>Time</th><th>Company</th><th>Event</th><th>Detail</th></tr></thead><tbody>{visibleAudit.slice(0,40).map((a,i)=><tr key={`${a.eventType}-${a.occurredAt}-${i}`}><td>{new Date(a.occurredAt).toLocaleString()}</td><td>{companyNameById.get(a.scopeId)??a.scopeId}</td><td><strong>{a.eventType}</strong></td><td>{a.detail}</td></tr>)}</tbody></table></div>}
    </section>
  </main>;
}
