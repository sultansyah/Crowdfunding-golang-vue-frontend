export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const customFetch = $fetch.create({
        baseURL: config.public.apiBase,
        onRequest({ options }) {
            const authStore = useAuthStore()
            const token = authStore.user?.token

            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token}`,
                }
            }
        },
        onRequestError({ error }) {
            console.error('Request error:', error)
        },
        onResponse({ response }) {
            console.log('Response received:', response)
        },
        onResponseError({ error }) {
            console.error('Response error:', error)
        },
    })

    nuxtApp.provide('fetch', customFetch)
})