export default eventHandler(async (event) => {
  let data;
  data = await getUser();
  return data;
});
