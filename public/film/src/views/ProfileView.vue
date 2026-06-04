<template>
  <div v-if="store.isLoggedIn" class="container profile">
    <div class="profile-banner">
      <div class="banner-bg"></div>
      <div class="banner-content">
        <img :src="store.user.avatar" class="profile-avatar" />
        <div class="profile-info">
          <h1>{{ store.user.name }}</h1>
          <p class="profile-email"><i class="fas fa-envelope"></i> {{ store.user.email }}</p>
          <p class="profile-joined"><i class="fas fa-calendar"></i> {{ locale === 'tr' ? 'Üyelik' : 'Joined' }}: {{ store.user.joined }}</p>
        </div>
      </div>
    </div>

    <div class="profile-grid">
      <div class="profile-form card">
        <h2><i class="fas fa-user-edit"></i> {{ $t('profile.editProfile') }}</h2>
        <div class="form-row">
          <label>{{ $t('profile.name') }}</label>
          <input class="input" v-model="form.name" />
        </div>
        <div class="form-row">
          <label>{{ $t('profile.email') }}</label>
          <input class="input" v-model="form.email" />
        </div>
        <div class="form-row">
          <label>{{ $t('profile.phone') }}</label>
          <input class="input" v-model="form.phone" placeholder="+90 5xx xxx xx xx" />
        </div>
        <div class="form-row">
          <label>{{ $t('profile.bio') }}</label>
          <textarea class="input" rows="4" v-model="form.bio" :placeholder="locale==='tr'?'Kendinden bahset...':'Tell about yourself...'"></textarea>
        </div>
        <button class="btn btn-primary" @click="save">
          <i class="fas fa-save"></i> {{ $t('profile.save') }}
        </button>
        <transition name="fade">
          <div v-if="saved" class="success-msg"><i class="fas fa-check-circle"></i> {{ locale === 'tr' ? 'Kaydedildi!' : 'Saved!' }}</div>
        </transition>
      </div>

      <div class="profile-side">
        <div class="card stats-card">
          <h3><i class="fas fa-chart-line"></i> {{ $t('profile.stats') }}</h3>
          <div class="stat-list">
            <div class="stat-row" style="--c:#1abc9c;">
              <i class="fas fa-book"></i>
              <span>{{ $t('profile.enrolledCourses') }}</span>
              <strong>{{ store.enrolled.length }}</strong>
            </div>
            <div class="stat-row" style="--c:#27ae60;">
              <i class="fas fa-check-circle"></i>
              <span>{{ $t('profile.completed') }}</span>
              <strong>{{ store.completed.length }}</strong>
            </div>
            <div class="stat-row" style="--c:#f39c12;">
              <i class="fas fa-clock"></i>
              <span>{{ $t('profile.inProgress') }}</span>
              <strong>{{ store.enrolled.length - store.completed.length }}</strong>
            </div>
            <div class="stat-row" style="--c:#9b59b6;">
              <i class="fas fa-award"></i>
              <span>{{ $t('nav.certificates') }}</span>
              <strong>{{ store.completed.length }}</strong>
            </div>
          </div>
        </div>

        <div class="card achievements">
          <h3><i class="fas fa-medal"></i> {{ locale === 'tr' ? 'Rozetler' : 'Achievements' }}</h3>
          <div class="badges-grid">
            <div class="ach-badge" :class="{unlocked: store.enrolled.length >= 1}">
              <i class="fas fa-rocket"></i>
              <span>{{ locale === 'tr' ? 'Başlangıç' : 'Starter' }}</span>
            </div>
            <div class="ach-badge" :class="{unlocked: store.enrolled.length >= 3}">
              <i class="fas fa-fire"></i>
              <span>{{ locale === 'tr' ? 'Tutkulu' : 'Passionate' }}</span>
            </div>
            <div class="ach-badge" :class="{unlocked: store.completed.length >= 1}">
              <i class="fas fa-trophy"></i>
              <span>{{ locale === 'tr' ? 'Şampiyon' : 'Champion' }}</span>
            </div>
            <div class="ach-badge" :class="{unlocked: store.completed.length >= 5}">
              <i class="fas fa-crown"></i>
              <span>{{ locale === 'tr' ? 'Usta' : 'Master' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container login-required">
    <i class="fas fa-lock"></i>
    <h2>{{ locale === 'tr' ? 'Giriş yapmanız gerekiyor' : 'Login required' }}</h2>
    <router-link to="/login" class="btn btn-primary">{{ $t('nav.login') }}</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMainStore } from '../stores'

const store = useMainStore()
const { locale } = useI18n()

const form = ref({
  name: store.user?.name || '',
  email: store.user?.email || '',
  phone: store.user?.phone || '',
  bio: store.user?.bio || ''
})
const saved = ref(false)

const save = () => {
  store.updateProfile(form.value)
  saved.value = true
  setTimeout(() => saved.value = false, 2500)
}
</script>

<style scoped>
.profile { padding: 40px 24px 80px; }
.profile-banner {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 32px;
  height: 240px;
}
.banner-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #1abc9c 0%, #2c5364 100%);
}
.banner-bg::before {
  content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}
