<template>
  <div class="min-h-screen bg-white">
    <AppHeader />

    <!-- Hero -->
    <section class="relative bg-gradient-to-br from-[#0056d2] via-blue-700 to-indigo-900 text-white overflow-hidden">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
        <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full mb-5 border border-white/20">
          <span class="text-sm font-medium">{{ t('about.badge') }}</span>
        </div>
        <h1 class="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
          {{ t('about.hero_title') }}<br />
          <span class="text-blue-100">{{ t('about.hero_title_highlight') }}</span>
        </h1>
        <p class="text-blue-100 text-base md:text-xl max-w-2xl mx-auto">
          {{ t('about.hero_sub') }}
        </p>
      </div>
    </section>

    <!-- Biz barada -->
    <section class="py-12 md:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">{{ t('about.about_title') }}</h2>
            <div class="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
              <p>{{ t('about.about_p1') }}</p>
              <p>{{ t('about.about_p2') }}</p>
              <p>{{ t('about.about_p3') }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&fit=crop"
              alt="about" class="rounded-2xl object-cover w-full h-48 md:h-56 shadow-lg" />
            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&fit=crop"
              alt="students" class="rounded-2xl object-cover w-full h-48 md:h-56 shadow-lg mt-6" />
          </div>
        </div>
      </div>
    </section>

    <!-- Biziň kurslarymyz -->
    <section class="py-12 md:py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl md:text-3xl font-extrabold text-center text-gray-900 mb-2">{{ t('about.our_courses') }}</h2>
        <div class="w-16 h-1 bg-blue-600 mx-auto mb-10 rounded-full"></div>
        <div class="space-y-8">
          <div
            v-for="(course, idx) in courseList"
            :key="course.titleKey"
            class="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8 hover:shadow-md transition-all duration-300"
            :class="idx % 2 === 1 ? 'md:flex-row-reverse' : ''"
          >
            <div class="w-full md:w-64 lg:w-72 flex-shrink-0">
              <img :src="course.img" :alt="t(course.titleKey)"
                class="w-full h-44 md:h-52 object-cover rounded-xl shadow-sm"
                @error="e => e.target.style.display='none'" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-3">{{ t(course.titleKey) }}</h3>
              <p class="text-gray-600 text-sm md:text-base leading-relaxed">{{ t(course.descKey) }}</p>
              <RouterLink to="/courses"
                class="inline-block mt-4 text-blue-600 font-semibold text-sm hover:underline">
                {{ t('about.more') }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Aýratynlyklarymyz -->
    <section class="py-12 md:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div class="order-2 lg:order-1">
            <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&fit=crop"
              alt="teachers" class="rounded-2xl object-cover w-full h-64 md:h-80 shadow-xl" />
          </div>
          <div class="order-1 lg:order-2">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">{{ t('about.features_title') }}</h2>
            <ul class="space-y-3">
              <li v-for="n in 7" :key="n" class="flex items-start gap-3">
                <div class="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700 text-sm md:text-base">{{ t(`about.feature_${n}`) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

const { t } = useI18n()

const courseList = [
  { titleKey: 'about.course_pedagogy_title',    descKey: 'about.course_pedagogy_desc',    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&fit=crop' },
  { titleKey: 'about.course_japanese_title',    descKey: 'about.course_japanese_desc',    img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&fit=crop' },
  { titleKey: 'about.course_computer_title',    descKey: 'about.course_computer_desc',    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&fit=crop' },
  { titleKey: 'about.course_programming_title', descKey: 'about.course_programming_desc', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&fit=crop' },
  { titleKey: 'about.course_robotics_title',    descKey: 'about.course_robotics_desc',    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&fit=crop' },
  { titleKey: 'about.course_math_title',        descKey: 'about.course_math_desc',        img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&fit=crop' },
]
</script>
