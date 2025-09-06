<template>
  <!-- Pie de página global con enlaces sociales -->
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <h2 class="footer-name">Albert González</h2>
        <!-- Texto traducido obtenido del store -->
        <p class="footer-description">{{ t.footer.description }}</p>
        <div class="social-links">
          <a
            :href="formatLink(contact.linkedin)"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            aria-label="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            :href="formatLink(contact.github)"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-content">
        <p class="copyright">© {{ currentYear }} Albert González. {{ t.footer.rights }}.</p>
        <nav class="footer-nav">
          <!-- Navegación secundaria -->
          <router-link to="/" class="footer-nav-link">{{ t.nav.home }}</router-link>
          <router-link to="/sobre-mi" class="footer-nav-link">{{ t.nav.about }}</router-link>
          <router-link to="/contacto" class="footer-nav-link">{{ t.nav.contact }}</router-link>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMainStore } from '../stores/main'
import { useContactStore } from '../stores/contact'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const contactStore = useContactStore()
const { t } = storeToRefs(mainStore)
const { contact } = storeToRefs(contactStore)
// Año actual mostrado en copyright
const currentYear = computed(() => new Date().getFullYear())

const formatLink = (url: string): string => {
  if (!url) return '#'
  return url.startsWith('http') ? url : `https://${url}`
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
  color: var(--text-white);
  margin-top: auto;
}

.footer-top {
  padding: var(--spacing-lg) 0;
  text-align: center;
}

.footer-name {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  background: linear-gradient(135deg, var(--accent-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  color: rgba(255, 255, 255, 0.8);
  margin-top: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--border-radius-full);
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-white);
  transition: background-color var(--transition-fast), transform var(--transition-fast);
}

.social-link:hover,
.social-link:focus {
  background-color: var(--accent-color);
  color: var(--text-primary);
  transform: translateY(-2px);
  outline: none;
}

.footer-bottom {
  background-color: var(--primary-dark);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--spacing-sm) 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.7);
}

.footer-nav {
  display: flex;
  gap: var(--spacing-md);
}

.footer-nav-link {
  color: rgba(255, 255, 255, 0.8);
  transition: color var(--transition-fast);
}

.footer-nav-link:hover,
.footer-nav-link:focus {
  color: var(--accent-color);
  outline: none;
}

@media (max-width: 768px) {
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-nav {
    justify-content: center;
  }
}
</style>
