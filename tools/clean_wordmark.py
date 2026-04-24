from collections import deque
from pathlib import Path

from PIL import Image


SRC = Path(r"c:\Users\marya\Downloads\Althuraya Invtations Website\assets\brand\althuraya-wordmark-source.png")
DST = Path(r"c:\Users\marya\Downloads\Althuraya Invtations Website\assets\brand\althuraya-wordmark.png")


img = Image.open(SRC).convert("RGBA")
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
    if r <= 20 and g <= 20 and b <= 20:
        pixels[x, y] = (r, g, b, 0)
        add(x + 1, y)
        add(x - 1, y)
        add(x, y + 1)
        add(x, y - 1)

bbox = img.getbbox()
img = img.crop(bbox)
img.save(DST)
print(img.size)
