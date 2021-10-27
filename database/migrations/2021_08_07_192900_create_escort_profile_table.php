<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEscortProfileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('escort_profile', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->integer('age')->nullable();
            $table->string('ethnicity')->nullable();
            $table->string('dress')->nullable();
            $table->string('height')->nullable();
            $table->string('bust')->nullable();
            $table->string('hair_color')->nullable();
            $table->string('eye_color')->nullable();
            $table->string('public_hair')->nullable();
            $table->text('bio')->nullable();
            $table->text('services')->nullable();
            $table->text('incall_price')->nullable();
            $table->text('outcall_price')->nullable();
            $table->timestamps();
            
            // $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('escort_profile');
    }
}

