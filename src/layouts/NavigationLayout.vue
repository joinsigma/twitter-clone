<script setup>
import TwitterLogo from '@/components/icons/TwitterLogo.vue'
import NavigationMenu from '@/components/shared/NavigationMenu.vue'
import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/vue/24/outline'
</script>

<template>
    <div class="flex min-h-screen max-w-7xl mx-auto divide-x divide-[#eff3f4]">
        <header class="h-screen md:w-[275px] flex flex-col justify-between px-3 py-2">
            <div class="flex flex-col justify-center">
                <div class="w-[52px] h-[52px] cursor-pointer rounded-full hover:bg-[#1d9bf0]/10 flex justify-center items-center">
                    <TwitterLogo />
                </div>

                <NavigationMenu />

                <div class="hidden md:flex w-[85%] my-2">
                    <button class="bg-twitter hover:bg-[#1a8cd8] flex-1 min-w-[52px] min-h-[52px] px-8 rounded-full text-white font-bold">Tweet</button>
                </div>

                <div class="my-3 mx-1 flex md:hidden justify-center items-center rounded-full p-2 bg-twitter hover:bg-[#1a8cd8] text-white max-w-fit cursor-pointer">
                    <PlusIcon class="h-7 w-7" />
                </div>
            </div>

            <div class="flex items-center hover:bg-[#0f1419]/10 rounded-full cursor-pointer p-3 space-x-3">
                <div class="h-10 w-10">
                    <img class="h-full w-full rounded-full" src="https://yeeqiang.me/avatar.jpeg" alt="" />
                </div>

                <div class="hidden md:block flex-1">
                    <p class="text-[#0f1419] font-bold text-[15px]">Yap Yee Qiang</p>
                    <p class="text-[#536471] text-[15px]">@yapyeeqiang</p>
                </div>

                <div class="hidden md:block">
                    <EllipsisHorizontalIcon class="h-6 w-6" />
                </div>
            </div>
        </header>

        <!-- Middle Content -->
        <main class="flex-1 overflow-y-auto h-screen">
            <slot></slot>
        </main>

        <!-- Right Sidebar -->
        <div class="hidden lg:block overflow-y-auto h-screen w-[375px] px-3 py-2">
            <slot name="sidebar"></slot>
        </div>
    </div>
</template>
