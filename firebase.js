import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCokGL1gl0QBpnFER5PBVhTWeJFNTry48c',
    authDomain: 'twitter-clone-fb023.firebaseapp.com',
    projectId: 'twitter-clone-fb023',
    storageBucket: 'twitter-clone-fb023.appspot.com',
    messagingSenderId: '124023933708',
    appId: '1:124023933708:web:4cb67f468b71c88b065729',
}

const app = initializeApp(firebaseConfig)

// Auth
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

// Firestore
export const db = getFirestore(app)
