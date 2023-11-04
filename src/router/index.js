import { createRouter, createWebHistory } from 'vue-router'
import CurrentWeatherView from '../views/CurrentWeatherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'currentWeather',
      component: CurrentWeatherView
    },
    {
      path: '/forecast',
      name: 'forecast',
      // route level code-splitting
      // this generates a separate chunk (Forecast.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ForecastView.vue')
    }
  ]
})

export default router
