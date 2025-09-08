<?php

declare(strict_types=1);

namespace ThuyDX\SessionDb\Providers;

use Illuminate\Support\ServiceProvider;
use ThuyDX\SessionDb\Console\Commands\FlushSessionDb;
class SessionDbServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../../config/sessiondb.php', 'sessiondb');

        $this->app->singleton('sessiondb', function ($app) {
            return new SessionDatabase(config('sessiondb.driver', 'json'));
        });
    }

    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                FlushSessionDb::class,
            ]);

            $this->publishes([
                __DIR__ . '/../../config/sessiondb.php' => config_path('sessiondb.php'),
            ], 'sessiondb-config');

            $this->publishes([
                __DIR__.'/../Console/Commands/FlushSessionDb.php' => base_path('app/Console/Commands/FlushSessionDb.php'),
            ], 'sessiondb-commands');
        }
    }
}
