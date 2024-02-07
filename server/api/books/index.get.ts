export default eventHandler(async (event) => {
  let data;
  data = await getAllBooks();
  return data;
});
