<template>
  <teleport to="body">
    <div v-if="modelValue" class="modal-backdrop" @click.self="cancel">
      <div class="modal" role="dialog" aria-modal="true" ref="modalRef">
        <h2>{{ isEdit ? t.admin.tools.modal.titleEdit : t.admin.tools.modal.titleNew }}</h2>
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
            <div class="form-group">
              <label for="category">{{ t.admin.category }}</label>
              <select id="category" v-model="categorySelection">
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                <option value="custom">{{ t.admin.customCategory }}</option>
              </select>
            </div>
            <div v-if="categorySelection === 'custom'" class="form-group">
              <label for="custom">{{ t.admin.customCategory }}</label>
              <input id="custom" v-model="form.category" />
            </div>
            <div class="form-group">
              <label for="level-es">{{ t.admin.levelEs }}</label>
              <input id="level-es" v-model="form.level.es" required />
            </div>
            <div class="form-group">
              <label for="level-en">{{ t.admin.levelEn }}</label>
              <input id="level-en" v-model="form.level.en" required />
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
            <button type="button" class="btn btn-secondary" @click="cancel">{{ t.admin.tools.modal.cancel }}</button>
            <button type="submit" class="btn btn-primary">{{ t.admin.tools.modal.save }}</button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useToolStore, useMainStore } from '../../stores'
import type { ToolEntry } from '../../interfaces'

const props = defineProps<{ modelValue: boolean; tool: ToolEntry | null }>()
const emit = defineEmits(['update:modelValue'])

const toolStore = useToolStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)
const { categories } = storeToRefs(toolStore)

const emptyForm: ToolEntry = {
  id: 0,
  name: { es: '', en: '' },
  level: { es: '', en: '' },
  description: { es: '', en: '' },
  category: ''
}
const form = reactive<ToolEntry>({ ...emptyForm })
const categorySelection = ref('')

const isEdit = computed(() => !!props.tool)

const firstInput = ref<HTMLInputElement | null>(null)

watch(
  () => props.tool,
  val => {
    if (val) {
      Object.assign(form, val)
      categorySelection.value = categories.value.includes(val.category)
        ? val.category
        : 'custom'
    } else {
      Object.assign(form, { ...emptyForm })
      categorySelection.value = ''
    }
  },
  { immediate: true }
)

watch(categorySelection, val => {
  if (val !== 'custom') form.category = val
})

const save = () => {
  if (!form.name.es || !form.name.en) return
  if (categorySelection.value !== 'custom') form.category = categorySelection.value
  if (isEdit.value) toolStore.update(form)
  else toolStore.create({ ...form })
  emit('update:modelValue', false)
  Object.assign(form, { ...emptyForm })
  categorySelection.value = ''
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
