<?php
/**
 * Plugin Name:  Dippanel Configurador de Puertas
 * Description:  Configurador interactivo de puertas frigoríficas con tarifas 2026 y envío de presupuestos por email. Shortcode: [configurador_puertas]
 * Version:      1.0.0
 * Author:       Dippanel
 * License:      GPL-2.0-or-later
 * Text Domain:  dippanel-configurador
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'DP_DIR',     plugin_dir_path( __FILE__ ) );
define( 'DP_URL',     plugin_dir_url( __FILE__ ) );
define( 'DP_VERSION', '1.0.0' );

require_once DP_DIR . 'includes/class-dp-mailer.php';
require_once DP_DIR . 'includes/class-dp-settings.php';
require_once DP_DIR . 'includes/class-dp-ghl.php';
require_once DP_DIR . 'includes/class-dp-ajax.php';
require_once DP_DIR . 'includes/class-dp-shortcode.php';

DP_Settings::init();
DP_Ajax::init();
DP_Shortcode::init();
