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
    <button class="btn btn-secondary logout" @click="handleLogout">
      {{ t.actions.signOut }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useProjectsStore, useMainStore } from '../stores'
import ProjectsTable from '../components/admin/ProjectsTable.vue'
import ProjectModal from '../components/admin/ProjectModal.vue'
import type { Project } from '../interfaces'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const router = useRouter()
const projectsStore = useProjectsStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)

const modalOpen = ref(false)
const selectedProject = ref<Project | null>(null)
const selectedFeatured = ref(false)

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
