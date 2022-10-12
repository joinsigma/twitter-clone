<script setup>
import { onMounted, ref } from 'vue'
import NavigationLayout from '@/layouts/NavigationLayout.vue'
import TweetBox from '@/components/tweet/TweetBox.vue'
import TweetList from '@/components/tweet/TweetList.vue'
import Sidebar from '@/components/home/Sidebar.vue'
import { useUser } from '@/stores/user'
import { formatDate } from '@/utils/date'
import { SparklesIcon } from '@heroicons/vue/24/outline'
import { addDoc, collection, doc, getDoc, getDocs, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'

const tweets = ref([])
const userStore = useUser()

onMounted(async () => {
    tweets.value = []
    const tweetsRef = collection(db, 'tweets')
    const tweetsSnap = await getDocs(query(tweetsRef, orderBy('createdAt', 'desc')))

    tweetsSnap.forEach(async (tweet) => {
        const { authorEmail, text, createdAt, likes, comments } = tweet.data()
        console.log(comments)
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
                comments,
                retweets: [],
            },
        })
    })

    const retweetsRef = collection(db, 'retweets')
    const retweetsSnap = await getDocs(query(retweetsRef, orderBy('createdAt', 'desc')))

    retweetsSnap.forEach(async (retweet) => {
        const { tweetID, retweetBy } = retweet.data()

        const tweetRef = doc(db, 'tweets', tweetID)
        const tweetSnap = await getDoc(tweetRef)

        const tweetData = tweetSnap.data()
        if (!tweetData) return
        const { text, createdAt, likes, authorEmail } = tweetData

        const authorRef = doc(db, 'authors', authorEmail)
        const authorSnap = await getDoc(authorRef)
        const { name, handler, imageSrc, email } = authorSnap.data()

        tweets.value.push({
            id: tweetID,
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
            retweet: {
                by: retweetBy,
            },
        })
    })
})

const likeTweet = async ({ tweetID, authorEmail }) => {
    const filteredTweets = tweets.value.filter((tweet) => tweet.id === tweetID)

    filteredTweets.forEach((tweet) => {
        const hasLiked = tweet.stats.likes.includes(authorEmail)

        if (hasLiked) {
            const authorIndex = tweet.stats.likes.findIndex((authorEmail) => authorEmail === authorEmail)
            tweet.stats.likes.splice(authorIndex, 1)
        } else {
            tweet.stats.likes.push(authorEmail)
        }
    })

    const tweetRef = doc(db, 'tweets', tweetID)
    await updateDoc(tweetRef, {
        likes: filteredTweets[0].stats.likes,
    })
}

const postTweet = async ({ tweetContent }) => {
    const tweetsCollectionRef = collection(db, 'tweets')

    await addDoc(tweetsCollectionRef, {
        authorEmail: 'yapyeeqiang@gmail.com',
        createdAt: serverTimestamp(),
        likes: [],
        comments: [],
        text: tweetContent,
        retweet: false,
    })

    window.location.reload()
}

const retweet = async ({ tweetID }) => {
    const hasRetweeted = tweets.value.filter((tweet) => tweet.id === tweetID && tweet?.retweet?.by).length > 0

    if (hasRetweeted) return

    const retweetCollectionRef = collection(db, 'retweets')

    await addDoc(retweetCollectionRef, {
        tweetID,
        retweetBy: userStore.user.name,
        createdAt: serverTimestamp(),
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

            <TweetList :tweets="tweets" @like="likeTweet" @retweet="retweet" />
        </template>

        <template #sidebar>
            <Sidebar />
        </template>
    </NavigationLayout>
</template>
