// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-mongoose",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-icon",
    "nuxt-swiper",
  ],
  image: {
    quality: 100,
  },
  mongoose: {
    uri: process.env.MONGO_URI,
    options: {
      dbName: "perpustakaan",
    },
    modelsDir: "utils/models",
  },
  colorMode: {
    classSuffix: "",
  },
  googleFonts: {
    preconnect: true,
    prefetch: true,
    families: {
      Poppins: [400, 500, 600, 700],
    },
  },
  build: {
    transpile: ["vue-toastification"],
  },
  runtimeConfig: {
    secret: process.env.SECRET || "4r34l1y53cr3tk15t4r",
  },
});
