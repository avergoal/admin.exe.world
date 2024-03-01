<script>
export default {
    name: 'MainButton',
    props: {
        icon: {
            default: false
        },
        small: {
            default: false
        },
        secondary: {
            default: false
        },
        file: {
            default: false
        }
    }
}
</script>
<template>
    <button class="primary button-1" :class="{ icon, small, secondary, file }">
        <slot />
    </button>
</template>

<style scoped lang="scss">
@import './scss/main-button.scss';
</style>
