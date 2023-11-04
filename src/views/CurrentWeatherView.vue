<script setup>
const props = defineProps([
  'currentTemp',
  'currentCondition',
  'weatherIcon',
])

// TODO - Set up pinia store to pull response values into
</script>

<template>
  <main>
    <img :src="props.weatherIcon" :alt="props.currentCondition" />
    <h2>Current Temp: {{ props.currentTemp }} F</h2>
    <h3>Current Condition: {{ props.currentCondition }}</h3>
  </main>
</template>
