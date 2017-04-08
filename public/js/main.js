var frase = $(".frase").text();                   // pega a frase
var numeroPalavras = frase.split(" ").length;     // divide a frase em cada palavra e conta
var tamanhoFrase = $(".tamanho-frase");           // armazena o elemento da frase pra alterar
tamanhoFrase.text(numeroPalavras + " palavras");  //altera para a quantidade de palavras

var campo = $(".campo-digitacao");
campo.on("input",function(){ // escuta o input no textarea
  var conteudo = campo.val(); // pega o conteudo do text area
  $(".contador-palavras").text(conteudo.split(/\S+/).length-1 + " palavras"); // altera o contador de palavras
  //separa as palavras por espaço, colocamos o '/\S+/' para retirar um ou mais espaços, e conta, o -1 serve para zerar quando tudo é apagado
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
