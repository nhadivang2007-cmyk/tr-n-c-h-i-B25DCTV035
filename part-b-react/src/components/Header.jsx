export default function Header({ favCount }) {
  return (
    <header className="header">
      <h1>📚 Thư Viện Lớp Học (React)</h1>
      <div>
        Sách yêu thích: <strong>{favCount}</strong>
      </div>
    </header>
  );
}