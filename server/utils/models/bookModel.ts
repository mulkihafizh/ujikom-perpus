import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    judul: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    sinopsis: {
      type: String,
      required: true,
      maxlength: 1000,
      trim: true,
    },
    penulis: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    penerbit: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    tahunTerbit: {
      type: Number,
      required: true,
    },
    genre: [String],
    cover: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
