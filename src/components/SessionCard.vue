<template>
    <div class="session-card">
        <div class="card-header">
            <h5>{{ session.day }}</h5>
            <div class="time">{{ formatTime(session) }}</div>
        </div>
        <div class="card-body">
            <p><strong>Parent:</strong> {{ session.parent }}</p>
            <p><strong>Teams:</strong> {{ formatTeams(session.teams) }}</p>
            <p v-if="session.repeatWeekly" class="repeat-info">Repeats Weekly</p>
        </div>
        <div class="card-footer">
            <button @click="$emit('edit', session)" class="btn-secondary">Edit</button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    session: {
        type: Object,
        required: true
    }
});

defineEmits(['edit']);

function formatTime(session) {
    return `${session.start} - ${session.end || 'N/A'}`;
}

function formatTeams(teams) {
    if (!teams || !Array.isArray(teams)) return '';
    return teams.join(', ');
}
</script>

<style scoped>
.session-card {
    background: #2c2c3e;
    border-radius: 12px;
    padding: 0.8rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
}
.session-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(25,118,210,0.25);
}
.card-header {
    border-bottom: 1px solid #444;
    padding-bottom: 0.6rem;
    margin-bottom: 0.6rem;
}
.card-header h5 {
    margin: 0;
    color: #e53935;
    font-size: 0.9rem;
}
.time {
    color: #b0b3c6;
    font-size: 0.75rem;
}
.card-body p {
    font-size: 0.8rem;
    margin: 0.4rem 0;
}
.card-footer {
    margin-top: auto;
    padding-top: 0.6rem;
    text-align: right;
}
.repeat-info {
    font-style: italic;
    color: #91cc75;
}
</style>