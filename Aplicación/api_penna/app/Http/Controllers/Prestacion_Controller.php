<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\PrestacionModel;


class Prestacion_Controller extends Controller{
    function __construct(){
       $this-> prestacion = new PrestacionModel();
    }

    public function get_prestaciones(Request $request){
        $reglas=[
                    'id_prestacion'   => 'numeric',
                    'id_servicio'     => 'numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> prestacion -> get_prestaciones($request);
    }

    public function add_prestacion(Request $request){
        $reglas=[
                    'id_servicio'     => 'numeric',
                    'descripcion'     => 'required|max:64',
                    'observacion'     => 'max:128'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> prestacion ->add_prestacion($request);
    }

    public function remove_prestacion(Request $request){
        $reglas=[
                    'id_bien' => 'required|numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> prestacion ->remove_prestacion($request);

    }

    public function update_prestacion(Request $request){
        $reglas=[
                    'descripcion'     => 'required|max:64',
                    'id_bien'         => 'required|numeric',
                    'observacion'     => 'max:128',
                    'id_servicio'     => 'numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> prestacion ->update_prestacion($request);
    }
}
