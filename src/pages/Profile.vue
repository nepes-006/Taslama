<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <AppHeader />

    <!-- Logged in -->
    <div v-if="auth.user.value" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

      <!-- BANNER -->
      <div class="relative rounded-3xl overflow-hidden mb-20 h-52 md:h-64">
        <div class="absolute inset-0 bg-gradient-to-br from-teal-500 via-cyan-600 to-slate-700"></div>
        <div class="absolute inset-0" style="background-image:radial-gradient(circle,rgba(255,255,255,.12) 1px,transparent 1px);background-size:36px 36px;"></div>
        <!-- Avatar + info pinned at bottom -->
        <div class="absolute bottom-0 left-6 md:left-10 right-6 md:right-10 flex items-end gap-5 translate-y-1/2">
          <img :src="auth.avatarUrl.value"
            class="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-white shadow-2xl object-cover flex-shrink-0 bg-gradient-to-br from-blue-400 to-purple-500"
            @error="e => e.target.src='https://i.pravatar.cc/200?u=default'" />
          <div class="pb-2 text-white">
            <h1 class="text-xl md:text-2xl font-extrabold drop-shadow">{{ fullName }}</h1>
            <p class="text-sm text-white/80 flex items-center gap-1.5 mt-0.5">
              <Mail class="w-3.5 h-3.5" /> {{ auth.user.value?.email }}
            </p>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs font-medium border border-white/20">
                <BookOpen class="w-3 h-3" /> {{ enrolledCourses.length }} kurs
              </span>
              <span class="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs font-medium border border-white/20">
                <Award class="w-3 h-3" /> {{ completedCount }} tamamlanan
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- GRID -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        <!-- Left -->
        <div class="lg:col-span-2 space-y-5">

          <!-- Edit form -->
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <UserPen class="w-5 h-5 text-blue-600" /> Profili redaktirlemek
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1.5">Ady</label>
                <input v-model="form.firstName" class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-gray-50" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1.5">Familiýasy</label>
                <input v-model="form.lastName" class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-gray-50" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1.5">E-poçta</label>
                <input v-model="form.email" type="email" class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-gray-50" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1.5">Telefon</label>
                <input v-model="form.phone" placeholder="+993 xx xxxxxx" class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-gray-50" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-xs font-semibold text-gray-500 mb-1.5">Özüň barada</label>
                <textarea v-model="form.bio" rows="3" placeholder="Özüň barada ýaz..." class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-gray-50 resize-none"></textarea>
              </div>
            </div>
            <div class="flex items-center gap-3 mt-4">
              <button @click="save"
                class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-95">
                <Save class="w-4 h-4" /> Ýatda sakla
              </button>
              <Transition name="fade">
                <span v-if="saved" class="flex items-center gap-1.5 text-sm text-green-600 font-semibold">
                  <CheckCircle class="w-4 h-4" /> Saklady!
                </span>
              </Transition>
            </div>
          </div>

          <!-- Enrolled courses -->
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <BookOpen class="w-5 h-5 text-blue-600" /> Ýazylan kurslar
            </h2>
            <div v-if="enrolledCourses.length > 0" class="space-y-3">
              <RouterLink v-for="c in enrolledCourses" :key="c.id" :to="`/course/${c.id}/learn`"
                class="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all group">
                <img :src="c.thumbnail" :alt="c.titleTm"
                  class="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  @error="e => e.target.src='https://placehold.co/56x56'" />
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-700 transition-colors">{{ c.titleTm }}</p>
                  <p class="text-xs text-gray-500 mt-0.5">{{ c.instructor }}</p>
                  <div class="mt-1.5">
                    <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-500" :style="`width:${c.progress||0}%`" />
                    </div>
                    <p class="text-xs text-gray-400 mt-0.5">{{ c.progress||0 }}% tamamlandy</p>
                  </div>
                </div>
                <span :class="['text-xs font-semibold px-2.5 py-1 rounded-lg flex-shrink-0',
                  (c.progress||0)>=100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700']">
                  {{ (c.progress||0)>=100 ? 'Tamamlandy' : 'Dowam edýär' }}
                </span>
              </RouterLink>
            </div>
            <div v-else class="text-center py-10">
              <div class="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen class="w-7 h-7 text-blue-400" />
              </div>
              <p class="text-gray-500 text-sm mb-4">Entek ýazylan kursyňyz ýok</p>
              <RouterLink to="/online-courses" class="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
                Kurslara göz aýla
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Right: stats + achievements -->
        <div class="space-y-5">

          <!-- Stats -->
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp class="w-5 h-5 text-blue-600" /> Statistika
            </h2>
            <div class="space-y-3">
              <div class="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                <BookOpen class="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span class="flex-1 text-sm text-gray-600">Ýazylan kurslar</span>
                <strong class="text-lg text-blue-700">{{ enrolledCourses.length }}</strong>
              </div>
              <div class="flex items-center gap-3 p-3 bg-green-50 rounded-xl border-l-4 border-green-500">
                <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0" />
                <span class="flex-1 text-sm text-gray-600">Tamamlanan</span>
                <strong class="text-lg text-green-700">{{ completedCount }}</strong>
              </div>
              <div class="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
                <Clock class="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <span class="flex-1 text-sm text-gray-600">Dowam edýär</span>
                <strong class="text-lg text-yellow-700">{{ enrolledCourses.length - completedCount }}</strong>
              </div>
              <div class="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                <Award class="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span class="flex-1 text-sm text-gray-600">Şahadatnama</span>
                <strong class="text-lg text-purple-700">{{ completedCount }}</strong>
              </div>
            </div>
          </div>

          <!-- Achievements -->
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Medal class="w-5 h-5 text-yellow-500" /> Üstünlikler
            </h2>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="ach in achievements" :key="ach.label"
                :class="['text-center p-4 rounded-2xl border-2 transition-all duration-300',
                  ach.unlocked ? 'border-yellow-300 bg-gradient-to-b from-yellow-50 to-amber-50' : 'border-gray-100 bg-gray-50 opacity-50']">
                <div class="text-3xl mb-2">{{ ach.icon }}</div>
                <p class="text-xs font-semibold" :class="ach.unlocked ? 'text-amber-700' : 'text-gray-400'">{{ ach.label }}</p>
              </div>
            </div>
          </div>

          <!-- Hasaba alnan sene -->
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div class="flex items-center gap-3 text-sm text-gray-500">
              <Calendar class="w-4 h-4 text-gray-400" />
              <span>Hasaba alnan: <strong class="text-gray-700">{{ joinedDate }}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not logged in -->
    <div v-else class="flex flex-col items-center justify-center py-32 text-center px-4">
      <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5">
        <Lock class="w-10 h-10 text-gray-400" />
      </div>
      <h2 class="text-xl font-bold text-gray-800 mb-2">Giriş etmeli</h2>
      <p class="text-gray-500 text-sm mb-6">Profili görmek üçin hasabyňyza giriň</p>
      <RouterLink to="/login" class="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
        Giriş et
      </RouterLink>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Mail, Award, TrendingUp, BookOpen,
  UserPen, Save, CheckCircle, Clock, Medal, Lock, Calendar
} from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { courses } from '../data/courses'
import { useAuth } from '../stores/auth'

