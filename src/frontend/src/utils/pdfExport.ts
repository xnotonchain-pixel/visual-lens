import type { ScanRecord } from "../backend";
import { AnalysisMode } from "../backend";

const MODE_LABELS: Record<AnalysisMode, string> = {
  [AnalysisMode.generic]: "Generic",
  [AnalysisMode.plant]: "Plant ID",
  [AnalysisMode.food]: "Food Scanner",
  [AnalysisMode.bookProduct]: "Book/Product",
  [AnalysisMode.translation]: "Translation",
  [AnalysisMode.artLandmark]: "Art/Landmark",
  [AnalysisMode.receipt]: "Receipt Parser",
  [AnalysisMode.medicalReference]: "Medical Reference",
  [AnalysisMode.carFashion]: "Car/Fashion",
};

const MODE_EMOJI: Record<AnalysisMode, string> = {
  [AnalysisMode.generic]: "🔍",
  [AnalysisMode.plant]: "🌿",
  [AnalysisMode.food]: "🍽",
  [AnalysisMode.bookProduct]: "📚",
  [AnalysisMode.translation]: "🌐",
  [AnalysisMode.artLandmark]: "🏛",
  [AnalysisMode.receipt]: "🧾",
  [AnalysisMode.medicalReference]: "🩺",
  [AnalysisMode.carFashion]: "🚗",
};

// Dark theme palette constants (used as jsPDF RGB values)
const BG = [14, 15, 22] as const; // near-black
const CARD = [20, 22, 32] as const;
const SECTION_HDR = [100, 200, 220] as const; // cyan primary
const TXT_PRIMARY = [230, 232, 245] as const;
const TXT_MUTED = [130, 132, 155] as const;
const ACCENT_AMBER = [200, 170, 60] as const;
const LINE_COLOR = [40, 44, 60] as const;

async function getJsPDF() {
  const { default: jsPDF } = await import("jspdf");
  return jsPDF;
}

// ── Single scan PDF ────────────────────────────────────────────────────────────

