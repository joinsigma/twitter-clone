import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: () => import('@/pages/home.vue'),
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router
