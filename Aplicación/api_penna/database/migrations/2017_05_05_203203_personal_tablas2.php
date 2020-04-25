<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PersonalTablas2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            Schema::create('tecnico', function (Blueprint $table) {
                $table->engine = 'InnoDB';
                $table->integer('legajo')->unsigned();
                $table->integer('id_entidad')->unsigned();
                $table->primary(array('legajo', 'id_entidad'));
            });

            Schema::create('puesto', function (Blueprint $table) {
                $table->engine = 'InnoDB';
                $table->smallIncrements('id_puesto')->unsigned();
                $table->string('nombre', 45);
                $table->primary('id_puesto');
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('puesto');
        Schema::dropIfExists('tecnico');
    }
}
