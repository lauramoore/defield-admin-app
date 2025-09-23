<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <table v-else class="styled-table">
            <thead>
            <tr>
                <th>Day</th>
                <th>Time</th>
                <th>Teams</th>
                <th>Parent</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="session in sessions" :key="session.id">
                <td>{{ session.day }}</td>
                <td>{{ formatTime(session) }}</td>
                <td>{{ formatTeams(session.teams) }}</td>
                <td>{{ session.parent }}</td>
                <td>
                <button @click="openEditModal(session)">Edit</button>
                </td>
            </tr>
            </tbody>
        </table>
        <button @click="openAddModal">Add More</button>
        <AddSessionModal 
            v-if="showModal" 
            :session="sessionToEdit"
            @close="closeModal" 
            @session-saved="handleSessionSaved"
        />
        </div>
    </template>

    <style scoped>
    .styled-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
    }

    .styled-table th, .styled-table td {
        padding: 12px 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        width: 20%;
    }

    .styled-table th {
        background-color: #222;
        color: #fff;
    }

    .styled-table tbody tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    .styled-table tbody tr:nth-child(even) td {
        color: #222;
    }

    .styled-table tbody tr:nth-child(odd) {
        background-color: #444;
    }

    .styled-table tbody tr:nth-child(odd) td {
        color: #fff;
    }
    </style>

<script setup>
import { ref, onMounted } from 'vue'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import AddSessionModal from './AddSessionModal.vue'

// Hardcoded sample data
const sampleSessions = [
    { id: '1', day: 'June 10', date: '2024-06-10', start: '10:00', end: '11:00', duration: '01:00', teams: [1001, 1002], parent: 'John Doe', repeatWeekly: false },
    { id: '2', day: 'June 12', date: '2024-06-12', start: '14:00', end: '15:00', duration: '01:00', teams: [1003, 1004, 1005], parent: 'Jane Smith', repeatWeekly: true },
    { id: '3', day: 'June 14', date: '2024-06-14', start: '16:00', end: '17:00', duration: '01:00', teams: [1002, 1005], parent: 'Alice Brown', repeatWeekly: false },
]

const sessions = ref([])
const loading = ref(true)
const error = ref(null)

const showModal = ref(false)
const sessionToEdit = ref(null)

async function fetchSessions() {
    loading.value = true
    try {
        const db = getFirestore()
        const querySnapshot = await getDocs(collection(db, 'sessions'))
        if (querySnapshot.empty) {
            sessions.value = sampleSessions
        } else {
            sessions.value = querySnapshot.docs.map(doc => {
                const data = doc.data()
                // The sample data has 'day', but the form has 'date'. Let's normalize.
                // A real app would use Timestamps and format them.
                return { 
                    id: doc.id, 
                    day: data.date, // for display consistency
                    ...data 
                }
            })
        }
    } catch (e) {
        console.error("Error fetching sessions: ", e)
        error.value = 'Failed to load sessions. Using sample data.'
        sessions.value = sampleSessions
    } finally {
        loading.value = false
    }
}

onMounted(fetchSessions)

function openAddModal() {
    sessionToEdit.value = null
    showModal.value = true
}

function openEditModal(session) {
    sessionToEdit.value = session
    showModal.value = true
}

function closeModal() {
    showModal.value = false
    sessionToEdit.value = null
}

async function handleSessionSaved() {
    closeModal()
    await fetchSessions() // Re-fetch data to show changes
}

function formatTime(session) {
    // The modal uses duration, but the table shows start/end.
    // This is inconsistent in the original code. I'll stick to start/end for display.
    return `${session.start} - ${session.end || 'N/A'}`
}
function formatTeams(teams) {
    if (!teams || !Array.isArray(teams)) return ''
    return teams.join(', ')
}
</script>
