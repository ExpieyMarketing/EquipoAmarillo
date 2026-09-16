<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class DP_Settings {

    const OPT = 'dippanel_config_settings';

    public static function init() {
        add_action( 'admin_menu',    [ __CLASS__, 'add_menu' ] );
        add_action( 'admin_init',    [ __CLASS__, 'register' ] );
        add_action( 'admin_enqueue_scripts', [ __CLASS__, 'enqueue_admin' ] );
        add_action( 'wp_ajax_dp_test_email', [ __CLASS__, 'test_email' ] );
        add_action( 'wp_ajax_dp_test_smtp',  [ __CLASS__, 'test_smtp' ] );
    }

    public static function add_menu() {
        add_options_page(
            'Configurador Dippanel',
            '🚪 Dippanel Config.',
            'manage_options',
            'dippanel-config',
            [ __CLASS__, 'render' ]
        );
    }

    public static function register() {
        register_setting( 'dippanel_group', self::OPT, [ 'sanitize_callback' => [ __CLASS__, 'sanitize' ] ] );
    }

    public static function sanitize( $in ): array {
        $old = self::get_all();
        $clean = [];
        $clean['email_destino']   = sanitize_text_field( $in['email_destino']   ?? 'info@dippanel.com' );
        $clean['confirmar_cliente'] = ! empty( $in['confirmar_cliente'] ) ? 1 : 0;
        $clean['smtp_host']       = sanitize_text_field( $in['smtp_host']   ?? '' );
        $clean['smtp_port']       = intval( $in['smtp_port'] ?? 587 );
        $clean['smtp_secure']     = in_array( $in['smtp_secure'] ?? '', ['tls','ssl',''] ) ? $in['smtp_secure'] : 'tls';
        $clean['smtp_user']       = sanitize_email( $in['smtp_user'] ?? '' );
        $new_pass = $in['smtp_pass'] ?? '';
        $clean['smtp_pass'] = ( $new_pass === '••••••••' || $new_pass === '' )
            ? ( $old['smtp_pass'] ?? '' )
            : DP_Mailer::encrypt( $new_pass );
        return $clean;
    }

    public static function get_all(): array {
        return wp_parse_args( get_option( self::OPT, [] ), [
            'email_destino'    => 'info@dippanel.com',
            'confirmar_cliente'=> 0,
            'smtp_host'        => '',
            'smtp_port'        => 587,
            'smtp_secure'      => 'tls',
            'smtp_user'        => '',
            'smtp_pass'        => '',
        ] );
    }

    public static function enqueue_admin( $hook ) {
        if ( $hook !== 'settings_page_dippanel-config' ) return;
        wp_enqueue_script( 'dp-admin', DP_URL . 'assets/admin.js', ['jquery'], DP_VERSION, true );
        wp_localize_script( 'dp-admin', 'dpAdmin', [
            'nonce'   => wp_create_nonce('dp_admin_nonce'),
            'ajaxurl' => admin_url('admin-ajax.php'),
        ]);
    }

    public static function test_email() {
        check_ajax_referer('dp_admin_nonce','nonce');
        if ( ! current_user_can('manage_options') ) wp_die();
        $to = sanitize_email( $_POST['to'] ?? get_option('admin_email') );
        $result = DP_Mailer::send([
            'nombre'     => 'Cliente de Prueba',
            'empresa'    => 'Empresa Test S.L.',
            'email'      => $to,
            'telefono'   => '600 000 000',
            'cod_postal' => '28001',
            'tipo'       => 'DP1 — Puerta Pivotante Frigorífica Comercial',
            'espesor'    => '80 mm (0°C)',
            'alto'       => '2100 mm',
            'ancho'      => '1000 mm',
            'cantidad'   => '2 ud.',
            'opciones'   => 'Capilla integrada, Visor fijo 400×400',
            'total'      => '2.340 € (sin IVA)',
            'comentarios'=> 'Email de prueba desde el panel de ajustes.',
        ]);
        is_wp_error($result)
            ? wp_send_json_error( $result->get_error_message() )
            : wp_send_json_success( 'Email enviado a ' . $to );
    }

    public static function test_smtp() {
        check_ajax_referer('dp_admin_nonce','nonce');
        if ( ! current_user_can('manage_options') ) wp_die();
        $opts = self::get_all();
        if ( empty($opts['smtp_host']) ) { wp_send_json_error('No hay configuración SMTP.'); }
        $conn = @fsockopen( $opts['smtp_host'], intval($opts['smtp_port']??587), $errno, $errstr, 5 );
        if ( $conn ) { fclose($conn); wp_send_json_success("✅ Conexión OK a {$opts['smtp_host']}:{$opts['smtp_port']}"); }
        else wp_send_json_error("❌ No se pudo conectar: {$errstr} ({$errno})");
    }

    public static function render() {
        $o = self::get_all();
        $has_pass = ! empty($o['smtp_pass']);
        ?>
        <div class="wrap" style="max-width:800px">
          <h1 style="display:flex;align-items:center;gap:10px;color:#001689">
            <span style="font-size:28px">🚪</span> Configurador Dippanel
            <span style="font-size:12px;font-weight:400;background:#001689;color:#fff;padding:3px 10px;border-radius:3px;margin-left:4px">v<?php echo DP_VERSION; ?></span>
          </h1>

          <?php settings_errors('dippanel_group'); ?>

          <div style="display:grid;grid-template-columns:1fr 300px;gap:24px;margin-top:20px">

            <div>
              <form method="post" action="options.php">
                <?php settings_fields('dippanel_group'); ?>

                <!-- Email destino -->
                <div style="background:#fff;border:1px solid #ddd;border-radius:6px;padding:20px 24px;margin-bottom:16px">
                  <h2 style="margin:0 0 16px;font-size:15px;color:#001689;border-bottom:2px solid #ff5000;padding-bottom:8px">📬 Correo de destino</h2>
                  <table class="form-table" style="margin:0">
                    <tr>
                      <th style="width:160px"><label>Email(s) destino</label></th>
                      <td>
                        <input type="text" name="<?php echo self::OPT; ?>[email_destino]"
                               value="<?php echo esc_attr($o['email_destino']); ?>"
                               class="regular-text" placeholder="info@dippanel.com">
                        <p class="description">Separa varios con comas. Por defecto: info@dippanel.com</p>
                      </td>
                    </tr>
                    <tr>
                      <th><label>Confirmar al cliente</label></th>
                      <td>
                        <label>
                          <input type="checkbox" name="<?php echo self::OPT; ?>[confirmar_cliente]"
                                 value="1" <?php checked($o['confirmar_cliente'],1); ?>>
                          Enviar email de confirmación al cliente
                        </label>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- SMTP -->
                <div style="background:#fff;border:1px solid #ddd;border-radius:6px;padding:20px 24px;margin-bottom:16px">
                  <h2 style="margin:0 0 6px;font-size:15px;color:#001689;border-bottom:2px solid #ff5000;padding-bottom:8px">⚙️ Configuración SMTP</h2>
                  <p style="color:#666;font-size:13px;margin:0 0 16px">Si lo dejas vacío WordPress usará su sistema de envío por defecto (puede ir a spam). Rellena estos datos con los de tu hosting para envío fiable.</p>
                  <table class="form-table" style="margin:0">
                    <tr>
                      <th style="width:160px"><label>Servidor SMTP</label></th>
                      <td>
                        <input type="text" name="<?php echo self::OPT; ?>[smtp_host]"
                               value="<?php echo esc_attr($o['smtp_host']); ?>"
                               class="regular-text" placeholder="mail.dippanel.com">
                        <p class="description">Ej: mail.tudominio.com · smtp.ionos.es · smtp.siteground.com</p>
                      </td>
                    </tr>
                    <tr>
                      <th><label>Puerto</label></th>
                      <td>
                        <input type="number" name="<?php echo self::OPT; ?>[smtp_port]"
                               value="<?php echo intval($o['smtp_port']); ?>"
                               style="width:100px" placeholder="587">
                        <select name="<?php echo self::OPT; ?>[smtp_secure]" style="margin-left:8px">
                          <option value="tls" <?php selected($o['smtp_secure'],'tls'); ?>>TLS (587)</option>
                          <option value="ssl" <?php selected($o['smtp_secure'],'ssl'); ?>>SSL (465)</option>
                          <option value=""    <?php selected($o['smtp_secure'],'');   ?>>Sin cifrado</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th><label>Usuario SMTP</label></th>
                      <td>
                        <input type="email" name="<?php echo self::OPT; ?>[smtp_user]"
                               value="<?php echo esc_attr($o['smtp_user']); ?>"
                               class="regular-text" placeholder="info@dippanel.com"
                               autocomplete="username">
                      </td>
                    </tr>
                    <tr>
                      <th><label>Contraseña SMTP</label></th>
                      <td>
                        <input type="password" name="<?php echo self::OPT; ?>[smtp_pass]"
                               value="<?php echo $has_pass ? '••••••••' : ''; ?>"
                               class="regular-text" autocomplete="new-password">
                        <?php if ($has_pass): ?>
                          <p class="description" style="color:green">✓ Contraseña guardada y cifrada. Déjala como está para no cambiarla.</p>
                        <?php else: ?>
                          <p class="description">Se almacena cifrada con AES-256.</p>
                        <?php endif; ?>
                      </td>
                    </tr>
                  </table>
                  <div style="margin-top:14px;padding-top:14px;border-top:1px solid #eee;display:flex;gap:10px;align-items:center">
                    <button type="button" id="dpTestSmtp" class="button">🔌 Probar conexión SMTP</button>
                    <span id="dpSmtpResult" style="font-size:13px"></span>
                  </div>
                </div>

                <?php submit_button('Guardar ajustes','primary','submit',false,['style'=>'background:#001689;border-color:#001689;font-size:15px;padding:6px 24px']); ?>
              </form>
            </div>

            <!-- Sidebar -->
            <div>
              <!-- Test email -->
              <div style="background:#fff;border:1px solid #ddd;border-radius:6px;padding:20px;margin-bottom:16px">
                <h3 style="margin:0 0 12px;font-size:14px;color:#001689">✉️ Prueba de envío</h3>
                <input type="email" id="dpTestTo" value="<?php echo esc_attr(get_option('admin_email')); ?>"
                       class="widefat" placeholder="tu@email.com" style="margin-bottom:8px">
                <button type="button" id="dpTestEmail" class="button button-primary" style="width:100%;background:#ff5000;border-color:#ff5000">
                  🚀 Enviar email de prueba
                </button>
                <div id="dpEmailResult" style="margin-top:8px;font-size:13px"></div>
              </div>

              <!-- Shortcode -->
              <div style="background:#fff;border:1px solid #ddd;border-radius:6px;padding:20px;margin-bottom:16px">
                <h3 style="margin:0 0 10px;font-size:14px;color:#001689">📋 Shortcode</h3>
                <p style="font-size:13px;color:#666;margin:0 0 8px">Añade esto en cualquier página:</p>
                <code style="display:block;background:#f0f4ff;border:1px solid #c0cce8;padding:8px 12px;border-radius:4px;font-size:14px;cursor:pointer" onclick="navigator.clipboard.writeText('[configurador_puertas]');this.style.background='#e0ffe0'">[configurador_puertas]</code>
                <p style="font-size:12px;color:#999;margin:6px 0 0">Haz clic para copiar</p>
              </div>

              <!-- SMTP quick ref -->
              <div style="background:#f0f4ff;border:1px solid #c0cce8;border-radius:6px;padding:16px;font-size:12px">
                <h3 style="margin:0 0 10px;font-size:13px;color:#001689">💡 SMTP por hosting</h3>
                <table style="width:100%;border-collapse:collapse">
                  <tr style="background:#001689;color:#fff"><th style="padding:4px 6px;text-align:left">Hosting</th><th style="padding:4px 6px;text-align:left">Host SMTP</th></tr>
                  <?php foreach([
                    ['SiteGround','mail.tudominio.com'],
                    ['Hostinger','smtp.hostinger.com'],
                    ['Raiola','mail.tudominio.com'],
                    ['IONOS','smtp.ionos.es'],
                    ['OVH','ssl0.ovh.net'],
                    ['Infomaniak','mail.infomaniak.com'],
                  ] as $i => [$h,$s]):?>
                  <tr style="background:<?php echo $i%2?'#e8f0f8':'#fff'; ?>">
                    <td style="padding:4px 6px"><?php echo $h; ?></td>
                    <td style="padding:4px 6px;font-family:monospace;font-size:11px"><?php echo $s; ?></td>
                  </tr>
                  <?php endforeach; ?>
                </table>
              </div>
            </div>

          </div>
        </div>
        <?php
    }
}
