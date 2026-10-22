import BookCard from './BookCard';

export default function BookList({ books, favorites, onToggleFav }) {
  if (books.length === 0) return <p>Không tìm thấy cuốn sách nào.</p>;

  return (
    <div className="book-grid">
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          isFav={favorites.includes(book.id)}
          onToggleFav={onToggleFav}
        />
      ))}
    </div>
  );
}