<script setup lang="ts">
import { ref, onMounted, watch, defineEmits } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';

const props = defineProps<{ filters: any }>();
const emit = defineEmits(['updateTotals']);

const API_KEY = 'AIzaSyBxNStypKrE9J3G2X3qNvSEzqfgN0EZyHg';
const mapContainer = ref<HTMLDivElement | null>(null);
let map: google.maps.Map;
let infoWindow: google.maps.InfoWindow;
let geoJsonData: any = null;
let casosPorDepartamento: Record<string, any> = {};

onMounted(async () => {
  const loader = new Loader({ apiKey: API_KEY, version: 'weekly' });
  const { Map, InfoWindow } = await loader.importLibrary('maps');

  map = new Map(mapContainer.value as HTMLDivElement, {
    center: { lat: 4.5709, lng: -74.2973 },
    zoom: 5,
    mapTypeId: 'terrain',
  });

  // Crear InfoWindow una sola vez
  infoWindow = new InfoWindow();

  await loadData();
});

const loadData = async () => {
  if (!geoJsonData) {
    const geoJsonResponse = await axios.get(
        'https://gist.githubusercontent.com/john-guerra/43c7656821069d00dcbc/raw/3aadedf47badbdac823b00dbe259f6bc6d9e1899/colombia.geo.json'
    );
    geoJsonData = geoJsonResponse.data;
    map.data.addGeoJson(geoJsonData);
  }

  const { data: covidData } = await axios.get('https://www.datos.gov.co/resource/gt2j-8ykr.json');

  let totals = { confirmados: 0, recuperados: 0, fallecidos: 0 };
  let filteredTotals = { confirmados: 0, recuperados: 0, fallecidos: 0 };

  casosPorDepartamento = {};

  covidData.forEach((caso: any) => {
    const depto = caso.departamento_nom;
    if (!casosPorDepartamento[depto]) {
      casosPorDepartamento[depto] = { confirmados: 0, recuperados: 0, fallecidos: 0 };
    }

    casosPorDepartamento[depto].confirmados++;
    if (caso.recuperado === 'Recuperado') casosPorDepartamento[depto].recuperados++;
    if (caso.estado === 'Fallecido') casosPorDepartamento[depto].fallecidos++;

    totals.confirmados++;
    if (caso.recuperado === 'Recuperado') totals.recuperados++;
    if (caso.estado === 'Fallecido') totals.fallecidos++;
  });

  map.data.setStyle((feature) => {
    const nombreDepartamento = feature.getProperty('NOMBRE_DPT');
    const datos = casosPorDepartamento[nombreDepartamento] || { confirmados: 0, recuperados: 0, fallecidos: 0 };

    const matchesFilter =
        (!props.filters.department || nombreDepartamento === props.filters.department) &&
        (!props.filters.state || (props.filters.state === 'Fallecido' && datos.fallecidos > 0) ||
            (props.filters.state === 'Recuperado' && datos.recuperados > 0) ||
            (props.filters.state === 'Activo' && datos.confirmados > 0));

    if (matchesFilter) {
      filteredTotals.confirmados += datos.confirmados;
      filteredTotals.recuperados += datos.recuperados;
      filteredTotals.fallecidos += datos.fallecidos;
    }

    return {
      fillColor: matchesFilter
          ? datos.confirmados > 5000 ? 'red' : datos.confirmados > 1000 ? 'orange' : 'green'
          : 'gray',
      strokeWeight: 1,
      visible: matchesFilter,
    };
  });

  // Emitir los valores totales y filtrados al Sidebar
  emit('updateTotals', { totals, filteredTotals });

  // Evento para mostrar detalles al pasar el cursor
  map.data.addListener('mouseover', (event) => {
    const feature = event.feature;
    const nombre = feature.getProperty('NOMBRE_DPT');
    const codigo = feature.getProperty('DPTO');
    const area = feature.getProperty('AREA');
    const perimetro = feature.getProperty('PERIMETER');
    const hectareas = feature.getProperty('HECTARES');

    const datos = casosPorDepartamento[nombre] || { confirmados: 0, recuperados: 0, fallecidos: 0 };

    // Configurar el contenido del InfoWindow
    infoWindow.setContent(`
      <div style="font-family: Arial; font-size: 14px;">
        <strong>Departamento:</strong> ${nombre} (${codigo})<br>
        <strong>Área:</strong> ${area.toLocaleString()} m²<br>
        <strong>Perímetro:</strong> ${perimetro.toLocaleString()} m<br>
        <strong>Hectáreas:</strong> ${hectareas.toLocaleString()} ha<br>
        <strong>Casos Confirmados:</strong> ${datos.confirmados}<br>
        <strong>Recuperados:</strong> ${datos.recuperados}<br>
        <strong>Fallecidos:</strong> ${datos.fallecidos}
      </div>
    `);
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  // Cerrar la InfoWindow cuando el mouse sale del polígono
  map.data.addListener('mouseout', () => {
    infoWindow.close();
  });
};

watch(() => props.filters, loadData, { deep: true });
</script>

<template>
  <v-container>
    <v-sheet elevation="4" class="rounded-lg">
      <div ref="mapContainer" class="map"></div>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.map {
  width: 100%;
  height: calc(100vh - 150px);
  border-radius: 10px;
}
</style>