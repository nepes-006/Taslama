<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
    <AppHeader />

    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0056d2] via-blue-700 to-indigo-900 text-white">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
        <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full mb-5 border border-white/20">
          <GraduationCap class="w-4 h-4" />
          <span class="text-sm font-medium">{{ t('instructors.badge') }}</span>
        </div>
        <h1 class="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">{{ t('instructors.title') }}</h1>
        <p class="text-blue-100 text-base md:text-xl max-w-2xl mx-auto">{{ t('instructors.subtitle') }}</p>
      </div>
    </section>

    <!-- Stats bar -->
    <section class="bg-white border-b border-gray-100 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div v-for="stat in stats" :key="stat.labelKey" class="flex flex-col items-center gap-1">
            <span class="text-2xl md:text-3xl font-extrabold text-blue-600">{{ stat.value }}</span>
            <span class="text-xs md:text-sm text-gray-500 font-medium">{{ t(stat.labelKey) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Instructors grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 text-center">{{ t('instructors.meet') }}</h2>
      <p class="text-gray-500 text-center mb-10">{{ t('instructors.meet_sub') }}</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="instructor in instructors"
          :key="instructor.id"
          class="group block cursor-pointer"
          @click="router.push(`/instructors/${instructor.id}`)"
        >
          <article class="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg shadow-gray-200/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/10 group-hover:border-blue-200/60 group-hover:-translate-y-1">
            <!-- Cover image -->
            <div class="relative h-32 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">
              <img :src="instructor.coverImage" :alt="instructor.name"
                class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                @error="e => e.target.style.display='none'" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <!-- Category badge -->
              <div class="absolute top-3 right-3">
                <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold rounded-full">
                  {{ locale === 'en' ? instructor.categoryEn : instructor.categoryTm }}
                </span>
              </div>
            </div>

            <!-- Avatar -->
            <div class="relative px-6 pb-6">
              <div class="flex items-end justify-between -mt-10 mb-4">
                <div class="relative">
                  <img :src="instructor.avatar" :alt="instructor.name"
                    class="w-20 h-20 rounded-2xl border-4 border-white shadow-xl object-cover"
                    @error="e => e.target.style.display='none'" />
                  <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div class="flex items-center gap-1 bg-yellow-50 border border-yellow-200 px-2.5 py-1 rounded-full">
                  <Star class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span class="text-sm font-bold text-yellow-700">{{ instructor.rating }}</span>
                </div>
              </div>

              <h3 class="text-lg font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">{{ instructor.name }}</h3>
              <p class="text-sm text-blue-600 font-medium mb-3">
                {{ locale === 'en' ? instructor.titleEn : instructor.titleTm }}
              </p>

              <!-- Stats row -->
              <div class="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <div class="flex items-center gap-1">
                  <BookOpen class="w-3.5 h-3.5 text-blue-400" />
                  <span>{{ instructor.totalCourses }} {{ t('instructors.courses_count') }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Users class="w-3.5 h-3.5 text-green-400" />
                  <span>{{ instructor.totalStudents.toLocaleString() }}+ {{ t('instructors.students_count') }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Clock class="w-3.5 h-3.5 text-purple-400" />
                  <span>{{ instructor.experience }} {{ t('instructors.years') }}</span>
                </div>
              </div>

              <!-- Bio preview -->
              <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                {{ locale === 'en' ? instructor.bioEn : instructor.bioTm }}
              </p>

              <!-- View profile button -->
              <div class="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                <span>{{ t('instructors.view_profile') }}</span>
                <ArrowRight class="w-4 h-4" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Scrolling testimonials -->
    <section class="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-2">{{ t('instructors.testimonials') }}</h2>
       
      </div>

      <!-- Scrolling row 1 (left to right) -->
      <div class="relative mb-4">
        <div class="flex gap-4 animate-scroll-left" style="width: max-content">
          <TestimonialCard v-for="(t2, i) in [...testimonials, ...testimonials]" :key="`r1-${i}`" :item="t2" :locale="locale" />
        </div>
      </div>
      <!-- Scrolling row 2 (right to left) -->
      <div class="relative">
        <div class="flex gap-4 animate-scroll-right" style="width: max-content">
          <TestimonialCard v-for="(t2, i) in [...[...testimonials].reverse(), ...[...testimonials].reverse()]" :key="`r2-${i}`" :item="t2" :locale="locale" />
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { GraduationCap, Star, BookOpen, Users, Clock, ArrowRight } from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import TestimonialCard from '../components/TestimonialCard.vue'
import { instructors, testimonials } from '../data/instructors'

const { t, locale } = useI18n()
const router = useRouter()

const stats = [
  { value: '9', labelKey: 'instructors.stat_instructors' },
  { value: '11,720+', labelKey: 'instructors.stat_students' },
  { value: '35+', labelKey: 'instructors.stat_courses' },
  { value: '4.8', labelKey: 'instructors.stat_rating' },
]
</script>

<style scoped>
@keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes scrollRight {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
.animate-scroll-left {
  animation: scrollLeft 285s linear infinite;
}
.animate-scroll-right {
  animation: scrollRight 285s linear infinite;
}
.animate-scroll-left:hover,
.animate-scroll-right:hover {
  animation-play-state: paused;
}
</style>
