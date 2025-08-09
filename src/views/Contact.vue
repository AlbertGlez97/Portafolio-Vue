<template>
  <main class="contact">
    <div class="container">
      <!-- Hero Section -->
      <section class="contact-hero section">
        <div class="hero-content animate-fadeInUp">
          <h1 class="section-title">{{ t.contact.title }}</h1>
          <p class="hero-subtitle">{{ t.contact.subtitle }}</p>
        </div>
      </section>

      <!-- Contact Form & Info -->
      <section class="contact-content section">
        <div class="contact-grid">
          <!-- Contact Information -->
          <div class="contact-info animate-fadeInLeft">
            <h2>{{ t.contact.info }}</h2>
            <div class="info-items">
              <div class="info-item">
                <div class="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <h3>{{ t.contact.details.email }}</h3>
                  <p>albert.gonzalez@email.com</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <h3>{{ t.contact.details.phone }}</h3>
                  <p>+52 (555) 123-4567</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <h3>{{ t.contact.details.location }}</h3>
                  <p>{{ t.footer.location }}</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <h3>{{ t.contact.details.linkedin }}</h3>
                  <p>linkedin.com/in/albertglez97</p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="social-links">
              <h3>{{ t.contact.follow }}</h3>
              <div class="social-buttons">
                <a 
                  href="https://www.linkedin.com/in/albertglez97" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-btn linkedin"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/albertglez97" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-btn github"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-container animate-fadeInRight">
            <form @submit.prevent="handleSubmit" class="contact-form">
              <h2>{{ t.contact.form.title }}</h2>
              
              <div class="form-group">
                <label for="name">{{ t.contact.form.name }} *</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name"
                  :class="{ error: errors.name }"
                  required
                >
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>

              <div class="form-group">
                <label for="email">{{ t.contact.form.email }} *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email"
                  :class="{ error: errors.email }"
                  required
                >
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>

              <div class="form-group">
                <label for="subject">{{ t.contact.form.subject }} *</label>
                <input 
                  type="text" 
                  id="subject" 
                  v-model="form.subject"
                  :class="{ error: errors.subject }"
                  required
                >
                <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
              </div>

              <div class="form-group">
                <label for="message">{{ t.contact.form.message }} *</label>
                <textarea 
                  id="message" 
                  v-model="form.message"
                  :class="{ error: errors.message }"
                  rows="6"
                  required
                ></textarea>
                <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary submit-btn"
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
                  </svg>
                  {{ t.contact.form.send }}
                </span>
                <span v-else>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="loading">
                    <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                  </svg>
                  {{ t.contact.form.sending }}
                </span>
              </button>

              <!-- Success/Error Messages -->
              <div v-if="submitMessage" class="submit-message" :class="submitStatus">
                <svg v-if="submitStatus === 'success'" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                </svg>
                {{ submitMessage }}
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="cta-section section">
        <div class="cta-content animate-fadeInUp">
          <h2>{{ t.contact.cta.title }}</h2>
          <p>{{ t.contact.cta.description }}</p>
          <div class="cta-actions">
            <a 
              href="/CV_Albert_Gonzalez.pdf" 
              download 
              class="btn btn-secondary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              {{ t.contact.cta.downloadCV }}
            </a>
            <a
              href="https://www.linkedin.com/in/albertglez97"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              {{ t.contact.cta.connectLinkedIn }}
            </a>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useMainStore } from '../stores/main'
import { storeToRefs } from 'pinia'

const store = useMainStore()
const { t } = storeToRefs(store)

