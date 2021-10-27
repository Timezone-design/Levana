<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booking', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('escort_id');
            $table->string('hotel');
            $table->string('room');
            $table->string('email');
            $table->text('special');
            $table->string('name');
            $table->string('type');
            $table->string('time');
            $table->string('duration');
            $table->string('price');
            $table->string('status')->default(0);
            $table->boolean('client_read')->default(true);
            $table->boolean('escort_read')->default(false);
            $table->timestamps();

            // $table->foreign('client_id')->references('id')->on('users')->onDelete('cascade');
            // $table->foreign('escort_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('booking');
    }
}
