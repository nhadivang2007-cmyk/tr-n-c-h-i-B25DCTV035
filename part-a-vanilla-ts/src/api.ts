import type { Book } from './types';

const API_BASE = 'https://6ad97500f89c5702ed9a97c6.mockapi.io/books'; // Thay URL MockAPI thực tế

export async function fetchBooks(): Promise<Book[]> {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error('Không thể tải danh sách sách từ server.');
  return await response.json();
}

export async function createBook(bookData: Omit<Book, 'id'>): Promise<Book> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData)
  });
  if (!response.ok) throw new Error('Thêm sách thất bại.');
  return await response.json();
}

export async function deleteBookApi(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Xóa sách thất bại.');
}