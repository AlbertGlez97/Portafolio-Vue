import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import data from '../data/personal.json'

export interface ContactInfo {
  emails: string[]
  phones?: string[]
  location: { es: string; en: string }
  linkedin: string
  github: string
  otherLinks: Record<string, string>
}

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

export const useContactStore = defineStore('contact', () => {
  const contact = ref<ContactInfo>(adapt(data.contact))

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

  const resetContact = () => {
    contact.value = adapt(data.contact)
  }

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
    resetContact
  }
})

