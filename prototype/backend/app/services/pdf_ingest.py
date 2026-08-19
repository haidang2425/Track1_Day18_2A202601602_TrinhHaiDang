import fitz  # pymupdf
from pathlib import Path

def ingest_pdf(pdf_path: str, day: int) -> list[dict]:
    """
    Trả về list[{day, page_number, content, source_label}].
    Đồng thời render PNG vào frontend/public/slides/day{N}/page_{P}.png.
    """
    # Tính output path tương đối từ vị trí file này (backend/app/services/pdf_ingest.py)
    # parent[0] = services, parent[1] = app, parent[2] = backend, parent[3] = prototype
    slides_dir = Path(__file__).resolve().parents[3] / "frontend" / "public" / "slides" / f"day{day}"
    slides_dir.mkdir(parents=True, exist_ok=True)

    doc = fitz.open(pdf_path)
    chunks = []
    for page_num, page in enumerate(doc, start=1):
        text = page.get_text("text").strip()
        if len(text) < 30:
            text = f"[Slide {page_num} — nội dung hình ảnh]"

        mat = fitz.Matrix(2, 2)  # 2x zoom ≈ 150 DPI
        pix = page.get_pixmap(matrix=mat)
        pix.save(str(slides_dir / f"page_{page_num}.png"))

        chunks.append({
            "day": day,
            "page_number": page_num,
            "content": text[:2000],
            "source_label": f"Tr. {page_num}",
        })
    doc.close()
    return chunks
