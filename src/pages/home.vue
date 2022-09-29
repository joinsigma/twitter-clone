<script setup>
import NavigationLayout from '@/layouts/NavigationLayout.vue'
import TweetBox from '../components/tweet/TweetBox.vue'
import TweetList from '../components/tweet/TweetList.vue'
import { SparklesIcon } from '@heroicons/vue/24/outline'
import Sidebar from '../components/home/Sidebar.vue'
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

            <TweetBox />

            <TweetList />
        </template>

        <template #sidebar>
            <Sidebar />
        </template>
    </NavigationLayout>
</template>
