<template>
  <div class="container instructors">
    <div class="page-header">
      <h1 class="page-title">{{ $t('nav.instructors') }} 👨‍🏫</h1>
      <p class="page-sub">{{ locale === 'tr' ? 'Dünya çapında uzman eğitmenler' : 'World-class expert instructors' }}</p>
    </div>
    <div class="ins-grid">
      <router-link v-for="(ins,i) in store.instructors" :key="ins.id"
        :to="`/instructors/${ins.id}`" class="ins-card scale-in"
        :style="{ animationDelay: `${i*0.05}s` }">
        <div class="ins-bg"></div>
        <img :src="ins.avatar" class="ins-avatar" />
        <h3>{{ ins.name }}</h3>
        <div class="ins-title">{{ ins.title }}</div>
        <div class="ins-meta">
          <div><i class="fas fa-star"></i> {{ ins.rating }}</div>
          <div><i class="fas fa-users"></i> {{ formatNum(ins.students) }}</div>
          <div><i class="fas fa-book"></i> {{ ins.courses }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useMainStore } from '../stores'
const store = useMainStore()
const { locale } = useI18n()
const formatNum = (n) => n >= 1000 ? (n/1000).toFixed(1)+'K' : n
</script>

<style scoped>
.instructors { padding: 40px 24px 80px; }
.page-header { text-align: center; margin-bottom: 50px; }
.page-title {
  font-size: 40px; font-weight: 800;
  background: var(--gradient-2);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.page-sub { color: var(--text-soft); margin-top: 8px; font-size: 17px; }

.ins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}
.ins-card {
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 80px 24px 24px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all 0.4s;
  animation: scaleIn 0.5s ease backwards;
}
.ins-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}
.ins-bg {
  position: absolute; top: 0; left: 0; right: 0; height: 100px;
  background: var(--gradient-2);
}
.ins-bg::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2) 1px, transparent 1px);
  background-size: 20px 20px;
}
.ins-avatar {
  position: relative;
  width: 110px; height: 110px;
  border-radius: 50%;
  border: 5px solid white;
  margin: -50px auto 16px;
  display: block;
  box-shadow: var(--shadow);
  transition: transform 0.3s;
}
.ins-card:hover .ins-avatar { transform: scale(1.05); }
.ins-card h3 { font-size: 18px; color: var(--secondary); margin-bottom: 4px; }
.ins-title {
  font-size: 13px; color: var(--primary);
  font-weight: 600; margin-bottom: 16px;
}
.ins-meta {
  display: flex; justify-content: space-around;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  font-size: 13px; color: var(--text-soft);
}
.ins-meta i { color: var(--accent); margin-right: 4px; }
</style>
