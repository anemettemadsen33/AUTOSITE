<?php

namespace App\OpenApi;

/**
 * @OA\Info(
 *     title="AutoMarket API",
 *     version="1.0.0",
 *     description="API for AutoMarket platform"
 * )
 *
 * @OA\Server(
 *     url="/",
 *     description="Base server (prefix /api in paths)"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="sanctum",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */
class OpenApiSpec {}
