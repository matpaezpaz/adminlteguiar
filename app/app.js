var app = angular.module('adminLTE', ['ngRoute'])
app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl : "pages/index/index.html",
		controller : "indexController"
	})
	.when("/index", {
		templateUrl : "pages/index/index.html",
		controller : "indexController"
	})
	.when("/listarDestinos", {
		templateUrl : "pages/destinos/listarDestinos.html",
		controller: "destinosController"
	})
	.when("/crearDestino", {
		templateUrl : "pages/destinos/crearDestino.html",
		controller: "gestionarDestinosController"
	})
	.when("/editarDestino/:idDestino", {
		templateUrl : "pages/destinos/crearDestino.html",
		controller: "gestionarDestinosController"
	})
	.when("/listarNovedades", {
		templateUrl : "pages/novedades/listarNovedades.html",
		controller : "listarNovedadesController"
	})
	.when("/crearNovedad", {
		templateUrl : "pages/novedades/crearNovedad.html",
		controller: "gestionarNovedadesController"
	})
	.when("/editarNovedad/:idNovedad", {
		templateUrl : "pages/novedades/crearNovedad.html",
		controller: "gestionarNovedadesController"
	})
	.when("/listarNotificaciones", {
		templateUrl : "pages/notificaciones/listarNotificaciones.html",
		controller : "listarNotificacionesController"
	})
	.when("/crearNotificacion", {
		templateUrl : "pages/notificaciones/crearNotificacion.html",
		controller: "crearNotificacionController"
	})
	.otherwise({
		templateUrl : "pages/examples/404.html"
	});
});

app.controller('destinosController', ['Repositorio', '$scope','$http', function(Repositorio,$scope,$http){
    function cargarDestinos(){
        Repositorio.getDestinosId(1)
        .then(function(resp){
            $scope.destinos = resp.data;
        });
    }
    cargarDestinos();

    $scope.eliminarDestino = function(id){
        Repositorio.eliminarDestino(id)
        .then(function(resp){
            if(resp.status == 200){
                cargarDestinos();
            }
        });
    }
}]);

app.controller('gestionarDestinosController', ['Repositorio', '$scope', '$routeParams', '$window', function(Repositorio, $scope, $routeParams, $window){
    $scope.editando = 0;
    if($routeParams.idDestino){
        $scope.editando = 1;
        $scope.titulo = "Editar destino";
        Repositorio.getDestino($routeParams.idDestino)
        .then(function(resp){
            $scope.Destino = resp.data;
        })
    } else {
        $scope.titulo = "Crear destino";
    }

    $scope.guardar = function(destino){
        console.log('hola?');
        destino.lugar_id = "1";
        if($scope.editando == 1){
            Repositorio.editarDestino($routeParams.idDestino,destino)
            .then(function(resp){
                            $window.location.href = '#!listarDestinos';
                        });
        } else {
            Repositorio.crearDestino(destino)
            .then(function(resp){
                $window.location.href = '#!listarDestinos';
            });
        }
    }
}]);

app.controller('loginPermissions', ['$scope','$routeParams','$window', function($scope,$routeParams,$window){
    var usuario = 'administrator';
    var password = '123';
    $scope.logueado = false;

    $scope.checkLocalStorage = function(){
        return localStorage.getItem('logueado') == true;
    }

    $scope.login = function(user,pass){
        if(user == usuario && pass == password) {
            localStorage.setItem('logueado', true);
            $window.location.href = '#!index';
        }
    }
}]);

app.controller('gestionarNovedadesController', ['Repositorio', '$scope', '$routeParams','$window', function(Repositorio, $scope, $routeParams,$window){

        var formdata = new FormData();
    if($routeParams.idNovedad){
        $scope.titulo = "Editar Novedad";
        Repositorio.getNovedad($routeParams.idNovedad)
        .then(function(resp){
            $scope.novedad = resp.data;
        })
    } else {
        $scope.titulo = "Crear Novedad";
    }
    $scope.guardar = function(novedad){
        if($routeParams.idNovedad) {
            Repositorio.editarNovedad($routeParams.idNovedad, novedad)
            .then(function(resp){
                $window.location.href = "#!listarNovedades"
            })
        } else {
            novedad.lugar_id = 1;
            Repositorio.crearNovedad(novedad)
            .then(function(resp){
                $window.location.href = "#!listarNovedades"
            })
        }
    }
}]);