export async function exportScanToPDF(scan: ScanRecord): Promise<void> {
  const jsPDF = await getJsPDF();
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const W = 210;
  const H = 297;
  const MARGIN = 15;
  const CONTENT_W = W - MARGIN * 2;

  // Background
  doc.setFillColor(...BG);
  doc.rect(0, 0, W, H, "F");

  // Header bar
  doc.setFillColor(...CARD);
  doc.rect(0, 0, W, 28, "F");

  // Branding
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...TXT_PRIMARY);
  doc.text("Visual Lens", MARGIN, 12);

  // Mode badge
  const modeLabel = MODE_LABELS[scan.mode] ?? "Scan";
  const modeEmoji = MODE_EMOJI[scan.mode] ?? "🔍";
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...SECTION_HDR);
  doc.text(`${modeEmoji} ${modeLabel} Mode`, MARGIN, 20);

  // Date
  const ts = new Date(Number(scan.timestamp / BigInt(1_000_000)));
  doc.setTextColor(...TXT_MUTED);
  doc.setFontSize(8);
  doc.text(ts.toLocaleString(), W - MARGIN, 20, { align: "right" });

  let y = 35;
  const lineH = 5.5;

  const section = (title: string) => {
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...SECTION_HDR);
    doc.text(title.toUpperCase(), MARGIN, y);
    y += 1.5;
    doc.setDrawColor(...LINE_COLOR);
    doc.line(MARGIN, y, W - MARGIN, y);
    y += lineH;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...TXT_PRIMARY);
    doc.setFontSize(9);
  };

  const textBlock = (text: string, maxW = CONTENT_W): number => {
    const lines = doc.splitTextToSize(text, maxW);
    const space = lines.length * (lineH - 0.5);
    if (y + space > H - 20) {
      doc.addPage();
      doc.setFillColor(...BG);
      doc.rect(0, 0, W, H, "F");
      y = 15;
    }
    doc.text(lines, MARGIN, y);
    y += space + 2;
    return space;
  };

  // Scan image
  if (scan.imageBase64) {
    try {
      const imgH = 75;
      doc.addImage(
        `data:${scan.mimeType};base64,${scan.imageBase64}`,
        scan.mimeType.includes("png") ? "PNG" : "JPEG",
        MARGIN,
        y,
        CONTENT_W,
        imgH,
        undefined,
        "FAST",
      );
      y += imgH + 6;
    } catch {
      // skip image on error
    }
  }

  // Scene description
  if (scan.analysisResult.sceneDescription) {
    section("Scene Description");
    doc.setTextColor(...TXT_PRIMARY);
    doc.setFontSize(9);
    textBlock(scan.analysisResult.sceneDescription);
  }

  // Detected objects table
  if (scan.analysisResult.objects.length > 0) {
    section("Detected Objects");
    const colW = CONTENT_W / 2 - 2;
    scan.analysisResult.objects.forEach((obj, i) => {
      const col = i % 2;
      const xPos = MARGIN + col * (colW + 4);
      if (col === 0 && i > 0) y += lineH - 1;
      const pct = Math.round(obj.confidence * 100);
      doc.setTextColor(...TXT_PRIMARY);
      doc.setFontSize(9);
      doc.text(`• ${obj.name}`, xPos, y);
      doc.setTextColor(...ACCENT_AMBER);
      doc.text(`${pct}%`, xPos + colW, y, { align: "right" });
      if (col === 1) y += lineH - 1;
    });
    if (scan.analysisResult.objects.length % 2 !== 0) y += lineH - 1;
    y += 3;
  }

  // Extracted text (OCR)
  if (scan.analysisResult.extractedText) {
    section("Extracted Text (OCR)");
    doc.setFillColor(...CARD);
    const ocrLines = doc.splitTextToSize(
      scan.analysisResult.extractedText,
      CONTENT_W - 6,
    );
    const ocrH = ocrLines.length * (lineH - 0.5) + 6;
    if (y + ocrH < H - 20) {
      doc.roundedRect(MARGIN, y - 3, CONTENT_W, ocrH, 2, 2, "F");
    }
    doc.setTextColor(...TXT_MUTED);
    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    doc.text(ocrLines, MARGIN + 3, y + 1);
    doc.setFont("helvetica", "normal");
    y += ocrH + 2;
  }

  // Web results
  if (scan.analysisResult.webResults.length > 0) {
    section("Web Search Results");
    for (const r of scan.analysisResult.webResults.slice(0, 5)) {
      if (y > H - 25) {
        doc.addPage();
        doc.setFillColor(...BG);
        doc.rect(0, 0, W, H, "F");
        y = 15;
      }
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...SECTION_HDR);
      doc.setFontSize(9);
      const titleLines = doc.splitTextToSize(r.title, CONTENT_W);
      doc.text(titleLines, MARGIN, y);
      y += titleLines.length * (lineH - 1);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...TXT_MUTED);
      doc.setFontSize(8);
      const urlLines = doc.splitTextToSize(r.url, CONTENT_W);
      doc.text(urlLines, MARGIN, y);
      y += urlLines.length * (lineH - 1);
      if (r.snippet) {
        doc.setTextColor(...TXT_PRIMARY);
        const snipLines = doc.splitTextToSize(r.snippet, CONTENT_W);
        doc.text(snipLines, MARGIN, y);
        y += snipLines.length * (lineH - 1);
      }
      y += 3;
    }
  }

  // Footer
  const pageCount = (
    doc as unknown as { getNumberOfPages: () => number }
  ).getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFontSize(7);
    doc.setTextColor(...TXT_MUTED);
    doc.text(`Visual Lens · Page ${p} of ${pageCount}`, W - MARGIN, H - 8, {
      align: "right",
    });
    doc.text("caffeine.ai", MARGIN, H - 8);
  }

  const name = (scan.analysisResult.objects[0]?.name ?? "scan")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  doc.save(`visual-lens-${name}-${Date.now()}.pdf`);
}

// ── Bulk scan PDF ──────────────────────────────────────────────────────────────

