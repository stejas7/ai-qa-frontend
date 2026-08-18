type Props = { title: string };

export default function PlaceholderPage({ title }: Props) {
  return (
    <main className="page">
      <div className="eyebrow">AURAVIS 2.0</div>
      <h1>{title}</h1>
      <p className="lead">This page is part of the React migration. The backend remains Spring Boot and existing Auravis APIs will be reused as each UI module moves across.</p>
      <section className="panel"><h2>React migration in progress</h2><p className="muted">Dashboard and persistent requirement history are being migrated first, followed by mission creation, execution, TEJAS and agent activity.</p></section>
    </main>
  );
}
