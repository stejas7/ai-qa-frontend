import { useEffect, useState } from 'react';
import { auravisApi, type HealingAttempt, type HealingStats } from '../api/auravis';

export default function HealingPage(){
  const [stats,setStats]=useState<HealingStats|null>(null);
  const [history,setHistory]=useState<HealingAttempt[]>([]);
  const [error,setError]=useState('');

  async function load(){
    try{
      const [s,h]=await Promise.all([auravisApi.healingStats(),auravisApi.healingHistory()]);
      setStats(s);setHistory(h);setError('');
    }catch(e){setError(e instanceof Error?e.message:'Healing data unavailable')}
  }

  useEffect(()=>{load();const id=setInterval(load,10000);return()=>clearInterval(id)},[]);

  return <main className="page">
    <div className="eyebrow">M6 • SELF-HEALING & SMART RECOVERY</div>
    <h1>Controlled Self-Healing</h1>
    <p className="lead">AI UAT Engineer heals only recoverable automation failures. Assertion and business failures are protected, confidence must be at least 90%, and the execution engine performs at most one controlled retry with persisted audit evidence.</p>
    {error&&<p className="error-text">{error}</p>}

    <section className="metric-grid four">
      <article><strong>{stats?.totalAttempts??'—'}</strong><span>Healing Decisions</span></article>
      <article><strong>{stats?.autoHealAllowed??'—'}</strong><span>Auto-Heal Allowed</span></article>
      <article><strong>{stats?.blocked??'—'}</strong><span>Protected / Blocked</span></article>
      <article><strong>{stats?`${stats.autoHealRate}%`:'—'}</strong><span>Allowed Rate</span></article>
    </section>

    <section className="panel">
      <div className="section-heading"><div><div className="eyebrow">SAFETY POLICY</div><h2>{stats?.status==='COMPLETED'?'M6 Complete':'M6 Status'}</h2></div><span className="status completed">{stats?.status??'LOADING'}</span></div>
      <div className="flow-grid">
        <div className="flow-step"><span>01</span><strong>Classify failure</strong></div>
        <div className="flow-step"><span>02</span><strong>Protect business/assertion failures</strong></div>
        <div className="flow-step"><span>03</span><strong>Require ≥ 90% confidence</strong></div>
        <div className="flow-step"><span>04</span><strong>Retry once + persist audit</strong></div>
      </div>
      <p className="muted">{stats?.policy}</p>
    </section>

    <section className="panel">
      <div className="section-heading"><div><div className="eyebrow">HEALING TRACE</div><h2>Recent Decisions</h2></div><span className="live">● Live</span></div>
      <div className="table-wrap"><table><thead><tr><th>Test</th><th>Category</th><th>Confidence</th><th>Decision</th><th>Proposed Repair</th><th>Time</th></tr></thead><tbody>
        {history.map(item=><tr key={item.id}><td>{item.testId}</td><td>{item.category}</td><td>{Math.round(item.confidence*100)}%</td><td><span className={`status ${item.decision==='AUTO_HEAL_ALLOWED'?'completed':'failed'}`}>{item.decision}</span></td><td>{item.proposedRepair||'—'}</td><td>{item.createdAt?new Date(item.createdAt).toLocaleString():'—'}</td></tr>)}
        {!history.length&&<tr><td colSpan={6} className="muted">No healing decisions yet. They will appear when execution encounters a recoverable or protected failure.</td></tr>}
      </tbody></table></div>
    </section>
  </main>
}
