jQuery(function ($) {
    $('#mrwTestConexion').on('click', function () {
        var btn = $(this);
        var res = $('#mrwTestResult');
        var valor = $('#mrwTestValor').val();

        if (!valor) {
            res.text('Indica un número de envío o referencia.').css('color', 'red');
            return;
        }

        btn.prop('disabled', true).text('Consultando...');
        res.text('');

        $.post(mrwAdmin.ajaxurl, {
            action: 'mrw_test_conexion',
            nonce: mrwAdmin.nonce,
            valor: valor
        }, function (r) {
            res.text(r.data).css('color', r.success ? 'green' : 'red');
        }).fail(function () {
            res.text('Error de conexión con el servidor.').css('color', 'red');
        }).always(function () {
            btn.prop('disabled', false).text('🔎 Consultar en MRW');
        });
    });

    $('#mrwSyncNow').on('click', function () {
        var btn = $(this);
        var res = $('#mrwSyncResult');

        btn.prop('disabled', true).text('Sincronizando...');
        res.text('');

        $.post(mrwAdmin.ajaxurl, {
            action: 'mrw_sync_now',
            nonce: mrwAdmin.nonce
        }, function (r) {
            res.text(r.data).css('color', r.success ? 'green' : 'red');
        }).fail(function () {
            res.text('Error de conexión con el servidor.').css('color', 'red');
        }).always(function () {
            btn.prop('disabled', false).text('🚀 Ejecutar sincronización');
        });
    });
});
