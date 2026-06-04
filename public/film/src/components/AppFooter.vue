<template>
  <footer class="footer">
    <div class="footer-wave">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="#0f2027"/></svg>
    </div>
    <div class="footer-inner">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <div class="footer-logo">
              <i class="fas fa-graduation-cap"></i>
              <span>EduLearn</span>
            </div>
            <p class="footer-desc">{{ $t('footer.aboutDesc') }}</p>
            <div class="social-icons">
              <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"><i class="fab fa-twitter"></i></a>
              <a href="#" class="social"><i class="fab fa-instagram"></i></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
              <a href="#" class="social"><i class="fab fa-youtube"></i></a>
            </div>
          </div>

          <div class="footer-col">
            <h4>{{ $t('footer.links') }}</h4>
            <ul>
              <li><router-link to="/">{{ $t('nav.home') }}</router-link></li>
              <li><router-link to="/courses">{{ $t('nav.courses') }}</router-link></li>
              <li><router-link to="/instructors">{{ $t('nav.instructors') }}</router-link></li>
              <li><router-link to="/login">{{ $t('nav.login') }}</router-link></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>{{ $t('footer.categories') }}</h4>
            <ul>
              <li v-for="c in cats.slice(0,6)" :key="c.id">
                <router-link :to="`/category/${c.id}`">{{ locale === 'tr' ? c.tr : c.en }}</router-link>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>{{ $t('footer.newsletter') }}</h4>
            <p class="footer-desc">{{ $t('footer.newsletterDesc') }}</p>
            <form class="newsletter" @submit.prevent="subscribe">
              <input type="email" placeholder="email@example.com" v-model="email" />
              <button type="submit"><i class="fas fa-paper-plane"></i></button>
            </form>
            <div class="contact-info">
              <div><i class="fas fa-envelope"></i> info@edulearn.com</div>
              <div><i class="fas fa-phone"></i> +90 555 123 4567</div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© 2026 EduLearn. {{ $t('footer.rights') }}</span>
          <div class="payment-icons">
            <i class="fab fa-cc-visa"></i>
            <i class="fab fa-cc-mastercard"></i>
            <i class="fab fa-cc-paypal"></i>
            <i class="fab fa-cc-stripe"></i>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { categories } from '../data/categories.js'
const { locale } = useI18n()
const cats = categories
const email = ref('')
const subscribe = () => {
  if (email.value) { alert('✅ Abone oldunuz!'); email.value = '' }
}
</script>

<style scoped>
.footer { position: relative; margin-top: 80px; }
.footer-wave svg { display: block; width: 100%; height: 80px; }
.footer-inner {
  background: #0f2027;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  color: white; padding: 60px 0 30px;
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
  gap: 40px;
  margin-bottom: 40px;
}
.footer-logo {
  display: flex; align-items: center; gap: 10px;
  font-size: 24px; font-weight: 800;
  margin-bottom: 16px;
}
.footer-logo i { color: var(--primary); font-size: 28px; }
.footer-desc {
  color: rgba(255,255,255,0.7);
  margin-bottom: 16px; line-height: 1.6;
  font-size: 14px;
}
.social-icons { display: flex; gap: 10px; }
.social {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  color: white; transition: all 0.3s;
}
.social:hover {
  background: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(26,188,156,0.4);
}
.footer-col h4 {
  font-size: 17px; font-weight: 700;
  margin-bottom: 18px;
  position: relative; padding-bottom: 10px;
}
.footer-col h4::after {
  content: ''; position: absolute;
  bottom: 0; left: 0; width: 30px; height: 3px;
  background: var(--primary); border-radius: 3px;
}
.footer-col ul { list-style: none; }
.footer-col li { margin-bottom: 10px; }
.footer-col a {
  color: rgba(255,255,255,0.7);
  transition: all 0.2s; font-size: 14px;
}
.footer-col a:hover { color: var(--primary); padding-left: 5px; }

.newsletter {
  display: flex; margin-bottom: 16px;
  background: rgba(255,255,255,0.1);
  border-radius: 30px; padding: 4px;
}
.newsletter input {
  flex: 1; background: transparent; border: none;
  padding: 10px 16px; color: white; outline: none;
  font-family: inherit;
}
.newsletter input::placeholder { color: rgba(255,255,255,0.5); }
.newsletter button {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--primary); color: white;
}
.newsletter button:hover { background: var(--primary-dark); }

.contact-info { font-size: 13px; color: rgba(255,255,255,0.7); }
.contact-info div { margin-bottom: 8px; }
.contact-info i { margin-right: 8px; color: var(--primary); }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 24px;
  display: flex; justify-content: space-between;
  align-items: center; font-size: 13px;
  color: rgba(255,255,255,0.6);
}
.payment-icons { display: flex; gap: 12px; font-size: 28px; }
.payment-icons i { transition: all 0.2s; }
.payment-icons i:hover { color: var(--primary); transform: scale(1.1); }

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr; gap: 30px; }
  .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
}
</style>
