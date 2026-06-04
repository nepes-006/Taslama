// 100 Course Generator
const courseTemplates = {
  languages: [
    { tr: 'İngilizce A1\'den C2\'ye Tam Kurs', en: 'Complete English A1 to C2 Course', desc: 'Sıfırdan ileri seviyeye kadar İngilizce öğren. Konuşma, yazma, dinleme ve okuma.' },
    { tr: 'İspanyolca Konuşma Kursu', en: 'Spanish Speaking Course', desc: 'Günlük hayatta kullanabileceğin pratik İspanyolca öğren.' },
    { tr: 'Almanca Gramer Ustalığı', en: 'German Grammar Mastery', desc: 'Almanca grameri tüm detaylarıyla öğren ve uygula.' },
    { tr: 'Fransızca Başlangıç Seviyesi', en: 'French for Beginners', desc: 'Fransızca temel kelime hazinesi ve gramer yapıları.' },
    { tr: 'Japonca Hiragana ve Katakana', en: 'Japanese Hiragana & Katakana', desc: 'Japon yazı sistemini sıfırdan öğren.' },
    { tr: 'Çince Mandarin Pratik', en: 'Chinese Mandarin Practical', desc: 'Konuşma odaklı Mandarin Çincesi kursu.' },
    { tr: 'Arapça Okuma Yazma', en: 'Arabic Reading & Writing', desc: 'Arap alfabesinden başlayarak okuma yazma becerisi.' },
    { tr: 'Rusça Hızlı Başlangıç', en: 'Russian Quick Start', desc: 'Kiril alfabesi ve temel Rusça konuşma.' },
    { tr: 'İtalyanca Seyahat Kursu', en: 'Italian Travel Course', desc: 'İtalya seyahatinde işine yarayacak pratik İtalyanca.' },
    { tr: 'Korece K-Pop Hayranları İçin', en: 'Korean for K-Pop Fans', desc: 'Korece temel ve K-Pop kültürü.' },
    { tr: 'Portekizce Brezilya Aksanı', en: 'Brazilian Portuguese', desc: 'Brezilya Portekizcesi konuşma kursu.' },
    { tr: 'TOEFL ve IELTS Hazırlık', en: 'TOEFL & IELTS Preparation', desc: 'Uluslararası İngilizce sınavlarına hazırlık.' }
  ],
  science: [
    { tr: 'Kuantum Fiziğine Giriş', en: 'Introduction to Quantum Physics', desc: 'Kuantum dünyasının temellerini anlaşılır şekilde öğren.' },
    { tr: 'Modern Astronomi', en: 'Modern Astronomy', desc: 'Evrenin gizemlerini keşfet, yıldızları ve galaksileri tanı.' },
    { tr: 'Genetik Mühendisliği', en: 'Genetic Engineering', desc: 'CRISPR ve modern genetik teknikleri.' },
    { tr: 'Kimya Laboratuvarı', en: 'Chemistry Lab Practices', desc: 'Pratik kimya deneyleri ve teknikleri.' },
    { tr: 'İstatistik ve Olasılık', en: 'Statistics & Probability', desc: 'Veri analizi için temel istatistik.' },
    { tr: 'Astrofizik Temelleri', en: 'Astrophysics Fundamentals', desc: 'Kara delikler, nötron yıldızları ve daha fazlası.' },
    { tr: 'Biyoloji 101', en: 'Biology 101', desc: 'Hücreden ekosisteme biyoloji.' },
    { tr: 'Bilim Felsefesi', en: 'Philosophy of Science', desc: 'Bilimin temel ilkeleri ve metodolojisi.' },
    { tr: 'Nörobilim', en: 'Neuroscience', desc: 'Beynin çalışma prensipleri.' }
  ],
  technical: [
    { tr: 'Elektronik Devre Tasarımı', en: 'Electronic Circuit Design', desc: 'Sıfırdan elektronik devre kurma.' },
    { tr: 'PCB Tasarımı', en: 'PCB Design', desc: 'Profesyonel baskılı devre kartı tasarımı.' },
    { tr: 'CNC Programlama', en: 'CNC Programming', desc: 'CNC makineleri için G-code programlama.' },
    { tr: 'Hidrolik Sistemler', en: 'Hydraulic Systems', desc: 'Endüstriyel hidrolik sistemler.' },
    { tr: 'Pnömatik Sistemler', en: 'Pneumatic Systems', desc: 'Hava basınçlı sistem tasarımı.' },
    { tr: 'Endüstriyel Otomasyon', en: 'Industrial Automation', desc: 'PLC ve SCADA sistemleri.' },
    { tr: 'Soğutma Sistemleri', en: 'Cooling Systems', desc: 'HVAC ve soğutma teknolojileri.' },
    { tr: 'Kaynakçılık Teknikleri', en: 'Welding Techniques', desc: 'TIG, MIG ve ark kaynak teknikleri.' }
  ],
  nature: [
    { tr: 'Sürdürülebilir Tarım', en: 'Sustainable Agriculture', desc: 'Organik ve sürdürülebilir tarım teknikleri.' },
    { tr: 'Botanik ve Bitki Bilimi', en: 'Botany & Plant Science', desc: 'Bitkilerin dünyasını keşfet.' },
    { tr: 'Hayvan Davranışları', en: 'Animal Behavior', desc: 'Etoloji ve hayvan psikolojisi.' },
    { tr: 'Ekoloji ve Çevre Bilimi', en: 'Ecology & Environmental Science', desc: 'Ekosistemler ve çevre koruma.' },
    { tr: 'İklim Değişikliği', en: 'Climate Change', desc: 'İklim değişikliğinin bilimi ve etkileri.' },
    { tr: 'Okyanus Bilimleri', en: 'Oceanography', desc: 'Denizlerin ve okyanusların bilimi.' },
    { tr: 'Permakültür Tasarımı', en: 'Permaculture Design', desc: 'Doğa ile uyumlu yaşam tasarımı.' },
    { tr: 'Mantar Yetiştiriciliği', en: 'Mushroom Cultivation', desc: 'Evde ve serada mantar üretimi.' },
    { tr: 'Arıcılık', en: 'Beekeeping', desc: 'Modern arıcılık teknikleri.' }
  ],
  ai: [
    { tr: 'Makine Öğrenmesi A-Z', en: 'Machine Learning A-Z', desc: 'Sıfırdan ileri seviyeye makine öğrenmesi.' },
    { tr: 'Derin Öğrenme ve Sinir Ağları', en: 'Deep Learning & Neural Networks', desc: 'TensorFlow ve PyTorch ile derin öğrenme.' },
    { tr: 'ChatGPT ve LLM Geliştirme', en: 'ChatGPT & LLM Development', desc: 'Büyük dil modelleri ile uygulama geliştirme.' },
    { tr: 'Bilgisayarla Görü', en: 'Computer Vision', desc: 'OpenCV ve YOLO ile görüntü işleme.' },
    { tr: 'Doğal Dil İşleme', en: 'Natural Language Processing', desc: 'Metin işleme ve dil modelleri.' },
    { tr: 'Reinforcement Learning', en: 'Reinforcement Learning', desc: 'Pekiştirmeli öğrenme ve oyun AI\'ları.' },
    { tr: 'AI Etiği ve Güvenliği', en: 'AI Ethics & Safety', desc: 'Yapay zekanın etik boyutları.' },
    { tr: 'Generative AI', en: 'Generative AI', desc: 'GAN, Diffusion modelleri ve üretken AI.' },
    { tr: 'AI ile Veri Analizi', en: 'AI Data Analytics', desc: 'AI destekli veri analizi teknikleri.' },
    { tr: 'Prompt Engineering', en: 'Prompt Engineering', desc: 'AI modelleri için etkili prompt yazma.' },
    { tr: 'TensorFlow Master', en: 'TensorFlow Master', desc: 'Google TensorFlow ile profesyonel projeler.' },
    { tr: 'PyTorch Eğitimi', en: 'PyTorch Training', desc: 'Facebook PyTorch ile derin öğrenme.' }
  ],
  robotics: [
    { tr: 'Arduino ile Robotik', en: 'Robotics with Arduino', desc: 'Arduino ile kendi robotunu yap.' },
    { tr: 'Raspberry Pi Projeleri', en: 'Raspberry Pi Projects', desc: 'Raspberry Pi ile IoT ve robotik.' },
    { tr: 'ROS (Robot Operating System)', en: 'ROS Mastery', desc: 'Profesyonel robot programlama.' },
    { tr: 'Drone Programlama', en: 'Drone Programming', desc: 'Otonom drone\'lar geliştir.' },
    { tr: 'Endüstriyel Robotlar', en: 'Industrial Robots', desc: 'KUKA, ABB ve Fanuc robot programlama.' },
    { tr: 'İnsansı Robotlar', en: 'Humanoid Robots', desc: 'İnsansı robot tasarımı ve programlama.' },
    { tr: 'Sensörler ve Aktüatörler', en: 'Sensors & Actuators', desc: 'Robotik için sensör teknolojileri.' },
    { tr: 'Otonom Araçlar', en: 'Autonomous Vehicles', desc: 'Sürücüsüz araç teknolojileri.' },
    { tr: 'Robotik Kol Kontrolü', en: 'Robotic Arm Control', desc: 'Robotik kollar için kinematik.' }
  ],
  engineering: [
    { tr: 'Makine Mühendisliği Temelleri', en: 'Mechanical Engineering Basics', desc: 'Makine mühendisliği temel kavramlar.' },
    { tr: 'Elektrik Mühendisliği', en: 'Electrical Engineering', desc: 'Elektrik devreleri ve güç sistemleri.' },
    { tr: 'İnşaat Mühendisliği', en: 'Civil Engineering', desc: 'Yapı tasarımı ve statik.' },
    { tr: 'Endüstri Mühendisliği', en: 'Industrial Engineering', desc: 'Üretim ve süreç optimizasyonu.' },
    { tr: 'Kimya Mühendisliği', en: 'Chemical Engineering', desc: 'Kimyasal süreçler ve reaktörler.' },
    { tr: 'AutoCAD Profesyonel', en: 'AutoCAD Professional', desc: 'Profesyonel CAD tasarımı.' },
    { tr: 'SolidWorks Tasarım', en: 'SolidWorks Design', desc: '3D mekanik tasarım.' },
    { tr: 'Havacılık Mühendisliği', en: 'Aerospace Engineering', desc: 'Uçak ve uzay araçları tasarımı.' },
    { tr: 'Yazılım Mühendisliği', en: 'Software Engineering', desc: 'Yazılım geliştirme yaşam döngüsü.' },
    { tr: 'Çevre Mühendisliği', en: 'Environmental Engineering', desc: 'Çevresel sistemler ve sürdürülebilirlik.' }
  ],
  '3d': [
    { tr: 'Blender 3D Sıfırdan', en: 'Blender 3D from Scratch', desc: 'Blender ile profesyonel 3D modelleme.' },
    { tr: 'Maya 3D Animasyon', en: 'Maya 3D Animation', desc: 'Autodesk Maya ile karakter animasyonu.' },
    { tr: 'ZBrush Karakter Sculpting', en: 'ZBrush Character Sculpting', desc: 'Dijital heykeltıraşlık.' },
    { tr: 'Cinema 4D Motion Graphics', en: 'Cinema 4D Motion Graphics', desc: 'Hareketli grafikler ve animasyon.' },
    { tr: '3ds Max Mimari Görselleştirme', en: '3ds Max Architectural Visualization', desc: 'Mimari render ve görselleştirme.' },
    { tr: 'Unity 3D Oyun Geliştirme', en: 'Unity 3D Game Development', desc: 'Unity ile 3D oyunlar yap.' },
    { tr: 'Unreal Engine 5', en: 'Unreal Engine 5', desc: 'AAA kalitede oyun ve görsel.' },
    { tr: '3D Printing Tasarımı', en: '3D Printing Design', desc: '3D yazıcı için optimal tasarım.' },
    { tr: 'VFX ve Görsel Efektler', en: 'VFX & Visual Effects', desc: 'Sinema kalitesinde görsel efektler.' },
    { tr: 'Substance Painter', en: 'Substance Painter', desc: '3D modeller için profesyonel doku.' }
  ],
  programming: [
    { tr: 'Python Sıfırdan İleri Seviyeye', en: 'Python from Zero to Hero', desc: 'En popüler programlama dilini öğren.' },
    { tr: 'JavaScript Modern ES2024', en: 'Modern JavaScript ES2024', desc: 'Modern JavaScript özelliklerini öğren.' },
    { tr: 'Vue.js 3 Komple Rehber', en: 'Vue.js 3 Complete Guide', desc: 'Vue 3, Composition API ve Pinia.' },
    { tr: 'React.js ve Redux', en: 'React.js & Redux', desc: 'React ile modern web uygulamaları.' },
    { tr: 'Node.js Backend Geliştirme', en: 'Node.js Backend Development', desc: 'Node.js, Express ve MongoDB.' },
    { tr: 'TypeScript Master', en: 'TypeScript Master', desc: 'Type-safe JavaScript geliştirme.' },
    { tr: 'Java OOP Programlama', en: 'Java OOP Programming', desc: 'Nesne yönelimli Java programlama.' },
    { tr: 'C# ve .NET Core', en: 'C# & .NET Core', desc: 'Microsoft .NET ile uygulama geliştirme.' },
    { tr: 'Go Programlama Dili', en: 'Go Programming Language', desc: 'Google Go dili ile yüksek performans.' },
    { tr: 'Rust Sistem Programlama', en: 'Rust Systems Programming', desc: 'Hafıza güvenli sistem programlama.' },
    { tr: 'Flutter Mobil Uygulama', en: 'Flutter Mobile Development', desc: 'iOS ve Android için tek kodbase.' },
    { tr: 'Swift iOS Geliştirme', en: 'Swift iOS Development', desc: 'Apple platformları için uygulama.' },
    { tr: 'Kotlin Android', en: 'Kotlin Android', desc: 'Modern Android uygulama geliştirme.' },
    { tr: 'PHP ve Laravel', en: 'PHP & Laravel', desc: 'Modern PHP web geliştirme.' },
    { tr: 'Ruby on Rails', en: 'Ruby on Rails', desc: 'Hızlı web uygulaması geliştirme.' },
    { tr: 'Django Python Web', en: 'Django Python Web', desc: 'Python ile güçlü web uygulamaları.' }
  ]
}

