// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/styles/all.scss", "bootstrap/dist/css/bootstrap.min.css"],
  vite: {
    define: {
      "process.env.DEBUG": false, // 解決 Bootstrap 的環境變數警告
    },
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `
    //         @use "@/assets/styles/_variables.scss"; // 在全部的元件都引入 _variables.scss
    //       `,
    //     },
    //   },
    // },
  },
});
