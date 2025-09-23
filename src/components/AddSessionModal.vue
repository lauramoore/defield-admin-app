<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content">
            <h2>Add New Session</h2>
            <form @submit.prevent="addSession">
                <div class="form-group">
                    <label for="session-date">Date:</label>
                    <input type="date" id="session-date" v-model="sessionDate" required />
                </div>

                <div class="form-group">
                    <label for="start-time">Start Time:</label>
                    <input type="time" id="start-time" v-model="startTime" required />
                </div>

                <div class="form-group">
                    <label for="end-time">Duration:</label>
                    <input type="time" id="end-time" v-model="duration" required />
                </div>


                <div class="form-group">
                    <label for="repeat-weekly">Repeat Weekly:</label>
                    <input type="checkbox" id="repeat-weekly" v-model="repeatWeekly" />
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-primary">Add Session</button>
                    <button type="button" class="btn-secondary" @click="$emit('close')">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const emit = defineEmits(['close'])

const sessionDate = ref('')
const startTime = ref('')
const duration = ref('')
</script>