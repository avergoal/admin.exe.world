<script setup>
import { computed } from 'vue'
import BackMiniIcon from '@/components/icons/BackMiniIcon.vue'

const emit = defineEmits(['page-change'])

const props = defineProps({
    currentPage: Number,
    totalPages: Number,
    maxVisiblePages: {
        type: Number,
        default: 5 // Number of visible page buttons
    },
    margin:{
        default:false
    }
})

const pages = computed(() => {
    const visiblePages = []
    let startPage = Math.max(1, props.currentPage - Math.floor(props.maxVisiblePages / 2))
    let endPage = startPage + props.maxVisiblePages - 1

    if (endPage > props.totalPages) {
        endPage = props.totalPages
        startPage = Math.max(1, endPage - props.maxVisiblePages + 1)
    }

    for (let page = startPage; page <= endPage; page++) {
        visiblePages.push(page)
    }

    return visiblePages
})

const goToPage = (page) => {
    if (page >= 1 && page <= props.totalPages) {
        emit('page-change', page)
    }
}
</script>

<template>
    <div class="pagination" :class="{margin}">
        <button
            v-if="pages.length && currentPage > 1"
            class="prev page b-2-compact b-2-bold"
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
        >
            <back-mini-icon />
        </button>
        <button
            v-for="page in pages"
            :key="page"
            class="page b-2-compact b-2-bold"
            @click="goToPage(page)"
            :class="{ active: page === currentPage }"
        >
            {{ page }}
        </button>
        <button
            v-if="pages.length && currentPage < totalPages"
            class="next page b-2-compact b-2-bold"
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
        >
            <back-mini-icon />
        </button>
    </div>
</template>

<style scoped lang="scss">
@import 'pagination';
</style>
