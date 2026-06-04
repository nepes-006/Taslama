<template>
  <div class="min-h-screen bg-gray-950 text-white flex flex-col">

    <!-- ==================== LOBBY / GARAŞMA EKRANY ==================== -->
    <template v-if="phase === 'lobby'">
      <div class="flex-1 flex flex-col items-center justify-center px-4">
        <!-- Ýokarky ýazgy -->
        <div class="text-center mb-8">
          <h1 class="text-2xl md:text-3xl font-extrabold mb-2">{{ courseTitle }}</h1>
          <p class="text-gray-400 text-sm">Sapaga goşulmak üçin kameraňyzy barlaň</p>
        </div>

        <!-- Kamera preview -->
        <div class="relative w-full max-w-lg aspect-video rounded-3xl overflow-hidden border-2 border-gray-700 bg-gray-900 shadow-2xl mb-8">
          <video v-if="cameraOn" ref="lobbyVideoRef" autoplay muted playsinline
            class="w-full h-full object-cover scale-x-[-1]"></video>
          <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-extrabold mb-3 shadow-xl">
              {{ auth.user.value?.firstName?.[0] || 'S' }}
            </div>
            <p class="text-gray-400 text-sm">Kamera öçük</p>
          </div>
          <!-- Ady -->
          <div class="absolute bottom-3 left-3">
            <span class="text-sm bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg font-medium">
              {{ auth.user.value?.firstName || 'Sen' }}
            </span>
          </div>
        </div>

        <!-- Kontrol düwmeleri -->
        <div class="flex items-center gap-4 mb-8">
          <button @click="toggleCamera"
            :class="['flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm transition-all duration-200',
              cameraOn ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white']">
            <component :is="cameraOn ? Video : VideoOff" class="w-5 h-5" />
            {{ cameraOn ? 'Kamera açyk' : 'Kamera ýapyk' }}
          </button>
          <button @click="toggleMic"
            :class="['flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm transition-all duration-200',
              micOn ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white']">
            <component :is="micOn ? Mic : MicOff" class="w-5 h-5" />
            {{ micOn ? 'Mikrofon açyk' : 'Mikrofon ýapyk' }}
          </button>
        </div>

        <!-- Goşulmak düwmesi -->
        <button @click="requestJoin"
          class="flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:scale-95 text-white font-bold px-10 py-4 rounded-2xl text-base transition-all shadow-lg shadow-green-500/30">
          <UserCheck class="w-6 h-6" />
          Sapaga goşulmak
        </button>

        <RouterLink to="/online-courses" class="mt-4 text-gray-500 hover:text-gray-300 text-sm transition-colors">
          ← Yza dolanmak
        </RouterLink>
      </div>
    </template>

    <!-- ==================== GARAŞÝAR / WAITING ==================== -->
    <template v-else-if="phase === 'waiting'">
      <div class="flex-1 flex flex-col items-center justify-center px-4">
        <!-- Öz kamera kiçi -->
        <div class="relative w-48 md:w-56 aspect-video rounded-2xl overflow-hidden border-2 border-blue-500 bg-gray-900 shadow-2xl mb-8">
          <video v-if="cameraOn" ref="waitVideoRef" autoplay muted playsinline
            class="w-full h-full object-cover scale-x-[-1]"></video>
          <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gray-800">
            <VideoOff class="w-6 h-6 text-gray-500" />
          </div>
          <div class="absolute bottom-1 left-1 right-1 text-center">
            <span class="text-xs bg-black/60 px-2 py-0.5 rounded font-medium">
              {{ auth.user.value?.firstName || 'Sen' }}
            </span>
          </div>
        </div>

        <!-- Garaşýar animasiýasy -->
        <div class="flex items-center gap-3 mb-4">
          <div class="flex gap-1">
            <span class="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0s"></span>
            <span class="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.15s"></span>
            <span class="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.3s"></span>
          </div>
          <span class="text-lg font-bold text-white">Mugallym kabul etmegine garaşylýar...</span>
        </div>
        <p class="text-gray-400 text-sm mb-6">{{ course?.instructor }} sizi kabul edensoň sapak başlar</p>

        <button @click="cancelJoin"
          class="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
          Ýatyr etmek
        </button>
      </div>
    </template>

    <!-- ==================== SAPAKDA / IN CLASS ==================== -->
    <template v-else>
      <!-- Top bar -->
      <div class="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
        <div class="flex items-center gap-3">
          <RouterLink to="/online-courses" class="p-2 rounded-xl hover:bg-gray-800 transition-colors">
            <ArrowLeft class="w-5 h-5 text-gray-400" />
          </RouterLink>
          <div>
            <p class="font-bold text-sm md:text-base line-clamp-1">{{ courseTitle }}</p>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="flex items-center gap-1 text-xs text-red-400 font-semibold">
                <span class="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span> LIVE
              </span>
              <span class="text-xs text-gray-500">|</span>
              <span class="text-xs text-gray-400">{{ course?.instructor }}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1.5 bg-gray-800 px-3 py-1.5 rounded-full text-xs text-gray-300">
            <Users class="w-3.5 h-3.5 text-green-400" />
            <span>{{ viewerCount }} okuwçy</span>
          </div>
          <div class="flex items-center gap-1.5 bg-gray-800 px-3 py-1.5 rounded-full text-xs text-gray-300">
            <Clock class="w-3.5 h-3.5 text-blue-400" />
            <span>{{ elapsed }}</span>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="flex flex-1 overflow-hidden">

        <!-- Video area -->
        <div class="flex-1 flex flex-col min-w-0">

          <!-- Mugallym ekrany -->
          <div class="relative flex-1 bg-gray-900 flex items-center justify-center overflow-hidden" style="min-height: 0">

            <!-- Mugallym video placeholder -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center">
                <div class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-extrabold mb-4 shadow-2xl">
                  {{ course?.instructor?.[0] || 'M' }}
                </div>
                <p class="text-lg font-bold text-white">{{ course?.instructor }}</p>
                <p class="text-sm text-gray-400 mt-1">Mugallym kamera açmadyk</p>
              </div>
            </div>

            <!-- Mugallymyň kamerasy açyk bolsa -->
            <video v-if="instructorStream"
              :srcObject="instructorStream"
              autoplay
              class="absolute inset-0 w-full h-full object-cover"
            ></video>

            <!-- Ekran paýlaşma -->
            <div v-if="isScreenSharing" class="absolute top-4 left-4 flex items-center gap-2 bg-blue-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold">
              <Monitor class="w-3.5 h-3.5" /> Mugallym ekranyny görkezýär
            </div>

            <!-- Öz web kamerasy (PiP) -->
            <div class="absolute bottom-4 right-4 w-32 md:w-44 aspect-video rounded-2xl overflow-hidden border-2 shadow-2xl"
              :class="cameraOn ? 'border-green-500' : 'border-gray-600 bg-gray-800'">
              <video v-if="cameraOn" ref="localVideoRef" autoplay muted playsinline
                class="w-full h-full object-cover scale-x-[-1]"></video>
              <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gray-800">
                <VideoOff class="w-6 h-6 text-gray-500 mb-1" />
                <span class="text-xs text-gray-500">Kamera ýok</span>
              </div>
              <div class="absolute bottom-1 left-1 right-1 text-center">
                <span class="text-xs bg-black/60 px-1.5 py-0.5 rounded font-medium truncate block">
                  {{ auth.user.value?.firstName || 'Sen' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Aşaky kontrol paneli -->
          <div class="bg-gray-900 border-t border-gray-800 px-4 py-3">
            <div class="flex items-center justify-between max-w-3xl mx-auto">

              <!-- Sol düwmeler -->
              <div class="flex items-center gap-2">
                <button @click="toggleMic"
                  :class="['flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 text-xs',
                    micOn ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white']">
                  <component :is="micOn ? Mic : MicOff" class="w-5 h-5" />
                  <span>{{ micOn ? 'Sesim' : 'Ýapyk' }}</span>
                </button>
                <button @click="toggleCamera"
                  :class="['flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 text-xs',
                    cameraOn ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white']">
                  <component :is="cameraOn ? Video : VideoOff" class="w-5 h-5" />
                  <span>{{ cameraOn ? 'Kamera' : 'Ýapyk' }}</span>
                </button>
              </div>

              <!-- Orta: Sapakda -->
              <div class="flex items-center gap-2 bg-green-500/20 border border-green-500/40 text-green-400 font-semibold px-6 py-2.5 rounded-2xl text-sm">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Sapakda
              </div>

              <!-- Sag düwmeler -->
              <div class="flex items-center gap-2">
                <button @click="toggleHand"
                  :class="['flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all text-xs',
                    handRaised ? 'bg-yellow-500 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300']">
                  <span class="text-lg leading-none">✋</span>
                  <span>El</span>
                </button>
                <button @click="chatOpen = !chatOpen"
                  :class="['flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all text-xs relative',
                    chatOpen ? 'bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300']">
                  <MessageCircle class="w-5 h-5" />
                  <span>Chat</span>
                  <span v-if="unreadCount > 0"
                    class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center">
                    {{ unreadCount }}
                  </span>
                </button>
                <button @click="leaveClass"
                  class="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition-all text-xs text-white">
                  <PhoneOff class="w-5 h-5" />
                  <span>Çyk</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat panel -->
        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 translate-x-4" enter-to-class="opacity-100 translate-x-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 translate-x-4">
          <div v-if="chatOpen" class="w-72 md:w-80 flex flex-col bg-gray-900 border-l border-gray-800">
            <div class="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
              <h3 class="font-bold text-sm">Sapak chaty</h3>
              <button @click="chatOpen = false" class="p-1 rounded-lg hover:bg-gray-800">
                <X class="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div class="flex-1 overflow-y-auto p-3 space-y-3" ref="chatRef">
              <div v-for="msg in messages" :key="msg.id"
                :class="['flex gap-2', msg.self ? 'flex-row-reverse' : '']">
                <div class="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                  :class="msg.self ? 'bg-blue-600' : 'bg-gray-700'">
                  {{ msg.name[0] }}
                </div>
                <div :class="['max-w-[80%]', msg.self ? 'items-end' : 'items-start', 'flex flex-col']">
                  <span class="text-xs text-gray-400 mb-1" :class="msg.self ? 'text-right' : ''">{{ msg.name }}</span>
                  <div :class="['px-3 py-2 rounded-2xl text-sm leading-relaxed',
                    msg.self ? 'bg-blue-600 rounded-tr-sm' : 'bg-gray-800 rounded-tl-sm']">
                    {{ msg.text }}
                  </div>
                </div>
              </div>
            </div>
            <div class="p-3 border-t border-gray-800">
              <div class="flex gap-2">
                <input v-model="chatInput" @keyup.enter="sendMessage"
                  placeholder="Sorag ýaz..."
                  class="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500" />
                <button @click="sendMessage"
                  class="w-9 h-9 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
                  <Send class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  ArrowLeft, Users, Clock, Monitor, Video, VideoOff,
  Mic, MicOff, UserCheck, MessageCircle, PhoneOff, Send, X
} from 'lucide-vue-next'
import { courses } from '../data/courses'
import { useAuth } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const auth = useAuth()

