<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <AppHeader />

    <div v-if="auth.user.value" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

      <!-- ===== BANNER ===== -->
      <div class="profile-banner">
        <div class="banner-bg"></div>
        <div class="banner-pattern"></div>
        <div class="banner-content">
          <img :src="avatarUrl" class="profile-avatar" @error="e => e.target.src='https://i.pravatar.cc/200?u=default'" />
          <div class="profile-info">
            <h1>{{ fullName }}</h1>
            <p class="profile-email"><Mail class="inline-icon" /> {{ auth.user.value?.email }}</p>
            <p class="profile-joined"><Calendar class="inline-icon" /> Agza boldy: {{ joinedDate }}</p>
          </div>
        </div>
      </div>

      <!-- ===== GRID ===== -->
      <div class="profile-grid">

        <!-- SOL: Profil redaktirlemek -->
        <div class="profile-form card">
          <h2><UserPen class="section-icon" /> Profili redaktirlemek</h2>
          <div class="form-row">
            <label>Ady</label>
            <input class="input" v-model="form.firstName" />
          </div>
          <div class="form-row">
            <label>Familiýasy</label>
            <input class="input" v-model="form.lastName" />
          </div>
          <div class="form-row">
            <label>E-poçta</label>
            <input class="input" v-model="form.email" />
          </div>
          <div class="form-row">
            <label>Telefon</label>
            <input class="input" v-model="form.phone" placeholder="+993 xx xxxxxx" />
          </div>
          <div class="form-row">
            <label>Özüň barada</label>
            <textarea class="input" rows="4" v-model="form.bio" placeholder="Özüň barada ýaz..."></textarea>
          </div>
          <button class="btn-save" @click="save">
            <Save class="btn-icon" /> Ýatda sakla
          </button>
          <Transition name="fade">
            <div v-if="saved" class="success-msg"><CheckCircle class="inline-icon" /> Saklady!</div>
          </Transition>
        </div>

        <!-- SAG: Stats + Achievements -->
        <div class="profile-side">

          <!-- Statistika -->
          <div class="card stats-card">
            <h3><TrendingUp class="section-icon" /> Statistika</h3>
            <div class="stat-list">
              <div class="stat-row" style="--c:#3b82f6;">
                <BookOpen class="stat-icon" />
                <span>Ýazylan kurslar</span>
                <strong>{{ enrolledCourses.length }}</strong>
              </div>
              <div class="stat-row" style="--c:#22c55e;">
                <CheckCircle class="stat-icon" />
                <span>Tamamlanan</span>
                <strong>{{ completedCount }}</strong>
              </div>
              <div class="stat-row" style="--c:#eab308;">
                <Clock class="stat-icon" />
                <span>Dowam edýär</span>
                <strong>{{ enrolledCourses.length - completedCount }}</strong>
              </div>
              <div class="stat-row" style="--c:#a855f7;">
                <Award class="stat-icon" />
                <span>Şahadatnama</span>
                <strong>{{ completedCount }}</strong>
              </div>
            </div>
          </div>

          <!-- Üstünlikler -->
          <div class="card achievements">
            <h3><Medal class="section-icon medal" /> Üstünlikler</h3>
            <div class="badges-grid">
              <div v-for="ach in achievements" :key="ach.label"
                class="ach-badge" :class="{unlocked: ach.unlocked}">
                <span class="ach-emoji">{{ ach.icon }}</span>
                <span class="ach-label">{{ ach.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Giriş edilmedik -->
    <div v-else class="login-required">
      <div class="lock-circle">
        <Lock class="lock-icon" />
      </div>
      <h2>Giriş etmeli</h2>
      <p>Profili görmek üçin hasabyňyza giriň</p>
      <RouterLink to="/login" class="btn-login">Giriş et</RouterLink>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Mail, Calendar, Award, TrendingUp, BookOpen,
  UserPen, Save, CheckCircle, Clock, Medal, Lock
} from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { courses } from '../data/courses'
import { useAuth } from '../stores/auth'

const auth = useAuth()
const apiEnrollments = ref([])
const saved = ref(false)

const form = ref({
  firstName: auth.user.value?.firstName || '',
  lastName:  auth.user.value?.lastName  || '',
  email:     auth.user.value?.email     || '',
  phone:     auth.user.value?.phone     || '',
  bio:       auth.user.value?.bio       || '',
})

onMounted(async () => {
  try {
    const { default: api } = await import('../services/api')
    const { data } = await api.get('/enrollments/my')
    apiEnrollments.value = data
  } catch {}
})

const fullName = computed(() =>
  `${auth.user.value?.firstName || ''} ${auth.user.value?.lastName || ''}`.trim() || 'Ulanyjy'
)

const avatarUrl = computed(() =>
  `https://i.pravatar.cc/200?u=${auth.user.value?.email || 'default'}`
)

const joinedDate = computed(() => {
  return new Date().toLocaleDateString('tk-TM')
})

const enrolledCourses = computed(() => {
  const ids = apiEnrollments.value.length
    ? apiEnrollments.value.map(e => e.courseId)
    : (auth.user.value?.enrolledCourses || [])
  return courses.filter(c => ids.includes(c.id)).map(c => {
    const enrollment = apiEnrollments.value.find(e => e.courseId === c.id)
    return { ...c, progress: enrollment?.progress || c.progress || 0 }
  })
})

const completedCount = computed(() =>
  enrolledCourses.value.filter(c => (c.progress || 0) >= 100).length
)

const achievements = computed(() => [
  { icon: '🚀', label: 'Başlangyç',  unlocked: enrolledCourses.value.length >= 1 },
  { icon: '🔥', label: 'Höwesli',    unlocked: enrolledCourses.value.length >= 3 },
  { icon: '🏆', label: 'Çempion',    unlocked: completedCount.value >= 1 },
  { icon: '👑', label: 'Ussady',     unlocked: completedCount.value >= 5 },
])

function save() {
  if (auth.updateUser) {
    auth.updateUser(form.value)
  }
  saved.value = true
  setTimeout(() => (saved.value = false), 2500)
}
</script>

<style scoped>
/* ===== BANNER ===== */
.profile-banner {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 32px;
  height: 240px;
}
.banner-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 50%, #1e293b 100%);
}
.banner-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}
.banner-content {
  position: absolute;
  bottom: -50px;
  left: 40px;
  right: 40px;
  display: flex;
  align-items: end;
  gap: 24px;
}
.profile-avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 6px solid white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  object-fit: cover;
}
.profile-info {
  color: white;
  padding-bottom: 70px;
}
.profile-info h1 {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 6px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.profile-email, .profile-joined {
  font-size: 14px;
  opacity: 0.95;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.inline-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* ===== GRID ===== */
.profile-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-top: 80px;
}

/* ===== CARD ===== */
.card {
  background: white;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  padding: 28px;
}

/* ===== FORM ===== */
.profile-form h2, .profile-side h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 10px;
}
.section-icon {
  width: 20px;
  height: 20px;
  color: #3b82f6;
}
.section-icon.medal {
  color: #eab308;
}
.form-row {
  margin-bottom: 16px;
}
.form-row label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #64748b;
}
.input {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  font-family: inherit;
  background: #f8fafc;
  transition: all 0.3s;
  outline: none;
  box-sizing: border-box;
}
.input:focus {
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
}
textarea.input {
  resize: none;
}

