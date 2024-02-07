export default defineNuxtRouteMiddleware((to) => {
  if (process.client) return;
  const token = useCookie("token");
  if (token.value) {
    return navigateTo("/dashboard");
  }
});
