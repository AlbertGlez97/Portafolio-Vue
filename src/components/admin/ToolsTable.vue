<template>
  <div class="admin-table-wrapper">
    <div class="table-header">
      <h2 id="tools-heading" class="table-title text-primary">
        {{ t.admin.tools.header }}
      </h2>
      <button class="btn btn-primary" @click="$emit('create')">
        {{ t.admin.tools.new }}
      </button>
    </div>
    <div class="table-scroll">
      <table class="admin-table" aria-labelledby="tools-heading">
        <thead>
          <tr>
            <th>ID</th>
            <th>{{ t.admin.titleEs }}</th>
            <th>{{ t.admin.category }}</th>
            <th>{{ t.admin.levelEs }}</th>
            <th class="sticky-col">{{ t.admin.actions }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tool in rows" :key="tool.id">
            <td>{{ tool.id }}</td>
            <td>{{ tool.name.es }}</td>
            <td>{{ tool.category }}</td>
            <td>{{ tool.level.es }}</td>
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
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useToolStore, useMainStore } from '../../stores'

const emit = defineEmits(['create', 'edit', 'duplicate', 'delete'])
const toolStore = useToolStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)
const { sortedByCategory } = storeToRefs(toolStore)

const rows = sortedByCategory

onMounted(async () => {
  await toolStore.ensureLoaded()
})
</script>

<style scoped>
</style>