const course = computed(() => courses.find(c => c.id === route.params.id))
const courseTitle = computed(() => locale.value === 'en' && course.value?.titleEn ? course.value.titleEn : course.value?.titleTm)

// Phase: 'lobby' -> 'waiting' -> 'inclass'
const phase = ref('lobby')

// State
const micOn = ref(false)
const cameraOn = ref(false)
const handRaised = ref(false)
const chatOpen = ref(false)
const chatInput = ref('')
const unreadCount = ref(0)
const isScreenSharing = ref(false)
const instructorStream = ref(null)
const localVideoRef = ref(null)
const lobbyVideoRef = ref(null)
const waitVideoRef = ref(null)
let localStream = null

// Timer
const elapsed = ref('00:00')
let timerInterval = null

// Fake viewers
const viewerCount = computed(() => {
  const n = parseInt(course.value?.id) || 1
  return [8, 12, 7, 15, 5, 10, 6, 9, 11, 4][n % 10]
})

// Messages
const messages = ref([
  { id: 1, name: 'Mugallym', text: 'Salam hemmä! Sapaga hoş geldiňiz 👋', self: false },
  { id: 2, name: 'Merdan', text: 'Salam mugallym!', self: false },
  { id: 3, name: 'Aýnur', text: 'Gowy gün!', self: false },
])
const chatRef = ref(null)

