import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generateResumePDF = async (
  onStart?: () => void,
  onDone?: () => void
) => {
  onStart?.();

  // Load the resume HTML into a hidden iframe so fonts & styles render correctly
  const iframe = document.createElement("iframe");
  iframe.style.cssText =
    "position:fixed;top:-9999px;left:-9999px;width:900px;height:1px;border:none;visibility:hidden;";
  document.body.appendChild(iframe);

  await new Promise<void>((resolve) => {
    iframe.onload = () => resolve();
    iframe.src = "/resume.html";
  });

  // Wait for Google Fonts inside the iframe to load
  const iframeDoc = iframe.contentDocument!;
  await iframeDoc.fonts.ready;
  // Extra paint settle
  await new Promise((r) => setTimeout(r, 600));

  const body = iframeDoc.body;
  const fullHeight = body.scrollHeight;
  iframe.style.height = `${fullHeight}px`;
  // Another tick for reflow
  await new Promise((r) => setTimeout(r, 200));

  // Render to canvas at 2× for crisp text
  const canvas = await html2canvas(body, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#070c13",
    width: 900,
    height: fullHeight,
    windowWidth: 900,
    windowHeight: fullHeight,
    logging: false,
  });

  document.body.removeChild(iframe);

  // A4 dimensions in mm
  const A4_W = 210;
  const A4_H = 297;

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const imgW = A4_W;
  const imgH = (canvas.height / canvas.width) * imgW;

  // If content fits on one page
  if (imgH <= A4_H) {
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, imgW, imgH);
  } else {
    // Slice into A4 pages
    const pageCanvas = document.createElement("canvas");
    const pageCtx = pageCanvas.getContext("2d")!;
    const pxPerMm = canvas.width / A4_W;
    const pageHeightPx = Math.floor(A4_H * pxPerMm);

    let yOffset = 0;
    let pageIndex = 0;

    while (yOffset < canvas.height) {
      const sliceH = Math.min(pageHeightPx, canvas.height - yOffset);
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceH;
      pageCtx.drawImage(canvas, 0, yOffset, canvas.width, sliceH, 0, 0, canvas.width, sliceH);

      const sliceMmH = (sliceH / pxPerMm);
      if (pageIndex > 0) pdf.addPage();
      pdf.addImage(pageCanvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, A4_W, sliceMmH);

      yOffset += sliceH;
      pageIndex++;
    }
  }

  pdf.save("Ethan_Potter_Resume.pdf");
  onDone?.();
};
