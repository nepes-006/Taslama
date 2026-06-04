<template>
  <div v-if="course" class="course-detail">
    <div class="detail-hero">
      <div class="container detail-hero-inner">
        <div class="breadcrumb">
          <router-link to="/">{{ $t('nav.home') }}</router-link>
          <i class="fas fa-chevron-right"></i>
          <router-link to="/courses">{{ $t('nav.courses') }}</router-link>
          <i class="fas fa-chevron-right"></i>
          <span>{{ locale === 'tr' ? cat.tr : cat.en }}</span>
        </div>
        <div class="detail-grid">
          <div class="detail-info">
            <span class="cat-tag" :style="{ background: cat.gradient }">
              <i :class="['fas', cat.icon]"></i> {{ locale === 'tr' ? cat.tr : cat.en }}
            </span>
            <h1 class="detail-title">{{ locale === 'tr' ? course.title : course.title_en }}</h1>
            <p class="detail-desc">{{ course.description }}</p>
            <div class="detail-meta">
              <span class="meta-item"><i class="fas fa-star"></i> <strong>{{ course.rating }}</strong> ({{ course.ratingCount }} {{ $t('course.reviews').toLowerCase() }})</span>
              <span class="meta-item"><i class="fas fa-users"></i> {{ formatNum(course.students) }} {{ $t('course.students') }}</span>
              <span class="meta-item"><i class="fas fa-signal"></i> {{ $t(`course.${course.level}`) }}</span>
              <span class="meta-item"><i class="fas fa-globe"></i> Türkçe / English</span>
            </div>
            <div class="detail-instructor">
              <img :src="instructor.avatar" />
              <div>
                <div class="ins-label">{{ $t('course.instructor') }}</div>
                <div class="ins-name">{{ instructor.name }}</div>
              </div>
            </div>
          </div>
          <div class="detail-card">
            <div class="video-wrapper" @click="playVideo">
              <video v-if="playing" :src="course.videoUrl" controls autoplay></video>
              <template v-else>
                <img :src="course.thumbnail" />
                <div class="video-play"><i class="fas fa-play"></i></div>
                <div class="preview-label">{{ $t('course.preview') }}</div>
              </template>
            </div>
            <div class="card-body">
              <div class="price-block">
                <span class="price-big">₺{{ course.price }}</span>
                <span class="price-old">₺{{ course.oldPrice }}</span>
                <span class="discount">%{{ Math.round((1-course.price/course.oldPrice)*100) }}</span>
              </div>
              <button v-if="!isEnrolled" class="btn btn-primary btn-block" @click="enroll">
                <i class="fas fa-bolt"></i> {{ $t('course.enroll') }}
              </button>
              <router-link v-else :to="`/my-courses`" class="btn btn-primary btn-block">
                <i class="fas fa-check"></i> {{ locale === 'tr' ? 'Kursa Git' : 'Go to Course' }}
              </router-link>
              <button v-if="!isEnrolled" class="btn btn-outline btn-block" @click="addCart">
                <i class="fas fa-shopping-cart"></i> {{ inCart ? (locale==='tr'?'Sepette':'In Cart') : $t('course.addCart') }}
              </button>
              <ul class="features-list">
                <li><i class="fas fa-clock"></i> {{ course.hours }} {{ $t('course.hours') }}</li>
                <li><i class="fas fa-play-circle"></i> {{ course.lessons }} {{ $t('course.lessons') }}</li>
                <li><i class="fas fa-mobile-alt"></i> {{ locale === 'tr' ? 'Mobil ve TV erişimi' : 'Mobile & TV access' }}</li>
                <li><i class="fas fa-infinity"></i> {{ locale === 'tr' ? 'Ömür boyu erişim' : 'Lifetime access' }}</li>
                <li><i class="fas fa-certificate"></i> {{ locale === 'tr' ? 'Tamamlama sertifikası' : 'Certificate of completion' }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container detail-body">
      <div class="tabs">
        <button v-for="t in tabs" :key="t.key" class="tab" :class="{active: tab === t.key}" @click="tab = t.key">
          <i :class="['fas', t.icon]"></i> {{ t.label }}
        </button>
      </div>

      <div v-if="tab === 'overview'" class="tab-content fade-in">
        <h2><i class="fas fa-bullseye"></i> {{ $t('course.whatLearn') }}</h2>
        <div class="learn-grid">
          <div v-for="(l,i) in course.whatLearn" :key="i" class="learn-item">
            <i class="fas fa-check"></i> {{ l }}
          </div>
        </div>
        <h2><i class="fas fa-info-circle"></i> {{ $t('course.about') }}</h2>
        <p class="about-text">{{ course.description }} {{ locale === 'tr' ? 'Bu kapsamlı kurs, sıfırdan başlayarak uzman seviyesine kadar ilerlemenizi sağlayacak şekilde tasarlanmıştır. Pratik projeler, gerçek dünya örnekleri ve uzman eğitmenler ile başarıya ulaşacaksınız.' : 'This comprehensive course is designed to take you from beginner to expert level. With practical projects, real-world examples and expert instructors, you will achieve success.' }}</p>
        <h2><i class="fas fa-list-check"></i> {{ $t('course.requirements') }}</h2>
        <ul class="requirements">
          <li v-for="(r,i) in course.requirements" :key="i"><i class="fas fa-circle-dot"></i> {{ r }}</li>
        </ul>
      </div>

      <div v-if="tab === 'curriculum'" class="tab-content fade-in">
        <h2><i class="fas fa-list"></i> {{ $t('course.curriculum') }}</h2>
        <div class="curriculum">
          <div v-for="(s,i) in course.curriculum" :key="i" class="curr-section">
            <div class="curr-header" @click="toggle(i)">
              <div>
                <i :class="['fas', open[i] ? 'fa-chevron-down' : 'fa-chevron-right']"></i>
                <strong>{{ s.title }}</strong>
              </div>
              <span class="curr-count">{{ s.lessons.length }} {{ $t('course.lessons') }}</span>
            </div>
            <transition name="expand">
              <div v-if="open[i]" class="curr-lessons">
                <div v-for="(l,j) in s.lessons" :key="j" class="lesson-item">
                  <i class="fas fa-play-circle"></i>
                  <span>{{ l.title }}</span>
                  <span class="lesson-time">{{ l.duration }}</span>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div v-if="tab === 'instructor'" class="tab-content fade-in">
        <div class="instructor-block">
          <img :src="instructor.avatar" class="ins-big" />
          <div>
            <h2>{{ instructor.name }}</h2>
            <div class="ins-title">{{ instructor.title }}</div>
            <div class="ins-stats">
              <span><i class="fas fa-star"></i> {{ instructor.rating }} {{ locale === 'tr' ? 'Puan' : 'Rating' }}</span>
              <span><i class="fas fa-users"></i> {{ formatNum(instructor.students) }} {{ $t('course.students') }}</span>
              <span><i class="fas fa-book"></i> {{ instructor.courses }} {{ $t('home.courses') }}</span>
            </div>
            <p>{{ instructor.bio }}</p>
            <router-link :to="`/instructors/${instructor.id}`" class="btn btn-outline">
              {{ locale === 'tr' ? 'Profili Gör' : 'View Profile' }}
            </router-link>
          </div>
        </div>
      </div>

      <div v-if="tab === 'reviews'" class="tab-content fade-in">
        <div class="rating-summary">
          <div class="rating-big">
            <div class="big-num">{{ course.rating }}</div>
            <div class="stars">
              <i v-for="n in 5" :key="n" class="fas fa-star"></i>
            </div>
            <div>{{ course.ratingCount }} {{ $t('course.reviews').toLowerCase() }}</div>
          </div>
          <div class="rating-bars">
            <div v-for="n in 5" :key="n" class="rating-bar-row">
              <span>{{ 6-n }} <i class="fas fa-star"></i></span>
              <div class="bar"><div class="bar-fill" :style="{width: [70,20,7,2,1][n-1]+'%'}"></div></div>
              <span>{{ [70,20,7,2,1][n-1] }}%</span>
            </div>
          </div>
        </div>
        <div class="reviews-list">
          <div v-for="(r,i) in course.reviews" :key="i" class="review-item">
            <img :src="r.avatar" />
            <div class="review-content">
              <div class="review-header">
                <strong>{{ r.name }}</strong>
                <span class="review-date">{{ r.date }}</span>
              </div>
              <div class="stars">
                <i v-for="n in 5" :key="n" :class="['fas fa-star', {empty: n > r.rating}]"></i>
              </div>
              <p>{{ r.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMainStore } from '../stores'
import { categories } from '../data/categories.js'

const route = useRoute()
const router = useRouter()
const store = useMainStore()
const { locale, t } = useI18n()

const course = computed(() => store.courses.find(c => c.id === parseInt(route.params.id)))
const cat = computed(() => categories.find(c => c.id === course.value?.category) || categories[0])
const instructor = computed(() => store.instructors.find(i => i.id === course.value?.instructorId) || store.instructors[0])
const isEnrolled = computed(() => store.enrolled.includes(course.value?.id))
const inCart = computed(() => store.cart.find(c => c.id === course.value?.id))

const tab = ref('overview')
const tabs = computed(() => [
  { key: 'overview', label: t('course.about'), icon: 'fa-info-circle' },
  { key: 'curriculum', label: t('course.curriculum'), icon: 'fa-list' },
  { key: 'instructor', label: t('course.instructor'), icon: 'fa-user' },
  { key: 'reviews', label: t('course.reviews'), icon: 'fa-comment' }
])
const open = ref({0: true})
const playing = ref(false)
const toggle = (i) => { open.value[i] = !open.value[i] }
const playVideo = () => { playing.value = true }
const formatNum = (n) => n >= 1000 ? (n/1000).toFixed(1)+'K' : n

const enroll = () => {
  if (!store.isLoggedIn) { router.push('/login'); return }
  store.enroll(course.value.id)
  alert(locale.value === 'tr' ? '✅ Kursa başarıyla kaydoldunuz!' : '✅ Successfully enrolled!')
}
const addCart = () => {
  if (!store.isLoggedIn) { router.push('/login'); return }
  store.addToCart(course.value)
}
</script>

<style scoped>
.detail-hero {
  background: linear-gradient(135deg, #2c5364 0%, #1abc9c 100%);
  color: white; padding: 40px 0 60px;
}
.breadcrumb {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; opacity: 0.9; margin-bottom: 24px;
}
.breadcrumb a:hover { text-decoration: underline; }
.breadcrumb i { font-size: 10px; }

.detail-grid {
  display: grid; grid-template-columns: 1.5fr 1fr;
  gap: 40px;
}
.cat-tag {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 30px;
  font-size: 13px; font-weight: 600;
  margin-bottom: 16px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(8px);
}
.detail-title {
  font-size: 36px; font-weight: 800;
  line-height: 1.2; margin-bottom: 16px;
}
.detail-desc { font-size: 16px; opacity: 0.95; margin-bottom: 20px; line-height: 1.6; }
.detail-meta {
  display: flex; gap: 20px; flex-wrap: wrap;
  margin-bottom: 24px; font-size: 14px;
}
.meta-item i { margin-right: 6px; color: #fbbf24; }
.detail-instructor {
  display: flex; align-items: center; gap: 12px;
  padding: 14px;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  width: fit-content;
}
.detail-instructor img {
  width: 50px; height: 50px; border-radius: 50%;
  border: 2px solid white;
}
.ins-label { font-size: 12px; opacity: 0.8; }
.ins-name { font-weight: 700; }

.detail-card {
  background: white; color: var(--text);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  align-self: start;
}
.video-wrapper {
  position: relative; aspect-ratio: 16/9;
  cursor: pointer; overflow: hidden;
  background: #000;
}
.video-wrapper img, .video-wrapper video { width: 100%; height: 100%; object-fit: cover; }
.video-play {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.4);
  transition: background 0.3s;
}
.video-play i {
  width: 70px; height: 70px;
  background: white; color: var(--primary);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; padding-left: 4px;
  animation: pulse 2s ease infinite;
}
.preview-label {
  position: absolute; top: 12px; left: 12px;
  background: rgba(0,0,0,0.6);
  color: white; padding: 6px 12px;
  border-radius: 20px; font-size: 12px;
}
.card-body { padding: 24px; }
.price-block {
  display: flex; align-items: baseline; gap: 12px;
  margin-bottom: 20px;
}
.price-big { font-size: 36px; font-weight: 800; color: var(--primary-dark); }
.price-old {
  font-size: 16px; color: var(--text-muted);
  text-decoration: line-through;
}
.discount {
  background: var(--accent-2); color: white;
  padding: 4px 10px; border-radius: 20px;
  font-size: 12px; font-weight: 700;
}
.btn-block { display: flex; width: 100%; justify-content: center; margin-bottom: 12px; }
.features-list {
  list-style: none; padding-top: 16px;
  border-top: 1px solid var(--border);
  margin-top: 16px;
}
.features-list li {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 0; font-size: 14px;
  color: var(--text-soft);
}
.features-list i { color: var(--primary); width: 20px; }

.detail-body { padding: 40px 24px; }
.tabs {
  display: flex; gap: 4px;
  border-bottom: 2px solid var(--border);
  margin-bottom: 32px; overflow-x: auto;
}
.tab {
  padding: 14px 24px;
  font-weight: 600; color: var(--text-soft);
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s;
  white-space: nowrap;
}
.tab:hover { color: var(--primary); }
.tab.active { color: var(--primary-dark); border-color: var(--primary); }
.tab-content h2 {
  font-size: 24px; font-weight: 700;
  margin: 24px 0 16px; color: var(--secondary);
  display: flex; align-items: center; gap: 10px;
}
.tab-content h2 i { color: var(--primary); }
.about-text { line-height: 1.8; color: var(--text-soft); margin-bottom: 24px; }

.learn-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px; margin-bottom: 24px;
}
.learn-item {
  display: flex; gap: 10px; padding: 14px;
  background: var(--bg-soft); border-radius: 10px;
}
.learn-item i { color: var(--primary); margin-top: 4px; }
.requirements { list-style: none; margin-bottom: 24px; }
.requirements li {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 0; color: var(--text-soft);
}
.requirements i { color: var(--primary); font-size: 8px; }

.curr-section {
  background: white;
  border: 1px solid var(--border);
  border-radius: 12px;
  margin-bottom: 12px; overflow: hidden;
}
.curr-header {
  padding: 18px 20px; cursor: pointer;
  display: flex; justify-content: space-between; align-items: center;
  background: var(--bg-soft);
  transition: background 0.2s;
}
.curr-header:hover { background: var(--bg-muted); }
.curr-header > div { display: flex; align-items: center; gap: 12px; }
.curr-count {
  font-size: 13px; color: var(--text-soft);
  background: white; padding: 4px 12px;
  border-radius: 20px;
}
.curr-lessons { padding: 8px 20px; }
.lesson-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}
.lesson-item:last-child { border-bottom: none; }
.lesson-item i { color: var(--primary); }
.lesson-time {
  margin-left: auto; color: var(--text-soft);
  font-size: 13px;
}
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s;
  max-height: 1000px; overflow: hidden;
}
.expand-enter-from, .expand-leave-to { max-height: 0; opacity: 0; }

