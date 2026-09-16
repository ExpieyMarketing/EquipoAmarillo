<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>

<div class="dipp-calc-wrapper">

  <!-- ══ PANEL IZQUIERDO ══ -->
  <aside class="dipp-panel-izq">
    <svg class="dipp-logo-icon" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4"  y="32" width="10" height="20" rx="2" fill="#FF5000"/>
      <rect x="20" y="20" width="10" height="32" rx="2" fill="#FF5000"/>
      <rect x="36" y="8"  width="10" height="44" rx="2" fill="#FF5000"/>
      <path d="M7 30 L23 18 L39 6 L50 2" stroke="#001689" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M44 2 L50 2 L50 8" stroke="#001689" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <h2 class="dipp-titulo-calc">Calcula tu<br>Presupuesto</h2>

    <p class="dipp-aviso-precios">Los precios mostrados son orientativos. Para completar tu presupuesto de forma definitiva, contacta con los profesionales de Dippanel enviando tu simulación.</p>

    <p class="dipp-precio-label">Total estimado</p>
    <div class="dipp-precio-total" id="dippPrecioTotal">0 <span class="dipp-euro">€</span></div>
    <p class="dipp-precio-sub" id="dippPrecioSub">&nbsp;</p>

    <div class="dipp-desglose" id="dippDesgloseWrap"></div>

    <button class="dipp-btn-simular" onclick="dippAbrirModal()">Obtén descuentos exclusivos</button>
  </aside>

  <!-- ══ PANEL DERECHO ══ -->
  <main class="dipp-panel-der">

    <!-- 1. ESPESOR + SUELO -->
    <section class="dipp-seccion">
      <h3 class="dipp-sec-titulo">1. Configura el panel de tu cámara</h3>
      <div class="dipp-sep"></div>

      <div class="dipp-campo-col" style="margin-bottom:16px; max-width:240px;">
        <span class="dipp-campo-label">Espesor del panel</span>
        <select id="dippEspesor" onchange="dippCalcular()">
          <option value="" disabled selected>Selecciona espesor</option>
          <option value="60">60 mm</option>
          <option value="80">80 mm</option>
          <option value="100">100 mm</option>
          <option value="120">120 mm</option>
          <option value="150">150 mm</option>
          <option value="180">180 mm</option>
          <option value="200">200 mm</option>
        </select>
      </div>

      <span class="dipp-campo-label" style="margin-bottom:8px; display:block;">¿Con o sin suelo?</span>
      <div class="dipp-toggle-grupo" id="dippGrupoSuelo" style="max-width:300px;">
        <button class="dipp-toggle-btn activo" onclick="dippSetSuelo(this,'con')">Con suelo</button>
        <button class="dipp-toggle-btn"        onclick="dippSetSuelo(this,'sin')">Sin suelo</button>
      </div>
    </section>

    <!-- 2. DIMENSIONES -->
    <section class="dipp-seccion">
      <h3 class="dipp-sec-titulo">2. Dimensiones de la cámara</h3>
      <div class="dipp-sep"></div>

      <div class="dipp-grid-3">
        <div class="dipp-campo-col">
          <span class="dipp-campo-label">Largo</span>
          <select id="dippLargo" onchange="dippCalcular()">
            <option value="" disabled selected>Selecciona</option>
            <option value="2000">2.000 mm</option>
            <option value="2500">2.500 mm</option>
            <option value="3000">3.000 mm</option>
            <option value="3500">3.500 mm</option>
            <option value="4000">4.000 mm</option>
            <option value="4500">4.500 mm</option>
            <option value="5000">5.000 mm</option>
            <option value="5500">5.500 mm</option>
            <option value="6000">6.000 mm</option>
            <option value="6500">6.500 mm</option>
            <option value="7000">7.000 mm</option>
            <option value="7500">7.500 mm</option>
            <option value="8000">8.000 mm</option>
          </select>
        </div>
        <div class="dipp-campo-col">
          <span class="dipp-campo-label">Ancho</span>
          <select id="dippAncho" onchange="dippCalcular()">
            <option value="" disabled selected>Selecciona</option>
            <option value="2000">2.000 mm</option>
            <option value="2500">2.500 mm</option>
            <option value="3000">3.000 mm</option>
            <option value="3500">3.500 mm</option>
            <option value="4000">4.000 mm</option>
            <option value="4500">4.500 mm</option>
            <option value="5000">5.000 mm</option>
            <option value="5500">5.500 mm</option>
            <option value="6000">6.000 mm</option>
            <option value="6500">6.500 mm</option>
            <option value="7000">7.000 mm</option>
            <option value="7500">7.500 mm</option>
            <option value="8000">8.000 mm</option>
          </select>
        </div>
        <div class="dipp-campo-col">
          <span class="dipp-campo-label">Alto</span>
          <select id="dippAlto" onchange="dippCalcular()">
            <option value="" disabled selected>Selecciona</option>
            <option value="2000">2.000 mm</option>
            <option value="2500">2.500 mm</option>
            <option value="3000">3.000 mm</option>
            <option value="3500">3.500 mm</option>
            <option value="4000">4.000 mm</option>
          </select>
        </div>
      </div>
    </section>

    <!-- 3. PUERTAS -->
    <section class="dipp-seccion">
      <h3 class="dipp-sec-titulo">3. Puertas frigoríficas</h3>
      <div class="dipp-sep"></div>

      <!-- DP1 -->
      <div class="dipp-puerta-card">
        <p class="dipp-puerta-nombre">Puerta pivotante frigorífica comercial – DP1</p>
        <div class="dipp-puerta-grid">
          <div class="dipp-campo-col">
            <span class="dipp-campo-label">Temperatura</span>
            <select id="dippDp1Esp" onchange="dippActualizarPuerta('dp1')">
              <option value="" disabled selected>Selecciona</option>
              <option value="80">Conservación (80 mm)</option>
              <option value="100">Congelación (100 mm)</option>
            </select>
          </div>
          <div class="dipp-campo-col">
            <span class="dipp-campo-label">Ancho (mm)</span>
            <select id="dippDp1Ancho" onchange="dippCalcular()">
              <option value="" disabled selected>Selecciona</option>
            </select>
          </div>
          <div class="dipp-campo-col">
            <span class="dipp-campo-label">Alto (mm)</span>
            <select id="dippDp1Alto" onchange="dippCalcular()">
              <option value="" disabled selected>Selecciona</option>
            </select>
          </div>
        </div>
        <div class="dipp-uds-wrap">
          <span class="dipp-campo-label">Unidades</span>
          <button class="dipp-uds-btn" onclick="dippCambiarUds('dp1',-1)">−</button>
          <span class="dipp-uds-num" id="dippDp1UdsNum">0</span>
          <button class="dipp-uds-btn" onclick="dippCambiarUds('dp1',1)">+</button>
        </div>
      </div>

      <!-- DC1 -->
      <div class="dipp-puerta-card">
        <p class="dipp-puerta-nombre">Puerta corredera frigorífica comercial – DC1</p>
        <div class="dipp-puerta-grid">
          <div class="dipp-campo-col">
            <span class="dipp-campo-label">Temperatura</span>
            <select id="dippDc1Esp" onchange="dippActualizarPuerta('dc1')">
              <option value="" disabled selected>Selecciona</option>
              <option value="80">Conservación (80 mm)</option>
              <option value="100">Congelación (100 mm)</option>
            </select>
          </div>
          <div class="dipp-campo-col">
            <span class="dipp-campo-label">Ancho (mm)</span>
            <select id="dippDc1Ancho" onchange="dippCalcular()">
              <option value="" disabled selected>Selecciona</option>
            </select>
          </div>
          <div class="dipp-campo-col">
            <span class="dipp-campo-label">Alto (mm)</span>
            <select id="dippDc1Alto" onchange="dippCalcular()">
              <option value="" disabled selected>Selecciona</option>
            </select>
          </div>
        </div>
        <div class="dipp-uds-wrap">
          <span class="dipp-campo-label">Unidades</span>
          <button class="dipp-uds-btn" onclick="dippCambiarUds('dc1',-1)">−</button>
          <span class="dipp-uds-num" id="dippDc1UdsNum">0</span>
          <button class="dipp-uds-btn" onclick="dippCambiarUds('dc1',1)">+</button>
        </div>
      </div>
    </section>

    <!-- 4. TRANSPORTE -->
    <section class="dipp-seccion">
      <h3 class="dipp-sec-titulo">4. ¿Dónde enviamos tu pedido?</h3>
      <div class="dipp-sep"></div>

      <div class="dipp-campo-col" style="max-width:280px;">
        <span class="dipp-campo-label">Provincia de destino</span>
        <select id="dippProvincia" onchange="dippCalcular()">
          <option value="" disabled selected>Selecciona provincia</option>
          <option value="albacete">Albacete</option>
          <option value="alicante">Alicante</option>
          <option value="almeria">Almería</option>
          <option value="barcelona">Barcelona</option>
          <option value="bilbao">Bilbao (Vizcaya)</option>
          <option value="burgos">Burgos</option>
          <option value="caceres">Cáceres</option>
          <option value="cadiz">Cádiz</option>
          <option value="castellon">Castellón</option>
          <option value="ciudad_real">Ciudad Real</option>
          <option value="cordoba">Córdoba</option>
          <option value="coruna">La Coruña</option>
          <option value="cuenca">Cuenca</option>
          <option value="gerona">Gerona</option>
          <option value="granada">Granada</option>
          <option value="guadalajara">Guadalajara</option>
          <option value="huelva">Huelva</option>
          <option value="huesca">Huesca</option>
          <option value="jaen">Jaén</option>
          <option value="leon">León</option>
          <option value="lerida">Lérida</option>
          <option value="logrono">Logroño</option>
          <option value="lugo">Lugo</option>
          <option value="madrid">Madrid</option>
          <option value="malaga">Málaga</option>
          <option value="murcia">Murcia</option>
          <option value="orense">Orense</option>
          <option value="oviedo">Oviedo (Asturias)</option>
          <option value="palencia">Palencia</option>
          <option value="pamplona">Pamplona (Navarra)</option>
          <option value="pontevedra">Pontevedra</option>
          <option value="salamanca">Salamanca</option>
          <option value="san_sebastian">San Sebastián (Guipúzcoa)</option>
          <option value="santander">Santander (Cantabria)</option>
          <option value="segovia">Segovia</option>
          <option value="sevilla">Sevilla</option>
          <option value="soria">Soria</option>
          <option value="tarragona">Tarragona</option>
          <option value="teruel">Teruel</option>
          <option value="toledo">Toledo</option>
          <option value="valencia">Valencia</option>
          <option value="valladolid">Valladolid</option>
          <option value="vitoria">Vitoria (Álava)</option>
          <option value="zamora">Zamora</option>
          <option value="zaragoza">Zaragoza</option>
        </select>
      </div>
      <p class="dipp-nota">* Costes de transporte estimados. Precio definitivo bajo consulta con el equipo Dippanel.</p>
    </section>

  </main>
