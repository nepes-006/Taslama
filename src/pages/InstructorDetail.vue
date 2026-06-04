<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
    <AppHeader />

    <!-- Not found -->
    <div v-if="!instructor" class="max-w-2xl mx-auto px-4 py-24 text-center">
      <div class="text-6xl mb-4">😕</div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ t('instructors.not_found') }}</h2>
      <RouterLink to="/instructors" class="text-blue-600 font-semibold hover:underline">← {{ t('instructors.back') }}</RouterLink>
    </div>

    <template v-else>
      <!-- Cover + Profile header -->
      <section class="relative">
        <!-- Cover image -->
        <div class="h-48 md:h-64 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 relative">
          <img :src="instructor.coverImage" :alt="instructor.name"
            class="w-full h-full object-cover opacity-50"
            @error="e => e.target.style.display='none'" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <!-- Profile info overlay -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative -mt-16 md:-mt-20 flex flex-col md:flex-row md:items-end gap-5 pb-6 border-b border-gray-100">
            <!-- Avatar -->
            <div class="relative flex-shrink-0">
              <img :src="instructor.avatar" :alt="instructor.name"
                class="w-28 h-28 md:w-36 md:h-36 rounded-3xl border-4 border-white shadow-2xl object-cover"
                @error="e => e.target.style.display='none'" />
              <div class="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                <div class="w-2.5 h-2.5 bg-white rounded-full"></div>
              </div>
            </div>

            <!-- Name & title -->
            <div class="flex-1 min-w-0 bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-lg border border-gray-100">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900">{{ instructor.name }}</h1>
                  <p class="text-blue-600 font-semibold text-base mt-0.5">
                    {{ locale === 'en' ? instructor.titleEn : instructor.titleTm }}
                  </p>
                  <div class="flex items-center gap-2 mt-2">
                    <span class="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                      {{ locale === 'en' ? instructor.categoryEn : instructor.categoryTm }}
                    </span>
                    <span class="flex items-center gap-1 text-sm text-gray-500">
                      <GraduationCap class="w-4 h-4 text-gray-400" />
                      {{ instructor.education }}
                    </span>
                  </div>
                </div>
                <!-- Rating -->
                <div class="flex flex-col items-center bg-yellow-50 border border-yellow-200 rounded-2xl px-4 py-3">
                  <div class="flex items-center gap-1 mb-1">
                    <Star class="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span class="text-2xl font-extrabold text-yellow-700">{{ instructor.rating }}</span>
                  </div>
                  <span class="text-xs text-yellow-600 font-medium">{{ t('instructors.rating') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <!-- Left: Bio + Achievements + Courses -->
          <div class="lg:col-span-2 space-y-8">

            <!-- Stats cards -->
            <div class="grid grid-cols-3 gap-4">
              <div class="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
                <div class="text-2xl font-extrabold text-blue-600">{{ instructor.totalCourses }}</div>
                <div class="text-xs text-gray-500 mt-1 font-medium">{{ t('instructors.courses_count') }}</div>
              </div>
              <div class="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
                <div class="text-2xl font-extrabold text-green-600">{{ instructor.totalStudents.toLocaleString() }}+</div>
                <div class="text-xs text-gray-500 mt-1 font-medium">{{ t('instructors.students_count') }}</div>
              </div>
              <div class="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
                <div class="text-2xl font-extrabold text-purple-600">{{ instructor.experience }}</div>
                <div class="text-xs text-gray-500 mt-1 font-medium">{{ t('instructors.years') }}</div>
              </div>
            </div>

            <!-- Bio -->
            <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h2 class="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                <User class="w-5 h-5 text-blue-500" />
                {{ t('instructors.about_instructor') }}
              </h2>
              <p class="text-gray-600 leading-relaxed text-sm md:text-base">
                {{ locale === 'en' ? instructor.bioEn : instructor.bioTm }}
              </p>
            </div>

            <!-- Achievements -->
            <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h2 class="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                <Award class="w-5 h-5 text-yellow-500" />
                {{ t('instructors.achievements') }}
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div v-for="ach in instructor.achievements" :key="ach.textEn"
                  class="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                  <span class="text-2xl">{{ ach.iconTm }}</span>
                  <span class="text-sm font-semibold text-gray-700">
                    {{ locale === 'en' ? ach.textEn : ach.textTm }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Courses -->
            <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h2 class="text-lg font-extrabold text-gray-900 mb-5 flex items-center gap-2">
                <BookOpen class="w-5 h-5 text-blue-500" />
                {{ t('instructors.instructor_courses') }}
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RouterLink
                  v-for="course in instructorCourses"
                  :key="course.id"
                  :to="`/course/${course.id}`"
                  class="group flex gap-3 p-3 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
                >
                  <div class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-100 to-indigo-100">
                    <img :src="course.thumbnail" :alt="courseTitle(course)"
                      class="w-full h-full object-cover"
                      @error="e => e.target.style.display='none'" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {{ courseTitle(course) }}
                    </h3>
                    <div class="flex items-center gap-2 mt-1.5">
                      <div class="flex items-center gap-0.5">
                        <Star class="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span class="text-xs font-semibold text-gray-700">{{ course.rating }}</span>
                      </div>
                      <span class="text-xs text-gray-400">·</span>
                      <span class="text-xs text-gray-500">{{ course.studentsEnrolled }} {{ t('instructors.students_count') }}</span>
                    </div>
                    <div class="mt-1">
                      <span :class="[
                        'text-xs font-semibold px-2 py-0.5 rounded-full',
                        course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                        course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      ]">{{ course.level === 'Beginner' ? t('courses.beginner') : course.level === 'Intermediate' ? t('courses.intermediate') : t('courses.advanced') }}</span>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Right sidebar -->
          <div class="space-y-6">
            <!-- Social links -->
            <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 class="text-base font-extrabold text-gray-900 mb-4">{{ t('instructors.connect') }}</h3>
              <div class="space-y-3">
                <a :href="instructor.socialLinks.telegram" target="_blank"
                  class="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-blue-700 font-medium text-sm">
                  <Send class="w-4 h-4" /> Telegram
                </a>
                <a :href="instructor.socialLinks.youtube" target="_blank"
                  class="flex items-center gap-3 p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors text-red-700 font-medium text-sm">
                  <Youtube class="w-4 h-4" /> YouTube
                </a>
                <a :href="instructor.socialLinks.linkedin" target="_blank"
                  class="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors text-indigo-700 font-medium text-sm">
                  <Linkedin class="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>

            <!-- Quick info -->
            <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 class="text-base font-extrabold text-gray-900 mb-4">{{ t('instructors.quick_info') }}</h3>
              <div class="space-y-3 text-sm">
                <div class="flex items-center gap-3 text-gray-600">
                  <div class="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen class="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <div class="text-xs text-gray-400">{{ t('instructors.courses_count') }}</div>
                    <div class="font-semibold text-gray-800">{{ instructor.totalCourses }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-3 text-gray-600">
                  <div class="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users class="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <div class="text-xs text-gray-400">{{ t('instructors.students_count') }}</div>
                    <div class="font-semibold text-gray-800">{{ instructor.totalStudents.toLocaleString() }}+</div>
                  </div>
                </div>
                <div class="flex items-center gap-3 text-gray-600">
                  <div class="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock class="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <div class="text-xs text-gray-400">{{ t('instructors.experience') }}</div>
                    <div class="font-semibold text-gray-800">{{ instructor.experience }} {{ t('instructors.years') }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-3 text-gray-600">
                  <div class="w-8 h-8 bg-yellow-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star class="w-4 h-4 text-yellow-500" />
                  </div>
                  <div>
                    <div class="text-xs text-gray-400">{{ t('instructors.rating') }}</div>
                    <div class="font-semibold text-gray-800">{{ instructor.rating }} / 5.0</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Back button -->
            <RouterLink to="/instructors"
              class="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border-2 border-blue-200 text-blue-600 font-semibold hover:bg-blue-50 transition-colors text-sm">
              <ArrowLeft class="w-4 h-4" />
              {{ t('instructors.back') }}
            </RouterLink>
          </div>
        </div>

        <!-- Testimonials for this instructor -->
        <div class="mt-12">
          <h2 class="text-2xl font-extrabold text-gray-900 mb-2 text-center">{{ t('instructors.testimonials') }}</h2>
          <div class="overflow-hidden relative">
            <div class="flex gap-4 animate-scroll-left" style="width: max-content">
              <TestimonialCard v-for="(item, i) in [...instructorTestimonials, ...instructorTestimonials, ...instructorTestimonials, ...instructorTestimonials]" :key="`d-${i}`" :item="item" :locale="locale" />
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
import { GraduationCap, Star, BookOpen, Users, Clock, User, Award, Send, Youtube, Linkedin, ArrowLeft } from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import TestimonialCard from '../components/TestimonialCard.vue'
import { instructors, testimonialsByInstructor, testimonials } from '../data/instructors'
import { courses } from '../data/courses'

const route = useRoute()
const { t, locale } = useI18n()

const instructor = computed(() => instructors.find(i => i.id === route.params.id))

const instructorCourses = computed(() => {
  if (!instructor.value) return []
  return courses.filter(c => instructor.value.courseIds.includes(c.id))
})

const instructorTestimonials = computed(() => {
  if (!instructor.value) return []
  return testimonialsByInstructor[instructor.value.id] || []
})

function courseTitle(course) {
  return locale.value === 'en' && course.titleEn ? course.titleEn : course.titleTm
}
</script>

<style scoped>
@keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-scroll-left {
  animation: scrollLeft 60s linear infinite;
}
.animate-scroll-left:hover {
  animation-play-state: paused;
}
</style>
