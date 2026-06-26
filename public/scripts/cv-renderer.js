/**
 * CV Renderer
 * Renderiza dinámicamente las secciones del CV usando datos JSON
 */

/**
 * Clase para renderizar el contenido del CV
 */
class CVRenderer {
    constructor(language = 'es') {
        this.language = language;
        this.dataLoader = new CVDataLoader(language);
    }

    /**
     * Renderiza la sección de objetivo
     * @param {Object} data - Datos del objetivo
     * @returns {string} HTML de la sección
     */
    renderObjective(data) {
        return `
            <section>
                <h2 class="section-title">${data.title}</h2>
                <p class="objective">${data.content}</p>
            </section>
        `;
    }

    /**
     * Renderiza la sección de experiencia
     * @param {Object} data - Datos de experiencia
     * @returns {string} HTML de la sección
     */
    renderExperience(data) {
        const experiencesHtml = data.experiences.map(exp => `
            <div class="entry">
                <div class="entry-header">
                    <h3 class="entry-title">${exp.position}</h3>
                    <span class="entry-date">${exp.startDate} – ${exp.endDate}</span>
                </div>
                <p class="entry-subtitle">${exp.company}, ${exp.location}</p>
                <div class="entry-description">
                    <ul>
                        ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');

        return `
            <section>
                <h2 class="section-title">${data.title}</h2>
                ${experiencesHtml}
            </section>
        `;
    }

    /**
     * Renderiza la sección de educación
     * @param {Object} data - Datos de educación
     * @returns {string} HTML de la sección
     */
    renderEducation(data) {
        const educationHtml = data.education.map(edu => `
            <div class="entry">
                <div class="entry-header">
                    <h3 class="entry-title">${edu.degree}</h3>
                    <span class="entry-date">${edu.startDate} – ${edu.endDate}</span>
                </div>
                <p class="entry-subtitle">${edu.institution}, ${edu.location}</p>
            </div>
        `).join('');

        return `
            <section>
                <h2 class="section-title">${data.title}</h2>
                ${educationHtml}
            </section>
        `;
    }

    /**
     * Renderiza la sección de habilidades
     * @param {Object} data - Datos de habilidades
     * @returns {string} HTML de la sección
     */
    renderSkills(data) {
        // Aplanar todas las habilidades en una sola lista
        const allSkills = data.skills.reduce((acc, category) => {
            return acc.concat(category.items);
        }, []);

        const skillsHtml = allSkills.map(skill => `<li>${skill}</li>`).join('');

        return `
            <section>
                <h2 class="section-title">${data.title}</h2>
                <ul class="skills-list">
                    ${skillsHtml}
                </ul>
            </section>
        `;
    }

    /**
     * Renderiza la sección de proyectos
     * @param {Object} data - Datos de proyectos
     * @returns {string} HTML de la sección
     */
    renderProjects(data) {
        const highlightsLabel = this.language === 'es' ? 'Aspectos destacados:' : 'Key highlights:';
        const technologiesLabel = this.language === 'es' ? 'Tecnologías:' : 'Technologies:';

        const projectsHtml = data.projects.map(project => `
            <div class="entry">
                <div class="entry-header">
                    <h3 class="entry-title">${project.name}</h3>
                    <span class="entry-date">${project.type}</span>
                </div>
                ${project.company ? `<p class="entry-subtitle">${project.company}</p>` : ''}
                ${project.url ? `<p class="entry-subtitle">URL: ${project.url}</p>` : ''}
                <div class="entry-description">
                    <p>${project.description}</p>
                    ${project.highlights ? `
                        <p><strong>${highlightsLabel}</strong></p>
                        <ul>
                            ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${project.technologies ? `
                        <p><strong>${technologiesLabel}</strong> ${project.technologies.join(', ')}</p>
                    ` : ''}
                </div>
            </div>
        `).join('');

        return `
            <section>
                <h2 class="section-title">${data.title}</h2>
                ${projectsHtml}
            </section>
        `;
    }

    /**
     * Renderiza la sección de certificaciones
     * @param {Object} data - Datos de certificaciones
     * @returns {string} HTML de la sección
     */
    renderCertifications(data) {
        const certificationsHtml = data.certifications.map(cert => `
            <div class="entry">
                <div class="entry-header">
                    <h3 class="entry-title">${cert.name}</h3>
                </div>
                <p class="entry-subtitle">${cert.issuer}</p>
            </div>
        `).join('');

        return `
            <section>
                <h2 class="section-title">${data.title}</h2>
                <div class="certifications-grid">
                    ${certificationsHtml}
                </div>
            </section>
        `;
    }

    /**
     * Renderiza el contenido del header del CV
     * @param {Object} data - Datos personales
     * @returns {string} HTML del contenido del header
     */
    renderHeaderContent(data) {
        return `
            <h1 class="name">${data.name}</h1>
            <p class="title">${data.title}</p>
            <div class="contact-info">
                <span class="contact-item">${data.contact.email}</span>
                <span class="contact-item">${data.contact.phone}</span>
                <span class="contact-item">${data.contact.location}</span>
                <span class="contact-item">${data.contact.linkedin}</span>
                <span class="contact-item">${data.contact.github}</span>
                <span class="contact-item">${data.contact.portfolio}</span>             
            </div>
        `;
    }

    /**
     * Renderiza el header completo del CV (para compatibilidad)
     * @param {Object} data - Datos personales
     * @returns {string} HTML del header completo
     */
    renderHeader(data) {
        return `
            <header>
                ${this.renderHeaderContent(data)}
            </header>
        `;
    }

    /**
     * Renderiza todo el CV
     * @param {string} containerId - ID del contenedor donde insertar el CV
     */
    async renderFullCV(containerId = 'cv-content') {
        try {
            const container = document.getElementById(containerId);
            if (!container) {
                console.error(`Container with ID "${containerId}" not found`);
                return;
            }

            // Mostrar indicador de carga
            const main = container.querySelector('main');
            if (main) {
                main.innerHTML = '<p>Cargando datos del CV...</p>';
            }

            // Cargar todos los datos incluyendo información personal
            const sectionsToLoad = ['personal', 'objective', 'experience', 'education', 'skills', 'projects', 'certifications'];
            const allData = await this.dataLoader.loadMultipleSections(sectionsToLoad);

            // Renderizar header si hay datos personales
            if (allData.personal) {
                const existingHeader = container.querySelector('header');
                if (existingHeader) {
                    existingHeader.innerHTML = this.renderHeaderContent(allData.personal);
                }
            }

            // Renderizar cada sección
            const sectionsHtml = [
                this.renderObjective(allData.objective),
                this.renderExperience(allData.experience),
                this.renderProjects(allData.projects),
                this.renderEducation(allData.education),
                this.renderSkills(allData.skills),
                this.renderCertifications(allData.certifications)
            ].join('');

            // Insertar el HTML generado
            if (main) {
                main.innerHTML = sectionsHtml;
            }

            console.log('CV rendered successfully with dynamic data');

        } catch (error) {
            console.error('Error rendering CV:', error);
            this.renderErrorState(containerId);
        }
    }

    /**
     * Renderiza estado de error
     * @param {string} containerId - ID del contenedor
     */
    renderErrorState(containerId) {
        const container = document.getElementById(containerId);
        const main = container?.querySelector('main');

        if (main) {
            const errorMessage = this.language === 'es'
                ? 'Error al cargar los datos del CV. Mostrando contenido estático.'
                : 'Error loading CV data. Showing static content.';

            main.innerHTML = `<p style="color: #dc2626; text-align: center; padding: 20px;">${errorMessage}</p>`;
        }
    }

    /**
     * Cambia el idioma y re-renderiza
     * @param {string} newLanguage - Nuevo idioma
     * @param {string} containerId - ID del contenedor
     */
    async changeLanguage(newLanguage, containerId = 'cv-content') {
        this.language = newLanguage;
        this.dataLoader.setLanguage(newLanguage);
        await this.renderFullCV(containerId);
    }
}

// Exponer la clase globalmente
window.CVRenderer = CVRenderer;