export default defineEventHandler((event) => {
  if (getRequestURL(event).pathname.includes("/admin")) {
    if (
      event.headers.get("cookie")?.includes("role=Admin") ||
      event.headers.get("cookie")?.includes("role=Staff")
    ) {
      console.log("Admin is logged in");
    } else {
      return new Response("Anda tidak memiliki akses ke endpoint ini", {
        status: 401,
      });
    }
  }
});
