import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export const generateInvoicePDF = async (booking, packageMain) => {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();
  
  // Embed the font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  // Add a page
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 12;

  // Draw invoice header
  page.drawText('Travel Agency Booking Invoice', {
    x: 50,
    y: height - 50,
    size: 18,
    font,
    color: rgb(0, 0, 0)
  });

  // Customer Details
  page.drawText(`Customer Name: ${booking.customerName}`, {
    x: 50,
    y: height - 100,
    size: fontSize,
    font
  });
  page.drawText(`Email: ${booking.email}`, {
    x: 50,
    y: height - 120,
    size: fontSize,
    font
  });
  page.drawText(`Phone: ${booking.phoneNumber}`, {
    x: 50,
    y: height - 140,
    size: fontSize,
    font
  });

  // Package Details
  page.drawText(`Package: ${packageMain.title}`, {
    x: 50,
    y: height - 180,
    size: fontSize,
    font
  });
  page.drawText(`Number of Travelers: ${booking.numberOfTravelers}`, {
    x: 50,
    y: height - 200,
    size: fontSize,
    font
  });

  // Pricing
  page.drawText(`Price per Person: $${packageMain.price.toFixed(2)}`, {
    x: 50,
    y: height - 240,
    size: fontSize,
    font
  });
  page.drawText(`Total Price: $${booking.totalPrice.toFixed(2)}`, {
    x: 50,
    y: height - 260,
    size: fontSize,
    font,
    color: rgb(0, 0.5, 0)
  });

  // Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();

  // In a real application, you'd save this to a file or cloud storage
  return `data:application/pdf;base64,${Buffer.from(pdfBytes).toString('base64')}`;
};