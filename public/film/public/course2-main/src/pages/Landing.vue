<template>
  <div class="min-h-screen bg-white">

    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-blue-700 border-b border-blue-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-3">
          <img src="/white-logo.png" alt="Logo" class="h-12 w-auto object-contain" style="filter: invert(0);" />
          <span class="hidden md:block text-2xl font-bold text-white tracking-widest">
            Goşmaça we Üznüksiz Bilim Merkezi
          </span>
        </RouterLink>
        <div class="flex items-center gap-2">
          <RouterLink to="/register"
            class="px-4 py-2 rounded-xl text-sm font-semibold bg-white text-blue-700 hover:bg-blue-50 transition-all duration-200">
            Hasaba alyň
          </RouterLink>
          <RouterLink to="/login"
            class="px-4 py-2 rounded-xl text-sm font-semibold border border-white/60 text-white hover:bg-blue-600 transition-all duration-200">
            Giriş
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Hero surat -->
    <section class="w-full" style="margin-top: 64px;">
      <img src="/download.jpg" alt="Bina" class="w-full h-auto block" />
    </section>

    <!-- Baş maglumat -->
    <section class="py-10 md:py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl md:text-3xl font-extrabold text-blue-700 mb-4">"Goşmaça we Üznüksiz Bilim" okuw merkezi</h2>
        <p class="text-gray-700 leading-relaxed text-sm md:text-base max-w-3xl">
          Türkmenistanyň Oguz han adyndaky Inžener-tehnologiýalar uniwersitetiniň "Goşmaça we Üznüksiz Bilim" okuw merkezi sizi daşary ýurt dilleri, tebigy we takyk ugurlary boýunça ýörite maksatnama esasynda alnyp barylýan goşmaça okuwa çagyrýar.
        </p>
       
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from '../components/AppFooter.vue'
</script>

<style scoped>
.hero-section {
  min-height: 100svh;
  background-image: url('/download.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

@media (max-width: 640px) {
  .hero-section {
    min-height: 60svh;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .hero-section {
    min-height: 80svh;
  }
}
</style>
