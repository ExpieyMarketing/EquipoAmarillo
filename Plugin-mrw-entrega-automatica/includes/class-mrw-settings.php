<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class MRW_Settings {

    const OPT = 'mrw_entrega_settings';

    public static function init() {
        add_action( 'admin_menu', [ __CLASS__, 'add_menu' ] );
        add_action( 'admin_init', [ __CLASS__, 'register' ] );
        add_action( 'admin_enqueue_scripts', [ __CLASS__, 'enqueue_admin' ] );
    }

    public static function add_menu() {
        add_menu_page(
            'MRW Entrega Automática',
            '📦 MRW Entregas',
            'manage_woocommerce',
            'mrw-entrega-automatica',
            [ __CLASS__, 'render' ],
            'dashicons-airplane',
            56
        );
    }

    public static function register() {
        register_setting( 'mrw_entrega_group', self::OPT, [ 'sanitize_callback' => [ __CLASS__, 'sanitize' ] ] );
    }

    public static function sanitize( $in ): array {
        $old   = self::get_all();
        $clean = [];

        $clean['entorno']     = in_array( $in['entorno'] ?? '', [ 'test', 'produccion' ], true ) ? $in['entorno'] : 'test';
        $clean['sagec_login'] = sanitize_text_field( $in['sagec_login'] ?? '' );

        $new_pass = $in['sagec_pass'] ?? '';
        $clean['sagec_pass'] = ( $new_pass === '••••••••' || $new_pass === '' )
            ? ( $old['sagec_pass'] ?? '' )
            : MRW_Crypto::encrypt( $new_pass );

        $clean['tipo_filtro']         = in_array( $in['tipo_filtro'] ?? '', [ 'numero_envio', 'referencia' ], true ) ? $in['tipo_filtro'] : 'numero_envio';
        $clean['meta_key_envio']      = sanitize_text_field( $in['meta_key_envio'] ?? '_mrw_numero_envio' );
        $clean['meta_key_referencia'] = sanitize_text_field( $in['meta_key_referencia'] ?? '' );

        $estados_validos = array_keys( wc_get_order_statuses() );
        $estados_in      = array_map( fn( $s ) => 'wc-' === substr( $s, 0, 3 ) ? $s : 'wc-' . $s, (array) ( $in['estados_origen'] ?? [] ) );
        $clean['estados_origen'] = array_values( array_intersect( $estados_validos, $estados_in ) );
        if ( empty( $clean['estados_origen'] ) ) $clean['estados_origen'] = [ 'wc-processing' ];
        // wc_get_orders espera los estados sin el prefijo "wc-".
        $clean['estados_origen'] = array_map( fn( $s ) => preg_replace( '/^wc-/', '', $s ), $clean['estados_origen'] );

        $estado_destino = 'wc-' === substr( $in['estado_destino'] ?? '', 0, 3 ) ? $in['estado_destino'] : 'wc-' . ( $in['estado_destino'] ?? 'completed' );
        $clean['estado_destino'] = in_array( $estado_destino, $estados_validos, true ) ? preg_replace( '/^wc-/', '', $estado_destino ) : 'completed';

        $clean['filtro_metodo_envio'] = sanitize_text_field( $in['filtro_metodo_envio'] ?? '' );
        $clean['dias_atras']          = max( 1, intval( $in['dias_atras'] ?? 30 ) );
        $clean['limite_pedidos']      = max( 1, min( 500, intval( $in['limite_pedidos'] ?? 100 ) ) );
        $clean['intervalo']           = in_array( $in['intervalo'] ?? '', [ 'mrw_quince_min', 'mrw_treinta_min', 'hourly' ], true ) ? $in['intervalo'] : 'mrw_treinta_min';
        $clean['activo']              = ! empty( $in['activo'] ) ? 1 : 0;

        return $clean;
    }

    public static function get_all(): array {
        return wp_parse_args( get_option( self::OPT, [] ), [
            'entorno'             => 'test',
            'sagec_login'         => '',
            'sagec_pass'          => '',
            'tipo_filtro'         => 'numero_envio',
            'meta_key_envio'      => '_mrw_numero_envio',
            'meta_key_referencia' => '',
            'estados_origen'      => [ 'processing' ],
            'estado_destino'      => 'completed',
            'filtro_metodo_envio' => 'mrw',
            'dias_atras'          => 30,
            'limite_pedidos'      => 100,
            'intervalo'           => 'mrw_treinta_min',
            'activo'              => 0,
        ] );
    }

    public static function enqueue_admin( $hook ) {
        if ( $hook !== 'toplevel_page_mrw-entrega-automatica' ) return;
        wp_enqueue_script( 'mrw-admin', MRW_URL . 'assets/admin.js', [ 'jquery' ], MRW_VERSION, true );
        wp_localize_script( 'mrw-admin', 'mrwAdmin', [
            'nonce'   => wp_create_nonce( 'mrw_admin_nonce' ),
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
        ] );
    }

    public static function render() {
        if ( ! class_exists( 'WooCommerce' ) ) {
            echo '<div class="wrap"><h1>📦 MRW Entrega Automática</h1><p>Este plugin necesita WooCommerce activo.</p></div>';
            return;
        }

        $o          = self::get_all();
        $has_pass   = ! empty( $o['sagec_pass'] );
        $estados_wc = wc_get_order_statuses();
        $log        = MRW_Sync::get_log();
        ?>
        <div class="wrap" style="max-width:960px">
            <h1 style="display:flex;align-items:center;gap:10px;color:#001689">
                <span style="font-size:28px">📦</span> MRW — Entrega Automática de Pedidos
                <span style="font-size:12px;font-weight:400;background:#001689;color:#fff;padding:3px 10px;border-radius:3px;margin-left:4px">v<?php echo esc_html( MRW_VERSION ); ?></span>
            </h1>
            <p style="color:#666">Consulta el <em>TrackingServices</em> de MRW y pasa a "Completado" los pedidos cuyo envío MRW ya consta como entregado, sin intervención manual.</p>

            <?php settings_errors( 'mrw_entrega_group' ); ?>

            <div style="display:grid;grid-template-columns:1fr 320px;gap:24px;margin-top:16px">
                <div>
                    <form method="post" action="options.php">
                        <?php settings_fields( 'mrw_entrega_group' ); ?>

                        <!-- Credenciales -->
                        <div style="background:#fff;border:1px solid #ddd;border-radius:6px;padding:20px 24px;margin-bottom:16px">
                            <h2 style="margin:0 0 16px;font-size:15px;color:#001689;border-bottom:2px solid #ff5000;padding-bottom:8px">🔑 Credenciales SAGEC (MRW)</h2>
                            <table class="form-table" style="margin:0">
                                <tr>
                                    <th style="width:180px"><label>Entorno</label></th>
                                    <td>
                                        <select name="<?php echo self::OPT; ?>[entorno]">
                                            <option value="test" <?php selected( $o['entorno'], 'test' ); ?>>Pruebas (trackingservice-test.mrw.es)</option>
                                            <option value="produccion" <?php selected( $o['entorno'], 'produccion' ); ?>>Producción (trackingservice.mrw.es)</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th><label>Usuario SAGEC</label></th>
                                    <td><input type="text" name="<?php echo self::OPT; ?>[sagec_login]" value="<?php echo esc_attr( $o['sagec_login'] ); ?>" class="regular-text" autocomplete="off"></td>
                                </tr>
                                <tr>
                                    <th><label>Contraseña SAGEC</label></th>
                                    <td>
                                        <input type="password" name="<?php echo self::OPT; ?>[sagec_pass]" value="<?php echo $has_pass ? '••••••••' : ''; ?>" class="regular-text" autocomplete="new-password">
                                        <?php if ( $has_pass ) : ?>
                                            <p class="description" style="color:green">✓ Contraseña guardada y cifrada. Déjala así para no cambiarla.</p>
                                        <?php else : ?>
                                            <p class="description">Usuario y contraseña proporcionados por MRW para los webservices SAGEC. Se guarda cifrada (AES-256).</p>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <!-- Identificación del envío -->
                        <div style="background:#fff;border:1px solid #ddd;border-radius:6px;padding:20px 24px;margin-bottom:16px">
                            <h2 style="margin:0 0 16px;font-size:15px;color:#001689;border-bottom:2px solid #ff5000;padding-bottom:8px">🔗 Cómo identificar el envío de cada pedido</h2>
                            <table class="form-table" style="margin:0">
                                <tr>
                                    <th style="width:180px"><label>Buscar por</label></th>
                                    <td>
                                        <label style="display:block;margin-bottom:6px">
                                            <input type="radio" name="<?php echo self::OPT; ?>[tipo_filtro]" value="numero_envio" <?php checked( $o['tipo_filtro'], 'numero_envio' ); ?>>
                                            Número de envío MRW guardado como metadato del pedido
                                        </label>
                                        <label style="display:block">
                                            <input type="radio" name="<?php echo self::OPT; ?>[tipo_filtro]" value="referencia" <?php checked( $o['tipo_filtro'], 'referencia' ); ?>>
                                            Referencia de cliente que se envió a MRW al crear la etiqueta
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <th><label>Metadato del nº de envío MRW</label></th>
                                    <td>
                                        <input type="text" name="<?php echo self::OPT; ?>[meta_key_envio]" value="<?php echo esc_attr( $o['meta_key_envio'] ); ?>" class="regular-text" placeholder="_mrw_numero_envio">
                                        <p class="description">
                                            Nombre del campo (custom field) donde vuestro plugin de MRW guarda el número de envío/albarán en cada pedido.
                                            Para verlo: abre un pedido ya enviado por MRW → panel "Datos personalizados"/"Custom Fields" al final de la pantalla → copia el nombre exacto del campo.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <th><label>Metadato de referencia de cliente</label></th>
                                    <td>
                                        <input type="text" name="<?php echo self::OPT; ?>[meta_key_referencia]" value="<?php echo esc_attr( $o['meta_key_referencia'] ); ?>" class="regular-text" placeholder="Déjalo vacío para usar el nº de pedido">
                                        <p class="description">Solo si eliges "Referencia de cliente" arriba. Si se deja vacío, se usará el número de pedido de WooCommerce.</p>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <!-- Reglas de sincronización -->
                        <div style="background:#fff;border:1px solid #ddd;border-radius:6px;padding:20px 24px;margin-bottom:16px">
                            <h2 style="margin:0 0 16px;font-size:15px;color:#001689;border-bottom:2px solid #ff5000;padding-bottom:8px">⚙️ Reglas de sincronización</h2>
                            <table class="form-table" style="margin:0">
                                <tr>
                                    <th style="width:180px"><label>Pedidos a revisar</label></th>
                                    <td>
                                        <?php foreach ( $estados_wc as $slug => $nombre ) : ?>
                                            <label style="display:inline-block;margin:0 16px 6px 0">
                                                <input type="checkbox" name="<?php echo self::OPT; ?>[estados_origen][]" value="<?php echo esc_attr( $slug ); ?>"
                                                    <?php checked( in_array( preg_replace( '/^wc-/', '', $slug ), $o['estados_origen'], true ) ); ?>>
                                                <?php echo esc_html( $nombre ); ?>
                                            </label>
                                        <?php endforeach; ?>
                                        <p class="description">Normalmente solo "Procesando".</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th><label>Estado al confirmarse la entrega</label></th>
                                    <td>
                                        <select name="<?php echo self::OPT; ?>[estado_destino]">
                                            <?php foreach ( $estados_wc as $slug => $nombre ) : ?>
                                                <option value="<?php echo esc_attr( $slug ); ?>" <?php selected( preg_replace( '/^wc-/', '', $o['estado_destino'] ), preg_replace( '/^wc-/', '', $slug ) ); ?>><?php echo esc_html( $nombre ); ?></option>
                                            <?php endforeach; ?>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th><label>Filtrar por método de envío</label></th>
                                    <td>
                                        <input type="text" name="<?php echo self::OPT; ?>[filtro_metodo_envio]" value="<?php echo esc_attr( $o['filtro_metodo_envio'] ); ?>" class="regular-text" placeholder="mrw">
                                        <p class="description">Solo se revisan pedidos cuyo método de envío contenga este texto (déjalo vacío para revisar todos).</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th><label>Antigüedad máxima</label></th>
                                    <td>
                                        <input type="number" name="<?php echo self::OPT; ?>[dias_atras]" value="<?php echo intval( $o['dias_atras'] ); ?>" style="width:90px" min="1"> días
                                        <p class="description">No se consultan pedidos más antiguos que esto (evita revisar pedidos muy viejos).</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th><label>Pedidos por ejecución</label></th>
                                    <td><input type="number" name="<?php echo self::OPT; ?>[limite_pedidos]" value="<?php echo intval( $o['limite_pedidos'] ); ?>" style="width:90px" min="1" max="500"></td>
                                </tr>
                                <tr>
                                    <th><label>Frecuencia de revisión</label></th>
                                    <td>
                                        <select name="<?php echo self::OPT; ?>[intervalo]">
                                            <option value="mrw_quince_min" <?php selected( $o['intervalo'], 'mrw_quince_min' ); ?>>Cada 15 minutos</option>
                                            <option value="mrw_treinta_min" <?php selected( $o['intervalo'], 'mrw_treinta_min' ); ?>>Cada 30 minutos</option>
                                            <option value="hourly" <?php selected( $o['intervalo'], 'hourly' ); ?>>Cada hora</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th><label>Sincronización automática</label></th>
                                    <td>
                                        <label>
                                            <input type="checkbox" name="<?php echo self::OPT; ?>[activo]" value="1" <?php checked( $o['activo'], 1 ); ?>>
                                            Activar la revisión automática programada
                                        </label>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <?php submit_button( 'Guardar ajustes', 'primary', 'submit', false, [ 'style' => 'background:#001689;border-color:#001689;font-size:15px;padding:6px 24px' ] ); ?>
                    </form>
                </div>

                <!-- Sidebar -->
                <div>
                    <div style="background:#fff;border:1px solid #ddd;border-radius:6px;padding:20px;margin-bottom:16px">
                        <h3 style="margin:0 0 12px;font-size:14px;color:#001689">🔌 Probar conexión</h3>
                        <input type="text" id="mrwTestValor" class="widefat" placeholder="Nº de envío o referencia de prueba" style="margin-bottom:8px">
                        <button type="button" id="mrwTestConexion" class="button button-primary" style="width:100%;background:#ff5000;border-color:#ff5000">🔎 Consultar en MRW</button>
                        <div id="mrwTestResult" style="margin-top:8px;font-size:13px;white-space:pre-wrap"></div>
                    </div>

                    <div style="background:#fff;border:1px solid #ddd;border-radius:6px;padding:20px;margin-bottom:16px">
                        <h3 style="margin:0 0 12px;font-size:14px;color:#001689">▶️ Sincronizar ahora</h3>
                        <p style="font-size:12px;color:#666;margin:0 0 10px">Ejecuta la revisión inmediatamente, sin esperar a la próxima programación.</p>
                        <button type="button" id="mrwSyncNow" class="button button-primary" style="width:100%;background:#001689;border-color:#001689">🚀 Ejecutar sincronización</button>
                        <div id="mrwSyncResult" style="margin-top:8px;font-size:13px;white-space:pre-wrap"></div>
                    </div>

                    <div style="background:#fff;border:1px solid #ddd;border-radius:6px;padding:20px;max-height:420px;overflow:auto">
                        <h3 style="margin:0 0 12px;font-size:14px;color:#001689">📜 Historial</h3>
                        <?php if ( empty( $log ) ) : ?>
                            <p style="font-size:12px;color:#999">Todavía no se ha ejecutado ninguna sincronización.</p>
                        <?php else : ?>
                            <?php foreach ( $log as $entrada ) : ?>
                                <div style="border-bottom:1px solid #eee;padding:8px 0;font-size:12px">
                                    <strong><?php echo esc_html( $entrada['fecha'] ); ?></strong>
                                    <?php echo $entrada['manual'] ? ' <span style="color:#ff5000">(manual)</span>' : ''; ?>
                                    <br>
                                    <span style="color:#555"><?php echo esc_html( $entrada['resumen'] ); ?></span>
                                    <?php if ( ! empty( $entrada['detalles'] ) ) : ?>
                                        <details style="margin-top:4px">
                                            <summary style="cursor:pointer;color:#001689">Detalle</summary>
                                            <ul style="margin:6px 0 0 16px;padding:0">
                                                <?php foreach ( $entrada['detalles'] as $linea ) : ?>
                                                    <li style="color:#666"><?php echo esc_html( $linea ); ?></li>
                                                <?php endforeach; ?>
                                            </ul>
                                        </details>
                                    <?php endif; ?>
                                </div>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
}
