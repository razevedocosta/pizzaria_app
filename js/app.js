$('.collection')
    .on('click', '.collection-item', function(){

        var $badge = $('.badge', this);
        if ($badge.length === 0) {
            $badge = $('<span class="badge brown-text">0</span>').appendTo(this);
        }

        $badge.text(parseInt($badge.text()) + 1);

        var res = $(this).parent().prev().find('span').text();
        var preco = res.split("R$ ");
        preco = parseInt(preco[1]);
        
        var total = parseInt($('#total').text());
        total = total + preco;

        $('#total').empty().text(total);
    })

$('.modal-trigger').leanModal();

$('#confirmar').on('click', function() {
    
    var total = $('#total').text();    
    var texto = ' ';

	$('.badge').parent().each(function() {
	    var produto = this.firstChild.textContent;
	    var quantidade = this.lastChild.textContent;

        texto += produto + ': ' + quantidade + ' ';
	});
	
    $('#resumo').empty().text(texto);
    $('#total-pedido').empty().text(total);
});
 

$('.collection').on('click', '.badge', function(){
    $(this).remove();
    return false;
});

$('.acao-limpar').on('click', function() {
    $('#numero-mesa').val( '' );
    $('.badge').remove();
});

$('.scan-qrcode').on('click', function(){
    cordova.plugins.barcodeScanner.scan(
       function (resultado) {
           if (resultado.text) {
               Materialize.toast('Mesa ' + resultado.text, 2000);
               $('#numero-mesa').val(resultado.text);
           }
       },
       function (error) {
           Materialize.toast('Erro: ' + error, 3000, 'red-text');
       }
    );
}); 

$('.acao-finalizar').on('click', function() {
    $.ajax({
        url: 'http://endereco.com/servico',
        data: {
            mesa: $('#numero-mesa').val(),
            pedido: $('#resumo').text()
        },
        error: function(erro) {
           Materialize.toast(erro.responseText, 3000, 'red-text');
        },
        success: function(dados) {
            Materialize.toast(dados, 2000);

            $('#numero-mesa').val('');
            $('.badge').remove();
        }
    });
});

$(document).ready(function(){
    $('.sidenav').sidenav();
});