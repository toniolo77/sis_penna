<?php
namespace App\Http\Models;
use App\Http\Models\Model;
use Illuminate\Support\Facades\Hash;


class PermisoModel extends Model {

	
    /**
    * Obtiene los permisos que tiene habilitados un usuario
    * @param legajo  
    */
    public function get_permisos($request){
		$params= array();
        $query='SELECT
                    p.id_opcion,p.id_menu
                FROM  
                    users u
                JOIN
                    permiso_perfil p USING(id_perfil)
                WHERE 
                    u.usuario=?
                
                UNION 

                SELECT
                    p.id_opcion,p.id_menu
                FROM
                    personal personal
                JOIN 
                    permiso_perfil p USING(legajo) 
                WHERE
                    personal.usuario = ?
                ;';


        array_push($params,$request->usuario);
        array_push($params,$request->usuario);
        

        return $this->execute_simple_query("select",$query,$params);
	}

    //Agrega una cuenta personal con el personal ingresado si no existe una  ya creada
    public function agregar_personal($request){
        try{
            $id_perfil= $this-> get_perfil_usuario($request);
            if ((!$id_perfil)){ //Si no existe una cuenta para el personal

                return $this->agregar_cuenta($request,PERFIL_BASICO);
            }
            else{
                return array("success"=>TRUE,"msg"=>"Ya existe una cuenta para el usuario ingresado","result"=>TRUE);
            }
        }
        catch (\Exception $e) {
            throw $e;
        }
    }

    //Borra la cuenta de un personal
    public function quitar_personal($request){
        try{
            $params= array();

            $query='DELETE
                        users
                    FROM
                        users
                    JOIN
                        personal USING (usuario)
                    WHERE
                        legajo=?';

            array_push($params,$request->legajo);

            return $this->execute_simple_query("delete",$query,$params);
        }
        catch (\Exception $e) {
            throw $e;
        }
    }

    //Le agrega el perfil tecnico a la cuenta del personal
    public function agregar_tecnico($request){
        try{
            return $this->cambiar_perfil($request,PERFIL_TECNICO);
        }
        catch (\Exception $e) {
            throw $e;
        }
    }

    //Le quita el perfil tecnico a la cuenta del personal
    public function quitar_tecnico($request){
        try{
            return $this->cambiar_perfil($request,PERFIL_BASICO);
        }
        catch (\Exception $e) {
            throw $e;
        }
    }

    
    /**
    * agrega una cuenta a un usuario
    *@param $request usuario que se quiere agregar al sistema
    *@param $perfil es el nuevo perfil que se le va a asignar al usuario
    */
    public function agregar_cuenta($request,$perfil){
        $params= array();

        $query= 'INSERT INTO users(usuario,id_perfil,password)
                    VALUES  (?,?,?)';

        array_push($params,$request->usuario);
        array_push($params,$perfil);
        array_push($params,bcrypt(BASIC_PASSWORD));

        return $this->execute_simple_query("insert",$query,$params);
    }



    /**
    * cambia el perfil de un usuario en caso que el usuario no sea el administrador
    *@param $request usuario o legajo del personal que se quieren modificar el perfil
    *@param $nuevo_perfil es el nuevo perfil que se le va a asignar al usuario
    */
    private function cambiar_perfil($request,$nuevo_perfil){
        try {
            $id_perfil= $this-> get_perfil_usuario($request);
            if ($id_perfil){
                if ($id_perfil!= PERFIL_ADMINISTRADOR){
                    $params= array();
                    array_push($params,$nuevo_perfil);


                    $whr="";
                    if(isset($request->usuario)){
                         $whr.=' u.usuario=? ';
                         array_push($params,$request->usuario);
                     }
                     if(isset($request->legajo)){
                         $whr.=' p.legajo=? ';
                         array_push($params,$request->legajo);
                     }

                    $query= 'UPDATE 
                                users u 
                            INNER JOIN
                                personal p  USING(usuario) 
                            SET
                                id_perfil=?
                            WHERE
                                '.$whr.'';


                    return $this->execute_simple_query("update",$query,$params);
                }
                else{
                    return array("success"=>TRUE,"msg"=>"Tiene una cuenta con un perfil superior","result"=>TRUE); 
                }
            }
            else{
                return array("success"=>TRUE,"msg"=>"No existe una cuenta para el usuario","result"=>FALSE);
            }
        }
        catch (\Exception $e) {
            throw $e;
        }
    }

    /**
    * Obtiene el perfil del usuario ingresado
    *@param $request es el usuario o el legajo del personal
    *@return false si no tiene ningun perfil y sino el id del perfil del usuario
    */
    private function get_perfil_usuario($request){
        try{
            $params=array();
            $whr="";
            if(isset($request->usuario)){
                 $whr.=' u.usuario=? ';
                 array_push($params,$request->usuario);
            }
            else{
                 if(isset($request->legajo)){
                     $whr.=' p.legajo=? ';
                     array_push($params,$request->legajo);
                 }
            }

            $query="SELECT 
                        id_perfil
                    FROM
                        users u
                    INNER JOIN
                        personal p USING(usuario)
                    WHERE
                        ".$whr."";


            $perfil=$this->execute_simple_query("select",$query,$params);

            if ($perfil['success'] && (count($perfil['result'])>0)){
                return $perfil['result'][0]->id_perfil;
            }
            else {
                return false;
            }
        }
        catch (\Exception $e) {
            throw $e;
        }

    }

    //Verifica que la contraseña sea igual a la almacenada 
    public function validar_pass_anterior($usuario,$password){
        $params=array();
        $query="SELECT 
                    password
                FROM
                    users
                WHERE
                    usuario=?";

        //array_push($params, bcrypt($password));
        array_push($params,$usuario);

       $validacion =$this->execute_simple_query("select",$query,$params);
       if ($validacion['success'] && (count($validacion['result'])>0)){
            
            if(Hash::check($password,$validacion['result'][0]->password)) {
                return true;
            }
            else{
                return false;
            }
        }
        else
            return false;
    }

    
    public function cambiar_password($usuario,$request){
        $params=array();
        $query="UPDATE
                    users
                SET
                    password=?
                WHERE
                    usuario=?";

        array_push($params,bcrypt($request->password));
        array_push($params,$usuario);

        return $this->execute_simple_query("update",$query,$params);
    }

    //Pone la contraseña por defecto al usuario
    public function reset_password($usuario){
        $params=array();
        $query="UPDATE
                    users
                SET
                    password=?
                WHERE
                    usuario=?";

        array_push($params,bcrypt(BASIC_PASSWORD));
        array_push($params,$usuario);

        return $this->execute_simple_query("update",$query,$params);

    }

}