var tempoInicial = $(".tempo-digitacao").text(); // guardando o tempo inicial
var campo = $(".campo-digitacao");
var cronometro;

//$(document).ready(function(){
$(function(){
  atualizaFrase();
  atualizaContadores();
  inicializaContadores();
  $("#botao-reiniciar").click(reiniciaJogo);
})

function atualizaFrase() {
  var frase = $(".frase").text();
  var numeroPalavras = frase.split(" ").length;
  var tamanhoFrase = $(".tamanho-frase");
  tamanhoFrase.text(numeroPalavras + " palavras");
}

function atualizaContadores() {
  campo.on("input",function(){
    var conteudo = campo.val();
    $(".contador-palavras").text(conteudo.split(/\S+/).length-1 + " palavras"); //conta a quantidade de palavras, separando por um ou mais espaços(regex /\S+/), -1 serve para zerar o contador
    $(".contador-caracteres").text(conteudo.length + " caracteres");//conta a quantidade de caracteres
  });
}

function inicializaContadores() {
  campo.one("focus",function(){ // função 'one' serve para uma chamada apenas
    var tempoRestante = $(".tempo-digitacao").text(); // pega o tempo
    cronometro = setInterval(function(){ // armazena o id do setInterval
      tempoRestante--;
      $(".tempo-digitacao").text(tempoRestante); //alterar o tempo na pagina
      if(tempoRestante <= 0){        // se for menor q zero,
        campo.attr("disabled", true);// desabilita o textarea
        clearInterval(cronometro);   // e fecha o setInterval
      }
    }, 1000) // vai fazer toda a função dentro do setInterval dentro desse tempo
  })
}
function reiniciaJogo() {
  clearInterval(cronometro);
  campo.val("");//zera campo
  campo.attr("disabled", false); //habilita textarea
  $(".contador-palavras").text("0 palavras"); // zera contador-palavras
  $(".contador-caracteres").text("0 caracteres"); // zera contador-caracteres
  $(".tempo-digitacao").text(tempoInicial); //reinicia tempo
  inicializaContadores();
}
