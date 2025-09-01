<template>
  <main class="not-found">
    <div class="container">
      <!-- Sección de Error 404 -->
      <section class="error-section section">
        <div class="error-content animate-fadeInUp">
          <!-- Número de error grande -->
          <div class="error-number">404</div>
          
          <!-- Mensaje principal -->
          <h1 class="error-title">{{ t.notFound.title }}</h1>
          <p class="error-description">{{ t.notFound.description }}</p>
          
          <!-- Botones de acción -->
          <div class="error-actions">
            <router-link to="/" class="btn btn-primary">
              <i class="icon-home"></i>
              {{ t.notFound.goHome }}
            </router-link>
            
            <button @click="goBack" class="btn btn-secondary">
              <i class="icon-arrow-left"></i>
              {{ t.notFound.goBack }}
            </button>
          </div>
          
          <!-- Enlaces útiles -->
          <div class="useful-links">
            <h3>{{ t.notFound.usefulLinks }}</h3>
            <div class="links-grid">
              <router-link to="/sobre-mi" class="link-card">
                <i class="icon-user"></i>
                <span>{{ t.nav.about }}</span>
              </router-link>
              
              <router-link to="/proyectos" class="link-card">
                <i class="icon-folder"></i>
                <span>{{ t.nav.projects }}</span>
              </router-link>

              <router-link to="/habilidades" class="link-card">
                <i class="icon-code"></i>
                <span>{{ t.nav.skills }}</span>
              </router-link>
              
              <router-link to="/contacto" class="link-card">
                <i class="icon-mail"></i>
                <span>{{ t.nav.contact }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
// Importaciones necesarias
import { storeToRefs } from 'pinia'
import { useMainStore } from '../stores/main'
import { useRouter } from 'vue-router'
// Inicialización de stores y router
const mainStore = useMainStore() // store principal con traducciones
const router = useRouter() // instancia para navegar programáticamente

// Extracción de datos reactivos
const { t } = storeToRefs(mainStore)

// Función para volver atrás
const goBack = () => {
  // Si hay historial, volver atrás, sino ir al inicio
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
/* Estilos principales de la página 404 */
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 70px; /* Espacio para el header fijo */
}

/* Sección de error */
.error-section {
  text-align: center;
  padding: var(--spacing-xl) 0;
}

/* Contenido del error */
.error-content {
  max-width: 600px;
  margin: 0 auto;
}

/* Número de error grande */
.error-number {
  font-size: 8rem;
  font-weight: 900;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: var(--spacing-md);
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Título del error */
.error-title {
  font-size: var(--font-size-3xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-weight: 700;
}

/* Descripción del error */
.error-description {
  font-size: var(--font-size-xl);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
}

/* Contenedor de acciones */
.error-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

/* Estilos de botones */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-base);
}

/* Botón primario */
.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: white;
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Botón secundario */
.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* Enlaces útiles */
.useful-links {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--border-color);
}

.useful-links h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-xl);
}

/* Grid de enlaces */
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-md);
  max-width: 400px;
  margin: 0 auto;
}

/* Tarjetas de enlaces */
.link-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.link-card:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.link-card i {
  font-size: 1.5rem;
}

.link-card span {
  font-weight: 500;
  font-size: var(--font-size-sm);
}

/* Iconos (usando pseudo-elementos como placeholder) */
.icon-home::before { content: '🏠'; }
.icon-arrow-left::before { content: '←'; }
.icon-user::before { content: '👤'; }
.icon-folder::before { content: '📁'; }
.icon-mail::before { content: '✉️'; }
.icon-code::before { content: '💻'; }

/* Responsive */
@media (max-width: 768px) {
  .error-number {
    font-size: 6rem;
  }
  
  .error-title {
    font-size: var(--font-size-2xl);
  }
  
  .error-description {
    font-size: var(--font-size-lg);
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
  
  .links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .error-number {
    font-size: 4rem;
  }
  
  .error-title {
    font-size: var(--font-size-xl);
  }
  
  .links-grid {
    grid-template-columns: 1fr;
  }
}

/* Animaciones */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}
</style>
