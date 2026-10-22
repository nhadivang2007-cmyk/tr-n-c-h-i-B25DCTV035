import type { Book } from './types';
import { fetchBooks, createBook, deleteBookApi } from './api';
import { getFavorites, toggleFavoriteStorage, getSavedTheme, saveTheme } from './storage';
import { validateBookForm } from './validation';

let allBooks: Book[] = [];
let favIds: string[] = getFavorites();

// DOM Elements
const bookGrid = document.getElementById('book-grid') as HTMLDivElement;
const statusBar = document.getElementById('status-bar') as HTMLParagraphElement;
const favCountEl = document.getElementById('fav-count') as HTMLElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const genreSelect = document.getElementById('genre-select') as HTMLSelectElement;
const themeToggleBtn = document.getElementById('theme-toggle') as HTMLButtonElement;
const addBookForm = document.getElementById('add-book-form') as HTMLFormElement;

// Inputs
const inputTitle = document.getElementById('input-title') as HTMLInputElement;
const inputAuthor = document.getElementById('input-author') as HTMLInputElement;
const inputGenre = document.getElementById('input-genre') as HTMLInputElement;
const inputYear = document.getElementById('input-year') as HTMLInputElement;

// Setup Theme
function initTheme() {
  const theme = getSavedTheme();
  if (theme === 'dark') document.body.classList.add('dark-mode');
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  saveTheme(isDark ? 'dark' : 'light');
});

// Update Header Fav Count
function updateFavHeader() {
  favCountEl.textContent = favIds.length.toString();
}

// Extract genres using Set
function populateGenres(books: Book[]) {
  const genresSet = new Set<string>();
  books.forEach(b => genresSet.add(b.genre));

  genreSelect.innerHTML = '<option value="">Tất cả thể loại</option>';
  genresSet.forEach(genre => {
    const opt = document.createElement('option');
    opt.value = genre;
    opt.textContent = genre;
    genreSelect.appendChild(opt);
  });
}

// Render Book List with DOM API
function renderBooks() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedGenre = genreSelect.value;

  const filtered = allBooks.filter(book => {
    const matchSearch = book.title.toLowerCase().includes(query);
    const matchGenre = selectedGenre === '' || book.genre === selectedGenre;
    return matchSearch && matchGenre;
  });

  statusBar.textContent = `Đang hiển thị ${filtered.length} / ${allBooks.length} cuốn`;
  bookGrid.innerHTML = '';

  filtered.forEach(book => {
    const card = document.createElement('article');
    card.className = 'book-card';

    const titleEl = document.createElement('h3');
    titleEl.textContent = book.title;

    const authorEl = document.createElement('p');
    authorEl.textContent = `Tác giả: ${book.author}`;

    const genreEl = document.createElement('p');
    genreEl.textContent = `Thể loại: ${book.genre}`;

    const yearEl = document.createElement('p');
    yearEl.textContent = `Năm XB: ${book.year}`;

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const isFav = favIds.includes(book.id);
    const favBtn = document.createElement('button');
    favBtn.className = `btn-fav ${isFav ? 'active' : ''}`;
    favBtn.dataset.id = book.id;
    favBtn.dataset.action = 'favorite';
    favBtn.textContent = isFav ? '★ Đã thích' : '☆ Yêu thích';

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-delete';
    delBtn.dataset.id = book.id;
    delBtn.dataset.action = 'delete';
    delBtn.textContent = 'Xóa';

    actions.append(favBtn, delBtn);
    card.append(titleEl, authorEl, genreEl, yearEl, actions);
    bookGrid.appendChild(card);
  });
}

// Event Delegation cho Yêu thích & Xóa
bookGrid.addEventListener('click', async (e) => {
  const target = e.target as HTMLElement;
  const action = target.dataset.action;
  const id = target.dataset.id;

  if (!id || !action) return;

  if (action === 'favorite') {
    favIds = toggleFavoriteStorage(id);
    updateFavHeader();
    renderBooks();
  } else if (action === 'delete') {
    if (confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) {
      try {
        await deleteBookApi(id); // Gọi DELETE lên MockAPI
        allBooks = allBooks.filter(b => b.id !== id);
        favIds = favIds.filter(fId => fId !== id);
        localStorage.setItem('library_fav_books', JSON.stringify(favIds));
        updateFavHeader();
        populateGenres(allBooks);
        renderBooks();
      } catch (err: any) {
        alert(err.message || 'Lỗi khi xóa');
      }
    }
  }
});

// Search & Filter Listeners
searchInput.addEventListener('input', renderBooks);
genreSelect.addEventListener('change', renderBooks);

// Live Input Validation
function handleLiveValidation() {
  const errors = validateBookForm(inputTitle.value, inputAuthor.value, inputGenre.value, inputYear.value);
  (document.getElementById('error-title') as HTMLElement).textContent = errors.title || '';
  (document.getElementById('error-author') as HTMLElement).textContent = errors.author || '';
  (document.getElementById('error-genre') as HTMLElement).textContent = errors.genre || '';
  (document.getElementById('error-year') as HTMLElement).textContent = errors.year || '';
  return errors;
}

[inputTitle, inputAuthor, inputGenre, inputYear].forEach(input => {
  input.addEventListener('input', handleLiveValidation);
});

// Form Submit Handler
addBookForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const errors = handleLiveValidation();

  if (Object.keys(errors).length > 0) return;

  const newBookData = {
    title: inputTitle.value.trim(),
    author: inputAuthor.value.trim(),
    genre: inputGenre.value.trim(),
    year: Number(inputYear.value)
  };

  try {
    const createdBook = await createBook(newBookData);
    allBooks.unshift(createdBook); // Thêm vào đầu danh sách
    populateGenres(allBooks);
    renderBooks();
    addBookForm.reset();
  } catch (err: any) {
    alert(err.message || 'Không thể thêm sách');
  }
});

// Initial Load
async function init() {
  initTheme();
  updateFavHeader();
  statusBar.textContent = 'Đang tải danh sách sách...';

  try {
    allBooks = await fetchBooks();
    populateGenres(allBooks);
    renderBooks();
  } catch (err: any) {
    statusBar.textContent = `Lỗi: ${err.message}`;
  }
}

init();