// Attach stream to a video element ref
async function attachStream(videoRef) {
  await nextTick()
  if (videoRef.value && localStream) {
    videoRef.value.srcObject = localStream
  }
}

// Camera
async function toggleCamera() {
  if (cameraOn.value) {
    if (localStream) {
      localStream.getVideoTracks().forEach(t => t.stop())
      if (!micOn.value) { localStream = null }
    }
    cameraOn.value = false
  } else {
    try {
      if (!localStream) {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micOn.value })
      } else {
        const vs = await navigator.mediaDevices.getUserMedia({ video: true })
        vs.getVideoTracks().forEach(t => localStream.addTrack(t))
      }
      cameraOn.value = true
      // Attach to correct video ref based on phase
      if (phase.value === 'lobby') await attachStream(lobbyVideoRef)
      else if (phase.value === 'waiting') await attachStream(waitVideoRef)
      else await attachStream(localVideoRef)
    } catch {
      alert('Kamera açmak üçin rugsat beriň')
    }
  }
}

// Mic
async function toggleMic() {
  if (micOn.value) {
    micOn.value = false
    if (localStream) localStream.getAudioTracks().forEach(t => t.enabled = false)
  } else {
    try {
      if (!localStream) {
        localStream = await navigator.mediaDevices.getUserMedia({ video: cameraOn.value, audio: true })
      } else if (localStream.getAudioTracks().length === 0) {
        const as = await navigator.mediaDevices.getUserMedia({ audio: true })
        as.getAudioTracks().forEach(t => localStream.addTrack(t))
      }
      localStream.getAudioTracks().forEach(t => t.enabled = true)
      micOn.value = true
    } catch {
      alert('Mikrofon açmak üçin rugsat beriň')
    }
  }
}

