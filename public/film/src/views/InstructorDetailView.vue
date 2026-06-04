<template>
  <div v-if="ins" class="container ins-detail">
    <div class="hero-block">
      <div class="hero-bg-pattern"></div>
      <img :src="ins.avatar" class="big-avatar" />
      <div class="hero-info">
        <h1>{{ ins.name }}</h1>
        <div class="ins-role">{{ ins.title }}</div>
        <div class="ins-meta">
          <div><i class="fas fa-star"></i> <strong>{{ ins.rating }}</strong> {{ locale === 'tr' ? 'Puan' : 'Rating' }}</div>
          <div><i class="fas fa-users"></i> <strong>{{ formatNum(ins.students) }}</strong> {{ $t('course.students') }}</div>
          <div><i class="fas fa-book"></i> <strong>{{ ins.courses }}</strong> {{ $t('home.courses') }}</div>
        </div>
        <p class="ins-bio">{{ ins.bio }}</p>
      </div>
    </div>

    <h2 class="section-h">{{ locale === 'tr' ? 'Eğitmenin Kursları' : 'Instructor\'s Courses' }}</h2>
    <div class="grid">
      <CourseCard v-for="c in courses" :key="c.id" :course="c" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMainStore } from '../stores'
import CourseCard from '../components/CourseCard.vue'

const route = useRoute()
const store = useMainStore()
const { locale } = useI18n()
const ins = computed(() => store.instructors.find(i => i.id === parseInt(route.params.id)))
const courses = computed(() => store.courses.filter(c => c.instructorId === ins.value?.id))
const formatNum = (n) => n >= 1000 ? (n/1000).toFixed(1)+'K' : n
</script>

<style scoped>
.ins-detail { padding: 40px 24px 80px; }
.hero-block {
  position: relative;
  background: linear-gradient(135deg, #1abc9c 0%, #2c5364 100%);
  color: white;
  border-radius: 24px;
  padding: 50px;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  align-items: center;
  overflow: hidden;
  margin-bottom: 50px;
}
.hero-bg-pattern {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 30px 30px;
}
.big-avatar {
  position: relative;
  width: 200px; height: 200px;
  border-radius: 50%;
  border: 6px solid white;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
.hero-info { position: relative; }
.hero-info h1 { font-size: 36px; font-weight: 800; margin-bottom: 6px; }
.ins-role { font-size: 17px; opacity: 0.95; margin-bottom: 20px; }
.ins-meta { display: flex; gap: 30px; margin-bottom: 20px; flex-wrap: wrap; }
.ins-meta i { color: #fbbf24; margin-right: 6px; }
.ins-meta strong { font-size: 18px; }
.ins-bio { line-height: 1.7; opacity: 0.95; max-width: 700px; }

.section-h {
  font-size: 28px; font-weight: 800;
  color: var(--secondary); margin-bottom: 24px;
}

@media (max-width: 768px) {
  .hero-block { grid-template-columns: 1fr; text-align: center; padding: 30px; }
  .big-avatar { margin: 0 auto; width: 140px; height: 140px; }
  .ins-meta { justify-content: center; }
}
</style>
