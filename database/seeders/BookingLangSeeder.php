<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AcceptedLangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $langs = [ 'unread','accepted','rejected','cancelled', 'paid' ];
        foreach($langs as $lang) {
            DB::table('booking_lang')->insert([
                'booking_lang' => $lang,
            ]);
        }
    }
}
