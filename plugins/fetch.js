export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const customFetch = $fetch.create({
        baseURL: config.public.apiBase
    })

    nuxtApp.provide('fetch', customFetch)
})