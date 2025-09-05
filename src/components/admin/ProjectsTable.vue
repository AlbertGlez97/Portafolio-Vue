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
            <th @click="toggleSort('title')">{{ t.admin.titleEs }}</th>
            <th>{{ t.admin.titleEn }}</th>
            <th>{{ t.admin.company }}</th>
            <th>{{ t.admin.featured }}</th>
            <th>{{ t.admin.tech }}</th>
            <th class="sticky-col">{{ t.admin.actions }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in sortedProjects" :key="project.id">
            <td>{{ project.id }}</td>
            <td>{{ project.title.es }}</td>
            <td>{{ project.title.en }}</td>
            <td>{{ project.company || '-' }}</td>
            <td>{{ isFeatured(project.id) ? t.admin.yes : t.admin.no }}</td>
            <td>{{ project.technologies.join(', ') }}</td>
            <td class="actions sticky-col">
              <button class="btn btn-secondary" @click="$emit('edit', project.id)">{{ t.admin.edit }}</button>
              <button class="btn btn-secondary" @click="$emit('duplicate', project.id)">{{ t.admin.duplicate }}</button>
              <button class="btn btn-secondary" @click="$emit('delete', project.id)">{{ t.admin.delete }}</button>
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

const emit = defineEmits(['create', 'edit', 'duplicate', 'delete'])
const projectsStore = useProjectsStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)

const sortKey = ref<'id' | 'title'>('id')
const sortAsc = ref(true)

const projects = computed(() => projectsStore.getAllProjects)

const sortedProjects = computed(() => {
  return [...projects.value].sort((a, b) => {
    if (sortKey.value === 'title') {
      const aTitle = a.title.es.toLowerCase()
      const bTitle = b.title.es.toLowerCase()
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
  gap: var(--spacing-xs);
}
.sticky-col {
  position: sticky;
  right: 0;
  background: var(--bg-primary);
}
</style>
