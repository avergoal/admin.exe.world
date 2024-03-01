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
    }
})

const flatpickrRef = ref(null)

onMounted(() => {
    const params = {
        enableTime: false,
        time_24hr: false,
        dateFormat: 'd.m.y',
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
        params.time_24hr = false
        params.enableTime = true
        params.closeOnSelect = false
        params.dateFormat = 'h:i K'
    }

    flatpickr(flatpickrRef.value, params)
})

const convertDateRange = (inputDateRange) => {
    const [startDate, endDate] = inputDateRange.split(' to ').map((date) => convertDateFormat(date))
    return `${startDate},${endDate}`
}

// Function to convert individual date
const convertDateFormat = (inputDate) => {
    const [day, month, year] = inputDate.split('.')
    const formattedDate = `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    return formattedDate
}

const updateDate = (e) => {
    if (e.target.value.includes('to')) {
        emit('update:modelValue', convertDateRange(e.target.value))
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
</style>