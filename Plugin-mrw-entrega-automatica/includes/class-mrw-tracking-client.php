<?php
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Cliente del WebService TrackingServices de MRW (SAGEC).
 * Doc: "Seguimiento de envíos por Webservices - TrackingServices".
 */
class MRW_Tracking_Client {

    const WSDL_TEST = 'https://trackingservice-test.mrw.es/TrackingService.svc?wsdl';
    const WSDL_PROD = 'https://trackingservice.mrw.es/TrackingService.svc?wsdl';

    const ESTADO_ENTREGADO = '00';

    /**
     * Consulta el estado de un envío por número de envío/albarán o por referencia de cliente.
     *
     * @param string $valor       Número de envío MRW o referencia de cliente, según $tipo_filtro.
     * @param string $tipo_filtro 'numero_envio' | 'referencia'
     * @return array|\WP_Error
     */
    public static function get_envio_status( string $valor, string $tipo_filtro ) {
        if ( ! class_exists( 'SoapClient' ) ) {
            return new \WP_Error( 'mrw_no_soap', 'La extensión PHP SOAP no está habilitada en este servidor.' );
        }

        $opts = MRW_Settings::get_all();

        $login = $opts['sagec_login'];
        $pass  = MRW_Crypto::decrypt( $opts['sagec_pass'] );

        if ( empty( $login ) || empty( $pass ) ) {
            return new \WP_Error( 'mrw_no_creds', 'Faltan las credenciales SAGEC de MRW en los ajustes del plugin.' );
        }

        $wsdl        = $opts['entorno'] === 'produccion' ? self::WSDL_PROD : self::WSDL_TEST;
        $tipo_filtro_num = $tipo_filtro === 'referencia' ? 1 : 0;

        try {
            $client = new \SoapClient( $wsdl, [
                'exceptions'         => true,
                'connection_timeout' => 15,
                'cache_wsdl'         => WSDL_CACHE_NONE,
            ] );

            $response = $client->GetEnvios( [
                'login'            => $login,
                'pass'             => $pass,
                'codigoIdioma'     => 3082,
                'tipoFiltro'       => $tipo_filtro_num,
                'valorFiltroDesde' => $valor,
                'valorFiltroHasta' => $valor,
                'fechaDesde'       => '',
                'fechaHasta'       => '',
                'tipoInformacion'  => 0,
            ] );
        } catch ( \SoapFault $e ) {
            return new \WP_Error( 'mrw_soap_fault', 'Error SOAP de MRW: ' . $e->getMessage() );
        } catch ( \Throwable $e ) {
            return new \WP_Error( 'mrw_error', 'Error al consultar MRW: ' . $e->getMessage() );
        }

        $result = $response->GetEnviosResult ?? null;
        if ( ! $result ) {
            return new \WP_Error( 'mrw_empty', 'Respuesta vacía del servicio de seguimiento de MRW.' );
        }

        $mensaje     = (string) ( $result->MensajeSeguimiento ?? '' );
        $seguimiento = self::find_seguimiento_node( $result );

        if ( ! $seguimiento ) {
            return new \WP_Error( 'mrw_not_found', $mensaje ?: 'MRW no devolvió información de seguimiento para ese valor.' );
        }

        return [
            'estado'             => (string) ( $seguimiento->Estado ?? '' ),
            'estado_descripcion' => (string) ( $seguimiento->EstadoDescripcion ?? '' ),
            'fecha_entrega'      => (string) ( $seguimiento->FechaEntrega ?? '' ),
            'hora_entrega'       => (string) ( $seguimiento->HoraEntrega ?? '' ),
            'persona_entrega'    => (string) ( $seguimiento->PersonaEntrega ?? '' ),
            'num_albaran'        => (string) ( $seguimiento->NumAlbaran ?? '' ),
            'mensaje'            => $mensaje,
        ];
    }

    /**
     * La respuesta SOAP anida el nodo de seguimiento a varios niveles (Abonado > SeguimientoAbonado > Seguimiento)
     * y puede variar según haya uno o varios envíos. En vez de fijar esa ruta exacta, buscamos de forma
     * recursiva el primer nodo que tenga a la vez "Estado" y "EstadoDescripcion".
     */
    private static function find_seguimiento_node( $node, int $depth = 0 ) {
        if ( $depth > 8 || ! is_object( $node ) ) return null;

        if ( isset( $node->Estado ) && isset( $node->EstadoDescripcion ) ) {
            return $node;
        }

        foreach ( get_object_vars( $node ) as $value ) {
            if ( is_array( $value ) ) {
                foreach ( $value as $item ) {
                    $found = self::find_seguimiento_node( $item, $depth + 1 );
                    if ( $found ) return $found;
                }
            } elseif ( is_object( $value ) ) {
                $found = self::find_seguimiento_node( $value, $depth + 1 );
                if ( $found ) return $found;
            }
        }

        return null;
    }
}
