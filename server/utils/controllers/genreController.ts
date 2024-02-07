import { Genre } from "../models/genreModel";

export const createGenre = async (name: string) => {
  try {
    const data = await Genre.create({ name });
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify(e), { status: 500 });
  }
};

export const getAllGenres = async () => {
  try {
    const data = await Genre.find({});
    if (!data)
      return new Response(JSON.stringify({ error: "No genres found" }), {
        status: 404,
      });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify(e), { status: 500 });
  }
};
