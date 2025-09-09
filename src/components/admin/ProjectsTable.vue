<template>
  <div class="admin-table-wrapper">
    <div class="table-header">
      <h2 id="projects-heading" class="table-title text-primary">
        {{ t.admin.projects.header }}
      </h2>
      <button
        class="btn btn-primary"
        @click="$emit('create')"
        :aria-label="t.admin.projects.newAria"
        :title="t.admin.projects.newHint"
        accesskey="n"
      >
        {{ t.admin.projects.new }}
      </button>
    </div>
    <div class="table-scroll">
      <table class="admin-table" aria-labelledby="projects-heading">
        <thead>
          <tr>
            <th @click="toggleSort('id')">ID</th>
            <th @click="toggleSort('title')">{{ t.admin.title }}</th>
            <th>{{ t.admin.company }}</th>
            <th>{{ t.admin.featured }}</th>
            <th>{{ t.admin.tech }}</th>
            <th class="sticky-col">{{ t.admin.actions }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in sortedProjects" :key="project.id">
            <td>{{ project.id }}</td>
            <td>{{ project.title[lang] ?? project.title.es }}</td>
            <td>{{ project.company || '-' }}</td>
            <td>{{ isFeatured(project.id) ? t.admin.yes : t.admin.no }}</td>
            <td>{{ project.technologies.join(', ') }}</td>
            <td class="actions sticky-col">
              <ActionMenu
                :actions="getActionsForProject(project.id)"
                @action="handleAction($event, project.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProjectsStore, useMainStore } from '../../stores'
import { storeToRefs } from 'pinia'
import ActionMenu from './ActionMenu.vue'

const emit = defineEmits(['create', 'edit', 'duplicate', 'delete'])
const projectsStore = useProjectsStore()
const mainStore = useMainStore()
const { t, currentLanguage } = storeToRefs(mainStore)
const lang = currentLanguage

const sortKey = ref<'id' | 'title'>('id')
const sortAsc = ref(true)

const projects = computed(() => projectsStore.getAllProjects)

const sortedProjects = computed(() => {
  return [...projects.value].sort((a, b) => {
    if (sortKey.value === 'title') {
      const aTitle = (a.title[lang.value] ?? a.title.es).toLowerCase()
      const bTitle = (b.title[lang.value] ?? b.title.es).toLowerCase()
      return sortAsc.value
        ? aTitle.localeCompare(bTitle)
        : bTitle.localeCompare(aTitle)
    }
    return sortAsc.value ? a.id - b.id : b.id - a.id
  })
})

const toggleSort = (key: 'id' | 'title') => {
  if (sortKey.value === key) sortAsc.value = !sortAsc.value
  else {
    sortKey.value = key
    sortAsc.value = true
  }
}

const isFeatured = (id: number) => projectsStore.isFeatured(id)

// Generar acciones disponibles para cada proyecto
const getActionsForProject = (projectId: number) => [
  { key: 'edit', label: t.value.admin.edit, icon: '✏️' },
  { key: 'duplicate', label: t.value.admin.duplicate, icon: '📋' },
  { key: 'delete', label: t.value.admin.delete, icon: '🗑️' }
]

// Manejar acción seleccionada
const handleAction = (actionKey: string, projectId: number) => {
  switch (actionKey) {
    case 'edit':
      emit('edit', projectId)
      break
    case 'duplicate':
      emit('duplicate', projectId)
      break
    case 'delete':
      emit('delete', projectId)
      break
  }
}
</script>

<style scoped>
.admin-table-wrapper {
  display: flex;
  flex-direction: column;
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}
.table-title {
  margin: 0;
  font-size: var(--font-size-lg);
}
.table-scroll {
  overflow-x: auto;
}
.admin-table {
  border-collapse: collapse;
  width: 100%;
  min-width: 900px;
}
.admin-table th,
.admin-table td {
  padding: var(--spacing-sm);
  border: 1px solid color-mix(in srgb, var(--primary-color), transparent 80%);
  background: var(--bg-primary);
  color: var(--text-primary);
  white-space: nowrap;
}
.admin-table th {
  position: sticky;
  top: 0;
  background: var(--bg-secondary);
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-xs);
}
.sticky-col {
  position: sticky;
  right: 0;
  background: var(--bg-primary);
  width: 200px; /* Más ancho para desktop */
  min-width: 200px;
}

/* Ajustes para desktop */
@media (min-width: 769px) {
  .actions {
    gap: var(--spacing-xs);
  }
}

/* Ajustes para móvil */
@media (max-width: 768px) {
  .admin-table {
    min-width: 600px; /* Reducir ancho mínimo */
  }
  
  .sticky-col {
    width: 50px;
    min-width: 50px;
  }
  
  .actions {
    padding: var(--spacing-xs);
  }
}
</style>
