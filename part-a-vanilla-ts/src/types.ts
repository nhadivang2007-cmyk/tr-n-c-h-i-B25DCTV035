export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
}

export interface FormErrors {
  title?: string;
  author?: string;
  genre?: string;
  year?: string;
}