<?php
namespace App\Http\Models;
use App\Http\Models\Model;

class EquipoModel extends Model {

	public function get_equipos($request){
		$params= array();
        $id_tipo_bien=EQUIPO;

        $query="SELECT
                    e.id_equipo id_bien,
                    CONCAT(e.id_equipo,'-',{$id_tipo_bien}) id_bien_tipo,
                    e.id_equipo_padre,
                    e.cod_patrimonial,
                    CONCAT(e.cod_patrimonial,' - ',e.descripcion) cod_desc,
                    e.descripcion,
                    e.observacion,
                    s.id_servicio,
                    s.nombre as servicio_nombre,
                	if(e.id_equipo_padre is not null,CONCAT(e_padre.cod_patrimonial,' - ',e_padre.descripcion),'-') as padre_desc,
                	if(e.id_equipo_padre is not null,e_padre.cod_patrimonial,'-') as padre_cod
                FROM  equipo e
                INNER JOIN servicio s USING(id_servicio)
                LEFT JOIN equipo e_padre ON(e.id_equipo_padre=e_padre.id_equipo)
                WHERE e.estado=".ALTA;

        if(isset($request->id_bien)){
            $query.=' AND e.id_equipo=?';
            array_push($params,$request->id_bien);
        }
        if(isset($request->cod_patrimonial)){
            $query.=' AND e.cod_patrimonial=?';
            array_push($params,$request->cod_patrimonial);
        }
        if(isset($request->id_servicio)){
            $query.=' AND e.id_servicio=?';
            array_push($params,$request->id_servicio);
        }
        return $this->execute_simple_query("select",$query,$params);
	}

	public function add_equipo($request){
        $params=array();
        $query=array();

        $query='INSERT INTO equipo (id_equipo_padre,cod_patrimonial,id_servicio,descripcion,observacion,estado)
                VALUES(?,?,?,?,?,'.ALTA.')';

        $observacion= ($request ->observacion) ? $request->observacion : '';

        
        array_push($params,$request->id_equipo_padre);
        array_push($params,$request->cod_patrimonial);
        array_push($params,$request->id_servicio);
        array_push($params,$request->descripcion);
        array_push($params,$observacion);


        return $this->execute_simple_query("insert",$query,$params);
    }

    public function remove_equipo($request){
        $params= array();
        $query='UPDATE equipo
        		    SET    estado='.BAJA.'
                WHERE  id_equipo=?';

        array_push($params,$request->id_bien);

        return $this->execute_simple_query("update",$query,$params);
    }

    public function update_equipo($request){
        $params= array();
        $query='UPDATE equipo
                SET
                       cod_patrimonial=?,
                       descripcion=?,
                       observacion=?,
                       id_servicio=?,
                       id_equipo_padre=?
                WHERE  id_equipo=?';

        $observacion= ($request ->observacion) ? $request->observacion : '';
        $id_equipo_padre= ($request ->id_equipo_padre) ? $request->id_equipo_padre : null;

        array_push($params,$request->cod_patrimonial);
        array_push($params,$request->descripcion);
        array_push($params,$request->observacion);
        array_push($params,$request->id_servicio);
        array_push($params,$request->id_equipo_padre);
        array_push($params,$request->id_bien);
        

        return $this->execute_simple_query("update",$query,$params);
    }

    public function reactivar_equipo($request){
        $params= array();
        $query='UPDATE equipo
                SET
                       estado = ?
                WHERE  id_equipo=?';


        array_push($params,ALTA);
        array_push($params,$request->id_bien);
        

        return $this->execute_simple_query("update",$query,$params);
    }


    /**
    *Devuelve los equipos con hijos de los pasados por parámetro
    **/
    public function get_padres($request){
        $params= array();
		$equipos =  implode(',',$request->id_bienes);
        $query = "SELECT
                    DISTINCT hijo.id_equipo_padre,
                    hijo.descripcion hijo_descripcion,
                    padre.descripcion padre_descripcion
                FROM
                    equipo hijo
                INNER JOIN equipo padre ON(hijo.id_equipo_padre=padre.id_equipo)
                WHERE
                    hijo.id_equipo_padre IN (".$equipos.")
                    AND hijo.estado=?";

        array_push($params,ALTA);

        return $this->execute_simple_query("select",$query,$params);
    }

    /**
    * Determina si ya existe el código patrimonial
    * @return [string] si ya existe devuelve el estado 'baja' o 'alta'
    */
    public function existe_cod_patrimonial($request){
        $params= array();
        $query = "SELECT 
                    IF (estado=".BAJA.",'baja','alta') as estado,
                    id_equipo,
                    cod_patrimonial,
                    descripcion
                FROM
                    equipo
                WHERE
                    cod_patrimonial=?";

        array_push($params,$request->cod_patrimonial);
        
        return $this->execute_simple_query("select",$query,$params);
    }


}
