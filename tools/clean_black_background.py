from collections import deque
from pathlib import Path
import sys

from PIL import Image


def main() -> int:
    if len(sys.argv) < 3:
        print("usage: clean_black_background.py <src> <dst> [crop]")
        return 1

    src = Path(sys.argv[1])
    dst = Path(sys.argv[2])
    crop = len(sys.argv) > 3 and sys.argv[3].lower() == "crop"

    img = Image.open(src).convert("RGBA")
    pixels = img.load()
    w, h = img.size

    seen = set()
    queue = deque()

    def add(x: int, y: int) -> None:
      if 0 <= x < w and 0 <= y < h and (x, y) not in seen:
        seen.add((x, y))
        queue.append((x, y))

    for x in range(w):
        add(x, 0)
        add(x, h - 1)

    for y in range(h):
        add(0, y)
        add(w - 1, y)

    while queue:
        x, y = queue.popleft()
        r, g, b, a = pixels[x, y]
        if a > 0 and r <= 20 and g <= 20 and b <= 20:
            pixels[x, y] = (r, g, b, 0)
            add(x + 1, y)
            add(x - 1, y)
            add(x, y + 1)
            add(x, y - 1)

    if crop:
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)

    img.save(dst)
    print(img.size)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
