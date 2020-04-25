<?php
namespace App\Http\Models;
use App\Http\Models\Model;

class PrestacionModel extends Model {

	public function get_prestaciones($request){
		$params= array();
        $id_tipo_bien=PRESTACION;

        $query="SELECT
                    p.id_prestacion id_bien,
                    CONCAT(p.id_prestacion,'-',{$id_tipo_bien}) id_bien_tipo,
                    p.descripcion,
                    p.observacion,
                    s.id_servicio,
                    s.nombre as servicio_nombre
                FROM  prestacion p
                LEFT JOIN servicio s USING(id_servicio)
                WHERE p.estado=".ALTA;

        if(isset($request->id_bien)){
            $query.=' AND p.id_prestacion=?';
            array_push($params,$request->id_bien);
        }
        if(isset($request->id_servicio)){
            $query.=' AND p.id_servicio=?';
            array_push($params,$request->id_servicio);
        }
        return $this->execute_simple_query("select",$query,$params);
	}

	/**
    * Agrega una nueva prestacion
    *@param id_servicio, observacion => opcionales
    *@param descripcion => obligatorio
    */
    public function add_prestacion($request){
        $params=array();
        $query=array();


        $query='INSERT INTO prestacion (
                                    id_servicio,
                                    descripcion,
                                    observacion,
                                    estado)
                VALUES(?,?,?,'.ALTA.')';

        $id_servicio= ($request ->id_servicio) ? $request->id_servicio : NULL;
		$observacion= ($request ->observacion) ? $request->observacion : NULL;

        array_push($params,$id_servicio);
		array_push($params,$request->descripcion);
        array_push($params,$observacion);


        return $this->execute_simple_query("insert",$query,$params);
    }

    public function remove_prestacion($request){
        $params= array();
        $query='UPDATE prestacion
        		SET    estado='.BAJA.'
                WHERE  id_prestacion=?';

        array_push($params,$request->id_bien);

        return $this->execute_simple_query("update",$query,$params);
    }

    public function update_prestacion($request){
        $params= array();
        $query='UPDATE prestacion
                SET
                       observacion=?,
                       descripcion=?,
                       id_servicio=?
                WHERE  id_prestacion=?';

        $observacion= ($request ->observacion) ? $request->observacion : '';
        $id_servicio= ($request ->id_servicio) ? $request->id_servicio : NULL;


        array_push($params,$observacion);
        array_push($params,$request->descripcion);
        array_push($params,$id_servicio);
        array_push($params,$request->id_bien);


        return $this->execute_simple_query("update",$query,$params);
    }
}
