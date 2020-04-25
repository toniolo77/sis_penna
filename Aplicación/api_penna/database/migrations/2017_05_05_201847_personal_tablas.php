<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PersonalTablas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personal', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->integer('legajo')->unsigned();
            $table->string('usuario', 20);
            $table->string('nombre',30);
            $table->string('apellido',30);
            $table->integer('dni')->unsigned();
            $table->smallInteger('id_puesto')->unsigned();
            $table->smallInteger('id_servicio')->unsigned();
            $table->date('fecha_ingreso');
            $table->tinyInteger('estado')->unsigned();
            $table->primary('legajo');
        });

        Schema::create('servicio', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->smallIncrements('id_servicio')->unsigned();
            $table->string('nombre', 45);
            $table->primary('id_servicio');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('personal');
        Schema::dropIfExists('servicio');

    }
}
