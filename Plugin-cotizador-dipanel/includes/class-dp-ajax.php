<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class DP_Ajax {

    public static function init() {
        add_action( 'wp_ajax_dippanel_presupuesto',        [ __CLASS__, 'handle' ] );
        add_action( 'wp_ajax_nopriv_dippanel_presupuesto', [ __CLASS__, 'handle' ] );
    }

    public static function handle() {
        if ( ! check_ajax_referer( 'dp_presupuesto_nonce', 'nonce', false ) ) {
            wp_send_json_error( 'Petición no válida.' );
        }

        $nombre      = sanitize_text_field( $_POST['nombre']      ?? '' );
        $empresa     = sanitize_text_field( $_POST['empresa']     ?? '' );
        $email       = sanitize_email(      $_POST['email']       ?? '' );
        $telefono    = sanitize_text_field( $_POST['telefono']    ?? '' );
        $cod_postal  = sanitize_text_field( $_POST['cod_postal']  ?? '' );
        $tipo        = sanitize_text_field( $_POST['tipo']        ?? '' );
        $espesor     = sanitize_text_field( $_POST['espesor']     ?? '' );
        $alto        = sanitize_text_field( $_POST['alto']        ?? '' );
        $ancho       = sanitize_text_field( $_POST['ancho']       ?? '' );
        $cantidad    = sanitize_text_field( $_POST['cantidad']    ?? '' );
        $opciones    = sanitize_textarea_field( $_POST['opciones']    ?? '' );
        $total       = sanitize_text_field( $_POST['total']       ?? '' );
        $comentarios = sanitize_textarea_field( $_POST['comentarios'] ?? '' );

        if ( empty( $nombre ) || ! is_email( $email ) ) {
            wp_send_json_error( 'Datos incompletos.' );
        }

        $datos = compact(
            'nombre','empresa','email','telefono','cod_postal',
            'tipo','espesor','alto','ancho','cantidad','opciones','total','comentarios'
        );

        $result = DP_Mailer::send( $datos );

        DP_GHL::send_webhook( $datos );

        if ( is_wp_error( $result ) ) {
            wp_send_json_error( $result->get_error_message() );
        }

        wp_send_json_success( 'Presupuesto enviado correctamente.' );
    }
}