// Form data
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Form validation
const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Form state
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref<'success' | 'error'>('success')

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateForm = (): boolean => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  let isValid = true

  // Name validation
  if (!form.name.trim()) {
    errors.name = t.value.contact.form.errors.nameRequired
    isValid = false
  } else if (form.name.trim().length < 2) {
    errors.name = t.value.contact.form.errors.nameMin
    isValid = false
  }

  // Email validation
  if (!form.email.trim()) {
    errors.email = t.value.contact.form.errors.emailRequired
    isValid = false
  } else if (!validateEmail(form.email)) {
    errors.email = t.value.contact.form.errors.emailInvalid
    isValid = false
  }

  // Subject validation
  if (!form.subject.trim()) {
    errors.subject = t.value.contact.form.errors.subjectRequired
    isValid = false
  } else if (form.subject.trim().length < 5) {
    errors.subject = t.value.contact.form.errors.subjectMin
    isValid = false
  }

  // Message validation
  if (!form.message.trim()) {
    errors.message = t.value.contact.form.errors.messageRequired
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = t.value.contact.form.errors.messageMin
    isValid = false
  }

  return isValid
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  submitMessage.value = ''

  try {
    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate success
    submitStatus.value = 'success'
    submitMessage.value = t.value.contact.form.success
    
    // Reset form
    Object.keys(form).forEach(key => {
      form[key as keyof typeof form] = ''
    })
    
  } catch (error) {
    submitStatus.value = 'error'
    submitMessage.value = t.value.contact.form.error
  } finally {
    isSubmitting.value = false
    
    // Clear message after 5 seconds
    setTimeout(() => {
      submitMessage.value = ''
    }, 5000)
  }
}
</script>

<style scoped>
.contact {
  padding-top: 70px;
}

.contact-hero {
  background: linear-gradient(135deg, 
    rgba(76, 175, 80, 0.05) 0%, 
    rgba(255, 193, 7, 0.05) 100%);
  text-align: center;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-secondary);
  margin-top: var(--spacing-md);
}

.contact-content {
  background-color: var(--bg-primary);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: start;
}

.contact-info {
  background-color: var(--bg-secondary);
  padding: var(--spacing-2xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.contact-info h2 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-2xl);
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
}

.info-item:hover {
  transform: translateX(5px);
  box-shadow: var(--shadow-sm);
}

.info-icon {
  color: var(--primary-color);
  flex-shrink: 0;
  margin-top: var(--spacing-xs);
}

.info-content h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.info-content p {
  color: var(--text-secondary);
  margin: 0;
}

.social-links h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
}

.social-buttons {
  display: flex;
  gap: var(--spacing-md);
}

.social-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.social-btn.linkedin {
  background-color: #0077b5;
  color: white;
}

.social-btn.linkedin:hover {
  background-color: #005885;
  transform: translateY(-2px);
}

.social-btn.github {
  background-color: #333;
  color: white;
}

.social-btn.github:hover {
  background-color: #000;
  transform: translateY(-2px);
}

.contact-form-container {
  background-color: var(--bg-primary);
  padding: var(--spacing-2xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.contact-form h2 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-2xl);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid rgba(76, 175, 80, 0.2);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  font-family: inherit;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.form-group input.error,
.form-group textarea.error {
  border-color: var(--danger-color);
}

.error-message {
  display: block;
  color: var(--danger-color);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
}

.submit-btn {
  width: 100%;
  margin-top: var(--spacing-md);
  position: relative;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.submit-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-weight: var(--font-weight-medium);
}

.submit-message.success {
  background-color: rgba(76, 175, 80, 0.1);
  color: var(--primary-dark);
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.submit-message.error {
  background-color: rgba(244, 67, 54, 0.1);
  color: var(--danger-color);
  border: 1px solid rgba(244, 67, 54, 0.3);
}

.cta-section {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: var(--text-white);
  text-align: center;
}

.cta-content h2 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
  color: var(--text-white);
}

.cta-content p {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xl);
  color: rgba(255, 255, 255, 0.9);
}

.cta-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.cta-actions .btn {
  min-width: 180px;
}

.cta-actions .btn-secondary {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-white);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.cta-actions .btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

.cta-actions .btn-primary {
  background-color: var(--text-white);
  color: var(--primary-color);
}

.cta-actions .btn-primary:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .contact-info,
  .contact-form-container {
    padding: var(--spacing-xl);
  }

  .social-buttons {
    flex-direction: column;
  }

  .social-btn {
    justify-content: center;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .cta-actions .btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .contact-info,
  .contact-form-container {
    padding: var(--spacing-lg);
  }

  .info-items {
    gap: var(--spacing-md);
  }

  .info-item {
    padding: var(--spacing-sm);
  }

  .cta-content h2 {
    font-size: var(--font-size-2xl);
  }

  .cta-content p {
    font-size: var(--font-size-base);
  }
}
</style>
