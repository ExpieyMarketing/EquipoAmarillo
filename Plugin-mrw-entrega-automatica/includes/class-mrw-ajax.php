<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class MRW_Ajax {

    public static function init() {
        add_action( 'wp_ajax_mrw_test_conexion', [ __CLASS__, 'test_conexion' ] );
        add_action( 'wp_ajax_mrw_sync_now', [ __CLASS__, 'sync_now' ] );
    }

    public static function test_conexion() {
        check_ajax_referer( 'mrw_admin_nonce', 'nonce' );
        if ( ! current_user_can( 'manage_woocommerce' ) ) wp_die();

        $valor = sanitize_text_field( $_POST['valor'] ?? '' );
        if ( $valor === '' ) {
            wp_send_json_error( 'Indica un número de envío o referencia para probar.' );
        }

        $opts     = MRW_Settings::get_all();
        $resultado = MRW_Tracking_Client::get_envio_status( $valor, $opts['tipo_filtro'] );

        if ( is_wp_error( $resultado ) ) {
            wp_send_json_error( $resultado->get_error_message() );
        }

        wp_send_json_success( sprintf(
            "Estado: %s (%s)\nFecha entrega: %s %s\nPersona entrega: %s\nNº albarán: %s\nMensaje MRW: %s",
            $resultado['estado'],
            $resultado['estado_descripcion'],
            $resultado['fecha_entrega'] ?: '—',
            $resultado['hora_entrega'] ?: '',
            $resultado['persona_entrega'] ?: '—',
            $resultado['num_albaran'] ?: '—',
            $resultado['mensaje'] ?: '—'
        ) );
    }

    public static function sync_now() {
        check_ajax_referer( 'mrw_admin_nonce', 'nonce' );
        if ( ! current_user_can( 'manage_woocommerce' ) ) wp_die();

        $summary = MRW_Sync::run( true );

        wp_send_json_success( sprintf(
            "%d pedidos revisados\n%d completados\n%d omitidos (sin dato de envío)\n%d errores",
            $summary['checked'], $summary['updated'], $summary['skipped'], $summary['errors']
        ) );
    }
}
