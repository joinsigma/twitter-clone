<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import NavigationLayout from '@/layouts/NavigationLayout.vue'
import TweetBox from '@/components/tweet/TweetBox.vue'
import TweetList from '@/components/tweet/TweetList.vue'
import Sidebar from '@/components/home/Sidebar.vue'
import { useUser } from '@/stores/user'
import { formatDate } from '@/utils/date'
import { SparklesIcon } from '@heroicons/vue/24/outline'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { auth, db } from '../../firebase'

const tweets = ref([])
const router = useRouter()

onMounted(async () => {
    tweets.value = []
    const tweetsRef = collection(db, 'tweets')
    const tweetsSnap = await getDocs(tweetsRef)

    tweetsSnap.forEach(async (tweet) => {
        const { authorID, text, likesCount, createdAt } = tweet.data()
        const authorRef = doc(db, 'authors', authorID)
        const authorSnap = await getDoc(authorRef)
        const { name, handler, imageSrc } = authorSnap.data()

        tweets.value.push({
            author: {
                name,
                handler,
                imageSrc,
            },
            content: {
                text,
                createdAt: formatDate(createdAt),
                image: '',
            },
            stats: {
                likesCount,
                commentsCount: 0,
                retweetsCount: 0,
            },
        })
    })
})

onAuthStateChanged(auth, (user) => {
    if (user === null) {
        router.push({
            name: 'Sign In',
        })
        return
    }

    const { displayName, email, photoURL } = user
    const userStore = useUser()

    userStore.user = {
        name: displayName,
        email,
        photoURL,
    }
})
</script>

<template>
    <NavigationLayout>
        <template #default>
            <div class="sticky top-0 flex items-center justify-between p-2 px-4 bg-white/80 backdrop-blur-md">
                <h2 class="text-xl font-bold">Home</h2>

                <div class="hover:bg-[#0f1419]/10 rounded-full cursor-pointer p-2">
                    <SparklesIcon class="h-6 w-6" />
                </div>
            </div>

            <div class="p-4 flex border-b border-[#eff3f4]">
                <TweetBox />
            </div>

            <TweetList :tweets="tweets" />
        </template>

        <template #sidebar>
            <Sidebar />
        </template>
    </NavigationLayout>
</template>
