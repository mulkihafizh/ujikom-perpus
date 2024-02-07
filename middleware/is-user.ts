export default defineNuxtRouteMiddleware((to) => {
  if (process.client) return;

  const token = useCookie("role");
  if (token.value === "Admin") {
    return navigateTo("/dashboard-admin");
  }
});
