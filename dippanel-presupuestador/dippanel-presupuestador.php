<?php
/**
 * Plugin Name:  Dippanel – Presupuestador Cámaras
 * Plugin URI:   https://dippanel.com
 * Description:  Calculadora interactiva de presupuestos para cámaras frigoríficas y puertas. Shortcode: [dippanel_presupuestador]
 * Version:      1.0.2
 * Author:       Dippanel
 * Author URI:   https://dippanel.com
 * License:      GPL-2.0+
 * Text Domain:  dippanel-presupuestador
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'DIPP_PRES_VERSION', '1.0.2' );
define( 'DIPP_PRES_URL',     plugin_dir_url( __FILE__ ) );
define( 'DIPP_PRES_PATH',    plugin_dir_path( __FILE__ ) );

require_once DIPP_PRES_PATH . 'includes/dipp-ghl-webhook.php';

/* ──────────────────────────────────────────
   ENCOLAR ESTILOS Y SCRIPTS
────────────────────────────────────────── */
add_action( 'wp_enqueue_scripts', 'dipp_pres_enqueue' );
function dipp_pres_enqueue() {
	// Solo carga los assets si el shortcode está en la página actual
	global $post;
	if ( ! is_a( $post, 'WP_Post' ) || ! has_shortcode( $post->post_content, 'dippanel_presupuestador' ) ) {
		return;
	}

	// Google Fonts – Josefin Sans
	wp_enqueue_style(
		'josefin-sans',
		'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&display=swap',
		[],
		null
	);

	// CSS del presupuestador
	wp_enqueue_style(
		'dipp-pres-css',
		DIPP_PRES_URL . 'assets/css/presupuestador.css',
		[ 'josefin-sans' ],
		DIPP_PRES_VERSION
	);

	// JS del presupuestador (defer, en footer)
	wp_enqueue_script(
		'dipp-pres-js',
		DIPP_PRES_URL . 'assets/js/presupuestador.js',
		[],
		DIPP_PRES_VERSION,
		true   // footer
	);

	wp_localize_script(
	'dipp-pres-js',
	'dippPresData',
	[
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'nonce'    => wp_create_nonce( 'dipp_pres_nonce' ),
	]
);

}

/* ──────────────────────────────────────────
   SHORTCODE
────────────────────────────────────────── */
add_shortcode( 'dippanel_presupuestador', 'dipp_pres_render' );
function dipp_pres_render() {
	ob_start();
	include DIPP_PRES_PATH . 'includes/template.php';
	return ob_get_clean();
}


add_action( 'wp_ajax_dipp_enviar_presupuesto', 'dipp_enviar_presupuesto' );
add_action( 'wp_ajax_nopriv_dipp_enviar_presupuesto', 'dipp_enviar_presupuesto' );

function dipp_enviar_presupuesto() {
	check_ajax_referer( 'dipp_pres_nonce', 'nonce' );

	$nombre    = sanitize_text_field( $_POST['nombre'] ?? '' );
	$apellidos = sanitize_text_field( $_POST['apellidos'] ?? '' );
	$empresa   = sanitize_text_field( $_POST['empresa'] ?? '' );
	$email     = sanitize_email( $_POST['email'] ?? '' );
	$telefono  = sanitize_text_field( $_POST['telefono'] ?? '' );
	$cp        = sanitize_text_field( $_POST['cp'] ?? '' );
	$mensaje   = sanitize_textarea_field( $_POST['mensaje'] ?? '' );
	$total     = sanitize_text_field( $_POST['total'] ?? '' );
	$desglose  = sanitize_textarea_field( $_POST['desglose'] ?? '' );

	if ( empty( $nombre ) || empty( $email ) || ! is_email( $email ) ) {
		wp_send_json_error( 'Faltan datos obligatorios.' );
	}

	$to      = 'info@dippanel.com';
	$subject = 'Nueva simulación de presupuesto Cámaras frigoríficas - Dippanel';

	$body = "Nueva simulación recibida:\n\n";
	$body .= "Nombre: $nombre $apellidos\n";
	$body .= "Empresa: $empresa\n";
	$body .= "Email: $email\n";
	$body .= "Teléfono: $telefono\n";
	$body .= "Código postal: $cp\n\n";
	$body .= "Mensaje:\n$mensaje\n\n";
	$body .= "Total estimado: $total\n\n";
	$body .= "Desglose:\n$desglose\n";

	$headers = [
	'Content-Type: text/plain; charset=UTF-8',
	'From: Dippanel <no-reply@dippanel.com>',
	'Reply-To: ' . $nombre . ' ' . $apellidos . ' <' . $email . '>',
];

	$sent = wp_mail( $to, $subject, $body, $headers );

	dipp_ghl_enviar_webhook( compact(
		'nombre','apellidos','empresa','email','telefono','cp','mensaje','total','desglose'
	) );

	if ( $sent ) {
		wp_send_json_success( 'Presupuesto enviado correctamente.' );
	}

	wp_send_json_error( 'No se pudo enviar el email.' );
}