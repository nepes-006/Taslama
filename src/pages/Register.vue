<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50">

    <!-- Animated blobs -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute w-72 h-72 bg-orange-400/25 rounded-full blur-3xl -top-10 -left-10 animate-float"></div>
      <div class="absolute w-96 h-96 bg-red-400/20 rounded-full blur-3xl -bottom-20 -right-10 animate-float-delay"></div>
    </div>

    <!-- Card -->
    <div class="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)]">

      <!-- Sol tarap — gradient panel -->
      <div class="relative hidden md:flex flex-col justify-center px-10 py-12 text-white overflow-hidden"
        style="background: linear-gradient(135deg, #f39c12 0%, #e74c3c 100%)">
        <div class="absolute inset-0" style="background-image:radial-gradient(circle,rgba(255,255,255,.1) 1px,transparent 1px);background-size:28px 28px;"></div>
        <div class="relative">
          <div class="text-5xl mb-5">🚀</div>
          <h2 class="text-3xl font-extrabold mb-3 leading-tight">Bize goşul!</h2>
          
          <div class="space-y-3">
            <div class="flex items-center gap-3 text-sm">
          
             
            </div>
            <div class="flex items-center gap-3 text-sm">
            
            </div>
            <div class="flex items-center gap-3 text-sm">
             
            </div>
          </div>
        </div>
      </div>

      <!-- Sag tarap — forma -->
      <div class="bg-white px-8 py-10 md:px-10 overflow-y-auto max-h-screen">
        <!-- Logo mobile -->
        <RouterLink to="/" class="flex items-center gap-2 mb-5 md:hidden">
          <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <BookOpen class="w-4 h-4 text-white" />
          </div>
          <span class="font-extrabold text-gray-900 text-sm">Bilim Merkezi</span>
        </RouterLink>

        <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">Hasap dör</h1>
        <p class="text-gray-500 text-sm mb-6">Okuw platformasyna goşulyň</p>

        <div v-if="error" class="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
          <AlertCircle class="w-4 h-4 flex-shrink-0" /> {{ error }}
        </div>

        <!-- Name row -->
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1.5">Ady</label>
            <div class="relative">
              <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input v-model="form.firstName" placeholder="Ady"
                class="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 focus:bg-white transition-all" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1.5">Familiýasy</label>
            <div class="relative">
              <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input v-model="form.lastName" placeholder="Familiýasy"
                class="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 focus:bg-white transition-all" />
            </div>
          </div>
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label class="block text-xs font-semibold text-gray-500 mb-1.5">E-poçta</label>
          <div class="relative">
            <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input v-model="form.email" type="email" placeholder="email@mysal.com"
              class="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 focus:bg-white transition-all" />
          </div>
        </div>

        <!-- Phone -->
        <div class="mb-4">
          <label class="block text-xs font-semibold text-gray-500 mb-1.5">Telefon</label>
          <div class="relative">
            <Phone class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input v-model="form.phone" placeholder="+993 xx xxxxxx"
              class="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 focus:bg-white transition-all" />
          </div>
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label class="block text-xs font-semibold text-gray-500 mb-1.5">Parol</label>
          <div class="relative">
            <Lock class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input v-model="form.password" :type="showPwd ? 'text' : 'password'" placeholder="••••••••"
              class="w-full pl-10 pr-11 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 focus:bg-white transition-all" />
            <button type="button" @click="showPwd = !showPwd"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <component :is="showPwd ? EyeOff : Eye" class="w-4 h-4" />
            </button>
          </div>
          <!-- Password strength -->
          <div v-if="form.password" class="mt-2">
            <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1">
              <div class="h-full rounded-full transition-all duration-300"
                :style="{ width: strength.width, background: strength.color }"></div>
            </div>
            <p class="text-xs font-medium" :style="{ color: strength.color }">{{ strength.text }}</p>
          </div>
        </div>

        <!-- Confirm password -->
        <div class="mb-4">
          <label class="block text-xs font-semibold text-gray-500 mb-1.5">Paroly tassykla</label>
          <div class="relative">
            <Lock class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input v-model="form.confirm" :type="showPwd ? 'text' : 'password'" placeholder="••••••••"
              class="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 focus:bg-white transition-all"
              :class="form.confirm && form.confirm !== form.password ? 'border-red-300 focus:border-red-400' : ''" />
          </div>
          <p v-if="form.confirm && form.confirm !== form.password" class="text-xs text-red-500 mt-1">Parollar gabat gelenok</p>
        </div>

        <!-- Terms -->
        <label class="flex items-start gap-2.5 mb-5 cursor-pointer">
          <input v-model="form.terms" type="checkbox" class="mt-0.5 accent-orange-500 w-4 h-4 flex-shrink-0" />
          <span class="text-xs text-gray-500 leading-relaxed">
            <span class="text-orange-600 font-semibold">Ulanmak şertlerini</span> we
            <span class="text-orange-600 font-semibold">Gizlinlik syýasatyny</span> kabul edýärin
          </span>
        </label>

        <!-- Submit -->
        <button @click="handleRegister" :disabled="loading"
          class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-500/25 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed mb-4">
          <Loader v-if="loading" class="w-4 h-4 animate-spin" />
          <span v-else>🚀</span>
          {{ loading ? 'Garaşyň...' : 'Hasap dörediň' }}
        </button>

        <p class="text-center text-sm text-gray-500">
          Eýýäm hasabyňyz barmy?
          <RouterLink to="/login" class="text-orange-600 font-bold hover:underline ml-1">Giriş et</RouterLink>
        </p>

        <RouterLink to="/" class="block text-center text-xs text-gray-400 hover:text-gray-600 mt-3 transition-colors">
          ← Baş sahypa
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Mail, Lock, User, Phone, Eye, EyeOff, Loader, AlertCircle, BookOpen } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'

const router = useRouter()
const auth = useAuth()

const form = ref({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '', terms: false })
const showPwd = ref(false)
const loading = ref(false)
const error = ref('')

const strength = computed(() => {
  const p = form.value.password
  if (!p) return { width: '0%', color: '#e5e7eb', text: '' }
  if (p.length < 4) return { width: '25%', color: '#ef4444', text: 'Gowşak' }
  if (p.length < 8) return { width: '60%', color: '#f59e0b', text: 'Orta' }
  return { width: '100%', color: '#22c55e', text: 'Güýçli' }
})

async function handleRegister() {
  error.value = ''
  if (!form.value.firstName || !form.value.email || !form.value.password) {
    error.value = 'Ähli meýdanlary doldyruň'; return
  }
  if (form.value.password !== form.value.confirm) {
    error.value = 'Parollar gabat gelenok'; return
  }
  if (!form.value.terms) {
    error.value = 'Ulanmak şertlerini kabul ediň'; return
  }
  loading.value = true
  const result = await auth.register({
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    email: form.value.email,
    phone: form.value.phone,
    password: form.value.password,
  })
  loading.value = false
  if (result.ok) {
    router.push('/')
  } else {
    error.value = result.message || 'Hasaba alyş başartmady'
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
