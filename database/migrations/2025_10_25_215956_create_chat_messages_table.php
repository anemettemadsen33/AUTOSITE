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
        Schema::create('chat_messages', function (Blueprint $table) {
            $table->id();
            $table->string('session_id');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->text('message');
            $table->string('sender'); // user, bot
            $table->json('metadata')->nullable();
            $table->boolean('is_read')->default(false);
            $table->timestamps();
            
            $table->index('session_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_messages');
    }
};
