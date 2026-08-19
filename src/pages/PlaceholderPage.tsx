type Props = { title: string };

export default function PlaceholderPage({ title }: Props) {
  return (
    <main className="page">
      <div className="eyebrow">AI UAT ENGINEER</div>
      <h1>{title}</h1>
      <p className="lead">This page is part of the React product experience. The backend remains Spring Boot and the existing AI UAT Engineer APIs are reused across UI modules.</p>
      <section className="panel"><h2>Product module</h2><p className="muted">The UI uses shared backend contracts for requirement processing, execution, evidence, AI runtime and agent activity.</p></section>
    </main>
  );
}
