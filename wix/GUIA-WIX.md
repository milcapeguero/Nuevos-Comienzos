# Publicar un mensaje como post nativo en Wix

Qué se conserva del diseño y qué no:

| Se conserva (como imagen) | Se adapta (formato nativo de Wix) |
| --- | --- |
| Portada con título, logo y cintas | Títulos de sección → Título 2 |
| Panel de la idea central | Puntos numerados → Título 3 |
| Preguntas finales | Citas de los puntos → Cita |
| 10 tarjetas de frases (también sirven para redes) | Pasajes, aplicaciones y definiciones → listas |

Se pierde: los fondos por sección, las tarjetas de pasajes, los números grandes y la cabecera fija de cada punto. El tema de tu sitio en Wix decide la tipografía y los colores del texto.

## Archivos

```
wix/la-mejor-inversion/01-portada.png            1920×1080  → portada del post
wix/la-mejor-inversion/02-idea-central.png       1600×900   → dentro del post
wix/la-mejor-inversion/03-pregunta-personal.png  1600×900   → dentro del post
wix/la-mejor-inversion/04-pregunta-final.png     1600×900   → dentro del post
wix/la-mejor-inversion/frase-01 … frase-10.png   1080×1080  → galería del post y redes
wix/la-mejor-inversion-post.html                 el texto con formato para pegar
```

## Pasos

1. **Crea el post.** En Wix: Blog → Crear nueva entrada. Escribe el título «La mejor inversión».
2. **Portada.** Sube `01-portada.png` como imagen de portada.
3. **Pega el texto.**
   - Abre `la-mejor-inversion-post.html` en el navegador (doble clic).
   - Selecciona todo (Ctrl/Cmd + A), copia y pega en el cuerpo del post.
   - Los títulos, las listas, las citas y las negritas se conservan. Si Wix mantiene alguna fuente o tamaño raro, selecciona el texto y pulsa «Borrar formato».
4. **Coloca las imágenes.** En el texto hay líneas amarillas `[IMAGEN: …]`. Para cada una:
   - Pon el cursor en esa línea → botón **+** → **Imagen** (o **Galería** para las frases) → sube el archivo indicado.
   - Copia el «Texto alternativo» que aparece en la línea al campo de texto alternativo de la imagen.
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
