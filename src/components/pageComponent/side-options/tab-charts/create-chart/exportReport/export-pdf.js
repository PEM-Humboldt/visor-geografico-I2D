import logoi2d from '../../../../../../assets/img/logo-humboldt-v2.png'
import footeri2d from '../../../../../../assets/img/footer.png'

import pdfMake from "pdfmake/build/pdfmake.min";
import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { todayDate } from '../../../../../globalVars'

import { chartReg, chartDangerSp } from '../../chart'

import { textGbif, textDanger, textReferences, dangerString } from './config/pdf-text'
import { title_mupio, title_depto } from "../../../../../globalVars";

// Helper function to convert image URL to data URL (base64)
function imageToDataURL(imagePath) {
    return new Promise((resolve, reject) => {
        // If already a data URL, return it directly
        if (imagePath.startsWith('data:')) {
            resolve(imagePath);
            return;
        }

        // Construct the full image URL
        // Parcel bundles images and changes their paths, so we need to use the actual bundled path
        let fullImagePath = imagePath;
        
        // If it's already a full URL, use it
        if (!imagePath.startsWith('http://') && !imagePath.startsWith('https://')) {
            // For bundled assets, the path is already correct from the import
            // Just ensure it's an absolute URL
            if (!imagePath.startsWith('/')) {
                fullImagePath = '/' + imagePath;
            }
            fullImagePath = window.location.origin + fullImagePath;
        }

        const alternativePaths = [];

        // Helper function to try loading an image from a URL
        function tryLoadImage(url) {
            return fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.blob();
                })
                .then(blob => {
                    return new Promise((resolveBlob, rejectBlob) => {
                        const reader = new FileReader();
                        reader.onloadend = function() {
                            const dataURL = reader.result;
                            if (!dataURL || !dataURL.startsWith('data:')) {
                                rejectBlob(new Error('Invalid data URL generated'));
                                return;
                            }
                            // Ensure the data URL has the correct format for pdfMake
                            // pdfMake expects: data:image/png;base64,... or data:image/jpeg;base64,...
                            if (!dataURL.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
                                // If the MIME type is missing or incorrect, try to fix it
                                // Extract base64 part
                                const base64Match = dataURL.match(/base64,(.+)$/);
                                if (base64Match) {
                                    // Assume PNG if MIME type is missing
                                    const fixedDataURL = 'data:image/png;base64,' + base64Match[1];
                                    resolveBlob(fixedDataURL);
                                } else {
                                    rejectBlob(new Error('Invalid data URL format - missing base64 data'));
                                }
                                return;
                            }
                            resolveBlob(dataURL);
                        };
                        reader.onerror = function() {
                            rejectBlob(new Error('Failed to read blob'));
                        };
                        reader.readAsDataURL(blob);
                    });
                });
        }

        // Try loading from primary path, then alternatives
        const pathsToTry = [fullImagePath, ...alternativePaths];
        let lastError = null;

        function tryNextPath(index) {
            if (index >= pathsToTry.length) {
                // All paths failed, try Image element fallback
                const img = new Image();
                img.crossOrigin = 'anonymous';

                img.onload = function() {
                    try {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        const dataURL = canvas.toDataURL('image/png');
                        if (!dataURL || !dataURL.startsWith('data:') || !dataURL.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
                            throw new Error('Invalid data URL generated from canvas');
                        }
                        resolve(dataURL);
                    } catch (canvasError) {
                        reject(new Error('Failed to convert image to data URL: ' + canvasError.message));
                    }
                };

                img.onerror = function() {
                    reject(new Error('Failed to load image from all paths. Last error: ' + (lastError ? lastError.message : 'unknown')));
                };

                img.src = fullImagePath;
                return;
            }

            const currentPath = pathsToTry[index];
            tryLoadImage(currentPath)
                .then(dataURL => {
                    resolve(dataURL);
                })
                .catch(error => {
                    lastError = error;
                    tryNextPath(index + 1);
                });
        }

        tryNextPath(0);
    });
}

// /** Function that exports PDF*/

