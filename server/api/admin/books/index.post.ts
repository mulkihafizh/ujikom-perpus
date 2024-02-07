import multer from "multer";
import express from "express";

export default eventHandler(async (event) => {
  let data;
  let imgPath = "";
  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, "public/cover");
  //   },
  //   filename: (req, file, cbd) => {
  //     const filePath = `${Date.now()}-${file.originalname
  //       .toLocaleLowerCase()
  //       .replace(/\s+/g, "-")
  //       .replace(/\./g, "-")}.png`;
  //     cbd(null, filePath);
  //     imgPath = filePath;
  //   },
  // });

  // await callNodeListener(
  //   // @ts-ignore
  //   upload.single("cover"),
  //   event.node.req,
  //   event.node.res
  // );

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/cover");
    },
    filename: (req, file, cbd) => {
      const filePath = `${Date.now()}-${file.originalname
        .toLocaleLowerCase()
        .replace(/\s+/g, "-")
        .replace(/\./g, "-")}.png`;
      cbd(null, filePath);
      imgPath = filePath;
    },
  });

  const upload = multer({ storage: storage });

  const singleUpload = upload.single("cover");

  singleUpload(
    event.node.req as express.Request,
    event.node.res as express.Response,
    (err) => {
      if (err) {
        return new Response(JSON.stringify(err), { status: 500 });
      }
    }
  );

  const body = await readFormData(event);

  data = await createBook(body, imgPath);

  return data;
});
