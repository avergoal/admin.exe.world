<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
</script>

<template>
    <div class="admin-content">
        <AdminSidebar />
        <router-view />
    </div>
</template>

<style scoped lang="scss">
@import 'scss/admin';
</style>
