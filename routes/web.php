<?php

use App\Http\Controllers\ConfigController;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/config', [ConfigController::class, 'config'])->name('config');
Route::post('/upload', [ConfigController::class, 'upload'])->name('upload');
Route::get('/update', [ConfigController::class, 'update'])->name('update');

Route::get('/locale/{lang}', function ($lang) {
    // Validate locale is supported
    if (in_array($lang, ['en', 'vi', 'vn', 'cn', 'zh_CN'])) {
        Session::put('locale', $lang);
    }

    return Redirect::back();
});
