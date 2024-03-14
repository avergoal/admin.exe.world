<script setup>
import { defineEmits, ref } from 'vue'


const emit = defineEmits(['update:periodValue'])
const props = defineProps({
    data:{
        default:[]
    },
    show:{
        default:''
    },
    modelValue:{
        default:''
    }
})
const activePeriod = ref(0)

const selectPeriod = (period, key) => {
    activePeriod.value = key
    emit('update:periodValue', period)
}
</script>
<template>
    <div class="filter">
        <div
            class="b-2-bold"
            :class="{ active: key === activePeriod }"
            @click="selectPeriod(item, key)"
            :key="key"
            v-for="(item, key) in data"
        >
            {{ item[show] }}
        </div>
    </div>
</template>
<style scoped lang="scss">
@import './scss/statistics-filter';
</style>
