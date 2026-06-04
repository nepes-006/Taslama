<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
      </div>
      <div class="container hero-inner">
        <div class="hero-content">
          <div class="hero-badge slide-right">
            <i class="fas fa-bolt"></i>
            <span>{{ locale === 'tr' ? '#1 Online Eğitim Platformu' : '#1 Online Learning Platform' }}</span>
          </div>
          <h1 class="hero-title slide-right">
            {{ $t('home.heroTitle') }}
            <span class="hero-highlight">EduLearn</span>
          </h1>
          <p class="hero-subtitle slide-right">{{ $t('home.heroSubtitle') }}</p>
          <div class="hero-actions slide-right">
            <router-link to="/courses" class="btn btn-primary btn-lg">
              <i class="fas fa-rocket"></i> {{ $t('home.startLearning') }}
            </router-link>
            <router-link to="/courses" class="btn btn-outline btn-lg">
              {{ $t('home.browseCourses') }} <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>
          <div class="stats-row slide-right">
            <div class="stat">
              <div class="stat-num">50K+</div>
              <div class="stat-label">{{ $t('home.students') }}</div>
            </div>
            <div class="stat">
              <div class="stat-num">100+</div>
              <div class="stat-label">{{ $t('home.courses') }}</div>
            </div>
            <div class="stat">
              <div class="stat-num">10+</div>
              <div class="stat-label">{{ $t('home.instructors') }}</div>
            </div>
            <div class="stat">
              <div class="stat-num">25K+</div>
              <div class="stat-label">{{ $t('home.certificates') }}</div>
            </div>
          </div>
        </div>
        <div class="hero-visual slide-left">
          <div class="hero-card hero-card-main">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600" />
            <div class="card-overlay">
              <div class="play-btn-big"><i class="fas fa-play"></i></div>
            </div>
          </div>
          <div class="float-card float-card-1 float-anim">
            <div class="fc-icon"><i class="fas fa-trophy"></i></div>
            <div>
              <div class="fc-num">98%</div>
              <div class="fc-text">{{ locale === 'tr' ? 'Başarı Oranı' : 'Success Rate' }}</div>
            </div>
          </div>
          <div class="float-card float-card-2 float-anim" style="animation-delay: 1s;">
            <div class="fc-icon" style="background: var(--gradient-3);"><i class="fas fa-certificate"></i></div>
            <div>
              <div class="fc-num">25K+</div>
              <div class="fc-text">{{ locale === 'tr' ? 'Sertifika' : 'Certificates' }}</div>
            </div>
          </div>
          <div class="float-card float-card-3 float-anim" style="animation-delay: 2s;">
            <div class="avatars">
              <img src="https://i.pravatar.cc/40?img=1" />
              <img src="https://i.pravatar.cc/40?img=2" />
              <img src="https://i.pravatar.cc/40?img=3" />
              <span>+50K</span>
            </div>
            <div class="fc-text">{{ locale === 'tr' ? 'Aktif Öğrenci' : 'Active Students' }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('home.categories') }}</h2>
          <p class="section-subtitle">{{ $t('home.categoriesDesc') }}</p>
        </div>
        <div class="category-grid">
          <router-link v-for="(c, i) in store.categories" :key="c.id"
            :to="`/category/${c.id}`" class="cat-card"
            :style="{ '--bg': c.gradient, animationDelay: `${i*0.05}s` }">
            <div class="cat-icon"><i :class="['fas', c.icon]"></i></div>
            <div class="cat-name">{{ locale === 'tr' ? c.tr : c.en }}</div>
            <div class="cat-count">{{ countByCat(c.id) }} {{ $t('home.courses') }}</div>
            <div class="cat-arrow"><i class="fas fa-arrow-right"></i></div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Popular Courses -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('home.popular') }} 🔥</h2>
          <p class="section-subtitle">{{ $t('home.popularDesc') }}</p>
        </div>
        <div class="grid">
          <CourseCard v-for="c in store.popularCourses" :key="c.id" :course="c" />
        </div>
        <div class="text-center" style="margin-top: 40px;">
          <router-link to="/courses" class="btn btn-primary btn-lg">
            {{ locale === 'tr' ? 'Tüm Kursları Gör' : 'View All Courses' }} <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Why Us -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('home.whyUs') }}</h2>
          <p class="section-subtitle">{{ $t('home.whyUsDesc') }}</p>
        </div>
        <div class="features-grid">
          <div class="feature-card scale-in" v-for="(f, i) in features" :key="i" :style="{ animationDelay: `${i*0.1}s` }">
            <div class="feature-icon" :style="{ background: f.bg }">
              <i :class="['fas', f.icon]"></i>
            </div>
            <h3>{{ $t(`home.feature${i+1}Title`) }}</h3>
            <p>{{ $t(`home.feature${i+1}Desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('home.testimonials') }}</h2>
        </div>
        <div class="testimonials">
          <div class="testimonial-card" v-for="(t,i) in testimonials" :key="i" :style="{ animationDelay: `${i*0.1}s` }">
            <i class="fas fa-quote-left quote-icon"></i>
            <p class="testimonial-text">{{ t.text }}</p>
            <div class="testimonial-stars">
              <i v-for="n in 5" :key="n" class="fas fa-star"></i>
            </div>
            <div class="testimonial-author">
              <img :src="t.avatar" />
              <div>
                <div class="ta-name">{{ t.name }}</div>
                <div class="ta-role">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-bg"></div>
          <div class="cta-content">
            <h2>{{ $t('home.cta') }}</h2>
            <p>{{ $t('home.ctaDesc') }}</p>
            <router-link to="/register" class="btn btn-lg cta-btn">
              <i class="fas fa-graduation-cap"></i> {{ $t('home.startLearning') }}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMainStore } from '../stores'
import CourseCard from '../components/CourseCard.vue'

const store = useMainStore()
const { locale } = useI18n()

const countByCat = (id) => store.courses.filter(c => c.category === id).length

const features = [
  { icon: 'fa-chalkboard-teacher', bg: 'linear-gradient(135deg, #1abc9c, #16a085)' },
  { icon: 'fa-award', bg: 'linear-gradient(135deg, #f39c12, #e67e22)' },
  { icon: 'fa-clock', bg: 'linear-gradient(135deg, #9b59b6, #8e44ad)' },
  { icon: 'fa-users', bg: 'linear-gradient(135deg, #3498db, #2980b9)' }
]

const testimonials = computed(() => locale.value === 'tr' ? [
  { name: 'Mehmet Yılmaz', role: 'Yazılım Geliştirici', avatar: 'https://i.pravatar.cc/100?img=11', text: 'EduLearn sayesinde kariyerimi değiştirdim. Python kursu sonrası iş buldum!' },
  { name: 'Ayşe Demir', role: 'Tasarımcı', avatar: 'https://i.pravatar.cc/100?img=44', text: '3D tasarım kursları muhteşem! Eğitmenler çok bilgili ve sabırlı.' },
  { name: 'Can Öztürk', role: 'Mühendislik Öğrencisi', avatar: 'https://i.pravatar.cc/100?img=33', text: 'Robotik kursları hayatımı değiştirdi. Şimdi kendi robotumu yapıyorum!' }
] : [
  { name: 'John Smith', role: 'Software Developer', avatar: 'https://i.pravatar.cc/100?img=11', text: 'EduLearn changed my career. I got a job right after the Python course!' },
  { name: 'Emma Wilson', role: 'Designer', avatar: 'https://i.pravatar.cc/100?img=44', text: '3D design courses are amazing! Instructors are knowledgeable and patient.' },
  { name: 'David Lee', role: 'Engineering Student', avatar: 'https://i.pravatar.cc/100?img=33', text: 'Robotics courses changed my life. Now I build my own robots!' }
])
</script>

<style scoped>
/* Hero */
.hero {
  position: relative; overflow: hidden;
  padding: 80px 0 100px;
  background: linear-gradient(135deg, #f0fdfb 0%, #e6fffa 50%, #f0f9ff 100%);
}
.hero-bg { position: absolute; inset: 0; pointer-events: none; }
.blob {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.4;
  animation: float 8s ease-in-out infinite;
}
.blob-1 { width: 300px; height: 300px; top: -50px; left: -50px; background: #1abc9c; }
.blob-2 { width: 400px; height: 400px; bottom: -100px; right: -50px; background: #3498db; animation-delay: 2s; }
.blob-3 { width: 250px; height: 250px; top: 40%; left: 50%; background: #f39c12; animation-delay: 4s; opacity: 0.2; }

.hero-inner {
  display: grid; grid-template-columns: 1.1fr 1fr;
  gap: 60px; align-items: center;
  position: relative; z-index: 1;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px; border-radius: 30px;
  background: white; box-shadow: var(--shadow-sm);
  font-size: 13px; font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 24px;
}
.hero-badge i { color: var(--accent); }

.hero-title {
  font-size: 60px; font-weight: 800;
  line-height: 1.1; color: var(--secondary);
  margin-bottom: 20px;
}
.hero-highlight {
  display: block;
  background: var(--gradient-2);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}
.hero-subtitle {
  font-size: 18px; color: var(--text-soft);
  margin-bottom: 32px; line-height: 1.7;
  max-width: 540px;
}
.hero-actions {
  display: flex; gap: 16px; flex-wrap: wrap;
  margin-bottom: 50px;
}
.btn-lg { padding: 16px 30px; font-size: 16px; }

.stats-row {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 20px; max-width: 540px;
}
.stat { text-align: left; }
.stat-num {
  font-size: 32px; font-weight: 800;
  background: var(--gradient-2);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.stat-label { font-size: 13px; color: var(--text-soft); }

.hero-visual { position: relative; }
.hero-card-main {
  position: relative;
  border-radius: 24px; overflow: hidden;
  box-shadow: var(--shadow-lg);
  aspect-ratio: 4/5;
}
.hero-card-main img { width: 100%; height: 100%; object-fit: cover; }
.card-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.5));
  display: flex; align-items: center; justify-content: center;
}
.play-btn-big {
  width: 80px; height: 80px;
  background: white; color: var(--primary);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  cursor: pointer;
  animation: pulse 2s ease-in-out infinite;
}
.float-card {
  position: absolute;
  background: white; border-radius: 16px;
  padding: 16px;
  box-shadow: var(--shadow-lg);
  display: flex; align-items: center; gap: 12px;
}
.float-card-1 { top: 20px; left: -30px; }
.float-card-2 { top: 50%; right: -40px; }
.float-card-3 { bottom: 20px; left: -20px; flex-direction: column; align-items: flex-start; }
.fc-icon {
  width: 44px; height: 44px; border-radius: 12px;
  background: var(--gradient);
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 18px;
}
.fc-num { font-size: 18px; font-weight: 800; color: var(--secondary); }
.fc-text { font-size: 12px; color: var(--text-soft); }
.avatars { display: flex; align-items: center; }
.avatars img {
  width: 28px; height: 28px; border-radius: 50%;
  border: 2px solid white; margin-left: -8px;
}
.avatars img:first-child { margin-left: 0; }
.avatars span {
  margin-left: 8px;
  font-size: 12px; font-weight: 700;
  color: var(--primary);
}

/* Categories */
.section-alt { background: var(--bg-soft); }
.category-grid {
  display: grid; gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}
.cat-card {
  position: relative; padding: 24px;
  border-radius: 20px;
  background: var(--bg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all 0.4s;
  animation: fadeIn 0.5s ease-out backwards;
}
.cat-card::before {
  content: ''; position: absolute; inset: 0;
  background: var(--bg);
  opacity: 1; transition: opacity 0.4s;
  z-index: 0;
}
.cat-card::after {
  content: ''; position: absolute; inset: 0;
  background: var(--bg);
  z-index: 0;
}
.cat-card > * { position: relative; z-index: 1; }
.cat-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}
.cat-icon {
  width: 60px; height: 60px;
  border-radius: 16px;
  background: var(--bg);
  background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 26px;
  margin-bottom: 16px;
  transition: transform 0.3s;
}
.cat-card .cat-icon { background: v-bind('cat?.gradient || ""'); }
.cat-card[style*="--bg"] .cat-icon { background: var(--bg); }
.cat-name {
  font-size: 17px; font-weight: 700;
  color: var(--secondary); margin-bottom: 4px;
}
.cat-count { font-size: 13px; color: var(--text-soft); }
.cat-arrow {
  position: absolute; top: 24px; right: 24px;
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--bg-soft);
  display: flex; align-items: center; justify-content: center;
  color: var(--primary);
  transition: all 0.3s;
}
.cat-card:hover .cat-arrow { background: var(--primary); color: white; transform: translate(4px, -4px); }
.cat-card:hover .cat-icon { transform: scale(1.1) rotate(-5deg); }

/* Features */
.features-grid {
  display: grid; gap: 28px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
.feature-card {
  text-align: center; padding: 36px 24px;
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
  transition: all 0.4s;
  animation: scaleIn 0.5s ease-out backwards;
}
.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}
.feature-icon {
  width: 70px; height: 70px;
  margin: 0 auto 20px;
  border-radius: 20px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 30px;
  transition: transform 0.3s;
}
.feature-card:hover .feature-icon { transform: rotate(-10deg) scale(1.1); }
.feature-card h3 {
  font-size: 19px; font-weight: 700;
  color: var(--secondary); margin-bottom: 10px;
}
.feature-card p { font-size: 14px; color: var(--text-soft); line-height: 1.6; }

/* Testimonials */
.testimonials {
  display: grid; gap: 28px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.testimonial-card {
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
  position: relative;
  animation: fadeIn 0.6s ease-out backwards;
  transition: all 0.4s;
}
.testimonial-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
.quote-icon {
  font-size: 40px; color: var(--primary);
  opacity: 0.2; margin-bottom: 16px;
}
.testimonial-text {
  font-size: 15px; line-height: 1.7;
  color: var(--text); margin-bottom: 16px;
  font-style: italic;
}
.testimonial-stars { color: #fbbf24; margin-bottom: 16px; }
.testimonial-author {
  display: flex; align-items: center; gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}
.testimonial-author img { width: 48px; height: 48px; border-radius: 50%; }
.ta-name { font-weight: 700; color: var(--secondary); }
.ta-role { font-size: 13px; color: var(--text-soft); }

/* CTA */
.cta-section { padding: 60px 0; }
.cta-card {
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  padding: 80px 40px;
  text-align: center;
  background: linear-gradient(135deg, #1abc9c 0%, #2c5364 100%);
  background-size: 200% 200%;
  animation: gradientShift 5s ease infinite;
}
.cta-bg {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px),
                    radial-gradient(circle at 80% 30%, rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 30px 30px, 50px 50px;
}
.cta-content { position: relative; z-index: 1; color: white; }
.cta-content h2 {
  font-size: 42px; font-weight: 800;
  margin-bottom: 14px;
}
.cta-content p {
  font-size: 18px; margin-bottom: 32px;
  opacity: 0.95;
}
.cta-btn {
  background: white; color: var(--primary-dark);
  font-weight: 700;
}
.cta-btn:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.2); }

.text-center { text-align: center; }

@media (max-width: 968px) {
  .hero-inner { grid-template-columns: 1fr; gap: 40px; }
  .hero-title { font-size: 40px; }
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .float-card { display: none; }
  .float-card-3 { display: flex; bottom: 20px; left: 20px; }
  .cta-content h2 { font-size: 28px; }
}
</style>
