export default defineNuxtRouteMiddleware(async (to) => {
  if (!process.client) return;

  const authCheck = await useNuxtApp().$BackendService().authCheck();
  if (!authCheck) {
    window.sessionStorage.setItem('auth_referrer', to.path);
    return navigateTo('/auth/login');
  }
});