</div><!-- /.dipp-calc-wrapper -->

<!-- ══ MODAL ══ -->
<div class="dipp-overlay" id="dippModalOverlay" onclick="dippCierraFondo(event)">
  <div class="dipp-modal-caja">
    <button class="dipp-modal-cerrar" onclick="dippCerrarModal()">×</button>

    <div id="dippFormWrap">
      <h2 class="dipp-modal-titulo">Solicita tu<br>presupuesto</h2>
      <p class="dipp-modal-sub">Rellena el formulario y un asesor de Dippanel te contactará con una oferta personalizada y descuentos exclusivos. Los campos con <strong style="color:#FF5000">*</strong> son obligatorios.</p>

      <div class="dipp-f-grid2">
        <div class="dipp-f-campo">
          <label class="req">Nombre</label>
          <input type="text" id="dippFNombre" placeholder="Tu nombre">
          <span class="dipp-err" id="dippENombre"></span>
        </div>
        <div class="dipp-f-campo">
          <label class="req">Apellidos</label>
          <input type="text" id="dippFApellidos" placeholder="Tus apellidos">
          <span class="dipp-err" id="dippEApellidos"></span>
        </div>
        <div class="dipp-f-campo dipp-full">
          <label class="req">Empresa</label>
          <input type="text" id="dippFEmpresa" placeholder="Nombre de tu empresa">
          <span class="dipp-err" id="dippEEmpresa"></span>
        </div>
        <div class="dipp-f-campo">
          <label class="req">Email</label>
          <input type="email" id="dippFEmail" placeholder="correo@empresa.com">
          <span class="dipp-err" id="dippEEmail"></span>
        </div>
        <div class="dipp-f-campo">
          <label class="req">Teléfono</label>
          <input type="tel" id="dippFTelefono" placeholder="600 000 000">
          <span class="dipp-err" id="dippETelefono"></span>
        </div>
        <div class="dipp-f-campo">
          <label class="req">Código postal</label>
          <input type="text" id="dippFCP" placeholder="41001" maxlength="5">
          <span class="dipp-err" id="dippECP"></span>
        </div>
        <div class="dipp-f-campo dipp-full">
          <label>Mensaje (opcional)</label>
          <textarea id="dippFMensaje" placeholder="Cuéntanos más sobre tu proyecto…"></textarea>
        </div>
      </div>

      <button class="dipp-btn-enviar" onclick="dippEnviar()">Enviar simulación</button>
      <p class="dipp-modal-nota">Los precios de la simulación son orientativos. Un asesor Dippanel confirmará el presupuesto definitivo.</p>
    </div>

    <div class="dipp-success" id="dippSuccessBox">
      <div class="dipp-success-ico">✅</div>
      <h3>¡Simulación enviada!</h3>
      <p>Hemos recibido tu solicitud. Un asesor de Dippanel se pondrá en contacto contigo en menos de 24 horas con tu presupuesto personalizado.</p>
    </div>
  </div>
</div>
