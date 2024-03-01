<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import VInput from '@/components/ui/form-elements/VInput.vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

const email = ref('')
const password = ref('')
const router = useRouter()

const auth = useAuthStore()
const app = useAppStore()

const signIn = async () => {
    let params = {
        emailorphone: email.value,
        pass: password.value
    }
    try {
        await auth.signIn(params)
        await auth.checkLogged()
        await app.init()
        await router.push('/')
    } catch (e) {
        console.error(e)
    }
}
</script>

<template>
    <div class="auth-content">
        <div class="auth">
            <div class="header-logo">
                <logo-icon />
            </div>
            <form @submit.prevent="signIn" class="form">
                <v-input @update:modelValue="email = $event">E-mail or Phone</v-input>
                <v-input @update:modelValue="password = $event" password="true">Password</v-input>
                <div class="buttons">
                    <main-button type="submit">log in</main-button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import './scss/auth.scss';
</style>
