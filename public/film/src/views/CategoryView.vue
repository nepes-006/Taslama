<template>
  <div v-if="cat" class="container category-view">
    <div class="cat-hero" :style="{ background: cat.gradient }">
      <i :class="['fas', cat.icon]"></i>
      <h1>{{ locale === 'tr' ? cat.tr : cat.en }}</h1>
      <p>{{ courses.length }} {{ $t('home.courses').toLowerCase() }}</p>
    </div>
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
import { categories } from '../data/categories.js'
import CourseCard from '../components/CourseCard.vue'

const route = useRoute()
const store = useMainStore()
const { locale } = useI18n()
const cat = computed(() => categories.find(c => c.id === route.params.id))
const courses = computed(() => store.courses.filter(c => c.category === route.params.id))
</script>

<style scoped>
.category-view { padding: 40px 24px 80px; }
.cat-hero {
  border-radius: 24px;
  padding: 50px;
  text-align: center;
  color: white;
  margin-bottom: 40px;
  position: relative; overflow: hidden;
}
.cat-hero::before {
  content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 30px 30px;
}
.cat-hero > * { position: relative; }
.cat-hero i { font-size: 60px; margin-bottom: 20px; animation: bounce 2s ease-in-out infinite; }
.cat-hero h1 { font-size: 42px; font-weight: 800; margin-bottom: 8px; }
.cat-hero p { font-size: 17px; opacity: 0.95; }
</style>
