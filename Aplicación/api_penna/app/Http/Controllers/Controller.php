<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Validator;
use JWTAuth;
use App\Http\Models\PersonalModel;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function validar($datos,$reglas){
    	$mensajes = [
		    'required'    => ':attribute es necesario ingresarlo.',
		    'max'         => ':attribute debe ser menor a :max.',
		    'numeric'     => ':attribute debe ser un número.',
            'date_format' => ':attribute debe ser con el formato dd/mm/yyyy.'
		];

    	$validator = Validator::make($datos,$reglas,$mensajes);

        if ($validator->fails()) {
            die(json_encode(array("success"=>FALSE,"msg"=> $validator->errors()->first(),"result"=>FALSE)));
        }
    }

    //Obtiene los datos del usuario conectado
    public function getAuthenticatedUser()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        // El token es correcto y devuelve los datos del usuario
        return $user['original'];
    }

    //Obtiene el legajo del usuario conectado
    public function getAuthenticatedLegajo(){
        $usuario_creacion =$this->getAuthenticatedUser()['usuario'];
        $personal = new PersonalModel();
        $datos_usuario = $personal -> get_personal((object) array("usuario" => $usuario_creacion));
        $legajo= $datos_usuario['result'][0]->legajo;

        return $legajo;
    }



    // protected function get_values_params($values){
    //     $signos=array();
    //     $valores=array();
    //     $result=array();
    //     foreach ($values as $key => $value) {
    //         array_push($signos,"?");
    //         array_push($valores,$value);
    //     }
    //     array_push($result,implode(",",$signos));
    //     array_push($result,implode(",",$valores));

    //     return $result;
    // }

}