.btn-save {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #3b82f6;
  color: white;
  padding: 10px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(59,130,246,0.3);
}
.btn-save:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59,130,246,0.4);
}
.btn-icon {
  width: 16px;
  height: 16px;
}

.success-msg {
  margin-top: 16px;
  padding: 12px;
  background: rgba(34,197,94,0.1);
  color: #16a34a;
  border-radius: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

/* ===== SIDE ===== */
.profile-side {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.stat-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.stat-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: color-mix(in srgb, var(--c) 8%, white);
  border-radius: 12px;
  border-left: 3px solid var(--c);
  transition: transform 0.2s;
}
.stat-row:hover {
  transform: translateX(4px);
}
.stat-icon {
  width: 18px;
  height: 18px;
  color: var(--c);
  flex-shrink: 0;
}
.stat-row span {
  flex: 1;
  font-size: 14px;
  color: #64748b;
}
.stat-row strong {
  font-size: 18px;
  color: #1e293b;
}

/* ===== BADGES ===== */
.badges-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.ach-badge {
  text-align: center;
  padding: 18px 12px;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  opacity: 0.45;
  transition: all 0.3s;
}
.ach-badge.unlocked {
  opacity: 1;
  background: linear-gradient(135deg, #fef9c3 0%, #fde68a 100%);
  border-color: #fcd34d;
}
.ach-emoji {
  font-size: 28px;
  display: block;
  margin-bottom: 8px;
}
.ach-label {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}
.ach-badge.unlocked .ach-label {
  color: #92400e;
}

/* ===== LOGIN REQUIRED ===== */
.login-required {
  text-align: center;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lock-circle {
  width: 80px;
  height: 80px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.lock-icon {
  width: 40px;
  height: 40px;
  color: #94a3b8;
}
.login-required h2 {
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}
.login-required p {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 24px;
}
.btn-login {
  display: inline-block;
  background: #3b82f6;
  color: white;
  padding: 12px 32px;
  border-radius: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}
.btn-login:hover {
  background: #2563eb;
}

/* ===== TRANSITIONS ===== */
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }

/* ===== RESPONSIVE ===== */
@media (max-width: 968px) {
  .profile-grid {
    grid-template-columns: 1fr;
    margin-top: 100px;
  }
  .banner-content {
    left: 20px;
    right: 20px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .profile-info {
    padding-bottom: 0;
  }
  .profile-email, .profile-joined {
    justify-content: center;
  }
}
</style>
