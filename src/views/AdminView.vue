<template>
  <div class="admin-view">
    <ProjectsTable
      @create="openCreate"
      @edit="openEdit"
      @duplicate="openDuplicate"
      @delete="confirmDelete"
    />
    <ProjectModal
      v-model="modalOpen"
      :project="selectedProject"
      :featured="selectedFeatured"
    />
    <ExperienceTable
      @create="openCreateExp"
      @edit="openEditExp"
      @duplicate="openDuplicateExp"
      @delete="confirmDeleteExp"
    />
    <ExperienceModal
      v-model="modalExpOpen"
      :experience="selectedExperience"
    />
    <button class="btn btn-secondary logout" @click="handleLogout">
      {{ t.actions.signOut }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useProjectsStore, useMainStore, useExperienceStore } from '../stores'
import ProjectsTable from '../components/admin/ProjectsTable.vue'
import ProjectModal from '../components/admin/ProjectModal.vue'
import ExperienceTable from '../components/admin/ExperienceTable.vue'
import ExperienceModal from '../components/admin/ExperienceModal.vue'
import type { Project, Experience } from '../interfaces'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const router = useRouter()
const projectsStore = useProjectsStore()
const experienceStore = useExperienceStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)

const modalOpen = ref(false)
const selectedProject = ref<Project | null>(null)
const selectedFeatured = ref(false)

const modalExpOpen = ref(false)
const selectedExperience = ref<Experience | null>(null)

const handleLogout = () => {
  auth.logout()
  router.push('/')
}

const openCreate = () => {
  selectedProject.value = null
  selectedFeatured.value = false
  modalOpen.value = true
}

const openEdit = (id: number) => {
  const project = projectsStore.getProjectById(id)
  if (project) {
    selectedProject.value = project
    selectedFeatured.value = projectsStore.isFeatured(id)
    modalOpen.value = true
  }
}

const openDuplicate = (id: number) => {
  const project = projectsStore.duplicateProject(id)
  if (project) {
    selectedProject.value = project
    selectedFeatured.value = projectsStore.isFeatured(id)
    modalOpen.value = true
  }
}

const confirmDelete = (id: number) => {
  if (window.confirm(t.value.admin.confirmDelete)) {
    projectsStore.removeProject(id)
  }
}

const openCreateExp = () => {
  selectedExperience.value = null
  modalExpOpen.value = true
}

const openEditExp = (id: number) => {
  const exp = experienceStore.getExperienceById(id)
  if (exp) {
    selectedExperience.value = exp
    modalExpOpen.value = true
  }
}

const openDuplicateExp = (id: number) => {
  const exp = experienceStore.duplicateExperience(id)
  if (exp) {
    selectedExperience.value = exp
    modalExpOpen.value = true
  }
}

const confirmDeleteExp = (id: number) => {
  if (window.confirm(t.value.admin.confirmDelete)) {
    experienceStore.removeExperience(id)
  }
}

const handleShortcut = (e: KeyboardEvent) => {
  if (e.altKey && (e.key === 'n' || e.key === 'N')) {
    e.preventDefault()
    openCreate()
  }
}

onMounted(() => window.addEventListener('keydown', handleShortcut))
onBeforeUnmount(() => window.removeEventListener('keydown', handleShortcut))
</script>

<style scoped>
.admin-view {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}
.logout {
  align-self: flex-end;
}
</style>
