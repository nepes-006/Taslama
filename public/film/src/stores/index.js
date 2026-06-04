import { defineStore } from 'pinia'
import { courses } from '../data/courses.js'
import { instructors } from '../data/instructors.js'
import { categories } from '../data/categories.js'

export const useMainStore = defineStore('main', {
  state: () => ({
    courses,
    instructors,
    categories,
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    enrolled: JSON.parse(localStorage.getItem('enrolled') || '[]'),
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    completed: JSON.parse(localStorage.getItem('completed') || '[]'),
    progress: JSON.parse(localStorage.getItem('progress') || '{}')
  }),
  getters: {
    isLoggedIn: (s) => !!s.user,
    cartTotal: (s) => s.cart.reduce((sum, c) => sum + c.price, 0),
    cartCount: (s) => s.cart.length,
    enrolledCourses: (s) => s.enrolled.map(id => s.courses.find(c => c.id === id)).filter(Boolean),
    completedCourses: (s) => s.completed.map(id => s.courses.find(c => c.id === id)).filter(Boolean),
    popularCourses: (s) => [...s.courses].sort((a,b) => b.students - a.students).slice(0, 8),
    newCourses: (s) => s.courses.filter(c => c.isNew).slice(0, 8)
  },
  actions: {
    login(email, name) {
      this.user = { email, name: name || email.split('@')[0], avatar: `https://i.pravatar.cc/200?u=${email}`, joined: new Date().toLocaleDateString('tr-TR') }
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
    addToCart(course) {
      if (!this.cart.find(c => c.id === course.id)) {
        this.cart.push(course)
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter(c => c.id !== id)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    enroll(id) {
      if (!this.enrolled.includes(id)) {
        this.enrolled.push(id)
        localStorage.setItem('enrolled', JSON.stringify(this.enrolled))
      }
      this.cart = this.cart.filter(c => c.id !== id)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    checkoutAll() {
      this.cart.forEach(c => {
        if (!this.enrolled.includes(c.id)) this.enrolled.push(c.id)
      })
      localStorage.setItem('enrolled', JSON.stringify(this.enrolled))
      this.cart = []
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    completeCourse(id) {
      if (!this.completed.includes(id)) {
        this.completed.push(id)
        localStorage.setItem('completed', JSON.stringify(this.completed))
      }
    },
    updateProgress(courseId, percent) {
      this.progress[courseId] = percent
      localStorage.setItem('progress', JSON.stringify(this.progress))
    },
    updateProfile(data) {
      this.user = { ...this.user, ...data }
      localStorage.setItem('user', JSON.stringify(this.user))
    }
  }
})
