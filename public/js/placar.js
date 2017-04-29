$("#botao-sync").click(sincronizaPlacar);

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
  setTimeout(function(){
    linha.remove();
    sincronizaPlacar();
  },2010);
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

function sincronizaPlacar(){
  var placar = [];
  var linhas = $("tbody>tr");

  linhas.each(function(){
    var usuario = $(this).find("td:nth-child(1)").text();
    var palavras = $(this).find("td:nth-child(2)").text();
    var score = {
      usuario : usuario,
      palavras : palavras
    };
    placar.push(score);
  });

  var dados = {
    placar : placar
  }

  $.post("http://localhost:3000/placar", dados, function(){
    console.log("Salvos os dados no servidor");
  });
}

function atualizaPlacar(){
  $.get("http://localhost:3000/placar",function(data){
    $(data).each(function(){
      var linha = novaLinha(this.usuario, this.palavras);
      linha.find(".botao-remover").click(removeLinha);
      $("tbody").append(linha);
        });
  })
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
  })
  .always(function(){
    setTimeout(function(){
      $("#spinner").toggle();
    },2000);
  });
}