app.controller('listarNovedadesController', ['$scope','$http','Repositorio', function($scope,$http, Repositorio){
	function cargarNovedades(){
        Repositorio.getNovedades(1)
        .then(function(resp){
            $scope.novedades = resp.data;
        });
	}
	cargarNovedades();
	$scope.eliminar = function(id){
	    Repositorio.eliminarNovedad(id)
	    .then(function(resp){
	        cargarNovedades()
	    });
	}
}]);

app.directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
        } ])

app.controller('listarNotificacionesController', ['$scope','$http','Repositorio', function($scope,$http, Repositorio){
	Repositorio.getNotificaciones(1)
	.then(function(resp){
	    $scope.notificaciones = resp.data;
	});
}]);


app.controller('crearNotificacionController', ['$scope','$http','Repositorio', '$window', function($scope,$http, Repositorio, $window){
    $scope.crearNotificacion = function(n){
        //objeto n. en la vista. tiene titulo, fecha y descripcion
        hoy = new Date();
        n.fecha = ''+hoy.getDate()+'/'+(hoy.getMonth()+1)+'/'+hoy.getFullYear();
        n.lugar_id = 1;
        Repositorio.enviarNotificacion(n)
        .then(function(resp){
            if(resp.status == 200){
                //agregar insert a franco
                alert('Notificación enviada exitosamente');
                Repositorio.crearNotificacion(n).then(function(resp){
                    if(resp.status == 200) {
                        console.log('yes')
                    }
                })
                $window.location.href = '#!listarNotificaciones';
            }
        });
    }
}]);

