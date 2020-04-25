<?php
namespace App\Http\Models;
use App\Http\Models\Model;

class OrdenTrabajoModel extends Model {

	public function get_equipos_solicitud($request){
		$id_tipo_bien=EQUIPO;
		$params= array();
		$query="SELECT
					e.id_equipo                                             as id_bien,
					e.cod_patrimonial										as cod_patrimonial,
					ot.id_orden_trabajo										as id_orden_trabajo,
					{$id_tipo_bien}                                         as id_tipo_bien,
					IFNULL(ot.obs_creacion,'-')                             as obs_creacion,
					IFNULL(ot.estado,0)                                     as estado,
					e.descripcion											as descripcion,
					s.nombre                                                as servicio_nombre,
					IFNULL(CONCAT(p1.apellido,' ',p1.nombre),'-')           as p_creacion,
					IFNULL(CONCAT(p2.apellido,' ',p2.nombre),'-')           as p_recepcion,
					IFNULL(ot.leg_recepcion,'-')                            as leg_recepcion,
					IFNULL(date_format(ot.fecha_creacion,'%d/%m/%Y'),'-')   as fecha_creacion,
					IFNULL(ot.obs_creacion,'-')                             as obs_creacion,
					IFNULL(ot.obs_devolucion,'-')                           as obs_devolucion,
					IFNULL(date_format(otd.fecha_ini,'%d/%m/%Y'),'-')       as fecha_inicio,
					IFNULL(date_format(otd.fecha_fin,'%d/%m/%Y'),'-')       as fecha_fin,
					IFNULL(ent.nombre,'-')                                  as entidad_destino,
					IFNULL(ent.id_entidad,'-')                              as id_entidad_destino,
					otd.hs_insumidas         			                    as hs_insumidas,
					IFNULL(otd.conformidad,'-')                             as conformidad,
					IFNULL(otd.prioridad,'')                                as prioridad
				FROM  equipo e
				LEFT JOIN
					orden_trabajo ot
					ON e.id_equipo=ot.id_bien AND ot.id_tipo_bien={$id_tipo_bien} and ot.estado IN (1,2)
				LEFT JOIN
					orden_trabajo_detalle otd
					USING (id_orden_trabajo)
				LEFT JOIN
					servicio s
					ON e.id_servicio=s.id_servicio
				LEFT JOIN
					entidad ent
					ON ent.id_entidad=ot.entidad_destino
				LEFT JOIN
					personal p1
					ON ot.leg_creacion=p1.legajo
				LEFT JOIN
					personal p2
					ON ot.leg_recepcion=p2.legajo
				WHERE e.estado=1";

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
		$query.=" ORDER BY s.id_servicio DESC;";

		return $this->execute_simple_query("select",$query,$params);
	}

	public function get_prestaciones_solicitud($request){
		$id_tipo_bien=PRESTACION;
		$params= array();
		$query="SELECT
					p.id_prestacion                                         as id_bien,
					ot.id_orden_trabajo										as id_orden_trabajo,
					{$id_tipo_bien}                                         as id_tipo_bien,
					IFNULL(ot.obs_creacion,'-')                             as obs_creacion,
					IFNULL(ot.estado,0)                                     as estado,
					p.descripcion											as descripcion,
					p.observacion											as observacion,
					s.nombre                                                as servicio_nombre,
					IFNULL(CONCAT(p1.apellido,' ',p1.nombre),'-')           as p_creacion,
					IFNULL(CONCAT(p2.apellido,' ',p2.nombre),'-')           as p_recepcion,
					IFNULL(ot.leg_recepcion,'-')                            as leg_recepcion,
					IFNULL(date_format(ot.fecha_creacion,'%d/%m/%Y'),'-')   as fecha_creacion,
					IFNULL(ot.obs_creacion,'-')                             as obs_creacion,
					IFNULL(ot.obs_devolucion,'-')                           as obs_devolucion,
					IFNULL(date_format(otd.fecha_ini,'%d/%m/%Y'),'-')       as fecha_inicio,
					IFNULL(date_format(otd.fecha_fin,'%d/%m/%Y'),'-')       as fecha_fin,
					IFNULL(ent.nombre,'-')                                  as entidad_destino,
					IFNULL(ent.id_entidad,'-')                              as id_entidad_destino,
					otd.hs_insumidas			                            as hs_insumidas,
					IFNULL(otd.conformidad,'-')                             as conformidad,
					IFNULL(otd.prioridad,'')                                as prioridad
				FROM  prestacion p
				LEFT JOIN
					orden_trabajo ot
					ON p.id_prestacion=ot.id_bien AND ot.id_tipo_bien={$id_tipo_bien} and ot.estado IN (1,2)
				LEFT JOIN
					orden_trabajo_detalle otd
					USING (id_orden_trabajo)
				LEFT JOIN
					servicio s
					ON p.id_servicio=s.id_servicio
				LEFT JOIN
					entidad ent
					ON ent.id_entidad=ot.entidad_destino
				LEFT JOIN
					personal p1
					ON ot.leg_creacion=p1.legajo
				LEFT JOIN
					personal p2
					ON ot.leg_recepcion=p2.legajo
				WHERE p.estado=1";

		if(isset($request->id_bien)){
			$query.=' AND p.id_prestacion=?';
			array_push($params,$request->id_bien);
		}
		if(isset($request->id_servicio)){
			$query.=' AND p.id_servicio=?';
			array_push($params,$request->id_servicio);
		}
		$query.=" ORDER BY s.id_servicio DESC;";

		return $this->execute_simple_query("select",$query,$params);
	}


