// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/styles/all.scss", "bootstrap/dist/css/bootstrap.min.css"],
  plugins: [
    { src: "~/plugins/bootstrap.client.js", ssr: false },
    "~/plugins/formatDate.js",
  ],
  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL || 'https://nuxr3.zeabur.app/',
    },
  },
});
