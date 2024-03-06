import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Users',
            component: () => import('@/views/UsersView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/applications',
            name: '',
            meta: { requiresAuth: true },
            children: [
                {
                    path: '/application/:id?',
                    name: 'Application',
                    component: () => import('@/views/applications/Application.vue')
                },
                {
                    path: '',
                    name: 'Applications',
                    component: () => import('@/views/applications/Applications.vue')
                }
            ]
        },
        {
            path: '/admin',
            name: 'Admin',
            meta: { requiresAuth: true },
            component: () => import('@/views/admin/Admin.vue'),
            children: [
                {
                    path: '',
                    name: 'Payments',
                    component: () => import('@/views/admin/Payments.vue')
                },
                {
                    path: 'notifications',
                    name: 'Notifications',
                    component: () => import('@/views/admin/Notifications.vue')
                },
                {
                    path: 'mailing',
                    name: 'Mailing',
                    component: () => import('@/views/admin/Mailing.vue')
                },
                {
                    path: 'statistics',
                    name: 'Statistics',
                    component: () => import('@/views/admin/Statistics.vue')
                }
            ]
        },
        {
            path: '/auth',
            name: 'Auth',
            component: () => import('@/views/AuthView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const isLogged = computed(() => {
        return authStore.getIsLogged
    })
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (isLogged.value) {
            next()
        } else {
            next('/auth')
        }
    } else {
        if (to.name === 'Auth' && isLogged.value) {
            next('/')
        } else {
            next()
        }
    }
})

export default router
