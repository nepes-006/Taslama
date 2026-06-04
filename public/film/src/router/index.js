import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/courses', name: 'courses', component: () => import('../views/CoursesView.vue') },
  { path: '/courses/:id', name: 'course-detail', component: () => import('../views/CourseDetailView.vue') },
  { path: '/my-courses', name: 'my-courses', component: () => import('../views/MyCoursesView.vue') },
  { path: '/profile', name: 'profile', component: () => import('../views/ProfileView.vue') },
  { path: '/instructors', name: 'instructors', component: () => import('../views/InstructorsView.vue') },
  { path: '/instructors/:id', name: 'instructor-detail', component: () => import('../views/InstructorDetailView.vue') },
  { path: '/cart', name: 'cart', component: () => import('../views/CartView.vue') },
  { path: '/checkout', name: 'checkout', component: () => import('../views/CheckoutView.vue') },
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
  { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },
  { path: '/certificates', name: 'certificates', component: () => import('../views/CertificatesView.vue') },
  { path: '/category/:id', name: 'category', component: () => import('../views/CategoryView.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

export default router
