/**
 * CV Data Loader
 * Carga datos JSON para las diferentes secciones del CV
 */

/**
 * Clase para manejar la carga de datos del CV
 */
class CVDataLoader {
    constructor(language = 'es') {
        this.language = language;
        this.baseUrl = '../dataInformation';
        this.cache = new Map();
    }

    /**
     * Carga datos de una sección específica
     * @param {string} section - Nombre de la sección (experience, education, etc.)
     * @returns {Promise<Object>} Datos de la sección
     */
    async loadSection(section) {
        const cacheKey = `${section}-${this.language}`;

        // Verificar cache
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const url = `${this.baseUrl}/${section}/data-${this.language}.json`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to load ${section} data: ${response.status}`);
            }

            const data = await response.json();

            // Guardar en cache
            this.cache.set(cacheKey, data);

            return data;
        } catch (error) {
            console.error(`Error loading ${section} data:`, error);
            return this.getFallbackData(section);
        }
    }

    /**
     * Carga múltiples secciones
     * @param {Array<string>} sections - Array de nombres de secciones
     * @returns {Promise<Object>} Objeto con todas las secciones cargadas
     */
    async loadMultipleSections(sections) {
        const promises = sections.map(section =>
            this.loadSection(section).then(data => ({ [section]: data }))
        );

        const results = await Promise.all(promises);
        return Object.assign({}, ...results);
    }

    /**
     * Carga todos los datos del CV
     * @returns {Promise<Object>} Todos los datos del CV
     */
    async loadAllData() {
        const sections = ['personal', 'objective', 'experience', 'education', 'skills', 'projects', 'certifications'];
        return await this.loadMultipleSections(sections);
    }

    /**
     * Cambia el idioma y limpia el cache
     * @param {string} newLanguage - Nuevo idioma ('es' o 'en')
     */
    setLanguage(newLanguage) {
        if (newLanguage !== this.language) {
            this.language = newLanguage;
            this.cache.clear();
        }
    }

    /**
     * Datos de fallback en caso de error
     * @param {string} section - Sección que falló
     * @returns {Object} Datos básicos de fallback
     */
    getFallbackData(section) {
        const fallbacks = {
            personal: {
                name: "Juan Alberto González",
                title: this.language === 'es' ? 'Desarrollador Full Stack' : 'Full Stack Developer',
                contact: {
                    email: "albert.gonzalez0297@gmail.com",
                    phone: "+52 (553) 104-9130",
                    linkedin: this.language === 'es' ? 'LinkedIn: www.linkedin.com/in/albertglez97' : 'LinkedIn: www.linkedin.com/in/albertglez97',
                    github: this.language === 'es' ? 'GitHub: https://github.com/AlbertGlez97' : 'GitHub: https://github.com/AlbertGlez97',
                    portfolio: this.language === 'es' ? 'Portafolio: https://portafolioalbertdev.org/' : 'Portfolio: https://portafolioalbertdev.org/',
                    location: this.language === 'es' ? 'Ciudad de México, México' : 'Mexico City, Mexico'
                }
            },
            objective: {
                title: this.language === 'es' ? 'Objetivo' : 'Objective',
                content: this.language === 'es'
                    ? 'Información no disponible temporalmente.'
                    : 'Information temporarily unavailable.'
            },
            experience: {
                title: this.language === 'es' ? 'Experiencia' : 'Experience',
                experiences: []
            },
            education: {
                title: this.language === 'es' ? 'Educación' : 'Education',
                education: []
            },
            skills: {
                title: this.language === 'es' ? 'Habilidades Técnicas' : 'Technical Skills',
                skills: []
            },
            projects: {
                title: this.language === 'es' ? 'Proyectos Destacados' : 'Featured Projects',
                projects: []
            },
            certifications: {
                title: this.language === 'es' ? 'Certificaciones' : 'Certifications',
                certifications: []
            }
        };

        return fallbacks[section] || { title: 'Error', content: 'Data not available' };
    }

    /**
     * Limpia el cache
     */
    clearCache() {
        this.cache.clear();
    }
}

// Exponer la clase globalmente
window.CVDataLoader = CVDataLoader;