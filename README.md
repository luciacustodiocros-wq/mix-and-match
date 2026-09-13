# Mi Armario Visual

Armario digital visual con mis propias prendas — galería, Mix & Match, favoritos y análisis.

## Estado actual del proyecto

✅ Todas las fases de código están completas: galería, Mix & Match, favoritos, análisis y diseño responsive.
⬜ Solo falta que subas tus fotografías reales y publiques la web (instrucciones más abajo).

## Cómo funciona la aplicación

- **Armario**: todas tus prendas en tarjetas, con buscador y filtro por categoría. Toca el ♡ para marcar una como favorita.
- **Mix & Match**: elige un pantalón y, automáticamente, los tops/básicos/americanas que NO combinan con él aparecen atenuados. Al elegir al menos dos piezas aparece el resultado con el veredicto "✓ Look válido" o "✕ Combinación no registrada".
- **Favoritos**: prendas sueltas marcadas con ♥, y looks completos guardados desde Mix & Match.
- **Análisis**: datos calculados automáticamente a partir de tus combinaciones (nunca opiniones): prendas más y menos versátiles, pantalones con menos opciones, y un bloque de "Sugerencias" claramente separado de los datos.

Los favoritos y los looks guardados se almacenan en el navegador (localStorage), así que se mantendrán aunque cierres la pestaña, pero son propios de cada dispositivo/navegador donde abras la web.

## Cómo colocar tus fotos

Todas las imágenes deben ser **.png** y llevar el nombre exacto de cada ID (así el código las encuentra automáticamente, sin tener que tocar `wardrobe.js`).

Copia cada archivo, ya renombrado, dentro de su carpeta correspondiente:

### images/pantalones/
- `levis-crema.png`
- `levis-verde.png`
- `levis-camel.png` ⚠️ **te falta esta foto**
- `vaquero.png`
- `vaquero-gris.png`
- `vaquero-camel.png`
- `vaquero-granate.png`
- `traje-marron-liso.png` ⚠️ **te falta esta foto**
- `azul.png`
- `azul-oscuro.png` ⚠️ **te falta esta foto**
- `rayas-marron.png`
- `rayas-gris.png`

### images/tops/
- `top-gris-rayas.png`
- `rayas-verde-gris.png`
- `top-blanco.png`
- `camisa-verde-rayas.png`
- `blusa-granate.png`
- `jersey-levis-gris-oscuro.png`
- `marron-cuello-barco.png`
- `gris-murcielago.png`
- `puntilla.png`
- `lacito.png`
- `jersey-negro.png`

### images/basicos/
- `basico-blanco.png`
- `basico-gris.png`
- `basico-crema.png`
- `basico-marron-chocolate.png`

### images/americanas/
- `americana-crema.png`
- `americana-marron-lisa.png`
- `americana-azul-oscuro.png`
- `americana-granate.png`
- `americana-verde-sage.png`
- `americana-marron-cuadros-negro.png`

## Cómo añadir una prenda nueva en el futuro

1. Guarda la foto en formato `.png` dentro de la carpeta de su categoría, con un nombre en minúsculas y guiones (por ejemplo `jersey-azul.png`).
2. Abre `data/wardrobe.js` y añade un objeto nuevo dentro del array de su categoría:

```javascript
{
  id: "jersey-azul",
  nombre: "Jersey azul",
  categoria: "tops",
  imagen: "images/tops/jersey-azul.png",
  combinaCon: [] // aquí van los IDs de pantalones con los que confirmes que combina
}
```

3. No hace falta tocar nada más del código.

## Publicar la web en GitHub Pages (paso a paso, sin necesidad de saber programar)

### 1. Crear una cuenta de GitHub (si no tienes)

Entra en [github.com](https://github.com) y crea una cuenta gratuita.

### 2. Crear el repositorio

1. Arriba a la derecha, pulsa el botón **+** → **New repository**.
2. En "Repository name" escribe: `mi-armario-visual`
3. Déjalo marcado como **Public** (tiene que ser público para que GitHub Pages funcione gratis).
4. NO marques "Add a README file" (ya tienes uno).
5. Pulsa **Create repository**.

### 3. Subir los archivos y carpetas

1. En la página de tu repositorio recién creado, verás un enlace que dice **uploading an existing file**. Púlsalo.
2. Descomprime en tu ordenador el archivo `mi-armario-visual.zip` que te he generado.
3. Arrastra dentro de la ventana de GitHub **todo el contenido** de la carpeta descomprimida: `index.html`, `style.css`, `app.js`, `README.md`, la carpeta `data/` completa y la carpeta `images/` completa (con las fotos que ya hayas colocado dentro).
4. Abajo, en "Commit changes", deja el mensaje que aparece por defecto y pulsa **Commit changes**.

### 4. Configurar GitHub Pages

1. En tu repositorio, ve a la pestaña **Settings** (arriba).
2. En el menú de la izquierda, pulsa **Pages**.
3. En "Branch", selecciona `main` y la carpeta `/ (root)`. Pulsa **Save**.
4. Espera uno o dos minutos. Recarga la página: arriba te aparecerá un mensaje con el enlace de tu web, algo como:
   `https://tu-usuario.github.io/mi-armario-visual/`

### 5. Abrir la aplicación desde el móvil

Abre ese enlace desde el navegador de tu móvil. Si quieres acceso rápido, en iPhone usa "Compartir → Añadir a pantalla de inicio"; en Android, el menú del navegador → "Añadir a pantalla de inicio". Así se abrirá como si fuera una app.

### 6. Subir las fotos que te faltan más adelante

1. Renombra la foto según la tabla de este README (por ejemplo `levis-camel.png`).
2. En GitHub, entra en la carpeta correspondiente dentro de `images/` (por ejemplo `images/pantalones/`).
3. Pulsa **Add file → Upload files** y sube la foto.
4. Commit changes. En un minuto, la web actualizada estará disponible en el mismo enlace (puede que tengas que refrescar con Ctrl+F5 / Cmd+Shift+R para forzar la recarga).

### 7. Actualizar prendas o combinaciones en el futuro

1. En GitHub, entra en `data/wardrobe.js`.
2. Pulsa el icono del lápiz (editar) arriba a la derecha del archivo.
3. Haz el cambio (añadir una prenda nueva, o pídeme que te dé el archivo actualizado y sustitúyelo entero).
4. Commit changes.

## Reglas del proyecto (no las olvides)

- Las combinaciones NUNCA se inventan: solo existen si están registradas en `combinaCon`.
- Si una combinación no está registrada, la aplicación debe mostrar "Combinación no registrada", nunca como válida.
- Los IDs no se cambian una vez creados, porque otras prendas los referencian.
