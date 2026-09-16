<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class DP_GHL {

    // Pega aquí la URL del webhook entrante (Inbound Webhook) de tu workflow de GHL.
    const WEBHOOK_URL = 'PEGA_AQUI_TU_URL_DEL_WEBHOOK_DE_GHL';

    public static function send_webhook( array $d ): void {
        if ( empty( self::WEBHOOK_URL ) || self::WEBHOOK_URL === 'PEGA_AQUI_TU_URL_DEL_WEBHOOK_DE_GHL' ) {
            return;
        }

        $payload = [
            'nombre'          => $d['nombre']      ?? '',
            'empresa'         => $d['empresa']     ?? '',
            'email'           => $d['email']       ?? '',
            'telefono'        => $d['telefono']    ?? '',
            'codigo_postal'   => $d['cod_postal']  ?? '',
            'tipo_puerta'     => $d['tipo']        ?? '',
            'espesor'         => $d['espesor']     ?? '',
            'alto'            => $d['alto']        ?? '',
            'ancho'           => $d['ancho']       ?? '',
            'cantidad'        => $d['cantidad']    ?? '',
            'opciones'        => $d['opciones']    ?? '',
            'total_estimado'  => $d['total']       ?? '',
            'comentarios'     => $d['comentarios'] ?? '',
            'origen'          => 'Configurador Web Dippanel',
        ];

        $response = wp_remote_post( self::WEBHOOK_URL, [
            'timeout' => 8,
            'headers' => [ 'Content-Type' => 'application/json' ],
            'body'    => wp_json_encode( $payload ),
        ] );

        if ( is_wp_error( $response ) ) {
            error_log( '[Dippanel GHL] Error enviando webhook: ' . $response->get_error_message() );
        }
    }
}
