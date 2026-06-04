<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="container header-inner">
      <router-link to="/" class="logo">
        <div class="logo-icon"><i class="fas fa-graduation-cap"></i></div>
        <span class="logo-text">EduLearn</span>
      </router-link>

      <nav class="nav-links">
        <router-link to="/" class="nav-link">{{ $t('nav.home') }}</router-link>
        <router-link to="/courses" class="nav-link">{{ $t('nav.courses') }}</router-link>
        <router-link to="/instructors" class="nav-link">{{ $t('nav.instructors') }}</router-link>
        <router-link v-if="store.isLoggedIn" to="/my-courses" class="nav-link">{{ $t('nav.myCourses') }}</router-link>
        <router-link v-if="store.isLoggedIn" to="/certificates" class="nav-link">{{ $t('nav.certificates') }}</router-link>
      </nav>

      <div class="header-search">
        <i class="fas fa-search"></i>
        <input :placeholder="$t('nav.search')" v-model="searchQuery" @keyup.enter="doSearch" />
      </div>

      <div class="header-actions">
        <button class="lang-toggle" @click="toggleLang">
          <i class="fas fa-globe"></i>
          <span>{{ locale.toUpperCase() }}</span>
        </button>

        <router-link to="/cart" class="icon-btn cart-btn">
          <i class="fas fa-shopping-cart"></i>
          <span v-if="store.cartCount > 0" class="badge-count">{{ store.cartCount }}</span>
        </router-link>

        <template v-if="store.isLoggedIn">
          <div class="user-menu" @click="menuOpen = !menuOpen" v-click-outside="() => menuOpen = false">
            <img :src="store.user.avatar" class="user-avatar" />
            <transition name="dropdown">
              <div v-if="menuOpen" class="dropdown">
                <div class="dropdown-header">
                  <img :src="store.user.avatar" />
                  <div>
                    <div class="user-name">{{ store.user.name }}</div>
                    <div class="user-email">{{ store.user.email }}</div>
                  </div>
                </div>
                <router-link to="/profile" class="dropdown-item"><i class="fas fa-user"></i>{{ $t('nav.profile') }}</router-link>
                <router-link to="/my-courses" class="dropdown-item"><i class="fas fa-book"></i>{{ $t('nav.myCourses') }}</router-link>
                <router-link to="/certificates" class="dropdown-item"><i class="fas fa-award"></i>{{ $t('nav.certificates') }}</router-link>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item logout" @click="logout"><i class="fas fa-sign-out-alt"></i>{{ $t('nav.logout') }}</button>
              </div>
            </transition>
          </div>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-ghost hide-mobile">{{ $t('nav.login') }}</router-link>
          <router-link to="/register" class="btn btn-primary">{{ $t('nav.register') }}</router-link>
        </template>

        <button class="mobile-toggle" @click="mobileOpen = !mobileOpen">
          <i :class="mobileOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>
    </div>

    <transition name="slide">
      <div v-if="mobileOpen" class="mobile-menu">
        <router-link to="/" class="mobile-link" @click="mobileOpen = false">{{ $t('nav.home') }}</router-link>
        <router-link to="/courses" class="mobile-link" @click="mobileOpen = false">{{ $t('nav.courses') }}</router-link>
        <router-link to="/instructors" class="mobile-link" @click="mobileOpen = false">{{ $t('nav.instructors') }}</router-link>
        <router-link v-if="store.isLoggedIn" to="/my-courses" class="mobile-link" @click="mobileOpen = false">{{ $t('nav.myCourses') }}</router-link>
        <router-link v-if="store.isLoggedIn" to="/profile" class="mobile-link" @click="mobileOpen = false">{{ $t('nav.profile') }}</router-link>
        <router-link v-if="!store.isLoggedIn" to="/login" class="mobile-link" @click="mobileOpen = false">{{ $t('nav.login') }}</router-link>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMainStore } from '../stores'

const store = useMainStore()
const router = useRouter()
const { locale } = useI18n()

const isScrolled = ref(false)
const menuOpen = ref(false)
const mobileOpen = ref(false)
const searchQuery = ref('')

const onScroll = () => { isScrolled.value = window.scrollY > 30 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const toggleLang = () => {
  locale.value = locale.value === 'tr' ? 'en' : 'tr'
  localStorage.setItem('locale', locale.value)
}

const doSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/courses', query: { q: searchQuery.value } })
    searchQuery.value = ''
  }
}

const logout = () => {
  store.logout()
  menuOpen.value = false
  router.push('/')
}

const vClickOutside = {
  mounted(el, binding) {
    el._handler = (e) => { if (!el.contains(e.target)) binding.value() }
    document.addEventListener('click', el._handler)
  },
  unmounted(el) { document.removeEventListener('click', el._handler) }
}
</script>

