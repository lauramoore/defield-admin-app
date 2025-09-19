<template>
    <div class="feedback-main">
        <h1>Feedback Main</h1>
        <!-- Add your feedback-related content here -->
    </div>
</template>

<script>
import { ref } from 'vue'

// Example state
export default {
  name: 'FeedbackMain',
  props: {},
  setup() {
    const feedback = ref([])
    return {
      feedback
    }
  }
}
</script>

<style scoped>
.feedback-main {
    padding: 24px;
}
</style>