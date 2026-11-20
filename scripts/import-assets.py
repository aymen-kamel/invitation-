"""Import generated visuals into openings/<template-id>/.

Usage:  python scripts/import-assets.py <source-folder>
Source folder holds one sub-folder per template (jasmin/, sidi-bou/, ...) with
closed.webp, bg.webp, seal.png and optionally open.mp4.

- closed.webp / bg.webp: re-encoded to WebP q80 at max 1080x1920.
- seal.png: background colour (sampled from the corners) keyed out to transparency,
  cropped to the ornament and saved as seal.webp (512px, alpha).
- open.mp4 is copied as-is (compress it first, see research/image-prompts.md).
"""
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

ALIASES = {
    'baby-farha': 'baby', 'blush-minimal': 'blush', 'henna-night': 'henna', 'medina-nights': 'medina',
    'monogram-ivory': 'monogram', 'sidi-bou': 'sidibou',
}
ROOT = Path(__file__).resolve().parent.parent / 'openings'
ENHANCE = '--enhance' in sys.argv


def enhance(im: Image.Image) -> Image.Image:
    """Recover some crispness on upscaled sources: denoise lightly, then sharpen and lift colour."""
    im = im.filter(ImageFilter.MedianFilter(3))
    im = im.filter(ImageFilter.UnsharpMask(radius=2.4, percent=140, threshold=2))
    im = im.filter(ImageFilter.UnsharpMask(radius=0.8, percent=60, threshold=1))
    im = ImageEnhance.Contrast(im).enhance(1.06)
    return ImageEnhance.Color(im).enhance(1.08)


def key_out_background(img: Image.Image, tol: int = 34) -> Image.Image:
    """Remove the backdrop by flood-filling from the borders (keeps light areas inside the ornament)."""
    from collections import deque
    img = img.convert('RGB')
    w, h = img.size
    soft = img.filter(ImageFilter.GaussianBlur(1.6)).load()
    border = [soft[x, y] for x in range(0, w, 7) for y in (0, h - 1)] + [soft[x, y] for y in range(0, h, 7) for x in (0, w - 1)]
    bg = tuple(sorted(c[i] for c in border)[len(border) // 2] for i in range(3))
    # local background drift (vignetting / soft shadows): compare to neighbour too
    seen = bytearray(w * h)
    q = deque()
    for x in range(w):
        q.append((x, 0)); q.append((x, h - 1))
    for y in range(h):
        q.append((0, y)); q.append((w - 1, y))
    near = lambda c, ref, t: max(abs(c[0] - ref[0]), abs(c[1] - ref[1]), abs(c[2] - ref[2])) < t
    while q:
        x, y = q.popleft()
        i = y * w + x
        if seen[i]:
            continue
        c = soft[x, y]
        if not near(c, bg, tol + 22):
            continue
        seen[i] = 1
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx] and near(soft[nx, ny], c, 9):
                q.append((nx, ny))
    mask = Image.new('L', (w, h))
    mask.putdata([0 if s else 255 for s in seen])
    mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.1))
    out = img.convert('RGBA')
    out.putalpha(mask)
    bbox = mask.point(lambda v: 255 if v > 24 else 0).getbbox()
    if bbox:
        pad = 8
        out = out.crop((max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(w, bbox[2] + pad), min(h, bbox[3] + pad)))
    return out


def main(src: Path) -> None:
    for folder in sorted(p for p in src.iterdir() if p.is_dir()):
        tid = ALIASES.get(folder.name, folder.name)
        dest = ROOT / tid
        dest.mkdir(parents=True, exist_ok=True)
        for name in ('closed', 'bg'):
            f = folder / f'{name}.webp'
            if f.exists():
                im = Image.open(f).convert('RGB')
                im.thumbnail((1080, 1920))
                if ENHANCE:
                    im = enhance(im)
                im.save(dest / f'{name}.webp', 'WEBP', quality=80, method=6)
        seal = folder / 'seal.png'
        if seal.exists():
            im = Image.open(seal).convert('RGB')
            im.thumbnail((512, 512))
            if ENHANCE:
                im = enhance(im)
            key_out_background(im).save(dest / 'seal.webp', 'WEBP', quality=85, method=6)
        mp4 = folder / 'open.mp4'
        if mp4.exists():
            shutil.copyfile(mp4, dest / 'open.mp4')
        sizes = ', '.join(f'{p.name} {p.stat().st_size // 1024}K' for p in sorted(dest.iterdir()))
        print(f'{tid:10s} {sizes}')


if __name__ == '__main__':
    main(Path(next(a for a in sys.argv[1:] if not a.startswith('--'))))
