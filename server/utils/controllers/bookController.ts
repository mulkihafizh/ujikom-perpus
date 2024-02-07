import { Book } from "../models/bookModel";

export const createBook = async (body: any, imgPath: string) => {
  try {
    const data = await Book.create({
      judul: body.get("judul"),
      penulis: body.get("penulis"),
      penerbit: body.get("penerbit"),
      sinopsis: body.get("sinopsis"),
      tahunTerbit: body.get("tahun_terbit"),
      genre: body
        .get("genre")
        .split(",")
        .map((genre: string) => genre.trim()),
      cover: imgPath,
    });
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify(e), { status: 500 });
  }
};

export const getAllBooks = async () => {
  try {
    const data = await Book.find({}).sort({ createdAt: -1 });
    if (!data)
      return new Response(JSON.stringify({ error: "No books found" }), {
        status: 404,
      });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify(e), { status: 500 });
  }
};
