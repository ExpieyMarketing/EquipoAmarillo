<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class MRW_Crypto {

    public static function encrypt( string $plain ): string {
        if ( empty( $plain ) ) return '';
        $key = substr( hash( 'sha256', defined( 'AUTH_KEY' ) ? AUTH_KEY : 'mrw_entrega_key' ), 0, 32 );
        $iv  = openssl_random_pseudo_bytes( 16 );
        $enc = openssl_encrypt( $plain, 'aes-256-cbc', $key, 0, $iv );
        return base64_encode( $iv . $enc );
    }

    public static function decrypt( string $enc ): string {
        if ( empty( $enc ) ) return '';
        try {
            $key  = substr( hash( 'sha256', defined( 'AUTH_KEY' ) ? AUTH_KEY : 'mrw_entrega_key' ), 0, 32 );
            $data = base64_decode( $enc );
            $iv   = substr( $data, 0, 16 );
            return openssl_decrypt( substr( $data, 16 ), 'aes-256-cbc', $key, 0, $iv ) ?: '';
        } catch ( \Throwable $e ) {
            return '';
        }
    }
}
