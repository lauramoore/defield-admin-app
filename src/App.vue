<template>
  <AuthWidget v-if="!isAuthenticated" />
  <Dashboard v-else />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AuthWidget from './components/Auth.vue';
import Dashboard from './components/Dashboard.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const isAuthenticated = ref(false);

onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user;
    console.log('Auth state changed. User is authenticated:', isAuthenticated.value);
  });
});
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
