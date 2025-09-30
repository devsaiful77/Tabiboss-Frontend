<template>
  <div class="countdown">
    <div class="time-box">
      <span class="time-value">{{ days }}</span>
      <span class="time-label">{{ lang.days }}</span>
    </div>
    <div class="time-box">
      <span class="time-value">{{ format(hours) }}</span>
      <span class="time-label">{{ lang.hrs }}</span>
    </div>
    <div class="time-box">
      <span class="time-value">{{ format(minutes) }}</span>
      <span class="time-label">{{ lang.mins }}</span>
    </div>
    <div class="time-box">
      <span class="time-value">{{ format(seconds) }}</span>
      <span class="time-label">{{ lang.secs }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  days: Number,
  hours: Number,
  minutes: Number,
  seconds: Number
})

const format = (val) => String(val).padStart(2, '0')
</script>
