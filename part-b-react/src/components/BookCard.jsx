export default function BookCard({ book, isFav, onToggleFav }) {
  return (
    <article className="book-card">
      <h3>{book.title}</h3>
      <p>Tác giả: {book.author}</p>
      <p>Thể loại: {book.genre}</p>
      <p>Năm XB: {book.year}</p>
      <div className="card-actions">
        <button
          className={`btn-fav ${isFav ? 'active' : ''}`}
          onClick={() => onToggleFav(book.id)}
        >
          {isFav ? '★ Đã thích' : '☆ Yêu thích'}
        </button>
      </div>
    </article>
  );
}