<script setup>
import { onAuthStateChanged } from '@firebase/auth'
import { doc, getDoc } from '@firebase/firestore'
import { useRouter } from 'vue-router'
import { auth, db } from '../firebase'
import { useUser } from './stores/user'

const router = useRouter()
const userStore = useUser()

onAuthStateChanged(auth, async (user) => {
    if (user === null) {
        router.push({
            name: 'Sign In',
        })
        return
    }

    const { displayName, email, photoURL } = user

    const authorRef = doc(db, 'authors', email)
    const authorSnap = await getDoc(authorRef)
    const { handler } = authorSnap.data()

    userStore.user = {
        name: displayName,
        email,
        photoURL,
        handler,
    }
})
</script>

<template>
    <router-view />
</template>
