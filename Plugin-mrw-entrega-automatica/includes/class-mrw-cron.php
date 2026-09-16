<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class MRW_Cron {

    const HOOK = 'mrw_entrega_sync_event';

    public static function init() {
        add_filter( 'cron_schedules', [ __CLASS__, 'add_schedules' ] );
        add_action( self::HOOK, [ 'MRW_Sync', 'run' ] );
        add_action( 'init', [ __CLASS__, 'maybe_reschedule' ] );
    }

    public static function add_schedules( array $schedules ): array {
        $schedules['mrw_quince_min']  = [ 'interval' => 15 * MINUTE_IN_SECONDS, 'display' => 'Cada 15 minutos' ];
        $schedules['mrw_treinta_min'] = [ 'interval' => 30 * MINUTE_IN_SECONDS, 'display' => 'Cada 30 minutos' ];
        return $schedules;
    }

    /**
     * Si el intervalo configurado cambia, o la sincronización está desactivada,
     * reprograma o desprograma el evento en consecuencia.
     */
    public static function maybe_reschedule() {
        $opts = MRW_Settings::get_all();

        if ( empty( $opts['activo'] ) ) {
            self::unschedule();
            return;
        }

        $intervalo_deseado = $opts['intervalo'] ?: 'mrw_treinta_min';
        $programado_como   = wp_get_schedule( self::HOOK );

        if ( $programado_como && $programado_como !== $intervalo_deseado ) {
            self::unschedule();
        }

        if ( ! wp_next_scheduled( self::HOOK ) ) {
            wp_schedule_event( time() + 5 * MINUTE_IN_SECONDS, $intervalo_deseado, self::HOOK );
        }
    }

    public static function unschedule(): void {
        $timestamp = wp_next_scheduled( self::HOOK );
        while ( $timestamp ) {
            wp_unschedule_event( $timestamp, self::HOOK );
            $timestamp = wp_next_scheduled( self::HOOK );
        }
    }

    public static function activate(): void {
        // La programación real ocurre en maybe_reschedule() (hook init),
        // una vez que los ajustes ya están disponibles.
    }

    public static function deactivate(): void {
        self::unschedule();
    }
}
