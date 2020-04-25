<?php
namespace App\Http\Models;

use Illuminate\Support\Facades\DB;

const ALTA=1;
const BAJA=0;


class Model
{

    function __construct(){
    }

	protected function execute_simple_query($metodo,$query,$params=array()){
    	try{
    		$resultado;
            DB::connection()->enableQueryLog();
			switch ($metodo) {
                case "select":
                    $resultado=DB::select($query,$params);
                    break;
			    case "insert":
			        $resultado=DB::insert($query,$params);
			        break;
			    case "update":
			    	$resultado=DB::update($query,$params);
			        break;
			    case "delete":
			    	$resultado=DB::delete($query,$params);
			        break;
			}
            $auxQuery =DB::getQueryLog();
            // die(var_dump(print_r($auxQuery,true) . " " . print_r($params,true)));
    		return array("success"=>TRUE,"msg"=>$auxQuery,"result"=>$resultado);

    	}
    	catch (\Exception $e) {
            /*header('HTTP/1.1 422 Internal Server Booboo');
            header('Content-Type: application/json; charset=UTF-8');
            die(json_encode(array("success"=>FALSE,"msg"=>$e->getMessage(),"result"=>FALSE,'code' => 1337)));*/
            //return array("success"=>FALSE,"msg"=>$e->getMessage(),"result"=>FALSE);
            die(json_encode(array("success"=>FALSE,"msg"=> $e->getMessage(),"result"=>FALSE)));
        }
    }

    /**
    * Ejecuta multiples consultas devolviendo el resultado de la última
    *@param $metodo array que contiene tipo de la consulta (select,insert,update,delete)
    *@param $query  array donde cada elemento es una consulta
    *@param $params array donde cada elemento son los parámetro de una consulta
    *@param $transaccion true si las consultas son transaccionales y false en caso contrario
    */
    protected function execute_multiple_query($metodo,$query,$params=array(),$transaccion=true){
    	try{
	    	if ($transaccion){
	    		DB::beginTransaction();
	    	}
            $resultado;
            foreach ($query as  $index => $consulta) {
                switch ($metodo[$index]) {
                case "select":
                    $resultado=DB::select($consulta,$params[$index]);
                    break;
                case "insert":
                    $resultado=DB::insert($consulta,$params[$index]);
                    break;
                case "update":
                    $resultado=DB::update($consulta,$params[$index]);
                    break;
                case "delete":
                    $resultado=DB::delete($consultas,$params[$index]);
                    break;
                }
            }

	    	if ($transaccion){
				DB::commit();
			}

            return array("success"=>TRUE,"msg"=>"","result"=>$resultado);
		}
		catch (\Exception $e) {
            /*header('HTTP/1.1 422 Internal Server Booboo');
            header('Content-Type: application/json; charset=UTF-8');
            die(json_encode(array("success"=>FALSE,"msg"=>$e->getMessage(),"result"=>FALSE,'code' => 1337)));*/

            if ($transaccion){
            	DB::rollback();
            }
            die(json_encode(array("success"=>FALSE,"msg"=> $e->getMessage(),"result"=>FALSE)));
        }
    }

}
