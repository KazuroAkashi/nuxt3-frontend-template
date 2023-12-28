export default defineNuxtPlugin(() => ({
  provide: {
    AuthCheck: () => {
      onBeforeMount(async () => {
        const res = await useFetch(process.env.BACKEND_URL + '/me');
        if (res.error.value) navigateTo('/auth/login');
      });
    },
  },
}));
