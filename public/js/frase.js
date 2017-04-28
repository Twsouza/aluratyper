$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
	$("#spinner").toggle();

	$.get("http://localhost:3000/frases", trocaFraseAleatoria)
	.fail(function(){
		$("#erro").show();
		setTimeout(function(){
			$("#erro").hide();
			$("#spinner").toggle();
        },1500);
	})
	.done(function(){
		setTimeout(function(){
            $("#spinner").toggle();
        },500);
	});
}

function trocaFraseAleatoria(data) {
	var frase = $(".frase");
	var numeroAleatorio = Math.floor(Math.random() * data.length);

	frase.text(data[numeroAleatorio].texto);
	atualizaFrase();
	atualizaTempoInicial(data[numeroAleatorio].tempo);
	
	limpaInput();//vai limpar o input e depois deixar ele ativado abaixo
	campo.removeClass("campo-desativado");
	campo.addClass("campo-ativado");
}

function buscaFrase() {
	$("#spinner").toggle()
	var fraseId = $("#frase-id").val();
	var dados = { id: fraseId };
	$.get("http://localhost:3000/frases", dados, trocaFrase)
	.fail(function(){
		$("#erro").show();
		setTimeout(function(){
			$("#erro").hide();
			$("#spinner").toggle();
        },1500);
	})
	.done(function(){
		setTimeout(function(){
            $("#spinner").toggle();
        },500);
	});
}

function trocaFrase(data) {
	console.log(data);

	var frase = $(".frase");
	frase.text(data.texto);
	atualizaFrase();
	atualizaTempoInicial(data.tempo);

	limpaInput();//vai limpar o input e depois deixar ele ativado abaixo
	campo.removeClass("campo-desativado");
	campo.addClass("campo-ativado");
}