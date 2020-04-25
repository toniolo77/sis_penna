<?php
namespace App\Http\Models;

use App\Http\Models\Model;

class ServicioModel extends Model {

	public function get_servicios(){
        $query= "SELECT id_servicio,nombre
                 FROM servicio;";
       
       return $this->execute_simple_query("select",$query);
    }

    public function add_servicio($request){
        $params=array();
        $query=array();

        $query="INSERT INTO servicio(nombre) VALUES(?)";
        array_push($params,$request->nombre);


        return $this->execute_simple_query("insert",$query,$params);

    }

    public function remove_servicio($request){
        $params= array();
        
        $query='DELETE 
                FROM   servicio
                WHERE  id_servicio=?';

        array_push($params,$request->id_servicio);


        return $this->execute_simple_query("delete",$query,$params);
    }

    public function update_servicio($request){
        $params= array();
        $query='UPDATE servicio
                SET    nombre=?
                WHERE  id_servicio=?';

        array_push($params,$request->nombre);
        array_push($params,$request->id_servicio);


        return $this->execute_simple_query("update",$query,$params);

    }



}
