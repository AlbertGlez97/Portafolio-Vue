import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/styles/main.css'
import i18n from './i18n'

// Punto de entrada de la aplicación. Aquí se instancia Vue
// y se registran los plugins globales (Pinia, Router e i18n).
const app = createApp(App)

// Registro de la store de Pinia para gestionar estado global.
app.use(createPinia())
// Registro del router para manejar navegación entre vistas.
app.use(router)
// Registro del sistema de traducciones.
app.use(i18n)

// Montaje final en el elemento raíz del DOM.
app.mount('#app')
