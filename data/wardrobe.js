/* ============================================================
   MI ARMARIO VISUAL — BASE DE DATOS DE PRENDAS
   ============================================================
   ESTE ARCHIVO ES LA FUENTE DE VERDAD DE LA APLICACIÓN.

   Reglas de mantenimiento:
   - NO inventes combinaciones nuevas. Si quieres añadir una,
     añádela tú misma en el array "combinaCon" correspondiente.
   - Cada prenda necesita: id, nombre, categoria, imagen.
   - Los IDs deben ser únicos y no deben cambiarse una vez creados,
     porque otras prendas los referencian dentro de "combinaCon".
   - Las imágenes deben colocarse en la ruta indicada en "imagen".
   ============================================================ */

const wardrobe = {

  // ==========================================================
  // PANTALONES / PARTES DE ABAJO
  // ==========================================================
  pantalones: [
    { id: "levis-crema",        nombre: "Levi's crema",        categoria: "pantalones", imagen: "images/pantalones/levis-crema.png" },
    { id: "levis-verde",        nombre: "Levi's verde",        categoria: "pantalones", imagen: "images/pantalones/levis-verde.png" },
    { id: "levis-camel",        nombre: "Levi's camel",        categoria: "pantalones", imagen: "images/pantalones/levis-camel.png" },
    { id: "vaquero",            nombre: "Vaquero",             categoria: "pantalones", imagen: "images/pantalones/vaquero.png" },
    { id: "vaquero-gris",       nombre: "Vaquero gris",        categoria: "pantalones", imagen: "images/pantalones/vaquero-gris.png" },
    { id: "vaquero-camel",      nombre: "Vaquero camel",       categoria: "pantalones", imagen: "images/pantalones/vaquero-camel.png" },
    { id: "vaquero-granate",    nombre: "Vaquero granate",     categoria: "pantalones", imagen: "images/pantalones/vaquero-granate.png" },
    { id: "traje-marron-liso",  nombre: "Traje marrón liso",   categoria: "pantalones", imagen: "images/pantalones/traje-marron-liso.png" },
    { id: "azul",               nombre: "Azul",                categoria: "pantalones", imagen: "images/pantalones/azul.png" },
    { id: "azul-oscuro",        nombre: "Azul oscuro",         categoria: "pantalones", imagen: "images/pantalones/azul-oscuro.png" },
    { id: "rayas-marron",       nombre: "Rayas marrón",        categoria: "pantalones", imagen: "images/pantalones/rayas-marron.png" },
    { id: "rayas-gris",         nombre: "Rayas gris",          categoria: "pantalones", imagen: "images/pantalones/rayas-gris.png" }
  ],

  // ==========================================================
  // PARTES DE ARRIBA (TOPS)
  // ==========================================================
  tops: [
    {
      id: "top-gris-rayas",
      nombre: "Top gris de rayas",
      categoria: "tops",
      imagen: "images/tops/top-gris-rayas.png",
      combinaCon: [
        "levis-crema", "levis-verde", "traje-marron-liso",
        "vaquero", "vaquero-gris", "vaquero-camel", "vaquero-granate"
      ]
    },
    {
      id: "rayas-verde-gris",
      nombre: "Rayas verde y gris",
      categoria: "tops",
      imagen: "images/tops/rayas-verde-gris.png",
      combinaCon: ["levis-crema", "vaquero", "vaquero-gris", "vaquero-camel"]
    },
    {
      id: "top-blanco",
      nombre: "Blanco",
      categoria: "tops",
      imagen: "images/tops/top-blanco.png",
      combinaCon: [
        "levis-crema", "levis-verde", "traje-marron-liso",
        "vaquero", "vaquero-gris", "rayas-marron", "rayas-gris",
        "azul-oscuro", "vaquero-camel", "vaquero-granate"
      ]
    },
    {
      id: "camisa-verde-rayas",
      nombre: "Camisa verde de rayas",
      categoria: "tops",
      imagen: "images/tops/camisa-verde-rayas.png",
      combinaCon: ["levis-crema", "levis-verde", "vaquero", "vaquero-gris", "vaquero-camel"]
    },
    {
      id: "blusa-granate",
      nombre: "Blusa granate",
      categoria: "tops",
      imagen: "images/tops/blusa-granate.png",
      combinaCon: ["levis-crema", "vaquero", "vaquero-gris", "vaquero-camel"]
    },
    {
      id: "jersey-levis-gris-oscuro",
      nombre: "Jersey Levi's gris oscuro",
      categoria: "tops",
      imagen: "images/tops/jersey-levis-gris-oscuro.png",
      combinaCon: ["levis-crema", "levis-verde", "vaquero", "vaquero-gris", "vaquero-camel"]
    },
    {
      id: "marron-cuello-barco",
      nombre: "Marrón cuello barco",
      categoria: "tops",
      imagen: "images/tops/marron-cuello-barco.png",
      combinaCon: ["levis-crema", "vaquero", "vaquero-gris", "vaquero-camel"]
    },
    {
      id: "gris-murcielago",
      nombre: "Gris murciélago",
      categoria: "tops",
      imagen: "images/tops/gris-murcielago.png",
      combinaCon: ["azul", "vaquero", "vaquero-gris", "vaquero-granate", "levis-verde"]
    },
    {
      id: "puntilla",
      nombre: "Puntilla",
      categoria: "tops",
      imagen: "images/tops/puntilla.png",
      combinaCon: [
        "levis-verde", "traje-marron-liso", "vaquero", "vaquero-gris",
        "vaquero-granate", "rayas-marron", "rayas-gris", "azul"
      ]
    },
    {
      id: "lacito",
      nombre: "Lacito",
      categoria: "tops",
      imagen: "images/tops/lacito.png",
      combinaCon: [
        "levis-crema", "levis-verde", "vaquero", "vaquero-gris",
        "vaquero-camel", "vaquero-granate"
      ]
    },
    {
      id: "jersey-negro",
      nombre: "Jersey negro",
      categoria: "tops",
      imagen: "images/tops/jersey-negro.png",
      combinaCon: ["levis-camel", "levis-verde", "vaquero-camel", "vaquero", "vaquero-gris"]
    }
  ],

  // ==========================================================
  // BÁSICOS
  // ==========================================================
  // Hay 4 básicos distintos (el "Blanco de manga corta" se
  // eliminó por completo a petición expresa: no existe en el
  // armario ni en la aplicación):
  //   1. Básico blanco     -> combina vía americana (ver lógica en app.js)
  //   2. Básico gris       -> combina vía americana
  //   3. Básico crema      -> combina vía americana
  //   4. Básico marrón chocolate -> combinaCon directo con pantalones
  // ==========================================================
  basicos: [
    {
      id: "basico-blanco",
      nombre: "Básico blanco",
      categoria: "basicos",
      imagen: "images/basicos/basico-blanco.png",
      // Combina con todas las americanas, y con los pantalones
      // que sean compatibles con la americana elegida.
      // No tiene combinaCon directo con pantalones.
      combinaConAmericanas: "todas"
    },
    {
      id: "basico-gris",
      nombre: "Básico gris",
      categoria: "basicos",
      imagen: "images/basicos/basico-gris.png",
      combinaConAmericanas: "todas"
    },
    {
      id: "basico-crema",
      nombre: "Básico crema",
      categoria: "basicos",
      imagen: "images/basicos/basico-crema.png",
      combinaConAmericanas: "todas"
    },
    {
      id: "basico-marron-chocolate",
      nombre: "Básico marrón chocolate",
      categoria: "basicos",
      imagen: "images/basicos/basico-marron-chocolate.png",
      // Este básico SÍ tiene combinaCon directo con pantalones,
      // confirmado explícitamente (no sigue la lógica de "todas las americanas").
      combinaCon: [
        "levis-camel", "vaquero-camel", "levis-verde",
        "vaquero", "vaquero-gris", "levis-crema"
      ]
    }
  ],

  // ==========================================================
  // AMERICANAS
  // ==========================================================
  // La "Americana negra corta" se ha eliminado por completo
  // a petición expresa: no se usa y no tiene combinaciones.
  // ==========================================================
  americanas: [
    {
      id: "americana-crema",
      nombre: "Americana crema",
      categoria: "americanas",
      imagen: "images/americanas/americana-crema.png",
      combinaCon: [
        "levis-crema", "levis-verde", "vaquero",
        "vaquero-gris", "vaquero-granate", "traje-marron-liso"
      ]
    },
    {
      id: "americana-marron-lisa",
      nombre: "Americana marrón lisa",
      categoria: "americanas",
      imagen: "images/americanas/americana-marron-lisa.png",
      combinaCon: ["levis-camel", "vaquero-camel", "vaquero", "vaquero-gris", "vaquero-granate"]
    },
    {
      id: "americana-azul-oscuro",
      nombre: "Americana azul oscuro",
      categoria: "americanas",
      imagen: "images/americanas/americana-azul-oscuro.png",
      combinaCon: ["levis-camel", "vaquero-camel", "vaquero", "vaquero-gris"]
    },
    {
      id: "americana-granate",
      nombre: "Americana granate",
      categoria: "americanas",
      imagen: "images/americanas/americana-granate.png",
      combinaCon: ["levis-camel", "vaquero-camel", "vaquero", "vaquero-gris"]
    },
    {
      id: "americana-verde-sage",
      nombre: "Americana verde sage",
      categoria: "americanas",
      imagen: "images/americanas/americana-verde-sage.png",
      combinaCon: ["levis-camel", "vaquero-camel", "vaquero", "vaquero-gris", "levis-verde"]
    },
    {
      id: "americana-marron-cuadros-negro",
      nombre: "Americana marrón cuadros con negro",
      categoria: "americanas",
      imagen: "images/americanas/americana-marron-cuadros-negro.png",
      combinaCon: ["levis-camel", "vaquero-camel", "vaquero", "vaquero-gris", "traje-marron-liso"]
    }
  ]
};

// Exportado para uso en app.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = wardrobe;
}
