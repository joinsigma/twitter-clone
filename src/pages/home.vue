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
import { addDoc, collection, doc, getDoc, getDocs, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { auth, db } from '../../firebase'

const tweets = ref([])
const userStore = useUser()
const router = useRouter()

onMounted(async () => {
    tweets.value = []
    const tweetsRef = collection(db, 'tweets')
    const q = query(tweetsRef, orderBy('createdAt', 'desc'))
    const tweetsSnap = await getDocs(q)

    tweetsSnap.forEach(async (tweet) => {
        const { authorEmail, text, createdAt, likes } = tweet.data()
        const authorRef = doc(db, 'authors', authorEmail)
        const authorSnap = await getDoc(authorRef)
        const { name, handler, imageSrc, email } = authorSnap.data()

        tweets.value.push({
            id: tweet.id,
            author: {
                name,
                handler,
                imageSrc,
                email,
            },
            content: {
                text,
                createdAt: formatDate(createdAt),
                image: '',
            },
            stats: {
                likes,
                comments: [],
                retweets: [],
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

    userStore.user = {
        name: displayName,
        email,
        photoURL,
    }
})

const likeTweet = async ({ tweetID, authorEmail }) => {
    const tweet = tweets.value.find((tweet) => tweet.id === tweetID)
    const hasLiked = tweet.stats.likes.includes(authorEmail)

    if (hasLiked) {
        const authorIndex = tweet.stats.likes.findIndex((authorEmail) => authorEmail === authorEmail)
        tweet.stats.likes.splice(authorIndex, 1)
    } else {
        tweet.stats.likes.push(authorEmail)
    }

    const tweetRef = doc(db, 'tweets', tweetID)
    await updateDoc(tweetRef, {
        likes: tweet.stats.likes,
    })
}

const postTweet = async ({ tweetContent }) => {
    const tweetsCollectionRef = collection(db, 'tweets')

    await addDoc(tweetsCollectionRef, {
        authorEmail: 'yapyeeqiang@gmail.com',
        createdAt: serverTimestamp(),
        likes: [],
        text: tweetContent,
    })

    window.location.reload()
}
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
                <TweetBox @postTweet="postTweet" />
            </div>

            <TweetList :tweets="tweets" @like="likeTweet" />
        </template>

        <template #sidebar>
            <Sidebar />
        </template>
    </NavigationLayout>
</template>
