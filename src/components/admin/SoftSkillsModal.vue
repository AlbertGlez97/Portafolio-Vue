<template>
  <teleport to="body">
    <div v-if="modelValue" class="modal-backdrop" @click.self="cancel">
      <div class="modal" role="dialog" aria-modal="true" ref="modalRef">
        <h2>{{ isEdit ? t.admin.softSkills.modal.titleEdit : t.admin.softSkills.modal.titleNew }}</h2>
        <form @submit.prevent="save">
          <section class="form-section">
            <div class="form-group">
              <label for="name-es">{{ t.admin.titleEs }}</label>
              <input id="name-es" ref="firstInput" v-model="form.name.es" required />
            </div>
            <div class="form-group">
              <label for="name-en">{{ t.admin.titleEn }}</label>
              <input id="name-en" v-model="form.name.en" required />
            </div>
          </section>
          <section class="form-section">
            <h3>{{ t.admin.descriptionEs }}</h3>
            <div class="form-group">
              <textarea v-model="form.description.es" required />
            </div>
            <h3>{{ t.admin.descriptionEn }}</h3>
            <div class="form-group">
              <textarea v-model="form.description.en" required />
            </div>
          </section>
          <div class="buttons">
            <button type="button" class="btn btn-secondary" @click="cancel">{{ t.admin.softSkills.modal.cancel }}</button>
            <button type="submit" class="btn btn-primary">{{ t.admin.softSkills.modal.save }}</button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useSoftSkillStore, useMainStore } from '../../stores'
import type { SoftSkillEntry } from '../../interfaces'

const props = defineProps<{ modelValue: boolean; skill: SoftSkillEntry | null }>()
const emit = defineEmits(['update:modelValue'])

const softStore = useSoftSkillStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)

const emptyForm: SoftSkillEntry = {
  id: 0,
  name: { es: '', en: '' },
  description: { es: '', en: '' }
}
const form = reactive<SoftSkillEntry>({ ...emptyForm })

const isEdit = computed(() => !!props.skill)
const firstInput = ref<HTMLInputElement | null>(null)

watch(
  () => props.skill,
  val => {
    if (val) Object.assign(form, val)
    else Object.assign(form, { ...emptyForm })
  },
  { immediate: true }
)

const save = () => {
  if (!form.name.es || !form.name.en) return
  if (isEdit.value) softStore.update(form)
  else softStore.create({ ...form })
  emit('update:modelValue', false)
  Object.assign(form, { ...emptyForm })
}

const cancel = () => emit('update:modelValue', false)

watch(
  () => props.modelValue,
  async val => {
    if (val) {
      await nextTick()
      firstInput.value?.focus()
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  flex-wrap: wrap;
}
.buttons .btn {
  flex: 1 1 auto;
}
</style>
