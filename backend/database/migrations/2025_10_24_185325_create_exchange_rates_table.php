<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exchange_rates', function (Blueprint $table) {
            $table->id();
            $table->string('base_currency', 3)->default('EUR');
            $table->string('target_currency', 3);
            $table->decimal('rate', 10, 6);
            $table->date('date');
            $table->string('source')->default('ECB'); // European Central Bank
            $table->timestamps();

            $table->index('target_currency');
            $table->index('date');
            $table->unique(['base_currency', 'target_currency', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exchange_rates');
    }
};
