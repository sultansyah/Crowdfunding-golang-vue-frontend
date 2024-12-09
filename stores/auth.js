import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        setUser(data) {
            this.user = data
        },
        clearAuth() {
            this.user = null
        },
        logout() {
            this.clearAuth()
        }
    },
    persist: true
})