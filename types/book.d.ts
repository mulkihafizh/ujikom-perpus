interface BookTypes {
  judul: string;
  sinopsis: string;
  penulis: string;
  penerbit: string;
  tahunTerbit: number;
  genre: Array<{
    name: string;
  }>;
  cover: any;
}

export type { BookTypes };
