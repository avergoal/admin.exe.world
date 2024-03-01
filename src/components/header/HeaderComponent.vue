<script setup>
import { RouterLink } from 'vue-router'
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import DropdownIcon from '@/components/icons/DropdownIcon.vue'
import HeaderMenu from '@/components/header/menu/HeaderMenu.vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
import router from '@/router'

const open = ref(false)
const userStore = useUserStore()
const authStore = useAuthStore()

const isLogged = computed(() => {
    return authStore.getIsLogged
})
const user = computed(() => {
    return userStore.getUser
})

const openMenu = () => {
    open.value = !open.value
    if (open.value) {
        document.addEventListener('click', closeMenu)
    } else {
        document.removeEventListener('click', closeMenu)
    }
}

const closeMenu = (e) => {
    if (!e.target.closest('.account-section') && open.value) {
        open.value = false
        document.removeEventListener('click', closeMenu)
    }
}
</script>
<template>
    <header>
        <div class="header">
            <div class="logo">
                <!--                <router-link :to="{ name: 'Home' }">-->
                <logo-icon />
                <!--                </router-link>-->
            </div>
            <nav>
                <router-link :to="{ name: 'Users' }" class="button-1">Пользователи </router-link>
                <router-link :to="{ name: 'Applications' }" class="button-1"
                    >приложения
                </router-link>
                <router-link
                    :to="{ name: 'Payments' }"
                    :class="{ 'router-link-active': $route.path.startsWith('/admin') }"
                    class="button-1"
                    >административная часть
                </router-link>
            </nav>
            <div class="account-section">
                <div v-if="isLogged" class="account" @click="openMenu" :class="{ open: open }">
                    <div class="image" :class="{ background: user.avatar_urls?.x100 }">
                        <!--                        <contact-logo v-if="noImage" />-->
                        <img :src="user.avatar_urls?.x100" alt="" />
                    </div>
                    <div class="name b-1-bold">{{ user.user_name }}</div>
                    <div class="drop-icon">
                        <dropdown-icon />
                    </div>
                </div>
                <main-button v-else @click="router.push('/auth')">sign in</main-button>
                <header-menu v-if="open" />
            </div>
        </div>
    </header>
</template>
<style scoped lang="scss">
@import './scss/header.scss';
</style>
