export default defineNuxtPlugin(() => ({
  provide: {
    AuthCheck: () => {
      onBeforeMount(async () => {
        const authCheck = await useNuxtApp().$BackendService().authCheck();
        if (!authCheck) {
          window.sessionStorage.setItem('auth_referrer', useRoute().path);
          return navigateTo('/auth/login');
        }
      });
    },
  },
}));
