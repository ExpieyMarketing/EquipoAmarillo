<?php
if ( ! defined( 'ABSPATH' ) ) exit;

// Pega aquí la URL del webhook entrante (Inbound Webhook) de tu workflow de GHL para Cámaras.
define( 'DIPP_GHL_WEBHOOK_URL', 'PEGA_AQUI_TU_URL_DEL_WEBHOOK_DE_GHL' );

function dipp_ghl_enviar_webhook( array $d ): void {
    if ( empty( DIPP_GHL_WEBHOOK_URL ) || DIPP_GHL_WEBHOOK_URL === 'PEGA_AQUI_TU_URL_DEL_WEBHOOK_DE_GHL' ) {
        return;
    }

    $payload = [
        'nombre'         => $d['nombre']    ?? '',
        'apellidos'      => $d['apellidos'] ?? '',
        'empresa'        => $d['empresa']   ?? '',
        'email'          => $d['email']     ?? '',
        'telefono'       => $d['telefono']  ?? '',
        'codigo_postal'  => $d['cp']        ?? '',
        'mensaje'        => $d['mensaje']   ?? '',
        'total_estimado' => $d['total']     ?? '',
        'desglose'       => $d['desglose']  ?? '',
        'origen'         => 'Presupuestador Cámaras Web Dippanel',
    ];

    $response = wp_remote_post( DIPP_GHL_WEBHOOK_URL, [
        'timeout' => 8,
        'headers' => [ 'Content-Type' => 'application/json' ],
        'body'    => wp_json_encode( $payload ),
    ] );

    if ( is_wp_error( $response ) ) {
        error_log( '[Dippanel GHL Camaras] Error enviando webhook: ' . $response->get_error_message() );
    }
}
