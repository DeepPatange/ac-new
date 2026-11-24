"""Derive the layers of a pencil-to-life scene from one colour render.

Usage:  python3 tools/artwork/derive.py <colour.jpg|png> <id> [out_dir]

Writes into out_dir (default public/v2/scenes):
  <id>.jpg         colour scene, 1920 wide          (the "full colour" layer)
  <id>-pencil.jpg  graphite version of the same     (the "pencil world")
  <id>-mask.png    soft mask of the rendered object (the "comes alive" layer)
and updates src/components/home2/art/focus.json with the mask centroid (fx, fy in %), used to crop
the scene around its key object on portrait screens.

Pencil: greyscale -> colour-dodge sketch -> tone curve ((d - lift) / (0.97 - lift))^1.25, lift 0.38
Mask:   saturated colour or dense tone = rendered; closed, hole-filled,
        largest regions kept, feathered; exported small (480 x 270).
"""
import json
import sys
from pathlib import Path

import cv2
import numpy as np
from scipy import ndimage

W, H = 1920, 1080
MASK_W, MASK_H = 480, 270


def load(path):
    img = cv2.imread(str(path), cv2.IMREAD_COLOR)
    if img is None:
        raise SystemExit(f"cannot read {path}")
    h, w = img.shape[:2]
    # cover-fit to 1920 x 1080
    s = max(W / w, H / h)
    img = cv2.resize(img, (round(w * s), round(h * s)), interpolation=cv2.INTER_AREA if s < 1 else cv2.INTER_CUBIC)
    h, w = img.shape[:2]
    x, y = (w - W) // 2, (h - H) // 2
    return img[y : y + H, x : x + W]


def pencil(img, lift=0.38):
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255.0
    inv_blur = cv2.GaussianBlur(1.0 - g, (0, 0), sigmaX=9)
    dodge = np.clip(g / np.maximum(1.0 - inv_blur, 1e-3), 0, 1)
    # paper (dodge >= 0.97) stays pure white; lower `lift` = lighter lines
    v = np.clip((dodge - lift) / (0.97 - lift), 0, 1) ** 1.25
    # a touch of paper warmth (#f7f7f5-ish whites stay white)
    out = (v * 255).astype(np.uint8)
    return cv2.cvtColor(out, cv2.COLOR_GRAY2BGR)


def mask(img):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV).astype(np.float32)
    sat = hsv[..., 1] / 255.0
    val = hsv[..., 2] / 255.0
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255.0
    # pencil areas are thin dark lines on white: their *local mean* stays bright.
    local = cv2.GaussianBlur(g, (0, 0), sigmaX=6)
    dense = local < 0.62
    colour = (sat > 0.22) & (val > 0.12)
    m = (dense | colour).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (25, 25)))
    m = ndimage.binary_fill_holes(m).astype(np.uint8)
    lab, n = ndimage.label(m)
    if n:
        sizes = ndimage.sum(m, lab, range(1, n + 1))
        keep = [i + 1 for i, s in enumerate(sizes) if s >= max(sizes) * 0.12 and s > W * H * 0.004]
        m = np.isin(lab, keep).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
    soft = cv2.GaussianBlur(m.astype(np.float32), (0, 0), sigmaX=14)
    soft = np.clip(soft * 1.25, 0, 1)
    small = cv2.resize(soft, (MASK_W, MASK_H), interpolation=cv2.INTER_AREA)
    ys, xs = np.nonzero(m)
    fx = float(xs.mean() / W * 100) if len(xs) else 60.0
    fy = float(ys.mean() / H * 100) if len(ys) else 55.0
    coverage = float(m.mean())
    return (small * 255).astype(np.uint8), fx, fy, coverage


def main():
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    src, sid = Path(sys.argv[1]), sys.argv[2]
    out = Path(sys.argv[3]) if len(sys.argv) > 3 else Path("public/v2/scenes")
    out.mkdir(parents=True, exist_ok=True)
    img = load(src)
    cv2.imwrite(str(out / f"{sid}.jpg"), img, [cv2.IMWRITE_JPEG_QUALITY, 82, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
    cv2.imwrite(str(out / f"{sid}-pencil.jpg"), pencil(img), [cv2.IMWRITE_JPEG_QUALITY, 78, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
    m, fx, fy, cov = mask(img)
    cv2.imwrite(str(out / f"{sid}-mask.png"), m)
    fpath = Path("src/components/home2/art/focus.json")
    fpath.parent.mkdir(parents=True, exist_ok=True)
    focus = json.loads(fpath.read_text()) if fpath.exists() else {}
    focus[sid] = {"fx": round(fx, 1), "fy": round(fy, 1)}
    fpath.write_text(json.dumps(focus, indent=2) + "\n")
    print(f"{sid}: focus=({fx:.1f}%, {fy:.1f}%) mask coverage={cov:.1%}")


if __name__ == "__main__":
    main()
