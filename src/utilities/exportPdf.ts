import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

async function exportToPDF(data: string) {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Set the font and font size
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;

    // Set the initial y position
    let y = page.getHeight() - 50;

    // Write the data to the PDF
    page.drawText(data, {
      x: 50,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0), // black color
    });

    // Generate the PDF bytes
    const pdfBytes = await pdfDoc.save();

    // Create a Blob object from the PDF bytes
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Save the PDF file using FileSaver.js
    saveAs(blob, "hospitalList.pdf");
  } catch (error) {
    console.error("Error exporting to PDF:", error);
  }
}

export default exportToPDF;
