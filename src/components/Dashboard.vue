<template>
  <div class="hello vibrant-bg">
    <aside class="sidebar">
      <h2 class="sidebar-title">Menu</h2>
      <ul>
        <li>
          <RouterLink
            to="/sessions">Sessions
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/feedback">Feedback
          </RouterLink>
        </li>
      </ul>
    </aside>
    <main class="main-content">
      <h1 class="title">Walton DE Field</h1>
      <keep-alive>
        <RouterView />
      </keep-alive>
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
/* ...styles unchanged... */
</style>
