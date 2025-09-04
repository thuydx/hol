<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/index', [IndexController::class, 'index'])->name('index');
Route::post('/upload', [IndexController::class, 'upload'])->name('upload');
Route::get('/update', [IndexController::class, 'update'])->name('update');

Route::get('/locale/{lang}', function ($lang) {
    // Validate locale is supported
    if (in_array($lang, ['en', 'vi', 'vn', 'cn', 'zh_CN'])) {
        Session::put('locale', $lang);
    }

    return Redirect::back();
});
