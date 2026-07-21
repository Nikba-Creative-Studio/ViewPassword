#!/usr/bin/env python3
"""Generate ViewPassword PNG icons without external libraries.

Draws a simple "eye" glyph on a rounded blue background at 16/48/128 px.
Run:  python3 icons/make_icons.py
"""
import math
import os
import struct
import zlib

BG = (10, 132, 255)      # iOS blue
FG = (255, 255, 255)     # white eye
PUPIL = (10, 132, 255)   # pupil matches background


def rounded_alpha(x, y, w, h, r):
    """Return True if pixel (x,y) is inside a rounded rectangle."""
    if r <= 0:
        return True
    cx = min(max(x, r), w - 1 - r)
    cy = min(max(y, r), h - 1 - r)
    return (x - cx) ** 2 + (y - cy) ** 2 <= r * r


def blend(dst, src, a):
    return tuple(round(d * (1 - a) + s * a) for d, s in zip(dst, src))


def make(size):
    r = round(size * 0.22)
    cx, cy = size / 2.0, size / 2.0
    eye_w = size * 0.34   # horizontal radius of eye almond
    eye_h = size * 0.20   # vertical radius of eye almond
    pupil_r = size * 0.11
    px = [[(255, 255, 255) for _ in range(size)] for _ in range(size)]
    alpha = [[0.0 for _ in range(size)] for _ in range(size)]

    ss = 3  # supersample for smooth edges
    for y in range(size):
        for x in range(size):
            inside = 0
            eye = 0
            pupil = 0
            for sy in range(ss):
                for sx in range(ss):
                    fx = x + (sx + 0.5) / ss
                    fy = y + (sy + 0.5) / ss
                    if rounded_alpha(fx, fy, size, size, r):
                        inside += 1
                    # Eye almond: intersection of two ellipse lobes approximated
                    ex = (fx - cx) / eye_w
                    ey = (fy - cy) / eye_h
                    if ex * ex + ey * ey <= 1.0:
                        eye += 1
                    if (fx - cx) ** 2 + (fy - cy) ** 2 <= pupil_r * pupil_r:
                        pupil += 1
            n = ss * ss
            a_in = inside / n
            if a_in > 0:
                alpha[y][x] = a_in
                color = BG
                a_eye = eye / n
                if a_eye > 0:
                    color = blend(color, FG, a_eye)
                a_pupil = pupil / n
                if a_pupil > 0:
                    color = blend(color, PUPIL, a_pupil)
                px[y][x] = color
    return px, alpha


def write_png(path, px, alpha):
    size = len(px)
    raw = bytearray()
    for y in range(size):
        raw.append(0)  # filter type 0
        for x in range(size):
            r, g, b = px[y][x]
            a = round(alpha[y][x] * 255)
            raw += bytes((r, g, b, a))

    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        c += struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
        return c

    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    idat = zlib.compress(bytes(raw), 9)
    with open(path, "wb") as f:
        f.write(sig)
        f.write(chunk(b"IHDR", ihdr))
        f.write(chunk(b"IDAT", idat))
        f.write(chunk(b"IEND", b""))


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    for size in (16, 48, 128):
        px, alpha = make(size)
        out = os.path.join(here, f"icon{size}.png")
        write_png(out, px, alpha)
        print("wrote", out)


if __name__ == "__main__":
    main()
