import { useState } from 'react';

const visualVersion='20260823-m100-video-v1';
const visuals = [
  { title: 'Product overview', subtitle: 'Current AI UAT Engineer product map through M100: tenant setup, AI workforce, execution, evidence, adaptive intelligence, portfolio orchestration, governance and enterprise autonomy readiness', src: `/blueprint-overview-light.svg?v=${visualVersion}` },
  { title: 'What the product does', subtitle: 'Register → Requirement → AI/RAG → bounded workforce → adaptive test design → automation → evidence → governance → READY/BLOCKED', src: `/blueprint-product-flow.svg?v=${visualVersion}` },
  { title: 'System architecture', subtitle: 'React + Nginx + Spring Boot + Spring AI + PostgreSQL + Playwright + durable evidence + AWS deployment', src: `/blueprint-architecture.svg?v=${visualVersion}` },
  { title: 'Technology stack', subtitle: 'Java 21, Spring Boot 3.5, Spring AI, pgvector/PostgreSQL, Playwright, React/TypeScript, Docker, GHCR, GitHub Actions, AWS and Nginx', src: `/blueprint-technology.svg?v=${visualVersion}` },
  { title: 'Database & traceability', subtitle: 'Tenant-safe data path from companies/users/products through missions, tests, executions, evidence, audit and release decisions', src: `/blueprint-database.svg?v=${visualVersion}` },
  { title: 'M1–M100 roadmap', subtitle: 'Foundation → enterprise/security → 100-agent workforce → governance → adaptive intelligence → dependency/business journeys → portfolio/workforce → enterprise autonomy', src: `/blueprint-roadmap.svg?v=${visualVersion}` }
] as const;

const videoShowcase = [
  {
    number: '01',
    title: 'Product Overview',
    duration: '2:30–3:00',
    image: `/blueprint-overview-light.svg?v=${visualVersion}`,
    summary: 'What AI UAT Engineer is, the problem it solves, and how a requirement becomes evidence-backed release confidence.',
    chapters: ['Problem & product vision', 'Connect the product', 'Requirement → AI workforce', 'Execution & evidence', 'Release intelligence', 'M1–M100 journey']
  },
  {
    number: '02',
    title: 'Step-by-Step Functionality',
    duration: '5:00–7:00',
    image: `/blueprint-product-flow.svg?v=${visualVersion}`,
    summary: 'A practical walkthrough from sign-in and product setup through UAT execution, evidence, results and governed release review.',
    chapters: ['Sign in & workspace', 'Register product', 'Credentials', 'Start UAT', 'Agent planning', 'Execution & statuses', 'Results & evidence', 'Release review']
  },
  {
    number: '03',
    title: 'Market View + How It Works',
    duration: '3:30–4:30',
    image: `/blueprint-architecture.svg?v=${visualVersion}`,
    summary: 'Why AI agents are becoming a digital workforce category, where AI UAT Engineer fits, and how the architecture and pricing model work.',
    chapters: ['AI-agent market shift', 'Why UAT fits', 'Agent-day pricing', 'Architecture', 'Bounded 100-agent catalog', 'Governance & roadmap']
  }
] as const;

export default function ProductBlueprintPage(){
  const [selected,setSelected]=useState<(typeof visuals)[number] | null>(null);
  return <main className="page">
    <div className="eyebrow">PRODUCT • ARCHITECTURE • TECHNOLOGY • DATABASE • ROADMAP M1–M100</div>
    <h1>How AI UAT Engineer Works</h1>
    <p className="lead">A current visual guide to the complete AI UAT Engineer product through M100. Select any visual to open it larger. Use the self-UAT requirement below to test AI UAT Engineer against itself.</p>

    <section className="panel" style={{marginTop:24}}>
      <div className="section-heading"><div><div className="eyebrow">VIDEO SHOWCASE</div><h2>See the product story in three parts</h2></div><span className="status processing">3 VIDEOS</span></div>
      <p className="lead">A concise product story for buyers and engineering leaders, a detailed functionality walkthrough for users, and a market + architecture view for understanding where the platform fits.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:18,marginTop:20}}>
        {videoShowcase.map(video=><article key={video.number} className="inner-card" style={{display:'flex',flexDirection:'column',overflow:'hidden',padding:0}}>
          <div style={{position:'relative',background:'#071526',minHeight:180,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
            <img src={video.image} alt={`${video.title} preview`} style={{display:'block',width:'100%',height:190,objectFit:'cover',opacity:.82}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(4,15,31,.08),rgba(4,15,31,.72))'}}/>
            <div style={{position:'absolute',left:18,right:18,bottom:16,color:'#fff'}}><div style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'center'}}><span style={{fontWeight:800,fontSize:14,letterSpacing:1.4}}>VIDEO {video.number}</span><span style={{fontSize:13,padding:'5px 9px',borderRadius:999,background:'rgba(255,255,255,.14)',border:'1px solid rgba(255,255,255,.22)'}}>{video.duration}</span></div><strong style={{display:'block',fontSize:23,marginTop:8}}>{video.title}</strong></div>
          </div>
          <div style={{padding:18,display:'flex',flexDirection:'column',gap:14,flex:1}}><p className="muted" style={{margin:0,lineHeight:1.55}}>{video.summary}</p><div style={{display:'grid',gap:8}}>{video.chapters.map((chapter,index)=><div key={chapter} style={{display:'flex',gap:10,alignItems:'center'}}><span style={{width:24,height:24,borderRadius:999,display:'inline-flex',alignItems:'center',justifyContent:'center',background:'#eef6ff',color:'#2563eb',fontSize:12,fontWeight:800,flex:'0 0 auto'}}>{index+1}</span><span>{chapter}</span></div>)}</div><div style={{marginTop:'auto',paddingTop:6}}><span className="status completed">PRODUCTION READY</span></div></div>
        </article>)}
      </div>
    </section>

    <section className="panel" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:18,flexWrap:'wrap'}}>
      <div><div className="eyebrow">SELF-UAT BASELINE</div><h2 style={{margin:'5px 0'}}>Test AI UAT Engineer with its own requirement</h2><p className="muted" style={{margin:0,maxWidth:760}}>The requirement baseline covers authentication, tenant isolation, product registration, 100-agent workforce planning, RAG, Playwright execution, durable evidence, release governance, adaptive intelligence, portfolio/workforce orchestration, Platform Admin oversight, CI/CD and enterprise autonomy controls.</p></div>
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
  </main>;
}
