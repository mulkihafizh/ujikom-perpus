export default eventHandler(async (event) => {
  let data;
  const body = await readBody(event);
  data = await createUser(body);

  return data;
});
