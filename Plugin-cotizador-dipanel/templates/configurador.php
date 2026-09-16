<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
<?php /* Dippanel Configurador de Puertas — Template */ ?>
<div class="app">

<!-- HEADER -->
<div class="hdr">
  <div class="hdr-tag"><span>Tarifa 2026</span></div>
  <div class="hdr-main">
    <div class="hdr-title">Configurador de <em>Puertas Frigoríficas</em></div>
    
  </div>
</div>

<!-- PROGRESS -->
<div class="prog">
  <div class="prog-s active" id="pr1"><div class="pnum">1</div><span>Tipo de puerta</span></div>
  <div class="prog-s" id="pr2"><div class="pnum">2</div><span>Configuración</span></div>
  <div class="prog-s" id="pr3"><div class="pnum">3</div><span>Presupuesto</span></div>
</div>

<!-- PASO 1 -->
<div class="step active" id="s1">
  <div class="sec-title">Selecciona el tipo de puerta</div>
  <p class="sec-sub">Elige la familia de puerta para tu instalación</p>
  <div class="types-grid">
    <button class="type-card" data-type="DP1">
      <div class="tc-icon"><svg viewBox="0 0 48 48" fill="none"><rect x="10" y="4" width="24" height="40" rx="1" stroke="currentColor" stroke-width="2"/><line x1="10" y1="24" x2="34" y2="24" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2"/><circle cx="31" cy="24" r="2" fill="currentColor"/><line x1="10" y1="4" x2="10" y2="44" stroke="currentColor" stroke-width="3"/></svg></div>
      <div class="tc-name">Pivotante Comercial</div><div class="tc-code">DP1 · 80–100mm</div>
    </button>
    <button class="type-card" data-type="DP2">
      <div class="tc-icon"><svg viewBox="0 0 48 48" fill="none"><rect x="7" y="3" width="30" height="42" rx="1" stroke="currentColor" stroke-width="2"/><line x1="7" y1="24" x2="37" y2="24" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2"/><circle cx="33" cy="24" r="2" fill="currentColor"/><line x1="7" y1="3" x2="7" y2="45" stroke="currentColor" stroke-width="3"/></svg></div>
      <div class="tc-name">Pivotante Industrial</div><div class="tc-code">DP2 · 100–150mm</div>
    </button>
    <button class="type-card" data-type="DC1">
      <div class="tc-icon"><svg viewBox="0 0 48 48" fill="none"><rect x="4" y="8" width="24" height="34" rx="1" stroke="currentColor" stroke-width="2"/><line x1="28" y1="14" x2="44" y2="14" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/><rect x="4" y="5" width="40" height="5" rx="1" fill="currentColor" opacity=".2"/><circle cx="27" cy="25" r="2" fill="currentColor"/></svg></div>
      <div class="tc-name">Corredera Comercial</div><div class="tc-code">DC1 · 80–100mm</div>
    </button>
    <button class="type-card" data-type="DC2">
      <div class="tc-icon"><svg viewBox="0 0 48 48" fill="none"><rect x="3" y="7" width="28" height="36" rx="1" stroke="currentColor" stroke-width="2"/><line x1="31" y1="13" x2="45" y2="13" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/><rect x="3" y="4" width="42" height="5" rx="1" fill="currentColor" opacity=".2"/><circle cx="30" cy="25" r="2" fill="currentColor"/></svg></div>
      <div class="tc-name">Corredera Industrial</div><div class="tc-code">DC2 · 100–150mm</div>
    </button>
    <button class="type-card" data-type="DC3">
      <div class="tc-icon"><svg viewBox="0 0 48 48" fill="none"><rect x="5" y="8" width="22" height="34" rx="1" stroke="currentColor" stroke-width="2"/><line x1="27" y1="14" x2="43" y2="14" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/><rect x="5" y="5" width="38" height="5" rx="1" fill="currentColor" opacity=".2"/><text x="7" y="40" font-size="7" fill="currentColor" font-family="sans-serif" opacity=".6">40mm</text></svg></div>
      <div class="tc-name">Corredera Servicio</div><div class="tc-code">DC3 · 40mm</div>
    </button>
    <button class="type-card" data-type="DB140">
      <div class="tc-icon"><svg viewBox="0 0 48 48" fill="none"><path d="M8 24 L24 6 L40 24 L24 42 Z" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="24" cy="24" r="2.5" fill="currentColor"/><line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity=".35"/></svg></div>
      <div class="tc-name">Vaivén Rígida</div><div class="tc-code">DB140 · 40mm</div>
    </button>
    <button class="type-card" data-type="DS1">
      <div class="tc-icon"><svg viewBox="0 0 48 48" fill="none"><rect x="10" y="6" width="26" height="36" rx="1" stroke="currentColor" stroke-width="2"/><rect x="14" y="11" width="16" height="12" rx="1" stroke="currentColor" stroke-width="1.2"/><circle cx="34" cy="26" r="2" fill="currentColor"/><line x1="10" y1="6" x2="10" y2="42" stroke="currentColor" stroke-width="3"/></svg></div>
      <div class="tc-name">Pivotante Servicio</div><div class="tc-code">DS1 · 40mm</div>
    </button>
    <button class="type-card" data-type="DB215">
      <div class="tc-icon"><svg viewBox="0 0 48 48" fill="none"><path d="M10 24 L16 6 L32 6 L38 24 L32 42 L16 42 Z" stroke="currentColor" stroke-width="2" fill="none"/><line x1="13" y1="24" x2="35" y2="24" stroke="currentColor" stroke-width="1.2"/><text x="15" y="29" font-size="6" fill="currentColor" font-family="sans-serif" opacity=".6">POLI</text></svg></div>
      <div class="tc-name">Vaivén Polietileno</div><div class="tc-code">DB215 · 15mm</div>
    </button>
    <button class="type-card" data-type="DCL3">
      <div class="tc-icon"><svg viewBox="0 0 48 48" fill="none"><line x1="9" y1="7" x2="9" y2="42" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><line x1="17" y1="7" x2="17" y2="42" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><line x1="25" y1="7" x2="25" y2="42" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><line x1="33" y1="7" x2="33" y2="42" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><line x1="41" y1="7" x2="41" y2="42" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><rect x="6" y="5" width="37" height="4" rx="1" fill="currentColor" opacity=".35"/></svg></div>
      <div class="tc-name">Cortina de Lamas</div><div class="tc-code">DCL3 · 200×3mm</div>
    </button>
  </div>
