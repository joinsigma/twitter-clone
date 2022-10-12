<script setup>
import { doc, getDoc } from '@firebase/firestore'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { db } from '../../firebase'
import NavigationLayout from '../layouts/NavigationLayout.vue'
import Sidebar from '../components/home/Sidebar.vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { formatDate } from '../utils/date'

const tweet = ref(null)
const tweetAuthor = ref(null)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    const { author, tweetID } = route.params

    const tweetRef = doc(db, 'tweets', tweetID)
    const tweetSnap = await getDoc(tweetRef)
    const { authorEmail, text, createdAt, likes, comments } = tweetSnap.data()
    tweet.value = { authorEmail, text, createdAt, likes, comments }

    const authorRef = doc(db, 'authors', authorEmail)
    const authorSnap = await getDoc(authorRef)
    const { name, handler, imageSrc, email } = authorSnap.data()
    tweetAuthor.value = { name, handler, imageSrc, email }
})
</script>

<template>
    <NavigationLayout>
        <template #default>
            <div class="sticky top-0 flex items-center p-2 px-4 bg-white/80 backdrop-blur-md space-x-6">
                <div @click="router.go(-1)" class="hover:bg-[#0f1419]/10 rounded-full cursor-pointer p-2 -ml-2">
                    <ArrowLeftIcon class="h-4 w-4 stroke-[2.5px]" />
                </div>

                <h2 class="text-xl font-bold">Tweet</h2>
            </div>

            <div class="p-4 flex border-b border-[#eff3f4]">
                <div class="flex flex-col space-y-3">
                    <div class="flex space-x-3">
                        <div class="h-8 w-8 md:h-12 md:w-12">
                            <img class="h-full w-full rounded-full" :src="tweetAuthor?.imageSrc" alt="" />
                        </div>
                        <div class="flex flex-col text-[15px]">
                            <p class="font-semibold text-[#0F1419]">{{ tweetAuthor?.name }}</p>
                            <span class="text-[#536471]">@{{ tweetAuthor?.handler }}</span>
                        </div>
                    </div>
                    <div>
                        <p class="text-[23px]">{{ tweet?.text }}</p>
                    </div>
                    <div>
                        <span class="text-[#536471] text-[15px]">{{ formatDate(tweet?.createdAt, 'h:mm a · MMM d, yyyy') }}</span>
                    </div>
                </div>
            </div>
        </template>

        <template #sidebar>
            <Sidebar />
        </template>
    </NavigationLayout>
</template>
