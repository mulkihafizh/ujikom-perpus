export default eventHandler(async (event) => {
    let data;
    data = await getAllGenres();
    return data;
  });
  