<template>
    <div>
        <div class="table-header">
            <h3>Session Calendar</h3>
            <button @click="openAddModal" class="btn-primary">Add Session</button>
        </div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <FullCalendar v-else :options="calendarOptions" />
        <AddSessionModal 
            v-if="showModal" 
            :session="sessionToEdit"
            @close="closeModal" 
            @session-saved="handleSessionSaved"
        />
    </div>
</template>

<style>
/* It's better to import calendar styles in main.js or a global css file */
@import '@fullcalendar/core/main.css';
@import '@fullcalendar/daygrid/main.css';
@import '@fullcalendar/timegrid/main.css';

.table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.table-header h3 {
    margin: 0;
    font-size: 1.5rem;
}

/* Style overrides for FullCalendar to match the dark theme */
:root {
  --fc-bg-color: #23243a;
  --fc-border-color: #444;
  --fc-text-color: #e3e6ee;
  --fc-button-bg-color: #e53935;
  --fc-button-active-bg-color: #1976d2;
  --fc-today-bg-color: rgba(229, 57, 53, 0.2);
}
.fc {
    color: var(--fc-text-color);
}
.fc .fc-toolbar-title {
    color: #e3e6ee;
}
.fc .fc-button {
    background: var(--fc-button-bg-color);
    border: none;
}
.fc .fc-button-primary:not(:disabled).fc-button-active, .fc .fc-button-primary:not(:disabled):active {
    background-color: var(--fc-button-active-bg-color);
}
.fc-daygrid-day.fc-day-today {
    background-color: var(--fc-today-bg-color);
}
.fc-daygrid-day-number {
    color: #b0b3c6;
}
.fc-col-header-cell-cushion {
    color: #e3e6ee;
}
.fc-event {
    background-color: #1976d2;
    border-color: #1976d2;
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import AddSessionModal from './AddSessionModal.vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

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

const calendarOptions = computed(() => ({
    plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
    initialView: 'timeGridWeek',
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: sessions.value.map(session => ({
        id: session.id,
        title: `Teams: ${formatTeams(session.teams)}`,
        start: `${session.date}T${session.start}`,
        end: `${session.date}T${session.end}`,
        extendedProps: {
            ...session
        }
    })),
    eventClick: handleEventClick,
    editable: true,
    droppable: true
}));

function handleEventClick(clickInfo) {
    const session = sessions.value.find(s => s.id === clickInfo.event.id);
    if (session) {
        openEditModal(session);
    }
}

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