export function savePDF() {
    // First, convert images to data URLs, then get chart data
    Promise.all([
        imageToDataURL(logoi2d),
        imageToDataURL(footeri2d),
        chartReg.exporting.getJSON("json"),
        chartDangerSp.exporting.getJSON("json")
    ]).then(function (res) {
        // res[0] = logo data URL
        // res[1] = footer data URL
        // res[2] = chartReg JSON
        // res[3] = chartDangerSp JSON

        // Verify data URLs are valid
        if (!res[0] || !res[0].startsWith('data:')) {
            throw new Error('Invalid logo data URL');
        }
        if (!res[1] || !res[1].startsWith('data:')) {
            throw new Error('Invalid footer data URL');
        }

        // Final validation: ensure data URLs are in the correct format for pdfMake
        const logoDataURL = res[0];
        const footerDataURL = res[1];

        if (!logoDataURL.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
            throw new Error('Logo data URL is not in the correct format for pdfMake');
        }
        if (!footerDataURL.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
            throw new Error('Footer data URL is not in the correct format for pdfMake');
        }

        // Create document template
        var doc = {
            pageSize: "A4",
            pageMargins: [50, 60, 50, 130],
            pageOrientation: "portrait",
            verticalRatio: 0.4,
            content: [
                {
                    text: ['Bogotá, D.C. ', todayDate],
                    style: 'ubicacion'
                },
                textGbif(res[2]),
                textDanger(res[3]),
                textReferences()

            ],
            footer: function (currentPage, pageCount) {
                return [
                    {
                        image: 'footerpdf',
                        width: 410,
                        height: 80,
                        alignment: 'center',
                        opacity: 0.5,
                        margin: [0, 0, 0, 0]
                    }
                ]
            },
            header: function (currentPage, pageCount, pageSize) {
                return [
                    {
                        image: 'i2d',
                        width: 100,
                        height: 100,
                        alignment: 'right',
                        opacity: 0.5,
                        margin: [0, 0, 35, 0]
                    }
                ]
            },
            // Images as data URLs (base64 encoded)
            // pdfMake requires data URLs in format: data:image/png;base64,... or data:image/jpeg;base64,...
            images: {
                i2d: logoDataURL, // logo as data URL
                footerpdf: footerDataURL, // footer as data URL
            },
            pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
                //check if signature part is completely on the last page, add pagebreak if not
                if (currentNode.id === 'dangerData' && dangerString > 0) {
                    return true;
                }
                return false;
            },
            styles: {
                fontSize: 11,
                alignment: 'justify',
                ubicacion: {
                    fontSize: 11,
                    alignment: 'left',
                    margin: [40, 60, 40, 20]
                },
                parrafo: {
                    fontSize: 11,
                    alignment: 'justify',
                    margin: [40, 0, 40, 0]
                },
                hints: {
                    fontSize: 9,
                    alignment: 'center',
                    margin: [40, 0, 40, 0]
                },
                italic: {
                    fontSize: 9,
                    italics: true,
                    alignment: 'center',
                    margin: [40, 0, 40, 0]
                },
                bold: {
                    fontSize: 11,
                    bold: true,
                    alignment: 'left',
                    margin: [40, 0, 40, 0]
                },
                underline: {
                    decoration: 'underline',
                    decorationColor: 'blue',
                    color: 'blue'
                },
                underlineBlack: {
                    alignment: 'left',
                    decoration: 'underline',
                    decorationColor: 'black',
                    color: 'black',
                    margin: [40, 0, 40, 0]
                }
            }

        };

        let pdfprint = pdfMake.createPdf(doc);
        //pdfprint.vfs = pdfFonts.pdfMake.vfs;
        if (document.getElementById("stadisticstype").value == 'mpio_politico') {
            pdfprint.download(`Reporte de Biodiversidad ${title_mupio}.pdf`);
        } else {
            pdfprint.download(`Reporte de Biodiversidad ${title_depto}.pdf`);
        }
    }).catch(function(error) {
        console.error('Error generating PDF:', error);
        alert('Error al generar el PDF: ' + error.message);
    });
}