</div>

<!-- PASO 2 -->
<div class="step" id="s2">
  <button class="back-btn" id="back1"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M7.707 13.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L4.414 8H14a1 1 0 010 2H4.414l3.293 3.293a1 1 0 010 1.414z"/></svg> Cambiar tipo</button>
  <div class="sec-title" id="s2title">Configura tu puerta</div>
  <p class="sec-sub" id="s2sub">Selecciona medidas y opciones</p>
  <div class="cfg-grid">
    <div>
      <div class="field" id="fEspField" style="display:none">
        <label class="lbl">Espesor</label>
        <div class="sel-wrap"><select class="inp" id="sEsp"></select></div>
      </div>
      <div class="field"><label class="lbl">Alto (mm)</label><div class="sel-wrap"><select class="inp" id="sAlto"></select></div></div>
      <div class="field"><label class="lbl">Ancho (mm)</label><div class="sel-wrap"><select class="inp" id="sAncho"></select></div>
        <div id="hojaIndicator" style="display:none"></div>
      </div>
      <div class="field">
        <label class="lbl">Cantidad</label>
        <div class="qty-wrap">
          <button class="qty-btn" id="qm" type="button">−</button>
          <input class="qty-in" type="number" id="qn" value="1" min="1" max="99">
          <button class="qty-btn" id="qp" type="button">+</button>
        </div>
      </div>
      <div id="opsWrap" style="display:none">
        <div class="ops-title">Opciones adicionales</div>
        <div id="opsList"></div>
      </div>
    </div>
    <div>
      <div class="sum-card">
        <div class="sum-head"><h3>Resumen</h3><div class="sum-badge" id="sBadge">—</div></div>
        <div class="sum-body">
          <div class="sum-product" id="sProd">—</div>
          <div class="sum-spec"><span class="k">Espesor</span><span class="v" id="sEspesor">—</span></div>
          <div class="sum-spec"><span class="k">Medidas</span><span class="v" id="sMedidas">—</span></div>
          <div class="sum-spec"><span class="k">Superficie</span><span class="v" id="sM2">—</span></div>
          <div class="sum-spec"><span class="k">Cantidad</span><span class="v" id="sCant">1 ud.</span></div>
          <div class="price-block">
            <div class="price-row"><span>Subtotal puertas</span><span id="pBase">0 €</span></div>
            <div class="price-row"><span>Opciones extra</span><span id="pOps">0 €</span></div>
            <div class="price-total">
              <span class="price-total-lbl">Total</span>
              <span class="price-total-val" id="pTotal">0 €</span>
            </div>
          </div>
          <p class="price-iva">Sin IVA · Tarifa 2026 · Orientativo</p>
          <button class="cta-btn" id="btnSolicitar" type="button">
            Consigue tu descuento
            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8.293 2.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 9H2a1 1 0 010-2h9.586L8.293 3.707a1 1 0 010-1.414z"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- PASO 3 -->
