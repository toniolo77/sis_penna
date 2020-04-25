<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Equipo;
use App\Http\Models\EquipoModel;


class Equipo_Controller extends Controller{
    function __construct(){
       $this-> equipo = new EquipoModel();
    }

    public function get_equipos(Request $request){
        $reglas=[
                    'id_bien'         => 'numeric',
                    'cod_patrimonial' => 'numeric',
                    'id_servicio'     => 'numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> equipo -> get_equipos($request);
    }

    public function add_equipo(Request $request){
        $reglas=[
                    'id_equipo_padre' => 'numeric',
                    'cod_patrimonial' => 'required|numeric',
                    'id_servicio'     => 'required|numeric',
                    'descripcion'     => 'required|max:64',
                    'observacion'     => 'max:128'
                ];

        $this->validar($request->all(),$reglas);

        $existe_cod_patrimonial= $this->existe_cod_patrimonial($request);
        if (count($existe_cod_patrimonial['result'])>0){//Ya existe el código patrimonial ingresado
            return array("success"=>TRUE,"msg"=>"","result"=>$existe_cod_patrimonial['result']);

        }
        else{
            return $this-> equipo ->add_equipo($request);
        }

    }

    public function remove_equipo(Request $request){
        $reglas=[
                    'id_bien' => 'required|numeric'
                ];


        $this->validar($request->all(),$reglas);


        $es_padre= $this-> equipo -> get_padres((object) array("id_bienes" => array($request->id_bien)));
        if (count($es_padre['result'])>0){
            return array("success"=>FALSE,"msg"=>"No se puede eliminar porque existen equipos que forman parte de él","result"=>"");
        }
        else{
            return $this-> equipo ->remove_equipo($request);
        }

    }

    public function update_equipo(Request $request){
        $reglas=[
                    'cod_patrimonial' => 'required|numeric',
                    'descripcion'     => 'required|max:64',
                    'observacion'     => 'max:128',
                    'id_bien'         => 'required|numeric',
                    'id_servicio'     => 'required|numeric',
                    'id_equipo_padre' => 'numeric'

                ];

        $this->validar($request->all(),$reglas);

        return $this-> equipo ->update_equipo($request);
    }

    public function reactivar_equipo(Request $request){
        $reglas=[
                    'id_bien'         => 'required|numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> equipo ->reactivar_equipo($request);
    }

    public function get_padres(Request $request){
        $reglas=[
                    'id_bienes' => 'required'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> equipo ->get_padres($request);
    }

    /**
    * Determina si ya existe el código patrimonial 
    */
    public function existe_cod_patrimonial(Request $request){
        $reglas=[
                    'cod_patrimonial' => 'required|numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> equipo ->existe_cod_patrimonial($request);
    }
}
