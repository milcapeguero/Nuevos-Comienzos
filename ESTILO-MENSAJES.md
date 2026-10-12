# Estilo para resúmenes de mensajes · Nuevos Comienzos

Sistema de diseño para publicar los resúmenes de las predicaciones como página web.
Se apoya en la **Guía de Estilo para la creación de contenido** y en el kit de logos.

```
assets/mensaje.css          ← el estilo (tokens + componentes, prefijo nc-)
assets/logo-blanco.svg      ← logo vectorial para fondos azules
assets/logo-azul.svg        ← logo vectorial para fondos claros
mensajes/<nombre>.html      ← un archivo por mensaje
```

Ejemplo completo: `mensajes/la-mejor-inversion.html`.

## Principios (de la guía de estilo)

| Tema | Regla |
| --- | --- |
| Tipografía principal | **Oswald**: titulares, citas y llamados a la acción. Mayúsculas en titulares. |
| Tipografía secundaria | **Montserrat**: cuerpo del texto e información detallada. |
| Color | Azul «Neo» `#016d9e` (acento) · Grafito `#3b3d3a` (texto) · Gris `#ececec` (fondos claros). |
| Fondo azul | Degradado azul con grano y cintas translúcidas, como en la guía. |
| Tono | Inspiracional y devocional: cálido, esperanzador, reflexivo. |
| Identidad | El logo aparece en la portada y en el pie, de forma sutil pero visible. |
| Llamado a la acción | Un CTA explícito al final («Comparte este mensaje»). |

## Ritmo de la página

Alterna fondos para que la lectura larga respire:

`Portada (azul)` → `Pasajes (claro)` → `Idea central (azul)` → `Puntos (gris)` → `Aplicación (claro)` → `Frases (azul)` → `Cierre (claro)` → `Pie (azul)`

Los fondos azules llevan texto blanco; los claros, grafito. El texto largo va siempre sobre fondo claro.

## Componentes

| Clase | Uso |
| --- | --- |
| `.nc-on-blue` | Cualquier bloque con fondo azul, grano y texto blanco. |
| `.nc-ribbons` + `<use href="#cintas">` | Cintas translúcidas decorativas (posición libre con `style`). |
| `.nc-hero` | Portada: logo, título `.nc-display`, metadatos `.nc-meta`. |
| `.nc-section` (`--paper`, `--gris`) | Sección con encabezado `.nc-section__head` (icono, `.nc-eyebrow`, `.nc-h2`). |
| `.nc-verses` / `.nc-verse` | Tarjetas de pasajes bíblicos. |
| `.nc-bridge` | Frase de enlace bajo las tarjetas. |
| `.nc-idea__lead`, `.nc-idea__cols` | Idea central: frase grande y dos columnas de apoyo. |
| `.nc-points` / `.nc-point` | Punto numerado: cabecera fija a la izquierda, cuerpo a la derecha. |
| `.nc-pull` | Cita destacada dentro de un punto (`<blockquote>`). |
| `.nc-defs` / `.nc-def` | Definiciones comparadas (habilidades, talentos, dones). |
| `.nc-asks` | Preguntas encadenadas en forma de píldora. |
| `.nc-note` | Línea de cierre breve dentro de un punto. |
| `.nc-steps` / `.nc-step` | Pasos de aplicación, numerados con un contador CSS. |
| `.nc-question` | Panel azul con la pregunta personal del mensaje. |
| `.nc-quotes` / `.nc-quote` (`--hero`) | Muro de frases; `--hero` resalta una en blanco. |
| `.nc-cierre`, `.nc-cierre__ask` | Cierre con pregunta final y botón `.nc-btn`. |
| `.nc-footer` | Pie con logo y lema «Comunicamos para edificar». |

## Crear un mensaje nuevo

1. Duplica `mensajes/la-mejor-inversion.html` con el nombre del mensaje.
2. Cambia el `<title>`, la descripción, el título de la portada, la serie y la predicadora.
3. Sustituye el contenido de cada sección. Si un mensaje no tiene una sección, quita su bloque y su enlace en `.nc-nav__links`.
4. Para añadir puntos, copia un `<li class="nc-point nc-reveal">` y cambia el número (`01`, `02`…).

## Accesibilidad y uso

- Contraste mínimo AA en todos los textos (blanco sobre azul ≥ 4.6:1; grafito sobre claro ≥ 9:1).
- Navegación por teclado con foco visible; `prefers-reduced-motion` desactiva las animaciones.
- Funciona sin JavaScript (la aparición suave y el botón de compartir son mejoras).
- Se imprime limpio: la navegación y los botones se ocultan.
- Usa iconos de línea en lugar de emojis.

## Notas de diseño

- Las fuentes se cargan desde Google Fonts. Si se necesita abrir sin conexión, hay que descargarlas y servirlas localmente.
- La guía indica `#016d9e` para el azul y `#3b3d3a` para el grafito, mientras que los archivos del logo usan `#006DA1` y `#2F3533`. La interfaz usa los valores de la guía; los logos conservan los suyos.
- El kit de logos incluye `LOGO AZUL.svg`, pero es una imagen incrustada, no un vector. Por eso `logo-azul.svg` se generó a partir del vector blanco.
- Para fotografía: imágenes luminosas, naturales y centradas en personas, sin filtros oscuros (según la guía).
