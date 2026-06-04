<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <AppHeader />

    <!-- Hero banner -->
    <div class="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div class="flex flex-col md:flex-row md:items-center gap-6">
          <div class="flex-1">
            <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full mb-4 border border-white/20 text-sm font-medium">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              {{ t('online.live_badge') }}
            </div>
            <h1 class="text-2xl md:text-4xl font-extrabold mb-3 tracking-tight">{{ t('online.title') }}</h1>
            <p class="text-blue-100 text-sm md:text-lg max-w-xl">{{ t('online.subtitle') }}</p>
          </div>
          <!-- Schedule card -->
          <div class="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 md:p-6 min-w-[220px]">
            <p class="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-3">{{ t('online.schedule_title') }}</p>
            <div class="space-y-2">
              <div v-for="day in scheduleDays" :key="day.key" class="flex items-center gap-2 text-sm">
                <span class="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-xs font-bold">{{ day.num }}</span>
                <span class="font-medium">{{ t(day.key) }}</span>
              </div>
              <div class="border-t border-white/20 pt-2 mt-2 flex items-center gap-2 text-sm">
                <Clock class="w-4 h-4 text-blue-200" />
                <span class="font-bold text-white">17:00 – 19:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex gap-6">

        <!-- Sidebar -->
        <aside class="hidden lg:flex flex-col gap-5 w-64 flex-shrink-0 sticky top-4 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-1"
          @mouseenter="lockPageScroll" @mouseleave="unlockPageScroll">
          <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Search class="w-4 h-4 text-blue-500" /> {{ t('courses.search_label') }}
            </h3>
            <div class="relative">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input v-model="search" type="text" :placeholder="t('courses.search')"
                class="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all" />
            </div>
          </div>
          <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-blue-500 inline-block"></span> {{ t('courses.categories') }}
            </h3>
            <ul class="space-y-1">
              <li>
                <button @click="selectedCat = 'All'; currentPage = 1"
                  :class="['w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center gap-2',
                    selectedCat === 'All' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50']">
                  <span class="w-2 h-2 rounded-full flex-shrink-0" :class="selectedCat === 'All' ? 'bg-blue-500' : 'bg-gray-300'"></span>
                  {{ t('courses.all') }}
                </button>
              </li>
              <li v-for="cat in categories" :key="cat.id">
                <button @click="selectedCat = cat.nameTm; currentPage = 1"
                  :class="['w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center gap-2',
                    selectedCat === cat.nameTm ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50']">
                  <span class="w-2 h-2 rounded-full flex-shrink-0" :class="selectedCat === cat.nameTm ? 'bg-blue-500' : 'bg-gray-300'"></span>
                  {{ locale === 'en' && cat.nameEn ? cat.nameEn : cat.nameTm }}
                </button>
              </li>
            </ul>
          </div>
          <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-green-500 inline-block"></span> {{ t('courses.level') }}
            </h3>
            <ul class="space-y-1">
              <li v-for="lvl in levels" :key="lvl.value">
                <button @click="selectedLevel = selectedLevel === lvl.value ? 'All' : lvl.value; currentPage = 1"
                  :class="['w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center gap-2',
                    selectedLevel === lvl.value ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50']">
                  <span>{{ lvl.icon }}</span> {{ t(lvl.labelKey) }}
                </button>
              </li>
            </ul>
          </div>
          <button v-if="hasFilters" @click="clearFilters"
            class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-500 hover:border-red-200 transition-all">
            <X class="w-4 h-4" /> {{ t('courses.clear') }}
          </button>
        </aside>

        <!-- Kurslar -->
        <div class="flex-1 min-w-0">
          <div class="flex flex-col sm:flex-row gap-3 mb-5">
            <div class="relative flex-1 lg:hidden">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input v-model="search" type="text" :placeholder="t('courses.search')"
                class="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
            </div>
            <div class="flex items-center gap-3 ml-auto">
              <span class="text-sm text-gray-500 hidden sm:block">{{ filtered.length }} {{ t('courses.courses_found') }}</span>
              <select v-model="sortBy"
                class="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer">
                <option value="default">{{ t('courses.sort_default') }}</option>
                <option value="rating">{{ t('courses.sort_rating') }}</option>
                <option value="students">{{ t('courses.sort_students') }}</option>
                <option value="price_asc">{{ t('courses.sort_price_asc') }}</option>
                <option value="price_desc">{{ t('courses.sort_price_desc') }}</option>
              </select>
            </div>
          </div>

          <div v-if="paginatedCourses.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <div v-for="(c, idx) in paginatedCourses" :key="c.id">
              <OnlineCourseCard :course="c" />
            </div>
          </div>
          <div v-else class="text-center py-16">
            <p class="text-gray-500 text-lg">{{ t('courses.not_found') }}</p>
            <button @click="clearFilters" class="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm">{{ t('courses.clear') }}</button>
          </div>

          <div v-if="totalPages > 1" class="flex items-center justify-center gap-1 mt-8">
            <button @click="currentPage--" :disabled="currentPage === 1"
              class="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
              <ChevronLeft class="w-4 h-4" />
            </button>
            <template v-for="page in visiblePages" :key="page">
              <span v-if="page === '...'" class="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">...</span>
              <button v-else @click="currentPage = page"
                :class="['w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold border transition-all',
                  currentPage === page ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50']">
                {{ page }}
              </button>
            </template>
            <button @click="currentPage++" :disabled="currentPage === totalPages"
              class="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search, X, ChevronLeft, ChevronRight, Clock } from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import OnlineCourseCard from '../components/OnlineCourseCard.vue'
