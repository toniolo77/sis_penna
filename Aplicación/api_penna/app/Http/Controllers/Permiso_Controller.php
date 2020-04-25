<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\PermisoModel;


class Permiso_Controller extends Controller{
    function __construct(){
       $this-> permiso = new PermisoModel();
    }


    public function crear_administrador(Request $request){
        //$request -> usuario = 'ftoniolo';
        return $this-> permiso -> agregar_cuenta($request,PERFIL_ADMINISTRADOR);
    }

    public function actualizar_password(Request $request){
        $reglas=[
                    'password_anterior'  => 'required|max:20',
                    'password'           => 'required|max:20'
                ];

        $this->validar($request->all(),$reglas);

        $usuario= $this->getAuthenticatedUser()['usuario'];
        if ($this->validar_pass_anterior($usuario,$request->password_anterior)){
            return $this-> permiso -> cambiar_password($usuario,$request);
        }
        else{
            return array("success"=>FALSE,"msg"=> "No valido la contraseña","result"=>FALSE);
        }
    }

    public function reset_password(Request $request){
        $reglas=[
                    'usuario'  => 'required'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> permiso -> reset_password($request->usuario);
    }



    ///////////////////////
    //////VALIDACIONES/////
    /////////////////////// 

    //verifica que concuerde el password anterior con el del usuario
    private function validar_pass_anterior($usuario,$password) {
        return  $this -> permiso-> validar_pass_anterior($usuario,$password);
    }

}
