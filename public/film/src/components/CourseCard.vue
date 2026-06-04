<template>
  <router-link :to="`/courses/${course.id}`" class="course-card card">
    <div class="thumb">
      <img :src="course.thumbnail" :alt="course.title" loading="lazy" />
      <div class="thumb-overlay">
        <div class="play-btn"><i class="fas fa-play"></i></div>
      </div>
      <div class="badges">
        <span v-if="course.bestseller" class="badge badge-warning"><i class="fas fa-fire"></i> {{ $t('course.bestseller') }}</span>
        <span v-if="course.isNew" class="badge badge-primary"><i class="fas fa-bolt"></i> {{ $t('course.new') }}</span>
      </div>
    </div>
    <div class="body">
      <div class="cat-row">
        <span class="cat-tag" :style="{ background: catGradient }">
          <i :class="['fas', cat.icon]"></i> {{ locale === 'tr' ? cat.tr : cat.en }}
        </span>
      </div>
      <h3 class="title">{{ locale === 'tr' ? course.title : course.title_en }}</h3>
      <div class="instructor">
        <img :src="instructor.avatar" />
        <span>{{ instructor.name }}</span>
      </div>
      <div class="meta">
        <span class="rating">
          <i class="fas fa-star"></i>
          <strong>{{ course.rating }}</strong>
          <small>({{ formatNum(course.ratingCount) }})</small>
        </span>
        <span class="meta-item"><i class="fas fa-users"></i> {{ formatNum(course.students) }}</span>
        <span class="meta-item"><i class="fas fa-clock"></i> {{ course.hours }}h</span>
      </div>
      <div class="card-footer">
        <div class="price-row">
          <span class="price">₺{{ course.price }}</span>
          <span class="old-price">₺{{ course.oldPrice }}</span>
        </div>
        <span class="level-badge">{{ $t(`course.${course.level}`) }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMainStore } from '../stores'
import { categories } from '../data/categories.js'

const props = defineProps({ course: Object })
const { locale } = useI18n()
const store = useMainStore()

const cat = computed(() => categories.find(c => c.id === props.course.category) || categories[0])
const catGradient = computed(() => cat.value.gradient)
const instructor = computed(() => store.instructors.find(i => i.id === props.course.instructorId) || store.instructors[0])
const formatNum = (n) => n >= 1000 ? (n/1000).toFixed(1)+'K' : n
</script>

<style scoped>
.course-card {
  display: flex; flex-direction: column;
  cursor: pointer; height: 100%;
  animation: fadeIn 0.5s ease-out;
}
.thumb {
  position: relative; aspect-ratio: 16/10;
  overflow: hidden;
}
.thumb img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.course-card:hover .thumb img { transform: scale(1.1); }
.thumb-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%);
  opacity: 0; transition: opacity 0.3s;
  display: flex; align-items: center; justify-content: center;
}
.course-card:hover .thumb-overlay { opacity: 1; }
.play-btn {
  width: 60px; height: 60px;
  background: white; color: var(--primary);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  transform: scale(0.8);
  transition: transform 0.3s;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}
.course-card:hover .play-btn { transform: scale(1); }
.badges {
  position: absolute; top: 12px; left: 12px;
  display: flex; gap: 6px; flex-wrap: wrap;
}
.badges .badge { backdrop-filter: blur(8px); }

.body { padding: 18px; flex: 1; display: flex; flex-direction: column; }
.cat-row { margin-bottom: 12px; }
.cat-tag {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 10px; border-radius: 20px;
  color: white; font-size: 11px; font-weight: 600;
}
.title {
  font-size: 16px; font-weight: 700;
  line-height: 1.4; margin-bottom: 12px;
  color: var(--secondary);
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
  min-height: 44px;
}
.instructor {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 12px;
  font-size: 13px; color: var(--text-soft);
}
.instructor img {
  width: 24px; height: 24px; border-radius: 50%;
}
.meta {
  display: flex; align-items: center; gap: 12px;
  font-size: 12px; color: var(--text-soft);
  margin-bottom: 12px; flex-wrap: wrap;
}
.rating {
  display: flex; align-items: center; gap: 4px;
}
.rating i { color: #fbbf24; }
.rating strong { color: var(--text); }
.meta-item { display: flex; align-items: center; gap: 4px; }
.card-footer {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: auto; padding-top: 12px;
  border-top: 1px solid var(--border);
}
.price-row { display: flex; align-items: baseline; gap: 8px; }
.price {
  font-size: 20px; font-weight: 800;
  color: var(--primary-dark);
}
.old-price {
  font-size: 13px; color: var(--text-muted);
  text-decoration: line-through;
}
.level-badge {
  font-size: 11px; font-weight: 600;
  padding: 4px 8px; border-radius: 6px;
  background: var(--bg-soft); color: var(--text-soft);
}
</style>
