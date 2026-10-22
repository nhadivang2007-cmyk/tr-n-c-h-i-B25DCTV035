import { useState } from 'react';
import { initialBooks } from './data/books';
import Header from './components/Header';
import Section from './components/Section';
import GenreFilter from './components/GenreFilter';
import BookList from './components/BookList';
import Footer from './components/Footer';

export default function App() {
  const [books] = useState(initialBooks);
  const [favorites, setFavorites] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  // Lấy danh sách thể loại duy nhất dùng Set
  const genres = Array.from(new Set(books.map(b => b.genre)));

  // Hàm xử lý yêu thích
  const handleToggleFav = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Lọc sách theo thể loại
  const filteredBooks = selectedGenre
    ? books.filter(b => b.genre === selectedGenre)
    : books;

  return (
    <div className="app-container">
      <Header favCount={favorites.length} />

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1rem' }}>
        <Section title="Bộ lọc thể loại">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
        </Section>

        <Section title={`Danh sách sách (${filteredBooks.length} cuốn)`}>
          <BookList
            books={filteredBooks}
            favorites={favorites}
            onToggleFav={handleToggleFav}
          />
        </Section>
      </main>

      <Footer />
    </div>
  );
}