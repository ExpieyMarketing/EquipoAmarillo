<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class DP_Shortcode {

    public static function init() {
        add_shortcode( 'configurador_puertas', [ __CLASS__, 'render' ] );
        add_action( 'wp_enqueue_scripts', [ __CLASS__, 'enqueue' ] );
    }

    public static function enqueue() {
        global $post;
        // Solo cargar en páginas que usen el shortcode
        if ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'configurador_puertas' ) ) {
            wp_enqueue_style(
                'dippanel-configurador',
                DP_URL . 'assets/configurador.css',
                [],
                DP_VERSION
            );
            wp_enqueue_script(
                'dippanel-configurador',
                DP_URL . 'assets/configurador.js',
                [],
                DP_VERSION,
                true
            );
            wp_localize_script( 'dippanel-configurador', 'dpAjax', [
                'ajaxurl' => admin_url( 'admin-ajax.php' ),
                'nonce'   => wp_create_nonce( 'dp_presupuesto_nonce' ),
            ] );
        }
    }

    public static function render( $atts ) {
        ob_start();
        include DP_DIR . 'templates/configurador.php';
        return ob_get_clean();
    }
}
