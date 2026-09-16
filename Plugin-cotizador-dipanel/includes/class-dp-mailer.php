<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class DP_Mailer {

    public static function send( array $d ): bool|\WP_Error {
        $opts = DP_Settings::get_all();

        // Destinatarios
        $to_raw = ! empty( $opts['email_destino'] ) ? $opts['email_destino'] : 'info@dippanel.com';
        $tos    = array_filter( array_map( 'trim', explode( ',', $to_raw ) ) );

        $subject = sprintf( '[Presupuesto Dippanel] %s — %s', $d['tipo'], $d['nombre'] );
        $body    = self::html_body( $d );
        $headers = [
            'Content-Type: text/html; charset=UTF-8',
            'Reply-To: ' . $d['nombre'] . ' <' . $d['email'] . '>',
        ];

        // SMTP personalizado si está configurado
        if ( ! empty( $opts['smtp_host'] ) ) {
            add_action( 'phpmailer_init', [ __CLASS__, 'configure_smtp' ] );
        }

        $ok = true;
        foreach ( $tos as $to ) {
            if ( ! wp_mail( $to, $subject, $body, $headers ) ) {
                $ok = false;
            }
        }

        remove_action( 'phpmailer_init', [ __CLASS__, 'configure_smtp' ] );

        if ( ! $ok ) {
            return new \WP_Error( 'mail_failed', 'No se pudo enviar el email. Comprueba la configuración SMTP.' );
        }

        // Confirmación al cliente
        if ( ! empty( $opts['confirmar_cliente'] ) ) {
            self::send_confirmation( $d );
        }

        return true;
    }

    public static function configure_smtp( $phpmailer ) {
        $opts = DP_Settings::get_all();
        $phpmailer->isSMTP();
        $phpmailer->Host       = $opts['smtp_host'];
        $phpmailer->Port       = intval( $opts['smtp_port'] ?: 587 );
        $phpmailer->SMTPAuth   = true;
        $phpmailer->Username   = $opts['smtp_user'];
        $phpmailer->Password   = self::decrypt( $opts['smtp_pass'] );
        $phpmailer->SMTPSecure = $opts['smtp_secure'] ?: 'tls';
        $phpmailer->From       = $opts['smtp_user'];
        $phpmailer->FromName   = 'Dippanel';
    }

    private static function html_body( array $d ): string {
        $n   = esc_html( $d['nombre'] );
        $emp = esc_html( $d['empresa'] );
        $em  = esc_html( $d['email'] );
        $tel = esc_html( $d['telefono'] );
        $cp  = esc_html( $d['cod_postal'] );
        $tip = esc_html( $d['tipo'] );
        $esp = esc_html( $d['espesor'] );
        $alt = esc_html( $d['alto'] );
        $anc = esc_html( $d['ancho'] );
        $can = esc_html( $d['cantidad'] );
        $ops = esc_html( $d['opciones'] );
        $tot = esc_html( $d['total'] );
        $com = esc_html( $d['comentarios'] );
        $fecha = current_time( 'd/m/Y H:i' );

        $comentario_block = $com && $com !== '—'
            ? "<tr><td colspan='2' style='padding:14px 0 0'><p style='font-size:13px;color:#666;margin:0 0 4px;text-transform:uppercase;letter-spacing:.05em;font-weight:700'>Comentarios</p><p style='font-size:14px;color:#333;background:#f9f9f9;padding:10px 14px;border-radius:4px;margin:0'>{$com}</p></td></tr>"
            : '';

        return <<<HTML
<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;background:#f0f4f8;font-family:Arial,sans-serif">
<div style="max-width:600px;margin:0 auto">

  <div style="background:#001689;padding:20px 28px;border-radius:6px 6px 0 0;display:flex;justify-content:space-between;align-items:center">
    <div>
      <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;text-transform:uppercase;letter-spacing:.04em">Nuevo Presupuesto</h1>
      <p style="color:rgba(255,255,255,.6);margin:4px 0 0;font-size:12px">Dippanel · {$fecha}</p>
    </div>
    <span style="background:#ff5000;color:#fff;font-size:13px;font-weight:700;padding:6px 14px;border-radius:4px;text-transform:uppercase;letter-spacing:.06em">{$tip}</span>
  </div>

  <div style="background:#fff;padding:28px;border-radius:0 0 6px 6px;box-shadow:0 2px 12px rgba(0,0,0,.08)">

    <p style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin:0 0 12px">Datos del cliente</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">
      <tr style="border-bottom:1px solid #f0f0f0"><td style="padding:7px 0;color:#888;width:130px">Nombre</td><td style="padding:7px 0;font-weight:600;color:#222">{$n}</td></tr>
      <tr style="border-bottom:1px solid #f0f0f0"><td style="padding:7px 0;color:#888">Empresa</td><td style="padding:7px 0;color:#333">{$emp}</td></tr>
      <tr style="border-bottom:1px solid #f0f0f0"><td style="padding:7px 0;color:#888">Email</td><td style="padding:7px 0"><a href="mailto:{$em}" style="color:#001689;font-weight:600">{$em}</a></td></tr>
      <tr style="border-bottom:1px solid #f0f0f0"><td style="padding:7px 0;color:#888">Teléfono</td><td style="padding:7px 0;color:#333">{$tel}</td></tr>
      <tr><td style="padding:7px 0;color:#888">Cód. Postal</td><td style="padding:7px 0;color:#333">{$cp}</td></tr>
    </table>

    <hr style="border:none;border-top:2px solid #f0f0f0;margin:0 0 20px">

    <p style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin:0 0 12px">Configuración seleccionada</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr style="border-bottom:1px solid #f0f0f0"><td style="padding:7px 0;color:#888;width:130px">Tipo</td><td style="padding:7px 0;font-weight:700;color:#ff5000">{$tip}</td></tr>
      <tr style="border-bottom:1px solid #f0f0f0"><td style="padding:7px 0;color:#888">Espesor</td><td style="padding:7px 0;color:#333">{$esp}</td></tr>
      <tr style="border-bottom:1px solid #f0f0f0"><td style="padding:7px 0;color:#888">Alto × Ancho</td><td style="padding:7px 0;font-weight:600;color:#333">{$alt} × {$anc}</td></tr>
      <tr style="border-bottom:1px solid #f0f0f0"><td style="padding:7px 0;color:#888">Cantidad</td><td style="padding:7px 0;font-weight:600;color:#333">{$can}</td></tr>
      <tr><td style="padding:7px 0;color:#888;vertical-align:top">Opciones</td><td style="padding:7px 0;color:#333;line-height:1.5">{$ops}</td></tr>
      {$comentario_block}
    </table>

    <div style="background:linear-gradient(135deg,#f0f4ff,#e8efff);border:2px solid #001689;border-radius:6px;padding:16px 20px;margin:20px 0;display:flex;justify-content:space-between;align-items:center">
      <div>
        <p style="margin:0;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.06em">Total orientativo (sin IVA)</p>
        <p style="margin:3px 0 0;font-size:11px;color:#bbb">Tarifa 2026 · Sujeto a confirmación</p>
      </div>
      <div style="font-size:30px;font-weight:700;color:#001689">{$tot}</div>
    </div>

    <div style="text-align:center;margin-top:20px">
      <a href="mailto:{$em}?subject=Re: Presupuesto {$tip}"
         style="display:inline-block;background:#001689;color:#fff;padding:12px 28px;border-radius:4px;text-decoration:none;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:.06em">
        ✉ Responder al cliente
      </a>
    </div>

  </div>

  <p style="text-align:center;font-size:11px;color:#bbb;margin-top:14px">Email automático · Configurador Dippanel · {$fecha}</p>
</div>
</body></html>
HTML;
    }

    private static function send_confirmation( array $d ): void {
        $subject = 'Hemos recibido tu solicitud de presupuesto — Dippanel';
        $nombre  = esc_html( $d['nombre'] );
        $tipo    = esc_html( $d['tipo'] );
        $alt     = esc_html( $d['alto'] );
        $anc     = esc_html( $d['ancho'] );
        $tot     = esc_html( $d['total'] );

        $body = <<<HTML
<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;background:#f0f4f8;font-family:Arial,sans-serif">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:6px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.1)">
  <div style="background:#001689;padding:22px 28px">
    <h2 style="color:#fff;margin:0;font-size:18px">Solicitud recibida</h2>
    <p style="color:rgba(255,255,255,.65);margin:5px 0 0;font-size:13px">Dippanel · Puertas Frigoríficas</p>
  </div>
  <div style="padding:24px 28px">
    <p style="font-size:15px;color:#333">Hola <strong>{$nombre}</strong>,</p>
    <p style="font-size:14px;color:#555;line-height:1.6">Hemos recibido correctamente tu solicitud de presupuesto. Un especialista revisará su solicitud y se pondrá en contacto con usted para presentarle una oferta personalizada.</p>
    <div style="background:#f0f4ff;border-left:4px solid #ff5000;padding:14px 16px;margin:20px 0;border-radius:0 4px 4px 0">
      <p style="margin:0 0 8px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:.05em">Tu configuración</p>
      <table style="width:100%;font-size:13px;color:#555">
        <tr><td style="padding:3px 0;width:90px">Tipo</td><td style="font-weight:600;color:#333">{$tipo}</td></tr>
        <tr><td style="padding:3px 0">Medidas</td><td style="font-weight:600;color:#333">{$alt} × {$anc}</td></tr>
      </table>
      <p style="margin:10px 0 0;font-size:11px;color:#999">Total orientativo: <strong style="color:#ff5000;font-size:18px">{$tot}</strong></p>
    </div>
    <p style="font-size:13px;color:#888">Si tienes alguna pregunta puedes responder a este email directamente.</p>
  </div>
  <div style="background:#f5f5f5;padding:12px 28px;font-size:11px;color:#aaa;text-align:center">
    Presupuesto orientativo sin IVA · Tarifa 2026 · Sujeto a confirmación
  </div>
</div>
</body></html>
HTML;

        wp_mail( $d['email'], $subject, $body, [ 'Content-Type: text/html; charset=UTF-8' ] );
    }

    // ── Cifrado AES-256 ──────────────────────────────────────────
    public static function encrypt( string $plain ): string {
        if ( empty( $plain ) ) return '';
        $key  = substr( hash( 'sha256', defined('AUTH_KEY') ? AUTH_KEY : 'dippanel_key' ), 0, 32 );
        $iv   = openssl_random_pseudo_bytes( 16 );
        $enc  = openssl_encrypt( $plain, 'aes-256-cbc', $key, 0, $iv );
        return base64_encode( $iv . $enc );
    }

    public static function decrypt( string $enc ): string {
        if ( empty( $enc ) ) return '';
        try {
            $key  = substr( hash( 'sha256', defined('AUTH_KEY') ? AUTH_KEY : 'dippanel_key' ), 0, 32 );
            $data = base64_decode( $enc );
            $iv   = substr( $data, 0, 16 );
            return openssl_decrypt( substr( $data, 16 ), 'aes-256-cbc', $key, 0, $iv ) ?: '';
        } catch ( \Throwable $e ) { return ''; }
    }
}
