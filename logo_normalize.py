from pathlib import Path

from PIL import Image


def clamp(value: float, lo: int = 0, hi: int = 255) -> int:
    return max(lo, min(hi, int(value)))


def sample_background_rgb(image: Image.Image) -> tuple[int, int, int]:
    image = image.convert("RGBA")
    w, h = image.size
    points = [(2, 2), (w - 3, 2), (2, h - 3), (w - 3, h - 3)]
    rs = gs = bs = 0
    for x, y in points:
        r, g, b, _ = image.getpixel((x, y))
        rs += r
        gs += g
        bs += b
    n = len(points)
    return rs // n, gs // n, bs // n


def alpha_from_background(
    image: Image.Image,
    bg_rgb: tuple[int, int, int],
    *,
    recolor_rgb: tuple[int, int, int] | None = None,
    diff_mul: int = 6,
) -> Image.Image:
    image = image.convert("RGBA")
    px = image.load()
    w, h = image.size
    br, bg, bb = bg_rgb
    for y in range(h):
        for x in range(w):
            r, g, b, _a = px[x, y]
            d = max(abs(r - br), abs(g - bg), abs(b - bb))
            na = clamp(d * diff_mul)
            if na == 0:
                px[x, y] = (0, 0, 0, 0)
                continue
            if recolor_rgb is not None:
                rr, rg, rb = recolor_rgb
                px[x, y] = (rr, rg, rb, na)
            else:
                px[x, y] = (r, g, b, na)
    return image


def crop_to_alpha(image: Image.Image, *, pad_ratio: float = 0.18) -> Image.Image:
    alpha = image.convert("RGBA").split()[-1]
    bbox = alpha.getbbox()
    if not bbox:
        return image
    x0, y0, x1, y1 = bbox
    bw = x1 - x0
    bh = y1 - y0
    pad = int(max(bw, bh) * pad_ratio)
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(image.width, x1 + pad)
    y1 = min(image.height, y1 + pad)
    return image.crop((x0, y0, x1, y1))


def main() -> None:
    root = Path(__file__).resolve().parent
    logo_dir = root / "LOGO"
    optimized_dir = logo_dir / "optimized"
    normalized_dir = logo_dir / "normalized"
    normalized_dir.mkdir(exist_ok=True)

    plain = {
        "HRS": optimized_dir / "HRS.png",
        "MEIJI": optimized_dir / "MEIJI.png",
        "ANGST+PFISTER": optimized_dir / "ANGST+PFISTER.png",
        "NOLATO": optimized_dir / "NOLATO.png",
    }
    for key, src in plain.items():
        if not src.exists():
            continue
        image = Image.open(src).convert("RGBA")
        bg = sample_background_rgb(image)
        normalized = crop_to_alpha(alpha_from_background(image, bg, diff_mul=6), pad_ratio=0.18)
        normalized.save(normalized_dir / f"{key}.png")

    force_src = optimized_dir / "福斯集团.png"
    if force_src.exists():
        image = Image.open(force_src).convert("RGBA")
        bg = sample_background_rgb(image)
        normalized = crop_to_alpha(alpha_from_background(image, bg, recolor_rgb=bg, diff_mul=5), pad_ratio=0.2)
        normalized.save(normalized_dir / "福斯集团.png")


if __name__ == "__main__":
    main()