const auth = useAuth()
const apiEnrollments = ref([])
const saved = ref(false)

const form = ref({
  firstName: auth.user.value?.firstName || '',
  lastName:  auth.user.value?.lastName  || '',
  email:     auth.user.value?.email     || '',
  phone:     auth.user.value?.phone     || '',
  bio:       auth.user.value?.bio       || '',
})

onMounted(async () => {
  try {
    const { default: api } = await import('../services/api')
    const { data } = await api.get('/enrollments/my')
    apiEnrollments.value = data
  } catch {}
})

const fullName = computed(() =>
  `${auth.user.value?.firstName || ''} ${auth.user.value?.lastName || ''}`.trim() || 'Ulanyjy'
)

const enrolledCourses = computed(() => {
  const ids = apiEnrollments.value.length
    ? apiEnrollments.value.map(e => e.courseId)
    : (auth.user.value?.enrolledCourses || [])
  return courses.filter(c => ids.includes(c.id)).map(c => {
    const enrollment = apiEnrollments.value.find(e => e.courseId === c.id)
    return { ...c, progress: enrollment?.progress || c.progress || 0 }
  })
})

const completedCount = computed(() =>
  enrolledCourses.value.filter(c => (c.progress || 0) >= 100).length
)

const achievements = computed(() => [
  { icon: '🚀', label: 'Başlangyç',  unlocked: enrolledCourses.value.length >= 1 },
  { icon: '🔥', label: 'Höwesli',    unlocked: enrolledCourses.value.length >= 3 },
  { icon: '🏆', label: 'Çempion',    unlocked: completedCount.value >= 1 },
  { icon: '👑', label: 'Ussady',     unlocked: completedCount.value >= 5 },
])

const joinedDate = computed(() => {
  if (!auth.user.value) return ''
  const d = new Date(parseInt(auth.user.value.id) || Date.now())
  return d.toLocaleDateString('tk-TM') || new Date().toLocaleDateString()
})

function save() {
  auth.updateUser(form.value)
  saved.value = true
  setTimeout(() => (saved.value = false), 2500)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
