<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use ThuyDX\SessionDb\SessionDatabase;

class ConfigController extends Controller
{
    private const string COOKIE_NAME = 'uuid';

    private const int COOKIE_MINUTES = 43200; // 30 days

    private const string COOKIE_PATH = '/';

    private const bool COOKIE_SECURE = false; // Set false for HTTP, true for HTTPS

    public function config(Request $request): Response
    {
        $uuid = $this->getOrCreateUuid($request);
        $files = Storage::disk('local')->path("uploads/json/$uuid.json");
        if (file_exists($files)) {
            $message = 'File already exists.';
        }

        return response()->view('pages/config', ['message' => $message ?? null])
            ->cookie(self::COOKIE_NAME,
                $uuid,
                self::COOKIE_MINUTES,
                self::COOKIE_PATH,
                $request->getHttpHost(), // domain
                self::COOKIE_SECURE,
                true, // httpOnly
                false, // raw
                'Lax'
            );
    }

    public function upload(Request $request): RedirectResponse
    {
        $uuid = $request->cookie(self::COOKIE_NAME);

        if (! $uuid) {
            return redirect()->route('config')->withErrors([
                self::COOKIE_NAME => 'Missing uuid cookie.',
            ]);
        }

        $safeUuid = $this->sanitizeUuid($uuid);
        // Validate the uploaded file
        $request->validate([
            'json_file' => 'required|file|mimes:json', // Ensure it's a JSON file
        ]);
        $file = $request->file('json_file');
        $file->storeAs('uploads/json', $safeUuid.'.json');

        $db = new SessionDatabase(config('sessiondb.driver', 'json'), $safeUuid);
        $fileContents = file_get_contents($file->getRealPath());
        $payload = json_decode($fileContents, true);
        $db->importFromArray($payload);

        return redirect()->route('update')->with('success', 'File uploaded successfully!');
    }

    public function update(Request $request): Factory|View
    {
        $uuid = $this->getOrCreateUuid($request);
        $files = Storage::disk('local')->path("uploads/json/$uuid.json");

        return view('pages/update', [
            'successMessage' => session('success'),
            'dataFile' => file_get_contents($files),
        ]);
    }

    /**
     * Get an existing uuid cookie or generate a new one.
     */
    private function getOrCreateUuid(Request $request): string
    {
        return $request->cookie(self::COOKIE_NAME) ?: $this->sanitizeUuid(Str::uuid());
    }

    /**
     * Sanitize uuid for safe filename usage.
     */
    private function sanitizeUuid(string $uuid): string
    {
        return preg_replace('/[^A-Za-z0-9\-]/', '', $uuid) ?: 'guest';
    }
}
