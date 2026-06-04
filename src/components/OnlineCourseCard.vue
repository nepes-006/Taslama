<template>
  <RouterLink :to="`/online-courses/${course.id}`" class="block group h-full">
    <article class="bg-white rounded-3xl overflow-hidden border border-gray-100/50 shadow-lg shadow-gray-200/50 h-full flex flex-col transition-all duration-300 ease-out group-hover:shadow-2xl group-hover:shadow-blue-500/10 group-hover:border-blue-200/60 group-hover:ring-2 group-hover:ring-blue-500/10">
      <!-- Thumbnail -->
      <div class="relative aspect-[16/9] overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-50 to-purple-50" style="max-height:160px">
        <img :src="course.thumbnail" :alt="courseTitle"
          class="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.08] group-hover:brightness-110"
          @error="e => e.target.style.display='none'" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <!-- LIVE badge -->
        <div class="absolute top-3 left-3">
          <span class="flex items-center gap-1 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
            <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> LIVE
          </span>
        </div>
        <!-- Level badge -->
        <div class="absolute top-3 right-3">
          <span :class="['px-2.5 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm',
            course.level === 'Beginner' ? 'bg-green-500/90 text-white border-green-400/50' :
            course.level === 'Intermediate' ? 'bg-yellow-500/90 text-white border-yellow-400/50' :
            'bg-red-500/90 text-white border-red-400/50']">
            {{ course.level === 'Beginner' ? `🟢 ${t('courses.beginner')}` : course.level === 'Intermediate' ? `🟡 ${t('courses.intermediate')}` : `🔴 ${t('courses.advanced')}` }}
          </span>
        </div>
        <!-- Seats -->
        <div class="absolute bottom-3 left-3">
          <span class="flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            <Users class="w-3 h-3" /> {{ seatsLeft }} {{ t('online.seats_left') }}
          </span>
        </div>
      </div>

      <div class="p-4 flex flex-col flex-1">
        <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm leading-snug flex-1">
          {{ courseTitle }}
        </h3>

        <!-- Schedule -->
        <div class="flex items-center gap-1.5 mb-3 bg-blue-50 rounded-xl px-3 py-2">
          <Calendar class="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
          <span class="text-xs text-blue-700 font-semibold">{{ t('online.schedule_short') }}</span>
          <span class="text-xs text-blue-600 ml-auto font-bold">17:00–19:00</span>
        </div>

        <!-- Instructor -->
        <div class="flex items-center gap-2 mb-3">
          <div class="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-xs">
            {{ course.instructor[0] }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs text-gray-700 font-medium truncate">{{ course.instructor }}</div>
            <div class="text-xs text-gray-500">{{ course.weeks }} {{ t('courses.weeks').replace('{n}', '') }}</div>
          </div>
          <div class="flex items-center gap-1">
            <Star class="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span class="text-xs font-semibold text-gray-800">{{ course.rating }}</span>
          </div>
        </div>

        <!-- Price + enroll -->
        <div class="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div class="flex items-baseline gap-1">
            <span class="text-base font-bold text-gray-900">{{ course.price30 || course.basePrice }} TMT</span>
            <span v-if="course.price30" class="text-xs text-gray-500 line-through">{{ course.basePrice }} TMT</span>
          </div>
          <span class="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
            {{ t('courses.enroll') }}
          </span>
        </div>
      </div>
    </article>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { Star, Users, Calendar } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const props = defineProps({ course: Object })
const { t, locale } = useI18n()

const courseTitle = computed(() =>
  locale.value === 'en' && props.course.titleEn ? props.course.titleEn : props.course.titleTm
)
// Fake seats left based on course id for variety
const seatsLeft = computed(() => {
  const n = parseInt(props.course.id) || 1
  return [3, 5, 7, 8, 4, 6, 2, 9, 5, 7, 3, 8, 6, 4, 5][n % 15]
})
</script>
