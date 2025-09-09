<template>
  <teleport to="body">
    <div v-if="modelValue" class="modal-backdrop" @click.self="cancel">
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="git-modal-title"
        ref="modalRef"
      >
        <h2 id="git-modal-title">{{ t.git.modal.title }}</h2>
        <form @submit.prevent="uploadToGit">
          <section class="form-section">
            <div class="form-group">
              <label for="git-token">{{ t.git.fields.token }}</label>
              <input
                id="git-token"
                type="password"
                v-model="form.token"
                :ref="firstInput"
                required
                :placeholder="t.git.fields.tokenPlaceholder"
              />
              <small class="field-hint">{{ t.git.fields.tokenHint }}</small>
            </div>
            
            <div class="form-group">
              <label for="git-repo">{{ t.git.fields.repository }}</label>
              <input
                id="git-repo"
                type="url"
                v-model="form.repository"
                required
                :placeholder="t.git.fields.repositoryPlaceholder"
              />
              <small class="field-hint">{{ t.git.fields.repositoryHint }}</small>
            </div>
            
            <div class="form-group">
              <label for="git-branch">{{ t.git.fields.branch }}</label>
              <input
                id="git-branch"
                type="text"
                v-model="form.branch"
                :placeholder="t.git.fields.branchPlaceholder"
              />
              <small class="field-hint">{{ t.git.fields.branchHint }}</small>
            </div>
            
            <div class="form-group">
              <label for="commit-message">{{ t.git.fields.commitMessage }}</label>
              <textarea
                id="commit-message"
                v-model="form.commitMessage"
                rows="3"
                :placeholder="t.git.fields.commitPlaceholder"
              ></textarea>
            </div>
          </section>
          
          <section class="form-section">
            <h3>{{ t.git.fields.filesToUpload }}</h3>
            <div class="file-selection">
              <label class="checkbox-item">
                <input type="checkbox" v-model="form.files.personal" />
                <span>personal.json</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="form.files.projects" />
                <span>projects.json</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="form.files.experience" />
                <span>experience.json</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="form.files.education" />
                <span>education.json</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="form.files.certifications" />
                <span>certifications.json</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="form.files.technicalSkills" />
                <span>technicalSkills.json</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="form.files.tools" />
                <span>tools.json</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="form.files.softSkills" />
                <span>softSkills.json</span>
              </label>
            </div>
            <button type="button" class="btn btn-secondary" @click="selectAll">
              {{ allSelected ? t.git.fields.deselectAll : t.git.fields.selectAll }}
            </button>
          </section>

          <div class="upload-status" v-if="uploadStatus">
            <div :class="['status-message', statusType]">
              <span>{{ uploadStatus }}</span>
              <div v-if="statusType === 'loading'" class="spinner"></div>
            </div>
          </div>

          <div class="buttons">
            <button type="button" class="btn btn-secondary" @click="cancel" :disabled="isUploading">
              {{ t.git.modal.cancel }}
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isUploading || !hasSelectedFiles">
              {{ isUploading ? t.git.modal.uploading : t.git.modal.upload }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
// Importaciones de Vue y utilidades reactivas
import { reactive, ref, watch, nextTick, computed } from 'vue'
import { storeToRefs } from 'pinia'

// Importación del store principal para traducciones
import { useMainStore } from '../../stores/main'

// Importación de todos los stores de datos del portafolio
import {
  useProjectsStore,
  useExperienceStore,
  useCertificationStore,
  useTechnicalSkillsStore,
  useToolStore,
  useSoftSkillStore,
  useContactStore,
  useEducationStore
} from '../../stores'

// Definición de props y eventos del componente
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

// Inicialización del store principal para obtener las traducciones
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)

// Inicialización de todos los stores de datos
const projectsStore = useProjectsStore()
const experienceStore = useExperienceStore()
const certificationStore = useCertificationStore()
const technicalStore = useTechnicalSkillsStore()
const toolStore = useToolStore()
const softStore = useSoftSkillStore()
const contactStore = useContactStore()
const educationStore = useEducationStore()

// Referencias reactivas para el manejo del modal
const modalRef = ref<HTMLElement | null>(null)           // Referencia al modal para navegación por teclado
const firstInput = ref<HTMLInputElement | null>(null)    // Referencia al primer input para enfoque automático
const isUploading = ref(false)                          // Estado de subida en progreso
const uploadStatus = ref('')                            // Mensaje de estado actual
const statusType = ref<'success' | 'error' | 'loading' | ''>('')  // Tipo de estado para estilizado

