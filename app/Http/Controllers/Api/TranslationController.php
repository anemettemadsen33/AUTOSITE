<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TranslationController extends Controller
{
    /**
     * Get supported languages
     */
    public function languages(): JsonResponse
    {
        return response()->json([
            'languages' => [
                'en' => ['name' => 'English', 'native' => 'English'],
                'de' => ['name' => 'German', 'native' => 'Deutsch'],
                'fr' => ['name' => 'French', 'native' => 'Français'],
                'es' => ['name' => 'Spanish', 'native' => 'Español'],
                'it' => ['name' => 'Italian', 'native' => 'Italiano'],
                'pt' => ['name' => 'Portuguese', 'native' => 'Português'],
                'ro' => ['name' => 'Romanian', 'native' => 'Română'],
                'pl' => ['name' => 'Polish', 'native' => 'Polski'],
            ],
            'default' => 'en',
        ]);
    }

    /**
     * Get UI translations for a specific language
     */
    public function getTranslations(Request $request, string $locale): JsonResponse
    {
        $supportedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'ro', 'pl'];

        if (!in_array($locale, $supportedLocales)) {
            return response()->json([
                'message' => 'Unsupported language',
            ], 400);
        }

        // Load translations from language files
        $translationFile = resource_path("lang/{$locale}/messages.php");

        if (file_exists($translationFile)) {
            $translations = include $translationFile;
        } else {
            // Fallback to English
            $translations = include resource_path('lang/en/messages.php');
        }

        return response()->json([
            'locale' => $locale,
            'translations' => $translations ?? [],
        ]);
    }
}
