import { useState } from 'react';

const visuals = [
  {
    title: 'Product overview',
    subtitle: 'A light-format summary combining product flow, architecture, technology stack and learning roadmap',
    src: '/blueprint-overview-light.svg'
  },
  {
    title: 'What the product does',
    subtitle: 'Requirement → AI design → RAG → Agents → Browser → Evidence → Release decision',
    src: '/blueprint-product-flow.svg'
  },
  {
    title: 'System architecture',
    subtitle: 'A simple end-to-end view of UI, backend, AI, automation, data and AWS runtime',
    src: '/blueprint-architecture.svg'
  },
  {
    title: 'Technology stack',
    subtitle: 'The main technologies grouped by the role they play in the product',
    src: '/blueprint-technology.svg'
  },
  {
    title: 'Database structure',
    subtitle: 'Simplified ER view of companies, users, products, requirements, runs, test cases, evidence, RAG knowledge, analytics and release decisions',
    src: '/blueprint-database.svg'
  },
  {
    title: 'Learning roadmap',
    subtitle: 'How the project evolved from M1 through M20 toward 4.0 Stable',
    src: '/blueprint-roadmap.svg'
  }
] as const;

export default function ProductBlueprintPage(){
  const [selected,setSelected]=useState<(typeof visuals)[number] | null>(null);

  return <main className="page">
    <div className="eyebrow">PRODUCT • ARCHITECTURE • TECHNOLOGY • DATABASE • ROADMAP</div>
    <h1>How AI UAT Engineer Works</h1>
    <p className="lead">A simple visual guide to what the product does, how the system is connected, which technologies are used, how the data is structured and how the product evolved. Select any visual to open it larger.</p>

    <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(420px,1fr))',gap:'20px',marginTop:'24px'}}>
      {visuals.map((visual)=><button
        key={visual.src}
        type="button"
        onClick={()=>setSelected(visual)}
        style={{textAlign:'left',background:'var(--panel, #fff)',border:'1px solid #dbe4ef',borderRadius:'18px',padding:'14px',cursor:'zoom-in',boxShadow:'0 8px 24px rgba(15,23,42,.06)'}}
      >
        <img src={visual.src} alt={visual.title} style={{display:'block',width:'100%',height:'auto',borderRadius:'13px'}} />
        <div style={{padding:'14px 6px 6px'}}>
          <strong style={{display:'block',fontSize:'18px'}}>{visual.title}</strong>
          <span style={{display:'block',marginTop:'6px',color:'#64748b',lineHeight:1.45}}>{visual.subtitle}</span>
          <span style={{display:'inline-block',marginTop:'10px',fontWeight:700,color:'#2563eb'}}>Open visual ↗</span>
        </div>
      </button>)}
    </section>

    {selected&&<div
      role="dialog"
      aria-modal="true"
      aria-label={selected.title}
      onClick={()=>setSelected(null)}
      style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(15,23,42,.55)',display:'flex',alignItems:'center',justifyContent:'center',padding:'28px'}}
    >
      <div onClick={(event)=>event.stopPropagation()} style={{position:'relative',width:'min(1500px,96vw)',maxHeight:'92vh',overflow:'auto',background:'#ffffff',borderRadius:'20px',boxShadow:'0 24px 80px rgba(0,0,0,.25)'}}>
        <button type="button" onClick={()=>setSelected(null)} aria-label="Close visual" style={{position:'absolute',right:'14px',top:'14px',zIndex:2,width:'42px',height:'42px',borderRadius:'999px',border:'1px solid rgba(15,23,42,.15)',background:'rgba(255,255,255,.94)',color:'#0f172a',fontSize:'24px',cursor:'pointer'}}>×</button>
        <img src={selected.src} alt={selected.title} style={{display:'block',width:'100%',height:'auto'}} />
      </div>
    </div>}
  </main>
}
