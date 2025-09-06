import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import data from '../data/personal.json'

export interface ContactInfo {
  emails: string[]
  phones?: string[]
  location: { es: string; en: string }
  linkedin: string
  github: string
  otherLinks: Record<string, string>
}

const STORAGE_KEY = 'contactInfo'

const adapt = (raw: any): ContactInfo => {
  const emails = Array.isArray(raw.emails)
    ? raw.emails
    : raw.email
    ? [raw.email]
    : []
  const phones = Array.isArray(raw.phones)
    ? raw.phones
    : raw.phone
    ? [raw.phone]
    : []
  return {
    emails,
    phones: phones.length ? phones : undefined,
    location: raw.location || { es: '', en: '' },
    linkedin: raw.linkedin || '',
    github: raw.github || '',
    otherLinks: raw.otherLinks || {}
  }
}

const load = (): ContactInfo => {
  if (typeof window === 'undefined') return adapt(data.contact)
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return adapt(JSON.parse(raw))
  } catch {
    /* ignore */
  }
  return adapt(data.contact)
}

export const useContactStore = defineStore('contact', () => {
  const contact = ref<ContactInfo>(load())

  const getContact = computed(() => contact.value)
  const getEmails = computed(() => contact.value.emails)
  const getPhones = computed(() => contact.value.phones)
  const getLocation = computed(() => contact.value.location)
  const getLinkedin = computed(() => contact.value.linkedin)
  const getGithub = computed(() => contact.value.github)
  const getOtherLinks = computed(() => contact.value.otherLinks)

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
    getEmails,
    getPhones,
    getLocation,
    getLinkedin,
    getGithub,
    getOtherLinks,
    updateContact,
    saveContact,
    resetContact
  }
})

