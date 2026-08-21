import { useQuery } from '@tanstack/react-query';
import { aiUatApi } from '../api/aiUat';
import { platformApi } from '../api/platform';

function duration(ms:number){const s=Math.floor(ms/1000);const d=Math.floor(s/86400);const h=Math.floor((s%86400)/3600);const m=Math.floor((s%3600)/60);return `${d}d ${h}h ${m}m`}

export default function PlatformDiagnosticsPage(){
  const session=useQuery({queryKey:['current-user'],queryFn:aiUatApi.currentUser,retry:false});
  const enabled=session.data?.role==='SUPER_ADMIN'||session.data?.role==='PLATFORM_ADMIN';
  const snapshot=useQuery({queryKey:['platform-diagnostics'],queryFn:platformApi.diagnostics,enabled,refetchInterval:15000});
  if(session.isLoading)return <main className="page"><p>Loading diagnostics…</p></main>;
  if(!enabled)return <main className="page"><h1>Super Admin access required</h1></main>;
  if(snapshot.isLoading)return <main className="page"><p>Loading diagnostics…</p></main>;
  if(snapshot.isError||!snapshot.data)return <main className="page"><p className="error-text">Unable to load diagnostics.</p></main>;
  const d=snapshot.data;
  return <main className="page"><div className="eyebrow">PLATFORM DIAGNOSTICS</div><h1>System snapshot</h1><p className="lead">One endpoint, one page, auto-refreshing every 15 seconds.</p>
    <section className="panel"><div className="section-heading"><div><h2>Health</h2><p className="muted">Generated {new Date(d.generatedAt).toLocaleString()}</p></div><span className={`status ${d.health==='HEALTHY'?'completed':'failed'}`}>{d.health}</span></div><div className="summary-strip"><article><strong>{duration(d.uptimeMs)}</strong><span>Uptime</span></article><article><strong>{d.memory.remainingMb} MB</strong><span>Memory remaining</span></article><article><strong>{d.memory.usedPercent}%</strong><span>Memory used</span></article><article><strong>{d.uatRuns.running}</strong><span>Running UATs</span></article></div></section>
    <section className="panel"><h2>Traffic</h2><div className="summary-strip"><article><strong>{d.traffic.totalVisits}</strong><span>Total visits</span></article><article><strong>{d.traffic.uniqueVisitors}</strong><span>Unique visitors</span></article><article><strong>{d.traffic.visitsLast24h}</strong><span>Visits · 24h</span></article><article><strong>{d.traffic.uniqueVisitorsLast24h}</strong><span>Unique visitors · 24h</span></article></div></section>
    <section className="panel"><h2>Platform usage</h2><div className="summary-strip"><article><strong>{d.tenants.companies}</strong><span>Companies</span></article><article><strong>{d.tenants.users}</strong><span>Users</span></article><article><strong>{d.tenants.products}</strong><span>Products</span></article><article><strong>{d.tenants.activeProducts}</strong><span>Active products</span></article></div></section>
    <section className="panel"><h2>UAT runs</h2><div className="summary-strip"><article><strong>{d.uatRuns.total}</strong><span>Total runs</span></article><article><strong>{d.uatRuns.running}</strong><span>Running / queued</span></article><article><strong>{d.uatRuns.failed}</strong><span>Total failed</span></article><article><strong>{d.uatRuns.failedLast24h}</strong><span>Failed · 24h</span></article></div></section>
    <section className="panel"><h2>Memory</h2><div className="two-col"><article className="inner-card"><strong>Used</strong><p>{d.memory.usedMb} MB</p></article><article className="inner-card"><strong>Maximum heap</strong><p>{d.memory.maxMb} MB</p></article></div></section>
  </main>;
}
