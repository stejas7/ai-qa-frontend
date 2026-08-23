import { Link } from 'react-router-dom';

const plans=[
 {name:'Daily Agent',price:'$50',period:'per agent-day',badge:'FLEXIBLE',accent:'#2563eb',surface:'#eff6ff',description:'For pilots, one-off validation and release-day bursts.',capacity:'1–100 agents / day',effective:'$50 / agent-day',saving:'No commitment',features:['Mission-scoped specialist selection','Browser/API execution','Evidence and diagnostics','Governed release recommendation'],cta:'Start with daily'},
 {name:'Monthly Workforce',price:'$10,000',period:'per month',badge:'MOST POPULAR',accent:'#7c3aed',surface:'#f5f3ff',description:'For delivery teams running continuous UAT across active releases.',capacity:'250 agent-days included',effective:'$40 / agent-day',saving:'Save 20% vs daily',features:['Burst to 100 agents in a day','Pooled monthly capacity','Governed multi-agent orchestration','Additional usage at $45 / agent-day'],cta:'Choose monthly',featured:true},
 {name:'Annual Workforce',price:'$100,000',period:'per year',badge:'BEST VALUE',accent:'#047857',surface:'#ecfdf5',description:'For organizations standardizing AI UAT across products and release trains.',capacity:'3,000 agent-days included',effective:'$33.33 / agent-day',saving:'Save $50K vs daily list',features:['Burst to 100 agents in a day','Enterprise pooled capacity','Portfolio and workforce intelligence','Additional usage at $40 / agent-day'],cta:'Choose annual'}
] as const;

const market=[{year:'2024',value:5.26},{year:'2025',value:7.84},{year:'2026',value:11.48},{year:'2027',value:16.80},{year:'2028',value:24.59},{year:'2029',value:35.97},{year:'2030',value:52.62}] as const;
const hiringSignals=[
 {value:'46%',label:'already using agents to automate workstreams or business processes'},
 {value:'82%',label:'expect digital labor to expand workforce capacity'},
 {value:'78%',label:'are considering hiring for new AI-specific roles'}
] as const;

