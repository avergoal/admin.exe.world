<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import Header from '@/components/header/HeaderComponent.vue'
import Modal from "@/components/modal/Modal.vue";

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
        <Modal/>
    </main>
</template>

<style scoped></style>
