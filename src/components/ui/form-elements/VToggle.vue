<script setup>
const emit = defineEmits(['update:value'])

const props = defineProps({
    checked: Boolean
})

const toggleCheckBox = (e) => {
    emit('update:value', e.target.checked)
}
</script>
<template>
    <label class="toggle">
        <input @change="toggleCheckBox($event)" type="checkbox" :checked="props.checked" />
        <span class="slider"></span>
    </label>
</template>

<style scoped lang="scss">
@import 'scss/form-elements.scss';
</style>
