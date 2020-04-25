<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers : Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With' );


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//Servicios
Route::middleware('jwt.auth')->get('/servicios', 'Servicio_Controller@get_servicios');
Route::middleware('jwt.auth')->post('/servicios', 'Servicio_Controller@add_servicio');
Route::middleware('jwt.auth')->put('/servicios', 'Servicio_Controller@update_servicio');
Route::middleware('jwt.auth')->delete('/servicios', 'Servicio_Controller@remove_servicio');

//Puestos
Route::middleware('jwt.auth')->get('/puestos/{id_puesto?}', 'Puesto_Controller@get_puestos');
Route::middleware('jwt.auth')->post('/puestos', 'Puesto_Controller@add_puesto');
Route::middleware('jwt.auth')->put('/puestos', 'Puesto_Controller@update_puesto');
Route::middleware('jwt.auth')->delete('/puestos', 'Puesto_Controller@remove_puesto');

//Técnicos
Route::middleware('jwt.auth')->get('/tecnicos/{id_entidad?}/{legajo?}', 'Tecnico_Controller@get_tecnicos');
Route::middleware('jwt.auth')->post('/tecnicos', 'Tecnico_Controller@add_tecnico');
Route::middleware('jwt.auth')->delete('/tecnicos', 'Tecnico_Controller@remove_tecnico');
Route::middleware('jwt.auth')->post('/tecnico_entidad', 'Tecnico_Controller@get_entidades_no_asignadas');
Route::middleware('jwt.auth')->get('/tecnico_entidad', 'Tecnico_Controller@get_tecnicos_entidad');
Route::middleware('jwt.auth')->get('/entidades_tecnico', 'Tecnico_Controller@get_entidades_tecnico');

//Personal
Route::middleware('jwt.auth')->get('/personal/{legajo?}', 'Personal_Controller@get_personal');
Route::middleware('jwt.auth')->post('/personal', 'Personal_Controller@add_personal');
Route::middleware('jwt.auth')->post('/personal/existe', 'Personal_Controller@existe_personal');
Route::middleware('jwt.auth')->put('/personal', 'Personal_Controller@update_personal');
Route::middleware('jwt.auth')->delete('/personal', 'Personal_Controller@remove_personal');

//Entidad
Route::middleware('jwt.auth')->get('/entidades/{id_entidad?}', 'Entidad_Controller@get_entidades');
Route::middleware('jwt.auth')->post('/entidades', 'Entidad_Controller@add_entidad');
Route::middleware('jwt.auth')->put('/entidades', 'Entidad_Controller@update_entidad');
Route::middleware('jwt.auth')->delete('/entidades', 'Entidad_Controller@remove_entidad');

//Equipo
Route::middleware('jwt.auth')->post('/equipos/padre', 'Equipo_Controller@get_padres');
Route::middleware('jwt.auth')->post('/equipos/cod_patrimonial', 'Equipo_Controller@existe_cod_patrimonial');
Route::middleware('jwt.auth')->put('/equipos/reactivar', 'Equipo_Controller@reactivar_equipo');
Route::middleware('jwt.auth')->get('/equipos/{id_equipo?}', 'Equipo_Controller@get_equipos');
Route::middleware('jwt.auth')->post('/equipos', 'Equipo_Controller@add_equipo');
Route::middleware('jwt.auth')->put('/equipos', 'Equipo_Controller@update_equipo');
Route::middleware('jwt.auth')->delete('/equipos', 'Equipo_Controller@remove_equipo');

//Prestacion
Route::middleware('jwt.auth')->get('/prestaciones/{id_equipo?}', 'Prestacion_Controller@get_prestaciones');
Route::middleware('jwt.auth')->post('/prestaciones', 'Prestacion_Controller@add_prestacion');
Route::middleware('jwt.auth')->put('/prestaciones', 'Prestacion_Controller@update_prestacion');
Route::middleware('jwt.auth')->delete('/prestaciones', 'Prestacion_Controller@remove_prestacion');


//ABM Orden Trabajo
Route::middleware('jwt.auth')->post('/bienes_solicitud', 'Orden_Trabajo_Controller@get_bienes_solicitud');
Route::middleware('jwt.auth')->post('/ordenes', 'Orden_Trabajo_Controller@add_orden');
Route::middleware('jwt.auth')->get('/ordenes', 'Orden_Trabajo_Controller@get_orden_trabajo');

//Ver Ordenes
Route::middleware('jwt.auth')->post('/ver_ordenes', 'Orden_Trabajo_Controller@get_ordenes');
Route::middleware('jwt.auth')->put('/ver_ordenes', 'Orden_Trabajo_Controller@dar_conformidad');

//Admin Orden Trabajo
Route::middleware('jwt.auth')->put('/ordenes/derivar', 'Orden_Trabajo_Controller@derivar_orden');
Route::middleware('jwt.auth')->put('/ordenes/asignar', 'Orden_Trabajo_Controller@asignar_orden');
Route::middleware('jwt.auth')->put('/ordenes/rechazar', 'Orden_Trabajo_Controller@rechazar_orden');
Route::middleware('jwt.auth')->put('/ordenes/actualizar', 'Orden_Trabajo_Controller@actualizar_orden');
Route::middleware('jwt.auth')->put('/ordenes/finalizar', 'Orden_Trabajo_Controller@finalizar_orden');
Route::middleware('jwt.auth')->put('/ordenes/actualizar_estado', 'Orden_Trabajo_Controller@actualizar_estado');


//Configuracion
Route::middleware('jwt.auth')->put('/password', 'Permiso_Controller@actualizar_password');
Route::middleware('jwt.auth')->post('/password', 'Permiso_Controller@reset_password');

//Bien
Route::middleware('cors')->post('/bienes', 'Bien_Controller@get_bienes');


Route::middleware('cors')->post('/auth', 'AuthController@crear_token');
Route::middleware('cors')->post('/crear_administrador', 'Permiso_Controller@crear_administrador');

