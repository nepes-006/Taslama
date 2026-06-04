<template>
  <!-- Tolkun separator: ak sahypadan garaňky footer-e geçiş -->
  <div class="w-full overflow-hidden leading-none" style="background: white; margin-bottom: -1px;">
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" class="w-full" style="display:block; height:50px;">
      <!-- Arka tolkun (açyk) -->
      <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,50 L1440,80 L0,80 Z"
        fill="#0d2535" opacity="0.5"/>
      <!-- Öň tolkun (doly) -->
      <path d="M0,55 C200,20 400,70 600,45 C800,20 1000,65 1200,40 C1300,28 1380,50 1440,45 L1440,80 L0,80 Z"
        fill="#0a2a2a"/>
    </svg>
  </div>

  <footer style="background: linear-gradient(160deg, #0d2535 0%, #0a2a2a 40%, #0d2535 100%);" class="text-gray-300">

    <!-- Ana içerik -->
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-2 pb-1">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2">

        <!-- 1. Sütün: Logo + Açyklama + Sosial ikonkalar -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <div class="bg-teal-500 text-white p-1.5 rounded-lg">
              <BookOpen class="w-5 h-5" />
            </div>
            <span class="text-white font-bold text-lg"> Goşmaça we Üznüksiz Bilim Merkezi</span>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed mb-5">
            {{ t('footer.desc') }}
          </p>
          <!-- Sosial ikonkalar -->
          <div class="flex items-center gap-3">
            <!-- Instagram -->
            <a href="https://www.instagram.com/gosmaca_we_uznuksiz_bilim" target="_blank" rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:opacity-90"
              style="background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <!-- YouTube -->
            <a href="#" target="_blank" rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg bg-red-600 hover:bg-red-500 flex items-center justify-center transition-all duration-200 hover:scale-110">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <!-- TikTok -->
            <a href="https://www.tiktok.com/@gosmacaweuznuksizbilim" target="_blank" rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style="background:#010101; border: 1px solid rgba(255,255,255,0.15)">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- 2. Sütün: Çalt geçişler -->
        <div>
          <h3 class="text-white font-semibold text-sm mb-4">{{ t('footer.quick_links') }}</h3>
          <div class="w-8 h-0.5 bg-teal-500 mb-5 rounded-full"></div>
          <ul class="space-y-3">
            <li>
              <RouterLink to="/" class="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200">
                {{ t('footer.home') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/courses" class="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200">
                {{ t('footer.courses') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/about" class="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200">
                {{ t('footer.teachers') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/login" class="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200">
                {{ t('footer.login') }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- 3. Sütün: Kategoriýalar -->
        <div>
          <h3 class="text-white font-semibold text-sm mb-4">{{ t('footer.categories') }}</h3>
          <div class="w-8 h-0.5 bg-teal-500 mb-5 rounded-full"></div>
          <ul class="space-y-3">
            <li><span class="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200 cursor-pointer">{{ t('footer.cat_languages') }}</span></li>
            <li><span class="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200 cursor-pointer">{{ t('footer.cat_education') }}</span></li>
            <li><span class="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200 cursor-pointer">{{ t('footer.cat_technical') }}</span></li>
            <li><span class="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200 cursor-pointer">{{ t('footer.cat_science') }}</span></li>
            <li><span class="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200 cursor-pointer">{{ t('footer.cat_ai') }}</span></li>
            <li><span class="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200 cursor-pointer">{{ t('footer.cat_robotics') }}</span></li>
          </ul>
        </div>

        <!-- 4. Sütün: Täzeliklere ýazylmak + Habarlaşmak -->
        <div>
          <h3 class="text-white font-semibold text-sm mb-4">{{ t('footer.newsletter') }}</h3>
          <div class="w-8 h-0.5 bg-teal-500 mb-5 rounded-full"></div>
          <p class="text-sm text-gray-400 mb-4 leading-relaxed">
            {{ t('footer.newsletter_desc') }}
          </p>
          <!-- Email input -->
          <div class="flex items-center gap-0 mb-5">
            <input
              type="email"
              placeholder="email@example.com"
              class="flex-1 px-3 py-2.5 text-sm rounded-l-lg outline-none text-gray-200 placeholder-gray-500"
              style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-right: none;"
            />
            <button
              class="px-3 py-2.5 rounded-r-lg transition-all duration-200 hover:opacity-90 active:scale-95"
              style="background: #14b8a6;"
            >
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </div>
          <!-- Habarlaşmak -->
          <ul class="space-y-2.5">
            <li>
              <a href="mailto:sopyyevnepes@gmail.com" class="flex items-center gap-2.5 text-sm text-gray-400 hover:text-teal-400 transition-colors">
                <svg class="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                sopyyevnepes@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+99364716128" class="flex items-center gap-2.5 text-sm text-gray-400 hover:text-teal-400 transition-colors">
                <svg class="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +993 64 716128 , +993 61 468915
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Alt çyzyk -->
    <div style="border-top: 1px solid rgba(255,255,255,0.08);">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-1 flex flex-col sm:flex-row items-center justify-between gap-1">
        <p class="text-xs text-gray-500">{{ t('footer.rights') }}</p>
      </div>
    </div>

  </footer>
</template>

<script setup>
import { BookOpen } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
