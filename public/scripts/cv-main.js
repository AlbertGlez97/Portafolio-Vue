/**
 * CV Main JavaScript
 * Funcionalidad para detección de idioma y navegación del CV principal
 */

/**
 * Detecta el idioma basado en diferentes fuentes
 * @returns {string} 'es' o 'en'
 */
function detectLanguage() {
    // 1. Prioridad: Parámetro de URL
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && (langParam === 'es' || langParam === 'en')) {
        return langParam;
    }

    // 2. Segunda prioridad: Idioma guardado en el portafolio
    const portfolioLang = localStorage.getItem('portfolio-language');
    if (portfolioLang === 'es' || portfolioLang === 'en') {
        return portfolioLang;
    }

    // 3. Fallback: Idioma del navegador
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.substring(0, 2).toLowerCase();
    return langCode === 'es' ? 'es' : 'en';
}

/**
 * Carga el CV en el idioma especificado
 * @param {string} language - 'es' o 'en'
 */
function loadCV(language) {
    const cvFile = language === 'es' ? 'cv/cv-es.html' : 'cv/cv-en.html';

    // Mantener parámetros de URL existentes
    const currentParams = new URLSearchParams(window.location.search);
    const newUrl = `${cvFile}${currentParams.toString() ? '?' + currentParams.toString() : ''}`;

    window.location.href = newUrl;
}

/**
 * Muestra el selector manual de idioma
 */
function showLanguageSelector() {
    document.getElementById('message').textContent = 'Please select your language / Por favor selecciona tu idioma:';
    document.getElementById('languageSelector').style.display = 'block';
    document.querySelector('.loader').style.display = 'none';
}

/**
 * Inicializa la aplicación cuando el DOM está listo
 */
function initializeApp() {
    // Verificar si hay algún parámetro especial (como autodownload)
    const urlParams = new URLSearchParams(window.location.search);
    const hasSpecialParams = urlParams.has('autodownload');

    if (hasSpecialParams) {
        // Si hay parámetros especiales, redirigir inmediatamente
        const detectedLang = detectLanguage();
        loadCV(detectedLang);
    } else {
        // Esperar un momento para mostrar el loader, luego redirigir
        setTimeout(() => {
            const detectedLang = detectLanguage();
            const portfolioLang = localStorage.getItem('portfolio-language');

            // Mostrar mensaje específico del idioma detectado
            if (detectedLang === 'es') {
                if (portfolioLang === 'es') {
                    document.getElementById('message').textContent = 'Usando idioma del portafolio: Español. Cargando CV...';
                } else {
                    document.getElementById('message').textContent = 'Idioma detectado: Español. Cargando CV...';
                }
            } else {
                if (portfolioLang === 'en') {
                    document.getElementById('message').textContent = 'Using portfolio language: English. Loading CV...';
                } else {
                    document.getElementById('message').textContent = 'Language detected: English. Loading CV...';
                }
            }

            // Redirigir después de mostrar el mensaje
            setTimeout(() => {
                loadCV(detectedLang);
            }, 1000);

        }, 1500);

        // Mostrar selector manual como fallback después de 5 segundos
        setTimeout(showLanguageSelector, 5000);
    }
}

/**
 * Función global para descargar CV por idioma específico
 * @param {string} language - 'es' o 'en'
 */
function downloadCVByLanguage(language) {
    const cvFile = language === 'es' ? 'cv/cv-es.html' : 'cv/cv-en.html';
    const cvWindow = window.open(`${cvFile}?autodownload=true`, '_blank');

    if (!cvWindow) {
        // Si se bloquean las ventanas emergentes, redirigir en la misma ventana
        window.location.href = `${cvFile}?autodownload=true`;
    }
}

/**
 * Función global para descargar CV basado en idioma detectado automáticamente
 */
function downloadCV() {
    const detectedLang = detectLanguage();
    downloadCVByLanguage(detectedLang);
}

// Exponer funciones globalmente para uso desde otras páginas
window.downloadCVByLanguage = downloadCVByLanguage;
window.downloadCV = downloadCV;
window.loadCV = loadCV;

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeApp);