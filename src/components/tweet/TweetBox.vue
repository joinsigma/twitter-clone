<script setup>
import { PhotoIcon, GifIcon, ChartBarIcon, FaceSmileIcon, CalendarDaysIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const boxIcons = ref([
    {
        name: 'photo',
        icon: PhotoIcon,
    },
    {
        name: 'gif',
        icon: GifIcon,
    },
    {
        name: 'poll',
        icon: ChartBarIcon,
    },
    {
        name: 'emoji',
        icon: FaceSmileIcon,
    },
    {
        name: 'schedule',
        icon: CalendarDaysIcon,
    },
    {
        name: 'location',
        icon: MapPinIcon,
    },
])
</script>

<template>
    <div class="p-4 flex border-b border-[#eff3f4]">
        <div class="h-12 w-12">
            <img class="h-full w-full rounded-full" src="https://yeeqiang.me/avatar.jpeg" alt="" />
        </div>

        <div class="flex-1 p-3 space-y-6">
            <div class="text-[#0f1419] text-xl">
                <input class="outline-none" type="text" placeholder="What's happening?" />
            </div>

            <div class="flex items-center justify-between">
                <ul class="flex items-center space-x-3">
                    <li v-for="{ name, icon } in boxIcons" :key="name">
                        <component class="h-5 w-5 text-twitter" :is="icon" />
                    </li>
                </ul>

                <button class="bg-twitter px-4 py-2 rounded-full text-white font-bold text-sm">Tweet</button>
            </div>
        </div>
    </div>
</template>
