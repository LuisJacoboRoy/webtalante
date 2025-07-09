// main.js - Café Talante SPA AJAX
$(function() {
  function cargarVista(vista) {
    $("#contenido").fadeOut(150, function() {
      $("#contenido").load(vista + ".html", function() {
        $(this).fadeIn(300);
        actualizarBreadcrumb(vista);
      });
    });
  }

  function actualizarBreadcrumb(vista) {
    var map = {
      'inicio': 'Inicio',
      'nosotros': 'Nosotros',
      'catalogo': 'Catálogo',
      'contacto': 'Contacto'
    };
    var $bc = $("#breadcrumb-nav");
    $bc.html('<li class="breadcrumb-item"><a href="#inicio">Inicio</a></li>');
    if (vista !== 'inicio' && map[vista]) {
      $bc.append('<li class="breadcrumb-item active" aria-current="page">' + map[vista] + '</li>');
    }
  }

  // Navegación AJAX
  $(".nav-link").on("click", function(e) {
    var href = $(this).attr("href").replace('#','');
    if(["inicio","nosotros","catalogo","contacto"].includes(href)) {
      e.preventDefault();
      cargarVista(href);
      history.pushState(null, '', '#' + href);
    }
  });

  // Carga inicial
  let hash = window.location.hash.replace('#','');
  if(["inicio","nosotros","catalogo","contacto"].includes(hash)) {
    cargarVista(hash);
  } else {
    cargarVista("inicio");
  }

  // Soporte para navegación con el botón atrás/adelante
  window.onpopstate = function() {
    let hash = window.location.hash.replace('#','');
    if(["inicio","nosotros","catalogo","contacto"].includes(hash)) {
      cargarVista(hash);
    }
  };
});
