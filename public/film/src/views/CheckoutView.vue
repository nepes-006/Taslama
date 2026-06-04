<template>
  <div class="container checkout">
    <h1 class="page-title"><i class="fas fa-credit-card"></i> {{ $t('cart.payment') }}</h1>

    <div v-if="success" class="success-screen">
      <div class="success-icon"><i class="fas fa-check"></i></div>
      <h2>{{ locale === 'tr' ? 'Ödemeniz Başarılı!' : 'Payment Successful!' }}</h2>
      <p>{{ locale === 'tr' ? 'Kurslarınız hesabınıza eklendi' : 'Your courses have been added to your account' }}</p>
      <div class="success-actions">
        <router-link to="/my-courses" class="btn btn-primary"><i class="fas fa-book"></i> {{ $t('nav.myCourses') }}</router-link>
        <router-link to="/" class="btn btn-outline">{{ $t('nav.home') }}</router-link>
      </div>
    </div>

    <div v-else class="checkout-grid">
      <div class="card payment-form">
        <h2><i class="fas fa-lock"></i> {{ locale === 'tr' ? 'Güvenli Ödeme' : 'Secure Payment' }}</h2>

        <div class="payment-methods">
          <label class="pm-option" :class="{active: method==='card'}">
            <input type="radio" v-model="method" value="card" />
            <i class="fas fa-credit-card"></i>
            <span>{{ locale === 'tr' ? 'Kredi Kartı' : 'Credit Card' }}</span>
          </label>
          <label class="pm-option" :class="{active: method==='paypal'}">
            <input type="radio" v-model="method" value="paypal" />
            <i class="fab fa-paypal"></i>
            <span>PayPal</span>
          </label>
          <label class="pm-option" :class="{active: method==='bank'}">
            <input type="radio" v-model="method" value="bank" />
            <i class="fas fa-university"></i>
            <span>{{ locale === 'tr' ? 'Havale' : 'Bank Transfer' }}</span>
          </label>
        </div>

        <div v-if="method==='card'" class="card-form">
          <div class="card-preview">
            <div class="cp-chip"><i class="fas fa-microchip"></i></div>
            <div class="cp-number">{{ card.number || '•••• •••• •••• ••••' }}</div>
            <div class="cp-bottom">
              <div>
                <div class="cp-label">{{ locale === 'tr' ? 'KART SAHİBİ' : 'CARDHOLDER' }}</div>
                <div class="cp-name">{{ card.name || 'AD SOYAD' }}</div>
              </div>
              <div>
                <div class="cp-label">{{ locale === 'tr' ? 'SON KUL.' : 'EXPIRES' }}</div>
                <div class="cp-name">{{ card.expiry || 'MM/YY' }}</div>
              </div>
              <div class="cp-brand"><i class="fab fa-cc-visa"></i></div>
            </div>
          </div>

          <div class="form-row">
            <label>{{ $t('cart.cardNumber') }}</label>
            <input class="input" v-model="card.number" maxlength="19" placeholder="1234 5678 9012 3456" @input="formatCard" />
          </div>
          <div class="form-row">
            <label>{{ $t('cart.cardName') }}</label>
            <input class="input" v-model="card.name" placeholder="AD SOYAD" />
          </div>
          <div class="form-grid">
            <div class="form-row">
              <label>{{ $t('cart.expiry') }}</label>
              <input class="input" v-model="card.expiry" maxlength="5" placeholder="MM/YY" />
            </div>
            <div class="form-row">
              <label>{{ $t('cart.cvv') }}</label>
              <input class="input" v-model="card.cvv" maxlength="3" placeholder="123" type="password" />
            </div>
          </div>
        </div>

        <button class="btn btn-primary btn-block" @click="pay" :disabled="processing">
          <i class="fas" :class="processing ? 'fa-spinner fa-spin' : 'fa-lock'"></i>
          {{ processing ? (locale==='tr'?'İşleniyor...':'Processing...') : ($t('cart.pay') + ' ₺' + total) }}
        </button>
        <div class="secure-info"><i class="fas fa-shield-alt"></i> {{ locale === 'tr' ? '256-bit SSL şifreleme ile güvenli ödeme' : '256-bit SSL secure payment' }}</div>
      </div>

      <div class="card order-summary">
        <h3>{{ locale === 'tr' ? 'Sipariş Özeti' : 'Order Summary' }}</h3>
        <div class="os-items">
          <div v-for="c in store.cart" :key="c.id" class="os-item">
            <img :src="c.thumbnail" />
            <div>
              <div class="os-title">{{ locale === 'tr' ? c.title : c.title_en }}</div>
              <div class="os-price">₺{{ c.price }}</div>
            </div>
          </div>
        </div>
        <div class="os-total">
          <span>{{ $t('cart.total') }}</span>
          <strong>₺{{ total }}</strong>
        </div>
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

