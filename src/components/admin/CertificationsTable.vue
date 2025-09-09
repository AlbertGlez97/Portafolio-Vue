<template>
  <div class="admin-table-wrapper">
    <div class="table-header">
      <h2 id="certifications-heading" class="table-title text-primary">
        {{ t.admin.certifications.header }}
      </h2>
      <button class="btn btn-primary" @click="$emit('create')">
        {{ t.admin.certifications.new }}
      </button>
    </div>
    <div class="table-scroll">
      <table class="admin-table" aria-labelledby="certifications-heading">
        <thead>
            <tr>
              <th>ID</th>
              <th>{{ t.admin.title }}</th>
              <th>{{ t.admin.description }}</th>
              <th>{{ t.admin.provider }}</th>
              <th>{{ t.admin.icon }}</th>
              <th class="sticky-col">{{ t.admin.actions }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="cert in rows" :key="cert.id">
              <td>{{ cert.id }}</td>
              <td>{{ cert.title[lang] ?? cert.title.es }}</td>
              <td>{{ cert.description[lang] ?? cert.description.es }}</td>
              <td>{{ cert.provider }}</td>
              <td>{{ cert.icon }}</td>
              <td class="actions sticky-col">
                <ActionMenu
                  :actions="getActionsForCertification(cert.id)"
                  @action="handleAction($event, cert.id)"
                />
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCertificationStore, useMainStore } from '../../stores'
import { storeToRefs } from 'pinia'
import ActionMenu from './ActionMenu.vue'

const emit = defineEmits(['create', 'edit', 'duplicate', 'delete'])
const certificationStore = useCertificationStore()
const mainStore = useMainStore()
const { t, currentLanguage } = storeToRefs(mainStore)
const lang = currentLanguage
const { publicList } = storeToRefs(certificationStore)

const rows = publicList

onMounted(async () => {
  await certificationStore.ensureLoaded()
})

// Generar acciones disponibles para cada certificación
const getActionsForCertification = (certId: number) => [
  { key: 'edit', label: t.value.admin.edit, icon: '✏️' },
  { key: 'duplicate', label: t.value.admin.duplicate, icon: '📋' },
  { key: 'delete', label: t.value.admin.delete, icon: '🗑️' }
]

// Manejar acción seleccionada
const handleAction = (actionKey: string, certId: number) => {
  switch (actionKey) {
    case 'edit':
      emit('edit', certId)
      break
    case 'duplicate':
      emit('duplicate', certId)
      break
    case 'delete':
      emit('delete', certId)
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
</style>
