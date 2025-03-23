<script setup lang="ts">
import { ref, defineEmits, defineProps, onMounted } from 'vue';
import axios from 'axios';

const emit = defineEmits(['update-filters']);
const props = defineProps<{ totals: any; filteredTotals: any }>();

const selectedDepartment = ref<string | null>(null);
const selectedState = ref<string | null>(null);
const selectedRecovery = ref<string | null>(null);
const departments = ref<string[]>([]);
const states = ref(['Activo', 'Fallecido', 'Recuperado']);
const recoveryStatuses = ref(['Recuperado', 'Fallecido', 'Activo']);

// Cargar la lista de departamentos al montar el componente
onMounted(async () => {
  try {
    const { data } = await axios.get('https://www.datos.gov.co/resource/gt2j-8ykr.json');
    const uniqueDepartments = [...new Set(data.map((d: any) => d.departamento_nom))];
    departments.value = uniqueDepartments.sort();
  } catch (error) {
    console.error('Error cargando departamentos:', error);
  }
});

const applyFilters = () => {
  emit('update-filters', {
    department: selectedDepartment.value,
    state: selectedState.value,
    recovery: selectedRecovery.value,
  });
};

const clearFilters = () => {
  selectedDepartment.value = null;
  selectedState.value = null;
  selectedRecovery.value = null;
  applyFilters();
};
</script>

<template>
  <v-navigation-drawer app permanent width="320" color="grey-darken-3">
    <v-container>
      <v-card class="pa-3" color="grey-darken-4">
        <v-card-title class="text-h6 white--text">Resumen de Casos</v-card-title>
        <v-divider class="mb-4"></v-divider>

        <v-row>
          <v-col cols="12">
            <v-card outlined class="pa-2 text-center">
              <v-card-subtitle class="font-weight-bold">Total de Casos</v-card-subtitle>
              <v-card-title class="text-h6 red--text">{{ filteredTotals.confirmados}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card outlined class="pa-2 text-center">
              <v-card-subtitle class="font-weight-bold">Recuperados</v-card-subtitle>
              <v-card-title class="text-h6 green--text">{{ filteredTotals.recuperados }}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card outlined class="pa-2 text-center">
              <v-card-subtitle class="font-weight-bold">Fallecidos</v-card-subtitle>
              <v-card-title class="text-h6 grey--text">{{ filteredTotals.fallecidos }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>

        <v-card-title class="text-h6 white--text">Filtros</v-card-title>

        <v-combobox v-model="selectedDepartment" :items="departments" label="Departamento" density="compact" class="mb-3" clearable />
        <v-select v-model="selectedState" :items="states" label="Estado" density="compact" class="mb-3" clearable />

        <v-btn block color="primary" @click="applyFilters" class="mb-2">Aplicar Filtros</v-btn>
        <v-btn block color="red" @click="clearFilters">Limpiar</v-btn>
      </v-card>
    </v-container>
  </v-navigation-drawer>
</template>

<style scoped>

</style>