<script setup>
import { EllipsisHorizontalIcon, ChatBubbleLeftIcon, HeartIcon, ArrowPathRoundedSquareIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
import { useUser } from '@/stores/user'

const props = defineProps(['tweets'])
const emit = defineEmits(['like', 'comment', 'retweet'])

const userStore = useUser()
const hasLiked = (stats) => stats.likes.some((item) => item === userStore.user.email)
</script>

<template>
    <div class="hover:bg-black/[0.03] cursor-pointer p-4 border-b border-[#eff3f4]" v-for="({ id, author, content, stats, retweet }, index) in tweets">
        <div class="flex items-center space-x-3 -mt-4 ml-9 py-2 text-[#536471] font-bold" v-if="retweet">
            <ArrowPathRoundedSquareIcon class="h-4 w-4 stroke-2" />
            <p class="text-xs">{{ retweet.by }} Retweeted</p>
        </div>
        <div :key="index" class="flex space-x-4">
            <div class="h-8 w-8 md:h-12 md:w-12">
                <img class="h-full w-full rounded-full" :src="author.imageSrc" alt="" />
            </div>

            <div class="flex-1">
                <div class="flex justify-between">
                    <div class="flex items-center space-x-1 text-[15px]">
                        <p class="font-semibold text-[#0F1419]">{{ author.name }}</p>
                        <span class="text-[#536471]">@{{ author.handler }}</span>
                        <span class="text-[#536471]">·</span>
                        <span class="text-[#536471]">{{ content.createdAt }}</span>
                    </div>

                    <EllipsisHorizontalIcon class="h-5 w-5" />
                </div>

                <div>
                    <p class="text-[#0F1419] text-[15px]">{{ content.text }}</p>
                </div>

                <div class="flex items-center space-x-16 mt-2 -ml-2">
                    <div class="flex items-center space-x-2 group cursor-pointer">
                        <div class="group-hover:bg-[#1d9bf0]/10 group-hover:text-twitter rounded-full p-2 transition-all">
                            <ChatBubbleLeftIcon class="h-4 w-4" />
                        </div>
                        <span class="text-sm group-hover:text-twitter transition-all">{{ stats.comments.length }}</span>
                    </div>

                    <div @click.prevent="emit('retweet', { tweetID: id })" class="flex items-center space-x-2 group cursor-pointer">
                        <div class="group-hover:bg-[#00ba7c]/10 group-hover:text-[#00ba7c] rounded-full p-2 transition-all">
                            <ArrowPathRoundedSquareIcon class="h-4 w-4" />
                        </div>
                        <span class="text-sm group-hover:text-[#00ba7c] transition-all">{{ stats.retweets.length }}</span>
                    </div>

                    <div @click.prevent="emit('like', { tweetID: id, authorEmail: author.email })" class="flex items-center space-x-2 group cursor-pointer">
                        <div :class="[hasLiked(stats) ? 'text-[#f91880]' : 'group-hover:text-[#f91880]', 'group-hover:bg-[#f91880]/10  rounded-full p-2 transition-all']">
                            <HeartIcon :class="[hasLiked(stats) ? 'fill-[#f91880]' : '', 'h-4 w-4']" />
                        </div>
                        <span :class="[hasLiked(stats) ? 'text-[#f91880]' : 'group-hover:text-[#f91880]', 'text-sm  transition-all']">{{ stats.likes.length }}</span>
                    </div>

                    <div class="flex items-center space-x-2 group cursor-pointer">
                        <div class="hover:bg-[#1d9bf0]/10 hover:text-twitter rounded-full p-2 transition-all">
                            <ArrowUpTrayIcon class="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
