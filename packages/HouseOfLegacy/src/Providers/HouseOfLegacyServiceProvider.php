<?php

declare(strict_types=1);

namespace ThuyDX\HouseOfLegacy\Providers;

use Illuminate\Support\ServiceProvider;
use ThuyDX\HouseOfLegacy\HouseOfLegacy;

class HouseOfLegacyServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__.'/../../config/house-of-legacy.php',
            'house-of-legacy'
        );

        $this->app->singleton('house-of-legacy', function ($app) {
            return new HouseOfLegacy;
        });
    }

    public function boot(): void
    {
        // Load translations from all language folders
        $this->loadTranslationsFrom(__DIR__.'/../../lang', 'hol');

        // Allow publishing of all language files
        $this->publishes([
            __DIR__.'/../../lang' => resource_path('lang/vendor/hol'),
        ], 'hol-translations');

        $this->publishes([
            __DIR__.'/../../config/house-of-legacy.php' => config_path('house-of-legacy.php'),
        ], 'house-of-legacy-config');
    }
}
