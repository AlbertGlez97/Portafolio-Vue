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
              <th>{{ t.admin.titleEs }}</th>
              <th>{{ t.admin.provider }}</th>
              <th>{{ t.admin.icon }}</th>
              <th class="sticky-col">{{ t.admin.actions }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="cert in rows" :key="cert.id">
              <td>{{ cert.id }}</td>
              <td>{{ cert.title.es }}</td>
              <td>{{ cert.provider }}</td>
              <td>{{ cert.icon }}</td>
              <td class="actions sticky-col">
                <button class="btn btn-secondary" @click="$emit('edit', cert.id)">{{ t.admin.edit }}</button>
                <button class="btn btn-secondary" @click="$emit('duplicate', cert.id)">{{ t.admin.duplicate }}</button>
                <button class="btn btn-secondary" @click="$emit('delete', cert.id)">{{ t.admin.delete }}</button>
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

const emit = defineEmits(['create', 'edit', 'duplicate', 'delete'])
const certificationStore = useCertificationStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)
const { publicList } = storeToRefs(certificationStore)

const rows = publicList

onMounted(async () => {
  await certificationStore.ensureLoaded()
})
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
