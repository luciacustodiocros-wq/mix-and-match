# Armario · mix & match

Un armario visual estático (HTML/CSS/JS, sin frameworks ni build) para ver tus
prendas y sus combinaciones, basado en tu `GUIA_ARMARIO.md`.

Qué hace:

- **Explorar** — todas tus prendas agrupadas por tipo (pantalones, partes de
  arriba, básicas, americanas). Las 8 fotos que subiste ya están cargadas;
  el resto aparece como tarjeta de texto hasta que le añadas foto.
- **Combinar** — elige un pantalón y mira qué partes de arriba combinan según
  tu guía (marcadas en verde). Puedes tocar cualquier otra prenda para
  añadirla como combinación propia (se marca en ámbar) — se guarda en tu
  navegador.
- **Matriz completa** — la tabla general de la guía en una sola vista.
- **Añadir prenda** — sube una foto nueva y una categoría; se guarda en tu
  navegador (`localStorage`), no en el repositorio, hasta que la incorpores
  a `js/data.js` a mano (ver más abajo).

## Ver el armario en tu ordenador

No hace falta instalar nada. Basta con abrir `index.html` con doble clic, o
si prefieres servirlo localmente:

```bash
cd armario-mixmatch
python3 -m http.server 8000
# abre http://localhost:8000
```

## Subirlo a GitHub

1. Crea un repositorio nuevo y vacío en GitHub (sin README ni .gitignore,
   para evitar conflictos): botón **New repository** en
   [github.com/new](https://github.com/new). Llámalo, por ejemplo,
   `armario-mixmatch`.

2. Desde esta carpeta, en tu terminal:

   ```bash
   cd armario-mixmatch
   git init
   git add .
   git commit -m "Armario visual mix & match"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/armario-mixmatch.git
   git push -u origin main
   ```

   (Sustituye `TU-USUARIO` por tu usuario de GitHub. Si te pide credenciales,
   usa un [token de acceso personal](https://github.com/settings/tokens) en
   vez de tu contraseña.)

3. (Opcional) Para verlo publicado en una URL, activa **GitHub Pages**:
   *Settings → Pages → Branch: `main` / carpeta `/ (root)` → Save*.
   En un par de minutos estará en
   `https://TU-USUARIO.github.io/armario-mixmatch/`.

## Añadir una prenda nueva "de verdad" (al repositorio)

Lo que subes desde la pestaña **Añadir prenda** solo vive en tu navegador.
Para que quede en el repositorio y lo veas desde cualquier dispositivo:

1. Guarda la foto en `images/<categoria>/nombre-prenda.webp` (recomendado:
   fondo blanco, ancho ~700px, formato `.webp` para que pese poco).
2. Abre `js/data.js` y añade una línea al array `WARDROBE`, por ejemplo:

   ```js
   { id: "top-nuevo", nombre: "Cárdigan mostaza", categoria: "arriba", imagen: "images/arriba/cardigan-mostaza.webp" },
   ```

3. Si ya sabes con qué pantalones combina, añade las parejas correspondientes
   al array `COMPATIBILITY`:

   ```js
   { top: "top-nuevo", abajo: "vaquero", verificado: true },
   ```

4. `git add . && git commit -m "Añade cárdigan mostaza" && git push`.

## Estructura del proyecto

```
armario-mixmatch/
├── index.html
├── css/styles.css
├── js/
│   ├── data.js      ← tus prendas y la matriz de compatibilidad
│   └── app.js        ← toda la lógica de la app
├── images/
│   └── pantalones/   ← las 8 fotos que subiste, ya optimizadas a .webp
└── GUIA_ARMARIO.md    ← tu guía original, para referencia
```

## Nota sobre los nombres de archivo de las fotos subidas

Los mapeé a la guía por el nombre de archivo y el color de cada foto; revisa
que estas asignaciones sean correctas y corrígelas en `js/data.js` si no:

| Archivo subido       | Prenda asignada     |
|-----------------------|----------------------|
| `levis_crema.png`     | Levi's crema         |
| `verde_levis.png`     | Levi's verde         |
| `vaquero.png`         | Vaquero              |
| `vaquero_gris.png`    | Vaquero gris         |
| `vaquero_granate.png` | Vaquero granate      |
| `azul.png`            | Azul oscuro          |
| `rallas_marron.png`   | Traje marrón liso    |
| `rayas_gris.png`      | Azul                 |

Las dos últimas son las que más dudas me generan (una es una raya diplomática
gris/antracita y otra es un traje de raya marrón, no liso), así que
confírmalas cuando tengas un momento.

## La guía completa no cabía entera

El documento que compartiste se corta a mitad de la sección de "Levi's
camel", así que la matriz de compatibilidad y las notas de diagnóstico solo
están completas para lo que llegó en el texto. En cuanto tengas el resto de
la guía (vaquero, vaquero gris, camel, traje marrón, azul, azul oscuro,
básicas y americanas), lo añadimos a `js/data.js` siguiendo el mismo patrón.
