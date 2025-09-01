<template>
  <!-- Layout principal con cabecera, contenido dinámico y pie -->
  <div id="app">
    <!-- Barra de navegación global -->
    <NavBar />
    <!-- Zona donde se renderiza cada vista del router -->
    <router-view />
    <!-- Pie de página compartido -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
// Componentes globales que se muestran en todas las páginas
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
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
