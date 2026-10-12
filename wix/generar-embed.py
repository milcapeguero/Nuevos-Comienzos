"""Genera una versión autocontenida (CSS y logos incrustados) para pegar en un elemento «Insertar HTML» de Wix.
Uso: python3 wix/generar-embed.py mensajes/la-mejor-inversion.html wix/la-mejor-inversion-embed.html [URL_PUBLICA]
"""
import base64, re, sys

src, dst = sys.argv[1], sys.argv[2]
url = sys.argv[3] if len(sys.argv) > 3 else ""
s = open(src, encoding="utf-8").read()
css = open("assets/mensaje.css", encoding="utf-8").read()

s = s.replace('<link rel="stylesheet" href="../assets/mensaje.css">', "<style>\n" + css + "\n</style>")
s = re.sub(r'\s*<link rel="icon"[^>]*>', "", s)
for n in ("blanco", "azul"):
    d = base64.b64encode(open(f"assets/logo-{n}.svg", "rb").read()).decode()
    s = s.replace(f"../assets/logo-{n}.svg", "data:image/svg+xml;base64," + d)
s = s.replace("<script>\n(function () {", f'<script>window.NC_SHARE_URL = "{url}";</script>\n<script>\n(function () {{', 1)
assert "../assets" not in s
open(dst, "w", encoding="utf-8").write(s)
print(len(s), "bytes")
