<script setup>
import { HomeIcon as OHomeIcon, HashtagIcon as OHashtagIcon, BellIcon as OBellIcon, EnvelopeIcon as OEnvelopeIcon, UserIcon as OUserIcon, EllipsisHorizontalCircleIcon as OEllipsisHorizontalCircleIcon } from '@heroicons/vue/24/outline'
import { HomeIcon as SHomeIcon, HashtagIcon as SHashtagIcon, BellIcon as SBellIcon, EnvelopeIcon as SEnvelopeIcon, UserIcon as SUserIcon, EllipsisHorizontalCircleIcon as SEllipsisHorizontalCircleIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menus = ref([
    {
        icon: {
            outline: OHomeIcon,
            solid: SHomeIcon,
        },
        name: 'Home',
        href: '/home',
        current: true,
    },
    {
        icon: {
            outline: OHashtagIcon,
            solid: SHashtagIcon,
        },
        name: 'Explore',
        href: '#',
        current: false,
    },
    {
        icon: {
            outline: OBellIcon,
            solid: SBellIcon,
        },
        name: 'Notifications',
        href: '#',
        current: false,
    },
    {
        icon: {
            outline: OEnvelopeIcon,
            solid: SEnvelopeIcon,
        },
        name: 'Messages',
        href: '#',
        current: false,
    },
    {
        icon: {
            outline: OUserIcon,
            solid: SUserIcon,
        },
        name: 'Profile',
        href: '#',
        current: false,
    },
    {
        icon: {
            outline: OEllipsisHorizontalCircleIcon,
            solid: SEllipsisHorizontalCircleIcon,
        },
        name: 'More',
        href: '#',
        current: false,
    },
])

const navigateTo = ({ name, href }) => {
    menus.value = menus.value.map((menu) => ({ ...menu, current: menu.name === name }))

    if (href === '#') return
    router.push(href)
}
</script>

<template>
    <nav>
        <div :key="index" v-for="({ name, icon, href, current }, index) in menus" @click="navigateTo({ name, href })" class="flex justify-center items-center rounded-full p-3 hover:bg-[#0f1419]/10 max-w-fit cursor-pointer">
            <component class="w-7 h-7" :is="icon[current ? 'solid' : 'outline']" />
            <div class="ml-5 mr-4 text-lg">
                <p :class="[current && 'font-bold']">{{ name }}</p>
            </div>
        </div>
    </nav>
</template>