const method = ref('card')
const processing = ref(false)
const success = ref(false)
const card = ref({ number: '', name: '', expiry: '', cvv: '' })
const total = computed(() => store.cartTotal - Math.floor(store.cartTotal * 0.1))

const formatCard = () => {
  card.value.number = card.value.number.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
}

const pay = () => {
  processing.value = true
  setTimeout(() => {
    store.checkoutAll()
    processing.value = false
    success.value = true
  }, 2000)
}
</script>

<style scoped>
.checkout { padding: 40px 24px 80px; }
.page-title {
  font-size: 32px; font-weight: 800;
  margin-bottom: 30px;
  color: var(--secondary);
  display: flex; align-items: center; gap: 12px;
}
.page-title i { color: var(--primary); }

.checkout-grid {
  display: grid; grid-template-columns: 2fr 1fr;
  gap: 24px;
}
.card { padding: 32px; }
.payment-form h2 {
  font-size: 18px; font-weight: 700;
  margin-bottom: 24px; color: var(--secondary);
  display: flex; align-items: center; gap: 10px;
}
.payment-form h2 i { color: var(--primary); }

.payment-methods {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 12px; margin-bottom: 28px;
}
.pm-option {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 18px;
  border: 2px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.pm-option:hover { border-color: var(--primary-light); }
.pm-option.active { border-color: var(--primary); background: rgba(26,188,156,0.05); }
.pm-option input { display: none; }
.pm-option i { font-size: 24px; color: var(--primary); }
.pm-option span { font-size: 13px; font-weight: 600; }

.card-preview {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  position: relative;
  height: 200px;
  box-shadow: 0 20px 40px rgba(30,60,114,0.4);
}
.card-preview::before {
  content: ''; position: absolute;
  top: -30px; right: -30px;
  width: 120px; height: 120px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
}
.cp-chip { font-size: 28px; opacity: 0.8; margin-bottom: 28px; }
.cp-number {
  font-size: 22px; font-weight: 700;
  letter-spacing: 2px; margin-bottom: 24px;
  font-family: monospace;
}
.cp-bottom {
  display: flex; justify-content: space-between;
  align-items: end;
}
.cp-label { font-size: 9px; opacity: 0.7; margin-bottom: 4px; }
.cp-name { font-size: 13px; font-weight: 600; }
.cp-brand { font-size: 36px; }

.form-row { margin-bottom: 16px; }
.form-row label {
  display: block; font-size: 13px; font-weight: 600;
  margin-bottom: 6px; color: var(--text-soft);
}
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.btn-block { display: flex; width: 100%; justify-content: center; margin-top: 8px; }
.secure-info {
  text-align: center; font-size: 13px;
  color: var(--text-soft); margin-top: 16px;
}
.secure-info i { color: #27ae60; margin-right: 6px; }

.order-summary { height: fit-content; }
.order-summary h3 { margin-bottom: 16px; color: var(--secondary); }
.os-items { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
.os-item {
  display: flex; gap: 12px;
  padding: 8px;
  border-radius: 10px;
  background: var(--bg-soft);
}
.os-item img { width: 60px; height: 40px; object-fit: cover; border-radius: 6px; }
.os-title { font-size: 13px; font-weight: 600; line-height: 1.3; }
.os-price { font-size: 14px; font-weight: 700; color: var(--primary-dark); margin-top: 4px; }
.os-total {
  display: flex; justify-content: space-between;
  align-items: center; padding-top: 16px;
  border-top: 2px solid var(--border);
  font-size: 18px;
}
.os-total strong { color: var(--primary-dark); font-size: 22px; }

.success-screen {
  text-align: center; padding: 80px 20px;
  background: white; border-radius: 24px;
}
.success-icon {
  width: 100px; height: 100px;
  background: linear-gradient(135deg, #1abc9c, #27ae60);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 24px;
  font-size: 50px; color: white;
  animation: scaleIn 0.5s ease;
  box-shadow: 0 20px 50px rgba(26,188,156,0.4);
}
.success-screen h2 { font-size: 30px; color: var(--secondary); margin-bottom: 8px; }
.success-screen p { color: var(--text-soft); margin-bottom: 24px; }
.success-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

@media (max-width: 768px) {
  .checkout-grid { grid-template-columns: 1fr; }
  .payment-methods { grid-template-columns: 1fr; }
}
</style>
