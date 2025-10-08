// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    // '@nuxtjs/i18n'
  ],

  // i18n: {
  //   strategy: 'prefix',
  //   locales: [
  //     { code: 'en', iso: 'en-US', name: 'English' },
  //     { code: 'ru', iso: 'ru-RU', name: 'Русский' },
  //     // ... другие языки
  //   ],
  //   defaultLocale: 'en',
  // },

  app: {
    // ВАЖНО: Укажите имя вашего репозитория (включая слеши)
    // Если имя репозитория Wudgine, используйте '/Wudgine/'
    baseURL: '/'//process.env.NODE_ENV === 'production' ? '/Wudgine/' : '/',
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/docs': { redirect: '/docs/getting-started/introduction', prerender: false },
    // '/**': { prerender: true }//todo: это точно нужно?
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  // experimental: {
  //   // ОТКЛЮЧАЕМ РАЗДЕЛЕНИЕ ДАННЫХ В ОТДЕЛЬНЫЕ JSON-ФАЙЛЫ
  //   // Это заставляет Nuxt встраивать данные страницы прямо в HTML,
  //   // устраняя все ошибки 404 для _payload.json на статических хостах.
  //   payloadExtraction: false
  // },

  // eslint: {
  //   config: {
  //     stylistic: {
  //       commaDangle: 'never',
  //       braceStyle: '1tbs'
  //     }
  //   }
  // }
})
