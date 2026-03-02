import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateConcessionPDF = (concession) => {
  return new Promise((resolve, reject) => {

    const dir = "uploads/passes";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const fileName = `pass_${concession.passNumber}.pdf`;
    const filePath = path.join(dir, fileName);

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    /* WATERMARK */
    doc.rotate(45, { origin: [300, 400] });
    doc.fontSize(60).fillColor("#eeeeee").text("RAILSYNC VERIFIED", 100, 300);
    doc.rotate(-45, { origin: [300, 400] });

    /* HEADER */
    doc.fillColor("black");
    doc.fontSize(20).text("INDIAN RAILWAYS", { align: "center" });
    doc.fontSize(14).text("STUDENT CONCESSION CERTIFICATE", { align: "center" });

    doc.moveDown();

    /* PASS INFO */
    doc.fontSize(12);
    doc.text(`Pass No: ${concession.passNumber}`);
    doc.text(`Issue Date: ${new Date(concession.createdAt).toLocaleDateString()}`);
    doc.text(`Expiry Date: ${new Date(concession.expiryDate).toLocaleDateString()}`);

    doc.moveDown();

    /* STUDENT DETAILS */
    doc.text(`Name: ${concession.name}`);
    doc.text(`Student ID: ${concession.studentId}`);
    doc.text(`College: ${concession.college}`);
    doc.text(`Course: ${concession.course}`);
    doc.text(`Year: ${concession.year}`);
    doc.text(`Phone: ${concession.phone}`);
    doc.text(`Address: ${concession.address}`);

    doc.moveDown();

    /* TRAVEL DETAILS */
    doc.text(`From: ${concession.fromStation}`);
    doc.text(`To: ${concession.toStation}`);
    doc.text(`Class: ${concession.travelClass}`);
    doc.text(`Duration: ${concession.duration}`);
    doc.text(`Type: ${concession.concessionType}`);

    doc.moveDown().moveDown();

    /* SIGNATURE BLOCK */
    doc.text("_________________________", 50, 650);
    doc.text("College Authority Stamp", 50, 665);

    doc.text("_________________________", 350, 650);
    doc.text("Railway Officer Signature", 350, 665);

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};