// Definición de la interfaz para el formulario de Git
interface GitForm {
  token: string           // Token de acceso personal de GitHub
  repository: string      // URL del repositorio de GitHub
  branch: string         // Rama donde subir los cambios
  commitMessage: string  // Mensaje del commit
  files: {               // Archivos JSON a subir (seleccionables)
    personal: boolean
    projects: boolean
    experience: boolean
    education: boolean
    certifications: boolean
    technicalSkills: boolean
    tools: boolean
    softSkills: boolean
  }
}

// Formulario reactivo con valores por defecto
const form = reactive<GitForm>({
  token: '',                                                      // Token vacío por seguridad
  repository: '',                                                // URL del repo a completar por el usuario
  branch: 'main',                                               // Rama por defecto
  commitMessage: 'feat: update portfolio data from admin panel', // Mensaje descriptivo por defecto
  files: {                                                      // Todos los archivos seleccionados por defecto
    personal: true,
    projects: true,
    experience: true,
    education: true,
    certifications: true,
    technicalSkills: true,
    tools: true,
    softSkills: true
  }
})

// Computed para verificar si hay archivos seleccionados
const hasSelectedFiles = computed(() => {
  return Object.values(form.files).some(selected => selected)
})

// Computed para verificar si todos los archivos están seleccionados
const allSelected = computed(() => {
  return Object.values(form.files).every(selected => selected)
})

// Función para resetear el formulario a su estado inicial
const resetForm = () => {
  form.token = ''                                                      // Limpiar token por seguridad
  form.repository = ''                                                // Limpiar URL del repositorio
  form.branch = 'main'                                               // Volver a rama por defecto
  form.commitMessage = 'feat: update portfolio data from admin panel' // Mensaje por defecto
  
  // Seleccionar todos los archivos por defecto
  Object.keys(form.files).forEach(key => {
    form.files[key as keyof typeof form.files] = true
  })
  
  // Limpiar estados de subida
  uploadStatus.value = ''
  statusType.value = ''
  isUploading.value = false
}

// Watcher para manejar la apertura/cierre del modal
watch(
  () => props.modelValue,
  val => {
    if (val) {
      // Al abrir el modal:
      resetForm()                                      // Resetear formulario
      nextTick(() => firstInput.value?.focus())       // Enfocar primer input
      window.addEventListener('keydown', handleKey)    // Escuchar teclas (Escape, Tab)
      document.body.style.overflow = 'hidden'         // Prevenir scroll en el fondo
    } else {
      // Al cerrar el modal:
      window.removeEventListener('keydown', handleKey) // Quitar listener de teclas
      document.body.style.overflow = ''               // Restaurar scroll
    }
  }
)

// Manejador de eventos de teclado
const handleKey = (e: KeyboardEvent) => {
  // Cerrar modal con Escape (solo si no está subiendo)
  if (e.key === 'Escape' && !isUploading.value) cancel()
  // Mantener el foco dentro del modal con Tab
  trapFocus(e)
}

// Función para mantener el foco dentro del modal (accesibilidad)
const trapFocus = (e: KeyboardEvent) => {
  // Solo procesar si es Tab y el modal existe
  if (e.key !== 'Tab' || !modalRef.value) return
  
  // Obtener todos los elementos enfocables dentro del modal
  const focusables = modalRef.value.querySelectorAll<HTMLElement>(
    'input, textarea, button, select, a[href], [tabindex]:not([tabindex="-1"])'
  )
  const first = focusables[0]                    // Primer elemento enfocable
  const last = focusables[focusables.length - 1] // Último elemento enfocable
  
  if (e.shiftKey) {
    // Tab + Shift: navegación hacia atrás
    if (document.activeElement === first) {
      e.preventDefault()
      ;(last as HTMLElement).focus() // Ir al último elemento
    }
  } else {
    // Tab normal: navegación hacia adelante
    if (document.activeElement === last) {
      e.preventDefault()
      ;(first as HTMLElement).focus() // Ir al primer elemento
    }
  }
}

// Función para cancelar y cerrar el modal
const cancel = () => {
  // Solo permitir cerrar si no hay una subida en progreso
  if (!isUploading.value) {
    emit('update:modelValue', false)
  }
}

// Función para seleccionar/deseleccionar todos los archivos
const selectAll = () => {
  // Si todos están seleccionados, deseleccionar; sino, seleccionar todos
  const shouldSelect = !allSelected.value
  Object.keys(form.files).forEach(key => {
    form.files[key as keyof typeof form.files] = shouldSelect
  })
}

