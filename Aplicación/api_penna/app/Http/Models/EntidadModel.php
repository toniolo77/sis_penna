<?php
namespace App\Http\Models;

use App\Http\Models\Model;
// include('Model.php');

class EntidadModel extends Model {


    //Obtiene todas las entidades
    public function get_entidades($args) {
		$params= array();
        $query="SELECT
                    id_entidad,nombre,tipo_entidad
                FROM entidad
                WHERE estado=".ALTA."
                ORDER BY tipo_entidad,nombre asc";

        if(isset($args['id_entidad'])){
            $query.=' AND id_entidad=?';
            array_push($params,$args['id_entidad']);
        }

        return $this->execute_simple_query("select",$query,$params);
	}

    public function add_entidad($args){
        $params=array();
        $query=array();

        $query='INSERT INTO entidad (nombre,tipo_entidad,estado)
                VALUES(?,?,?)';

        array_push($params,$args['nombre']);
        array_push($params,$args['tipo_entidad']);
        array_push($params,ALTA);


        return $this->execute_simple_query("insert",$query,$params);
    }

    public function update_entidad($args){
        $params= array();
        $query='UPDATE entidad
                SET    nombre=?
                WHERE  id_entidad=?';

        array_push($params,$args['nombre']);
        array_push($params,$args['id_entidad']);


        return $this->execute_simple_query("update",$query,$params);
    }

    public function remove_entidad($args){
        $params= array();
        $query='UPDATE entidad
                SET    estado='.BAJA.'
                WHERE  id_entidad=?';

        array_push($params,$args['id_entidad']);

        return $this->execute_simple_query("update",$query,$params);
    }
}