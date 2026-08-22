import { useState } from 'react';

const visualVersion='20260822-m50-v1';
const visuals = [
  { title: 'Product overview', subtitle: 'Current AI UAT Engineer product map through M50: tenant setup, AI workforce, execution, evidence, governance and platform oversight', src: `/blueprint-overview-light.svg?v=${visualVersion}` },
  { title: 'What the product does', subtitle: 'Register → Requirement → AI/RAG → bounded workforce → test design → automation → Playwright → evidence → READY/BLOCKED', src: `/blueprint-product-flow.svg?v=${visualVersion}` },
  { title: 'System architecture', subtitle: 'React + Nginx + Spring Boot + Spring AI + PostgreSQL + Playwright + durable evidence + AWS deployment', src: `/blueprint-architecture.svg?v=${visualVersion}` },
  { title: 'Technology stack', subtitle: 'Java 21, Spring Boot 3.5, Spring AI, pgvector/PostgreSQL, Playwright, React/TypeScript, Docker, GHCR, GitHub Actions, AWS and Nginx', src: `/blueprint-technology.svg?v=${visualVersion}` },
  { title: 'Database & traceability', subtitle: 'Tenant-safe data path from companies/users/products through missions, tests, executions, evidence, audit and release decisions', src: `/blueprint-database.svg?v=${visualVersion}` },
  { title: 'M1–M50 roadmap', subtitle: 'Foundation → enterprise/security → autonomous intelligence → integrations/governance → scale/observability → multi-agent release intelligence & self-UAT', src: `/blueprint-roadmap.svg?v=${visualVersion}` }
] as const;

export default function ProductBlueprintPage(){
  const [selected,setSelected]=useState<(typeof visuals)[number] | null>(null);
  return <main className="page">
    <div className="eyebrow">PRODUCT • ARCHITECTURE • TECHNOLOGY • DATABASE • ROADMAP M1–M50</div>
    <h1>How AI UAT Engineer Works</h1>
    <p className="lead">A current visual guide to the complete AI UAT Engineer product through M50. Select any visual to open it larger. Use the self-UAT requirement below to test AI UAT Engineer against itself.</p>

    <section className="panel" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:18,flexWrap:'wrap'}}>
      <div><div className="eyebrow">SELF-UAT BASELINE</div><h2 style={{margin:'5px 0'}}>Test AI UAT Engineer with its own requirement</h2><p className="muted" style={{margin:0,maxWidth:760}}>The requirement baseline covers authentication, tenant isolation, product registration, 100-agent workforce planning, RAG, Playwright execution, durable evidence, release governance, Platform Admin oversight, CI/CD and self-UAT acceptance gates.</p></div>
      <a className="primary-btn" href="/AI_UAT_Engineer_Self_UAT_Requirements.md" download>Download requirement document</a>
    </section>

    <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(420px,1fr))',gap:'20px',marginTop:'24px'}}>
      {visuals.map((visual)=><button key={visual.src} type="button" onClick={()=>setSelected(visual)} style={{textAlign:'left',background:'#fff',border:'1px solid #dbe4ef',borderRadius:'18px',padding:'14px',cursor:'zoom-in',boxShadow:'0 8px 24px rgba(15,23,42,.06)'}}>
        <img src={visual.src} alt={visual.title} style={{display:'block',width:'100%',height:'auto',borderRadius:'13px',background:'#fff'}} />
        <div style={{padding:'14px 6px 6px'}}><strong style={{display:'block',fontSize:'18px'}}>{visual.title}</strong><span style={{display:'block',marginTop:'6px',color:'#64748b',lineHeight:1.45}}>{visual.subtitle}</span><span style={{display:'inline-block',marginTop:'10px',fontWeight:700,color:'#2563eb'}}>Open visual ↗</span></div>
      </button>)}
    </section>
    {selected&&<div role="dialog" aria-modal="true" aria-label={selected.title} onClick={()=>setSelected(null)} style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(15,23,42,.35)',display:'flex',alignItems:'center',justifyContent:'center',padding:'28px'}}>
      <div onClick={(event)=>event.stopPropagation()} style={{position:'relative',width:'min(1500px,96vw)',maxHeight:'92vh',overflow:'auto',background:'#fff',borderRadius:'20px',boxShadow:'0 24px 80px rgba(0,0,0,.2)'}}>
        <button type="button" onClick={()=>setSelected(null)} aria-label="Close visual" style={{position:'absolute',right:'14px',top:'14px',zIndex:2,width:'42px',height:'42px',borderRadius:'999px',border:'1px solid rgba(15,23,42,.15)',background:'#fff',color:'#0f172a',fontSize:'24px',cursor:'pointer'}}>×</button>
        <img src={selected.src} alt={selected.title} style={{display:'block',width:'100%',height:'auto',background:'#fff'}} />
      </div>
    </div>}
  </main>
}