// Función para generar los archivos de datos desde los stores
const generateDataFiles = () => {
  const files: { [key: string]: any } = {}
  
  // Solo incluir archivos que estén seleccionados en el formulario
  if (form.files.personal) {
    files['personal.json'] = {
      contact: contactStore.getContact  // Datos de contacto personal
    }
  }
  
  if (form.files.projects) {
    files['projects.json'] = projectsStore.getProjects  // Proyectos del portafolio
  }
  
  if (form.files.experience) {
    files['experience.json'] = experienceStore.all      // Experiencia laboral
  }
  
  if (form.files.education) {
    files['education.json'] = educationStore.getEducation  // Educación académica
  }
  
  if (form.files.certifications) {
    files['certifications.json'] = certificationStore.all  // Certificaciones
  }
  
  if (form.files.technicalSkills) {
    files['technicalSkills.json'] = technicalStore.all     // Habilidades técnicas
  }
  
  if (form.files.tools) {
    files['tools.json'] = toolStore.all                    // Herramientas/tecnologías
  }
  
  if (form.files.softSkills) {
    files['softSkills.json'] = softStore.all               // Habilidades blandas
  }
  
  return files
}

// Función utilitaria para descargar datos como archivo JSON (no se usa actualmente)
const downloadAsJSON = (filename: string, data: any) => {
  // Crear un blob con el contenido JSON formateado
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)  // Crear URL temporal
  
  // Crear enlace temporal para descarga
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  
  // Ejecutar descarga
  document.body.appendChild(link)
  link.click()
  
  // Limpiar recursos
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Función principal para subir archivos a GitHub usando su API
const uploadToGit = async () => {
  // Validar que hay archivos seleccionados
  if (!hasSelectedFiles.value) return
  
  // Activar estado de carga
  isUploading.value = true
  uploadStatus.value = t.value.git.status.preparing
  statusType.value = 'loading'
  
  try {
    // 1. Recopilar datos actuales de todos los stores
    const dataFiles = generateDataFiles()
    
    // 2. Extraer información del repositorio desde la URL proporcionada
    const repoMatch = form.repository.match(/github\.com\/([^\/]+)\/([^\/]+)/)
    if (!repoMatch) {
      throw new Error('Invalid GitHub repository URL format')
    }
    
    const [, owner, repo] = repoMatch          // Destructuring: owner y nombre del repo
    const repoName = repo.replace(/\.git$/, '') // Remover extensión .git si existe
    
    uploadStatus.value = 'Obteniendo información del repositorio...'
    
    // 3. Obtener el SHA del commit actual de la rama especificada
    const branchResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/git/refs/heads/${form.branch}`,
      {
        headers: {
          'Authorization': `Bearer ${form.token}`,        // Token de autenticación
          'Accept': 'application/vnd.github.v3+json',     // Versión de API preferida
          'X-GitHub-Api-Version': '2022-11-28'            // Versión específica de la API
        }
      }
    )
    
    if (!branchResponse.ok) {
      throw new Error(`Error getting branch info: ${branchResponse.statusText}`)
    }
    
    const branchData = await branchResponse.json()
    const baseSha = branchData.object.sha  // SHA del commit actual (base para el nuevo commit)
    
    // 4. Obtener el árbol de archivos actual del repositorio
    const treeResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/git/trees/${baseSha}`,
      {
        headers: {
          'Authorization': `Bearer ${form.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }
    )
    
    if (!treeResponse.ok) {
      throw new Error(`Error getting tree: ${treeResponse.statusText}`)
    }
    
    const treeData = await treeResponse.json()  // Árbol con todos los archivos del repositorio
    
    uploadStatus.value = 'Preparando archivos para subir...'
    
    // 5. Crear blobs (objetos de archivo) para cada archivo de datos
    const blobs = []
    for (const [filename, data] of Object.entries(dataFiles)) {
      const content = JSON.stringify(data, null, 2)  // Convertir datos a JSON formateado
      
      // Crear blob en GitHub para el contenido del archivo
      const blobResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}/git/blobs`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${form.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // Codificar contenido en base64 para envío seguro
            content: btoa(unescape(encodeURIComponent(content))),
            encoding: 'base64'
          })
        }
      )
      
      if (!blobResponse.ok) {
        throw new Error(`Error creating blob for ${filename}: ${blobResponse.statusText}`)
      }
      
      const blobData = await blobResponse.json()
      // Agregar información del blob para incluir en el nuevo árbol
      blobs.push({
        path: `src/data/${filename}`, // Ubicación del archivo en el repositorio
        mode: '100644',              // Permisos de archivo (lectura/escritura para owner)
        type: 'blob',                // Tipo de objeto Git
        sha: blobData.sha            // Identificador único del contenido
      })
    }
    
    uploadStatus.value = 'Creando nuevo árbol...'
    
    // 6. Crear nuevo árbol de archivos con los archivos actualizados
    const newTreeItems = [...treeData.tree]  // Copiar árbol actual
    
    // Actualizar archivos existentes o agregar nuevos
    blobs.forEach(blob => {
      const existingIndex = newTreeItems.findIndex(item => item.path === blob.path)
      if (existingIndex >= 0) {
        // Archivo existe: reemplazar con nueva versión
        newTreeItems[existingIndex] = blob
      } else {
        // Archivo nuevo: agregar al árbol
        newTreeItems.push(blob)
      }
    })
    
    // Crear el nuevo árbol en GitHub
    const newTreeResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/git/trees`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${form.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tree: newTreeItems  // Enviar todos los elementos del árbol
        })
      }
    )
    
    if (!newTreeResponse.ok) {
      throw new Error(`Error creating tree: ${newTreeResponse.statusText}`)
    }
    
    const newTreeData = await newTreeResponse.json()  // Obtener SHA del nuevo árbol
    
    uploadStatus.value = 'Creando commit...'
    
    // 7. Crear nuevo commit con el árbol actualizado
    const commitResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/git/commits`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${form.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: form.commitMessage,  // Mensaje personalizado del commit
          tree: newTreeData.sha,        // SHA del nuevo árbol creado
          parents: [baseSha]            // Commit padre (el commit actual de la rama)
        })
      }
    )
    
    if (!commitResponse.ok) {
      throw new Error(`Error creating commit: ${commitResponse.statusText}`)
    }
    
    const commitData = await commitResponse.json()  // Obtener SHA del nuevo commit
    
    uploadStatus.value = 'Actualizando rama...'
    
    // 8. Actualizar la referencia de la rama para apuntar al nuevo commit
    const updateRefResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/git/refs/heads/${form.branch}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${form.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sha: commitData.sha  // SHA del nuevo commit creado
        })
      }
    )
    
    if (!updateRefResponse.ok) {
      throw new Error(`Error updating branch: ${updateRefResponse.statusText}`)
    }
    
    // ¡Éxito! Mostrar mensaje de confirmación
    uploadStatus.value = t.value.git.status.success
    statusType.value = 'success'
    
    // Cerrar modal automáticamente después de 3 segundos
    setTimeout(() => {
      emit('update:modelValue', false)
    }, 3000)
    
  } catch (error) {
    // Manejar errores: mostrar mensaje detallado
    uploadStatus.value = `${t.value.git.status.error}: ${error.message}`
    statusType.value = 'error'
    console.error('Git upload failed:', error)
  } finally {
    // Siempre ejecutar: restablecer estado de carga
    isUploading.value = false
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: var(--overlay-bg);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
  z-index: var(--z-overlay);
}

