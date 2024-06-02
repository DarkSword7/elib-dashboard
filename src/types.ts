export interface Author {
  _id: string;
  name: string;
}

export interface Book {
  _id: number;
  title: string;
  description: string;
  genre: string;
  author: Author;
  coverImage: string;
  file: string;
  createdAt: string;
}
