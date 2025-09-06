<template>
  <div class="admin-table-wrapper">
    <div class="table-header">
      <h2 id="soft-heading" class="table-title text-primary">
        {{ t.admin.softSkills.header }}
      </h2>
      <button class="btn btn-primary" @click="$emit('create')">
        {{ t.admin.softSkills.new }}
      </button>
    </div>
    <div class="table-scroll">
      <table class="admin-table" aria-labelledby="soft-heading">
        <thead>
          <tr>
            <th>ID</th>
            <th>{{ t.admin.titleEs }}</th>
            <th class="sticky-col">{{ t.admin.actions }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="skill in rows" :key="skill.id">
            <td>{{ skill.id }}</td>
            <td>{{ skill.name.es }}</td>
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
import { useSoftSkillStore, useMainStore } from '../../stores'

const emit = defineEmits(['create','edit','duplicate','delete'])
const softStore = useSoftSkillStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)
const { sorted } = storeToRefs(softStore)

const rows = sorted

onMounted(async () => { await softStore.ensureLoaded() })
</script>

<style scoped>
</style>
