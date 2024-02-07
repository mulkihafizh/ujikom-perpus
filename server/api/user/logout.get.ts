export default eventHandler(async (event) => {
  let data;
  data = await logout();
  return data;
});
