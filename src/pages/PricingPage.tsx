import { Link } from 'react-router-dom';

const plans=[
 {name:'Daily Agent',price:'$50',period:'/ agent-day',badge:'PAY AS YOU GO',description:'Best for pilots, short UAT bursts, and teams that want to hire only the specialists needed for a mission.',features:['$50 per AI specialist per agent-day','Hire 1 to 100 agents in a day','No long-term commitment','Mission-scoped specialist selection'],cta:'Start with one agent'},
 {name:'Monthly Workforce',price:'$10,000',period:'/ month',badge:'TEAM PLAN',description:'A predictable pooled plan for delivery teams running AI-assisted UAT throughout the month.',features:['Includes 250 agent-days per month','Burst capacity up to 100 agents in a day','Effective included rate: $40 per agent-day','Additional usage: $45 per agent-day','Governed multi-agent orchestration'],cta:'Choose monthly'},
 {name:'Annual Workforce',price:'$100,000',period:'/ year',badge:'BEST VALUE',description:'For organizations standardizing governed AI UAT and release intelligence across products and release trains.',features:['Includes 3,000 agent-days per year','Burst capacity up to 100 agents in a day','Effective included rate: $33.33 per agent-day','Additional usage: $40 per agent-day','Save $20,000 vs 12 monthly subscriptions'],cta:'Choose annual'}
] as const;

const market=[
 {year:'2024',value:5.26},
 {year:'2025',value:7.84},
 {year:'2026',value:11.48},
 {year:'2027',value:16.80},
 {year:'2028',value:24.59},
 {year:'2029',value:35.97},
 {year:'2030',value:52.62}
] as const;

const hiringSignals=[
 {value:'82%',label:'of leaders expect digital labor to expand workforce capacity in the next 12–18 months'},
 {value:'78%',label:'of leaders are considering hiring for new AI-specific roles'},
 {value:'46%',label:'of leaders say their organization is already using agents to automate workstreams or business processes'},
 {value:'29%',label:'of SMB leaders plan to hire AI Agent Specialists in the next 12–18 months'}
] as const;

function MarketGrowthChart(){
 const width=760,height=300,padX=52,padY=34,max=55;
 const x=(i:number)=>padX+i*((width-padX*2)/(market.length-1));
 const y=(v:number)=>height-padY-(v/max)*(height-padY*2);
 const points=market.map((d,i)=>`${x(i)},${y(d.value)}`).join(' ');
 return <div style={{overflowX:'auto'}}><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Global AI agents market growth from 5.26 billion dollars in 2024 to 52.62 billion dollars in 2030" style={{width:'100%',minWidth:620,height:'auto'}}>
  {[0,10,20,30,40,50].map(v=><g key={v}><line x1={padX} x2={width-padX} y1={y(v)} y2={y(v)} stroke="currentColor" opacity="0.08"/><text x={8} y={y(v)+4} fontSize="12" fill="currentColor" opacity="0.6">${v}B</text></g>)}
  <polyline points={points} fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
  {market.map((d,i)=><g key={d.year}><circle cx={x(i)} cy={y(d.value)} r="6" fill="currentColor"/><text x={x(i)} y={height-8} textAnchor="middle" fontSize="12" fill="currentColor" opacity="0.72">{d.year}</text><text x={x(i)} y={Math.max(16,y(d.value)-12)} textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">${d.value.toFixed(2)}B</text></g>)}
 </svg></div>;
}

export default function PricingPage(){
 return <main className="page"><section style={{textAlign:'center',maxWidth:920,margin:'0 auto 34px'}}><div className="eyebrow">AI UAT ENGINEER • PRICING</div><h1>Hire an AI UAT workforce when you need it</h1><p className="lead">Pricing is based on agent-days rather than unlimited compute. Start with one specialist for a day, or use pooled monthly and annual plans with burst access to the full 100-agent catalog.</p></section>
 <section className="roadmap-grid" style={{alignItems:'stretch'}}>{plans.map(plan=><article className="panel" key={plan.name} style={{display:'flex',flexDirection:'column',gap:14}}><div className="section-heading"><div><div className="eyebrow">{plan.badge}</div><h2 style={{marginBottom:4}}>{plan.name}</h2></div></div><div style={{display:'flex',alignItems:'baseline',gap:8,flexWrap:'wrap'}}><strong style={{fontSize:'clamp(2rem,5vw,3.4rem)',lineHeight:1}}>{plan.price}</strong><span className="muted">{plan.period}</span></div><p className="muted">{plan.description}</p><div style={{display:'grid',gap:10,margin:'4px 0 12px'}}>{plan.features.map(feature=><div key={feature} style={{display:'flex',gap:10,alignItems:'flex-start'}}><span aria-hidden="true">✓</span><span>{feature}</span></div>)}</div><div style={{marginTop:'auto'}}><Link className="primary-btn" style={{display:'inline-flex',width:'100%',justifyContent:'center',boxSizing:'border-box'}} to="/login">{plan.cta}</Link></div></article>)}</section>
 <section className="panel" style={{marginTop:28}}><div className="section-heading"><div><div className="eyebrow">MARKET MOMENTUM</div><h2>Companies are starting to hire digital labor</h2></div><span className="status processing">46.3% CAGR</span></div><p className="lead">The global AI agents market is projected to grow from $5.26B in 2024 to $52.62B by 2030. The curve below uses the published 2024, 2025 and 2030 market values with intermediate years interpolated at the reported growth rate for a simple planning view.</p><MarketGrowthChart/><p className="muted" style={{fontSize:13}}>Market source: MarketsandMarkets, AI Agents Market 2025–2030. Intermediate 2026–2029 points are modeled from the published CAGR and are shown for visualization, not as independently reported annual market estimates.</p><div className="roadmap-grid" style={{marginTop:20}}>{hiringSignals.map(signal=><article className="inner-card" key={signal.value+signal.label}><strong style={{fontSize:'2rem'}}>{signal.value}</strong><p>{signal.label}</p></article>)}</div><p className="muted" style={{fontSize:13,marginTop:14}}>Workforce adoption source: Microsoft 2025 Work Trend Index; SMB hiring statistic from Microsoft SMB Work Trend Index.</p></section>
 <section className="panel" style={{marginTop:28}}><div className="section-heading"><div><div className="eyebrow">HOW AGENT-DAYS WORK</div><h2>Flexible capacity without unlimited-compute risk</h2></div><span className="status processing">UP TO 100 / DAY</span></div><p className="lead">One agent-day means one AI specialist assigned to your UAT workforce for that day. Daily list price is $50, so a full 100-agent burst is $5,000/day. Monthly and annual plans discount committed usage while preserving the ability to burst up to 100 specialists when a release needs it.</p><div className="two-col"><article className="inner-card"><strong>Monthly economics</strong><p>250 included agent-days would cost $12,500 at daily list price. The $10,000 package gives a 20% committed-use discount.</p></article><article className="inner-card"><strong>Annual economics</strong><p>3,000 included agent-days would cost $150,000 at daily list price. The $100,000 annual package gives a 33% committed-use discount.</p></article></div><div className="button-row"><Link className="secondary-btn" to="/how-it-works">See how it works</Link><Link className="primary-btn" to="/login">Sign in</Link></div></section></main>;
}
