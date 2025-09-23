<template>
  <div class="hello vibrant-bg">
    <aside class="sidebar">
      <h2 class="sidebar-title">Menu</h2>
      <ul>
        <li>
          <a
            href="#"
            @click.prevent="activeSection = 'sessions'"
            :class="{ 'active-menu': activeSection === 'sessions' }"
          >Sessions</a>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="activeSection = 'feedback'"
            :class="{ 'active-menu': activeSection === 'feedback' }"
          >Feedback</a>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="activeSection = 'communications'"
            :class="{ 'active-menu': activeSection === 'communications' }"
          >Communications</a>
        </li>
      </ul>
    </aside>
    <main class="main-content">
      <h1 class="title">Walton DE Field</h1>
      <keep-alive>
        <component :is="currentComponent" />
      </keep-alive>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SessionsMain from './SessionsMain.vue'
import FeedbackMain from './FeedbackMain.vue'
import CommunicationsMain from './CommunicationsMain.vue'

const activeSection = ref('sessions')

const currentComponent = computed(() => {
  if (activeSection.value === 'sessions') return SessionsMain
  if (activeSection.value === 'feedback') return FeedbackMain
  if (activeSection.value === 'communications') return CommunicationsMain
  return SessionsMain
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;500&display=swap');

/* ...styles unchanged... */
.hello {
  display: flex;
  min-height: 100vh;
  font-family: 'Roboto', Arial, sans-serif;
  background: linear-gradient(135deg, #181a2a 0%, #23243a 100%);
  color: #e3e6ee;
  transition: background 0.4s;
}

.sidebar {
  width: 260px;
  background: rgba(24, 26, 42, 0.92);
  backdrop-filter: blur(8px);
  padding: 2rem 1.5rem;
  box-shadow: 2px 0 16px rgba(24, 26, 42, 0.18);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: background 0.3s;
}

.sidebar-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  letter-spacing: 2px;
  color: #e53935;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

.sidebar li {
  margin-bottom: 1.2rem;
}

.sidebar a {
  color: #e3e6ee;
  font-weight: 500;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
}
.active-menu {
  background: linear-gradient(90deg, #1976d2 0%, #e53935 100%);
  color: #fff;
  box-shadow: 0 4px 16px rgba(25,118,210,0.2);
}
.sidebar a:hover {
  background: linear-gradient(90deg, #1976d2 0%, #e53935 100%);
  color: #fff;
}

.main-content {
  flex: 1;
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: rgba(24,26,42,0.85);
  min-height: 100vh;
}

.title {
  font-family: 'Montserrat', sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  color: #e3e6ee;
  letter-spacing: 1.5px;
  text-shadow: 0 2px 8px rgba(24,26,42,0.3);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  width: 100%;
}

.card {
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(24,26,42,0.18);
  padding: 2rem 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
  background: #23243a;
  color: #e3e6ee;
}

.card h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.card p {
  font-size: 1.1rem;
  font-weight: 400;
  color: #b0b3c6;
}

.session-card {
  background: linear-gradient(120deg, #1976d2 0%, #283593 100%);
  color: #fff;
  box-shadow: 0 6px 32px rgba(25,118,210,0.18);
}

.feedback-card {
  background: linear-gradient(120deg, #e53935 0%, #b71c1c 100%);
  color: #fff;
  box-shadow: 0 6px 32px rgba(229,57,53,0.18);
}

.welcome-card {
  background: linear-gradient(120deg, #283593 0%, #1976d2 100%);
  color: #fff;
  box-shadow: 0 6px 32px rgba(40,53,147,0.18);
}

.card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 12px 40px rgba(25,118,210,0.28);
  z-index: 2;
}

@media (max-width: 900px) {
  .main-content {
    padding: 2rem 1rem;
  }
  .sidebar {
    width: 180px;
    padding: 1.2rem 0.7rem;
  }
  .title {
    font-size: 2rem;
  }
  .card-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
}

::-webkit-scrollbar {
  width: 8px;
  background: #23243a;
}
::-webkit-scrollbar-thumb {
  background: #1976d2;
  border-radius: 8px;
}
</style>