.banner-content {
  position: absolute; bottom: -50px; left: 40px; right: 40px;
  display: flex; align-items: end; gap: 24px;
}
.profile-avatar {
  width: 140px; height: 140px;
  border-radius: 50%;
  border: 6px solid white;
  box-shadow: var(--shadow-lg);
}
.profile-info { color: white; padding-bottom: 70px; }
.profile-info h1 { font-size: 28px; font-weight: 800; margin-bottom: 6px; }
.profile-email, .profile-joined { font-size: 14px; opacity: 0.95; margin-bottom: 4px; }
.profile-email i, .profile-joined i { margin-right: 6px; }

.profile-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-top: 80px;
}
.card { padding: 28px; }
.profile-form h2, .profile-side h3 {
  font-size: 18px; font-weight: 700;
  margin-bottom: 20px; color: var(--secondary);
  display: flex; align-items: center; gap: 10px;
}
.profile-form h2 i, .profile-side h3 i { color: var(--primary); }

.form-row { margin-bottom: 16px; }
.form-row label {
  display: block; font-size: 13px; font-weight: 600;
  margin-bottom: 6px; color: var(--text-soft);
}
.success-msg {
  margin-top: 16px;
  padding: 12px;
  background: rgba(39,174,96,0.1);
  color: #27ae60;
  border-radius: 10px;
  font-weight: 600;
}
.success-msg i { margin-right: 8px; }
.fade-enter-active, .fade-leave-active { transition: all 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }

.profile-side { display: flex; flex-direction: column; gap: 24px; }
.stat-list { display: flex; flex-direction: column; gap: 12px; }
.stat-row {
  display: flex; align-items: center; gap: 12px;
  padding: 12px;
  background: var(--bg-soft);
  border-radius: 10px;
  border-left: 3px solid var(--c);
}
.stat-row i { color: var(--c); font-size: 18px; }
.stat-row span { flex: 1; font-size: 14px; color: var(--text-soft); }
.stat-row strong { font-size: 18px; color: var(--secondary); }

.badges-grid {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.ach-badge {
  text-align: center; padding: 18px 12px;
  background: var(--bg-soft);
  border-radius: 12px;
  opacity: 0.4;
  transition: all 0.3s;
}
.ach-badge.unlocked {
  opacity: 1;
  background: linear-gradient(135deg, #fef9c3 0%, #fde68a 100%);
}
.ach-badge i {
  font-size: 28px; color: var(--text-muted);
  margin-bottom: 8px; display: block;
}
.ach-badge.unlocked i { color: #f59e0b; }
.ach-badge span { font-size: 12px; font-weight: 600; }

.login-required {
  text-align: center; padding: 100px 20px;
}
.login-required i {
  font-size: 60px; color: var(--text-muted);
  margin-bottom: 20px;
}
.login-required h2 { margin-bottom: 24px; color: var(--secondary); }

@media (max-width: 968px) {
  .profile-grid { grid-template-columns: 1fr; margin-top: 100px; }
  .banner-content { left: 20px; right: 20px; flex-direction: column; align-items: center; text-align: center; }
  .profile-info { padding-bottom: 0; }
}
</style>