.modal {
  position: relative;
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: var(--spacing-2xl);
  border-radius: var(--border-radius-lg);
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-md);
  border: 1px solid color-mix(in srgb, var(--primary-color), transparent 90%);
  transition: all var(--transition-normal);
  z-index: var(--z-modal);
}

.form-section {
  margin-bottom: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-md);
}

.form-group label {
  margin-bottom: var(--spacing-xs);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid color-mix(in srgb, var(--primary-color), transparent 80%);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  font-family: inherit;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-color), transparent 90%);
}

.field-hint {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  font-style: italic;
}

.file-selection {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.checkbox-item:hover {
  background-color: color-mix(in srgb, var(--primary-color), transparent 95%);
}

.checkbox-item input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.upload-status {
  margin: var(--spacing-md) 0;
}

.status-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-weight: var(--font-weight-medium);
}

.status-message.loading {
  background-color: color-mix(in srgb, var(--primary-color), transparent 90%);
  color: var(--primary-color);
}

.status-message.success {
  background-color: color-mix(in srgb, var(--success-color), transparent 90%);
  color: var(--success-color);
}

.status-message.error {
  background-color: color-mix(in srgb, var(--error-color), transparent 90%);
  color: var(--error-color);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid color-mix(in srgb, var(--primary-color), transparent 80%);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  flex-wrap: wrap;
}

.buttons .btn {
  flex: 1 1 auto;
}

.buttons .btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .buttons {
    flex-direction: column;
  }
  .buttons .btn {
    width: 100%;
  }
  .file-selection {
    grid-template-columns: 1fr;
  }
}
</style>