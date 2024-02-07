export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await createStaff(body);
  return res;
});
