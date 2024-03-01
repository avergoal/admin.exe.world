<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import Header from '@/components/header/HeaderComponent.vue'

const auth = useAuthStore()
const app = useAppStore()

onMounted(() => {
    auth.checkLogged()
    app.init()
})
</script>
<template>
    <main>
        <Header />
        <router-view />
    </main>
</template>

<style scoped></style>
