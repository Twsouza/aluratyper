function inserePlacar(){
  var corpoTabela = $(".placar").find("tbody");
  var usuario = "Taynan";
  var numPalavras = $(".contador-palavras").text();

  var linha = novaLinha(usuario,numPalavras);
  linha.find(".botao-remover").click(removeLinha);

  corpoTabela.prepend(linha);

  $(".placar").slideDown(500);
  scrollPlacar();
}

function novaLinha(usuario,palavras){
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(palavras);
  var colunaRemover = $("<td>");
  var link = $("<a>").attr("href","#").addClass("botao-remover");
  var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

  colunaRemover.append(link.append(icone));

  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}

function removeLinha(event){
  event.preventDefault();
  var linha = $(this).parent().parent();

  linha.fadeOut(2000);
  setTimeOut(function(){
    linha.remove();
  },2100);
}

function mostraPlacar(){
  $(".placar").stop().slideToggle(600);
}

function scrollPlacar(){
  var posicaoPlacar = $(".placar").offset().top;
  $("body").animate(
    {
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}
