<template>
  <div class="container cart-page">
    <h1 class="page-title"><i class="fas fa-shopping-cart"></i> {{ $t('cart.title') }}</h1>
    <div v-if="store.cart.length === 0" class="empty">
      <i class="fas fa-shopping-cart"></i>
      <h2>{{ $t('cart.empty') }}</h2>
      <p>{{ $t('cart.emptyDesc') }}</p>
      <router-link to="/courses" class="btn btn-primary"><i class="fas fa-rocket"></i> {{ $t('home.browseCourses') }}</router-link>
    </div>
    <div v-else class="cart-grid">
      <div class="cart-items">
        <div v-for="c in store.cart" :key="c.id" class="cart-item">
          <img :src="c.thumbnail" />
          <div class="ci-body">
            <h3>{{ locale === 'tr' ? c.title : c.title_en }}</h3>
            <div class="ci-meta"><i class="fas fa-star"></i> {{ c.rating }} · {{ c.hours }}h · {{ c.lessons }} {{ $t('course.lessons') }}</div>
            <div class="ci-price">₺{{ c.price }}</div>
          </div>
          <button class="btn-remove" @click="store.removeFromCart(c.id)" :title="$t('cart.remove')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="cart-summary card">
        <h2><i class="fas fa-receipt"></i> {{ locale === 'tr' ? 'Sipariş Özeti' : 'Order Summary' }}</h2>
        <div class="sum-row">
          <span>{{ locale === 'tr' ? 'Ara Toplam' : 'Subtotal' }}</span>
          <span>₺{{ store.cartTotal }}</span>
        </div>
        <div class="sum-row">
          <span>{{ locale === 'tr' ? 'İndirim' : 'Discount' }}</span>
          <span style="color: #27ae60;">-₺{{ Math.floor(store.cartTotal * 0.1) }}</span>
        </div>
        <div class="sum-row total">
          <span>{{ $t('cart.total') }}</span>
          <span>₺{{ store.cartTotal - Math.floor(store.cartTotal * 0.1) }}</span>
        </div>
        <router-link to="/checkout" class="btn btn-primary btn-block">
          <i class="fas fa-credit-card"></i> {{ $t('cart.checkout') }}
        </router-link>
        <div class="payment-icons">
          <i class="fab fa-cc-visa"></i>
          <i class="fab fa-cc-mastercard"></i>
          <i class="fab fa-cc-paypal"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useMainStore } from '../stores'
const store = useMainStore()
const { locale } = useI18n()
</script>

<style scoped>
.cart-page { padding: 40px 24px 80px; }
.page-title {
  font-size: 32px; font-weight: 800;
  margin-bottom: 30px;
  color: var(--secondary);
  display: flex; align-items: center; gap: 12px;
}
.page-title i { color: var(--primary); }

.empty { text-align: center; padding: 80px 20px; background: white; border-radius: 20px; }
.empty i { font-size: 60px; color: var(--primary); opacity: 0.3; margin-bottom: 20px; }
.empty h2 { color: var(--secondary); margin-bottom: 8px; }
.empty p { color: var(--text-soft); margin-bottom: 24px; }

.cart-grid {
  display: grid; grid-template-columns: 2fr 1fr;
  gap: 24px;
}
.cart-items { display: flex; flex-direction: column; gap: 16px; }
.cart-item {
  background: white;
  border-radius: 16px;
  padding: 16px;
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 16px;
  align-items: center;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;
}
.cart-item:hover { box-shadow: var(--shadow); }
.cart-item img {
  width: 140px; height: 90px;
  object-fit: cover; border-radius: 10px;
}
.ci-body h3 { font-size: 16px; color: var(--secondary); margin-bottom: 6px; }
.ci-meta { font-size: 13px; color: var(--text-soft); margin-bottom: 8px; }
.ci-meta i { color: #fbbf24; }
.ci-price { font-size: 20px; font-weight: 800; color: var(--primary-dark); }
.btn-remove {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: #fee2e2; color: var(--accent-2);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.btn-remove:hover { background: var(--accent-2); color: white; }

.cart-summary { padding: 28px; height: fit-content; position: sticky; top: 100px; }
.cart-summary h2 {
  font-size: 18px; font-weight: 700;
  margin-bottom: 20px;
  display: flex; align-items: center; gap: 10px;
  color: var(--secondary);
}
.cart-summary h2 i { color: var(--primary); }
.sum-row {
  display: flex; justify-content: space-between;
  padding: 10px 0; color: var(--text-soft);
}
.sum-row.total {
  font-size: 22px; font-weight: 800;
  color: var(--secondary);
  border-top: 2px solid var(--border);
  padding-top: 16px; margin-top: 8px;
}
.btn-block { display: flex; width: 100%; justify-content: center; margin-top: 20px; }
.payment-icons {
  display: flex; justify-content: center; gap: 14px;
  font-size: 28px; color: var(--text-muted);
  margin-top: 20px;
}

@media (max-width: 768px) {
  .cart-grid { grid-template-columns: 1fr; }
  .cart-item { grid-template-columns: 100px 1fr; }
  .cart-item img { width: 100px; height: 70px; }
  .btn-remove { grid-column: 2; justify-self: end; }
}
</style>
