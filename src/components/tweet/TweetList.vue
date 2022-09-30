<script setup>
import { EllipsisHorizontalIcon, ChatBubbleLeftIcon, HeartIcon, ArrowPathRoundedSquareIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'

const tweets = [
    {
        author: {
            name: 'Yap Yee Qiang',
            handler: 'yapyeeqiang',
            imageSrc: 'https://yeeqiang.me/avatar.jpeg',
        },
        content: {
            text: 'Hello world!',
            image: '',
            createdAt: '18h',
        },
        stats: {
            commentsCount: 288,
            retweetsCount: 34,
            likesCount: 196,
        },
    },
    {
        author: {
            name: 'Yap Yee Qiang',
            handler: 'yapyeeqiang',
            imageSrc: 'https://yeeqiang.me/avatar.jpeg',
        },
        content: {
            text: 'Hello world!',
            image: '',
            createdAt: '18h',
        },
        stats: {
            commentsCount: 288,
            retweetsCount: 34,
            likesCount: 196,
        },
    },
    {
        author: {
            name: 'Yap Yee Qiang',
            handler: 'yapyeeqiang',
            imageSrc: 'https://yeeqiang.me/avatar.jpeg',
        },
        content: {
            text: 'Hello world!',
            image: '',
            createdAt: '18h',
        },
        stats: {
            commentsCount: 288,
            retweetsCount: 34,
            likesCount: 196,
        },
    },
    {
        author: {
            name: 'Yap Yee Qiang',
            handler: 'yapyeeqiang',
            imageSrc: 'https://yeeqiang.me/avatar.jpeg',
        },
        content: {
            text: 'Hello world!',
            image: '',
            createdAt: '18h',
        },
        stats: {
            commentsCount: 288,
            retweetsCount: 34,
            likesCount: 196,
        },
    },
    {
        author: {
            name: 'Yap Yee Qiang',
            handler: 'yapyeeqiang',
            imageSrc: 'https://yeeqiang.me/avatar.jpeg',
        },
        content: {
            text: 'Hello world!',
            image: '',
            createdAt: '18h',
        },
        stats: {
            commentsCount: 288,
            retweetsCount: 34,
            likesCount: 196,
        },
    },
    {
        author: {
            name: 'Yap Yee Qiang',
            handler: 'yapyeeqiang',
            imageSrc: 'https://yeeqiang.me/avatar.jpeg',
        },
        content: {
            text: 'Hello world!',
            image: '',
            createdAt: '18h',
        },
        stats: {
            commentsCount: 288,
            retweetsCount: 34,
            likesCount: 196,
        },
    },
]
</script>

<template>
    <div v-for="({ author, content, stats }, index) in tweets" :key="index" class="flex space-x-4 p-4 border-b border-[#eff3f4] hover:bg-black/[0.03] cursor-pointer">
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
                    <span class="text-sm group-hover:text-twitter transition-all">{{ stats.commentsCount }}</span>
                </div>

                <div class="flex items-center space-x-2 group cursor-pointer">
                    <div class="group-hover:bg-[#00ba7c]/10 group-hover:text-[#00ba7c] rounded-full p-2 transition-all">
                        <ArrowPathRoundedSquareIcon class="h-4 w-4" />
                    </div>
                    <span class="text-sm group-hover:text-[#00ba7c] transition-all">{{ stats.retweetsCount }}</span>
                </div>

                <div class="flex items-center space-x-2 group cursor-pointer">
                    <div class="group-hover:bg-[#f91880]/10 group-hover:text-[#f91880] rounded-full p-2 transition-all">
                        <HeartIcon class="h-4 w-4" />
                    </div>
                    <span class="text-sm group-hover:text-[#f91880] transition-all">{{ stats.likesCount }}</span>
                </div>

                <div class="flex items-center space-x-2 group cursor-pointer">
                    <div class="hover:bg-[#1d9bf0]/10 hover:text-twitter rounded-full p-2 transition-all">
                        <ArrowUpTrayIcon class="h-4 w-4" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
