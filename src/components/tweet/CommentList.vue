<script setup>
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'

const props = defineProps(['comments'])
</script>

<template>
    <div class="hover:bg-black/[0.03] cursor-pointer p-4" v-for="({ author, content }, index) in comments">
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
            </div>
        </div>
    </div>
</template>
