<template>
  <div class="admin-table-wrapper">
    <div class="table-header">
      <h2 id="tech-heading" class="table-title text-primary">
        {{ t.admin.technicalSkills.header }}
      </h2>
      <button class="btn btn-primary" @click="$emit('create')">
        {{ t.admin.technicalSkills.new }}
      </button>
    </div>
    <div class="table-scroll">
      <table class="admin-table" aria-labelledby="tech-heading">
        <thead>
          <tr>
            <th>ID</th>
            <th>{{ t.admin.titleEs }}</th>
            <th>{{ t.admin.category }}</th>
            <th>{{ t.admin.levelEs }}</th>
            <th>{{ t.admin.percentage }}</th>
            <th>{{ t.admin.type }}</th>
            <th class="sticky-col">{{ t.admin.actions }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="skill in rows" :key="skill.id">
            <td>{{ skill.id }}</td>
            <td>{{ skill.name.es }}</td>
            <td>{{ skill.category }}</td>
            <td>{{ skill.level.es }}</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: skill.percentage + '%' }" />
              </div>
            </td>
            <td>{{ skill.type === 'custom' ? skill.customCategory : skill.type || '-' }}</td>
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
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTechnicalSkillsStore, useMainStore } from '../../stores'

const emit = defineEmits(['create', 'edit', 'duplicate', 'delete'])
const technicalStore = useTechnicalSkillsStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)
const { sortedByCategory } = storeToRefs(technicalStore)

const rows = sortedByCategory

onMounted(async () => {
  await technicalStore.ensureLoaded()
})
</script>

<style scoped>
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
