<template>
  <div class="auth-page">
    <div class="auth-bg">
      <div class="blob b1"></div>
      <div class="blob b2"></div>
    </div>
    <div class="auth-card scale-in">
      <div class="auth-side">
        <i class="fas fa-rocket big-icon"></i>
        <h2>{{ locale === 'tr' ? 'Aramıza Katıl!' : 'Join Us!' }}</h2>
        <p>{{ locale === 'tr' ? 'Binlerce öğrenci gibi sen de potansiyelini keşfet ve yeni beceriler kazan.' : 'Like thousands of students, discover your potential and gain new skills.' }}</p>
        <div class="features">
          <div><i class="fas fa-gift"></i> {{ locale === 'tr' ? '%50 ilk üyelik indirimi' : '50% first member discount' }}</div>
          <div><i class="fas fa-infinity"></i> {{ locale === 'tr' ? 'Ömür boyu erişim' : 'Lifetime access' }}</div>
          <div><i class="fas fa-certificate"></i> {{ locale === 'tr' ? 'Ücretsiz sertifika' : 'Free certificate' }}</div>
        </div>
      </div>
      <div class="auth-form">
        <h1>{{ $t('nav.register') }}</h1>
        <p class="auth-sub">{{ $t('auth.registerDesc') }}</p>
        <div class="form-row">
          <label>{{ $t('auth.fullName') }}</label>
          <div class="input-wrap">
            <i class="fas fa-user"></i>
            <input class="input" v-model="form.name" placeholder="Ad Soyad" />
          </div>
        </div>
        <div class="form-row">
          <label>{{ $t('auth.email') }}</label>
          <div class="input-wrap">
            <i class="fas fa-envelope"></i>
            <input class="input" type="email" v-model="form.email" placeholder="email@example.com" />
          </div>
        </div>
        <div class="form-row">
          <label>{{ $t('auth.password') }}</label>
          <div class="input-wrap">
            <i class="fas fa-lock"></i>
            <input class="input" type="password" v-model="form.password" placeholder="••••••••" />
          </div>
          <div class="pwd-strength" v-if="form.password">
            <div class="ps-bar"><div class="ps-fill" :style="{ width: strength.width, background: strength.color }"></div></div>
            <small :style="{color: strength.color}">{{ strength.text }}</small>
          </div>
        </div>
        <div class="form-row">
          <label>{{ $t('auth.confirmPassword') }}</label>
          <div class="input-wrap">
            <i class="fas fa-lock"></i>
            <input class="input" type="password" v-model="form.confirm" placeholder="••••••••" />
          </div>
        </div>
        <label class="terms">
          <input type="checkbox" v-model="form.terms" />
          <span>{{ locale === 'tr' ? 'Kullanım koşullarını kabul ediyorum' : 'I accept terms and conditions' }}</span>
        </label>
        <button class="btn btn-primary btn-block" @click="register">
          <i class="fas fa-rocket"></i> {{ locale === 'tr' ? 'Hesap Oluştur' : 'Create Account' }}
        </button>
        <p class="auth-link">{{ $t('auth.haveAccount') }} <router-link to="/login">{{ $t('nav.login') }}</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMainStore } from '../stores'

const store = useMainStore()
const router = useRouter()
const { locale } = useI18n()

const form = ref({ name: '', email: '', password: '', confirm: '', terms: false })

const strength = computed(() => {
  const p = form.value.password
  if (p.length < 4) return { width: '25%', color: '#e74c3c', text: locale.value === 'tr' ? 'Zayıf' : 'Weak' }
  if (p.length < 8) return { width: '60%', color: '#f39c12', text: locale.value === 'tr' ? 'Orta' : 'Medium' }
  return { width: '100%', color: '#27ae60', text: locale.value === 'tr' ? 'Güçlü' : 'Strong' }
})

const register = () => {
  if (!form.value.name || !form.value.email || !form.value.password) {
    alert(locale.value === 'tr' ? 'Lütfen tüm alanları doldurun' : 'Please fill all fields'); return
  }
  if (form.value.password !== form.value.confirm) {
    alert(locale.value === 'tr' ? 'Şifreler eşleşmiyor' : 'Passwords do not match'); return
  }
  if (!form.value.terms) {
    alert(locale.value === 'tr' ? 'Kullanım koşullarını kabul edin' : 'Please accept terms'); return
  }
  store.login(form.value.email, form.value.name)
  router.push('/')
}
</script>

<style scoped>
@import '../views/LoginView.vue?style=scoped';
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
  background: white; border-radius: 24px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.15);
  display: grid; grid-template-columns: 1fr 1fr;
  max-width: 1000px; width: 100%;
  overflow: hidden; position: relative; z-index: 1;
}
.auth-side {
  background: linear-gradient(135deg, #f39c12 0%, #e74c3c 100%);
  color: white; padding: 50px;
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
.features div i { margin-right: 8px; }

.auth-form { padding: 40px; }
.auth-form h1 { font-size: 30px; font-weight: 800; color: var(--secondary); margin-bottom: 6px; }
.auth-sub { color: var(--text-soft); margin-bottom: 24px; }

.form-row { margin-bottom: 14px; }
.form-row label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text-soft); }
.input-wrap { position: relative; }
.input-wrap i {
  position: absolute; left: 16px; top: 50%;
  transform: translateY(-50%); color: var(--text-muted);
}
.input-wrap input { padding-left: 44px; }

.pwd-strength { margin-top: 8px; }
.ps-bar { height: 4px; background: var(--bg-muted); border-radius: 2px; overflow: hidden; margin-bottom: 4px; }
.ps-fill { height: 100%; transition: all 0.3s; }

.terms {
  display: flex; align-items: center; gap: 8px;
  margin: 12px 0 20px; font-size: 13px;
  cursor: pointer;
}
.terms input { accent-color: var(--primary); }

.btn-block { display: flex; width: 100%; justify-content: center; }
.auth-link { text-align: center; font-size: 14px; color: var(--text-soft); margin-top: 20px; }
.auth-link a { color: var(--primary); font-weight: 600; }
.auth-link a:hover { text-decoration: underline; }

@media (max-width: 768px) {
  .auth-card { grid-template-columns: 1fr; }
  .auth-side { display: none; }
}
</style>
