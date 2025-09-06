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
    <CertificationsTable
      @create="openCreateCert"
      @edit="openEditCert"
      @duplicate="openDuplicateCert"
      @delete="confirmDeleteCert"
    />
    <CertificationModal
      v-model="modalCertOpen"
      :certification="selectedCertification"
    />
    <TechnicalSkillsTable
      @create="openCreateTech"
      @edit="openEditTech"
      @duplicate="openDuplicateTech"
      @delete="confirmDeleteTech"
    />
    <TechnicalSkillsModal
      v-model="modalTechOpen"
      :skill="selectedTechSkill"
    />
    <ToolsTable
      @create="openCreateTool"
      @edit="openEditTool"
      @duplicate="openDuplicateTool"
      @delete="confirmDeleteTool"
    />
    <ToolsModal v-model="modalToolOpen" :tool="selectedTool" />
    <SoftSkillsTable
      @create="openCreateSoft"
      @edit="openEditSoft"
      @duplicate="openDuplicateSoft"
      @delete="confirmDeleteSoft"
    />
    <SoftSkillsModal v-model="modalSoftOpen" :skill="selectedSoftSkill" />
    <button class="btn btn-secondary logout" @click="handleLogout">
      {{ t.actions.signOut }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import {
  useProjectsStore,
  useMainStore,
  useExperienceStore,
  useCertificationStore,
  useTechnicalSkillsStore,
  useToolStore,
  useSoftSkillStore
} from '../stores'
import ProjectsTable from '../components/admin/ProjectsTable.vue'
import ProjectModal from '../components/admin/ProjectModal.vue'
import ExperienceTable from '../components/admin/ExperienceTable.vue'
import ExperienceModal from '../components/admin/ExperienceModal.vue'
import CertificationsTable from '../components/admin/CertificationsTable.vue'
import CertificationModal from '../components/admin/CertificationModal.vue'
import TechnicalSkillsTable from '../components/admin/TechnicalSkillsTable.vue'
import TechnicalSkillsModal from '../components/admin/TechnicalSkillsModal.vue'
import ToolsTable from '../components/admin/ToolsTable.vue'
import ToolsModal from '../components/admin/ToolsModal.vue'
import SoftSkillsTable from '../components/admin/SoftSkillsTable.vue'
import SoftSkillsModal from '../components/admin/SoftSkillsModal.vue'
import type {
  Project,
  Experience,
  Certification,
  TechnicalSkill,
  ToolEntry,
  SoftSkillEntry
} from '../interfaces'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const router = useRouter()
const projectsStore = useProjectsStore()
const experienceStore = useExperienceStore()
const certificationStore = useCertificationStore()
const technicalStore = useTechnicalSkillsStore()
const toolStore = useToolStore()
const softStore = useSoftSkillStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)

const modalOpen = ref(false)
const selectedProject = ref<Project | null>(null)
const selectedFeatured = ref(false)

const modalExpOpen = ref(false)
const selectedExperience = ref<Experience | null>(null)

const modalCertOpen = ref(false)
const selectedCertification = ref<Certification | null>(null)

const modalTechOpen = ref(false)
const selectedTechSkill = ref<TechnicalSkill | null>(null)

const modalToolOpen = ref(false)
const selectedTool = ref<ToolEntry | null>(null)

const modalSoftOpen = ref(false)
const selectedSoftSkill = ref<SoftSkillEntry | null>(null)

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
  const newId = experienceStore.duplicate(id)
  if (newId !== undefined) {
    const exp = experienceStore.getExperienceById(newId)
    selectedExperience.value = exp || null
    modalExpOpen.value = true
  }
}

const confirmDeleteExp = (id: number) => {
  if (window.confirm(t.value.admin.confirmDelete)) {
    experienceStore.remove(id)
  }
}

const openCreateCert = () => {
  selectedCertification.value = null
  modalCertOpen.value = true
}

const openEditCert = (id: number) => {
  const cert = certificationStore.getCertificationById(id)
  if (cert) {
    selectedCertification.value = cert
    modalCertOpen.value = true
  }
}

const openDuplicateCert = (id: number) => {
  const newId = certificationStore.duplicate(id)
  if (newId !== undefined) {
    const cert = certificationStore.getCertificationById(newId)
    selectedCertification.value = cert || null
    modalCertOpen.value = true
  }
}

const confirmDeleteCert = (id: number) => {
  if (window.confirm(t.value.admin.confirmDelete)) {
    certificationStore.remove(id)
  }
}

const openCreateTech = () => {
  selectedTechSkill.value = null
  modalTechOpen.value = true
}
const openEditTech = (id: number) => {
  const skill = technicalStore.getById(id)
  if (skill) {
    selectedTechSkill.value = skill
    modalTechOpen.value = true
  }
}
const openDuplicateTech = (id: number) => {
  const newId = technicalStore.duplicate(id)
  if (newId !== undefined) {
    selectedTechSkill.value = technicalStore.getById(newId) || null
    modalTechOpen.value = true
  }
}
const confirmDeleteTech = (id: number) => {
  if (window.confirm(t.value.admin.confirmDelete)) {
    technicalStore.remove(id)
  }
}

const openCreateTool = () => {
  selectedTool.value = null
  modalToolOpen.value = true
}
const openEditTool = (id: number) => {
  const tool = toolStore.getById(id)
  if (tool) {
    selectedTool.value = tool
    modalToolOpen.value = true
  }
}
const openDuplicateTool = (id: number) => {
  const newId = toolStore.duplicate(id)
  if (newId !== undefined) {
    selectedTool.value = toolStore.getById(newId) || null
    modalToolOpen.value = true
  }
}
const confirmDeleteTool = (id: number) => {
  if (window.confirm(t.value.admin.confirmDelete)) {
    toolStore.remove(id)
  }
}

const openCreateSoft = () => {
  selectedSoftSkill.value = null
  modalSoftOpen.value = true
}
const openEditSoft = (id: number) => {
  const skill = softStore.getById(id)
  if (skill) {
    selectedSoftSkill.value = skill
    modalSoftOpen.value = true
  }
}
const openDuplicateSoft = (id: number) => {
  const newId = softStore.duplicate(id)
  if (newId !== undefined) {
    selectedSoftSkill.value = softStore.getById(newId) || null
    modalSoftOpen.value = true
  }
}
const confirmDeleteSoft = (id: number) => {
  if (window.confirm(t.value.admin.confirmDelete)) {
    softStore.remove(id)
  }
}

const handleShortcut = (e: KeyboardEvent) => {
  if (e.altKey && (e.key === 'n' || e.key === 'N')) {
    e.preventDefault()
    openCreate()
  }
}

onMounted(async () => {
  await experienceStore.ensureLoaded()
  await certificationStore.ensureLoaded()
  await technicalStore.ensureLoaded()
  await toolStore.ensureLoaded()
  await softStore.ensureLoaded()
  window.addEventListener('keydown', handleShortcut)
})
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
