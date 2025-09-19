/**
 * Configuración específica para el CV en inglés
 */

// Configuración de textos en inglés
const enTexts = {
    filename: 'CV_Juan_Alberto_Gonzalez_EN.pdf',
    loadingText: '⏳ Generating PDF...',
    buttonText: 'Download PDF',
    autoDownloadEnabled: 'Auto-download enabled for CV EN',
    html2pdfLoaded: 'html2pdf loaded correctly',
    html2pdfTimeout: 'html2pdf did not load after 5 seconds',
    pageLoaded: 'EN page loaded, waiting for html2pdf...',
    startingDownload: 'Starting automatic download EN...',
    generatingPdf: '⏳ Generating PDF automatically...',
    downloadCompleted: 'EN download completed',
    successMessage: '✅ PDF downloaded successfully',
    errorMessage: 'Error in automatic download EN:',
    errorDisplay: '❌ Download error. Click "Download PDF"',
    html2pdfError: 'Error loading html2pdf EN:',
    autoDownloadError: 'Error in automatic download:',
    cvReady: 'CV EN loaded correctly. Ready to download.'
};

// Inicializar funcionalidades cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeCVEventHandlers(enTexts);
    initializeAutoDownload(enTexts);

    // Renderizar CV con datos dinámicos
    if (typeof CVRenderer !== 'undefined') {
        const renderer = new CVRenderer('en');
        renderer.renderFullCV('cv-content').catch(error => {
            console.warn('Dynamic rendering failed, keeping static content:', error);
        });
    }
});