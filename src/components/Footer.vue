<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Logo y descripción -->
        <div class="footer-section">
          <div class="footer-logo">
            <span class="logo-text">Albert González</span>
          </div>
          <p class="footer-description">
            Front-End Developer especializado en Vue.js, TypeScript y tecnologías modernas.
          </p>
          <div class="social-links">
            <a 
              href="https://www.linkedin.com/in/albertglez97" 
              target="_blank" 
              rel="noopener noreferrer"
              class="social-link"
              title="LinkedIn"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://github.com/albertglez97" 
              target="_blank" 
              rel="noopener noreferrer"
              class="social-link"
              title="GitHub"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Enlaces rápidos -->
        <div class="footer-section">
          <h4 class="footer-title">{{ t.nav.home }}</h4>
          <ul class="footer-links">
            <li><router-link to="/" class="footer-link">{{ t.nav.home }}</router-link></li>
            <li><router-link to="/about" class="footer-link">{{ t.nav.about }}</router-link></li>
            <li><router-link to="/experience" class="footer-link">{{ t.nav.experience }}</router-link></li>
            <li><router-link to="/projects" class="footer-link">{{ t.nav.projects }}</router-link></li>
          </ul>
        </div>

        <!-- Información de contacto -->
        <div class="footer-section">
          <h4 class="footer-title">{{ t.contact.title }}</h4>
          <div class="contact-info">
            <p class="contact-item">
              <span class="contact-icon">📧</span>
              <a href="mailto:albert.gonzalez@email.com" class="footer-link">
                albert.gonzalez@email.com
              </a>
            </p>
            <p class="contact-item">
              <span class="contact-icon">📱</span>
              <span>+52 (555) 123-4567</span>
            </p>
            <p class="contact-item">
              <span class="contact-icon">📍</span>
              <span>Ciudad de México, México</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>
            © {{ currentYear }} Albert González. {{ t.footer.rights }}.
          </p>
          <p class="made-with">
            {{ t.footer.madeWith }} 
            <span class="heart">💚</span> 
            {{ t.footer.by }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMainStore } from '../stores/main'
import { storeToRefs } from 'pinia'

const store = useMainStore()
const { t } = storeToRefs(store)

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
  color: var(--text-white);
  padding: var(--spacing-2xl) 0 var(--spacing-lg);
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.footer-logo .logo-text {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  background: linear-gradient(135deg, var(--accent-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
}

.social-links {
  display: flex;
  gap: var(--spacing-sm);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-md);
  color: var(--text-white);
  transition: all var(--transition-fast);
}

.social-link:hover {
  background-color: var(--accent-color);
  color: var(--text-primary);
  transform: translateY(-3px);
}

.footer-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--accent-color);
  margin-bottom: var(--spacing-sm);
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.footer-link {
  color: rgba(255, 255, 255, 0.8);
  transition: color var(--transition-fast);
  padding: var(--spacing-xs) 0;
}

.footer-link:hover {
  color: var(--accent-color);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: rgba(255, 255, 255, 0.8);
}

.contact-icon {
  font-size: var(--font-size-lg);
  width: 24px;
  text-align: center;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: var(--spacing-lg);
}

.footer-copyright {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--font-size-sm);
}

.made-with {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.heart {
  color: var(--accent-color);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .footer {
    padding: var(--spacing-xl) 0 var(--spacing-md);
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    text-align: center;
  }

  .footer-copyright {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-xs);
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-content {
    gap: var(--spacing-md);
  }

  .footer-section {
    gap: var(--spacing-sm);
  }
}
</style>
