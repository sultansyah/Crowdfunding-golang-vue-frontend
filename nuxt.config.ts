// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8080/api/v1'
    }
  },
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@sidebase/nuxt-auth',
    '@vite-pwa/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  auth: {
    isEnabled: true,
    baseURL: 'http://localhost:8080/api/v1/',
    provider: { 
      type: 'local',
      endpoints: {
        signIn: { path: 'sessions', method: 'post' },
        signOut: false,
        signUp: { path: 'users', method: 'post' },
        getSession: { path: 'session', method: 'get' },
      },
      token: {
        signInResponseTokenPointer: '/data/token',
        type: 'Bearer',
        headerName: 'Authorization',
      }
    },
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: false,
    }
  },
})