<template>
    <div class="project-page">
        <section class="project-header pt-5">
            <div class="container mx-auto relative">
                <Navbar />
            </div>
        </section>
        <section class="container project-container mx-auto -mt-56">
            <div class="flex mt-3">
                <div class="w-3/4 mr-6">
                    <div class="bg-white p-3 mb-3 border border-gray-400 rounded-20">
                        <figure class="item-image">
                            <img :src="defaultImage" alt="" class="rounded-20 w-full" />
                        </figure>
                    </div>
                    <div class="flex -mx-2">
                        <div class="relative w-1/4 bg-white m-2 p-2 border border-gray-400 rounded-20"
                            v-for="image in campaign.images" :key="image.image_url">
                            <figure class="item-thumbnail">
                                <img :src="`${apiBase}/${campaign.image_url}`"
                                    @click="changeImage(`${apiBase}/${campaign.image_url}`)" alt=""
                                    class="rounded-20 w-full" />
                            </figure>
                        </div>
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="bg-white w-full p-5 border border-gray-400 rounded-20 sticky" style="top: 15px">
                        <h3>Project Leader:</h3>

                        <div class="flex mt-3">
                            <div class="w-1/4">
                                <img :src="`${apiBase}/${campaign.user.image_url}`" />
                            </div>
                            <div class="w-3/4 ml-5 mt-1">
                                <div class="font-semibold text-xl text-gray-800">
                                    {{ campaign.user.name }}
                                </div>
                                <div class="font-light text-md text-gray-400">
                                    {{ campaign.backer_count }}
                                </div>
                            </div>
                        </div>

                        <h4 class="mt-5 font-semibold">What will you get:</h4>
                        <ul class="list-check mt-3" v-for="perk in campaign.perks" :key="perk">
                            <li>{{ perk }}</li>
                        </ul>
                        <template v-if="status == 'authenticated'">
                            <input type="number" v-model.number="transactions.amount" @keyup.enter="fund"
                                class="border border-gray-500 block w-full px-6 py-3 mt-4 rounded-full text-gray-800 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
                                placeholder="Amount in Rp" />
                            <button @click="fund"
                                class="text-center mt-3 button-cta block w-full bg-orange-button hover:bg-green-button text-white font-medium px-6 py-3 text-md rounded-full">
                                Fund Now
                            </button>
                        </template>
                        <template v-else>
                            <button @click="$router.push({ path: '/login' })"
                                class="text-center mt-3 button-cta block w-full bg-orange-button hover:bg-green-button text-white font-medium px-6 py-3 text-md rounded-full">
                                Sign in to Fund
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </section>
        <section class="container mx-auto pt-8">
            <div class="flex justify-between items-center">
                <div class="w-full md:w-3/4 mr-6">
                    <h2 class="text-4xl text-gray-900 mb-2 font-medium">
                        {{ campaign.name }}
                    </h2>
                    <p class="font-light text-xl mb-5">
                        {{ campaign.short_description }}
                    </p>

                    <div class="relative progress-bar">
                        <div class="overflow-hidden mb-4 text-xs flex rounded-full bg-gray-200 h-6">
                            <div :style="'width: ' + (campaign.current_amount / campaign.goal_amount) * 100 + '%'"
                                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-progress progress-striped">
                            </div>
                        </div>
                    </div>
                    <div class="flex progress-info mb-6">
                        <div>{{ (campaign.current_amount / campaign.goal_amount) * 100 + '%' }}</div>
                        <div class="ml-auto font-semibold">
                            Rp {{ new Intl.NumberFormat().format(campaign.goal_amount) }}
                        </div>
                    </div>

                    <p class="font-light text-xl mb-5">
                        {{ campaign.description }}
                    </p>
                </div>
                <div class="w-1/4 hidden md:block"></div>
            </div>
        </section>
        <div class="cta-clip -mt-20"></div>
        <CallToAction />
        <Footer />
    </div>
</template>

<script setup>
import { useRuntimeConfig } from '#app'
import { onMounted, useAuth } from '#build/imports'

const route = useRoute()
const id = route.params.id

const { status } = useAuth()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const { $fetch } = useNuxtApp()

const { data, error } = await useAsyncData('campaign', () =>
    $fetch(`/campaigns/${id}`)
)
if (error.value) {
    console.log(error.value)
}
const campaign = data.value.data

const defaultImage = ref('')
const transactions = ref({
    amount: 0,
    campaign_id: Number.parseInt(id)
})

const changeImage = (url) => {
    defaultImage.value = url
}

const fund = async () => {
    try {
        let response = await $fetch('/transactions',
            {
                body: transactions.value,
                method: 'POST',
            }
        )
        console.log(response)


        window.location = response.data.payment_url
    } catch (error) {
        console.log("error = ", error)
    }
}

onMounted(() => {
    defaultImage.value = `${apiBase}/${campaign.image_url}`
})

</script>