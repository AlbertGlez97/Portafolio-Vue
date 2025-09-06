import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import data from '../data/personal.json'

export interface ContactInfo {
  email: string
  phone: string
  location: { es: string; en: string }
  linkedin: string
  github: string
  otherLinks?: Record<string, string>
}

const STORAGE_KEY = 'contactInfo'

const load = (): ContactInfo => {
  if (typeof window === 'undefined') return data.contact as ContactInfo
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as ContactInfo
  } catch {
    /* ignore */
  }
  return data.contact as ContactInfo
}

export const useContactStore = defineStore('contact', () => {
  const contact = ref<ContactInfo>(load())

  const getContact = computed(() => contact.value)
  const getEmail = computed(() => contact.value.email)
  const getPhone = computed(() => contact.value.phone)
  const getLocation = computed(() => contact.value.location)
  const getLinkedin = computed(() => contact.value.linkedin)
  const getGithub = computed(() => contact.value.github)

  const updateContact = (newContact: ContactInfo) => {
    contact.value = { ...newContact }
  }

  const saveContact = () => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contact.value))
    } catch {
      /* ignore */
    }
  }

  const resetContact = () => {
    contact.value = load()
    saveContact()
  }

  watch(contact, saveContact, { deep: true })

  return {
    contact,
    getContact,
    getEmail,
    getPhone,
    getLocation,
    getLinkedin,
    getGithub,
    updateContact,
    saveContact,
    resetContact
  }
})

