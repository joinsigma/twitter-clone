<script setup>
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc } from '@firebase/firestore'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { db } from '../../firebase'
import NavigationLayout from '../layouts/NavigationLayout.vue'
import Sidebar from '../components/home/Sidebar.vue'
import { ArrowLeftIcon, ChatBubbleLeftIcon, HeartIcon, ArrowPathRoundedSquareIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
import { formatDate } from '../utils/date'
import { useUser } from '../stores/user'
import CommentList from '../components/tweet/CommentList.vue'

const tweet = ref(null)
const tweetAuthor = ref(null)
const tweetInput = ref('')

const comments = ref([])

const userStore = useUser()
const route = useRoute()
const { author, tweetID } = route.params
const router = useRouter()

onMounted(async () => {
    const tweetRef = doc(db, 'tweets', tweetID)
    const tweetSnap = await getDoc(tweetRef)
    const tweetData = tweetSnap.data()
    tweet.value = tweetData

    const authorRef = doc(db, 'authors', tweetData.authorEmail)
    const authorSnap = await getDoc(authorRef)
    const authorData = authorSnap.data()
    tweetAuthor.value = authorData

    comments.value = []
    const commentsRef = collection(db, 'comments')
    const commentsSnap = await getDocs(query(commentsRef, orderBy('createdAt', 'desc')))
    commentsSnap.forEach(async (comment) => {
        const hasComment = tweetData.comments.includes(comment.id)
        if (!hasComment) return
        const { authorEmail, text, createdAt } = comment.data()
        const authorRef = doc(db, 'authors', authorEmail)
        const authorSnap = await getDoc(authorRef)
        const authorData = authorSnap.data()

        comments.value.push({
            author: authorData,
            content: {
                text,
                createdAt: formatDate(createdAt),
                image: '',
            },
        })
    })
})

const hasLiked = (likes) => likes?.some((item) => item === userStore?.user?.email)

const commentTweet = async ({ text }) => {
    const commentsCollectionRef = collection(db, 'comments')

    const response = await addDoc(commentsCollectionRef, {
        authorEmail: userStore?.user?.email,
        createdAt: serverTimestamp(),
        text,
    })

    const tweetRef = doc(db, 'tweets', tweetID)
    await updateDoc(tweetRef, {
        comments: [...tweet.value.comments, response.id],
    })

    window.location.reload()
}
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

            <div class="p-4 flex flex-col">
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

                <div class="flex justify-evenly items-center py-1.5 my-3 border-y border-[#eff3f4]">
                    <div class="flex items-center space-x-2 group cursor-pointer">
                        <div class="group-hover:bg-[#1d9bf0]/10 group-hover:text-twitter text-[#536471] rounded-full p-2 transition-all">
                            <ChatBubbleLeftIcon class="h-6 w-6" />
                        </div>
                    </div>

                    <div class="flex items-center space-x-2 group cursor-pointer">
                        <div class="group-hover:bg-[#00ba7c]/10 group-hover:text-[#00ba7c] text-[#536471] rounded-full p-2 transition-all">
                            <ArrowPathRoundedSquareIcon class="h-6 w-6" />
                        </div>
                    </div>

                    <div class="flex items-center space-x-2 group cursor-pointer">
                        <div :class="[hasLiked(tweet?.likes) ? 'text-[#f91880]' : 'group-hover:text-[#f91880] text-[#536471]', 'group-hover:bg-[#f91880]/10  rounded-full p-2 transition-all']">
                            <HeartIcon :class="[hasLiked(tweet?.likes) ? 'fill-[#f91880]' : '', 'h-6 w-6 ']" />
                        </div>
                    </div>

                    <div class="flex items-center space-x-2 group cursor-pointer">
                        <div class="hover:bg-[#1d9bf0]/10 hover:text-twitter text-[#536471] rounded-full p-2 transition-all">
                            <ArrowUpTrayIcon class="h-6 w-6" />
                        </div>
                    </div>
                </div>

                <div class="flex items-center space-x-3">
                    <div class="h-8 w-8 md:h-12 md:w-12">
                        <img class="h-full w-full rounded-full" :src="userStore?.user?.photoURL" alt="" />
                    </div>

                    <div class="flex-1 text-[#0f1419] text-base md:text-xl">
                        <input v-model="tweetInput" class="w-full outline-none placeholder-[#536471]" type="text" placeholder="Tweet your reply" />
                    </div>

                    <button @click="commentTweet({ text: tweetInput })" class="bg-twitter hover:bg-[#1a8cd8] px-4 py-2 rounded-full text-white font-bold text-sm">Reply</button>
                </div>
            </div>
            <div class="border-y border-[#eff3f4]">
                <CommentList :comments="comments" />
            </div>
        </template>

        <template #sidebar>
            <Sidebar />
        </template>
    </NavigationLayout>
</template>
