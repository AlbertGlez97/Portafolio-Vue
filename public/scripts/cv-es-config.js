/**
 * Configuración específica para el CV en español
 */

// Configuración de textos en español
const esTexts = {
    filename: 'CV_Juan_Alberto_Gonzalez_ES.pdf',
    loadingText: '⏳ Generando PDF...',
    buttonText: 'Descargar PDF',
    autoDownloadEnabled: 'Auto-download habilitado para CV ES',
    html2pdfLoaded: 'html2pdf cargado correctamente',
    html2pdfTimeout: 'html2pdf no se cargó después de 5 segundos',
    pageLoaded: 'Página ES cargada, esperando html2pdf...',
    startingDownload: 'Iniciando descarga automática ES...',
    generatingPdf: '⏳ Generando PDF automáticamente...',
    downloadCompleted: 'Descarga ES completada',
    successMessage: '✅ PDF descargado exitosamente',
    errorMessage: 'Error en descarga automática ES:',
    errorDisplay: '❌ Error en descarga. Haga clic en "Descargar PDF"',
    html2pdfError: 'Error cargando html2pdf ES:',
    autoDownloadError: 'Error en descarga automática:',
    cvReady: 'CV ES cargado correctamente. Listo para descargar.'
};

// Inicializar funcionalidades cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeCVEventHandlers(esTexts);
    initializeAutoDownload(esTexts);

    // Renderizar CV con datos dinámicos
    if (typeof CVRenderer !== 'undefined') {
        const renderer = new CVRenderer('es');
        renderer.renderFullCV('cv-content').catch(error => {
            console.warn('Dynamic rendering failed, keeping static content:', error);
        });
    }
});