function MarketGrowthChart(){
 const width=760,height=280,padX=54,padY=34,max=55;
 const x=(i:number)=>padX+i*((width-padX*2)/(market.length-1)); const y=(v:number)=>height-padY-(v/max)*(height-padY*2); const points=market.map((d,i)=>`${x(i)},${y(d.value)}`).join(' ');
 return <div style={{overflowX:'auto'}}><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Global AI agents market growth from 5.26 billion dollars in 2024 to 52.62 billion dollars in 2030" style={{width:'100%',minWidth:600,height:'auto'}}>
 {[0,10,20,30,40,50].map(v=><g key={v}><line x1={padX} x2={width-padX} y1={y(v)} y2={y(v)} stroke="#94a3b8" opacity=".18"/><text x={8} y={y(v)+4} fontSize="12" fill="#64748b">${v}B</text></g>)}
 <polyline points={points} fill="none" stroke="#2563eb" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
 {market.map((d,i)=><g key={d.year}><circle cx={x(i)} cy={y(d.value)} r="5" fill="#2563eb"/><text x={x(i)} y={height-8} textAnchor="middle" fontSize="12" fill="#64748b">{d.year}</text>{(i===0||i===1||i===market.length-1)&&<text x={x(i)} y={Math.max(16,y(d.value)-12)} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">${d.value.toFixed(2)}B</text>}</g>)}
 </svg></div>;
}

const Check=()=> <span aria-hidden="true" style={{width:20,height:20,borderRadius:999,display:'inline-flex',alignItems:'center',justifyContent:'center',background:'#ecfdf5',color:'#047857',fontSize:12,fontWeight:900,flex:'0 0 auto'}}>✓</span>;

export default function PricingPage(){
 return <main className="page">
  <section style={{maxWidth:1050,margin:'10px auto 44px',textAlign:'center'}}>
   <div className="eyebrow">AI UAT ENGINEER • WORKFORCE PRICING</div>
   <h1 style={{fontSize:'clamp(2.45rem,5vw,4.4rem)',lineHeight:1.04,letterSpacing:'-.035em',margin:'12px 0 18px'}}>Add UAT capacity when the release needs it.</h1>
   <p className="lead" style={{maxWidth:800,margin:'0 auto'}}>Use specialist AI agents as governed delivery capacity. Start with one agent-day, commit monthly for continuous UAT, or standardize across your portfolio annually.</p>
   <div style={{display:'flex',justifyContent:'center',gap:10,flexWrap:'wrap',marginTop:24}}>{['1–100 agents per day','Evidence-backed execution','Human-governed release'].map(item=><span key={item} style={{padding:'9px 14px',border:'1px solid #dbe4ef',borderRadius:999,background:'#fff',fontSize:14,fontWeight:700,color:'#334155'}}>{item}</span>)}</div>
  </section>

  <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))',gap:18,maxWidth:1260,margin:'0 auto'}}>
   {plans.map(plan=><article key={plan.name} style={{position:'relative',display:'flex',flexDirection:'column',minHeight:580,padding:28,borderRadius:24,background:'#fff',border:plan.featured?'2px solid #7c3aed':'1px solid #dbe4ef',boxShadow:plan.featured?'0 20px 55px rgba(124,58,237,.15)':'0 12px 32px rgba(15,23,42,.06)',transform:plan.featured?'translateY(-8px)':'none'}}>
    {plan.featured&&<div style={{position:'absolute',top:-15,left:'50%',transform:'translateX(-50%)',padding:'7px 14px',borderRadius:999,background:'#7c3aed',color:'#fff',fontSize:12,fontWeight:900,letterSpacing:'.06em',whiteSpace:'nowrap'}}>MOST POPULAR</div>}
    <div style={{display:'flex',justifyContent:'space-between',gap:14,alignItems:'flex-start'}}><div><div className="eyebrow" style={{color:plan.accent}}>{plan.featured?'TEAM PLAN':plan.badge}</div><h2 style={{fontSize:27,margin:'7px 0 4px'}}>{plan.name}</h2></div>{!plan.featured&&<span style={{padding:'6px 10px',borderRadius:999,background:plan.surface,color:plan.accent,fontSize:11,fontWeight:900}}>{plan.badge}</span>}</div>
    <p className="muted" style={{minHeight:54,lineHeight:1.55}}>{plan.description}</p>
    <div style={{margin:'16px 0 20px'}}><div style={{display:'flex',alignItems:'baseline',gap:8,flexWrap:'wrap'}}><strong style={{fontSize:'clamp(2.7rem,5vw,3.8rem)',letterSpacing:'-.04em',lineHeight:1}}>{plan.price}</strong><span className="muted">{plan.period}</span></div></div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:22}}><div style={{padding:14,borderRadius:14,background:'#f8fafc'}}><small className="muted">Capacity</small><strong style={{display:'block',marginTop:4,fontSize:14}}>{plan.capacity}</strong></div><div style={{padding:14,borderRadius:14,background:plan.surface}}><small style={{color:plan.accent}}>Effective rate</small><strong style={{display:'block',marginTop:4,fontSize:14,color:plan.accent}}>{plan.effective}</strong></div></div>
    <div style={{padding:'11px 13px',borderRadius:12,background:'#f8fafc',fontWeight:800,fontSize:14,marginBottom:20}}>{plan.saving}</div>
    <div style={{height:1,background:'#e5e7eb',marginBottom:20}}/>
    <div style={{display:'grid',gap:13}}>{plan.features.map(feature=><div key={feature} style={{display:'flex',gap:10,alignItems:'flex-start',lineHeight:1.45}}><Check/><span>{feature}</span></div>)}</div>
    <div style={{marginTop:'auto',paddingTop:26}}><Link to="/login" className={plan.featured?'primary-btn':'secondary-btn'} style={{display:'flex',width:'100%',justifyContent:'center',boxSizing:'border-box',minHeight:48,alignItems:'center'}}>{plan.cta}</Link></div>
   </article>)}
  </section>

  <section style={{maxWidth:1260,margin:'48px auto 0',padding:'30px',border:'1px solid #dbe4ef',borderRadius:24,background:'#f8fafc'}}>
   <div className="section-heading"><div><div className="eyebrow">WHAT YOU ARE BUYING</div><h2>One agent-day is measurable delivery capacity</h2></div></div>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:14,marginTop:18}}>{[
    ['01','Specialist assignment','The orchestrator selects the bounded skills required for the mission.'],
    ['02','UAT execution','Requirements are analyzed, tests are designed and browser/API work is executed.'],
    ['03','Evidence & diagnostics','Results carry traceable evidence, duration and failure diagnostics.'],
    ['04','Governed decision','AI recommends READY/BLOCKED while policy and authorized humans retain authority.']
   ].map(([n,title,copy])=><article key={n} style={{padding:20,borderRadius:17,background:'#fff',border:'1px solid #e2e8f0'}}><span style={{fontSize:12,fontWeight:900,color:'#2563eb'}}>{n}</span><strong style={{display:'block',fontSize:18,margin:'8px 0'}}>{title}</strong><p className="muted" style={{margin:0,lineHeight:1.55}}>{copy}</p></article>)}</div>
  </section>

  <section style={{maxWidth:1260,margin:'28px auto 0',display:'grid',gridTemplateColumns:'minmax(0,1.55fr) minmax(300px,.75fr)',gap:20}}>
   <article className="panel" style={{margin:0}}><div className="section-heading"><div><div className="eyebrow">MARKET MOMENTUM</div><h2>AI agents are becoming a workforce category</h2></div><span className="status processing">46.3% CAGR</span></div><p className="muted">Published market estimates project the global AI agents market from $5.26B in 2024 to $52.62B by 2030.</p><MarketGrowthChart/><p className="muted" style={{fontSize:12,marginBottom:0}}>Source: MarketsandMarkets. Intermediate 2026–2029 points are modeled from the published CAGR for visualization.</p></article>
   <article className="panel" style={{margin:0}}><div className="eyebrow">ENTERPRISE SIGNALS</div><h2 style={{marginTop:7}}>Digital labor is moving into operating plans</h2><div style={{display:'grid',gap:12,marginTop:18}}>{hiringSignals.map(signal=><div key={signal.value} style={{padding:16,borderRadius:15,background:'#f8fafc'}}><strong style={{fontSize:29,letterSpacing:'-.03em'}}>{signal.value}</strong><p className="muted" style={{margin:'5px 0 0',fontSize:14,lineHeight:1.45}}>{signal.label}</p></div>)}</div><p className="muted" style={{fontSize:12}}>Source: Microsoft 2025 Work Trend Index.</p></article>
  </section>

  <section style={{maxWidth:1260,margin:'28px auto 10px',padding:'34px',borderRadius:24,background:'#0f172a',color:'#fff',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24,flexWrap:'wrap'}}><div style={{maxWidth:720}}><div style={{fontSize:12,fontWeight:900,letterSpacing:'.1em',color:'#93c5fd'}}>START SMALL • SCALE WHEN NEEDED</div><h2 style={{fontSize:30,margin:'8px 0 8px',color:'#fff'}}>Put your next requirement through the AI UAT workflow.</h2><p style={{margin:0,color:'#cbd5e1',lineHeight:1.55}}>Create a workspace, register the target product and let the platform build a bounded specialist workforce for the mission.</p></div><div className="button-row"><Link to="/how-it-works" className="secondary-btn" style={{background:'#fff'}}>How it works</Link><Link to="/login" className="primary-btn">Get started</Link></div></section>
 </main>;
}
