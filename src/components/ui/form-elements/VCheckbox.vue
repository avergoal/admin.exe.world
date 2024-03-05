<script setup>
import { defineEmits, ref } from 'vue'

defineProps({
    modelValue: {
        default:false
    }
})


const emit = defineEmits(['update:modelValue'])


// const isChecked = ref(false)

const onInput = (e) => {
    emit('update:modelValue', e.target.checked)
}
</script>

<template>
    <label class="checkbox b-2-regular">
        <input @change="onInput" :checked="modelValue" type="checkbox" />
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
