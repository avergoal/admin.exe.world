<script setup>
import { onMounted, ref } from 'vue'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import DateIcon from '@/components/icons/DateIcon.vue'
import DropdownIcon from '@/components/icons/DropdownIcon.vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    dateType: {
        default: 'date',
        type: String
    },
    placeholder: {
        default: ''
    },
    title: {
        default: ''
    },
    mode: {
        default: ''
    },
    modelValue: {
        default: ''
    },
    dateFormat:{
        default:''
    }
})

const flatpickrRef = ref(null)

onMounted(() => {
    const params = {
        enableTime: false,
        time_24hr: false,
        dateFormat: props.dateFormat.length?props.dateFormat:'d-m-y',
        closeOnSelect: true,
        onChange: function (selectedDates, dateStr, instance) {
            // Update flatpickrRef.value with the selected date or time
            flatpickrRef.value = dateStr
        }
    }
    if (props.mode) {
        params.mode = props.mode
    }
    if (props.dateType !== 'date') {
        params.noCalendar = true
        params.time_24hr = true
        params.enableTime = true
        params.closeOnSelect = false
        params.dateFormat = props.dateFormat.length?props.dateFormat:'H:i'
    }

    flatpickr(flatpickrRef.value, params)
})

const convertDateRange = (inputDateRange) => {
    const [startDate, endDate] = inputDateRange.split(' to ').map((date) => date)
    return `${startDate},${endDate}`
}

const updateDate = (e) => {
    if (e.target.value.includes('to') ) {
        emit('update:modelValue', convertDateRange(e.target.value))
    }
    if(props.mode !== 'range'){
        emit('update:modelValue',e.target.value)
    }
}
</script>
<template>
    <div>
        <p class="b-1-compact">{{ title }}</p>
        <fieldset @click="flatpickrRef.focus()">
            <input
                :value="modelValue"
                @input="updateDate"
                ref="flatpickrRef"
                type="text"
                class="b-1-regular date"
                :placeholder="placeholder"
            />
            <DateIcon class="date-icon" v-if="dateType === 'date'" />
            <DropdownIcon class="date-icon" v-else />
        </fieldset>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/form-elements.scss';
</style>
<style>
.startRange,
.endRange,
.inRange {
    background: var(--violet-primary) !important;
    border-color: var(--violet-primary) !important;
}

.flatpickr-day.inRange {
    color: #fff;
    box-shadow: -5px 0 0 var(--violet-primary), 5px 0 0 var(--violet-primary) !important;
}
.flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n+1)), .flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n+1)), .flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n+1)){
    box-shadow: -5px 0 0 var(--violet-primary), 5px 0 0 var(--violet-primary) !important;
}
</style>
