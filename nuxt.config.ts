// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/styles/all.scss", "bootstrap/dist/css/bootstrap.min.css"],
  plugins: [{ src: "~/plugins/bootstrap.client.js", ssr: false }], // 修正語法,
});
