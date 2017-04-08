var frase = $(".frase").text();
var numeroPalavras = frase.split(" ").length;
var tamanhoFrase = $(".tamanho-frase");
tamanhoFrase.text(numeroPalavras + " palavras");

var campo = $(".campo-digitacao");
campo.on("input",function(){
  var conteudo = campo.val();
  $(".contador-palavras").text(conteudo.split(/\S+/).length-1 + " palavras");
  $(".contador-caracteres").text(conteudo.length + " caracteres");
});