export async function exportScansToPDF(
  scans: ScanRecord[],
  title: string,
  onProgress?: (current: number, total: number) => void,
): Promise<void> {
  if (scans.length === 0) return;
  const jsPDF = await getJsPDF();
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const W = 210;
  const H = 297;
  const MARGIN = 15;
  const CONTENT_W = W - MARGIN * 2;

  const addBg = () => {
    doc.setFillColor(...BG);
    doc.rect(0, 0, W, H, "F");
  };

  // ── Cover page ──
  addBg();
  doc.setFillColor(...CARD);
  doc.rect(0, 0, W, 60, "F");
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...TXT_PRIMARY);
  doc.text("Visual Lens", MARGIN, 25);
  doc.setFontSize(14);
  doc.setTextColor(...SECTION_HDR);
  doc.text(title, MARGIN, 40);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...TXT_MUTED);
  doc.text(
    `${scans.length} scan${scans.length !== 1 ? "s" : ""}  ·  Exported ${new Date().toLocaleString()}`,
    MARGIN,
    52,
  );

  // ── Table of contents ──
  let tocY = 80;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...SECTION_HDR);
  doc.text("Table of Contents", MARGIN, tocY);
  tocY += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  scans.forEach((scan, i) => {
    if (tocY > H - 20) return; // guard overflow
    const label = scan.analysisResult.objects[0]?.name ?? "Scan";
    const modeLabel = MODE_LABELS[scan.mode] ?? "";
    const ts = new Date(Number(scan.timestamp / BigInt(1_000_000)));
    doc.setTextColor(...TXT_PRIMARY);
    doc.text(`${i + 1}. ${label}`, MARGIN + 4, tocY);
    doc.setTextColor(...TXT_MUTED);
    doc.text(`${modeLabel} · ${ts.toLocaleDateString()}`, W - MARGIN, tocY, {
      align: "right",
    });
    doc.setDrawColor(...LINE_COLOR);
    doc.line(MARGIN + 4, tocY + 1.5, W - MARGIN, tocY + 1.5);
    tocY += 7;
  });

  // ── Per-scan pages ──
  for (let idx = 0; idx < scans.length; idx++) {
    const scan = scans[idx];
    doc.addPage();
    addBg();

    // Header bar
    doc.setFillColor(...CARD);
    doc.rect(0, 0, W, 26, "F");

    const label = scan.analysisResult.objects[0]?.name ?? "Scan";
    const modeLabel = MODE_LABELS[scan.mode] ?? "";
    const modeEmoji = MODE_EMOJI[scan.mode] ?? "";
    const ts = new Date(Number(scan.timestamp / BigInt(1_000_000)));

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...TXT_PRIMARY);
    doc.text(`${idx + 1}. ${label}`, MARGIN, 12);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...SECTION_HDR);
    doc.text(`${modeEmoji} ${modeLabel}`, MARGIN, 20);
    doc.setTextColor(...TXT_MUTED);
    doc.text(ts.toLocaleString(), W - MARGIN, 20, { align: "right" });

    let y = 32;
    const lineH = 5.5;

    const section = (t: string) => {
      if (y > H - 30) {
        doc.addPage();
        addBg();
        y = 15;
      }
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...SECTION_HDR);
      doc.text(t.toUpperCase(), MARGIN, y);
      y += 1;
      doc.setDrawColor(...LINE_COLOR);
      doc.line(MARGIN, y, W - MARGIN, y);
      y += lineH;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...TXT_PRIMARY);
      doc.setFontSize(8.5);
    };

    const textBlock = (text: string) => {
      const lines = doc.splitTextToSize(text, CONTENT_W);
      const need = lines.length * (lineH - 0.5);
      if (y + need > H - 20) {
        doc.addPage();
        addBg();
        y = 15;
      }
      doc.text(lines, MARGIN, y);
      y += need + 2;
    };

    // Thumbnail
    if (scan.imageBase64) {
      try {
        const imgH = 60;
        doc.addImage(
          `data:${scan.mimeType};base64,${scan.imageBase64}`,
          scan.mimeType.includes("png") ? "PNG" : "JPEG",
          MARGIN,
          y,
          CONTENT_W,
          imgH,
          undefined,
          "FAST",
        );
        y += imgH + 6;
      } catch {
        // skip
      }
    }

    // Scene description
    if (scan.analysisResult.sceneDescription) {
      section("Scene Description");
      textBlock(scan.analysisResult.sceneDescription);
    }

    // Objects summary
    if (scan.analysisResult.objects.length > 0) {
      section("Key Findings");
      const items = scan.analysisResult.objects.slice(0, 6);
      const colW = CONTENT_W / 3 - 2;
      items.forEach((obj, i) => {
        const col = i % 3;
        const xPos = MARGIN + col * (colW + 3);
        const pct = Math.round(obj.confidence * 100);
        doc.setTextColor(...TXT_PRIMARY);
        doc.text(`• ${obj.name}`, xPos, y);
        doc.setTextColor(...ACCENT_AMBER);
        doc.text(`${pct}%`, xPos + colW, y, { align: "right" });
        if (col === 2 || i === items.length - 1) y += lineH - 1;
      });
      y += 2;
    }

    // Extracted text (abbreviated)
    if (scan.analysisResult.extractedText) {
      section("Extracted Text");
      const excerpt = scan.analysisResult.extractedText.slice(0, 200);
      const lines = doc.splitTextToSize(
        excerpt + (scan.analysisResult.extractedText.length > 200 ? "…" : ""),
        CONTENT_W,
      );
      doc.text(lines, MARGIN, y);
      y += lines.length * (lineH - 0.5) + 2;
    }

    // Web results (abbreviated)
    if (scan.analysisResult.webResults.length > 0) {
      section("Web Results");
      for (const r of scan.analysisResult.webResults.slice(0, 2)) {
        if (y > H - 20) break;
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...SECTION_HDR);
        doc.setFontSize(8);
        const tl = doc.splitTextToSize(r.title, CONTENT_W);
        doc.text(tl, MARGIN, y);
        y += tl.length * (lineH - 1) + 1;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...TXT_MUTED);
        const ul = doc.splitTextToSize(r.url, CONTENT_W);
        doc.text(ul, MARGIN, y);
        y += ul.length * (lineH - 1) + 2;
      }
    }

    // Page number
    doc.setFontSize(7);
    doc.setTextColor(...TXT_MUTED);
    doc.text(`${idx + 2} / ${scans.length + 1}`, W - MARGIN, H - 8, {
      align: "right",
    });

    onProgress?.(idx + 1, scans.length);
    await new Promise((r) => setTimeout(r, 15));
  }

  const filename = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 40);
  doc.save(`visual-lens-${filename || "export"}-${Date.now()}.pdf`);
}
