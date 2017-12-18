app.factory('Repositorio',function($http){
    let ip = 'http://192.168.1.8';
    
    let respositorio = {
        getDestinosId : getDestinosId,
        getNovedades: getNovedades,
        getDestino: getDestino,
        crearDestino: crearDestino,
        editarDestino: editarDestino,
        crearNovedad: crearNovedad,
        getNovedad: getNovedad,
        editarNovedad: editarNovedad,
        eliminarNovedad : eliminarNovedad,
        enviarNotificacion: enviarNotificacion,
        eliminarDestino: eliminarDestino,
        crearNotificacion: crearNotificacion,
        getNotificaciones: getNotificaciones,
        enviarImagen: enviarImagen
    };
    return respositorio;

    function getDestinosId(idLugar){
        return $http.get(ip + '/lugares/'+idLugar+'/destinos')
    }

    function getNovedades(idLugar){
        return $http.get(ip + '/novedades')
    }

    function getDestino(id){
        return $http.get(ip + '/destinos/'+id);
    }

    function crearDestino(destino){
        return $http.post(ip + '/destinos', destino);
    }

    function editarDestino(id, destino){
        return $http.put(ip + '/destinos/'+id,destino);
    }

    function crearNovedad(novedad){
        return $http.post(ip + '/novedades',novedad);
    }

    function editarNovedad(id, novedad){
        return $http.put(ip + '/novedades/'+id,novedad);
    }

    function eliminarNovedad(id){
        return $http.delete(ip + '/novedades/'+id);
    }

    function getNovedad(id){
        return $http.get(ip + '/novedades/'+id);
    }

    function enviarNotificacion(notificacion){
        return $http.get('http://192.168.1.131:3000/notificaTema/0/'+ notificacion.titulo +
            '/' + notificacion.mensaje);
    }

    function eliminarDestino(id){
        return $http.delete(ip + '/destinos/'+id);
    }

    function crearNotificacion(notificacion){
        return $http.post(ip + '/notificaciones',notificacion);
    }
    function getNotificaciones(lugar_id) {
        return $http.get(ip + '/lugares/'+lugar_id+'/notificaciones');
    }

    function enviarImagen(novedad){
        return $http.post(ip+'/novedades/'+novedad.id+'/imagen', novedad.imagen);
    }
});