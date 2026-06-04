<template>
  <div class="flex-shrink-0 w-72 bg-white rounded-2xl p-5 shadow-md border border-gray-100">
    <div class="flex items-center gap-3 mb-3">
      <img :src="item.avatar" :alt="item.name"
        class="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
        @error="e => e.target.style.display='none'" />
      <div>
        <div class="font-bold text-gray-900 text-sm">{{ item.name }}</div>
        <div class="text-xs text-blue-600 font-medium">
          {{ locale === 'en' ? item.courseEn : item.courseTm }}
        </div>
      </div>
      <div class="ml-auto flex items-center gap-0.5">
        <Star v-for="n in item.rating" :key="n" class="w-3 h-3 fill-yellow-400 text-yellow-400" />
      </div>
    </div>
    <p class="text-gray-600 text-xs leading-relaxed italic">
      "{{ locale === 'en' ? item.textEn : item.textTm }}"
    </p>
  </div>
</template>

<script setup>
import { Star } from 'lucide-vue-next'
defineProps({ item: Object, locale: String })
</script>
