<template>
  <div class="admin-table-wrapper">
    <div class="table-header">
      <h2 id="tech-heading" class="table-title text-primary">
        {{ t.admin.technicalSkills.header }}
      </h2>
      <button
        class="btn btn-primary"
        @click="$emit('create')"
        :aria-label="t.admin.technicalSkills.new"
        :title="t.admin.technicalSkills.new"
        accesskey="n"
      >
        {{ t.admin.technicalSkills.new }}
      </button>
    </div>
    <div class="table-scroll">
      <table class="admin-table" aria-labelledby="tech-heading">
        <thead>
          <tr>
            <th @click="toggleSort('id')">ID</th>
            <th @click="toggleSort('name')">{{ t.admin.name }}</th>
            <th>{{ t.admin.category }}</th>
            <th>{{ t.admin.level }}</th>
            <th>{{ t.admin.percentage }}</th>
            <th>{{ t.admin.type }}</th>
            <th class="sticky-col">{{ t.admin.actions }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="skill in rows" :key="skill.id">
            <td>{{ skill.id }}</td>
            <td>{{ skill.name[lang] ?? skill.name.es }}</td>
            <td>{{ skill.category }}</td>
            <td>{{ skill.level[lang] ?? skill.level.es }}</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: skill.percentage + '%' }" />
              </div>
            </td>
            <td>{{ skill.type === 'custom' ? skill.customCategory : skill.type || '-' }}</td>
            <td class="actions sticky-col">
              <ActionMenu
                :actions="getActionsForSkill(skill.id)"
                @action="handleAction($event, skill.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTechnicalSkillsStore, useMainStore } from '../../stores'
import ActionMenu from './ActionMenu.vue'

const emit = defineEmits(['create', 'edit', 'duplicate', 'delete'])
const technicalStore = useTechnicalSkillsStore()
const mainStore = useMainStore()
const { t, currentLanguage } = storeToRefs(mainStore)
const lang = currentLanguage
const { items } = storeToRefs(technicalStore)

const sortKey = ref<'id' | 'name'>('id')
const sortAsc = ref(true)

const rows = computed(() => {
  return [...items.value].sort((a, b) => {
    if (sortKey.value === 'name') {
      const aName = (a.name[lang.value] ?? a.name.es).toLowerCase()
      const bName = (b.name[lang.value] ?? b.name.es).toLowerCase()
      return sortAsc.value
        ? aName.localeCompare(bName)
        : bName.localeCompare(aName)
    }
    return sortAsc.value ? a.id - b.id : b.id - a.id
  })
})

const toggleSort = (key: 'id' | 'name') => {
  if (sortKey.value === key) sortAsc.value = !sortAsc.value
  else {
    sortKey.value = key
    sortAsc.value = true
  }
}

onMounted(async () => {
  await technicalStore.ensureLoaded()
})

// Generar acciones disponibles para cada habilidad
const getActionsForSkill = (skillId: number) => [
  { key: 'edit', label: t.value.admin.edit, icon: '✏️' },
  { key: 'duplicate', label: t.value.admin.duplicate, icon: '📋' },
  { key: 'delete', label: t.value.admin.delete, icon: '🗑️' }
]

// Manejar acción seleccionada
const handleAction = (actionKey: string, skillId: number) => {
  switch (actionKey) {
    case 'edit':
      emit('edit', skillId)
      break
    case 'duplicate':
      emit('duplicate', skillId)
      break
    case 'delete':
      emit('delete', skillId)
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
  z-index: 100;
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
  width: 200px;
  min-width: 200px;
  z-index: 50;
}

/* Z-index más alto para header sticky en columna de acciones */
.admin-table th.sticky-col {
  z-index: 150;
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
    min-width: 600px;
  }
  
  .sticky-col {
    width: 50px;
    min-width: 50px;
  }
  
  .actions {
    padding: var(--spacing-xs);
  }
}
.progress-bar {
  height: 8px;
  width: 100px;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-full);
}
.progress-fill {
  height: 100%;
  background: var(--primary-color);
  border-radius: var(--border-radius-full);
}
</style>
