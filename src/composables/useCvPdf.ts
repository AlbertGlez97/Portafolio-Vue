/**
 * Composable para generar el CV en PDF usando pdfmake.
 * Produce un PDF con texto vectorial real (no imagen), paginación inteligente
 * y descarga directa. Lee los datos desde los JSON del proyecto.
 */
import { useMainStore } from '../stores/main'
import experience from '../data/experience.json'
import education from '../data/education.json'
import certifications from '../data/certifications.json'
import technicalSkills from '../data/technicalSkills.json'
import personal from '../data/personal.json'

type Lang = 'es' | 'en'

interface ExperienceEntry {
  id: number
  start: string
  end: string | null
  current: boolean
  role: { es: string; en: string }
  company: string
  location: string
  summary: { es: string; en: string }
  technologies: string[]
  featured: boolean
}

interface CertificationEntry {
  id: number
  title: { es: string; en: string }
  provider: string
}

interface TechnicalSkillEntry {
  id: number
  name: { es: string; en: string }
  level: { es: string; en: string }
  percentage: number
  category: string
}

function formatDate(dateStr: string | null, lang: Lang): string {
  if (!dateStr) return lang === 'es' ? 'Presente' : 'Present'
  const [year, month] = dateStr.split('-')
  const months: Record<Lang, string[]> = {
    es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  }
  return `${months[lang][parseInt(month) - 1]} ${year}`
}

