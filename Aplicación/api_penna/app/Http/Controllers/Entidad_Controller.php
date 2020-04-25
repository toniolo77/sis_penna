<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Entidad;
use App\Http\Models\EntidadModel;


class Entidad_Controller extends Controller
{

    function __construct(){
       $this->entidad= new EntidadModel();
    }

    public function get_entidades(Request $request){
        $reglas=[
            'id_entidad' => 'numeric',
            ];

        $this->validar($request->all(),$reglas);

        return $this->entidad->get_entidades($request->all());
    }


    public function add_entidad(Request $request){
        $reglas=[
                    'nombre' => 'required|max:45',
                    'tipo_entidad' => 'required|numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this->entidad->add_entidad($request->all());

    }

    public function update_entidad(Request $request){
        $reglas=[
                    'id_entidad' => 'required|numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this->entidad->update_entidad($request->all());

    }


    public function remove_entidad(Request $request){
        $reglas=[
                    'id_entidad' => 'required|numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this->entidad->remove_entidad($request->all());

    }

}