.instructor-block {
  display: grid; grid-template-columns: 200px 1fr;
  gap: 32px; align-items: start;
  background: white; padding: 32px;
  border-radius: 16px;
}
.ins-big { width: 200px; height: 200px; border-radius: 16px; object-fit: cover; }
.ins-title { color: var(--primary); font-weight: 600; margin: 4px 0 16px; }
.ins-stats {
  display: flex; gap: 20px; flex-wrap: wrap;
  margin-bottom: 16px;
}
.ins-stats i { color: var(--accent); margin-right: 4px; }
.instructor-block p { color: var(--text-soft); line-height: 1.7; margin-bottom: 16px; }

.rating-summary {
  display: grid; grid-template-columns: 200px 1fr;
  gap: 32px; padding: 32px;
  background: white; border-radius: 16px;
  margin-bottom: 24px;
}
.rating-big { text-align: center; }
.big-num { font-size: 56px; font-weight: 800; color: var(--accent); }
.stars i { color: #fbbf24; }
.stars i.empty { color: #e2e8f0; }
.rating-bars { display: flex; flex-direction: column; gap: 8px; }
.rating-bar-row {
  display: grid; grid-template-columns: 60px 1fr 50px;
  gap: 12px; align-items: center;
}
.bar {
  height: 8px; background: var(--bg-muted);
  border-radius: 4px; overflow: hidden;
}
.bar-fill { height: 100%; background: var(--gradient); transition: width 0.6s; }

.reviews-list { display: flex; flex-direction: column; gap: 16px; }
.review-item {
  display: grid; grid-template-columns: 60px 1fr;
  gap: 16px;
  background: white; padding: 20px;
  border-radius: 12px;
}
.review-item img { width: 60px; height: 60px; border-radius: 50%; }
.review-header {
  display: flex; justify-content: space-between;
  margin-bottom: 4px;
}
.review-date { color: var(--text-muted); font-size: 13px; }
.review-content p { margin-top: 8px; color: var(--text-soft); line-height: 1.6; }

@media (max-width: 968px) {
  .detail-grid, .instructor-block, .rating-summary { grid-template-columns: 1fr; }
  .detail-title { font-size: 28px; }
  .ins-big { width: 120px; height: 120px; margin: 0 auto; }
}
</style>
