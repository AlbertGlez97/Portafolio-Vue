/**
 * CV PDF Generator
 * Funcionalidad compartida para generar PDFs de CV
 */

/**
 * Genera un PDF del CV con configuración personalizable
 * @param {Object} config - Configuración para la generación del PDF
 * @param {string} config.filename - Nombre del archivo PDF
 * @param {string} config.loadingText - Texto mostrado durante la generación
 * @param {string} config.buttonText - Texto normal del botón
 */
function downloadPDF(config = {}) {
    const element = document.getElementById('cv-content');

    // Configuración por defecto
    const defaultConfig = {
        filename: 'CV_Juan_Alberto_Gonzalez.pdf',
        loadingText: '⏳ Generating PDF...',
        buttonText: 'Download PDF'
    };

    const finalConfig = { ...defaultConfig, ...config };

    const opt = {
        margin: 0.5,
        filename: finalConfig.filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true
        },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait'
        }
    };

    const btn = document.querySelector('.download-btn');
    if (btn) {
        btn.innerHTML = finalConfig.loadingText;
        btn.disabled = true;
    }

    return html2pdf().set(opt).from(element).save().then(() => {
        if (btn) {
            btn.innerHTML = finalConfig.buttonText;
            btn.disabled = false;
        }
        return true;
    }).catch((error) => {
        console.error('Error generating PDF:', error);
        if (btn) {
            btn.innerHTML = finalConfig.buttonText;
            btn.disabled = false;
        }
        throw error;
    });
}

// Exponer la función globalmente
window.downloadPDF = downloadPDF;