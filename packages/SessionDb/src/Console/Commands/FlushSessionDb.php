<?php

declare(strict_types=1);

namespace ThuyDX\SessionDb\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use ThuyDX\SessionDb\SessionDatabase;

class FlushSessionDb extends Command
{
    protected $signature = 'sessiondb:flush {--uuid=} {--all} {--force}';

    protected $description = 'Flush guest session database(s) stored by ThuyDX/SessionDb';

    public function handle(): int
    {
        $uuid = $this->option('uuid');
        $all = $this->option('all');
        $force = $this->option('force');

        if ($uuid && $all) {
            $this->error('You cannot use --uuid and --all together.');

            return self::FAILURE;
        }

        $driver = config('sessiondb.driver', 'json');
        $basePath = config('sessiondb.path', '');
        $disk = Storage::disk('public');

        // 📋 Show available UUIDs
        $targets = $this->listDatabases($driver, $disk, $basePath);

        if ($uuid) {
            if (! in_array($uuid, $targets, true)) {
                $this->warn("UUID {$uuid} not found.");

                return self::FAILURE;
            }

            if (! $force && ! $this->confirm("Do you really want to flush guest DB for UUID: {$uuid}?")) {
                $this->info('Aborted.');

                return self::SUCCESS;
            }

            $this->flushSingle($uuid, $driver, $disk, $basePath);

            return self::SUCCESS;
        }

        if ($all) {
            if (empty($targets)) {
                $this->warn('No guest session databases found to flush.');

                return self::SUCCESS;
            }

            $this->table(['UUID'], array_map(fn ($id) => [$id], $targets));

            if (! $force && ! $this->confirm('Do you really want to flush ALL listed guest DBs?')) {
                $this->info('Aborted.');

                return self::SUCCESS;
            }

            $this->flushAll($driver, $disk, $basePath);

            return self::SUCCESS;
        }

        $this->warn('Nothing done. Use --uuid=<uuid> or --all.');

        return self::INVALID;
    }

    /**
     * List existing databases.
     */
    protected function listDatabases(string $driver, $disk, string $basePath): array
    {
        if ($driver === 'json') {
            $prefix = $basePath ? rtrim($basePath, '/') : '';
            $directories = $prefix ? $disk->directories($prefix) : $disk->directories();

            $uuids = array_map('basename', $directories);

            if (empty($uuids)) {
                $this->warn('No guest session databases found.');
            } else {
                $this->info('Existing guest UUIDs:');
                foreach ($uuids as $id) {
                    $this->line("- {$id}");
                }
            }

            return $uuids;
        }

        // memory driver
        $ref = new \ReflectionClass(SessionDatabase::class);
        $prop = $ref->getProperty('memoryStore');
        //        $prop->setAccessible(true);
        $store = $prop->getValue();

        $uuids = array_keys($store ?: []);
        if (empty($uuids)) {
            $this->warn('No in-memory guest databases found.');
        } else {
            $this->info('In-memory guest UUIDs: '.implode(', ', $uuids));
        }

        return $uuids;
    }

    protected function flushSingle(string $uuid, string $driver, $disk, string $basePath): void
    {
        if ($driver === 'memory') {
            $ref = new \ReflectionClass(SessionDatabase::class);
            $prop = $ref->getProperty('memoryStore');
            //            $prop->setAccessible(true);
            $store = $prop->getValue();
            unset($store[$uuid]);
            $prop->setValue(null, $store);
        } else {
            $prefix = $basePath ? rtrim($basePath, '/').'/' : '';
            $disk->deleteDirectory("{$prefix}{$uuid}");
        }

        $this->info("✅ Flushed session database for guest: {$uuid}");
    }

    protected function flushAll(string $driver, $disk, string $basePath): void
    {
        if ($driver === 'memory') {
            $ref = new \ReflectionClass(SessionDatabase::class);
            $prop = $ref->getProperty('memoryStore');
            //            $prop->setAccessible(true);
            $prop->setValue(null, []); // clear all
        } else {
            $prefix = $basePath ? rtrim($basePath, '/') : '';
            if ($prefix) {
                $disk->deleteDirectory($prefix);
            } else {
                foreach ($disk->directories() as $dir) {
                    $disk->deleteDirectory($dir);
                }
            }
        }

        $this->info('✅ Flushed ALL guest session databases.');
    }
}
