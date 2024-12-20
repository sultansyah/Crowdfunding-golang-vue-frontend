<template>
    <header class="flex items-center">
        <div style="height: 54px" class="pr-5">
            <img src="/logo.svg" alt="logo" class="h-full" />
        </div>
        <ul class="flex items-center">
            <li>
                <nuxt-link class="text-white hover:text-teal-500 text-lg px-4 py-3" to="/">Home</nuxt-link>
            </li>
            <li>
                <nuxt-link class="text-white hover:text-teal-500 text-lg px-4 py-3" to="#">Project</nuxt-link>
            </li>
            <li>
                <nuxt-link class="text-white hover:text-teal-500 text-lg px-4 py-3" to="#">Features</nuxt-link>
            </li>
            <li>
                <nuxt-link class="text-white hover:text-teal-500 text-lg px-4 py-3" to="#">Success
                    Stories</nuxt-link>
            </li>
        </ul>
        <ul class="flex ml-auto items-center mt-2" v-if="authStore.user === null">
            <li>
                <nuxt-link to="/register"
                    class="inline-block bg-transparent border-white border hover:bg-white hover:bg-opacity-25 text-white font-light w-40 text-center px-6 py-1 text-lg rounded-full mr-4">
                    Sign Up
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/login"
                    class="inline-block bg-transparent border-white border hover:bg-white hover:bg-opacity-25 text-white font-light w-40 text-center px-6 py-1 text-lg rounded-full">
                    My Account
                </nuxt-link>
            </li>
        </ul>
        <div class="flex ml-auto" v-else>
            <div class="dropdown inline-block relative z-10 mr-4">
                <button class="bg-white text-gray-7 font-semibold py-4 rounded inline-flex items-center">
                    <img v-if="authStore.user.image_url" :src="`${apiBase}/${authStore.user.image_url}`" alt=""
                        class="h-8 rounded-full mr-2 ml-2" />
                    <span class="mr-1">
                        {{ authStore.user.name }}
                    </span>
                    <svg class="fill-current h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </button>
                <ul class="dropdown-menu absolute hidden text-gray-700 pt-1 shadow w-full">
                    <li>
                        <nuxt-link to="/dashboard"
                            class="bg-white hover:bg-gray-100 hover:text-orange-100 py-2 px-4 block whitespace-nowrap">
                            My Dashboard
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/dashboard"
                            class="bg-white hover:bg-gray-100 hover:text-orange-100 py-2 px-4 block whitespace-nowrap">
                            Account Setting
                        </nuxt-link>
                    </li>
                    <li>
                        <a @click="logout()"
                            class="cursor-pointer rounded-b bg-white hover:bg-gray-100 hover:text-orange-100 py-2 px-4 block whitespace-nowrap">
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useAuth } from '#build/imports';
import { useRuntimeConfig } from '#app'

const props = defineProps(['user'])

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const authStore = useAuthStore()
const { signOut } = useAuth()

const logout = async () => {
    await signOut({redirect: false})
    authStore.logout()
}

</script>

<style scoped>
.dropdown:hover .dropdown-menu {
    display: block;
}
</style>