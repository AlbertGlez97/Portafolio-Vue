<template>
  <div class="admin-table-wrapper">
    <div class="table-header">
      <h2 id="tools-heading" class="table-title text-primary">
        {{ t.admin.tools.header }}
      </h2>
      <button
        class="btn btn-primary"
        @click="$emit('create')"
        :aria-label="t.admin.tools.new"
        :title="t.admin.tools.new"
        accesskey="n"
      >
        {{ t.admin.tools.new }}
      </button>
    </div>
    <div class="table-scroll">
      <table class="admin-table" aria-labelledby="tools-heading">
        <thead>
          <tr>
            <th @click="toggleSort('id')">ID</th>
            <th @click="toggleSort('name')">{{ t.admin.name }}</th>
            <th>{{ t.admin.category }}</th>
            <th>{{ t.admin.level }}</th>
            <th class="sticky-col">{{ t.admin.actions }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tool in rows" :key="tool.id">
            <td>{{ tool.id }}</td>
            <td>{{ tool.name[lang] ?? tool.name.es }}</td>
            <td>{{ tool.category }}</td>
            <td>{{ tool.level[lang] ?? tool.level.es }}</td>
            <td class="actions sticky-col">
              <button class="btn btn-secondary" @click="$emit('edit', tool.id)">{{ t.admin.edit }}</button>
              <button class="btn btn-secondary" @click="$emit('duplicate', tool.id)">{{ t.admin.duplicate }}</button>
              <button class="btn btn-secondary" @click="$emit('delete', tool.id)">{{ t.admin.delete }}</button>
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
import { useToolStore, useMainStore } from '../../stores'

const emit = defineEmits(['create', 'edit', 'duplicate', 'delete'])
const toolStore = useToolStore()
const mainStore = useMainStore()
const { t, currentLanguage } = storeToRefs(mainStore)
const lang = currentLanguage
const { items } = storeToRefs(toolStore)

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
  await toolStore.ensureLoaded()
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