	/**
	 * Obtiene las ordenes de trabajo con sus detalles
	 * @param  filtros de la consulta  $request array(
	 *                                     id_bien = id del equipo/prestación
	 *                                     cod_patrimonial= cod del equipo
	 *                                     id_servicio = id del Servicio
	 *                                     leg_recepcion= legajo del tecnico que toma la orden de trabajo
	 *                                     estado= el id_estado de la orden del trabajo
	 *                                     fecha_ini = fecha de creacion desde donde se solicitan las ordenes de trabajo
	 *                                     fecha_fin= fecha de creación hasta donde se solicitan las ordenes de trabajo
	 *                             )
	 * @return {[type]
	 */
	public function get_ordenes($request){
		$params = array();
		array_push($params,$request->id_tipo_bien);

		$whr="";
		if($request->id_tipo_bien==EQUIPO){

			if(isset($request->id_bien)){
				$whr.=' AND bien.id_equipo=?';
				array_push($params,$request->id_bien);
			}
			if(isset($request->cod_patrimonial)){
				$whr.=' AND bien.cod_patrimonial=?';
				array_push($params,$request->cod_patrimonial);
			}

			$leftJoin=" equipo bien ON bien.id_equipo=ot.id_bien ";
		}
		else{
			if(isset($request->id_bien)){
				$whr.=' AND bien.id_prestacion=?';
				array_push($params,$request->id_bien);
			}

			$leftJoin=" prestacion bien ON bien.id_prestacion=ot.id_bien ";
		}

		if(isset($request->id_servicio)){
			$whr.=' AND bien.id_servicio=?';
			array_push($params,$request->id_servicio);
		}
		if(isset($request->estado)){
			$estados = implode(',', $request->estado);
			$whr.=" AND ot.estado IN ({$estados})";
		}
		if(isset($request->id_entidad)){
			$whr.=' AND ot.entidad_destino=?';
			array_push($params,$request->id_entidad);
		}
		if(isset($request->leg_recepcion)){
			$whr.=' AND ot.leg_recepcion=?';
			array_push($params,$request->leg_recepcion);
		}
		if(isset($request->fecha_ini)){
			$whr.=" AND ot.fecha_creacion >= str_to_date('{$request->fecha_ini}','%d/%m/%Y')";
		}
		if(isset($request->fecha_fin)){
			$whr.=" AND ot.fecha_creacion <= str_to_date('{$request->fecha_fin}','%d/%m/%Y')";
		}

		$query="SELECT
					ot.id_orden_trabajo                           as id_orden_trabajo,
					ot.id_tipo_bien                               as id_tipo_bien,
					ot.id_bien                                    as id_bien,
					bien.descripcion                              as descripcion,
					s.nombre                                      as servicio_nombre,
					CONCAT(p1.apellido,' ',p1.nombre)             as p_creacion,
					IFNULL(CONCAT(p2.apellido,' ',p2.nombre),'-') as p_recepcion,
					ot.leg_recepcion                              as leg_recepcion,
					date_format(ot.fecha_creacion,'%d/%m/%Y')     as fecha_creacion,
					ot.obs_creacion                               as obs_creacion,
					IFNULL(ot.obs_devolucion,'')                  as obs_devolucion,
					IFNULL(ot.estado,0)                           as estado,
					date_format(otd.fecha_ini,'%d/%m/%Y')         as fecha_inicio,
					date_format(otd.fecha_fin,'%d/%m/%Y')         as fecha_fin,
					ent.nombre                                    as entidad_destino,
					ent.id_entidad                                as id_entidad_destino,
					otd.hs_insumidas                              as hs_insumidas,
					IFNULL(otd.conformidad,'')                    as conformidad,
					IFNULL(otd.prioridad,'')                      as prioridad
				FROM
					orden_trabajo ot
				LEFT JOIN
					orden_trabajo_detalle otd
					USING (id_orden_trabajo)
				LEFT JOIN
					{$leftJoin}
				LEFT JOIN
					servicio s
					USING (id_servicio)
				LEFT JOIN
					entidad ent
					ON ent.id_entidad=ot.entidad_destino
				LEFT JOIN
					personal p1
					ON ot.leg_creacion=p1.legajo
				LEFT JOIN
					personal p2
					ON ot.leg_recepcion=p2.legajo
				WHERE ot.id_tipo_bien= ?
				{$whr}
				ORDER BY
					ot.estado asc,ot.fecha_creacion desc";

		return $this->execute_simple_query("select",$query,$params);
	}

