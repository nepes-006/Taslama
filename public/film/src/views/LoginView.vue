<template>
  <div class="auth-page">
    <div class="auth-bg">
      <div class="blob b1"></div>
      <div class="blob b2"></div>
    </div>
    <div class="auth-card scale-in">
      <div class="auth-side">
        <i class="fas fa-graduation-cap big-icon"></i>
        <h2>{{ $t('auth.welcome') }}</h2>
        <p>{{ locale === 'tr' ? 'Hayallerine bir adım daha yaklaş. Yeni şeyler öğrenmeye devam et!' : 'Get one step closer to your dreams. Keep learning new things!' }}</p>
        <div class="features">
          <div><i class="fas fa-check-circle"></i> 100+ {{ $t('home.courses') }}</div>
          <div><i class="fas fa-check-circle"></i> {{ locale === 'tr' ? 'Uzman eğitmenler' : 'Expert instructors' }}</div>
          <div><i class="fas fa-check-circle"></i> {{ locale === 'tr' ? 'Sertifikalı eğitim' : 'Certified education' }}</div>
        </div>
      </div>
      <div class="auth-form">
        <h1>{{ $t('nav.login') }}</h1>
        <p class="auth-sub">{{ $t('auth.loginDesc') }}</p>
        <div class="form-row">
          <label>{{ $t('auth.email') }}</label>
          <div class="input-wrap">
            <i class="fas fa-envelope"></i>
            <input class="input" type="email" v-model="email" placeholder="email@example.com" />
          </div>
        </div>
        <div class="form-row">
          <label>{{ $t('auth.password') }}</label>
          <div class="input-wrap">
            <i class="fas fa-lock"></i>
            <input class="input" :type="showPwd ? 'text' : 'password'" v-model="password" placeholder="••••••••" />
            <button type="button" class="pwd-toggle" @click="showPwd = !showPwd">
              <i :class="showPwd ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>
        <div class="form-extras">
          <label class="remember"><input type="checkbox" /> <span>{{ locale === 'tr' ? 'Beni hatırla' : 'Remember me' }}</span></label>
          <a class="forgot">{{ $t('auth.forgotPassword') }}</a>
        </div>
        <button class="btn btn-primary btn-block" @click="login">
          <i class="fas fa-sign-in-alt"></i> {{ $t('nav.login') }}
        </button>
        <div class="divider"><span>{{ $t('auth.orContinue') }}</span></div>
        <div class="social-login">
          <button class="btn-social"><i class="fab fa-google"></i></button>
          <button class="btn-social"><i class="fab fa-facebook-f"></i></button>
          <button class="btn-social"><i class="fab fa-apple"></i></button>
          <button class="btn-social"><i class="fab fa-github"></i></button>
        </div>
        <p class="auth-link">{{ $t('auth.noAccount') }} <router-link to="/register">{{ $t('nav.register') }}</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMainStore } from '../stores'

const store = useMainStore()
const router = useRouter()
const { locale } = useI18n()
const email = ref('demo@edulearn.com')
const password = ref('demo123')
const showPwd = ref(false)

const login = () => {
  if (!email.value || !password.value) {
    alert(locale.value === 'tr' ? 'Lütfen tüm alanları doldurun' : 'Please fill all fields'); return
  }
  store.login(email.value, email.value.split('@')[0])
  router.push('/')
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 80px);
  display: flex; align-items: center; justify-content: center;
  padding: 40px 20px;
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, #f0fdfb 0%, #e6fffa 100%);
}
.auth-bg { position: absolute; inset: 0; pointer-events: none; }
.blob {
  position: absolute; border-radius: 50%;
  filter: blur(60px); opacity: 0.3;
  animation: float 8s ease-in-out infinite;
}
.b1 { width: 300px; height: 300px; background: #1abc9c; top: 10%; left: -50px; }
.b2 { width: 400px; height: 400px; background: #3498db; bottom: -100px; right: -50px; animation-delay: 2s; }

.auth-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.15);
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px; width: 100%;
  overflow: hidden;
  position: relative; z-index: 1;
}
.auth-side {
  background: linear-gradient(135deg, #1abc9c 0%, #2c5364 100%);
  color: white;
  padding: 50px;
  display: flex; flex-direction: column; justify-content: center;
  position: relative; overflow: hidden;
}
.auth-side::before {
  content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 30px 30px;
}
.auth-side > * { position: relative; }
.big-icon { font-size: 50px; margin-bottom: 20px; }
.auth-side h2 { font-size: 30px; font-weight: 800; margin-bottom: 12px; }
.auth-side p { line-height: 1.6; opacity: 0.95; margin-bottom: 24px; }
.features { display: flex; flex-direction: column; gap: 10px; }
.features div i { margin-right: 8px; color: #fbbf24; }

.auth-form { padding: 50px 40px; }
.auth-form h1 { font-size: 32px; font-weight: 800; color: var(--secondary); margin-bottom: 6px; }
.auth-sub { color: var(--text-soft); margin-bottom: 30px; }

.form-row { margin-bottom: 16px; }
.form-row label {
  display: block; font-size: 13px; font-weight: 600;
  margin-bottom: 6px; color: var(--text-soft);
}
.input-wrap { position: relative; }
.input-wrap i {
  position: absolute; left: 16px; top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}
.input-wrap input { padding-left: 44px; }
.pwd-toggle {
  position: absolute !important;
  right: 12px; top: 50%; left: auto !important;
  transform: translateY(-50%);
  color: var(--text-muted);
  width: 32px; height: 32px;
}

.form-extras {
  display: flex; justify-content: space-between;
  align-items: center; margin: 16px 0 24px;
  font-size: 13px;
}
.remember { display: flex; align-items: center; gap: 6px; cursor: pointer; }
.remember input { accent-color: var(--primary); }
.forgot { color: var(--primary); cursor: pointer; }
.forgot:hover { text-decoration: underline; }

.btn-block { display: flex; width: 100%; justify-content: center; }
.divider {
  text-align: center; margin: 20px 0;
  position: relative; color: var(--text-muted);
  font-size: 12px;
}
.divider::before {
  content: ''; position: absolute;
  top: 50%; left: 0; right: 0;
  height: 1px; background: var(--border);
}
.divider span { background: white; padding: 0 16px; position: relative; }
.social-login {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 10px; margin-bottom: 20px;
}
.btn-social {
  padding: 12px;
  border: 2px solid var(--border);
  border-radius: 10px;
  font-size: 18px;
  transition: all 0.2s;
  color: var(--text-soft);
}
.btn-social:hover { border-color: var(--primary); color: var(--primary); transform: translateY(-2px); }

.auth-link { text-align: center; font-size: 14px; color: var(--text-soft); }
.auth-link a { color: var(--primary); font-weight: 600; }
.auth-link a:hover { text-decoration: underline; }

@media (max-width: 768px) {
  .auth-card { grid-template-columns: 1fr; }
  .auth-side { display: none; }
  .auth-form { padding: 36px 24px; }
}
</style>