<style scoped>
.header {
  position: sticky; top: 0; z-index: 100;
  background: white; transition: all 0.3s;
  border-bottom: 1px solid var(--border);
}
.header.scrolled {
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  backdrop-filter: blur(10px);
  background: rgba(255,255,255,0.95);
}
.header-inner {
  display: flex; align-items: center; gap: 24px;
  height: 80px;
}
.logo {
  display: flex; align-items: center; gap: 10px;
  font-weight: 800; font-size: 22px;
}
.logo-icon {
  width: 42px; height: 42px;
  background: var(--gradient);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 20px;
  box-shadow: 0 4px 14px rgba(26,188,156,0.4);
  animation: pulse 3s ease-in-out infinite;
}
.logo-text {
  background: var(--gradient-2);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.nav-links {
  display: flex; gap: 4px; flex: 1;
}
.nav-link {
  padding: 8px 16px; border-radius: 8px;
  color: var(--text); font-weight: 500;
  transition: all 0.2s;
  position: relative;
}
.nav-link:hover { color: var(--primary); background: var(--bg-soft); }
.nav-link.router-link-active { color: var(--primary); }
.nav-link.router-link-active::after {
  content: ''; position: absolute;
  bottom: -2px; left: 50%; transform: translateX(-50%);
  width: 20px; height: 3px;
  background: var(--gradient);
  border-radius: 3px;
}

.header-search {
  flex: 1; max-width: 320px;
  display: flex; align-items: center; gap: 10px;
  padding: 10px 16px;
  background: var(--bg-soft);
  border-radius: 30px; border: 2px solid transparent;
  transition: all 0.3s;
}
.header-search:focus-within { border-color: var(--primary); background: white; }
.header-search i { color: var(--text-muted); }
.header-search input {
  border: none; outline: none; background: transparent;
  flex: 1; font-size: 14px; font-family: inherit;
}

.header-actions {
  display: flex; align-items: center; gap: 12px;
}
.lang-toggle {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 12px; border-radius: 8px;
  font-weight: 600; font-size: 13px;
  color: var(--text-soft); transition: all 0.2s;
}
.lang-toggle:hover { background: var(--bg-soft); color: var(--primary); }

.icon-btn {
  position: relative;
  width: 42px; height: 42px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  background: var(--bg-soft);
  color: var(--text); font-size: 16px;
  transition: all 0.2s;
}
.icon-btn:hover { background: var(--primary); color: white; transform: translateY(-2px); }
.badge-count {
  position: absolute; top: -4px; right: -4px;
  min-width: 20px; height: 20px;
  background: var(--accent-2); color: white;
  border-radius: 10px; padding: 0 6px;
  font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid white;
}

.user-menu {
  position: relative; cursor: pointer;
}
.user-avatar {
  width: 42px; height: 42px;
  border-radius: 50%;
  border: 3px solid var(--primary);
  transition: all 0.2s;
}
.user-avatar:hover { transform: scale(1.05); }

.dropdown {
  position: absolute; top: calc(100% + 12px); right: 0;
  background: white; border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  min-width: 260px; overflow: hidden;
  border: 1px solid var(--border);
}
.dropdown-header {
  padding: 16px; display: flex; gap: 12px; align-items: center;
  background: var(--gradient); color: white;
}
.dropdown-header img {
  width: 48px; height: 48px; border-radius: 50%;
  border: 2px solid white;
}
.user-name { font-weight: 700; font-size: 15px; }
.user-email { font-size: 12px; opacity: 0.9; }

.dropdown-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 18px; color: var(--text);
  transition: all 0.2s; font-size: 14px;
  width: 100%; text-align: left;
}
.dropdown-item:hover { background: var(--bg-soft); color: var(--primary); }
.dropdown-item i { width: 18px; }
.dropdown-item.logout { color: var(--accent-2); }
.dropdown-divider { height: 1px; background: var(--border); margin: 4px 0; }

.dropdown-enter-active, .dropdown-leave-active { transition: all 0.25s; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-10px); }

.mobile-toggle {
  display: none;
  width: 42px; height: 42px;
  align-items: center; justify-content: center;
  font-size: 20px; color: var(--text);
}

.mobile-menu {
  display: none;
  flex-direction: column;
  background: white;
  padding: 16px;
  border-top: 1px solid var(--border);
}
.mobile-link {
  padding: 14px 16px;
  border-radius: 10px;
  font-weight: 500;
}
.mobile-link:hover { background: var(--bg-soft); color: var(--primary); }

.slide-enter-active, .slide-leave-active { transition: all 0.3s; }
.slide-enter-from, .slide-leave-to { opacity: 0; max-height: 0; }

@media (max-width: 1024px) {
  .nav-links { display: none; }
  .header-search { display: none; }
}
@media (max-width: 768px) {
  .mobile-toggle { display: flex; }
  .mobile-menu { display: flex; }
  .hide-mobile { display: none; }
}
</style>
