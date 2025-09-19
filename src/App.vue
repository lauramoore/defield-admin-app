<template>
    <AuthWidget v-if="!isAuthenticated" />
    <HelloWorld v-else />
</template>

<script>
import HelloWorld from './components/Dashboard.vue'
import AuthWidget from './components/Auth.vue';
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export default {
  name: 'App',
  components: {
    HelloWorld,
    AuthWidget
  },
  setup() {
  const isAuthenticated = ref(false);

    onMounted(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        // Update the value based on the user's login status
        isAuthenticated.value = !!user;
        console.log('Auth state changed. User is authenticated:', isAuthenticated.value);
      });
    });

    return {
      isAuthenticated
    };
  }  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
