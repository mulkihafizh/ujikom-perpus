export default eventHandler(async (event) => {
  let data;

  const body = await readBody(event);
  data = await login(body);

  return data;
});
