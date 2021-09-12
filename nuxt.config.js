export default {
  target: "static",
  head: {
    title: "fluenticons-next",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  css: ["~/assets/css/styles.css"],
  plugins: ["~/plugins/tooltip"],
  components: true,
  buildModules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxt/content",
    "vue-swatches/nuxt",
    "nuxt-clipboard2",
    "@nuxtjs/toast",
    "@nuxtjs/google-fonts"
  ],
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700]
    },
    display: "swap",
    download: true
  },
  colorMode: {
    classSuffix: ""
  },
  toast: {
    position: "bottom-right",
    duration: 7000
  },
  axios: {
    baseURL: "/"
  },
  pwa: {
    manifest: {
      lang: "en"
    }
  },
  content: {},
  build: {}
};
