import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
const firebaseConfig = {
    apiKey: 'fake-api-key',
    authDomain: 'localhost',
    projectId: 'defield-firebase',
    storageBucket: 'defield-firebase.appspot.com',
    messagingSenderId: '1234567890',
    appId: '1:1234567890:web:abcdef123456'
}
// Use Firebase emulators in development

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
// Check for a local environment to avoid connecting to the emulator in production
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
}
const firestore = getFirestore(app);
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(firestore, "localhost", 8081);
}
const functions = getFunctions(app);
if (window.location.hostname === "localhost") {
  connectFunctionsEmulator(functions, "localhost", 5001);
}
const vueApp = createApp(App)
vueApp.use(router);
vueApp.provide('auth', auth);
vueApp.provide('db', firestore);
vueApp.provide('functions', functions);
// Make Firebase services available globally to all components.
// This is a convenient way to access `auth` and `db` without prop drilling.
vueApp.mount('#app')
