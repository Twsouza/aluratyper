var tempoInicial = $(".tempo-digitacao").text(); // guardando o tempo inicial
var campo = $(".campo-digitacao");
var cronometro;

//$(document).ready(function(){
$(function(){
  atualizaFrase();
  atualizaContadores();
  inicializaContadores();
  inicializaMarcadores();
  atualizaPlacar();
  $("#botao-reiniciar").click(reiniciaJogo);
  $("#botao-placar").click(mostraPlacar);

  $("#usuarios").selectize({
      create: true,
      sortField: 'text'
  });

  $('.tooltip').tooltipster({
      trigger: "custom",
    });
})

function atualizaFrase() {
  var frase = $(".frase").text();
  var numeroPalavras = frase.split(" ").length;
  var tamanhoFrase = $(".tamanho-frase");
  tamanhoFrase.text(numeroPalavras);
}

function atualizaContadores() {
  campo.on("input",function(){
    var conteudo = campo.val();
    $(".contador-palavras").text(conteudo.split(/\S+/).length-1); //conta a quantidade de palavras, separando por um ou mais espaços(regex /\S+/), -1 serve para zerar o contador
    $(".contador-caracteres").text(conteudo.length);//conta a quantidade de caracteres
  });
}

function inicializaContadores() {
  campo.one("focus",function(){ // função 'one' serve para uma chamada apenas
    var tempoRestante = $(".tempo-digitacao").text(); // pega o tempo
    cronometro = setInterval(function(){ // armazena o id do setInterval
      tempoRestante--;
      $(".tempo-digitacao").text(tempoRestante); //alterar o tempo na pagina
      if(tempoRestante <= 0){        // se for menor q zero,
        clearInterval(cronometro);   // e fecha o setInterval
        finalizaJogo();
      }
    }, 1000) // vai fazer toda a função dentro do setInterval dentro desse tempo
  })
}
function finalizaJogo(){
  campo.attr("disabled", true);// desabilita o textarea
  //campo.css("background-color", "lightgray");,
  campo.toggleClass("campo-desativado");
  campo.toggleClass("campo-ativado");
  inserePlacar();
  sincronizaPlacar();
}

function inicializaMarcadores(){
  campo.on("input", function(){
    var frase = $(".frase").text();
    var digitado = campo.val();
    var comparavel = frase.substr(0,digitado.length);
    if (comparavel == digitado) {
      campo.addClass("campo-correto");
      campo.removeClass("campo-incorreto");
    } else {
      campo.addClass("campo-incorreto");
      campo.removeClass("campo-correto");
    }
  })
}

function reiniciaJogo() {
  clearInterval(cronometro);
  limpaInput();
  $(".tempo-digitacao").text(tempoInicial); //reinicia tempo
}

function atualizaTempoInicial(tempo) {
  tempoInicial = tempo;
  $(".tempo-digitacao").text(tempo);
}

function limpaInput() {
  campo.val("");//zera campo
  campo.attr("disabled", false); //habilita textarea
  $(".contador-palavras").text("0"); // zera contador-palavras
  $(".contador-caracteres").text("0"); // zera contador-caracteres
  campo.removeClass("campo-incorreto");
  campo.removeClass("campo-correto");
  campo.toggleClass("campo-desativado");
  campo.toggleClass("campo-ativado");
  inicializaContadores();
}