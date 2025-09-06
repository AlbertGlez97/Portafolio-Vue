<template>
  <div class="admin-table-wrapper">
    <div class="table-header">
      <h2 id="experience-heading" class="table-title text-primary">
        {{ t.admin.experience.header }}
      </h2>
      <button
        class="btn btn-primary"
        @click="$emit('create')"
        :aria-label="t.admin.experience.new"
      >
        {{ t.admin.experience.new }}
      </button>
    </div>
    <div class="table-scroll">
      <table class="admin-table" aria-labelledby="experience-heading">
        <thead>
          <tr>
            <th>ID</th>
            <th>{{ t.admin.period }}</th>
            <th>{{ t.admin.roleEs }}</th>
            <th>{{ t.admin.roleEn }}</th>
            <th>{{ t.admin.company }}</th>
            <th>{{ t.admin.current }}</th>
            <th>{{ t.admin.featured }}</th>
            <th class="sticky-col">{{ t.admin.actions }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exp in exps" :key="exp.id">
            <td>{{ exp.id }}</td>
            <td>{{ formatPeriod(exp) }}</td>
            <td>{{ exp.role.es }}</td>
            <td>{{ exp.role.en }}</td>
            <td>{{ exp.company }}</td>
            <td>{{ exp.current ? t.admin.yes : t.admin.no }}</td>
            <td>{{ exp.featured ? t.admin.yes : t.admin.no }}</td>
            <td class="actions sticky-col">
              <button class="btn btn-secondary" @click="$emit('edit', exp.id)">{{ t.admin.edit }}</button>
              <button class="btn btn-secondary" @click="$emit('duplicate', exp.id)">{{ t.admin.duplicate }}</button>
              <button class="btn btn-secondary" @click="$emit('delete', exp.id)">{{ t.admin.delete }}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useExperienceStore, useMainStore } from '../../stores'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['create', 'edit', 'duplicate', 'delete'])
const experienceStore = useExperienceStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)

// Obtiene la lista ordenada directamente del store
const exps = computed(() => experienceStore.getSortedExperiences.value)

const formatPeriod = (exp: any) => {
  const end = exp.current || !exp.end ? t.value.admin.present : exp.end
  return `${exp.start} - ${end}`
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
  gap: var(--spacing-xs);
}
.sticky-col {
  position: sticky;
  right: 0;
  background: var(--bg-primary);
}
</style>
