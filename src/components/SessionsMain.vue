<template>
    <div class="sessions-main">
        <SessionsView />
        <!-- Add your session-related content here -->
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SessionsView from './SessionsView.vue'

const sessions = ref([])
</script>

<style scoped>
.sessions-main {
    padding: 24px;
}
</style>
