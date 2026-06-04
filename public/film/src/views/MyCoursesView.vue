<template>
  <div class="container my-courses">
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-book-reader"></i> {{ $t('nav.myCourses') }}</h1>
      <p class="page-sub">{{ store.enrolled.length }} {{ locale === 'tr' ? 'kayıtlı kurs' : 'enrolled courses' }}</p>
    </div>

    <div class="stats-cards">
      <div class="stat-card" style="--c: #1abc9c;">
        <div class="sc-icon"><i class="fas fa-book"></i></div>
        <div>
          <div class="sc-num">{{ store.enrolled.length }}</div>
          <div class="sc-label">{{ $t('profile.enrolledCourses') }}</div>
        </div>
      </div>
      <div class="stat-card" style="--c: #27ae60;">
        <div class="sc-icon"><i class="fas fa-check-circle"></i></div>
        <div>
          <div class="sc-num">{{ store.completed.length }}</div>
          <div class="sc-label">{{ $t('profile.completed') }}</div>
        </div>
      </div>
      <div class="stat-card" style="--c: #f39c12;">
        <div class="sc-icon"><i class="fas fa-spinner"></i></div>
        <div>
          <div class="sc-num">{{ store.enrolled.length - store.completed.length }}</div>
          <div class="sc-label">{{ $t('profile.inProgress') }}</div>
        </div>
      </div>
      <div class="stat-card" style="--c: #9b59b6;">
        <div class="sc-icon"><i class="fas fa-clock"></i></div>
        <div>
          <div class="sc-num">{{ totalHours }}</div>
          <div class="sc-label">{{ $t('profile.hours') }}</div>
        </div>
      </div>
    </div>

    <div v-if="store.enrolled.length === 0" class="empty">
      <i class="fas fa-book-open"></i>
      <h2>{{ locale === 'tr' ? 'Henüz kayıtlı kursunuz yok' : 'No enrolled courses yet' }}</h2>
      <p>{{ locale === 'tr' ? 'Hadi harika kurslar keşfet!' : 'Let\'s discover amazing courses!' }}</p>
      <router-link to="/courses" class="btn btn-primary"><i class="fas fa-rocket"></i> {{ $t('home.browseCourses') }}</router-link>
    </div>

    <div v-else class="my-grid">
      <div v-for="c in store.enrolledCourses" :key="c.id" class="my-card">
        <router-link :to="`/courses/${c.id}`" class="my-thumb">
          <img :src="c.thumbnail" />
          <div class="my-overlay"><i class="fas fa-play"></i></div>
        </router-link>
        <div class="my-body">
          <h3>{{ locale === 'tr' ? c.title : c.title_en }}</h3>
          <div class="my-instructor"><i class="fas fa-user"></i> {{ getInstructor(c.instructorId).name }}</div>
          <div class="progress-block">
            <div class="progress-info">
              <span>{{ progressOf(c.id) }}% {{ locale === 'tr' ? 'tamamlandı' : 'completed' }}</span>
              <span v-if="store.completed.includes(c.id)" class="badge badge-primary">✓ {{ locale === 'tr' ? 'Tamamlandı' : 'Completed' }}</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" :style="{width: progressOf(c.id)+'%'}"></div></div>
          </div>
          <div class="my-actions">
            <router-link :to="`/courses/${c.id}`" class="btn btn-primary">
              <i class="fas fa-play"></i> {{ store.completed.includes(c.id) ? (locale==='tr'?'Tekrar İzle':'Watch Again') : (locale==='tr'?'Devam Et':'Continue') }}
            </router-link>
            <button v-if="!store.completed.includes(c.id)" class="btn btn-outline" @click="markComplete(c.id)">
              <i class="fas fa-check"></i> {{ locale === 'tr' ? 'Tamamla' : 'Complete' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMainStore } from '../stores'

const store = useMainStore()
const { locale } = useI18n()

const totalHours = computed(() => store.enrolledCourses.reduce((s,c) => s + c.hours, 0))
const getInstructor = (id) => store.instructors.find(i => i.id === id) || store.instructors[0]
const progressOf = (id) => {
  if (store.completed.includes(id)) return 100
  return store.progress[id] ?? Math.floor(Math.random() * 80) + 10
}
const markComplete = (id) => {
  store.completeCourse(id)
  store.updateProgress(id, 100)
}
</script>

<style scoped>
.my-courses { padding: 40px 24px 80px; }
.page-header { margin-bottom: 32px; }
.page-title {
  font-size: 36px; font-weight: 800;
  color: var(--secondary);
  display: flex; align-items: center; gap: 14px;
}
.page-title i { color: var(--primary); }
.page-sub { color: var(--text-soft); margin-top: 8px; }

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px; margin-bottom: 40px;
}
.stat-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  display: flex; align-items: center; gap: 16px;
  border-left: 4px solid var(--c);
  transition: all 0.3s;
}
.stat-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
.sc-icon {
  width: 50px; height: 50px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--c) 15%, white);
  color: var(--c);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
}
.sc-num { font-size: 28px; font-weight: 800; color: var(--secondary); }
.sc-label { font-size: 13px; color: var(--text-soft); }

.empty {
  text-align: center; padding: 80px 20px;
  background: white; border-radius: 20px;
}
.empty i { font-size: 60px; color: var(--primary); opacity: 0.3; margin-bottom: 20px; }
.empty h2 { color: var(--secondary); margin-bottom: 8px; }
.empty p { color: var(--text-soft); margin-bottom: 24px; }

.my-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}
.my-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.4s;
  display: flex; flex-direction: column;
}
.my-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
.my-thumb { position: relative; aspect-ratio: 16/9; }
.my-thumb img { width: 100%; height: 100%; object-fit: cover; }
.my-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 30px;
  opacity: 0; transition: opacity 0.3s;
}
.my-thumb:hover .my-overlay { opacity: 1; }

.my-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
.my-body h3 {
  font-size: 17px; font-weight: 700;
  color: var(--secondary); margin-bottom: 8px;
  line-height: 1.4;
}
.my-instructor {
  font-size: 13px; color: var(--text-soft);
  margin-bottom: 16px;
}
.my-instructor i { margin-right: 6px; color: var(--primary); }

.progress-block { margin-bottom: 16px; }
.progress-info {
  display: flex; justify-content: space-between;
  font-size: 13px; margin-bottom: 8px;
  color: var(--text-soft);
}
.progress-bar {
  height: 8px; background: var(--bg-muted);
  border-radius: 4px; overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--gradient);
  border-radius: 4px;
  transition: width 0.6s;
}
.my-actions {
  display: flex; gap: 8px;
  margin-top: auto;
}
.my-actions .btn { flex: 1; justify-content: center; padding: 10px; font-size: 14px; }
</style>
