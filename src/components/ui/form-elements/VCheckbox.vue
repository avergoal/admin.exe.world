<script setup>
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const isChecked = ref(false)

const onInput = () => {
    emit('update:modelValue', isChecked.value)
}
</script>

<template>
    <label class="checkbox b-2-regular">
        <input @change="onInput" v-model="isChecked" type="checkbox" />
        <span class="checkmark"></span>
        <slot></slot>
        <span class="violet" v-if="$slots.violet">
            <slot name="violet"></slot>
        </span>
    </label>
</template>

<style scoped lang="scss">
@import './scss/form-elements.scss';
</style>
