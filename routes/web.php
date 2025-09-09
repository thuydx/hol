<?php

use App\Http\Controllers\ConfigController;
use App\Http\Controllers\FamilyArmyController;
use App\Http\Controllers\FamilyAssetController;
use App\Http\Controllers\FamilyCommerceController;
use App\Http\Controllers\FamilyMembersController;
use App\Http\Controllers\FamilyRelationshipController;
use App\Http\Controllers\KingController;
use App\Http\Controllers\OtherDataController;
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

Route::group(['prefix' => 'family'], function () {
    Route::get('/', [FamilyMembersController::class, 'info'])->name('family.info');
    Route::get('/members', [FamilyMembersController::class, 'members'])->name('family.members');
    Route::get('/other-members', [FamilyMembersController::class, 'otherMembers'])->name('family.other-members');
    Route::get('/guests', [FamilyMembersController::class, 'guests'])->name('family.guests');
    Route::get('/death', [FamilyMembersController::class, 'death'])->name('family.death');
});
Route::group(['prefix' => 'commerce'], function () {
    Route::get('/currency', [FamilyCommerceController::class, 'currency'])->name('commerce.currency');
    Route::get('/food', [FamilyCommerceController::class, 'food'])->name('commerce.food');
});
Route::group(['prefix' => 'army'], function () {
    Route::get('/barracks', [FamilyArmyController::class, 'barracks'])->name('army.barracks');
    Route::get('/prisoner', [FamilyArmyController::class, 'prisoner'])->name('army.prisoner');
    Route::get('/horse', [FamilyArmyController::class, 'horse'])->name('army.horse');
});
Route::group(['prefix' => 'relationship'], function () {
    Route::get('/king', [FamilyRelationshipController::class, 'king'])->name('relationship.king');
    Route::get('/family', [FamilyRelationshipController::class, 'family'])->name('relationship.family');
});
Route::group(['prefix' => 'asset'], function () {
    Route::get('/trade-shop', [FamilyAssetController::class, 'tradeShop'])->name('asset.trade-shop');
    Route::get('/farm', [FamilyAssetController::class, 'farm'])->name('asset.farm');
    Route::get('/palace', [FamilyAssetController::class, 'palace'])->name('asset.palace');
});

Route::group(['prefix' => 'king'], function () {
    Route::get('/', [KingController::class, 'info'])->name('king.info');
    Route::get('/members', [KingController::class, 'members'])->name('king.members');
    Route::get('/other-members', [KingController::class, 'otherMembers'])->name('king.other-members');
    Route::get('/capital', [KingController::class, 'capital'])->name('king.capital');
});
Route::group(['prefix' => 'other-data'], function () {
    Route::get('/doctor', [OtherDataController::class, 'doctor'])->name('other-data.doctor');
    Route::get('/hanmen', [OtherDataController::class, 'hanmen'])->name('other-data.hanmen');
    Route::get('/quinglou', [OtherDataController::class, 'quinglou'])->name('other-data.quinglou');
    Route::get('/version', [OtherDataController::class, 'version'])->name('other-data.version');
});
