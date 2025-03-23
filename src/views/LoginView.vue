<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/store/auth';

const router = useRouter();
const authStore = useAuthStore();
const username = ref('');
const password = ref('');
const form = ref(null);

const rules = {
  required: (value: string) => !!value || 'Campo requerido',
};

const validateLogin = async () => {
  const {valid} = await (form.value as any).validate();
  if (valid) {
    authStore.login(username.value);
    await router.push('/dashboard');
  }
};
</script>

<template>
  <v-container fluid class="login-container fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12 pa-5 login-card bg-black" rounded>
          <v-card-title class="text-center text-blue-darken-1 text-h5 font-weight-bold">
            <v-icon class="mr-2" size="30">mdi-virus</v-icon> COVID-19 Tracker
          </v-card-title>

          <v-card-subtitle class="text-center mb-4">Inicia sesión para continuar</v-card-subtitle>

          <v-card-text>
            <v-form ref="form">
              <v-text-field
                  v-model="username"
                  label="Usuario"
                  variant="underlined"
                  prepend-inner-icon="mdi-account"
                  :rules="[rules.required]"
                  required
              />
              <v-text-field
                  v-model="password"
                  label="Contraseña"
                  type="password"
                  variant="underlined"
                  prepend-inner-icon="mdi-lock"
                  :rules="[rules.required]"
                  required
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn block color="primary" variant="outlined" class="login-btn" @click="validateLogin" append-icon="mdi-login">
              Ingresar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

/* Tarjeta de Login */
.login-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

/* Botón animado */
.login-btn {
  text-transform: capitalize;
  transition: all 0.3s ease-in-out;
}

.login-btn:hover {
  transform: scale(1.05);
}
</style>