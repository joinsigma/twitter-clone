<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { provider } from '../../firebase'

const auth = getAuth()
const router = useRouter()

onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        router.push({
            name: 'Home',
        })
    }
})

async function signIn() {
    try {
        const auth = getAuth()
        const result = await signInWithPopup(auth, provider)
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user

        console.log({ token, user })
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <button @click.prevent="signIn" class="bg-twitter hover:bg-[#1a8cd8] min-w-[52px] min-h-[52px] px-8 rounded-full text-white font-bold">Sign In with Google</button>
    </div>
</template>
