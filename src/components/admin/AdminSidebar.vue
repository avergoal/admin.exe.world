<script setup>
import WalletIcon from '@/components/icons/admin/WalletIcon.vue'
import NotificationIcon from '@/components/icons/admin/NotificationIcon.vue'
import EmailMenuIcon from '@/components/icons/admin/EmailMenuIcon.vue'
</script>

<template>
    <div class="admin-sidebar">
        <div class="menu">
            <router-link :to="{ name: 'Payments' }" class="menu-item sub-1"
                ><WalletIcon /> Платежи</router-link
            >
            <router-link :to="{ name: 'Notifications' }" class="menu-item sub-1"
                ><NotificationIcon /> Уведомления</router-link
            >
            <router-link :to="{ name: 'Mailing' }" class="menu-item sub-1"
                ><EmailMenuIcon /> Рассылки</router-link
            >
            <router-link :to="{ name: 'Statistics' }" class="menu-item sub-1"
                ><WalletIcon /> Статистика</router-link
            >
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/admin-sidebar';
</style>
