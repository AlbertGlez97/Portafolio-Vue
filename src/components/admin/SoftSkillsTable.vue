<template>
  <div class="admin-table-wrapper">
    <div class="table-header">
      <h2 id="soft-heading" class="table-title text-primary">
        {{ t.admin.softSkills.header }}
      </h2>
      <button
        class="btn btn-primary"
        @click="$emit('create')"
        :aria-label="t.admin.softSkills.new"
        :title="t.admin.softSkills.new"
        accesskey="n"
      >
        {{ t.admin.softSkills.new }}
      </button>
    </div>
    <div class="table-scroll">
      <table class="admin-table" aria-labelledby="soft-heading">
        <thead>
          <tr>
            <th @click="toggleSort('id')">ID</th>
            <th @click="toggleSort('name')">{{ t.admin.name }}</th>
            <th class="sticky-col">{{ t.admin.actions }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="skill in rows" :key="skill.id">
            <td>{{ skill.id }}</td>
            <td>{{ skill.name[lang] ?? skill.name.es }}</td>
            <td class="actions sticky-col">
              <button class="btn btn-secondary" @click="$emit('edit', skill.id)">{{ t.admin.edit }}</button>
              <button class="btn btn-secondary" @click="$emit('duplicate', skill.id)">{{ t.admin.duplicate }}</button>
              <button class="btn btn-secondary" @click="$emit('delete', skill.id)">{{ t.admin.delete }}</button>
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
import { useSoftSkillStore, useMainStore } from '../../stores'

const emit = defineEmits(['create', 'edit', 'duplicate', 'delete'])
const softStore = useSoftSkillStore()
const mainStore = useMainStore()
const { t, currentLanguage } = storeToRefs(mainStore)
const lang = currentLanguage
const { items } = storeToRefs(softStore)

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
  await softStore.ensureLoaded()
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
