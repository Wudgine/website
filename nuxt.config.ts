// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      {code: 'ru', iso: 'ru-RU', name: 'Русский'},
    ],
    defaultLocale: 'ru',
  },
  // i18n: {
  //   // legacy: false,
  //   // strategy: 'prefix_except_default',
  //   strategy: 'prefix',
  //   locales: [
  //     { code: 'en', iso: 'en-US', name: 'English' },
  //     { code: 'ru', iso: 'ru-RU', name: 'Русский' },
  //     // ... другие языки
  //   ],
  //   defaultLocale: 'ru',
  //   detectBrowserLanguage: {
  //     useCookie: true,
  //     cookieKey: 'i18n_redirected',
  //     redirectOn: 'root',
  //   }
  // },

  // content: {
  //   // 👇 Оберните конфигурацию поиска в 'experimental'
  //   experimental: {
  //     clientDB: true,
  //   },
  //
  //   // Не забудьте оставить эту опцию из предыдущего шага
  //   locales: ['en', 'ru']
  // },

  // content: {
  //   // Включаем экспериментальные функции для поиска
  //     // Включаем индексированный поиск
  //     search: {
  //       indexed: true
  //   }
  // },
  // content: {
  //   // Включаем поддержку i18n
  //   i18n: {
  //     // Имя поля для языка в метаданных файла (frontmatter)
  //     // Если у вас нет явного поля, content будет использовать суффиксы (.en.md)
  //     field: 'locale',
  //     // Если Content Navigation не работает, попробуйте явно указать ваши языки
  //     // locales: ['en', 'ru'],
  //   },
  // },

  app: {
    // ВАЖНО: Укажите имя вашего репозитория (включая слеши)
    // Если имя репозитория Wudgine, используйте '/Wudgine/'
    baseURL: '/', //process.env.NODE_ENV === 'production' ? '/Wudgine/' : '/',,
    head: {
      meta: [
        {
          // Здесь вы меняете текст:
          name: 'description',
          content: 'Современный игровой движок с высокопроизводительным C++ ядром, графикой на Vulkan, архитектурой ECS и поддержкой веб-интерфейсов. Гибкость модулей, плагины и кроссплатформенность.'
        },
      ],
    },
  },


  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/docs': {redirect: '/docs/getting-started/introduction', prerender: false},
    // '/**': { prerender: true }//todo: это точно нужно?
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true,
      failOnError: false
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
