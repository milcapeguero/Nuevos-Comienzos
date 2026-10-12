# Publicar un mensaje como post nativo en Wix

Qué se conserva del diseño y qué no:

| Se conserva (como imagen) | Se adapta (texto nativo de Wix) |
| --- | --- |
| Portada con título, logo y cintas | Párrafos, listas y citas |
| Banda azul de cada sección | Negritas y enlaces |
| Banda de cada punto (número grande + título) | |
| Panel de la idea central y preguntas finales | |
| 10 tarjetas de frases (también sirven para redes) | |

Se pierde: las tarjetas de pasajes y la cabecera fija de cada punto. El texto usa la tipografía y los colores del tema de tu sitio en Wix.

## Archivos

```
wix/la-mejor-inversion/01-portada.png                      1920×1080  portada del post
wix/la-mejor-inversion/s1-pasajes … s5-cierre.png          1600×420   5 bandas de sección
wix/la-mejor-inversion/punto-01 … punto-15.png             1600×340   15 bandas de punto
wix/la-mejor-inversion/02-idea-central.png                 1600×900   panel
wix/la-mejor-inversion/03-pregunta-personal.png            1600×900   panel
wix/la-mejor-inversion/04-pregunta-final.png               1600×900   panel
wix/la-mejor-inversion/frase-01 … frase-10.png             1080×1080  galería y redes
wix/la-mejor-inversion-post.html                           el texto para pegar
```

## Pasos

1. **Sube todas las imágenes de una vez** a la biblioteca de medios de Wix (Medios → Subir). Así luego solo las eliges.
2. **Crea el post.** Blog → Crear nueva entrada. Escribe el título «La mejor inversión» y sube `01-portada.png` como imagen de portada.
3. **Pega el texto desde la página abierta, no desde el código.**
   - Abre `la-mejor-inversion-post.html` en el navegador (doble clic).
   - Selecciona todo con Ctrl/Cmd + A, copia y pega en el cuerpo del post.
   - **No pegues el código fuente.** Si lo haces, Wix lo convierte en un bloque «Editar HTML» y el texto se ve sin estilo, en Times.
   - Si queda alguna fuente o tamaño raro, selecciona el texto y pulsa «Borrar formato».
4. **Coloca las imágenes.** El texto trae 25 líneas amarillas `[IMAGEN: …]`. Para cada una:
   - Pon el cursor en esa línea → **+** → **Imagen** (o **Galería** para las 10 frases) → elige el archivo indicado.
   - Copia el «Texto alternativo» de la línea al campo de texto alternativo de la imagen.
   - Borra la línea amarilla.
5. **Revisa** la vista previa en móvil y en escritorio.
6. **Ajustes finales:** categoría («Bajo nueva administración»), etiquetas, extracto y fecha. Luego publica.

## Textos alternativos de las frases

1. ¿Qué estás haciendo con lo que Dios depositó en ti?
2. Su gracia nos capacita mucho más allá de nuestras limitaciones.
3. Compararte es la ruta perfecta para desviarte del propósito de Dios.
4. El diseño con el que Él te hizo es el que va a responder a eso que Él quiere hacer.
5. A veces el Padre necesita ver la disposición de nosotros para poder entregarte la asignación.
6. Nuestro diseño responde a una necesidad en el plan del Señor.
7. Ellas están donde las cosas ocurren, pero no son parte de que las cosas ocurran.
8. Deja de mirar a los lados y comprende que tú tienes todo lo necesario.
9. Podemos usar nuestros dones, talentos y habilidades para construir nuestro propio reino o podemos usarlo para el servicio del reino de los cielos. ¿En qué te vas a invertir?
10. La más grande inversión ya Él la hizo cuando envió a Su único Hijo a morir por nosotros en la cruz.

## Para el próximo mensaje

1. Crea `mensajes/<nombre>.html` (ver `ESTILO-MENSAJES.md`).
2. Copia `wix/la-mejor-inversion.json` con los textos del nuevo mensaje (título, predicadora, serie, paneles y frases).
3. Genera las imágenes y el texto:

```
node wix/generar-imagenes.js wix/<nombre>.json
python3 wix/generar-texto.py mensajes/<nombre>.html wix/<nombre>-post.html <carpeta>
```

El generador de imágenes necesita Node con Playwright y conexión para cargar las fuentes de Google Fonts. El de texto necesita Python con `beautifulsoup4`.
