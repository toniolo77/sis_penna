<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Servicio;
use App\Http\Models\ServicioModel;

class Servicio_Controller extends Controller
{
    function __construct(){ 
       $this->servicio= new ServicioModel(); 
    } 

    public function get_servicios(){
        return $this->servicio->get_servicios();
    }

    public function add_servicio(Request $request){
        $reglas=[
                    'nombre' => 'required|max:45'
                ];

        $this->validar($request->all(),$reglas);

        return $this->servicio->add_servicio($request);

    }

    public function remove_servicio(Request $request){
        $reglas=[
                    'id_servicio' => 'required|numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this->servicio->remove_servicio($request);
    }

    public function update_servicio(Request $request){
        $reglas=[
                    'nombre' => 'required|max:45',
                    'id_servicio' => 'required|numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this->servicio->update_servicio($request);

    } 

}
