<script setup>
import {computed, defineEmits, onMounted, ref, watch} from 'vue'
import DropdownIcon from '@/components/icons/DropdownIcon.vue'
import TableDoneIcon from '@/components/icons/table/TableDoneIcon.vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    data: null,
    showSelect: String,
    title: String,
    idType: [String, Number],
    modelValue: [String, Number]
})


const open = ref(false)


const selected = computed(()=> {
    if(props.modelValue || props.modelValue === 0) {
        console.log('qwe')

        let find = props.data?.find((item) => item[props.idType] == props.modelValue)?.[
            props.showSelect
            ]
        console.log(find)
        return find ?? ''
    }
    return ''
})


const openSelect = () => {
    open.value = !open.value
    if (open.value) {
        document.addEventListener('click', closeSelect)
    } else {
        document.removeEventListener('click', closeSelect)
    }
}

const selectItem = (value) => {
    open.value = false
    emit('update:modelValue', value[props.idType])
}

const closeSelect = (e) => {
    if (!e.target.closest('.select') && open.value) {
        open.value = false
        document.removeEventListener('click', closeSelect)
    }
}

</script>

<template>
    <div>
        <p class="b-1-compact" v-if="title">{{ title }}</p>
        <fieldset class="select">
            <input type="text" list="data" disabled placeholder=" " :value="selected"/>
            <legend>
                <slot/>
            </legend>
            <div class="input-absolute" @click="openSelect">
                <div class="drop-icon" :class="{ open }">
                    <dropdown-icon/>
                </div>
            </div>
            <div class="select-overflow">
                <div class="select-items" v-if="open">
                    <div
                        @click="selectItem(datum)"
                        :key="datum[idType]"
                        class="item sub-2"
                        v-for="datum in data"
                    >
                        {{ datum[showSelect] }}
                        <table-done-icon v-if="datum[showSelect] === modelValue"/>
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<style scoped lang="scss">
@import './scss/form-elements.scss';
</style>
