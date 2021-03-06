$("#botao-sync").click(sincronizaPlacar);

function inserePlacar(){
  var corpoTabela = $(".placar").find("tbody");
  var usuario = $("#usuarios").val();
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
    $(".tooltip").tooltipster("open");
    setTimeout(function(){
      $(".tooltip").tooltipster("close");
    },500);
  })
  .fail(function(){
    $(".tooltip").tooltipster("open").tooltipster("content","Falha ao sincronizar");
    setTimeout(function(){
      $(".tooltip").tooltipster("close");
    },1500);
  })
}

function atualizaPlacar(){
  //$("#spinner").toggle();
  $.get("http://localhost:3000/placar",function(data){
    $(data).each(function(){
      var linha = novaLinha(this.usuario, this.palavras);
      linha.find(".botao-remover").click(removeLinha);
      $("tbody").append(linha);
        });
  })
  .fail(function(){
    //$("#spinner").toggle();
    $("#erro").show();
    $(".tooltip").tooltipster("open").tooltipster("content","Falha ao sincronizar");

    setTimeout(function(){
      $(".tooltip").tooltipster("close");
      $("#erro").hide();
    },1500);
  })
  .done(function(){
    //$("#spinner").toggle();
    $(".tooltip").tooltipster("open");

    setTimeout(function(){
      $(".tooltip").tooltipster("close");
    },500);
  })
}