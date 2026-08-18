import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { auravisApi, AgentRun } from '../api/auravis';

function statusClass(status:string){const s=status.toLowerCase();if(s==='completed')return 'status completed';if(s==='failed'||s==='cancelled')return 'status failed';return 'status processing'}

export default function AgentActivityPage(){
  const summary=useQuery({queryKey:['agent-summary'],queryFn:auravisApi.agentSummary,refetchInterval:8000});
  const runs=useQuery({queryKey:['agent-runs'],queryFn:()=>auravisApi.agentRuns(20),refetchInterval:8000});
  const [selected,setSelected]=useState<string>('');
  useEffect(()=>{if(!selected&&runs.data?.length)setSelected(runs.data[0].id)},[runs.data,selected]);
  const selectedRun=useMemo(()=>runs.data?.find(r=>r.id===selected),[runs.data,selected]);
  const steps=useQuery({queryKey:['agent-steps',selected],queryFn:()=>auravisApi.agentSteps(selected),enabled:!!selected,refetchInterval:8000});
  const s=summary.data;
  return <main className="page">
    <div className="eyebrow">M5 • AGENTIC ORCHESTRATION</div><h1>Agent Activity</h1>
    <p className="lead">Live observability for persisted Auravis agent runs and execution steps. This page reads the existing Spring Boot M5 observability APIs rather than simulating agent activity.</p>
    <section className="metric-grid four compact"><article><strong>{s?.totalRuns??'—'}</strong><span>Total Agent Runs</span></article><article><strong>{s?.running??'—'}</strong><span>Running</span></article><article><strong>{s?.completed??'—'}</strong><span>Completed</span></article><article><strong>{s?.failed??'—'}</strong><span>Failed</span></article></section>
    <section className="two-col">
      <div className="panel"><div className="section-heading"><div><div className="eyebrow">ORCHESTRATION HISTORY</div><h2>Recent Agent Runs</h2></div><span className="live">● Live</span></div>
        {runs.isError&&<p className="error-text">Unable to load agent runs.</p>}{runs.data?.length===0&&<p className="muted">No M5 agent runs have been persisted yet.</p>}
        <div className="stack-list">{runs.data?.map((r:AgentRun)=><button key={r.id} className={`agent-run-card ${selected===r.id?'selected-agent':''}`} onClick={()=>setSelected(r.id)}><span><strong>{r.agentType}</strong><small>{r.createdAt?new Date(r.createdAt).toLocaleString():'—'}</small></span><span className={statusClass(r.status)}>{r.status}</span></button>)}</div>
      </div>
      <div className="panel"><div className="eyebrow">RUN TRACE</div><h2>{selectedRun?.agentType||'Select an agent run'}</h2>
        {selectedRun?.decisionSummary&&<p className="lead agent-summary">{selectedRun.decisionSummary}</p>}
        {steps.isLoading&&<p className="muted">Loading agent steps…</p>}{steps.isError&&<p className="error-text">Unable to load steps for this run.</p>}
        <div className="agent-timeline">{steps.data?.map(step=><article key={step.id}><div className="agent-seq">{step.sequenceNo}</div><div><div className="agent-step-title"><strong>{step.stepType}</strong><span className={statusClass(step.status)}>{step.status}</span></div>{step.input&&<p><b>Input:</b> {step.input}</p>}{step.output&&<p><b>Output:</b> {step.output}</p>}</div></article>)}</div>
      </div>
    </section>
  </main>
}
