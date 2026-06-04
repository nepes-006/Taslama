<template>
  <div class="container certs">
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-award"></i> {{ $t('nav.certificates') }}</h1>
      <p class="page-sub">{{ store.completed.length }} {{ locale === 'tr' ? 'sertifika kazandın' : 'certificates earned' }}</p>
    </div>

    <div v-if="store.completed.length === 0" class="empty">
      <i class="fas fa-award"></i>
      <h2>{{ locale === 'tr' ? 'Henüz sertifika yok' : 'No certificates yet' }}</h2>
      <p>{{ locale === 'tr' ? 'Bir kursu tamamla ve sertifikanı al!' : 'Complete a course and earn your certificate!' }}</p>
      <router-link to="/my-courses" class="btn btn-primary">{{ $t('nav.myCourses') }}</router-link>
    </div>

    <div v-else class="certs-grid">
      <div v-for="(c,i) in store.completedCourses" :key="c.id" class="cert-wrap" :style="{animationDelay: `${i*0.1}s`}">
        <div class="cert">
          <div class="cert-pattern"></div>
          <div class="cert-inner">
            <div class="cert-header">
              <i class="fas fa-graduation-cap"></i>
              <div>
                <div class="cert-brand">EduLearn</div>
                <div class="cert-tag">{{ locale === 'tr' ? 'BAŞARI SERTİFİKASI' : 'CERTIFICATE OF ACHIEVEMENT' }}</div>
              </div>
            </div>
            <div class="cert-body">
              <p>{{ locale === 'tr' ? 'Bu sertifika' : 'This is to certify that' }}</p>
              <h2>{{ store.user?.name || 'Demo User' }}</h2>
              <p>{{ locale === 'tr' ? 'aşağıdaki kursu başarıyla tamamlamıştır' : 'has successfully completed the course' }}</p>
              <h3>{{ locale === 'tr' ? c.title : c.title_en }}</h3>
            </div>
            <div class="cert-footer">
              <div>
                <div class="sig-line"></div>
                <small>{{ getInstructor(c.instructorId).name }}</small>
                <small style="opacity:0.7;">{{ locale === 'tr' ? 'Eğitmen' : 'Instructor' }}</small>
              </div>
              <div class="seal">
                <i class="fas fa-medal"></i>
                <small>{{ new Date().toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US') }}</small>
              </div>
              <div>
                <div class="sig-line"></div>
                <small>EduLearn</small>
                <small style="opacity:0.7;">{{ locale === 'tr' ? 'CEO' : 'CEO' }}</small>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary download-btn" @click="downloadCert">
          <i class="fas fa-download"></i> {{ locale === 'tr' ? 'İndir' : 'Download' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useMainStore } from '../stores'
const store = useMainStore()
const { locale } = useI18n()
const getInstructor = (id) => store.instructors.find(i => i.id === id) || store.instructors[0]
const downloadCert = () => {
  alert(locale.value === 'tr' ? '📜 Sertifikanız PDF olarak indiriliyor...' : '📜 Downloading certificate as PDF...')
}
</script>

<style scoped>
.certs { padding: 40px 24px 80px; }
.page-header { text-align: center; margin-bottom: 50px; }
.page-title {
  font-size: 36px; font-weight: 800;
  color: var(--secondary);
  display: flex; align-items: center; justify-content: center; gap: 14px;
}
.page-title i { color: #f39c12; }
.page-sub { color: var(--text-soft); margin-top: 8px; }

.empty { text-align: center; padding: 80px 20px; background: white; border-radius: 20px; }
.empty i { font-size: 60px; color: #f39c12; opacity: 0.3; margin-bottom: 20px; }
.empty h2 { color: var(--secondary); margin-bottom: 8px; }
.empty p { color: var(--text-soft); margin-bottom: 24px; }

.certs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
}
.cert-wrap {
  display: flex; flex-direction: column; gap: 16px;
  animation: scaleIn 0.5s ease backwards;
}
.cert {
  position: relative;
  background: linear-gradient(135deg, #fff8e1 0%, #fff3cd 100%);
  border: 8px solid #d4a017;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(212,160,23,0.3);
  overflow: hidden;
  transition: all 0.4s;
  aspect-ratio: 1.4;
}
.cert:hover { transform: translateY(-4px) scale(1.02); }
.cert-pattern {
  position: absolute; inset: 0;
  background-image:
    radial-gradient(circle at 0% 0%, transparent 30px, rgba(212,160,23,0.08) 30px, rgba(212,160,23,0.08) 32px, transparent 32px),
    radial-gradient(circle at 100% 0%, transparent 30px, rgba(212,160,23,0.08) 30px, rgba(212,160,23,0.08) 32px, transparent 32px),
    radial-gradient(circle at 0% 100%, transparent 30px, rgba(212,160,23,0.08) 30px, rgba(212,160,23,0.08) 32px, transparent 32px),
    radial-gradient(circle at 100% 100%, transparent 30px, rgba(212,160,23,0.08) 30px, rgba(212,160,23,0.08) 32px, transparent 32px);
}
.cert-inner {
  position: relative;
  border: 2px solid #d4a017;
  border-radius: 8px;
  padding: 20px;
  height: 100%;
  display: flex; flex-direction: column;
  justify-content: space-between;
  text-align: center;
}
.cert-header {
  display: flex; align-items: center; justify-content: center;
  gap: 14px; margin-bottom: 12px;
}
.cert-header i { font-size: 38px; color: #d4a017; }
.cert-brand { font-size: 22px; font-weight: 800; color: #2c3e50; }
.cert-tag { font-size: 10px; letter-spacing: 3px; color: #d4a017; font-weight: 700; }

.cert-body p { color: var(--text-soft); font-size: 13px; margin: 6px 0; font-style: italic; }
.cert-body h2 {
  font-family: 'Brush Script MT', cursive;
  font-size: 38px; color: #2c3e50;
  margin: 4px 0;
  border-bottom: 2px solid #d4a017;
  padding-bottom: 4px;
  display: inline-block;
}
.cert-body h3 {
  font-size: 18px; color: var(--primary-dark);
  margin-top: 8px; font-weight: 700;
}

.cert-footer {
  display: grid; grid-template-columns: 1fr auto 1fr;
  align-items: end; gap: 20px;
  font-size: 11px;
}
.sig-line {
  height: 1px; background: #2c3e50; margin-bottom: 4px;
}
.cert-footer small { display: block; color: #2c3e50; font-weight: 600; }
.seal {
  width: 70px; height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4a017, #f39c12);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(212,160,23,0.4);
}
.seal i { font-size: 20px; margin-bottom: 2px; }
.seal small { font-size: 8px; }

.download-btn { align-self: flex-end; }

@media (max-width: 768px) {
  .certs-grid { grid-template-columns: 1fr; }
  .cert-body h2 { font-size: 28px; }
}
</style>
