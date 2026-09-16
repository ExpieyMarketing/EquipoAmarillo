/* ═══════════════════════════════════════════
   DIPPANEL PRESUPUESTADOR – JS v1.0.0
   Todas las funciones y vars con prefijo dipp
   para evitar colisiones con otros scripts de WP.
═══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ──────────────────────────────────────
     DATOS EXTRAÍDOS DEL EXCEL
  ────────────────────────────────────── */

  // Precios €/m² panel PVP por espesor (mm)
  const DIPP_PRECIO_PANEL = {
    60: 25.65, 80: 29.36, 100: 32.76,
    120: 35.93, 150: 42.08, 180: 48.07, 200: 51.38
  };

  // DP1 Pivotante (€/ud) según [alto][ancho]
  const DIPP_DP1 = {
    80: {
      1800: { 700:1010,800:1020,900:1040,1000:1110,1100:1130,1200:1160,1300:1230,1400:1250 },
      1900: { 700:1030,800:1040,900:1060,1000:1120,1100:1150,1200:1180,1300:1240,1400:1260 },
      2000: { 700:1050,800:1060,900:1070,1000:1150,1100:1170,1200:1190,1300:1260,1400:1280 },
      2100: { 700:1100,800:1110,900:1130,1000:1180,1100:1210,1200:1230,1300:1290,1400:1340 },
      2200: { 700:1130,800:1150,900:1160,1000:1190,1100:1220,1200:1260,1300:1350,1400:1370 },
      2300: { 700:1160,800:1170,900:1180,1000:1230,1100:1270,1200:1300,1300:1360,1400:1380 },
      2400: { 700:1200,800:1210,900:1240,1000:1280,1100:1310,1200:1330,1300:1400,1400:1420 },
    },
    100: {
      1800: { 700:1040,800:1050,900:1070,1000:1140,1100:1180,1200:1220,1300:1290,1400:1320 },
      1900: { 700:1060,800:1080,900:1090,1000:1160,1100:1210,1200:1230,1300:1300,1400:1330 },
      2000: { 700:1080,800:1100,900:1110,1000:1180,1100:1220,1200:1250,1300:1320,1400:1340 },
      2100: { 700:1130,800:1140,900:1160,1000:1210,1100:1240,1200:1270,1300:1330,1400:1380 },
      2200: { 700:1170,800:1190,900:1200,1000:1230,1100:1250,1200:1300,1300:1390,1400:1410 },
      2300: { 700:1200,800:1210,900:1220,1000:1260,1100:1330,1200:1360,1300:1430,1400:1450 },
      2400: { 700:1240,800:1250,900:1280,1000:1310,1100:1360,1200:1390,1300:1460,1400:1490 },
    }
  };

  // DC1 Corredera (€/ud) según [alto][ancho]
  const DIPP_DC1 = {
    80: {
      1900: { 900:1680,1000:1730,1100:1780,1200:1800,1300:1870,1400:1910,1500:2080,1600:2100 },
      2000: { 900:1700,1000:1750,1100:1810,1200:1830,1300:1910,1400:1930,1500:2130,1600:2150 },
      2100: { 900:1720,1000:1820,1100:1870,1200:1900,1300:1940,1400:1990,1500:2160,1600:2200 },
      2200: { 900:1810,1000:1910,1100:1950,1200:1980,1300:2030,1400:2060,1500:2190,1600:2220 },
      2300: { 900:1830,1000:1930,1100:1970,1200:2020,1300:2100,1400:2130,1500:2210,1600:2240 },
      2400: { 900:1850,1000:1960,1100:2010,1200:2040,1300:2120,1400:2150,1500:2230,1600:2260 },
      2500: { 900:1900,1000:1980,1100:2030,1200:2060,1300:2140,1400:2170,1500:2250,1600:2280 },
      2600: { 900:1920,1000:2010,1100:2060,1200:2080,1300:2160,1400:2190,1500:2280,1600:2300 },
    },
    100: {
      1900: { 900:1880,1000:1910,1100:1970,1200:2010,1300:2120,1400:2170,1500:2400,1600:2430 },
      2000: { 900:1900,1000:1940,1100:1990,1200:2030,1300:2140,1400:2190,1500:2420,1600:2450 },
      2100: { 900:1920,1000:1970,1100:2020,1200:2050,1300:2160,1400:2210,1500:2450,1600:2490 },
      2200: { 900:1950,1000:1990,1100:2040,1200:2070,1300:2180,1400:2250,1500:2480,1600:2510 },
      2300: { 900:2030,1000:2070,1100:2130,1200:2180,1300:2290,1400:2340,1500:2580,1600:2610 },
      2400: { 900:2050,1000:2110,1100:2160,1200:2200,1300:2310,1400:2360,1500:2600,1600:2630 },
      2500: { 900:2090,1000:2130,1100:2180,1200:2220,1300:2330,1400:2380,1500:2620,1600:2650 },
      2600: { 900:2120,1000:2160,1100:2200,1200:2240,1300:2350,1400:2400,1500:2640,1600:2670 },
    }
  };

  // Transporte – columna "4 MTOS" de TARIFA_TRANSPORTE_TRAILER_2026.xlsx
  const DIPP_TRANSPORTE = {
    albacete:300, alicante:300, almeria:270, barcelona:500, bilbao:500,
    burgos:400, caceres:240, cadiz:180, castellon:360, ciudad_real:270,
    cordoba:180, coruna:500, cuenca:390, gerona:550, granada:220,
    guadalajara:300, huelva:180, huesca:400, jaen:210, leon:440,
    lerida:500, logrono:500, lugo:500, madrid:250, malaga:210,
    murcia:300, orense:500, oviedo:420, palencia:350, pamplona:500,
    pontevedra:500, salamanca:300, san_sebastian:500, santander:500,
    segovia:320, sevilla:110, soria:500, tarragona:500, teruel:550,
    toledo:220, valencia:300, valladolid:300, vitoria:500, zamora:380,
    zaragoza:380,
  };

  /* ──────────────────────────────────────
     ESTADO
  ────────────────────────────────────── */
  let dippConSuelo = true;
  let dippDp1Uds   = 0;
  let dippDc1Uds   = 0;

  /* ──────────────────────────────────────
     HELPERS
  ────────────────────────────────────── */
  function dippCeiling(val, sig) { return Math.ceil(val / sig) * sig; }
  function dippFmt(n)    { return n.toLocaleString('es-ES'); }
  function dippFmtDec(n) { return n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function dippEl(id)    { return document.getElementById(id); }

  /* ──────────────────────────────────────
     TOGGLE SUELO
  ────────────────────────────────────── */
  window.dippSetSuelo = function (btn, val) {
    document.querySelectorAll('#dippGrupoSuelo .dipp-toggle-btn')
      .forEach(function (b) { b.classList.remove('activo'); });
    btn.classList.add('activo');
    dippConSuelo = (val === 'con');
    dippCalcular();
  };

  /* ──────────────────────────────────────
     PUERTAS – selects dinámicos
  ────────────────────────────────────── */
  function dippPoblar(id, valores) {
    var sel  = dippEl(id);
    var prev = sel.value;
    sel.innerHTML = '<option value="" disabled>Selecciona</option>';
    valores.forEach(function (v) {
      var o = document.createElement('option');
      o.value = v;
      o.textContent = v + ' mm';
      if (String(v) === prev) o.selected = true;
      sel.appendChild(o);
    });
  }

  window.dippActualizarPuerta = function (tipo) {
    var esp   = parseInt(dippEl('dipp' + (tipo === 'dp1' ? 'Dp1' : 'Dc1') + 'Esp').value);
    var tabla = tipo === 'dp1' ? DIPP_DP1[esp] : DIPP_DC1[esp];
    var pref  = 'dipp' + (tipo === 'dp1' ? 'Dp1' : 'Dc1');
    if (!tabla) {
      dippPoblar(pref + 'Ancho', []);
      dippPoblar(pref + 'Alto',  []);
      dippCalcular();
      return;
    }
    var altos  = Object.keys(tabla).map(Number).sort(function (a, b) { return a - b; });
    var anchos = Object.keys(Object.values(tabla)[0]).map(Number).sort(function (a, b) { return a - b; });
    dippPoblar(pref + 'Alto',  altos);
    dippPoblar(pref + 'Ancho', anchos);
    dippCalcular();
  };

  window.dippCambiarUds = function (tipo, delta) {
    if (tipo === 'dp1') {
      dippDp1Uds = Math.max(0, dippDp1Uds + delta);
      dippEl('dippDp1UdsNum').textContent = dippDp1Uds;
    } else {
      dippDc1Uds = Math.max(0, dippDc1Uds + delta);
      dippEl('dippDc1UdsNum').textContent = dippDc1Uds;
    }
    dippCalcular();
  };

  /* ──────────────────────────────────────
     CÁLCULO – réplica exacta J21 del Excel
  ────────────────────────────────────── */
  window.dippCalcular = function () {
    var total = 0;
    var items = [];

    var espesor = parseInt(dippEl('dippEspesor').value)  || 0;
    var largo   = parseInt(dippEl('dippLargo').value)    || 0;
    var ancho   = parseInt(dippEl('dippAncho').value)    || 0;
    var alto    = parseInt(dippEl('dippAlto').value)     || 0;

    /* ── CÁMARA ── */
    if (espesor && largo && ancho && alto) {
      var pvp = DIPP_PRECIO_PANEL[espesor] || 0;

      // J10 – paneles pared
      var d10 = Math.ceil(((largo + ancho) / 1100) * 2);
      var h10 = d10 * (alto / 1000) * 1.1;
      var J10 = h10 * pvp;

      // J11 – paneles techo
      var d11 = Math.ceil(largo / 1100);
      var h11 = d11 * (ancho / 1000) * 1.1;
      var J11 = h11 * pvp;

      // J12 – paneles suelo (66.45 €/m²)
      var J12 = 0;
      if (dippConSuelo) {
        var d12 = Math.ceil((largo - espesor - espesor) / 1200);
        var f12 = ancho - espesor - espesor;
        var h12 = d12 * (f12 / 1000) * 1.2;
        J12 = h12 * 66.45;
      }
      var J13 = J10 + J11 + J12;

      // F14 – Perfil L
      var c14 = (((largo + ancho) * 2) + (alto * 4)) / 1000;
      var d14 = dippCeiling(c14, 3);
      var F14 = d14 * 5.2;

      // F15 – Perfil U
      var c15 = ((largo + ancho) * 2) / 1000;
      var d15 = dippCeiling(c15, 3);
      var F15 = d15 * 6.4;

      // F16 – Sanitario
      var c16 = (((largo + ancho) * 4) + (alto * 4)) / 1000;
      var d16 = dippCeiling(c16, 4);
      var F16 = d16 * 3.55;

      // F18 – Rinconeras
      var F18 = 8 * 1.15;
      var F21 = F14 + F15 + F16 + F18;

      // U12 – Tornillería y accesorios
      var H21 = h10 + h11;
      var u3  = dippCeiling((d14 + d15) * 8, 100) * 34 / 1000;
      var u4  = dippCeiling(d16 * 8, 100) * 16.88 / 1000;
      var u5  = dippCeiling((d10 + d11) * 2, 50)  * 12.15 / 1000;
      var u6  = dippCeiling(d15 * 3, 50) * 4.32 / 100;
      var u8  = Math.ceil(H21 * 0.05) * 2.13;
      var u10 = Math.ceil(H21 * 0.1)  * 2.5;
      var U12 = u3 + u4 + u5 + u6 + u8 + u10;

      // J21
      var J21  = J13 + F21 + U12;
      var J21r = Math.round(J21 * 100) / 100;
      total += J21r;
      items.push({
        label: 'Cámara ' + (largo/1000) + '×' + (ancho/1000) + '×' + (alto/1000) +
               ' m – panel ' + espesor + 'mm' + (dippConSuelo ? '' : ', sin suelo'),
        precio: J21r
      });
    }

    /* ── PUERTAS DP1 ── */
    var dp1Esp = parseInt(dippEl('dippDp1Esp').value)   || 0;
    var dp1A   = parseInt(dippEl('dippDp1Ancho').value) || 0;
    var dp1H   = parseInt(dippEl('dippDp1Alto').value)  || 0;
    if (dp1Esp && dp1A && dp1H && dippDp1Uds > 0) {
      var p1  = (DIPP_DP1[dp1Esp] && DIPP_DP1[dp1Esp][dp1H]) ? (DIPP_DP1[dp1Esp][dp1H][dp1A] || 0) : 0;
      var sub1 = Math.round(p1 * dippDp1Uds * 100) / 100;
      if (sub1) {
        total += sub1;
        items.push({ label: 'DP1 ' + dp1Esp + 'mm ' + dp1A + '×' + dp1H + ' mm – ' + dippDp1Uds + ' ud.', precio: sub1 });
      }
    }

    /* ── PUERTAS DC1 ── */
    var dc1Esp = parseInt(dippEl('dippDc1Esp').value)   || 0;
    var dc1A   = parseInt(dippEl('dippDc1Ancho').value) || 0;
    var dc1H   = parseInt(dippEl('dippDc1Alto').value)  || 0;
    if (dc1Esp && dc1A && dc1H && dippDc1Uds > 0) {
      var p2   = (DIPP_DC1[dc1Esp] && DIPP_DC1[dc1Esp][dc1H]) ? (DIPP_DC1[dc1Esp][dc1H][dc1A] || 0) : 0;
      var sub2 = Math.round(p2 * dippDc1Uds * 100) / 100;
      if (sub2) {
        total += sub2;
        items.push({ label: 'DC1 ' + dc1Esp + 'mm ' + dc1A + '×' + dc1H + ' mm – ' + dippDc1Uds + ' ud.', precio: sub2 });
      }
    }

    /* ── TRANSPORTE ── */
    var provSel = dippEl('dippProvincia');
    var prov    = provSel.value;
    if (prov && DIPP_TRANSPORTE[prov]) {
      var t     = DIPP_TRANSPORTE[prov];
      var tLabel = provSel.options[provSel.selectedIndex].text;
      total += t;
      items.push({ label: 'Transporte a ' + tLabel, precio: t });
    }

    /* ── ACTUALIZAR UI ── */
    dippEl('dippPrecioTotal').innerHTML =
      dippFmt(Math.round(total)) + ' <span class="dipp-euro">€</span>';
    dippEl('dippPrecioSub').textContent =
      total > 0 ? 'Precio orientativo · IVA no incluido' : '';

    var wrap = dippEl('dippDesgloseWrap');
    wrap.innerHTML = '';
    items.forEach(function (it) {
      var div = document.createElement('div');
      div.className = 'dipp-desglose-item';
      div.innerHTML =
        '<span>' + it.label + '</span>' +
        '<span class="dipp-d-precio">' + dippFmtDec(it.precio) + ' €</span>';
      wrap.appendChild(div);
    });
  };

  /* ──────────────────────────────────────
     MODAL
  ────────────────────────────────────── */
  window.dippAbrirModal = function () {
    dippEl('dippModalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.dippCerrarModal = function () {
    dippEl('dippModalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  };

  window.dippCierraFondo = function (e) {
    if (e.target === dippEl('dippModalOverlay')) dippCerrarModal();
  };

  window.dippEnviar = function () {
    var campos = [
      ['dippFNombre',    'dippENombre',    'El nombre es obligatorio'],
      ['dippFApellidos', 'dippEApellidos', 'Los apellidos son obligatorios'],
      ['dippFEmpresa',   'dippEEmpresa',   'La empresa es obligatoria'],
      ['dippFEmail',     'dippEEmail',     'El email es obligatorio', 'email'],
      ['dippFTelefono',  'dippETelefono',  'El teléfono es obligatorio'],
      ['dippFCP',        'dippECP',        'El código postal es obligatorio'],
    ];

    var ok = true;
    campos.forEach(function (c) {
      var el  = dippEl(c[0]);
      var err = dippEl(c[1]);
      el.classList.remove('dipp-err-campo');
      err.textContent = '';
      if (!el.value.trim()) {
        el.classList.add('dipp-err-campo');
        err.textContent = c[2];
        ok = false;
      } else if (c[3] === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
        el.classList.add('dipp-err-campo');
        err.textContent = 'Introduce un email válido';
        ok = false;
      }
    });

    if (!ok) return;

 
    var desglose = [];
document.querySelectorAll('#dippDesgloseWrap .dipp-desglose-item').forEach(function (item) {
  desglose.push(item.textContent.trim());
});

var data = new FormData();
data.append('action', 'dipp_enviar_presupuesto');
data.append('nonce', dippPresData.nonce);
data.append('nombre', dippEl('dippFNombre').value.trim());
data.append('apellidos', dippEl('dippFApellidos').value.trim());
data.append('empresa', dippEl('dippFEmpresa').value.trim());
data.append('email', dippEl('dippFEmail').value.trim());
data.append('telefono', dippEl('dippFTelefono').value.trim());
data.append('cp', dippEl('dippFCP').value.trim());
data.append('mensaje', dippEl('dippFMensaje').value.trim());
data.append('total', dippEl('dippPrecioTotal').textContent.trim());
data.append('desglose', desglose.join("\n"));

fetch(dippPresData.ajax_url, {
  method: 'POST',
  body: data
})
.then(function (res) {
  return res.json();
})
.then(function (response) {
  if (response.success) {
    dippEl('dippFormWrap').style.display = 'none';
    dippEl('dippSuccessBox').style.display = 'block';
  } else {
    alert('No se pudo enviar el presupuesto. Inténtalo de nuevo.');
  }
})
.catch(function () {
  alert('Error al enviar el presupuesto. Inténtalo de nuevo.');
});
  };

})();
