<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
require_once('Equipo_Controller.php');
require_once('Prestacion_Controller.php');

const EQUIPO=1;
const PRESTACION=2;

class Bien_Controller extends Controller
{
    public function get_bienes(Request $request){
        switch ($request->id_tipo_bien) {
            case EQUIPO:
                $equipo= new Equipo_Controller;
                return $equipo->get_equipos($request);
                break;
            
            case PRESTACION:
                $prestacion= new Prestacion_Controller;
                return $prestacion->get_prestaciones($request);
                break;
        }
    }

}
