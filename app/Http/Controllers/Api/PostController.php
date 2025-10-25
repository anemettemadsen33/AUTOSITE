<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Get paginated list of published posts
     */
    public function index(Request $request): JsonResponse
    {
        $locale = $request->header('Accept-Language', 'en');
        
        $posts = Post::published()
            ->latest()
            ->with('user:id,name')
            ->paginate(12);

        $posts->getCollection()->transform(function ($post) use ($locale) {
            return [
                'id' => $post->id,
                'title' => $post->getTitle($locale),
                'slug' => $post->getSlug($locale),
                'excerpt' => $post->getExcerpt($locale),
                'featured_image' => $post->featured_image,
                'published_at' => $post->published_at,
                'author' => $post->user->name,
                'views' => $post->views,
            ];
        });

        return response()->json($posts);
    }

    /**
     * Get single post by slug
     */
    public function show(Request $request, string $slug): JsonResponse
    {
        $locale = $request->header('Accept-Language', 'en');
        
        // Find post by slug in any language
        $post = Post::published()
            ->with('user:id,name')
            ->get()
            ->first(function ($post) use ($slug) {
                return in_array($slug, $post->slug);
            });

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        // Increment views
        $post->incrementViews();

        return response()->json([
            'id' => $post->id,
            'title' => $post->getTitle($locale),
            'slug' => $post->getSlug($locale),
            'excerpt' => $post->getExcerpt($locale),
            'content' => $post->getContent($locale),
            'featured_image' => $post->featured_image,
            'published_at' => $post->published_at,
            'author' => $post->user->name,
            'views' => $post->views,
            'created_at' => $post->created_at,
            'updated_at' => $post->updated_at,
        ]);
    }
}
