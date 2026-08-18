import { useQuery } from '@tanstack/react-query';
import { auravisApi } from '../api/auravis';

function statusClass(status: string) {
  const s = status.toLowerCase();
  if (s === 'completed') return 'status completed';
  if (s === 'failed') return 'status failed';
  return 'status processing';
}

export default function DashboardPage() {
  const stats = useQuery({ queryKey: ['pipeline-stats'], queryFn: auravisApi.stats, refetchInterval: 10000 });
  const runs = useQuery({ queryKey: ['pipeline-runs'], queryFn: auravisApi.runs, refetchInterval: 10000 });

  const data = stats.data;

  return (
    <main className="page">
      <div className="eyebrow">AURAVIS 2.0 • LIVE MISSION CONTROL</div>
      <h1>Mission Dashboard</h1>
      <p className="lead">Persistent requirement processing, execution progress and mission history loaded directly from the Spring Boot backend and PostgreSQL.</p>

      <section className="metric-grid">
        <article><strong>{data?.uploaded ?? '—'}</strong><span>Files Uploaded</span></article>
        <article><strong>{data?.processed ?? '—'}</strong><span>Files Processed</span></article>
        <article><strong>{data?.completed ?? '—'}</strong><span>Completed</span></article>
        <article><strong>{data?.failed ?? '—'}</strong><span>Failed</span></article>
        <article><strong>{data?.processing ?? '—'}</strong><span>Processing</span></article>
        <article><strong>{data ? `${data.completionRate}%` : '—'}</strong><span>Processing Rate</span></article>
      </section>

      <section className="panel">
        <div className="section-heading"><div><div className="eyebrow">PERSISTED HISTORY</div><h2>Requirement Documents</h2></div><span className="live">● Live</span></div>
        {runs.isLoading && <p className="muted">Loading requirement documents…</p>}
        {runs.isError && <p className="error-text">Unable to load mission history from the backend.</p>}
        {runs.data && runs.data.length === 0 && <p className="muted">No uploaded requirement documents yet.</p>}
        {runs.data && runs.data.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Requirement File</th><th>Project</th><th>Status</th><th>Stage</th><th>Uploaded</th><th>Action</th></tr></thead>
              <tbody>{runs.data.map(run => (
                <tr key={run.id}>
                  <td><strong>{run.fileName}</strong></td>
                  <td>{run.company || 'default'}</td>
                  <td><span className={statusClass(run.status)}>{run.status}</span></td>
                  <td>{run.currentStage || '—'}</td>
                  <td>{run.createdAt ? new Date(run.createdAt).toLocaleString() : '—'}</td>
                  <td><a className="view-link" href={`/dashboard?run=${encodeURIComponent(run.id)}`}>View</a></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
