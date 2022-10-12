import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/pages/home.vue'),
    },
    {
        path: '/:author/tweet/:tweetID',
        name: 'Tweet',
        component: () => import('@/pages/tweet.vue'),
    },
    {
        path: '/sign-in',
        name: 'Sign In',
        component: () => import('../pages/sign-in.vue'),
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router
