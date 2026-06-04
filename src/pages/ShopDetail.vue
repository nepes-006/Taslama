<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <AppHeader />

    <div v-if="!course" class="flex items-center justify-center py-32 text-center">
      <div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">{{ t('courses.not_found') }}</h2>
        <RouterLink to="/shop" class="text-purple-600 hover:underline">← {{ t('shop.back') }}</RouterLink>
      </div>
    </div>

    <template v-else>
      <!-- Hero -->
      <div class="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.25),transparent)]" />
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <div class="flex items-center gap-2 mb-3 text-sm">
                <RouterLink to="/shop" class="text-gray-300 hover:text-white">{{ t('shop.title') }}</RouterLink>
                <ChevronRight class="w-4 h-4 text-gray-400" />
                <span class="text-gray-300">{{ courseCategory }}</span>
              </div>
              <h1 class="text-2xl md:text-4xl font-bold mb-3 leading-tight">{{ courseTitle }}</h1>
              <p class="text-base md:text-xl text-gray-300 mb-4">{{ courseDesc }}</p>
              <div class="flex flex-wrap items-center gap-4 mb-4">
                <div class="flex items-center gap-1">
                  <Star class="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span class="font-semibold">{{ course.rating }}</span>
                  <span class="text-gray-400 ml-1 text-sm">({{ course.studentsEnrolled }})</span>
                </div>
                <div class="flex items-center gap-2">
                  <Play class="w-4 h-4 text-purple-300" />
                  <span class="text-sm">{{ videoCount }} {{ t('shop.videos') }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Clock class="w-4 h-4 text-purple-300" />
                  <span class="text-sm">{{ course.weeks }} {{ t('courses.weeks') }}</span>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <img :src="course.instructorAvatar" :alt="course.instructor"
                  class="w-10 h-10 rounded-full object-cover border-2 border-purple-400"
                  @error="e => e.target.src='https://placehold.co/40x40'" />
                <div>
                  <p class="text-xs text-gray-400">{{ t('course_detail.instructor') }}</p>
                  <p class="font-medium">{{ course.instructor }}</p>
                </div>
              </div>
            </div>

            <!-- Sidebar buy card -->
            <div class="lg:col-span-1">
              <div class="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 sticky top-24">
                <div class="aspect-video">
                  <img :src="course.thumbnail" :alt="courseTitle" class="w-full h-full object-cover"
                    @error="e => e.target.src='https://placehold.co/400x225'" />
                </div>
                <div class="p-5">
                  <div class="flex items-baseline gap-2 mb-1">
                    <span class="text-3xl font-extrabold text-gray-900">{{ course.price30 || course.basePrice }} TMT</span>
                    <span v-if="course.price30" class="text-lg text-gray-400 line-through">{{ course.basePrice }} TMT</span>
                  </div>
                  <p class="text-sm text-purple-600 font-medium mb-4">{{ t('shop.all_videos_included') }}</p>

                  <template v-if="isPurchased">
                    <div class="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-3">
                      <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span class="text-sm font-semibold text-green-700">{{ t('shop.purchased') }}</span>
                    </div>
                    <RouterLink :to="`/course/${course.id}/learn`"
                      class="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center px-6 py-3.5 rounded-xl font-bold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-600/25 active:scale-[0.99]">
                      {{ t('shop.watch_now') }}
                    </RouterLink>
                  </template>
                  <template v-else>
                    <button @click="handleBuy"
                      class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-600/25 mb-3 active:scale-[0.99]">
                      <ShoppingCart class="w-5 h-5" /> {{ t('shop.buy_full') }}
                    </button>
                    <p class="text-xs text-gray-500 text-center">{{ t('shop.lifetime_access') }}</p>
                  </template>

                  <!-- What's included -->
                  <div class="mt-4 space-y-2 border-t border-gray-100 pt-4">
                    <div v-for="inc in includes" :key="inc.key" class="flex items-center gap-2 text-sm text-gray-600">
                      <span class="text-base">{{ inc.icon }}</span>
                      <span>{{ t(inc.key) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Video list -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-5">{{ t('shop.course_content') }}</h2>
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div v-for="(video, idx) in videoList" :key="idx"
                class="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <!-- Number -->
                <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  :class="idx === 0 ? 'bg-green-100 text-green-700' : isPurchased ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'">
                  {{ idx + 1 }}
                </div>
                <!-- Icon -->
                <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  :class="idx === 0 ? 'bg-green-50' : isPurchased ? 'bg-purple-50' : 'bg-gray-50'">
                  <component :is="idx === 0 || isPurchased ? Play : Lock" class="w-4 h-4"
                    :class="idx === 0 ? 'text-green-500' : isPurchased ? 'text-purple-500' : 'text-gray-400'" />
                </div>
                <!-- Title -->
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-800 truncate">{{ video.title }}</p>
                  <p class="text-xs text-gray-400">{{ video.duration }}</p>
                </div>
                <!-- Price / Free / Unlocked -->
                <div class="flex-shrink-0">
                  <span v-if="idx === 0"
                    class="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    🎁 {{ t('shop.free') }}
                  </span>
                  <span v-else-if="isPurchased"
                    class="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                    ✓ {{ t('shop.unlocked') }}
                  </span>
                  <span v-else
                    class="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                    {{ video.price }} TMT
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: what you learn -->
          <div class="lg:col-span-1 space-y-5">
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 class="font-bold text-gray-900 mb-4">{{ t('course_detail.what_you_learn') }}</h3>
              <ul class="space-y-2">
                <li v-for="n in 4" :key="n" class="flex items-start gap-2 text-sm text-gray-700">
                  <div class="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">✓</div>
                  {{ t(`course_detail.learn_${n}`) }}
                </li>
              </ul>
            </div>
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 class="font-bold text-gray-900 mb-4">{{ t('course_detail.about_course') }}</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">{{ t('shop.videos') }}</span>
                  <span class="font-semibold text-gray-800">{{ videoCount }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">{{ t('course_detail.duration_label') }}</span>
                  <span class="font-semibold text-gray-800">{{ course.weeks }} {{ t('courses.weeks') }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">{{ t('course_detail.rating_label') }}</span>
                  <div class="flex items-center gap-1">
                    <Star class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span class="font-semibold text-gray-800">{{ course.rating }}</span>
                  </div>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">{{ t('course_detail.certificate_label') }}</span>
                  <span class="font-semibold text-green-600">{{ t('course_detail.certificate_yes') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Star, Play, Lock, Clock, ChevronRight, ShoppingCart, CheckCircle } from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { courses } from '../data/courses'
import { useAuth } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const auth = useAuth()

const course = computed(() => courses.find(c => c.id === route.params.id))
const isPurchased = computed(() => auth.user.value?.purchasedCourses?.includes(course.value?.id))

const courseTitle = computed(() => locale.value === 'en' && course.value?.titleEn ? course.value.titleEn : course.value?.titleTm)
const courseDesc  = computed(() => locale.value === 'en' && course.value?.descriptionEn ? course.value.descriptionEn : course.value?.descriptionTm)
const courseCategory = computed(() => locale.value === 'en' && course.value?.categoryEn ? course.value.categoryEn : course.value?.categoryTm)

const videoCount = computed(() => {
  const n = parseInt(course.value?.id) || 1
  return [8, 12, 10, 15, 9, 11, 14, 8, 13, 10, 12, 9, 11, 16, 10][n % 15]
})

const pricePerVideo = computed(() => {
  const total = course.value?.price30 || course.value?.basePrice || 1000
  return Math.round(total / videoCount.value)
})

const videoTitlesTm = ['Giriş we tanyşdyryş', 'Esasy düşünjeler', 'Amaly türgenleşik', 'Çuňňur öwreniş', 'Taslamalar', 'Synag we baha', 'Ösen mowzuklar', 'Jemleýji sapak']
const videoTitlesEn = ['Introduction', 'Core Concepts', 'Hands-on Practice', 'Deep Dive', 'Projects', 'Testing & Review', 'Advanced Topics', 'Final Lesson']
const durations = ['12:30', '18:45', '22:10', '15:20', '28:00', '19:35', '24:15', '16:50', '20:00', '17:30', '23:45', '14:20', '26:10', '18:00', '21:30']

const videoList = computed(() => {
  return Array.from({ length: videoCount.value }, (_, i) => ({
    title: (locale.value === 'en' ? videoTitlesEn : videoTitlesTm)[i % 8] + (i >= 8 ? ` ${Math.floor(i/8)+1}` : ''),
    duration: durations[i % 15],
    price: pricePerVideo.value,
  }))
})

const includes = [
  { icon: '🎬', key: 'shop.inc_videos' },
  { icon: '♾️', key: 'shop.inc_lifetime' },
  { icon: '📱', key: 'shop.inc_mobile' },
  { icon: '🏆', key: 'shop.inc_cert' },
]

function handleBuy() {
  if (!auth.isAuthenticated()) {
    router.push('/login')
    return
  }
  router.push(`/course/${course.value.id}/enroll`)
}
</script>
