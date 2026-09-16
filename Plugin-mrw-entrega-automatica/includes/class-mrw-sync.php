<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class MRW_Sync {

    const LOG_OPTION = 'mrw_entrega_log';

    /**
     * Revisa los pedidos elegibles y completa los que MRW marca como entregados.
     */
    public static function run( bool $manual = false ): array {
        $summary = [
            'checked'  => 0,
            'updated'  => 0,
            'skipped'  => 0,
            'errors'   => 0,
            'detalles' => [],
        ];

        if ( ! class_exists( 'WooCommerce' ) ) {
            $summary['errors']++;
            $summary['detalles'][] = 'WooCommerce no está activo.';
            self::log( $summary, $manual );
            return $summary;
        }

        $opts        = MRW_Settings::get_all();
        $tipo_filtro = $opts['tipo_filtro'];
        $meta_key    = $opts['meta_key_envio'];

        $args = [
            'status'  => $opts['estados_origen'],
            'limit'   => intval( $opts['limite_pedidos'] ),
            'orderby' => 'date',
            'order'   => 'DESC',
            'return'  => 'ids',
        ];

        if ( $tipo_filtro !== 'referencia' && ! empty( $meta_key ) ) {
            $args['meta_query'] = [
                [ 'key' => $meta_key, 'compare' => 'EXISTS' ],
                [ 'key' => $meta_key, 'value' => '', 'compare' => '!=' ],
            ];
        }

        $order_ids = wc_get_orders( $args );
        $cutoff    = time() - ( intval( $opts['dias_atras'] ) * DAY_IN_SECONDS );

        foreach ( $order_ids as $order_id ) {
            $order = wc_get_order( $order_id );
            if ( ! $order ) continue;

            $fecha = $order->get_date_created();
            if ( $fecha && $fecha->getTimestamp() < $cutoff ) {
                continue;
            }

            if ( ! empty( $opts['filtro_metodo_envio'] ) && ! self::envio_coincide( $order, $opts['filtro_metodo_envio'] ) ) {
                continue;
            }

            $summary['checked']++;

            $valor = $tipo_filtro === 'referencia'
                ? ( ! empty( $opts['meta_key_referencia'] ) ? $order->get_meta( $opts['meta_key_referencia'] ) : (string) $order->get_order_number() )
                : $order->get_meta( $meta_key );

            $valor = trim( (string) $valor );

            if ( $valor === '' ) {
                $summary['skipped']++;
                $summary['detalles'][] = sprintf( 'Pedido #%d: sin dato de envío MRW, omitido.', $order_id );
                continue;
            }

            $resultado = MRW_Tracking_Client::get_envio_status( $valor, $tipo_filtro );

            if ( is_wp_error( $resultado ) ) {
                $summary['errors']++;
                $summary['detalles'][] = sprintf( 'Pedido #%d: %s', $order_id, $resultado->get_error_message() );
                continue;
            }

            if ( $resultado['estado'] === MRW_Tracking_Client::ESTADO_ENTREGADO ) {
                $nota = sprintf(
                    'MRW: envío entregado el %s a las %s%s. Pedido actualizado automáticamente a "%s".',
                    self::formatear_fecha( $resultado['fecha_entrega'] ),
                    self::formatear_hora( $resultado['hora_entrega'] ),
                    $resultado['persona_entrega'] ? ' (recibió: ' . $resultado['persona_entrega'] . ')' : '',
                    wc_get_order_status_name( $opts['estado_destino'] )
                );
                $order->update_status( $opts['estado_destino'], $nota );
                $summary['updated']++;
                $summary['detalles'][] = sprintf( 'Pedido #%d: marcado como "%s" (MRW: %s).', $order_id, wc_get_order_status_name( $opts['estado_destino'] ), $resultado['estado_descripcion'] );
            } else {
                $summary['detalles'][] = sprintf( 'Pedido #%d: aún no entregado (MRW: %s - %s).', $order_id, $resultado['estado'], $resultado['estado_descripcion'] );
            }
        }

        self::log( $summary, $manual );
        return $summary;
    }

    private static function envio_coincide( \WC_Order $order, string $filtro ): bool {
        $filtro = mb_strtolower( trim( $filtro ) );
        if ( $filtro === '' ) return true;

        foreach ( $order->get_shipping_methods() as $item ) {
            $metodo = mb_strtolower( $item->get_method_title() ?: $item->get_name() );
            if ( strpos( $metodo, $filtro ) !== false ) {
                return true;
            }
        }
        return false;
    }

    private static function formatear_fecha( string $fecha ): string {
        if ( strlen( $fecha ) === 8 && ctype_digit( $fecha ) ) {
            return substr( $fecha, 0, 2 ) . '/' . substr( $fecha, 2, 2 ) . '/' . substr( $fecha, 4, 4 );
        }
        return $fecha !== '' ? $fecha : '—';
    }

    private static function formatear_hora( string $hora ): string {
        if ( strlen( $hora ) === 4 && ctype_digit( $hora ) ) {
            return substr( $hora, 0, 2 ) . ':' . substr( $hora, 2, 2 );
        }
        return $hora !== '' ? $hora : '—';
    }

    private static function log( array $summary, bool $manual ): void {
        $entradas = get_option( self::LOG_OPTION, [] );
        array_unshift( $entradas, [
            'fecha'    => current_time( 'd/m/Y H:i:s' ),
            'manual'   => $manual,
            'resumen'  => sprintf(
                '%d revisados · %d completados · %d omitidos · %d errores',
                $summary['checked'], $summary['updated'], $summary['skipped'], $summary['errors']
            ),
            'detalles' => array_slice( $summary['detalles'], 0, 30 ),
        ] );
        $entradas = array_slice( $entradas, 0, 20 );
        update_option( self::LOG_OPTION, $entradas, false );
    }

    public static function get_log(): array {
        return get_option( self::LOG_OPTION, [] );
    }
}
