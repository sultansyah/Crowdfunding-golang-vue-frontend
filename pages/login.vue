<template>
    <div class="h-screen flex justify-center items-center">
        <div class="hidden md:block lg:w-1/3 bg-white h-full auth-background rounded-tr-lg rounded-br-lg"></div>
        <div class="w-auto md:w-2/4 lg:w-2/3 flex justify-center items-center">
            <div class="w-full lg:w-1/2 px-10 lg:px-0">
                <h2 class="font-normal mb-6 text-3xl text-white">
                    Sign In to Your Account
                </h2>
                <div class="mb-6">
                    <div class="mb-4">
                        <label class="font-normal text-lg text-white block mb-3">Email Address</label>
                        <input type="email" v-model="email"
                            class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
                            placeholder="Write your email address here" />
                    </div>
                </div>
                <div class="mb-6">
                    <div class="mb-4">
                        <label class="font-normal text-lg text-white block mb-3">Password</label>
                        <input type="password" v-model="password" @keyup.enter="signInUser"
                            class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
                            placeholder="Write your password here" />
                    </div>
                </div>
                <div class="mb-6">
                    <div class="mb-4">
                        <button @click="signInUser"
                            class="block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 text-lg rounded-full">
                            Sign In
                        </button>
                    </div>
                </div>
                <div class="text-center">
                    <p class="text-white text-md">
                        Don't have account?
                        <nuxt-link to="/register" class="no-underline text-orange-button">Sign Up</nuxt-link>.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuth, useAuthStore, onMounted } from '#build/imports';

const authStore = useAuthStore();

definePageMeta({
    layout: 'auth',
})

const { signIn, getSession, status } = useAuth()
const email = ref('')
const password = ref('')

const checkSession = async () => {
    try {
        const session = await getSession()
        if (session) {
            authStore.setUser(session.data)

            navigateTo('/')
        }
    } catch (error) {
        console.log(`session error = ${error}`)
    }
}

onMounted(() => {
    checkSession()
})

const signInUser = async () => {
    try {
        await signIn(
            {
                email: email.value,
                password: password.value,
            },
            {
                redirect: false,
            }
        )
        if (status.value === 'authenticated') {
            checkSession()
        }
    } catch (error) {
        console.log(`login error = ${error}`);
    }
}


</script>

<style scoped>
.auth-background {
    background-image: url("/sign-in-background.jpg");
    background-position: center;
    background-size: cover;
}
</style>