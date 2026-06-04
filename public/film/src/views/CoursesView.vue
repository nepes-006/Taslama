<template>
  <div class="container courses-page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('nav.courses') }}</h1>
      <p class="page-sub">{{ filtered.length }} {{ $t('course.results') }}</p>
    </div>

    <div class="courses-layout">
      <aside class="filters">
        <div class="filter-block">
          <h4><i class="fas fa-search"></i> {{ locale === 'tr' ? 'Ara' : 'Search' }}</h4>
          <input class="input" :placeholder="$t('nav.search')" v-model="search" />
        </div>

        <div class="filter-block">
          <h4><i class="fas fa-tags"></i> {{ $t('footer.categories') }}</h4>
          <div class="filter-options">
            <label class="filter-option">
              <input type="radio" v-model="cat" value="" />
              <span>{{ $t('course.allCategories') }}</span>
            </label>
            <label v-for="c in store.categories" :key="c.id" class="filter-option">
              <input type="radio" v-model="cat" :value="c.id" />
              <span><i :class="['fas', c.icon]" :style="{color: c.color}"></i> {{ locale === 'tr' ? c.tr : c.en }}</span>
            </label>
          </div>
        </div>

        <div class="filter-block">
          <h4><i class="fas fa-signal"></i> {{ $t('course.level') }}</h4>
          <div class="filter-options">
            <label class="filter-option">
              <input type="radio" v-model="level" value="" /><span>{{ $t('course.allLevels') }}</span>
            </label>
            <label class="filter-option"><input type="radio" v-model="level" value="beginner" /><span>{{ $t('course.beginner') }}</span></label>
            <label class="filter-option"><input type="radio" v-model="level" value="intermediate" /><span>{{ $t('course.intermediate') }}</span></label>
            <label class="filter-option"><input type="radio" v-model="level" value="advanced" /><span>{{ $t('course.advanced') }}</span></label>
          </div>
        </div>

        <div class="filter-block">
          <h4><i class="fas fa-money-bill"></i> {{ locale === 'tr' ? 'Fiyat' : 'Price' }}</h4>
          <div class="price-range">
            <input type="range" v-model.number="maxPrice" min="0" max="500" />
            <div class="price-display">₺0 - ₺{{ maxPrice }}</div>
          </div>
        </div>

        <button class="btn btn-outline" style="width:100%" @click="resetFilters">
          <i class="fas fa-redo"></i> {{ locale === 'tr' ? 'Filtreleri Sıfırla' : 'Reset Filters' }}
        </button>
      </aside>

      <div class="courses-content">
        <div class="toolbar">
          <select class="input sort-select" v-model="sort">
            <option value="popular">{{ $t('course.sortPopular') }}</option>
            <option value="new">{{ $t('course.sortNew') }}</option>
            <option value="priceLow">{{ $t('course.sortPriceLow') }}</option>
            <option value="priceHigh">{{ $t('course.sortPriceHigh') }}</option>
            <option value="rating">{{ locale === 'tr' ? 'Puana Göre' : 'By Rating' }}</option>
          </select>
        </div>

        <div v-if="filtered.length === 0" class="empty-state">
          <i class="fas fa-search"></i>
          <h3>{{ locale === 'tr' ? 'Sonuç bulunamadı' : 'No results found' }}</h3>
          <p>{{ locale === 'tr' ? 'Farklı filtreler deneyin' : 'Try different filters' }}</p>
        </div>

        <div v-else class="grid">
          <CourseCard v-for="c in paginated" :key="c.id" :course="c" />
        </div>

        <div v-if="pages > 1" class="pagination">
          <button class="page-btn" :disabled="page === 1" @click="page--"><i class="fas fa-chevron-left"></i></button>
          <button v-for="p in pages" :key="p" class="page-btn" :class="{active: p === page}" @click="page = p">{{ p }}</button>
          <button class="page-btn" :disabled="page === pages" @click="page++"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMainStore } from '../stores'