// Request to join — goes to waiting phase
async function requestJoin() {
  phase.value = 'waiting'
  // Open camera if not already
  if (!cameraOn.value) {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      cameraOn.value = true
    } catch {}
  }
  await attachStream(waitVideoRef)

  // Simulate teacher accepting after 4 seconds
  setTimeout(() => {
    if (phase.value === 'waiting') {
      enterClass()
    }
  }, 4000)
}

// Cancel join request
function cancelJoin() {
  phase.value = 'lobby'
  if (cameraOn.value) {
    attachStream(lobbyVideoRef)
  }
}

// Enter the class after teacher accepts
async function enterClass() {
  phase.value = 'inclass'
  startTimer()
  await attachStream(localVideoRef)
  addMessage({ name: 'Ulgam', text: `${auth.user.value?.firstName || 'Siz'} sapaga goşuldy ✓`, self: false })
  chatOpen.value = true

  // Simulate instructor screen sharing after 3s
  setTimeout(() => {
    isScreenSharing.value = true
  }, 3000)
}

// Timer
function startTimer() {
  const start = Date.now()
  timerInterval = setInterval(() => {
    const diff = Math.floor((Date.now() - start) / 1000)
    const m = String(Math.floor(diff / 60)).padStart(2, '0')
    const s = String(diff % 60).padStart(2, '0')
    elapsed.value = `${m}:${s}`
  }, 1000)
}

function toggleHand() {
  handRaised.value = !handRaised.value
  if (handRaised.value) {
    addMessage({ name: auth.user.value?.firstName || 'Sen', text: '✋ El galdyrdy — sorag bar', self: true })
  }
}

function addMessage(msg) {
  messages.value.push({ ...msg, id: Date.now() })
  if (!chatOpen.value) unreadCount.value++
  nextTick(() => { if (chatRef.value) chatRef.value.scrollTop = chatRef.value.scrollHeight })
}

function sendMessage() {
  if (!chatInput.value.trim()) return
  addMessage({ name: auth.user.value?.firstName || 'Sen', text: chatInput.value.trim(), self: true })
  chatInput.value = ''
}

function leaveClass() {
  if (localStream) localStream.getTracks().forEach(t => t.stop())
  if (timerInterval) clearInterval(timerInterval)
  router.push(`/online-courses/${route.params.id}`)
}

onUnmounted(() => {
  if (localStream) localStream.getTracks().forEach(t => t.stop())
  if (timerInterval) clearInterval(timerInterval)
})
</script>
