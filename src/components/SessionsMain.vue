<template>
    <div class="sessions-main">
        <SessionsTable />
        <!-- Add your session-related content here -->
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SessionsTable from './SessionsTable.vue'

const sessions = ref([])
</script>

<style scoped>
.sessions-main {
    padding: 24px;
}
</style>
