// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    '@pinia/nuxt'
  ],
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    baseURL: 'http://localhost:3000/api/v1',
    provider: { 
      type: 'local',
      endpoints: {
        signIn: { path: '/sessions', method: 'post' },
        signOut: false,
        signUp: { path: '/users', method: 'post' },
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
  }
})