app.controller('indexController', ['$scope','$http', function($scope,$http){
	$scope.fechaHoy = new Date().getDate();
	$scope.visitasDiarias = 28;
	$scope.nuevosUsuario = 23;
	$scope.visitasestemes = 954;
	/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/

$(function () {

  'use strict';

  // Make the dashboard widgets sortable Using jquery UI
  $('.connectedSortable').sortable({
    placeholder         : 'sort-highlight',
    connectWith         : '.connectedSortable',
    handle              : '.box-header, .nav-tabs',
    forcePlaceholderSize: true,
    zIndex              : 999999
  });
  $('.connectedSortable .box-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move');

  // jQuery UI sortable for the todo list
  $('.todo-list').sortable({
    placeholder         : 'sort-highlight',
    handle              : '.handle',
    forcePlaceholderSize: true,
    zIndex              : 999999
  });

  // bootstrap WYSIHTML5 - text editor
  $('.textarea').wysihtml5();

  $('.daterange').daterangepicker({
    ranges   : {
      'Today'       : [moment(), moment()],
      'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month'  : [moment().startOf('month'), moment().endOf('month')],
      'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment().subtract(29, 'days'),
    endDate  : moment()
  }, function (start, end) {
    window.alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  });

  /* jQueryKnob */
  $('.knob').knob();

  // jvectormap data
  var visitorsData = {
    US: 398, // USA
    SA: 400, // Saudi Arabia
    CA: 1000, // Canada
    DE: 500, // Germany
    FR: 760, // France
    CN: 300, // China
    AU: 700, // Australia
    BR: 600, // Brazil
    IN: 800, // India
    GB: 320, // Great Britain
    RU: 3000 // Russia
  };
  // World map by jvectormap
  $('#world-map').vectorMap({
    map              : 'world_mill_en',
    backgroundColor  : 'transparent',
    regionStyle      : {
      initial: {
        fill            : '#e4e4e4',
        'fill-opacity'  : 1,
        stroke          : 'none',
        'stroke-width'  : 0,
        'stroke-opacity': 1
      }
    },
    series           : {
      regions: [
        {
          values           : visitorsData,
          scale            : ['#92c1dc', '#ebf4f9'],
          normalizeFunction: 'polynomial'
        }
      ]
    },
    onRegionLabelShow: function (e, el, code) {
      if (typeof visitorsData[code] != 'undefined')
        el.html(el.html() + ': ' + visitorsData[code] + ' new visitors');
    }
  });

  // Sparkline charts
  var myvalues = [1000, 1200, 920, 927, 931, 1027, 819, 930, 1021];
  $('#sparkline-1').sparkline(myvalues, {
    type     : 'line',
    lineColor: '#92c1dc',
    fillColor: '#ebf4f9',
    height   : '50',
    width    : '80'
  });
  myvalues = [515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921];
  $('#sparkline-2').sparkline(myvalues, {
    type     : 'line',
    lineColor: '#92c1dc',
    fillColor: '#ebf4f9',
    height   : '50',
    width    : '80'
  });
  myvalues = [15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21];
  $('#sparkline-3').sparkline(myvalues, {
    type     : 'line',
    lineColor: '#92c1dc',
    fillColor: '#ebf4f9',
    height   : '50',
    width    : '80'
  });

  // The Calender
  $('#calendar').datepicker();

  // SLIMSCROLL FOR CHAT WIDGET
  $('#chat-box').slimScroll({
    height: '250px'
  });

  /* Morris.js Charts */
  // Sales chart
  var area = new Morris.Line({
    element   : 'revenue-chart',
    resize    : true,
    data: [
        { y: '2017-01', a: 5},
        { y: '2017-02', a: 521},
        { y: '2017-03', a: 860},
        { y: '2017-04', a: 750},
        { y: '2017-05', a: 506},
        { y: '2017-06', a: 450},
        { y: '2017-07', a: 700},
        { y: '2017-08', a: 620},
        { y: '2017-09', a: 500},
        { y: '2017-10', a: 450},
        { y: '2017-11', a: 400},
        { y: '2017-12', a: 560}
    ],
    xkey      : 'y',
    xlabel    : 'month',
    ykeys     : ['a', 'b'],
    labels    : ['Item 1', 'Item 2'],
    lineColors: ['#a0d0e0', '#3c8dbc'],
    hideHover : 'auto'
  });
  var line = new Morris.Line({
    element          : 'line-chart',
    resize           : true,
    data             : [
      { y: '2017-12-18 8:00', a: 200},
      { y: '2017-12-18 9:00', a: 250},
      { y: '2017-12-18 10:00', a: 300},
      { y: '2017-12-18 11:00', a: 250},
      { y: '2017-12-18 12:00', a: 100},
      { y: '2017-12-18 13:00', a: 90},
      { y: '2017-12-18 14:00', a: 150},
      { y: '2017-12-18 15:00', a: 400},
      { y: '2017-12-18 16:00', a: 350},
      { y: '2017-12-18 17:00', a: 200},
      { y: '2017-12-18 18:00', a: 300}
    ],
    xkey             : 'y',
    ykeys            : ['a'],
    labels           : ['Item 1'],
    lineColors       : ['#efefef'],
    lineWidth        : 2,
    hideHover        : 'auto',
    gridTextColor    : '#fff',
    gridStrokeWidth  : 0.4,
    pointSize        : 4,
    pointStrokeColors: ['#efefef'],
    gridLineColor    : '#efefef',
    gridTextFamily   : 'Open Sans',
    gridTextSize     : 10
  });

  // Donut Chart
  var donut = new Morris.Donut({
    element  : 'sales-chart',
    resize   : true,
    colors   : ['#3c8dbc', '#f56954', '#00a65a','#ffa65a'],
    data     : [
      { label: 'SAE', value: 65 },
      { label: 'Oficina de Cultura', value: 31 },
      { label: 'Oficina de Sistemas', value: 26 },
      { label: 'Ciencias Básicas', value: 13 }
    ],
    hideHover: 'auto'
  });

  // Fix for charts under tabs
  $('.box ul.nav a').on('shown.bs.tab', function () {
    area.redraw();
    donut.redraw();
    line.redraw();
  });

  /* The todo list plugin */
  $('.todo-list').todoList({
    onCheck  : function () {
      window.console.log($(this), 'The element has been checked');
    },
    onUnCheck: function () {
      window.console.log($(this), 'The element has been unchecked');
    }
  });

});


}]);