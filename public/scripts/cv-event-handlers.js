/**
 * CV Event Handlers
 * Funcionalidad compartida para manejar eventos del CV
 */

/**
 * Inicializa los event listeners comunes del CV
 * @param {Object} texts - Textos específicos del idioma
 */
function initializeCVEventHandlers(texts) {
    // Listener para mensajes de descarga automática
    window.addEventListener('message', function(event) {
        if (event.data && event.data.action === 'downloadPDF') {
            const config = {
                filename: texts.filename,
                loadingText: texts.loadingText,
                buttonText: texts.buttonText
            };

            downloadPDF(config).catch(error => {
                console.error(texts.autoDownloadError, error);
            });
        }
    });

    // Listener para cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        console.log(texts.cvReady);

        if (window.opener) {
            window.opener.postMessage({ status: 'cv-ready' }, '*');
        }
    });
}

// Exponer la función globalmente
window.initializeCVEventHandlers = initializeCVEventHandlers;