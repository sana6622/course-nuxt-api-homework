// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import type { NuxtConfig } from "nuxt/schema";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/styles/all.scss", "bootstrap/dist/css/bootstrap.min.css"],
  modules: ["@pinia/nuxt","@vee-validate/nuxt"],
  plugins: [
    { src: "~/plugins/bootstrap.client.js", ssr: false },
    "~/plugins/formatDate.js",
  ],
  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL || 'https://nuxr3.zeabur.app/',
    },
  },
  veeValidate: {
    componentNames: {
      Form: "VForm",
      Field: "VField",
      ErrorMessage: "VErrorMessage",
    },
  },
} as NuxtConfig & {
  veeValidate: {
    componentNames: {
      Form: string;
      Field: string;
      ErrorMessage: string;
    };
  };
});
