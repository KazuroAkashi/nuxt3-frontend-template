export default defineNuxtRouteMiddleware(async () => {
  const res = await useFetch(process.env.BACKEND_URL + '/me');
  if (res.error.value) return navigateTo('/auth/login');
});
