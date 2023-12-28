export default defineNuxtConfig({
  css: ['@/assets/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/_variables.scss";',
        },
      },
    },
  },
  plugins: ['~/plugins/locator/index.ts', '~/plugins/socket/index.ts'],
  modules: ['@pinia/nuxt'],
});
