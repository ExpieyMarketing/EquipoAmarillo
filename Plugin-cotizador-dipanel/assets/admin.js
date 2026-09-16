jQuery(function($){
    // Test SMTP connection
    $('#dpTestSmtp').on('click', function(){
        var btn = $(this);
        var res = $('#dpSmtpResult');
        btn.prop('disabled', true).text('Conectando...');
        res.text('');
        $.post(dpAdmin.ajaxurl, {
            action: 'dp_test_smtp',
            nonce:  dpAdmin.nonce
        }, function(r){
            res.text(r.success ? r.data : r.data).css('color', r.success ? 'green' : 'red');
        }).always(function(){
            btn.prop('disabled', false).text('🔌 Probar conexión SMTP');
        });
    });

    // Test email send
    $('#dpTestEmail').on('click', function(){
        var btn = $(this);
        var res = $('#dpEmailResult');
        var to  = $('#dpTestTo').val();
        btn.prop('disabled', true).text('Enviando...');
        res.text('');
        $.post(dpAdmin.ajaxurl, {
            action: 'dp_test_email',
            nonce:  dpAdmin.nonce,
            to:     to
        }, function(r){
            res.text(r.success ? r.data : '❌ ' + r.data).css('color', r.success ? 'green' : 'red');
        }).always(function(){
            btn.prop('disabled', false).text('🚀 Enviar email de prueba');
        });
    });
});
