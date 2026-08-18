import { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { auravisApi } from '../api/auravis';

export default function NewMissionPage(){
  const [file,setFile]=useState<File|null>(null);const [company,setCompany]=useState('default');const [targetUrl,setTargetUrl]=useState('');
  const navigate=useNavigate();const qc=useQueryClient();
  const upload=useMutation({mutationFn:()=>{if(!file)throw new Error('Select a requirement file');return auravisApi.upload(file,company,targetUrl)},onSuccess:async d=>{await qc.invalidateQueries({queryKey:['pipeline-runs']});navigate(`/dashboard?run=${encodeURIComponent(d.runId)}`)}});
  const submit=(e:FormEvent)=>{e.preventDefault();upload.mutate()};
  return <main className="page"><div className="eyebrow">AUTONOMOUS MISSION</div><h1>Start New Mission</h1><p className="lead">Upload a BRD, PRD, user story or requirement document. Auravis persists the mission in PostgreSQL and processes it through requirement intelligence, test design and supported UAT execution.</p>
    <section className="panel mission-form"><form onSubmit={submit}>
      <label className="field"><span>Requirement Document</span><input type="file" accept=".txt,.md,.docx,.pdf" onChange={e=>setFile(e.target.files?.[0]||null)}/><small>{file?file.name:'TXT, MD, DOCX or PDF • max 10 MB'}</small></label>
      <div className="form-grid"><label className="field"><span>Project / Tenant</span><input value={company} onChange={e=>setCompany(e.target.value)} placeholder="default"/></label><label className="field"><span>UAT Application URL</span><input value={targetUrl} onChange={e=>setTargetUrl(e.target.value)} placeholder="https://uat.example.com"/></label></div>
      <div className="form-actions"><button className="primary-btn" disabled={upload.isPending||!file}>{upload.isPending?'Starting Auravis…':'Start Auravis Mission'}</button></div>
      {upload.isError&&<p className="error-text">{upload.error.message}</p>}
    </form></section>
    <section className="panel"><div className="eyebrow">WHAT HAPPENS NEXT</div><div className="flow-grid">{['Persist mission','Read requirement','Retrieve RAG context','Generate intelligent tests','Generate automation','Execute supported UAT','Diagnose failures','Return QA decision'].map((x,i)=><div className="flow-step" key={x}><b>{String(i+1).padStart(2,'0')}</b><span>{x}</span></div>)}</div></section>
  </main>
}
