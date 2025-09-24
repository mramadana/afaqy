export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: {
      name: 'layout',
      mode: 'out-in',
    },
    head: {
      title: "Heaven - بيرث",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: { lang: "ar", class: "html_direction" },
      meta: [
        { name: "description", content: "Heaven Birth" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/logo.svg" },
      ],
      script: [
        {
          children: `
            (function () {
              const savedLang = localStorage.getItem("locale") || "ar";
              const html = document.documentElement;
              html.setAttribute("lang", savedLang);
              html.setAttribute("dir", savedLang === "ar" ? "rtl" : "ltr");
              window.__NUXT_LANG__ = savedLang;
              window.__NUXT_TEXTS__ = {
                ar: "العربية",
                en: "English",
              };
            })();
          `,
          type: "text/javascript",
        },
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

  build: {
    transpile: ["@fawmi/vue-google-maps"],
  },

  compatibilityDate: "2025-01-12",
})