<div class="step" id="s3">
  <button class="back-btn" id="back2"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M7.707 13.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L4.414 8H14a1 1 0 010 2H4.414l3.293 3.293a1 1 0 010 1.414z"/></svg> Volver</button>
  <div class="q-layout">
    <div>
      <div class="cta-panel">
        <div class="cta-panel-badge">Sin compromiso</div>
        <h3>Solicita tu presupuesto y descubre el <em>descuento exclusivo</em> que nuestros asesores tienen preparado para ti</h3>
        <p>Un especialista revisará su solicitud y se pondrá en contacto con usted para presentarle una oferta personalizada.</p>
        <hr class="cta-hr">
        <div id="ctaRows"></div>
        <div class="cta-total-box">
          <span class="tl">Total orientativo</span>
          <span class="tv" id="ctaTotal">0 €</span>
        </div>
        <div class="trust-list">
          <div class="trust-item"><svg viewBox="0 0 14 14" fill="currentColor"><path d="M12 3L5.5 10 2 6.5"/></svg>Respuesta rápida y personalizada</div>
          <div class="trust-item"><svg viewBox="0 0 14 14" fill="currentColor"><path d="M12 3L5.5 10 2 6.5"/></svg>Sin compromiso de compra</div>
          <div class="trust-item"><svg viewBox="0 0 14 14" fill="currentColor"><path d="M12 3L5.5 10 2 6.5"/></svg>Más de 30 años en el sector</div>
          <div class="trust-item"><svg viewBox="0 0 14 14" fill="currentColor"><path d="M12 3L5.5 10 2 6.5"/></svg>Descuento exclusivo para tu zona</div>
        </div>
      </div>
    </div>
    <div>
      <div class="form-panel">
        <div class="form-head">
          <h3>Tus datos de contacto</h3>
          <p>Campos marcados con <strong style="color:var(--red)">*</strong> son obligatorios</p>
        </div>
        <div class="form-body">
          <form id="qForm" novalidate>
            <div class="field-row">
              <div class="field">
                <label class="lbl" for="fNom">Nombre <span class="req">*</span></label>
                <input class="inp" type="text" id="fNom" placeholder="Tu nombre" required>
                <div class="err-msg" id="eNom">Campo obligatorio</div>
              </div>
              <div class="field">
                <label class="lbl" for="fApe">Apellidos <span class="req">*</span></label>
                <input class="inp" type="text" id="fApe" placeholder="Tus apellidos" required>
                <div class="err-msg" id="eApe">Campo obligatorio</div>
              </div>
            </div>
            <div class="field">
              <label class="lbl" for="fEmp">Empresa <span class="req">*</span></label>
              <input class="inp" type="text" id="fEmp" placeholder="Nombre de tu empresa" required>
              <div class="err-msg" id="eEmp">Campo obligatorio</div>
            </div>
            <div class="field-row">
              <div class="field">
                <label class="lbl" for="fMail">Email <span class="req">*</span></label>
                <input class="inp" type="email" id="fMail" placeholder="correo@empresa.com" required>
                <div class="err-msg" id="eMail">Email no válido</div>
              </div>
              <div class="field">
                <label class="lbl" for="fTel">Teléfono <span class="req">*</span></label>
                <input class="inp" type="tel" id="fTel" placeholder="600 000 000" required>
                <div class="err-msg" id="eTel">Campo obligatorio</div>
              </div>
            </div>
            <div class="field" style="max-width:180px">
              <label class="lbl" for="fCp">Código postal <span class="req">*</span></label>
              <input class="inp" type="text" id="fCp" placeholder="28001" maxlength="5" pattern="[0-9]{5}" required>
              <div class="err-msg" id="eCp">5 dígitos requeridos</div>
            </div>
            <div class="field">
              <label class="lbl" for="fMsg">Comentarios adicionales</label>
              <textarea class="inp" id="fMsg" placeholder="Detalla cualquier aspecto adicional de tu instalación..."></textarea>
            </div>
            <input type="hidden" id="fCfg">
            <input type="hidden" id="fOpNames">
            <div class="submit-row">
              <button class="submit-btn" type="submit" id="btnSub">
                Solicitar presupuesto con descuento
                <svg viewBox="0 0 16 16" fill="currentColor"><path d="M14.53 8.97l-5 5a.75.75 0 01-1.06-1.06L12.19 9H2a.75.75 0 010-1.5h10.19L8.47 3.09a.75.75 0 011.06-1.06l5 5a.75.75 0 010 1.94z"/></svg>
              </button>
              <p class="privacy">Al enviar aceptas nuestra <a href="https://dippanel.com/politica-de-privacidad/" target="_blank" rel="noopener">política de privacidad</a></p>
            </div>
          </form>
          <div class="success-box" id="fSuccess">
            <div class="success-icon">✓</div>
            <h3>¡Solicitud enviada!</h3>
            <p>Nuestro equipo revisará tu configuración y te contactará en menos de 24 h con tu oferta personalizada.</p>
            <button id="btnNueva" type="button">Nueva consulta</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="ftr">
  <p>Configurador de Puertas Frigoríficas · Tarifa 2026</p>
  <p>Precios orientativos sin IVA · Sujetos a confirmación</p>
</div>
</div>

<div class="toast" id="toast"></div>
