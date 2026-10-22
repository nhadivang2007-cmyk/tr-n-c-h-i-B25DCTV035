export default function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <button
        style={{ fontWeight: selectedGenre === '' ? 'bold' : 'normal' }}
        onClick={() => onSelectGenre('')}
      >
        Tất cả
      </button>
      {genres.map(genre => (
        <button
          key={genre}
          style={{ fontWeight: selectedGenre === genre ? 'bold' : 'normal' }}
          onClick={() => onSelectGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}