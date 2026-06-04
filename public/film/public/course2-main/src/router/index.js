import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/Home.vue') },
  { path: '/about', component: () => import('../pages/About.vue') },
  { path: '/login', component: () => import('../pages/Login.vue') },
  { path: '/register', component: () => import('../pages/Register.vue') },
  { path: '/courses', component: () => import('../pages/Courses.vue') },
  { path: '/course/:id', component: () => import('../pages/CourseDetail.vue') },
  { path: '/course/:id/enroll', component: () => import('../pages/EnrollmentForm.vue'), meta: { requiresAuth: true } },
  { path: '/course/:id/learn', component: () => import('../pages/CoursePlayer.vue'), meta: { requiresAuth: true } },
  { path: '/my-learning', component: () => import('../pages/MyLearning.vue'), meta: { requiresAuth: true } },
  { path: '/profile', component: () => import('../pages/Profile.vue'), meta: { requiresAuth: true } },
  { path: '/admin', component: () => import('../pages/Admin.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/instructors', component: () => import('../pages/Instructors.vue') },
  { path: '/instructors/:id', component: () => import('../pages/InstructorDetail.vue') },
  { path: '/online-courses', component: () => import('../pages/OnlineCourses.vue') },
  { path: '/shop', component: () => import('../pages/Shop.vue') },
  { path: '/shop/:id', component: () => import('../pages/ShopDetail.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const userStr = sessionStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null

  if (to.meta.requiresAuth && !user) {
    return { path: '/login' }
  }
  if (to.meta.requiresAdmin && !user?.isAdmin) {
    return { path: '/' }
  }
})

export default router
