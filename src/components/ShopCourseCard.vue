<template>
  <RouterLink :to="`/shop/${course.id}`" class="block group h-full">
    <article class="bg-white rounded-3xl overflow-hidden border border-gray-100/50 shadow-lg shadow-gray-200/50 h-full flex flex-col transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/10 group-hover:border-purple-200/60 group-hover:ring-2 group-hover:ring-purple-500/10">
      <!-- Thumbnail -->
      <div class="relative aspect-[16/9] overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-50 to-indigo-50" style="max-height:160px">
        <img :src="course.thumbnail" :alt="courseTitle"
          class="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.08] group-hover:brightness-110"
          @error="e => e.target.style.display='none'" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <!-- Video count badge -->
        <div class="absolute top-3 left-3">
          <span class="flex items-center gap-1 px-2.5 py-1 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
            <Play class="w-3 h-3" /> {{ videoCount }} {{ t('shop.videos') }}
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
        <!-- Free preview tag -->
        <div class="absolute bottom-3 left-3">
          <span class="flex items-center gap-1 px-2.5 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
            🎁 {{ t('shop.free_preview') }}
          </span>
        </div>
      </div>

      <div class="p-4 flex flex-col flex-1">
        <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors text-sm leading-snug flex-1">
          {{ courseTitle }}
        </h3>

        <!-- Video list preview -->
        <div class="mb-3 space-y-1">
          <div v-for="(vid, i) in previewVideos" :key="i"
            class="flex items-center gap-2 text-xs text-gray-600 py-1 px-2 rounded-lg"
            :class="i === 0 ? 'bg-green-50 text-green-700' : 'bg-gray-50'">
            <component :is="i === 0 ? Play : Lock" class="w-3 h-3 flex-shrink-0" :class="i === 0 ? 'text-green-500' : 'text-gray-400'" />
            <span class="truncate">{{ vid.title }}</span>
            <span class="ml-auto font-semibold flex-shrink-0" :class="i === 0 ? 'text-green-600' : 'text-gray-500'">
              {{ i === 0 ? t('shop.free') : vid.price + ' TMT' }}
            </span>
          </div>
          <div v-if="videoCount > 3" class="text-xs text-gray-400 text-center py-1">
            + {{ videoCount - 3 }} {{ t('shop.more_videos') }}
          </div>
        </div>

        <!-- Instructor + rating -->
        <div class="flex items-center gap-2 mb-3">
          <div class="w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-xs">
            {{ course.instructor[0] }}
          </div>
          <span class="text-xs text-gray-600 truncate flex-1">{{ course.instructor }}</span>
          <div class="flex items-center gap-0.5">
            <Star class="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span class="text-xs font-semibold text-gray-700">{{ course.rating }}</span>
          </div>
        </div>

        <!-- Price + buy -->
        <div class="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            <div class="flex items-baseline gap-1">
              <span class="text-base font-extrabold text-gray-900">{{ course.price30 || course.basePrice }} TMT</span>
              <span v-if="course.price30" class="text-xs text-gray-400 line-through">{{ course.basePrice }} TMT</span>
            </div>
            <div class="text-xs text-purple-600 font-medium">{{ t('shop.all_videos_included') }}</div>
          </div>
          <button class="flex items-center gap-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm shadow-purple-600/25 active:scale-95">
            <ShoppingCart class="w-3.5 h-3.5" /> {{ t('shop.buy') }}
          </button>
        </div>
      </div>
    </article>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { Star, Play, Lock, ShoppingCart } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const props = defineProps({ course: Object })
const { t, locale } = useI18n()

const courseTitle = computed(() =>
  locale.value === 'en' && props.course.titleEn ? props.course.titleEn : props.course.titleTm
)

// Generate fake video list based on course
const videoCount = computed(() => {
  const n = parseInt(props.course.id) || 1
  return [8, 12, 10, 15, 9, 11, 14, 8, 13, 10, 12, 9, 11, 16, 10][n % 15]
})

const pricePerVideo = computed(() => {
  const total = props.course.price30 || props.course.basePrice || 1000
  return Math.round(total / videoCount.value)
})

const previewVideos = computed(() => {
  const titles = [
    locale.value === 'en' ? 'Introduction' : 'Giriş',
    locale.value === 'en' ? 'Basics' : 'Esaslar',
    locale.value === 'en' ? 'Practice' : 'Türgenleşik',
  ]
  return titles.map((title, i) => ({
    title,
    price: pricePerVideo.value,
  }))
})
</script>
