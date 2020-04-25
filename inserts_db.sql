DROP TABLE entidad;
CREATE TABLE `entidad` (
  `id_entidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `tipo_entidad` tinyint(3) unsigned NOT NULL COMMENT '1-interna(Ingenieria,etc.)\n2-prestador de un servicio\n3-proveedor',
  `estado` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id_entidad`,`tipo_entidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Reprenta las empresas - proveedores(si es externa) y las areas internas que se derivan las solicitudes y ordenes de trabajo';

INSERT into entidad
(nombre,tipo_entidad,estado)
VALUES  ("Electromedicina",1,1),("Ingeniería",1,1),("Informática",1,1);


DROP table servicio;
CREATE TABLE `servicio` (
  `id_servicio` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_servicio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT into servicio
VALUES
 	(DEFAULT,"Quirófano"),
 	(DEFAULT,"Pediatría"),
 	(DEFAULT,"Neonatología"),
 	(DEFAULT,"Pabellón Maternidad"),
 	(DEFAULT,"Oftalmología"),
 	(DEFAULT,"Farmacia");


DROP table personal;
CREATE TABLE `personal` (
  `legajo` int(10) unsigned NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `dni` int(10) unsigned DEFAULT NULL,
  `id_servicio` smallint(5) unsigned NOT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `estado` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`legajo`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO personal
(legajo,usuario,nombre,apellido,dni,id_puesto,id_servicio,fecha_ingreso,estado)
VALUES
		(1000,'mmoron','Matías','Moroón',35276690,1,'2017-08-07',1),
		(1001,'ftoniolo','Franco','Toniolo',36328547,1,'2017-08-07',1),
		(1002,'jperez','Juan','Perez',36328548,1,'2017-08-07',1),
		(1003,'ptroglio','Pedro','Troglio',36328549,1,'2017-08-07',1),
		(1004,'grodriguez','Guido','Rodriguez',36328550,1,'2017-08-07',1),
		(1005,'erasmussen','Esteban','Rasmussen',36328551,1,'2017-08-07',1);

drop table tecnico;
CREATE TABLE `tecnico` (
  `legajo` int(10) unsigned NOT NULL,
  `id_entidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into tecnico
values
	(1000,1),
	(1001,2),
	(1005,3);

drop table equipo;
CREATE TABLE `equipo` (
  `id_equipo` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_tipo_equipo` int(10) unsigned DEFAULT NULL,
  `id_equipo_padre` int(10) unsigned DEFAULT NULL,
  `cod_patrimonial` varchar(32) UNIQUE DEFAULT NULL,
  `id_servicio` smallint(5) unsigned DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `estado` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id_equipo`),
  UNIQUE KEY `equipo_UNIQUE` (`cod_patrimonial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT into equipo
(id_tipo_equipo,id_equipo_padre,cod_patrimonial,id_servicio,descripcion,estado)
VALUES
	(1,NULL,100,1,"Aire Acondicionado",1),
	(1,NULL,101,2,"Aire Acondicionado",1),
	(1,NULL,102,3,"Aire Acondicionado",1),
	(1,NULL,103,4,"Aire Acondicionado",1),
	(1,NULL,104,5,"Aire Acondicionado",1),
	(1,NULL,105,6,"Aire Acondicionado",1),
	(1,NULL,106,1,"Caja contenedora",1),
	(1,7,107,1,"Cámara",1);


drop table orden_trabajo;
CREATE TABLE `orden_trabajo` (
  `id_orden_trabajo` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_tipo_bien` tinyint(3) unsigned DEFAULT NULL,
  `id_bien` int(10) unsigned DEFAULT NULL,
  `leg_creacion` int(10) unsigned DEFAULT NULL,
  `leg_recepcion` int(10) unsigned DEFAULT NULL,
  `leg_actualizacion` int(10) unsigned DEFAULT NULL COMMENT 'Legajo del que realizó una modif. a la orden de trabajo',
  `fecha_creacion` date DEFAULT NULL,
  `ts_actualizacion` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tipo_entidad` tinyint(3) unsigned DEFAULT NULL,
  `entidad_destino` tinyint(3) unsigned DEFAULT NULL,
  `obs_creacion` varchar(100) DEFAULT NULL,
  `obs_devolucion` varchar(100) DEFAULT NULL,
  `estado` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id_orden_trabajo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into orden_trabajo
	(id_tipo_bien,id_bien,leg_creacion,leg_recepcion,leg_actualizacion,fecha_creacion,tipo_entidad,entidad_destino,obs_creacion,obs_devolucion,estado)
values
	(1,1,1004,NULL,NULL,'2017-08-05',1,2,"Una obs creación",NULL,1),
	(1,1,1004,1000,NULL,'2017-08-05',1,2,"Una obs creación2",NULL,5),
	(1,1,1004,1000,NULL,'2017-08-04',1,2,"Una obs creación3","Cancelada por falta de insumos",6),
	(1,8,1003,NULL,NULL,'2017-08-05',1,1,"Una obs creación4",NULL,1);



create table perfil (
	id_perfil smallint unsigned auto_increment,
	nombre varchar(45),
	PRIMARY KEY(id_perfil)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO perfil(id_perfil,nombre) VALUES(1,'Administrador'),(2,'Tecnico Admin'),(3,'Tecnico'),(4,'Basico');

create table permiso_perfil (
	id_perfil smallint unsigned ,
	legajo int unsigned,
	id_opcion smallint unsigned,
	id_menu smallint unsigned
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO permiso_perfil(id_perfil,legajo,id_opcion,id_menu) VALUES(1,0,0,1),(1,0,1,1),(1,0,2,1),(1,0,0,2),(1,0,1,2),(1,0,2,2),(1,0,3,2),(1,0,4,2),(1,0,0,3),(1,0,1,3),(1,0,2,3),(1,0,0,4),(1,0,1,4);

create table users(
	id int  unsigned  AUTO_INCREMENT,
	usuario varchar(20) NOT NULL,
	id_perfil smallint unsigned NOT NULL,
	password varchar(255) NOT NULL,
	remember_token varchar(100),
	created_at datetime,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO users(usuario,id_perfil,password) VALUES ('ftoniolo',1,'$2y$10$XjC7ffr62iNe56ixqd0UZuBm9gEmdwfPMp5t2eF0SyKDFWe6CQ/Ee');

ALTER TABLE personal drop column id_puesto;

create table prestacion(
  `id_prestacion` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) DEFAULT NULL,
  `id_servicio` int(10) unsigned DEFAULT NULL,
  `observacion` varchar(45) DEFAULT NULL,
  `estado` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id_prestacion`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

