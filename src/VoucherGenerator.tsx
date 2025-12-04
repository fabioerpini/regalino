// Ritorna all'importazione dinamica
import React from 'react';

interface VoucherGeneratorProps {
  titolo: string;
  imgPDF: string;
  children: React.ReactNode;
}

// Un componente wrapper per gestire l'importazione dinamica e il click
const VoucherGenerator: React.FC<VoucherGeneratorProps> = ({ titolo, imgPDF, children }) => {
  
  // Questa funzione è ASINCRONA
  async function generaPDF() {
    // 1. Importazione Dinamica
    import('jspdf').then(({ jsPDF }) => {
const doc = new jsPDF({
orientation: 'landscape',
unit: 'mm',
format: 'a4',
});

doc.addImage(imgPDF, 'JPEG', 0, 0, 297, 210);
doc.setFont('helvetica');
doc.setFontSize(30);
doc.setTextColor(0, 0, 0);

const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();

doc.text('Voucher per', pageWidth / 2, pageHeight / 2 , { align: 'center' });

doc.setFontSize(40);
doc.setFont('helvetica','bold');
doc.setTextColor(255, 0, 0);

doc.text(titolo, pageWidth / 2, pageHeight / 2 + 15, { align: 'center' });

// ⭐ Funziona anche su iPhone
const pdfBlob = doc.output('blob');
const blobUrl = URL.createObjectURL(pdfBlob);
window.open(blobUrl, '_blank');
});
  }

  return (
    // Passiamo la funzione generaPDF all'elemento figlio (il pulsante)
    <div onClick={generaPDF}>
      {children}
    </div>
  );
};

export default VoucherGenerator;