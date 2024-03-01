<script setup>
import StopIcon from '@/components/icons/StopIcon.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const signOut = async () => {
    await auth.logout()
}
</script>

<template>
    <div class="menu">
        <!--        <div class="menu-item">-->
        <!--            <div class="icon">-->
        <!--                <games-icon />-->
        <!--            </div>-->
        <!--            <div class="sub-2">Go to Exe Profile</div>-->
        <!--        </div>-->
        <div class="menu-item" @click="signOut">
            <div class="icon">
                <stop-icon />
            </div>
            <div class="sub-2">Sign Out</div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import '../scss/menu';
</style>
