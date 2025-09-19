/**
 * CV Auto Download Functionality
 * Maneja la descarga automática de PDFs cuando se especifica en la URL
 */

/**
 * Inicializa la funcionalidad de descarga automática
 * @param {Object} texts - Textos específicos del idioma
 */
function initializeAutoDownload(texts) {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('autodownload') === 'true') {
        console.log(texts.autoDownloadEnabled);

        function waitForHtml2pdf() {
            return new Promise((resolve, reject) => {
                let attempts = 0;
                const maxAttempts = 50;

                function check() {
                    attempts++;
                    if (typeof html2pdf !== 'undefined') {
                        console.log(texts.html2pdfLoaded);
                        resolve(true);
                    } else if (attempts >= maxAttempts) {
                        reject(new Error(texts.html2pdfTimeout));
                    } else {
                        setTimeout(check, 100);
                    }
                }
                check();
            });
        }

        window.addEventListener('load', function() {
            console.log(texts.pageLoaded);

            waitForHtml2pdf().then(() => {
                console.log(texts.startingDownload);

                const downloadSection = document.querySelector('.download-section');
                if (downloadSection) {
                    downloadSection.style.display = 'none';
                }

                const autoIndicator = document.createElement('div');
                autoIndicator.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #8B0000;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    font-weight: bold;
                    z-index: 9999;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                `;
                autoIndicator.textContent = texts.generatingPdf;
                document.body.appendChild(autoIndicator);

                setTimeout(() => {
                    const config = {
                        filename: texts.filename,
                        loadingText: texts.loadingText,
                        buttonText: texts.buttonText
                    };

                    downloadPDF(config).then(() => {
                        console.log(texts.downloadCompleted);
                        autoIndicator.textContent = texts.successMessage;
                        autoIndicator.style.background = '#059669';

                        setTimeout(() => {
                            window.close();
                        }, 2000);
                    }).catch(error => {
                        console.error(texts.errorMessage, error);
                        autoIndicator.textContent = texts.errorDisplay;
                        autoIndicator.style.background = '#dc2626';

                        if (downloadSection) {
                            downloadSection.style.display = 'block';
                        }
                    });
                }, 1000);

            }).catch(error => {
                console.error(texts.html2pdfError, error);
                const downloadSection = document.querySelector('.download-section');
                if (downloadSection) {
                    downloadSection.style.display = 'block';
                }
            });
        });
    }
}

// Exponer la función globalmente
window.initializeAutoDownload = initializeAutoDownload;