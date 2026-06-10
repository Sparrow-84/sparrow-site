# /// script
# requires-python = ">=3.11"
# dependencies = ["Pillow"]
# ///
from pathlib import Path
from PIL import Image

SRC  = Path(r"C:\Users\syste\OneDrive\Desktop\TwinOaksEngagement\Sparrow Photos\Professional Promotional Photos")
DEST = Path(r"C:\Users\syste\OneDrive\Desktop\TwinOaksEngagement\sparrow-website\public\images")

tasks = [
    # Hero video poster — wide hilltop panoramic, man overlooking Corvallis at dusk
    ("SPR-6.jpg",                       "hero-poster.webp",          1920),
    # Hero image fallback — families walking, warm and human
    ("SPR-11 (Hero Pic).jpg",           "hero-community-walk.webp",  1920),
    # Twin Oaks program card — man walking through the community interior
    ("SPR-9.jpg",                       "twin-oaks/hero.webp",       1200),
    # LifeChange program card — families walking together
    ("SPR-11 (Hero Pic).jpg",           "life-change/hero.webp",     1200),
    # Additional shots for future use
    ("SPR-10.jpg",                      "twin-oaks-sign.webp",       1200),
    ("SPR-16.jpg",                      "corvallis-golden-hour.webp",1920),
    ("SPR-18 (hero pic).jpg",           "hero-sunset.webp",          1920),
    ("Twin_oaks-9169 (hero pic).jpg",   "twin-oaks-entrance.webp",    900),
    ("Twin_oaks-9201.jpg",              "twin-oaks-home.webp",        900),
]

for src_name, dest_rel, max_width in tasks:
    src_path  = SRC / src_name
    dest_path = DEST / dest_rel
    dest_path.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(src_path) as img:
        # Preserve orientation from EXIF
        img = img.convert("RGB")
        w, h = img.size
        if w > max_width:
            new_h = int(h * max_width / w)
            img = img.resize((max_width, new_h), Image.LANCZOS)
        img.save(dest_path, "WEBP", quality=82, method=6)

    kb = dest_path.stat().st_size // 1024
    print(f"OK  {dest_rel}  ({kb} KB)")

print("\nDone.")
