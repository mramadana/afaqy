export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: {
      name: 'layout',
      mode: 'out-in',
    },
    head: {
      title: "Afaqy",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: { lang: "en", class: "html_direction" },
      meta: [
        { name: "description", content: "Afaqy" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/logo.svg" },
      ],
    },
  },

  // primevue
  modules: [
    'nuxt-primevue',
    "@pinia/nuxt",
    '@pinia-plugin-persistedstate/nuxt'
  ],

  alias: {

  assets: "/<rootDir>/assets",
},

  css: [
    "bootstrap/dist/css/bootstrap.rtl.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "primevue/resources/themes/lara-light-green/theme.css",
    "primevue/resources/primevue.min.css",
    "~/assets/css/style.scss",
  ],

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  compatibilityDate: "2025-01-12",
})