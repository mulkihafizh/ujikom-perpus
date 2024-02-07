import { useCookie } from "nuxt/app";

export default defineEventHandler((event) => {
  if (getRequestURL(event).pathname.includes("/admin")) {
    console.log(getRequestURL(event));
    if (event.headers.get("cookie")?.includes("role=admin")) {
      console.log("Admin is logged in");
    }
  }
});
