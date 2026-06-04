<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <AppHeader />

    <div v-if="!course" class="flex items-center justify-center py-32 text-center">
      <div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">Kurs tapylmady</h2>
        <RouterLink to="/online-courses" class="text-blue-600 hover:underline">← Online kurslara dolan</RouterLink>
      </div>
    </div>

    <template v-else>
      <!-- Hero -->
      <div class="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.25),transparent)]" />
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <!-- Breadcrumb -->
              <div class="flex items-center gap-2 mb-4 text-sm">
                <RouterLink to="/online-courses" class="text-gray-300 hover:text-white">Online Kurslar</RouterLink>
                <ChevronRight class="w-4 h-4 text-gray-400" />
                <span class="text-gray-300">{{ courseCategory }}</span>
              </div>

              <!-- LIVE badge -->
              <div class="flex items-center gap-3 mb-4">
                <div class="inline-flex items-center gap-2 bg-red-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold">
                  <span class="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE SAPAK
                </div>
                <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm border border-white/20">
                  <Clock class="w-3.5 h-3.5 text-blue-300" />
                  <span>Duşenbe · Çarşenbe · Anna &nbsp;|&nbsp; 17:00–19:00</span>
                </div>
              </div>

              <h1 class="text-2xl md:text-4xl font-bold mb-3 leading-tight">{{ courseTitle }}</h1>
              <p class="text-base md:text-xl text-gray-300 mb-5">{{ courseDesc }}</p>

              <!-- Stats row -->
              <div class="flex flex-wrap items-center gap-5 mb-5">
                <div class="flex items-center gap-2">
                  <img :src="course.instructorAvatar" :alt="course.instructor"
                    class="w-9 h-9 rounded-full object-cover border-2 border-blue-400"
                    @error="e => e.target.src='https://placehold.co/36x36'" />
                  <div>
                    <p class="text-xs text-gray-400">Mugallym</p>
                    <p class="text-sm font-semibold">{{ course.instructor }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-1">
                  <Star class="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span class="font-semibold">{{ course.rating }}</span>
                  <span class="text-gray-400 text-sm">({{ course.studentsEnrolled }})</span>
                </div>
                <div class="flex items-center gap-2 text-gray-300">
                  <Users class="w-4 h-4" /><span class="text-sm">{{ seatsLeft }} boş ýer</span>
                </div>
                <div class="flex items-center gap-2 text-gray-300">
                  <CalendarDays class="w-4 h-4" /><span class="text-sm">{{ course.weeks }} hepde</span>
                </div>
              </div>
            </div>

            <!-- Sidebar card -->
            <div class="lg:col-span-1">
              <div class="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 sticky top-24">
                <div class="aspect-video relative overflow-hidden">
                  <img :src="course.thumbnail" :alt="courseTitle" class="w-full h-full object-cover"
                    @error="e => e.target.src='https://placehold.co/400x225'" />
                  <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div class="w-16 h-16 bg-red-500/90 rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform">
                      <span class="text-white font-extrabold text-xs tracking-wider">LIVE</span>
                    </div>
                  </div>
                </div>
                <div class="p-5">
                  <div class="flex items-baseline gap-2 mb-1">
                    <span class="text-2xl font-extrabold text-gray-900">{{ course.price30 || course.basePrice }} TMT</span>
                    <span v-if="course.price30" class="text-base text-gray-400 line-through">{{ course.basePrice }} TMT</span>
                  </div>
                  <p class="text-xs text-gray-400 mb-4">Tölegiňizi 3 aýyň dowamynda edip bilersiňiz</p>

                  <!-- Enrolled: Go Live button -->
                  <template v-if="isEnrolled">
                    <RouterLink :to="`/online-courses/${course.id}/live`"
                      class="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-green-600/30 mb-3 active:scale-[0.99] text-sm">
                      <Video class="w-4 h-4 animate-pulse" /> Göni sapaga giriş
                    </RouterLink>
                    <p class="text-xs text-center text-green-600 font-medium">✓ Siz bu kursa ýazyldyňyz</p>
                  </template>
                  <template v-else>
                    <RouterLink :to="`/course/${course.id}/enroll`"
                      class="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/25 mb-2 active:scale-[0.99] text-sm">
                      Kursa ýazylmak
                    </RouterLink>
                    <p class="text-xs text-center text-gray-400">Ýazylanyňyzdan soň göni sapaga girip bilersiňiz</p>
                  </template>

                  <!-- Schedule -->
                  <div class="mt-4 bg-blue-50 rounded-xl p-3 space-y-2">
                    <p class="text-xs font-bold text-blue-700 uppercase tracking-wide">Sapak wagty</p>
                    <div v-for="day in scheduleDays" :key="day.label" class="flex items-center gap-2 text-sm">
                      <div class="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">{{ day.num }}</div>
                      <span class="text-gray-700 font-medium">{{ day.label }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm border-t border-blue-100 pt-2">
                      <Clock class="w-4 h-4 text-blue-500" />
                      <span class="font-bold text-blue-700">17:00 – 19:00</span>
                    </div>
                  </div>

                  <!-- Includes -->
                  <div class="mt-4 space-y-2">
                    <div v-for="inc in includes" :key="inc.text" class="flex items-center gap-2 text-sm text-gray-600">
                      <component :is="inc.icon" class="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{{ inc.text }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">

            <!-- Näme öwrenersiňiz -->
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Näme öwrenersiňiz</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div v-for="n in 4" :key="n" class="flex items-start gap-2">
                  <div class="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">✓</div>
                  <span class="text-sm text-gray-700">{{ t(`course_detail.learn_${n}`) }}</span>
                </div>
              </div>
            </div>

            <!-- Online sapagyň artykmaçlyklary -->
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-5">Online sapagyň artykmaçlyklary</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="adv in advantages" :key="adv.title"
                  class="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <span class="text-2xl flex-shrink-0">{{ adv.icon }}</span>
                  <div>
                    <p class="font-bold text-gray-900 text-sm">{{ adv.title }}</p>
                    <p class="text-xs text-gray-500 mt-0.5">{{ adv.desc }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Talaplar -->
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Talap edilýän bilimler</h2>
              <ul class="space-y-2">
                <li v-for="n in 3" :key="n" class="flex items-start gap-2 text-sm text-gray-700">
                  <span class="text-gray-400 mt-0.5">•</span>
                  {{ t(`course_detail.req_${n}`) }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Right sidebar -->
          <div class="space-y-5">
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 class="font-bold text-gray-900 mb-4">Kurs barada</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">Dowamlylygy</span>
                  <span class="font-semibold text-gray-800">{{ course.weeks }} hepde</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Okuwçylar</span>
                  <span class="font-semibold text-gray-800">{{ course.studentsEnrolled }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Reýting</span>
                  <div class="flex items-center gap-1">
                    <Star class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span class="font-semibold text-gray-800">{{ course.rating }}</span>
                  </div>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Dereje</span>
                  <span :class="['font-semibold text-xs px-2 py-0.5 rounded-full',
                    course.level==='Beginner' ? 'bg-green-100 text-green-700' :
                    course.level==='Intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700']">
                    {{ course.level==='Beginner' ? t('courses.beginner') : course.level==='Intermediate' ? t('courses.intermediate') : t('courses.advanced') }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Sertifikat</span>
                  <span class="font-semibold text-green-600">Hawa</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Boş ýer</span>
                  <span class="font-semibold text-orange-600">{{ seatsLeft }} ýer galdy</span>
                </div>
              </div>
            </div>

            <!-- Bottom CTA -->
            <div v-if="!isEnrolled" class="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white text-center">
              <p class="font-extrabold text-lg mb-1">Häzir ýazylmak!</p>
              <p class="text-blue-200 text-xs mb-4">Diňe {{ seatsLeft }} ýer galdy</p>
              <RouterLink :to="`/course/${course.id}/enroll`"
                class="block w-full bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm">
                Kursa ýazylmak
              </RouterLink>
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
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Star, Users, Clock, ChevronRight, CalendarDays, Video, CheckCircle, BookOpen, Award, MessageCircle } from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { courses } from '../data/courses'
import { useAuth } from '../stores/auth'

const route = useRoute()
const { t, locale } = useI18n()
const auth = useAuth()

const course = computed(() => courses.find(c => c.id === route.params.id))
const isEnrolled = computed(() => auth.user.value?.enrolledCourses?.includes(course.value?.id))

const courseTitle = computed(() => locale.value === 'en' && course.value?.titleEn ? course.value.titleEn : course.value?.titleTm)
const courseDesc  = computed(() => locale.value === 'en' && course.value?.descriptionEn ? course.value.descriptionEn : course.value?.descriptionTm)
const courseCategory = computed(() => locale.value === 'en' && course.value?.categoryEn ? course.value.categoryEn : course.value?.categoryTm)

const seatsLeft = computed(() => {
  const n = parseInt(course.value?.id) || 1
  return [3, 5, 7, 8, 4, 6, 2, 9, 5, 7, 3, 8, 6, 4, 5][n % 15]
})

const scheduleDays = [
  { num: '1', label: 'Duşenbe' },
  { num: '3', label: 'Çarşenbe' },
  { num: '5', label: 'Anna' },
]

const includes = [
  { icon: Video,        text: 'Göni wideo sapaklar' },
  { icon: MessageCircle, text: 'Mugallym bilen göni sorag-jogap' },
  { icon: BookOpen,     text: 'Sapak materiallary' },
  { icon: Award,        text: 'Resmi sertifikat' },
  { icon: CheckCircle,  text: 'Ömürlik giriş hukugy' },
]

const advantages = [
  { icon: '🎥', title: 'Göni ýüzbe-ýüz', desc: 'Mugallym bilen hakyky wagt içinde sapak' },
  { icon: '🙋', title: 'Sorag ber', desc: 'Islendik soragyňy göni ber' },
  { icon: '👥', title: 'Topar bilen', desc: 'Beýleki okuwçylar bilen bilelikde öwren' },
  { icon: '📅', title: 'Kesgitli wagt', desc: 'Hepde 3 gezek, 2 sagatdan' },
]
</script>
