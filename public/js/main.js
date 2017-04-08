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

campo.one("focus",function(){ // função 'one' serve para uma chamada apenas
  var tempoRestante = $(".tempo-digitacao").text(); // pega o tempo
  var cronometro = setInterval(function(){ // armazena o id do setInterval
    tempoRestante--;
    $(".tempo-digitacao").text(tempoRestante); //alterar o tempo na pagina
    if(tempoRestante <= 0){        // se for menor q zero,
      campo.attr("disabled", true);// desabilita o textarea
      clearInterval(cronometro);   // e fecha o setInterval
    }
  }, 1000) // vai fazer toda a função dentro do setInterval dentro desse tempo
})