import { courses, categories } from '../data/courses'

const { t, locale } = useI18n()
const search = ref('')
const selectedCat = ref('All')
const selectedLevel = ref('All')
const sortBy = ref('default')
const currentPage = ref(1)
const perPage = 9

const scheduleDays = [
  { key: 'online.day_mon', num: '1' },
  { key: 'online.day_wed', num: '3' },
  { key: 'online.day_fri', num: '5' },
]

const levels = [
  { value: 'Beginner',     labelKey: 'courses.beginner',     icon: '🟢' },
  { value: 'Intermediate', labelKey: 'courses.intermediate', icon: '🟡' },
  { value: 'Advanced',     labelKey: 'courses.advanced',     icon: '🔴' },
]

const hasFilters = computed(() => search.value !== '' || selectedCat.value !== 'All' || selectedLevel.value !== 'All')

const filtered = computed(() => {
  let list = courses.filter(c => {
    const matchCat   = selectedCat.value === 'All' || c.categoryTm === selectedCat.value
    const matchLevel = selectedLevel.value === 'All' || c.level === selectedLevel.value
    const q = search.value.toLowerCase()
    const matchSearch = c.titleTm.toLowerCase().includes(q) || c.descriptionTm.toLowerCase().includes(q) ||
      (c.titleEn && c.titleEn.toLowerCase().includes(q))
    return matchCat && matchLevel && matchSearch
  })
  if (sortBy.value === 'rating')        list = [...list].sort((a, b) => b.rating - a.rating)
  else if (sortBy.value === 'students') list = [...list].sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
  else if (sortBy.value === 'price_asc')  list = [...list].sort((a, b) => (a.price30||a.basePrice) - (b.price30||b.basePrice))
  else if (sortBy.value === 'price_desc') list = [...list].sort((a, b) => (b.price30||b.basePrice) - (a.price30||a.basePrice))
  return list
})

const totalPages = computed(() => Math.ceil(filtered.value.length / perPage))
const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filtered.value.slice(start, start + perPage)
})
const visiblePages = computed(() => {
  const total = totalPages.value, cur = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (cur <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (cur >= total - 3) return [1, '...', total-4, total-3, total-2, total-1, total]
  return [1, '...', cur-1, cur, cur+1, '...', total]
})

function clearFilters() { search.value = ''; selectedCat.value = 'All'; selectedLevel.value = 'All'; sortBy.value = 'default'; currentPage.value = 1 }
function lockPageScroll()   { document.body.style.overflow = 'hidden' }
function unlockPageScroll() { document.body.style.overflow = '' }
</script>
