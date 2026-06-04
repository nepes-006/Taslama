<template>
  <header class="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_0_rgb(0_0_0/0.04)] transition-shadow duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14 md:h-[4.25rem]">

        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 flex-shrink-0">
          <div class="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-1.5 md:p-2 rounded-xl shadow-md shadow-blue-600/25 transition-transform duration-300 hover:scale-[1.03] flex-shrink-0">
            <BookOpen class="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div class="flex flex-col leading-tight">
            <span class="text-xs md:text-sm font-semibold text-blue-600 tracking-wide">Goşmaça we Üznüksiz</span>
            <span class="text-sm md:text-base font-extrabold tracking-tight text-gray-900">Bilim Merkezi</span>
          </div>
        </RouterLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1">
          <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
            class="relative px-4 py-2 text-sm font-medium text-gray-600 rounded-lg transition-all duration-200 hover:text-gray-900 hover:bg-gray-100/80"
            :class="navActive(item) ? 'text-blue-600 bg-blue-50/90 shadow-sm shadow-blue-600/10 ring-1 ring-blue-100' : ''">
            {{ item.label }}
          </RouterLink>
          <!-- Kurslar dropdown -->
          <div class="relative" ref="coursesRef">
            <button type="button" @click="coursesOpen = !coursesOpen"
              class="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1"
              :class="isCoursesActive ? 'text-blue-600 bg-blue-50/90 shadow-sm shadow-blue-600/10 ring-1 ring-blue-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'">
              {{ t('nav.courses') }}
              <svg class="w-3.5 h-3.5 transition-transform duration-200" :class="coursesOpen ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <Transition enter-active-class="transition duration-150 ease-out" enter-from-class="opacity-0 -translate-y-1 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100" leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100 translate-y-0 scale-100" leave-to-class="opacity-0 -translate-y-1 scale-95">
              <div v-if="coursesOpen" class="absolute left-0 top-full pt-2 z-50 w-72">
                <div class="bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden">
                  <RouterLink to="/online-courses" @click="coursesOpen = false"
                    class="flex items-start gap-3 px-4 py-4 hover:bg-blue-50 transition-colors group">
                    <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                      <span class="text-lg">📡</span>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-gray-900 group-hover:text-blue-700">{{ t('nav.online_courses') }}</p>
                      <p class="text-xs text-gray-500 mt-0.5">{{ t('nav.online_courses_desc') }}</p>
                    </div>
                  </RouterLink>
                  <div class="border-t border-gray-50"></div>
                  <RouterLink to="/shop" @click="coursesOpen = false"
                    class="flex items-start gap-3 px-4 py-4 hover:bg-purple-50 transition-colors group">
                    <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                      <span class="text-lg">🛒</span>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-gray-900 group-hover:text-purple-700">{{ t('nav.shop') }}</p>
                      <p class="text-xs text-gray-500 mt-0.5">{{ t('nav.shop_desc') }}</p>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </Transition>
          </div>
        </nav>

        <!-- Right side -->
        <div class="flex items-center gap-1 md:gap-2">
          <!-- Dil saýlaýjy -->
          <div class="relative" ref="langRef">
            <button type="button"
              @click="langOpen = !langOpen"
              class="flex items-center gap-1 px-1.5 py-1.5 rounded-xl hover:bg-gray-100 transition-colors">
              <span class="w-7 h-5 rounded-sm overflow-hidden flex-shrink-0 shadow-sm">
                <component :is="currentLang.flagSvg" />
              </span>
              <svg class="w-3 h-3 text-gray-400 transition-transform duration-200" :class="langOpen ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div v-if="langOpen" class="absolute right-0 top-full pt-1 z-50">
              <div class="bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden min-w-[150px]">
                <button v-for="lang in languages" :key="lang.code" type="button"
                  @click="setLang(lang.code); langOpen = false"
                  class="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition-colors"
                  :class="locale === lang.code ? 'bg-blue-50' : ''">
                  <span class="w-7 h-5 rounded-sm overflow-hidden flex-shrink-0 shadow-sm">
                    <component :is="lang.flagSvg" />
                  </span>
                  <span class="text-sm font-medium" :class="locale === lang.code ? 'text-blue-700' : 'text-gray-700'">{{ lang.name }}</span>
                  <svg v-if="locale === lang.code" class="w-3.5 h-3.5 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Avatar dropdown (logged in) -->
          <div v-if="auth.isAuthenticated()" class="relative hidden md:block" ref="avatarRef">
            <button type="button" @click="avatarOpen = !avatarOpen"
              class="flex items-center gap-2 p-0.5 rounded-full border-2 border-transparent hover:border-blue-400 transition-all duration-200">
              <img :src="auth.avatarUrl.value"
                class="w-9 h-9 rounded-full object-cover shadow-sm"
                @error="e => e.target.src='https://i.pravatar.cc/200?u=default'" />
            </button>
            <Transition enter-active-class="transition duration-150 ease-out" enter-from-class="opacity-0 -translate-y-1 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100" leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100 translate-y-0 scale-100" leave-to-class="opacity-0 -translate-y-1 scale-95">
              <div v-if="avatarOpen" class="absolute right-0 top-full pt-2 z-50 w-64">
                <div class="bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden">
                  <!-- Header -->
                  <div class="flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                    <img :src="auth.avatarUrl.value"
                      class="w-12 h-12 rounded-full border-2 border-white object-cover flex-shrink-0"
                      @error="e => e.target.src='https://i.pravatar.cc/200?u=default'" />
                    <div class="min-w-0">
                      <div class="font-bold text-sm truncate">{{ auth.user.value?.firstName }} {{ auth.user.value?.lastName }}</div>
                      <div class="text-xs text-white/80 truncate">{{ auth.user.value?.email }}</div>
                    </div>
                  </div>
                  <!-- Links -->
                  <RouterLink to="/profile" @click="avatarOpen = false"
                    class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                    <User class="w-4 h-4" /> {{ t('nav.profile') }}
                  </RouterLink>
                  <RouterLink to="/my-learning" @click="avatarOpen = false"
                    class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                    <BookOpen class="w-4 h-4" /> {{ t('nav.myLearning') }}
                  </RouterLink>
                  <div v-if="auth.user.value?.isAdmin" class="border-t border-gray-50">
                    <RouterLink to="/admin" @click="avatarOpen = false"
                      class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                      <LayoutGrid class="w-4 h-4" /> Admin
                    </RouterLink>
                  </div>
                  <div class="border-t border-gray-100">
                    <button type="button" @click="handleLogout; avatarOpen = false"
                      class="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut class="w-4 h-4" /> Çykyş
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Giriş -->
          <RouterLink v-if="!auth.isAuthenticated()" to="/login"
            class="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200">
            <LogIn class="w-4 h-4" />
            <span>{{ t('auth.login') }}</span>
          </RouterLink>

          <!-- Hasaba alyň -->
          <RouterLink v-if="!auth.isAuthenticated()" to="/register"
            class="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-sm shadow-blue-600/25">
            <UserPlus class="w-4 h-4" />
            <span>{{ t('auth.register') }}</span>
          </RouterLink>

          <!-- Çykyş -->
          <button v-if="auth.isAuthenticated()" type="button" @click="handleLogout"
            class="p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 active:scale-95" title="Çykyş">
            <LogOut class="w-5 h-5" />
          </button>

          <!-- Mobil menýu -->
          <button type="button" @click="menuOpen = !menuOpen"
            class="md:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-200 active:scale-95"
            :aria-expanded="menuOpen" aria-label="Menýu">
            <X v-if="menuOpen" class="w-5 h-5" />
            <Menu v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobil menýu -->
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
      <div v-if="menuOpen" class="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md shadow-lg shadow-gray-200/50">
        <div class="px-3 py-4 space-y-1 max-h-[min(70vh,28rem)] overflow-y-auto">
          <RouterLink v-for="item in navItems" :key="item.to + '-m'" :to="item.to" @click="menuOpen = false"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-700 font-medium transition-all duration-200 active:scale-[0.99]"
            :class="navActive(item) ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'">
            <component :is="item.icon" class="w-5 h-5 opacity-80" />
            {{ item.label }}
          </RouterLink>
          <!-- Mobil kurslar -->
          <RouterLink to="/online-courses" @click="menuOpen = false"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-700 font-medium hover:bg-blue-50 transition-all"
            :class="route.path === '/online-courses' ? 'bg-blue-50 text-blue-700' : ''">
            <span class="text-xl">📡</span> {{ t('nav.online_courses') }}
          </RouterLink>
          <RouterLink to="/shop" @click="menuOpen = false"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-700 font-medium hover:bg-purple-50 transition-all"
            :class="route.path === '/shop' || route.path.startsWith('/shop/') ? 'bg-purple-50 text-purple-700' : ''">
            <span class="text-xl">🛒</span> {{ t('nav.shop') }}
          </RouterLink>
          <div class="border-t border-gray-100 pt-3 mt-2 space-y-1">
            <template v-if="!auth.isAuthenticated()">
              <RouterLink to="/login" @click="menuOpen = false"
                class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200">
                <LogIn class="w-5 h-5 opacity-80" />
                {{ t('auth.login') }}
              </RouterLink>
              <RouterLink to="/register" @click="menuOpen = false"
                class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-white font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                <UserPlus class="w-5 h-5 opacity-80" />
                {{ t('auth.register') }}
              </RouterLink>
            </template>
            <button v-else type="button" @click="handleLogout; menuOpen = false"
              class="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-600 font-medium hover:bg-red-50 transition-all duration-200">
              <LogOut class="w-5 h-5 opacity-80" />
              Çykyş
            </button>
          </div>
          <div class="border-t border-gray-100 pt-3 mt-2 px-4">
            <p class="text-xs text-gray-500 mb-2 font-medium">Dil saýla</p>
            <div class="flex gap-2">
              <button v-for="lang in languages" :key="lang.code" type="button" @click="setLang(lang.code)"
                class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors border"
                :class="locale === lang.code ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'">
                <span class="w-6 h-4 rounded-sm overflow-hidden shadow-sm flex-shrink-0">
                  <component :is="lang.flagSvg" />
                </span>
                <span class="text-xs font-semibold" :class="locale === lang.code ? 'text-blue-700' : 'text-gray-600'">{{ lang.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { BookOpen, User, LogOut, LogIn, UserPlus, Menu, X, Home, GraduationCap, LayoutGrid } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'
import FlagTM from './flags/FlagTM.vue'
import FlagRU from './flags/FlagRU.vue'
import FlagEN from './flags/FlagEN.vue'

const auth = useAuth()
const router = useRouter()
const route = useRoute()
const { locale, t } = useI18n()

const menuOpen = ref(false)
const langOpen = ref(false)
const langRef = ref(null)
const coursesOpen = ref(false)
const coursesRef = ref(null)
const avatarOpen = ref(false)
const avatarRef = ref(null)

const languages = [
  { code: 'tm', name: 'Türkmençe', flagSvg: FlagTM },
  { code: 'ru', name: 'Русский',   flagSvg: FlagRU },
  { code: 'en', name: 'English',   flagSvg: FlagEN },
]

const currentLang = computed(() => languages.find(l => l.code === locale.value) || languages[0])

function setLang(code) {
  locale.value = code
  localStorage.setItem('lang', code)
}

const navItems = computed(() => [
  { to: '/', label: t('nav.home'), match: 'exact', icon: Home },
  { to: '/about', label: t('nav.about'), match: 'exact', icon: BookOpen },
  { to: '/instructors', label: t('nav.instructors'), match: 'instructors', icon: GraduationCap },
  { to: '/my-learning', label: t('nav.myLearning'), match: 'exact', icon: GraduationCap },
  { to: '/profile', label: t('nav.profile'), match: 'exact', icon: User },
  ...(auth.user.value?.isAdmin ? [{ to: '/admin', label: 'Admin', match: 'exact', icon: LayoutGrid }] : []),
])

const isCoursesActive = computed(() =>
  route.path === '/courses' || route.path.startsWith('/course/') ||
  route.path === '/online-courses' || route.path === '/shop' || route.path.startsWith('/shop/')
)

function navActive(item) {
  if (item.match === 'courses') return route.path === '/courses' || route.path.startsWith('/course/')
  if (item.match === 'instructors') return route.path === '/instructors' || route.path.startsWith('/instructors/')
  return route.path === item.to
}

function handleLogout() {
  auth.logout()
  router.push('/')
}

function onClickOutside(e) {
  if (langRef.value && !langRef.value.contains(e.target)) langOpen.value = false
  if (coursesRef.value && !coursesRef.value.contains(e.target)) coursesOpen.value = false
  if (avatarRef.value && !avatarRef.value.contains(e.target)) avatarOpen.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>
