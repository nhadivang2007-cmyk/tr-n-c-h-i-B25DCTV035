export default function Section({ title, children }) {
  return (
    <section className="section-container" style={{ margin: '1.5rem 0' }}>
      {title && 2 && <h2 style={{ marginBottom: '1rem' }}>{title}</h2>}
      {children}
    </section>
  );
}