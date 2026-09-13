/* ============================================================
   MI ARMARIO VISUAL — LÓGICA DE LA APLICACIÓN
   ============================================================
   Todas las combinaciones se leen de data/wardrobe.js.
   Esta aplicación NUNCA inventa una combinación: si una relación
   no está en "combinaCon" (o en las propiedades especiales
   combinaConTodo / combinaConAmericanas), se trata como
   "no registrada".
   ============================================================ */

(function () {
  "use strict";

  // ----------------------------------------------------------
  // 1. DATOS Y ESTRUCTURAS AUXILIARES
  // ----------------------------------------------------------

  const TODAS_PRENDAS = [
    ...wardrobe.pantalones,
    ...wardrobe.tops,
    ...wardrobe.basicos,
    ...wardrobe.americanas
  ];

  const MAPA_PRENDAS = new Map(TODAS_PRENDAS.map((p) => [p.id, p]));

  const ETIQUETA_CATEGORIA = {
    pantalones: "Pantalón",
    tops: "Top",
    basicos: "Básico",
    americanas: "Americana"
  };

  function getPrenda(id) {
    return MAPA_PRENDAS.get(id) || null;
  }

  // ----------------------------------------------------------
  // 2. MOTOR DE COMPATIBILIDAD
  //    (única fuente de verdad: los datos de wardrobe.js)
  // ----------------------------------------------------------

  function esCompatibleTopPantalon(topId, pantalonId) {
    const top = getPrenda(topId);
    return !!(top && Array.isArray(top.combinaCon) && top.combinaCon.includes(pantalonId));
  }

  function esCompatibleAmericanaPantalon(americanaId, pantalonId) {
    const americana = getPrenda(americanaId);
    return !!(americana && Array.isArray(americana.combinaCon) && americana.combinaCon.includes(pantalonId));
  }

  // Devuelve true / false / null (null = indeterminado: falta elegir americana)
  function esCompatibleBasicoPantalon(basicoId, pantalonId, americanaIdSeleccionada) {
    const basico = getPrenda(basicoId);
    if (!basico) return false;
    if (basico.combinaConTodo) return true;
    if (Array.isArray(basico.combinaCon)) return basico.combinaCon.includes(pantalonId);
    if (basico.combinaConAmericanas === "todas") {
      if (!americanaIdSeleccionada) return null;
      return esCompatibleAmericanaPantalon(americanaIdSeleccionada, pantalonId);
    }
    return false;
  }

  // Valida el look completo comprobando únicamente las relaciones
  // que SÍ tienen una regla registrada para las prendas seleccionadas.
  function validarLook(sel) {
    const relaciones = [];

    if (sel.pantalon && sel.top) {
      relaciones.push({
        etiqueta: "Top ↔ Pantalón",
        ok: esCompatibleTopPantalon(sel.top, sel.pantalon)
      });
    }
    if (sel.pantalon && sel.americana) {
      relaciones.push({
        etiqueta: "Americana ↔ Pantalón",
        ok: esCompatibleAmericanaPantalon(sel.americana, sel.pantalon)
      });
    }
    if (sel.pantalon && sel.basico) {
      relaciones.push({
        etiqueta: "Básico ↔ Pantalón",
        ok: esCompatibleBasicoPantalon(sel.basico, sel.pantalon, sel.americana)
      });
    }

    if (relaciones.length === 0) {
      return { valido: false, relaciones, suficiente: false };
    }
    const valido = relaciones.every((r) => r.ok === true);
    return { valido, relaciones, suficiente: true };
  }

  // ----------------------------------------------------------
  // 3. FAVORITOS (localStorage)
  // ----------------------------------------------------------

  const CLAVE_FAV_PRENDAS = "armario-visual:favoritos-prendas";
  const CLAVE_FAV_LOOKS = "armario-visual:favoritos-looks";

  function leerJSON(clave, porDefecto) {
    try {
      const crudo = localStorage.getItem(clave);
      return crudo ? JSON.parse(crudo) : porDefecto;
    } catch (e) {
      return porDefecto;
    }
  }

  function escribirJSON(clave, valor) {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch (e) {
      /* almacenamiento no disponible: se ignora silenciosamente */
    }
  }

  function getFavoritosPrendas() {
    return leerJSON(CLAVE_FAV_PRENDAS, []);
  }

  function esFavoritoPrenda(id) {
    return getFavoritosPrendas().includes(id);
  }

  function alternarFavoritoPrenda(id) {
    const actuales = getFavoritosPrendas();
    const indice = actuales.indexOf(id);
    if (indice === -1) actuales.push(id);
    else actuales.splice(indice, 1);
    escribirJSON(CLAVE_FAV_PRENDAS, actuales);
  }

  function getFavoritosLooks() {
    return leerJSON(CLAVE_FAV_LOOKS, []);
  }

  function guardarLookFavorito(sel, resultado) {
    const looks = getFavoritosLooks();
    looks.unshift({
      id: "look-" + Date.now(),
      pantalon: sel.pantalon,
      top: sel.top,
      basico: sel.basico,
      americana: sel.americana,
      valido: resultado.valido
    });
    escribirJSON(CLAVE_FAV_LOOKS, looks);
  }

  function eliminarLookFavorito(lookId) {
    const looks = getFavoritosLooks().filter((l) => l.id !== lookId);
    escribirJSON(CLAVE_FAV_LOOKS, looks);
  }

  // ----------------------------------------------------------
  // 4. UTILIDADES DE RENDERIZADO
  // ----------------------------------------------------------

  function crearFotoConFallback(prenda, claseImg) {
    const wrap = document.createElement("div");
    wrap.className = claseImg + "-wrap";

    const img = document.createElement("img");
    img.src = prenda.imagen;
    img.alt = prenda.nombre;
    img.loading = "lazy";

    const placeholder = document.createElement("div");
    placeholder.className = "prenda-seleccionable__placeholder";
    placeholder.textContent = prenda.nombre;
    placeholder.hidden = true;

    img.addEventListener("error", () => {
      img.hidden = true;
      placeholder.hidden = false;
    });

    wrap.appendChild(img);
    wrap.appendChild(placeholder);
    return wrap;
  }

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  // ----------------------------------------------------------
  // 5. VISTA: NAVEGACIÓN ENTRE SECCIONES
  // ----------------------------------------------------------

  const vistas = document.querySelectorAll(".vista");
  const botonesNav = document.querySelectorAll(".nav__item");

  function irAVista(nombreVista) {
    vistas.forEach((v) => v.classList.toggle("is-activa", v.id === "vista-" + nombreVista));
    botonesNav.forEach((b) => b.classList.toggle("is-activo", b.dataset.vista === nombreVista));
    window.scrollTo(0, 0);

    if (nombreVista === "favoritos") renderFavoritos();
    if (nombreVista === "analisis") renderAnalisis();
  }

  botonesNav.forEach((b) => {
    b.addEventListener("click", () => irAVista(b.dataset.vista));
  });

  // ----------------------------------------------------------
  // 6. VISTA: ARMARIO (galería + filtros + buscador)
  // ----------------------------------------------------------

  const galeriaArmario = document.getElementById("galeria-armario");
  const galeriaVacia = document.getElementById("galeria-armario-vacio");
  const contadorArmario = document.getElementById("contador-armario");
  const buscadorInput = document.getElementById("buscador-input");
  const filtros = document.querySelectorAll(".filtro");

  let categoriaActiva = "todos";

  function crearTarjetaPrenda(prenda) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-prenda";

    const fotoWrap = crearFotoConFallback(prenda, "tarjeta-prenda__foto");
    fotoWrap.className = "tarjeta-prenda__foto-wrap";
    fotoWrap.querySelector(".prenda-seleccionable__placeholder").className = "tarjeta-prenda__placeholder";

    const info = document.createElement("div");
    info.className = "tarjeta-prenda__info";
    info.innerHTML =
      '<p class="tarjeta-prenda__nombre"></p>' +
      '<p class="tarjeta-prenda__categoria"></p>';
    info.querySelector(".tarjeta-prenda__nombre").textContent = prenda.nombre;
    info.querySelector(".tarjeta-prenda__categoria").textContent = ETIQUETA_CATEGORIA[prenda.categoria];

    const botonFav = document.createElement("button");
    botonFav.className = "tarjeta-prenda__favorito";
    botonFav.setAttribute("aria-label", "Marcar como favorito");
    const actualizarIconoFav = () => {
      const esFav = esFavoritoPrenda(prenda.id);
      botonFav.textContent = esFav ? "♥" : "♡";
      botonFav.classList.toggle("is-favorito", esFav);
    };
    actualizarIconoFav();
    botonFav.addEventListener("click", () => {
      alternarFavoritoPrenda(prenda.id);
      actualizarIconoFav();
    });

    tarjeta.appendChild(fotoWrap);
    tarjeta.appendChild(info);
    tarjeta.appendChild(botonFav);
    return tarjeta;
  }

  function renderArmario() {
    const textoBusqueda = normalizar(buscadorInput.value.trim());

    const prendasFiltradas = TODAS_PRENDAS.filter((p) => {
      const pasaCategoria = categoriaActiva === "todos" || p.categoria === categoriaActiva;
      const pasaBusqueda = textoBusqueda === "" || normalizar(p.nombre).includes(textoBusqueda);
      return pasaCategoria && pasaBusqueda;
    });

    galeriaArmario.innerHTML = "";
    prendasFiltradas.forEach((p) => galeriaArmario.appendChild(crearTarjetaPrenda(p)));

    galeriaVacia.hidden = prendasFiltradas.length !== 0;
    contadorArmario.textContent =
      prendasFiltradas.length + (prendasFiltradas.length === 1 ? " prenda" : " prendas");
  }

  filtros.forEach((boton) => {
    boton.addEventListener("click", () => {
      filtros.forEach((b) => b.classList.remove("is-activo"));
      boton.classList.add("is-activo");
      categoriaActiva = boton.dataset.categoria;
      renderArmario();
    });
  });

  buscadorInput.addEventListener("input", renderArmario);

  // ----------------------------------------------------------
  // 7. VISTA: MIX & MATCH
  // ----------------------------------------------------------

  const mm = { pantalon: null, top: null, basico: null, americana: null };

  const contMmPantalones = document.getElementById("mm-pantalones");
  const contMmTops = document.getElementById("mm-tops");
  const contMmBasicos = document.getElementById("mm-basicos");
  const contMmAmericanas = document.getElementById("mm-americanas");
  const mmTopAyuda = document.getElementById("mm-top-ayuda");

  const resultadoLook = document.getElementById("resultado-look");
  const resultadoLookPrendas = document.getElementById("resultado-look-prendas");
  const resultadoLookVeredicto = document.getElementById("resultado-look-veredicto");
  const btnGuardarLook = document.getElementById("btn-guardar-look");
  const btnReiniciarLook = document.getElementById("btn-reiniciar-look");

  function crearOpcionSeleccionable(prenda, seleccionada, desactivada, onClick) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "prenda-seleccionable";
    if (seleccionada) boton.classList.add("is-seleccionada");
    if (desactivada) boton.classList.add("is-desactivada");

    const fotoWrap = crearFotoConFallback(prenda, "prenda-seleccionable__foto");
    fotoWrap.className = "prenda-seleccionable__foto-wrap";

    const nombre = document.createElement("p");
    nombre.className = "prenda-seleccionable__nombre";
    nombre.textContent = prenda.nombre;

    boton.appendChild(fotoWrap);
    boton.appendChild(nombre);
    boton.addEventListener("click", onClick);
    return boton;
  }

  function renderPasoPantalones() {
    contMmPantalones.innerHTML = "";
    wardrobe.pantalones.forEach((p) => {
      const seleccionada = mm.pantalon === p.id;
      const boton = crearOpcionSeleccionable(p, seleccionada, false, () => {
        mm.pantalon = seleccionada ? null : p.id;
        renderMixMatchCompleto();
      });
      contMmPantalones.appendChild(boton);
    });
  }

  function renderPasoTops() {
    contMmTops.innerHTML = "";
    mmTopAyuda.hidden = !!mm.pantalon;

    wardrobe.tops.forEach((t) => {
      const seleccionada = mm.top === t.id;
      const desactivada = !!mm.pantalon && !esCompatibleTopPantalon(t.id, mm.pantalon) && !seleccionada;
      const boton = crearOpcionSeleccionable(t, seleccionada, desactivada, () => {
        mm.top = seleccionada ? null : t.id;
        renderMixMatchCompleto();
      });
      contMmTops.appendChild(boton);
    });
  }

  function renderPasoBasicos() {
    contMmBasicos.innerHTML = "";
    wardrobe.basicos.forEach((b) => {
      const seleccionada = mm.basico === b.id;
      let desactivada = false;
      if (mm.pantalon && !seleccionada) {
        const compat = esCompatibleBasicoPantalon(b.id, mm.pantalon, mm.americana);
        desactivada = compat === false;
      }
      const boton = crearOpcionSeleccionable(b, seleccionada, desactivada, () => {
        mm.basico = seleccionada ? null : b.id;
        renderMixMatchCompleto();
      });
      contMmBasicos.appendChild(boton);
    });
  }

  function renderPasoAmericanas() {
    contMmAmericanas.innerHTML = "";
    wardrobe.americanas.forEach((a) => {
      const seleccionada = mm.americana === a.id;
      const desactivada = !!mm.pantalon && !esCompatibleAmericanaPantalon(a.id, mm.pantalon) && !seleccionada;
      const boton = crearOpcionSeleccionable(a, seleccionada, desactivada, () => {
        mm.americana = seleccionada ? null : a.id;
        renderMixMatchCompleto();
      });
      contMmAmericanas.appendChild(boton);
    });
  }

  function crearBloqueResultado(prenda, etiqueta) {
    const bloque = document.createElement("div");
    bloque.className = "resultado-look__prenda";

    const fotoWrap = crearFotoConFallback(prenda, "resultado-look__prenda-foto");
    fotoWrap.className = "resultado-look__prenda-foto";

    const nombre = document.createElement("p");
    nombre.className = "resultado-look__prenda-etiqueta";
    nombre.textContent = etiqueta + ": " + prenda.nombre;

    bloque.appendChild(fotoWrap);
    bloque.appendChild(nombre);
    return bloque;
  }

  function renderResultadoLook() {
    const piezasElegidas = [mm.top, mm.basico, mm.americana].filter(Boolean).length;
    const debeMostrarse = mm.pantalon && piezasElegidas > 0;

    resultadoLook.hidden = !debeMostrarse;
    if (!debeMostrarse) return;

    resultadoLookPrendas.innerHTML = "";
    if (mm.top) resultadoLookPrendas.appendChild(crearBloqueResultado(getPrenda(mm.top), "Top"));
    if (mm.basico) resultadoLookPrendas.appendChild(crearBloqueResultado(getPrenda(mm.basico), "Básico"));
    resultadoLookPrendas.appendChild(crearBloqueResultado(getPrenda(mm.pantalon), "Pantalón"));
    if (mm.americana) resultadoLookPrendas.appendChild(crearBloqueResultado(getPrenda(mm.americana), "Americana"));

    const resultado = validarLook(mm);
    resultadoLookVeredicto.classList.remove("valido", "no-valido");

    if (resultado.valido) {
      resultadoLookVeredicto.classList.add("valido");
      resultadoLookVeredicto.textContent = "✓ Look válido — todas las combinaciones están registradas";
    } else {
      resultadoLookVeredicto.classList.add("no-valido");
      const fallidas = resultado.relaciones.filter((r) => r.ok !== true).map((r) => r.etiqueta);
      resultadoLookVeredicto.textContent =
        fallidas.length > 0
          ? "✕ Combinación no registrada (" + fallidas.join(", ") + ")"
          : "✕ Combinación no registrada";
    }

    btnGuardarLook.dataset.valido = String(resultado.valido);
  }

  function renderMixMatchCompleto() {
    renderPasoPantalones();
    renderPasoTops();
    renderPasoBasicos();
    renderPasoAmericanas();
    renderResultadoLook();
  }

  btnGuardarLook.addEventListener("click", () => {
    const resultado = validarLook(mm);
    guardarLookFavorito(mm, resultado);
    btnGuardarLook.textContent = "Guardado ✓";
    setTimeout(() => {
      btnGuardarLook.textContent = "Guardar este look en favoritos";
    }, 1600);
  });

  btnReiniciarLook.addEventListener("click", () => {
    mm.pantalon = null;
    mm.top = null;
    mm.basico = null;
    mm.americana = null;
    renderMixMatchCompleto();
  });

  // ----------------------------------------------------------
  // 8. VISTA: FAVORITOS
  // ----------------------------------------------------------

  const galeriaFavPrendas = document.getElementById("galeria-favoritos-prendas");
  const favPrendasVacio = document.getElementById("favoritos-prendas-vacio");
  const galeriaFavLooks = document.getElementById("galeria-favoritos-looks");
  const favLooksVacio = document.getElementById("favoritos-looks-vacio");

  function renderFavoritos() {
    const idsFav = getFavoritosPrendas();
    const prendasFav = idsFav.map(getPrenda).filter(Boolean);

    galeriaFavPrendas.innerHTML = "";
    prendasFav.forEach((p) => galeriaFavPrendas.appendChild(crearTarjetaPrenda(p)));
    favPrendasVacio.hidden = prendasFav.length !== 0;

    const looks = getFavoritosLooks();
    galeriaFavLooks.innerHTML = "";
    favLooksVacio.hidden = looks.length !== 0;

    looks.forEach((look) => {
      const tarjeta = document.createElement("article");
      tarjeta.className = "tarjeta-look";

      const veredicto = document.createElement("span");
      veredicto.className = "tarjeta-look__veredicto " + (look.valido ? "valido" : "no-valido");
      veredicto.textContent = look.valido ? "✓ Válido" : "✕ No registrado";

      const filaPrendas = document.createElement("div");
      filaPrendas.className = "tarjeta-look__prendas";
      [look.top, look.pantalon, look.basico, look.americana].filter(Boolean).forEach((id) => {
        const prenda = getPrenda(id);
        if (!prenda) return;
        const foto = crearFotoConFallback(prenda, "tarjeta-look__foto");
        foto.className = "tarjeta-look__foto";
        filaPrendas.appendChild(foto);
      });

      const botonQuitar = document.createElement("button");
      botonQuitar.className = "tarjeta-look__quitar";
      botonQuitar.textContent = "Quitar de favoritos";
      botonQuitar.addEventListener("click", () => {
        eliminarLookFavorito(look.id);
        renderFavoritos();
      });

      tarjeta.appendChild(veredicto);
      tarjeta.appendChild(filaPrendas);
      tarjeta.appendChild(botonQuitar);
      galeriaFavLooks.appendChild(tarjeta);
    });
  }

  // ----------------------------------------------------------
  // 9. VISTA: ANÁLISIS
  //    Solo datos calculados a partir de wardrobe.js. Ninguna
  //    valoración subjetiva ni combinación inventada.
  // ----------------------------------------------------------

  const contAnalisisResumen = document.getElementById("analisis-resumen");
  const contMasVersatiles = document.getElementById("analisis-mas-versatiles");
  const contMenosVersatiles = document.getElementById("analisis-menos-versatiles");
  const contPantalonesHuecos = document.getElementById("analisis-pantalones-huecos");
  const contSugerenciasLista = document.getElementById("analisis-sugerencias-lista");

  // Prendas con combinaCon directo (tops, americanas, y el básico marrón
  // chocolate) cuentan su versatilidad como longitud de ese array.
  // Los básicos "combinaConAmericanas: todas" cuentan como el número
  // total de americanas registradas (es un dato derivado, no inventado).
  function calcularVersatilidad(prenda) {
    if (Array.isArray(prenda.combinaCon)) return prenda.combinaCon.length;
    if (prenda.combinaConAmericanas === "todas") return wardrobe.americanas.length;
    if (prenda.combinaConTodo) return wardrobe.pantalones.length + wardrobe.americanas.length;
    return 0;
  }

  function calcularRankingVersatilidad() {
    const prendasConReglas = [...wardrobe.tops, ...wardrobe.basicos, ...wardrobe.americanas];
    return prendasConReglas
      .map((p) => ({ prenda: p, valor: calcularVersatilidad(p) }))
      .sort((a, b) => b.valor - a.valor);
  }

  // Para pantalones: cuentan cuántos tops/básicos/americanas los
  // referencian dentro de su combinaCon (relación inversa).
  function calcularVersatilidadPantalones() {
    const prendasConCombinaCon = [
      ...wardrobe.tops,
      ...wardrobe.americanas,
      ...wardrobe.basicos.filter((b) => Array.isArray(b.combinaCon))
    ];
    return wardrobe.pantalones.map((pantalon) => {
      const veces = prendasConCombinaCon.filter(
        (p) => Array.isArray(p.combinaCon) && p.combinaCon.includes(pantalon.id)
      ).length;
      return { prenda: pantalon, valor: veces };
    });
  }

  function crearFilaRanking(prenda, valor, sufijo) {
    const fila = document.createElement("div");
    fila.className = "fila-ranking";

    const foto = crearFotoConFallback(prenda, "fila-ranking__foto");
    foto.className = "fila-ranking__foto";

    const nombre = document.createElement("div");
    nombre.className = "fila-ranking__nombre";
    nombre.innerHTML =
      prenda.nombre + '<span class="fila-ranking__categoria"></span>';
    nombre.querySelector(".fila-ranking__categoria").textContent = ETIQUETA_CATEGORIA[prenda.categoria];

    const valorEl = document.createElement("div");
    valorEl.className = "fila-ranking__valor";
    valorEl.textContent = valor + sufijo;

    fila.appendChild(foto);
    fila.appendChild(nombre);
    fila.appendChild(valorEl);
    return fila;
  }

  function renderAnalisis() {
    const rankingPrendas = calcularRankingVersatilidad();
    const rankingPantalones = calcularVersatilidadPantalones().sort((a, b) => a.valor - b.valor);

    const totalCombinacionesDirectas =
      wardrobe.tops.reduce((s, t) => s + (t.combinaCon ? t.combinaCon.length : 0), 0) +
      wardrobe.americanas.reduce((s, a) => s + (a.combinaCon ? a.combinaCon.length : 0), 0) +
      wardrobe.basicos.reduce((s, b) => s + (Array.isArray(b.combinaCon) ? b.combinaCon.length : 0), 0);

    // --- Resumen ---
    contAnalisisResumen.innerHTML = "";
    const resumenItems = [
      { numero: TODAS_PRENDAS.length, etiqueta: "Prendas en el armario" },
      { numero: totalCombinacionesDirectas, etiqueta: "Combinaciones directas registradas" },
      { numero: rankingPrendas[0] ? rankingPrendas[0].valor : 0, etiqueta: "Máx. combinaciones en una prenda" },
      {
        numero: rankingPrendas[rankingPrendas.length - 1] ? rankingPrendas[rankingPrendas.length - 1].valor : 0,
        etiqueta: "Mín. combinaciones en una prenda"
      }
    ];
    resumenItems.forEach((item) => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "analisis-resumen__tarjeta";
      tarjeta.innerHTML =
        '<span class="analisis-resumen__numero"></span><p class="analisis-resumen__etiqueta"></p>';
      tarjeta.querySelector(".analisis-resumen__numero").textContent = item.numero;
      tarjeta.querySelector(".analisis-resumen__etiqueta").textContent = item.etiqueta;
      contAnalisisResumen.appendChild(tarjeta);
    });

    // --- Más versátiles (top 5) ---
    contMasVersatiles.innerHTML = "";
    rankingPrendas.slice(0, 5).forEach((r) => {
      contMasVersatiles.appendChild(crearFilaRanking(r.prenda, r.valor, " combinaciones"));
    });

    // --- Menos versátiles (últimas 5) ---
    contMenosVersatiles.innerHTML = "";
    rankingPrendas
      .slice(-5)
      .reverse()
      .forEach((r) => {
        contMenosVersatiles.appendChild(crearFilaRanking(r.prenda, r.valor, " combinaciones"));
      });

    // --- Pantalones con menos opciones (5 primeros) ---
    contPantalonesHuecos.innerHTML = "";
    rankingPantalones.slice(0, 5).forEach((r) => {
      contPantalonesHuecos.appendChild(crearFilaRanking(r.prenda, r.valor, " prendas lo incluyen"));
    });

    // --- Sugerencias (separadas claramente de los datos) ---
    contSugerenciasLista.innerHTML = "";
    const umbral = 3;
    const huecosPrendas = rankingPrendas.filter((r) => r.valor <= umbral);
    const huecosPantalones = rankingPantalones.filter((r) => r.valor <= umbral);

    if (huecosPrendas.length === 0 && huecosPantalones.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No se han detectado zonas con muy pocas combinaciones registradas.";
      contSugerenciasLista.appendChild(li);
    } else {
      huecosPrendas.forEach((r) => {
        const li = document.createElement("li");
        li.textContent =
          r.prenda.nombre + " tiene solo " + r.valor + " combinación(es) registrada(s). Podría ser interesante revisar si combina con más prendas de tu armario.";
        contSugerenciasLista.appendChild(li);
      });
      huecosPantalones.forEach((r) => {
        const li = document.createElement("li");
        li.textContent =
          r.prenda.nombre + " solo aparece en " + r.valor + " combinación(es) registrada(s) de otras prendas.";
        contSugerenciasLista.appendChild(li);
      });
    }
  }

  // ----------------------------------------------------------
  // 10. INICIALIZACIÓN
  // ----------------------------------------------------------

  renderArmario();
  renderMixMatchCompleto();
})();
