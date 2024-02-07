import { defineStore } from "pinia";
import type { BookTypes } from "~/types/book";

export const useBooksStore = defineStore({
  id: "books",
  state: () => ({
    books: [] as BookTypes[],
  }),
  actions: {
    setBooks(books: BookTypes[]) {
      this.books = books;
    },
  },
});
