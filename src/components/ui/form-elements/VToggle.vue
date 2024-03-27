<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: Boolean
})

const toggleCheckBox = (e) => {
    emit('update:modelValue', !!e.target.checked)
}
</script>
<template>
    <label class="toggle">
        <input @change="toggleCheckBox($event)" type="checkbox" :checked="modelValue" />
        <span class="slider"></span>
    </label>
</template>

<style scoped lang="scss">
@import 'scss/form-elements.scss';
</style>
