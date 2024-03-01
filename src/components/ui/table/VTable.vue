<script setup>
import TableDoneIcon from '@/components/icons/table/TableDoneIcon.vue'
import MoreIcon from '@/components/icons/MoreIcon.vue'
import TableMenu from '@/components/users/TableMenu.vue'
import TableArrowIcon from '@/components/icons/table/TableArrowIcon.vue'
import TableCloseIcon from '@/components/icons/table/TableCloseIcon.vue'
</script>

<template>
    <table class="table">
        <thead>
            <slot name="thead" />
        </thead>
        <tbody>
            <slot name="tbody" />
        </tbody>
    </table>
</template>

<style lang="scss">
@import 'scss/table';
</style>
