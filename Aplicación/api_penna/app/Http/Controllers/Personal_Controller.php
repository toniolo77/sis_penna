<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\PersonalModel;
use App\Http\Controllers\Tecnico_Controller;

class Personal_Controller extends Controller
{
    function __construct(){ 
       $this->personal= new PersonalModel();
       $this->tecnico = new Tecnico_Controller(); 
    } 

    public function get_personal(Request $request){
        $reglas=[
                    'legajo' => 'numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this->personal->get_personal($request);
    }

    //@TODO ver que pasa si se da de alta un personal que estaba dado de baja
    public function add_personal(Request $request){
        $reglas=[
                    'legajo'        => 'numeric',
                    'dni'           => 'numeric',
                    'usuario'       => 'required|max:20',
                    'nombre'        => 'required|max:20',
                    'apellido'      => 'required|max:20',
                    'id_servicio'   => 'numeric',
                    'fecha_ingreso' => 'date_format:d/m/Y'
                ];

        $this->validar($request->all(),$reglas);

        $existe_personal=$this->personal->existe_personal($request);
        if ($existe_personal['result']){
            return array("success" => FALSE , "msg"=>$existe_personal['msg'] ,"result" => FALSE );
        }
        else{
            return $this->personal->add_personal($request);
        }

    }

    //Da de baja a un personal si es que ya no es técnico  
    public function remove_personal(Request $request){
        $reglas=[
                    'legajo' => 'numeric'
                ];

        $this->validar($request->all(),$reglas);

        if ($this->tecnico->es_tecnico($request)){
            return array("success"=>FALSE,"msg"=>"No se puede eliminar el personal porque existe un técnico con ese legajo","result"=>TRUE);
        }
        else{
            return $this->personal->remove_personal($request);
        }
    }

    public function update_personal(Request $request){
        $reglas=[
                    'legajo'        => 'numeric',
                    'dni'           => 'numeric',
                    'usuario'       => 'required|max:20',
                    'nombre'        => 'required|max:20',
                    'apellido'      => 'required|max:20',
                    'fecha_ingreso' => 'date_format:d/m/Y',
                    'id_servicio'   => 'numeric',
                    
                ];

        $this->validar($request->all(),$reglas);

        return $this->personal->update_personal($request);
    }

    public function existe_personal(Request $request){
        $reglas=[
                    'legajo'        => 'required|numeric',
                    'dni'           => 'required|numeric',
                    'usuario'       => 'required|max:20',
                ];

        $this->validar($request->all(),$reglas);

        return $this->personal->existe_personal($request);
    }
}
