var app = angular.module('adminLTE', ['ngRoute'])
app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl : "pages/index/index.html"
	})
	.when("/listarDestinos", {
		templateUrl : "pages/destinos/listarDestinos.html"
	})
	.when("/crearDestino", {
		templateUrl : "pages/destinos/crearDestino.html"
	})
	.when("/editarDestino", {
		templateUrl : "pages/destinos/editarDestino.html"
	})
	.when("/listarNovedades", {
		templateUrl : "pages/novedades/listarNovedades.html"
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