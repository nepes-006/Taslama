<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50">

    <!-- Animated blobs -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute w-72 h-72 bg-teal-400/30 rounded-full blur-3xl -top-10 -left-10 animate-float"></div>
      <div class="absolute w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -bottom-20 -right-10 animate-float-delay"></div>
    </div>

    <!-- Card -->
    <div class="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)]">

      <!-- Sol tarap — gradient panel -->
      <div class="relative hidden md:flex flex-col justify-center px-10 py-12 text-white overflow-hidden"
        style="background: linear-gradient(135deg, #1abc9c 0%, #2c5364 100%)">
        <div class="absolute inset-0" style="background-image:radial-gradient(circle,rgba(255,255,255,.1) 1px,transparent 1px);background-size:28px 28px;"></div>
        <div class="relative">
          <div class="text-5xl mb-5">🎓</div>
          <h2 class="text-3xl font-extrabold mb-3 leading-tight">Hoş geldiňiz!</h2>
        </div>
      </div>

      <!-- Sag tarap — forma -->
      <div class="bg-white px-8 py-10 md:px-10 flex flex-col justify-center">
        <!-- Logo (mobile only) -->
        <RouterLink to="/" class="flex items-center gap-2 mb-6 md:hidden">
          <div class="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <BookOpen class="w-4 h-4 text-white" />
          </div>
          <span class="font-extrabold text-gray-900 text-sm">Bilim Merkezi</span>
        </RouterLink>

        <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">Giriş et</h1>
        <p class="text-gray-500 text-sm mb-7">Hasabyňyza giriň</p>

        <div v-if="error" class="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
          <AlertCircle class="w-4 h-4 flex-shrink-0" />
          {{ error }}
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label class="block text-xs font-semibold text-gray-500 mb-1.5">E-poçta</label>
          <div class="relative">
            <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input v-model="email" type="email" placeholder="email@mysal.com"
              class="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 focus:bg-white transition-all" />
          </div>
        </div>

        <!-- Password -->
        <div class="mb-5">
          <label class="block text-xs font-semibold text-gray-500 mb-1.5">Parol</label>
          <div class="relative">
            <Lock class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input v-model="password" :type="showPwd ? 'text' : 'password'" placeholder="••••••••"
              class="w-full pl-10 pr-11 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 focus:bg-white transition-all" />
            <button type="button" @click="showPwd = !showPwd"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <component :is="showPwd ? EyeOff : Eye" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Submit -->
        <button @click="handleLogin" :disabled="loading"
          class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-teal-500/25 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed mb-5">
          <Loader v-if="loading" class="w-4 h-4 animate-spin" />
          <LogIn v-else class="w-4 h-4" />
          {{ loading ? 'Garaşyň...' : 'Giriş et' }}
        </button>

        <!-- Divider -->
        <div class="relative flex items-center gap-3 mb-5">
          <div class="flex-1 h-px bg-gray-200"></div>
          <span class="text-xs text-gray-400 font-medium">ýa-da</span>
          <div class="flex-1 h-px bg-gray-200"></div>
        </div>

        <!-- Social buttons -->
        <div class="grid grid-cols-2 gap-3 mb-6">
          <button class="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all font-medium">
            <span class="text-lg">🌐</span> Google
          </button>
          <button class="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all font-medium">
            <span class="text-lg">📘</span> Facebook
          </button>
        </div>

        <p class="text-center text-sm text-gray-500">
          Hasabyňyz ýokmy?
          <RouterLink to="/register" class="text-teal-600 font-bold hover:underline ml-1">Hasaba alyň</RouterLink>
        </p>

        <RouterLink to="/" class="block text-center text-xs text-gray-400 hover:text-gray-600 mt-4 transition-colors">
          ← Baş sahypa
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Mail, Lock, LogIn, Eye, EyeOff, Loader, AlertCircle, BookOpen } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'

const router = useRouter()
const auth = useAuth()

const email = ref('')
const password = ref('')
const showPwd = ref(false)
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''
  if (!email.value || !password.value) { error.value = 'E-poçta we paroly giriziň'; return }
  loading.value = true
  const result = await auth.login(email.value, password.value)
  loading.value = false
  if (result.ok) {
    router.push('/')
  } else {
    error.value = result.message || 'Giriş başartmady'
  }
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}
@keyframes float-delay {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-25px) scale(1.03); }
}
.animate-float { animation: float 8s ease-in-out infinite; }
.animate-float-delay { animation: float-delay 10s ease-in-out infinite 2s; }
</style>
