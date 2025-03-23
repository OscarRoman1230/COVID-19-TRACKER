<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login'); // Redirigir manualmente después del logout
};
</script>

<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>COVID-19 Tracker</v-toolbar-title>
    <v-spacer></v-spacer>

    <!-- Mostrar el menú si el usuario está autenticado -->
    <v-menu v-if="authStore.user" open-on-hover offset-y>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" color="white" variant="text">
          {{ authStore.user }}
          <v-icon end>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="handleLogout">
          <v-list-item-title>Cerrar Sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>

</style>