import CourseCard from '../components/CourseCard.vue'

const store = useMainStore()
const route = useRoute()
const { locale } = useI18n()

const search = ref(route.query.q || '')
const cat = ref(route.query.cat || '')
const level = ref('')
const maxPrice = ref(500)
const sort = ref('popular')
const page = ref(1)
const perPage = 12

watch(() => route.query, (q) => {
  search.value = q.q || ''
  cat.value = q.cat || ''
})

const filtered = computed(() => {
  let list = store.courses.filter(c => {
    const t = (c.title + ' ' + c.title_en + ' ' + c.description).toLowerCase()
    if (search.value && !t.includes(search.value.toLowerCase())) return false
    if (cat.value && c.category !== cat.value) return false
    if (level.value && c.level !== level.value) return false
    if (c.price > maxPrice.value) return false
    return true
  })
  if (sort.value === 'popular') list.sort((a,b) => b.students - a.students)
  else if (sort.value === 'new') list.sort((a,b) => b.id - a.id)
  else if (sort.value === 'priceLow') list.sort((a,b) => a.price - b.price)
  else if (sort.value === 'priceHigh') list.sort((a,b) => b.price - a.price)
  else if (sort.value === 'rating') list.sort((a,b) => b.rating - a.rating)
  return list
})

const pages = computed(() => Math.ceil(filtered.value.length / perPage))
const paginated = computed(() => filtered.value.slice((page.value-1)*perPage, page.value*perPage))

watch(filtered, () => { page.value = 1 })

const resetFilters = () => {
  search.value = ''; cat.value = ''; level.value = ''; maxPrice.value = 500; sort.value = 'popular'
}
</script>

<style scoped>
.courses-page { padding: 40px 24px 80px; }
.page-header { margin-bottom: 32px; }
.page-title {
  font-size: 38px; font-weight: 800;
  background: var(--gradient-2);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 6px;
}
.page-sub { color: var(--text-soft); }

.courses-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
}
.filters {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  height: fit-content; position: sticky; top: 100px;
}
.filter-block { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
.filter-block:last-of-type { border-bottom: none; }
.filter-block h4 {
  font-size: 14px; font-weight: 700;
  margin-bottom: 14px; color: var(--secondary);
  display: flex; align-items: center; gap: 8px;
}
.filter-block h4 i { color: var(--primary); }
.filter-options { display: flex; flex-direction: column; gap: 10px; }
.filter-option {
  display: flex; align-items: center; gap: 10px;
  cursor: pointer; padding: 6px 8px;
  border-radius: 8px; transition: all 0.2s;
  font-size: 14px;
}
.filter-option:hover { background: var(--bg-soft); }
.filter-option input { accent-color: var(--primary); }

.price-range input { width: 100%; accent-color: var(--primary); }
.price-display {
  margin-top: 8px; font-weight: 600;
  color: var(--primary-dark);
  text-align: center;
}

.toolbar {
  display: flex; justify-content: flex-end;
  margin-bottom: 24px;
}
.sort-select { width: auto; padding: 10px 16px; }

.empty-state {
  text-align: center; padding: 80px 20px;
  background: white; border-radius: 16px;
}
.empty-state i { font-size: 50px; color: var(--text-muted); margin-bottom: 16px; }
.empty-state h3 { color: var(--secondary); margin-bottom: 8px; }
.empty-state p { color: var(--text-soft); }

.pagination {
  display: flex; justify-content: center; gap: 8px;
  margin-top: 40px;
}
.page-btn {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: white;
  border: 2px solid var(--border);
  font-weight: 600;
  transition: all 0.2s;
}
.page-btn:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }
.page-btn.active {
  background: var(--gradient); color: white;
  border-color: transparent;
}
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

@media (max-width: 968px) {
  .courses-layout { grid-template-columns: 1fr; }
  .filters { position: static; }
}
</style>
