<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const location = ref('New York, NY');
const API_KEY = 'fcd36b86b77b43dd874211813232710';
const SERVICES_BASE = 'http://api.weatherapi.com/v1';
const CURRENT_WEATHER_URL = ref(SERVICES_BASE+'/current.json?key='+API_KEY+'&q=');

const isLoading = ref(true);
const isError = ref(false);
const currentTemp = ref();
const currentCondition = ref();
const weatherIcon = ref();

const fetchWeatherData = (url) => {
  axios.get(url)
    .then(function (response) {
      currentTemp.value = response?.data?.current?.temp_f;
      currentCondition.value = response?.data?.current?.condition?.text;
      weatherIcon.value = response?.data?.current?.condition?.icon;
    })
    .catch(function (error) {
      console.error(error);
      isError.value = true;
    })
    .finally(function () {
      // Simulate slow loading
      setTimeout(()=> {
        isLoading.value = false;
      }, 700)
    });
};

// Fetch on mount
fetchWeatherData(CURRENT_WEATHER_URL.value+location.value);

const handleSubmit = (event) => {
  event.preventDefault();
  isLoading.value = true;
  fetchWeatherData(CURRENT_WEATHER_URL.value+location.value);
}
</script>

<template>
  <header>
    <div class="wrapper">
      <form @submit="handleSubmit($event)">
        <label for="location">Location</label>
        <div class="p-inputgroup flex-1">
            <InputText
              id="location"
              v-model="location"
              autocomplete="false"
            />
            <Button label="Submit" type="submit"></Button>
        </div>
      </form>
      <nav>
        <RouterLink to="/">Current Weather</RouterLink>
        <RouterLink to="/forecast">Forcast</RouterLink>
      </nav>
    </div>
  </header>

  <div v-if="isError">Error: {{ error }}</div>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <img :src="weatherIcon" :alt="currentCondition" />
    <h2>Current Temp: {{ currentTemp }} F</h2>
    <h3>Current Condition: {{ currentCondition }}</h3>
  </div>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
