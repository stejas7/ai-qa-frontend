export default function ProductBlueprintPage(){
  return <main className="page">
    <div className="eyebrow">PRODUCT • TECHNOLOGY • ARCHITECTURE • ROADMAP</div>
    <h1>AI UAT Engineer — Product Blueprint</h1>
    <p className="lead">One learning-focused visual showing what the product does, which technologies are used, how the system is connected end to end, and how the roadmap evolved.</p>

    <section className="panel" style={{padding:'12px',overflow:'auto'}}>
      <img
        src="/product-blueprint.svg"
        alt="AI UAT Engineer product blueprint showing product flow, technology stack, architecture and roadmap"
        style={{display:'block',width:'100%',minWidth:'1100px',height:'auto',borderRadius:'16px'}}
      />
    </section>
  </main>
}
