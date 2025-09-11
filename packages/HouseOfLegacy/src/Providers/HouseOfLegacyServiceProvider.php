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
        $this->publishes([
            __DIR__.'/../../lang' => base_path('lang/vendor/house-of-legacy'),
        ], 'house-of-legacy-translations');

        $this->publishes([
            __DIR__.'/../../config/house-of-legacy.php' => config_path('house-of-legacy.php'),
        ], 'house-of-legacy-config');
    }
}
