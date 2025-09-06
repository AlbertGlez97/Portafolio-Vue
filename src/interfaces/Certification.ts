import { MultiLanguageText } from './Personal'

export interface Certification {
  id: number
  title: MultiLanguageText
  provider: string
  /**
   * Icon name used on the public education page.
   * Required along with id, title, provider and description for the certification
   * to be displayed correctly.
   */
  icon: string
  description: MultiLanguageText

  // Optional fields reserved for admin usage only
  start?: string
  end?: string
  current?: boolean
  skills?: string[]
  link?: string
  featured?: boolean
  updatedAt?: string

}

export type CertificationsData = Certification[]
