
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function POST(request) {
  try {
    const data = await request.json();

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 méret

    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    let y = height - 50;

    page.drawText("Angel Ceremony – Esketési Ajánlat", {
      x: 50,
      y,
      size: 18,
      font,
      color: rgb(0.4, 0.2, 0.6),
    });

    y -= 40;
    page.drawText(`Kedves ${data.bride} & ${data.groom}!`, { x: 50, y, size: fontSize, font });
    y -= 20;
    page.drawText("Örömmel küldöm el szertartásvezetői ajánlatomat a magyar nyelvű esküvőtökhöz.", { x: 50, y, size: fontSize, font });
    y -= 20;
    page.drawText("Az Angel Ceremony által megálmodott 30 perc varázslat lesz – egy felejthetetlen élmény,", { x: 50, y, size: fontSize, font });
    y -= 20;
    page.drawText("ami megalapozza az egész nap ünnepi hangulatát.", { x: 50, y, size: fontSize, font });

    y -= 40;
    page.drawText("Az esküvő részletei", { x: 50, y, size: 14, font, color: rgb(0.2, 0.2, 0.2) });
    y -= 20;

    const details = [
      `Dátum: ${data.date}`,
      `Kezdés: ${data.hour}:${data.minute}`,
      `Helyszín: ${data.location}`,
      `Távolság: ${data.distance} km`,
      `Vendégek száma: ${data.guests}`,
      `Csomag: ${data.selectedPackage}`,
      `Kiszállási díj: ${data.displayOption === "custom" ? data.customText : data.kiszalldij + " Ft"}`
    ];

    for (const line of details) {
      page.drawText("• " + line, { x: 60, y, size: fontSize, font });
      y -= 18;
    }

    const pdfBytes = await pdfDoc.save();
    const base64String = Buffer.from(pdfBytes).toString("base64");

    return new Response(JSON.stringify({ base64: base64String }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("PDF generálás hiba:", err);
    return new Response("Szerverhiba PDF készítésekor", { status: 500 });
  }
}
