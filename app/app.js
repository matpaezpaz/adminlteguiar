var app = angular.module('adminLTE', ['ngRoute'])
app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl : "pages/index/index.html"
	})
	.when("/listarDestinos", {
		templateUrl : "pages/destinos/listarDestinos.html",
		controller: "destinosController"
	})
	.when("/crearDestino", {
		templateUrl : "pages/destinos/crearDestino.html"
	})
	.when("/editarDestino", {
		templateUrl : "pages/destinos/editarDestino.html"
	})
	.when("/listarNovedades", {
		templateUrl : "pages/novedades/listarNovedades.html",
		controller : "listarNovedadesController"
	})
	.when("/crearNovedad", {
		templateUrl : "pages/novedades/crearNovedad.html"
	})
	.when("/editarNovedad", {
		templateUrl : "pages/novedades/editarNovedad.html"
	})
	.when("/listarNotificaciones", {
		templateUrl : "pages/notificaciones/listarNotificaciones.html"
	})
	.when("/crearNotificacion", {
		templateUrl : "pages/notificaciones/crearNotificacion.html"
	})
	.otherwise({
		templateUrl : "pages/examples/404.html"
	});
});

app.controller('destinosController', ['$scope','$http', function($scope,$http){
	$scope.destinos = [
		{
			fechapublicacion:'24/11/2017',
			usuario:'ella',
			titulo:'Oficina de Cultura',
			descripcion:'descrip1'
		},{
			fechapublicacion:'24/11/2017',
			usuario:'ella',
			titulo:'Oficina de Sistemas',
			descripcion:'descrip2'
		},{
			fechapublicacion:'24/11/2017',
			usuario:'ella',
			titulo:'Deptarmento Sistemas',
			descripcion:'descrip3'
		},{
			fechapublicacion:'24/11/2017',
			usuario:'ella',
			titulo:'SAE',
			descripcion:'descrip4'
		},{
			fechapublicacion:'24/11/2017',
			usuario:'ella',
			titulo:'titulo5',
			descripcion:'descrip5'
		},
	];
}]);


app.controller('listarNovedadesController', ['$scope','$http', function($scope,$http){
	$scope.novedades = [
		{
			fechapublicacion:'24/11/2017',
			usuario:'ella',
			titulo:'Oficina de Cultura',
			descripcion:'descrip1'
		},{
			fechapublicacion:'24/11/2017',
			usuario:'ella',
			titulo:'Oficina de Sistemas',
			descripcion:'descrip2'
		},{
			fechapublicacion:'24/11/2017',
			usuario:'ella',
			titulo:'Deptarmento Sistemas',
			descripcion:'descrip3'
		},{
			fechapublicacion:'24/11/2017',
			usuario:'ella',
			titulo:'SAE',
			descripcion:'descrip4'
		},{
			fechapublicacion:'24/11/2017',
			usuario:'ella',
			titulo:'titulo5',
			descripcion:'descrip5'
		},
	];
}]);