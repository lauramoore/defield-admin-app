<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else class="sessions-grid">
            <SessionCard 
                v-for="session in sessions" 
                :key="session.id"
                :session="session"
                @edit="openEditModal"
            />
        </div>
        <button @click="openAddModal" class="fab">+</button>
        <AddSessionModal 
            v-if="showModal" 
            :session="sessionToEdit"
            @close="closeModal" 
            @session-saved="handleSessionSaved"
        />
    </div>
</template>

<style scoped>
    .sessions-grid {
        display: grid;
        /* For small screens, fit more cards with a smaller gap */
        grid-template-columns: repeat(auto-fill, minmax(115px, 1fr));
        gap: 1rem;
    }

    /* For larger screens (tablets and up), cards can be bigger */
    @media (min-width: 768px) {
        .sessions-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
        }
    }

    .fab {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(90deg, #1976d2 0%, #e53935 100%);
        color: white;
        border: none;
        font-size: 24px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease-in-out;
    }
    .fab:hover {
        transform: scale(1.1);
    }
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import AddSessionModal from './AddSessionModal.vue'
import SessionCard from './SessionCard.vue'

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
</script>
