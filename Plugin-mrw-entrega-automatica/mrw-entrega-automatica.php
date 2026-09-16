<?php
/**
 * Plugin Name:  MRW - Entrega Automática de Pedidos
 * Description:  Consulta el TrackingServices de MRW (SAGEC) y pasa automáticamente a "Completado" los pedidos de WooCommerce cuyo envío MRW figura como entregado.
 * Version:      1.0.0
 * Author:       Equipo Amarillo
 * License:      GPL-2.0-or-later
 * Text Domain:  mrw-entrega-automatica
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'MRW_DIR',     plugin_dir_path( __FILE__ ) );
define( 'MRW_URL',     plugin_dir_url( __FILE__ ) );
define( 'MRW_VERSION', '1.0.0' );

require_once MRW_DIR . 'includes/class-mrw-crypto.php';
require_once MRW_DIR . 'includes/class-mrw-settings.php';
require_once MRW_DIR . 'includes/class-mrw-tracking-client.php';
require_once MRW_DIR . 'includes/class-mrw-sync.php';
require_once MRW_DIR . 'includes/class-mrw-cron.php';
require_once MRW_DIR . 'includes/class-mrw-ajax.php';

MRW_Settings::init();
MRW_Cron::init();
MRW_Ajax::init();

register_activation_hook( __FILE__, [ 'MRW_Cron', 'activate' ] );
register_deactivation_hook( __FILE__, [ 'MRW_Cron', 'deactivate' ] );

add_action( 'admin_notices', function () {
    if ( ! class_exists( 'WooCommerce' ) ) {
        echo '<div class="notice notice-error"><p><strong>MRW - Entrega Automática:</strong> este plugin necesita WooCommerce activo para funcionar.</p></div>';
        return;
    }
    if ( ! class_exists( 'SoapClient' ) ) {
        echo '<div class="notice notice-error"><p><strong>MRW - Entrega Automática:</strong> la extensión PHP <code>soap</code> no está habilitada en este servidor. Pide a tu hosting que la active.</p></div>';
    }
} );
