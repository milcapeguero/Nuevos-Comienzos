"""Convierte mensajes/<mensaje>.html en un HTML semántico (sin estilos) para pegar en el editor de Wix.
Uso: python3 wix/generar-texto.py mensajes/la-mejor-inversion.html wix/la-mejor-inversion-post.html la-mejor-inversion
"""
import re
import sys
from bs4 import BeautifulSoup

src, dst, carpeta = sys.argv[1], sys.argv[2], sys.argv[3]
soup = BeautifulSoup(open(src, encoding="utf-8").read(), "html.parser")
out = []

def txt(el):
    t = " ".join(el.get_text(" ", strip=True).split())
    return re.sub(r"\s+([:;,.?»])", r"\1", t)

def inner(el):
    return "".join(str(c) for c in el.children).strip()

def marker(archivo, nota):
    out.append(f'<p style="background:#fff3b0"><strong>[IMAGEN: {carpeta}/{archivo}]</strong> {nota}</p>')

hero = soup.select_one(".nc-hero")
marker("01-portada.png", "Súbela como imagen de portada del post y bórrala del cuerpo.")
metas = {m.dt.get_text(strip=True): m.dd.get_text(strip=True) for m in hero.select(".nc-meta")}
out.append(f'<p><strong>Serie:</strong> {metas["Serie"]}<br><strong>Predicadora:</strong> {metas["Predicadora"]}</p>')

for sec in soup.select("main > section"):
    sid = sec["id"]
    h2 = sec.select_one("h2")
    out.append(f"<h2>{txt(h2)}</h2>")

    if sid == "pasajes":
        out.append("<ul>")
        for v in sec.select(".nc-verse"):
            out.append(f'<li><strong>{txt(v.select_one(".nc-verse__ref"))}</strong> — {txt(v.p)}</li>')
        out.append("</ul>")
        out.append(f'<p>{txt(sec.select_one(".nc-bridge"))}</p>')

    elif sid == "idea":
        marker("02-idea-central.png", "Contiene la frase central. Texto alternativo: " + txt(sec.select_one(".nc-idea__lead")))
        for p in sec.select(".nc-idea__cols p"):
            out.append(f"<p>{inner(p)}</p>")

    elif sid == "puntos":
        for li in sec.select(".nc-point"):
            num = li.select_one(".nc-point__num").get_text(strip=True).lstrip("0")
            out.append(f'<h3>{num}. {txt(li.select_one(".nc-point__title"))}</h3>')
            for el in li.select_one(".nc-point__body").find_all(recursive=False):
                if el.name == "p":
                    out.append(f"<p>{inner(el)}</p>")
                elif el.name == "blockquote":
                    out.append(f"<blockquote>{txt(el)}</blockquote>")
                elif el.name == "ul":
                    out.append("<ul>")
                    for l in el.find_all("li", recursive=False):
                        s = l.find("strong")
                        if s:
                            s.extract()
                            out.append(f"<li><strong>{s.get_text(strip=True)}</strong> {txt(l)}</li>")
                        else:
                            out.append(f"<li>{txt(l)}</li>")
                    out.append("</ul>")

    elif sid == "aplicacion":
        out.append(f'<p>{txt(sec.select_one(".nc-lead"))}</p>')
        out.append("<ol>")
        for st in sec.select(".nc-step"):
            out.append(f'<li><strong>{txt(st.select_one(".nc-step__title"))}.</strong> {txt(st.p)}</li>')
        out.append("</ol>")
        marker("03-pregunta-personal.png", "Texto alternativo: " + txt(sec.select_one(".nc-question .nc-display")))
        q = sec.select_one(".nc-question")
        for p in q.find_all("p", recursive=False):
            if "nc-eyebrow" in p.get("class", []) or "nc-display" in p.get("class", []):
                continue
            out.append(f"<p>{inner(p)}</p>")

    elif sid == "frases":
        marker("frase-01.png … frase-10.png", "Súbelas como galería (o una por una). Si usas galería, bórrala aquí y colócala en su lugar.")

    elif sid == "cierre":
        for p in sec.select(".nc-prose p"):
            out.append(f"<p>{inner(p)}</p>")
        marker("04-pregunta-final.png", "Texto alternativo: " + txt(sec.select_one(".nc-cierre__ask .nc-display")))
        out.append("<p><strong>Comparte este mensaje.</strong></p>")

html = f"""<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Post para Wix</title></head>
<body>
{chr(10).join(out)}
</body></html>
"""
open(dst, "w", encoding="utf-8").write(html)
print(len(out), "bloques")
