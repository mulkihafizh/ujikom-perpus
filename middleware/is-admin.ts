export default defineNuxtRouteMiddleware((to) => {
  if (process.client) return;

  const token = useCookie("role");
  if (token.value === "User") {
    return navigateTo("/dashboard");
  }
});
