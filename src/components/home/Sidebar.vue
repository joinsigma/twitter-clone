<script setup>
import { MagnifyingGlassIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'

const trends = [
    {
        title: 'Tailwind',
        subtitle: 'Trending',
        tweetsCount: 1_614,
    },
    {
        title: 'JavaScript',
        subtitle: 'Technology · Trending',
        tweetsCount: 33_100,
    },
    {
        title: 'Petronas',
        subtitle: 'Trending in Malaysia',
        tweetsCount: 10_800,
    },
]

const recommendations = [
    {
        name: 'Next.js',
        handler: 'nextjs',
        imageSrc: 'https://pbs.twimg.com/profile_images/1565710214019444737/if82cpbS_normal.jpg',
    },
    {
        name: 'Visual Studio Code',
        handler: 'code',
        imageSrc: 'https://pbs.twimg.com/profile_images/1545098208556097536/rKXaODLl_normal.jpg',
    },
    {
        name: 'NuxtJS',
        handler: 'nuxt_js',
        imageSrc: 'https://pbs.twimg.com/profile_images/1438501794754142212/_SXc-Z_h_normal.jpg',
    },
]
</script>

<template>
    <div class="flex flex-col space-y-4 sticky top-0">
        <!-- Search Twitter -->
        <div class="flex items-center bg-[#eff3f4] rounded-full px-1">
            <MagnifyingGlassIcon class="h-8 w-8 pl-3 text-[#536471]" />
            <input class="outline-none ml-4 bg-transparent placeholder-[#536471] text-[#0f1419] text-[15px] py-3" type="text" placeholder="Search Twitter" />
        </div>

        <!-- Trends -->
        <div class="bg-[#f7f9f9] rounded-2xl overflow-hidden">
            <div class="py-3 px-4">
                <h2 class="font-extrabold text-lg text-[#0f1419]">Trends for you</h2>
            </div>

            <div v-for="({ title, subtitle, tweetsCount }, index) in trends" :key="index" class="flex justify-between py-3 px-4 cursor-pointer hover:bg-black/5">
                <div>
                    <span class="text-[#536471] text-[13px]">{{ subtitle }}</span>
                    <p class="text-[#0f1419] font-bold">{{ title }}</p>
                    <span class="text-[#536471] text-[13px]">{{ tweetsCount }} Tweets</span>
                </div>

                <div>
                    <EllipsisHorizontalIcon class="h-5 w-5" />
                </div>
            </div>

            <div class="py-3 px-4 cursor-pointer hover:bg-black/5">
                <p class="text-twitter text-sm">Show more</p>
            </div>
        </div>

        <!-- Who to follow -->
        <div class="bg-[#f7f9f9] rounded-2xl overflow-hidden">
            <div class="py-3 px-4">
                <h2 class="font-extrabold text-lg text-[#0f1419]">Who to follow</h2>
            </div>

            <div v-for="({ name, handler, imageSrc }, index) in recommendations" :key="index" class="flex items-center py-3 px-4 cursor-pointer hover:bg-black/5 space-x-3">
                <div class="w-12 h-12">
                    <img class="w-full h-full rounded-full" :src="imageSrc" alt="" />
                </div>
                <div class="flex-1 flex flex-col">
                    <p class="font-bold">{{ name }}</p>
                    <span class="text-[#536471] text-sm">@{{ handler }}</span>
                </div>
                <div>
                    <button class="bg-[#0f1419] min-h-[32px] min-w-[32px] px-4 rounded-full text-sm font-bold text-white">Follow</button>
                </div>
            </div>

            <div class="py-3 px-4 cursor-pointer hover:bg-black/5">
                <p class="text-twitter text-sm">Show more</p>
            </div>
        </div>

        <!-- Footer Links -->
    </div>
</template>
