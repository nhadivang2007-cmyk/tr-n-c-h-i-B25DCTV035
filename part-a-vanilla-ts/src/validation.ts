import type { FormErrors } from './types';

export function validateBookForm(title: string, author: string, genre: string, yearStr: string): FormErrors {
  const errors: FormErrors = {};
  const currentYear = new Date().getFullYear();
  const year = Number(yearStr);

  if (!title.trim() || title.trim().length < 3) {
    errors.title = 'Tên sách phải từ 3 ký tự trở lên.';
  }
  if (!author.trim()) {
    errors.author = 'Vui lòng nhập tên tác giả.';
  }
  if (!genre.trim()) {
    errors.genre = 'Vui lòng chọn thể loại.';
  }
  if (!yearStr || isNaN(year) || year < 1900 || year > currentYear) {
    errors.year = `Năm xuất bản phải từ 1900 đến ${currentYear}.`;
  }

  return errors;
}