const thumbnails = {
  languages: ['https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600', 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'],
  science: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600', 'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?w=600', 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600'],
  technical: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600', 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600'],
  nature: ['https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600'],
  ai: ['https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600', 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=600'],
  robotics: ['https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600', 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=600', 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600'],
  engineering: ['https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600', 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600'],
  '3d': ['https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600', 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600', 'https://images.unsplash.com/photo-1635373670332-43ea883bb081?w=600'],
  programming: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600', 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600']
}

const levels = ['beginner', 'intermediate', 'advanced']
const instructorIds = [1,2,3,4,5,6,7,8,9,10]

function generateCourses() {
  const courses = []
  let id = 1
  for (const cat of Object.keys(courseTemplates)) {
    courseTemplates[cat].forEach((tpl, idx) => {
      const price = Math.floor(Math.random() * 400) + 99
      const oldPrice = price + Math.floor(Math.random() * 200) + 100
      const rating = (4.3 + Math.random() * 0.7).toFixed(1)
      const students = Math.floor(Math.random() * 45000) + 1500
      const lessons = Math.floor(Math.random() * 60) + 20
      const hours = Math.floor(Math.random() * 30) + 8
      courses.push({
        id: id++,
        title: tpl.tr,
        title_en: tpl.en,
        description: tpl.desc,
        category: cat,
        thumbnail: thumbnails[cat][idx % thumbnails[cat].length],
        price,
        oldPrice,
        rating: parseFloat(rating),
        ratingCount: Math.floor(students * 0.3),
        students,
        lessons,
        hours,
        level: levels[Math.floor(Math.random() * 3)],
        instructorId: instructorIds[Math.floor(Math.random() * instructorIds.length)],
        bestseller: Math.random() > 0.7,
        isNew: Math.random() > 0.8,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        whatLearn: [
          'Sıfırdan ileri seviyeye komple yolculuk',
          'Gerçek dünya projeleri ile pratik deneyim',
          'Sektörde kullanılan en güncel teknikler',
          'Sertifika ile kariyerini güçlendir',
          'Ömür boyu erişim ve güncellemeler'
        ],
        requirements: [
          'Bilgisayar ve internet bağlantısı',
          'Öğrenmeye istekli olmak',
          'Temel bilgisayar kullanımı'
        ],
        curriculum: Array.from({length: 8}, (_, i) => ({
          title: `Bölüm ${i+1}: ${['Giriş','Temel Kavramlar','İleri Konular','Uygulama','Proje','İleri Teknikler','Optimizasyon','Sonuç'][i]}`,
          lessons: Array.from({length: Math.floor(Math.random()*5)+3}, (_,j) => ({
            title: `Ders ${j+1}`,
            duration: `${Math.floor(Math.random()*15)+5}:${Math.floor(Math.random()*60).toString().padStart(2,'0')}`
          }))
        })),
        reviews: Array.from({length: 5}, (_,i) => ({
          name: ['Ahmet K.', 'Ayşe M.', 'Mehmet S.', 'Zeynep T.', 'Can D.'][i],
          avatar: `https://i.pravatar.cc/100?img=${i+20}`,
          rating: Math.floor(Math.random()*2)+4,
          date: '2 hafta önce',
          comment: ['Harika bir kurs, çok şey öğrendim!', 'Eğitmen çok açıklayıcı, tavsiye ederim.', 'Beklediğimden çok daha iyiydi!', 'Pratik örnekler mükemmel.', 'Hayatımı değiştirdi diyebilirim.'][i]
        }))
      })
    })
  }
  return courses
}

export const courses = generateCourses()
