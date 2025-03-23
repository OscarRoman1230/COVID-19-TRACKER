<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import MapView from '@/components/MapView.vue';
import NavBar from '@/components/NavBar.vue';

const filters = ref({});
const totals = ref({ confirmados: 0, recuperados: 0, fallecidos: 0 });
const filteredTotals = ref({ confirmados: 0, recuperados: 0, fallecidos: 0 });

const updateFilters = (newFilters: any) => {
  filters.value = newFilters;
};

const updateTotals = (data: any) => {
  totals.value = data.totals;
  filteredTotals.value = data.filteredTotals;
};
</script>

<template>
  <v-app>
    <NavBar />
    <Sidebar :totals="totals" :filteredTotals="filteredTotals" @update-filters="updateFilters" />
    <v-main>
      <v-container>
        <v-card class="pa-4">
          <v-card-title class="text-h5 font-weight-bold">Dashboard COVID-19 en Colombia</v-card-title>
          <v-card-subtitle>Visualización de datos por departamento</v-card-subtitle>
          <MapView :filters="filters" @updateTotals="updateTotals" />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>