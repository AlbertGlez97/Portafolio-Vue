<template>
  <!-- Layout principal con cabecera, contenido dinámico y pie -->
  <div id="app">
    <!-- Barra de navegación global -->
    <NavBar @open-login="showLoginModal = true" />
    <!-- Zona donde se renderiza cada vista del router -->
    <router-view />
    <!-- Modal de inicio de sesión -->
    <LoginModal v-model="showLoginModal" />
    <!-- Pie de página compartido -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Componentes globales que se muestran en todas las páginas
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import LoginModal from './components/LoginModal.vue'

const showLoginModal = ref(false)
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
