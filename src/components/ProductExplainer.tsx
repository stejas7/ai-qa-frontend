import { useMemo, useRef, useState } from 'react';

type Scene={title:string;caption:string;narration:string};

const scenes:Scene[]=[
  {title:'Start with the requirement',caption:'Choose a product and upload the business requirement.',narration:'Start with the business change you want to validate. Choose the product and upload the requirement.'},
  {title:'AI prepares UAT',caption:'AI and RAG turn product context into focused UAT scenarios.',narration:'AI UAT Engineer uses product context and retrieval augmented generation to prepare focused UAT scenarios.'},
  {title:'Automation runs',caption:'Supported journeys execute with deterministic Java policy and Playwright.',narration:'Java controls policy and state, while Playwright executes supported customer journeys and captures evidence.'},
  {title:'Evidence stays connected',caption:'Failures, screenshots and traceability remain attached to the run.',narration:'Evidence stays connected to the requirement so teams can review failures, screenshots and traceability in one place.'},
  {title:'Release confidence',caption:'The team gets a clear READY or BLOCKED recommendation.',narration:'The final result brings coverage, execution evidence and risk together into a clear ready or blocked release recommendation.'}
];

export default function ProductExplainer(){
  const [index,setIndex]=useState(0);const [playing,setPlaying]=useState(false);const timer=useRef<number|undefined>(undefined);
  const speechSupported=useMemo(()=>typeof window!=='undefined'&&'speechSynthesis'in window,[]);
  const scene=scenes[index];

  function stop(){if(timer.current)window.clearTimeout(timer.current);timer.current=undefined;if(speechSupported)window.speechSynthesis.cancel();setPlaying(false)}
  function preferredVoice(){if(!speechSupported)return undefined;const voices=window.speechSynthesis.getVoices();return voices.find(v=>/female|samantha|victoria|zira|aria|jenny|sonia|karen/i.test(v.name))||voices.find(v=>/^en/i.test(v.lang))}
  function playScene(i:number){setIndex(i);setPlaying(true);if(!speechSupported){timer.current=window.setTimeout(()=>advance(i),6500);return}const utterance=new SpeechSynthesisUtterance(scenes[i].narration);utterance.rate=.96;utterance.pitch=1.06;const voice=preferredVoice();if(voice)utterance.voice=voice;utterance.onend=()=>advance(i);utterance.onerror=()=>advance(i);window.speechSynthesis.cancel();window.speechSynthesis.speak(utterance)}
  function advance(i:number){if(i>=scenes.length-1){setPlaying(false);return}timer.current=window.setTimeout(()=>playScene(i+1),450)}
  function toggle(){playing?stop():playScene(index)}
  function select(i:number){stop();setIndex(i)}

  return <section className="panel" aria-label="AI UAT Engineer product explainer">
    <div className="section-heading"><div><div className="eyebrow">SEE AI UAT ENGINEER IN ACTION</div><h2>Two-minute product story</h2></div><span className="status completed">M30</span></div>
    <p className="lead">A guided product explanation with on-screen captions and optional female voice narration. Nothing to download or export.</p>
    <div style={{display:'grid',gridTemplateColumns:'minmax(0,2fr) minmax(240px,1fr)',gap:20,alignItems:'stretch'}}>
      <article className="inner-card" style={{minHeight:300,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div><div className="eyebrow">SCENE {index+1} OF {scenes.length}</div><h3 style={{fontSize:'clamp(1.6rem,3vw,2.5rem)',marginBottom:10}}>{scene.title}</h3><p className="lead">{scene.caption}</p></div>
        <div className="example-flow" style={{marginTop:24}}><span>Requirement</span><i>→</i><span>AI + RAG</span><i>→</i><span>Execution</span><i>→</i><span>Evidence</span><i>→</i><strong>READY / BLOCKED</strong></div>
        <div className="button-row" style={{marginTop:20}}><button className="primary-button" type="button" onClick={toggle}>{playing?'Pause narration':'Play explanation'}</button><button className="secondary-button" type="button" onClick={()=>{stop();setIndex(0)}}>Restart</button></div>
        {!speechSupported&&<small className="muted">Voice narration is not available in this browser; the visual story still works.</small>}
      </article>
      <div style={{display:'grid',gap:10}}>{scenes.map((s,i)=><button key={s.title} type="button" onClick={()=>select(i)} className="inner-card" style={{textAlign:'left',cursor:'pointer',border:i===index?'2px solid currentColor':undefined,background:'inherit'}}><small>0{i+1}</small><br/><strong>{s.title}</strong><p className="muted" style={{marginBottom:0}}>{s.caption}</p></button>)}</div>
    </div>
  </section>
}