	public function add_orden($request){
		$params=array();

		$query='INSERT INTO orden_trabajo(id_tipo_bien,id_bien,fecha_creacion,tipo_entidad,entidad_destino,
									obs_creacion,leg_creacion,estado)
				VALUES(?,?,NOW(),?,?,?,?,'.ESTADO_ALTA.')';

		array_push($params,$request->id_tipo_bien);
		array_push($params,$request->id_bien);
		if (isset($request->tipo_entidad)){//Si no esta definida el tipo entidad se pone interna
			array_push($params,$request->tipo_entidad);
		}
		else{
			array_push($params,ENTIDAD_INTERNA);
		}
		array_push($params,$request->entidad_destino);
		array_push($params,$request->obs_creacion);
		array_push($params,$request->leg_creacion);

		return $this->execute_simple_query("insert",$query,$params);
	}


	/**
	 * Obtiene los datos de la orden de trabajo
	 * @param  $request => id_orden_trabajo
	 */
	public function get_orden_trabajo($request){
		$params= array();
		$query='SELECT
					ot.id_orden_trabajo,
					ot.obs_creacion,
					date_format(ot.fecha_creacion,"%d/%m/%Y") as fecha_creacion,
					ot.leg_creacion,
					ot.leg_recepcion
				FROM orden_trabajo ot
				WHERE
					id_orden_trabajo=?';

		array_push($params,$request->id_orden_trabajo);
		return $this->execute_simple_query("select",$query,$params);
	}

	/**
	 * Modifica la conformidad de una orden de trabajo
	 * @param $request array(
	 *                     id_orden_trabajo: id de la orden de trabajo
	 *                     conformidad: int con la conformidad del trabajo
	 *                     )
	 */
	public function dar_conformidad($request){
		$params=array();
		$query='UPDATE
					orden_trabajo_detalle
				JOIN
					orden_trabajo USING(id_orden_trabajo)
				SET
					conformidad=?, estado=4
				WHERE
					id_orden_trabajo=?';

		array_push($params,$request->conformidad);
		array_push($params,$request->id_orden_trabajo);
		return $this->execute_simple_query("update",$query,$params);

	}

	/**
	 * Asigna a la orden de trabajo a una nueva entidad
	 * @param $request array(
	 *                     id_orden_trabajo : id de la orden de trabajo
	 *                     entidad_destino  : id de la entidad a la que se deriva la orden de trabajo
	 *                     )
	 */
	public function derivar_orden($request) {
		$params=array();
		$query="UPDATE
					orden_trabajo
				SET
					entidad_destino=?
				WHERE
					id_orden_trabajo=?
				";

		array_push($params,$request->entidad_destino);
		array_push($params,$request->id_orden_trabajo);

		return $this->execute_simple_query("update",$query,$params);
	}

	/**
	 * Asigna a la orden de trabajo a una persona para que la realice
	 * @param $request array(
	 *                     id_orden_trabajo : id de la orden de trabajo
	 *                     leg_recepcion    : legajo de un técnico que va a tomar la orden de trabajo
	 *                     )
	 */
	public function asignar_orden($request) {
		$params=array();
		$queries=array();
		$array_params= array();
		$metodo=array();

		$queries[count($queries)]="INSERT IGNORE INTO
									orden_trabajo_detalle(id_orden_trabajo,fecha_ini,hs_insumidas)
								VALUES (?,NOW(),0)
						";

		array_push($params,$request->id_orden_trabajo);
		array_push($array_params,$params);
		array_push($metodo, "insert");

		$queries[count($queries)]="UPDATE
					orden_trabajo
				SET
					leg_recepcion=?,
					estado=2
				WHERE
					id_orden_trabajo=?
		";

		$params=array();
		array_push($params,$request->leg_recepcion);
		array_push($params,$request->id_orden_trabajo);

		array_push($array_params,$params);
		array_push($metodo, "update");
		// var_dump($request->all());
		// die();
		return $this->execute_multiple_query($metodo,$queries,$array_params,true);
	}


	public function actualizar_orden($request){
		$set="";
		$params=array();
		
		array_push($params, $request->prioridad);

		if (isset($request->obs_devolucion)){
			$set.=", ot.obs_devolucion=? ";
			array_push($params,$request->obs_devolucion);
		}
		if (isset($request->hs_insumidas)){
			$set.=', otd.hs_insumidas = otd.hs_insumidas + ? ';
			array_push($params,$this->formatTime($request->hs_insumidas));
		}
		if (isset($request->estado)){
			$set.=', ot.estado = ? ';
			array_push($params,$request->estado);
		}

		array_push($params, $request->id_orden_trabajo);

		$query="UPDATE 
					orden_trabajo ot
				 LEFT JOIN
				 	orden_trabajo_detalle  otd USING(id_orden_trabajo)
				 SET 
				 	otd.prioridad=?
				 	".$set."
				  WHERE
				  	ot.id_orden_trabajo=?";

		return $this->execute_simple_query("update",$query,$params);
	}

	//Paso de horas:minutos a float
	private function formatTime($tiempo){
		$hsInsumidas=explode(':',$tiempo);
		$horas = (int) $hsInsumidas[0];
		$minutos=0;
		// $minutos= (isset($hsInsumidas[1])) ?  (float) round($hsInsumidas[1] / 60, 2) : 0;
		if (isset($hsInsumidas[1])){
			$min_str= $hsInsumidas[1];
			$minutos= (strlen($min_str)==1) ? (float)	($min_str."0") / 60 : (float) $min_str /60;
			// $minutos= (isset($hsInsumidas[1])) ?  (float) $hsInsumidas[1] / 60 : 0;

		}
		return  $horas + $minutos;

	}

	/**
	*Actualiza el estado de una orden de trabajo
	*@param estado el estado a actualizar
	*@param id_orden_trabajo
	*/
	public function actualizar_estado($request){
		$params=array();
		$query="UPDATE
					orden_trabajo
				SET
					estado=?
				WHERE
					id_orden_trabajo=? ";

		array_push($params,$request->estado);
		array_push($params,$request->id_orden_trabajo);

		return $this->execute_simple_query("update",$query,$params);
	}

	public function rechazar_orden($request){
		$params=array();
		$query="UPDATE
					orden_trabajo
				SET
					estado=?,
					obs_devolucion=?
				WHERE
					id_orden_trabajo=? ";

		array_push($params,ESTADO_ORDEN_RECHAZADA);
		array_push($params,$request->obs_devolucion);
		array_push($params,$request->id_orden_trabajo);

		return $this->execute_simple_query("update",$query,$params);
	}

}
