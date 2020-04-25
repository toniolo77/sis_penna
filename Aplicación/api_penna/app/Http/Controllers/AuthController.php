<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use Illuminate\Support\Facades\DB;
use App\Http\Models\PermisoModel;
use App\Http\Models\PersonalModel;

class AuthController extends Controller
{
    function __construct(){
       $this-> permiso  = new PermisoModel();
       $this-> personal = new PersonalModel();
    }

    

    public function crear_token(Request $request)
    {
        // obtiene las credenciales del request
        $credentials = $request->only('usuario', 'password');
        try {
            // Crea el token con las credenciales obtenidas
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        $token    = compact('token');
        
        //Obtiene los permisos del usuario
        $permisos = $this -> permiso -> get_permisos($request);

        //Obtiene los datos del usuario
        $datos_usuario = $this -> personal -> get_personal((object) array("usuario" => $request->usuario));
        $usuario_result = $datos_usuario['result'];
        if (count($usuario_result)>0){
            $usuario = array("nombre" => $usuario_result[0]->nombre_apellido);
        }
        else{
            $usuario = array("nombre" => "");
        }


        // Devuelvo el token con los datos
        return array("success"=>TRUE,"msg"=>"","result"=>array("token" => $token['token'],"usuario" => $usuario, "permisos" =>$permisos['result']));
    }


}
