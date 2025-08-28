<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;
Route::get('/', function () {
    return view('welcome');
});

Route::get('/index', [IndexController::class, 'index'])->name('index');
Route::post('/upload', [IndexController::class, 'upload'])->name('upload');
Route::get('/update', [IndexController::class, 'update'])->name('update');