function buildDocDefinition(lang: Lang) {
  const t = {
    es: {
      title: 'Desarrollador Full Stack | Frontend Specialist',
      experience: 'Experiencia Profesional',
      education: 'Educación',
      certifications: 'Certificaciones',
      skills: 'Habilidades Técnicas',
      technologies: 'Tecnologías',
      contact: 'Contacto',
      portfolio: 'Portafolio',
    },
    en: {
      title: 'Full Stack Developer | Frontend Specialist',
      experience: 'Professional Experience',
      education: 'Education',
      certifications: 'Certifications',
      skills: 'Technical Skills',
      technologies: 'Technologies',
      contact: 'Contact',
      portfolio: 'Portfolio',
    },
  }[lang]

  const accentColor = '#1a5276'
  const lightGray = '#666666'

  // Header
  const header = [
    { text: 'Juan Alberto González', style: 'name' },
    { text: t.title, style: 'subtitle', margin: [0, 2, 0, 6] as [number, number, number, number] },
    {
      canvas: [{ type: 'line' as const, x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: accentColor }],
      margin: [0, 0, 0, 6] as [number, number, number, number],
    },
    {
      columns: [
        { text: personal.contact.emails[0], fontSize: 9, color: lightGray },
        { text: personal.contact.phones[0], fontSize: 9, color: lightGray, alignment: 'center' as const },
        { text: personal.contact.location[lang], fontSize: 9, color: lightGray, alignment: 'right' as const },
      ],
      margin: [0, 0, 0, 2] as [number, number, number, number],
    },
    {
      columns: [
        { text: 'linkedin.com/in/albertglez97', fontSize: 9, color: accentColor, link: personal.contact.linkedin },
        { text: 'github.com/AlbertGlez97', fontSize: 9, color: accentColor, alignment: 'center' as const, link: personal.contact.github },
        { text: 'portafolioalbertdev.org', fontSize: 9, color: accentColor, alignment: 'right' as const, link: 'https://portafolioalbertdev.org/' },
      ],
      margin: [0, 0, 0, 14] as [number, number, number, number],
    },
  ]

  // Experience section
  const experienceSection = [
    { text: t.experience, style: 'sectionTitle' },
    ...(experience as ExperienceEntry[]).map((job) => ({
      stack: [
        {
          columns: [
            { text: job.role[lang], style: 'jobTitle', width: '*' as const },
            {
              text: `${formatDate(job.start, lang)} – ${formatDate(job.end, lang)}`,
              fontSize: 9,
              color: lightGray,
              alignment: 'right' as const,
              width: 'auto' as const,
            },
          ],
        },
        { text: `${job.company} · ${job.location}`, fontSize: 9, italics: true, color: lightGray, margin: [0, 1, 0, 3] as [number, number, number, number] },
        { text: job.summary[lang], fontSize: 9.5, lineHeight: 1.3, margin: [0, 0, 0, 3] as [number, number, number, number] },
        {
          text: [
            { text: `${t.technologies}: `, bold: true, fontSize: 8.5 },
            { text: job.technologies.join(' · '), fontSize: 8.5, color: accentColor },
          ],
          margin: [0, 0, 0, 10] as [number, number, number, number],
        },
      ],
      unbreakable: true,
    })),
  ]

  // Education section
  const edu = education.academic
  const educationSection = [
    { text: t.education, style: 'sectionTitle' },
    {
      stack: [
        {
          columns: [
            { text: edu.degree[lang], style: 'jobTitle', width: '*' as const },
            { text: edu.period, fontSize: 9, color: lightGray, alignment: 'right' as const, width: 'auto' as const },
          ],
        },
        { text: `${edu.institution} · ${edu.status[lang]}`, fontSize: 9, italics: true, color: lightGray, margin: [0, 1, 0, 3] as [number, number, number, number] },
        { text: edu.description[lang], fontSize: 9.5, lineHeight: 1.3, margin: [0, 0, 0, 10] as [number, number, number, number] },
      ],
      unbreakable: true,
    },
  ]

  // Technical Skills section
  const skillCategories: Record<string, string[]> = {}
  for (const skill of technicalSkills as TechnicalSkillEntry[]) {
    const cat = skill.category
    if (!skillCategories[cat]) skillCategories[cat] = []
    skillCategories[cat].push(skill.name[lang])
  }

  const categoryLabels: Record<string, Record<Lang, string>> = {
    frontend: { es: 'Frontend', en: 'Frontend' },
    backend: { es: 'Backend', en: 'Backend' },
    database: { es: 'Bases de Datos', en: 'Databases' },
    devops: { es: 'DevOps', en: 'DevOps' },
    testing: { es: 'Testing', en: 'Testing' },
    cms: { es: 'CMS', en: 'CMS' },
  }

  const skillsSection = [
    { text: t.skills, style: 'sectionTitle' },
    {
      columns: Object.entries(skillCategories).map(([cat, skills]) => ({
        stack: [
          { text: categoryLabels[cat]?.[lang] ?? cat, bold: true, fontSize: 9.5, margin: [0, 0, 0, 3] as [number, number, number, number] },
          ...skills.map((s) => ({ text: `• ${s}`, fontSize: 9, margin: [0, 1, 0, 0] as [number, number, number, number] })),
        ],
        width: '*' as const,
      })),
      columnGap: 15,
      margin: [0, 0, 0, 10] as [number, number, number, number],
    },
  ]

  // Certifications section — two columns
  const certs = certifications as CertificationEntry[]
  const midpoint = Math.ceil(certs.length / 2)
  const leftCerts = certs.slice(0, midpoint)
  const rightCerts = certs.slice(midpoint)

  const formatCertList = (list: CertificationEntry[]) =>
    list.map((c) => ({
      text: [
        { text: `• ${c.title[lang]}`, fontSize: 9 },
        { text: ` — ${c.provider}`, fontSize: 8.5, color: lightGray },
      ],
      margin: [0, 2, 0, 0] as [number, number, number, number],
    }))

  const certificationsSection = [
    { text: t.certifications, style: 'sectionTitle' },
    {
      columns: [
        { stack: formatCertList(leftCerts), width: '*' as const },
        { stack: formatCertList(rightCerts), width: '*' as const },
      ],
      columnGap: 20,
    },
  ]

  return {
    pageSize: 'LETTER' as const,
    pageMargins: [40, 40, 40, 40] as [number, number, number, number],
    defaultStyle: {
      font: 'Roboto',
      fontSize: 10,
      lineHeight: 1.25,
    },
    styles: {
      name: { fontSize: 22, bold: true, color: '#111111' },
      subtitle: { fontSize: 11, color: lightGray },
      sectionTitle: {
        fontSize: 12,
        bold: true,
        color: accentColor,
        margin: [0, 8, 0, 6] as [number, number, number, number],
        decoration: 'underline' as const,
        decorationColor: '#dddddd',
      },
      jobTitle: { fontSize: 10.5, bold: true, color: '#222222' },
    },
    content: [
      ...header,
      ...experienceSection,
      ...educationSection,
      ...skillsSection,
      ...certificationsSection,
    ],
  }
}

export function useCvPdf() {
  const store = useMainStore()

  async function downloadPdf() {
    // Dynamic import — zero bytes added to initial bundle
    const pdfMakeModule = await import('pdfmake/build/pdfmake')
    const pdfMake = pdfMakeModule.default || pdfMakeModule
    const pdfFontsModule = await import('pdfmake/build/vfs_fonts')
    const pdfFonts = pdfFontsModule.default || pdfFontsModule

    // Register fonts
    if (pdfFonts.pdfMake?.vfs) {
      pdfMake.vfs = pdfFonts.pdfMake.vfs
    } else if (pdfFonts.vfs) {
      pdfMake.vfs = pdfFonts.vfs
    }

    const lang = (store.currentLanguage === 'es' ? 'es' : 'en') as Lang
    const doc = buildDocDefinition(lang)
    pdfMake.createPdf(doc).download(`CV_Juan_Alberto_Gonzalez_${lang.toUpperCase()}.pdf`)
  }

  return { downloadPdf }
}
