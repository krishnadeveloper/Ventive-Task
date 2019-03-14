<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCellphones extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cellphones', function (Blueprint $table) {
            
            $table->bigIncrements('id');
            $table->string('brandname');
            $table->string('modal');
            $table->string('platform');
            $table->string('cpu');
            $table->string('simtype');
            $table->string('usb');
            $table->unsignedDecimal('price',8,2);
            $table->tinyInteger('status')
                    ->default('1')
                    ->comment('1-Active, 2-Inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cellphones');
    }
}
