<?php

use App\Http\Controllers\ArmyController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\CommerceController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\FamilyMembersController;
use App\Http\Controllers\KingController;
use App\Http\Controllers\OtherDataController;
use App\Http\Controllers\RelationshipController;
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
    Route::get('/', [FamilyMembersController::class, 'Info'])->name('family.info');
    Route::get('/members', [FamilyMembersController::class, 'Members'])->name('family.members');
    Route::get('/other-members', [FamilyMembersController::class, 'OtherMembers'])->name('family.other-members');
    Route::get('/guests', [FamilyMembersController::class, 'Guests'])->name('family.guests');
    Route::get('/death', [FamilyMembersController::class, 'Death'])->name('family.death');
});
Route::group(['prefix' => 'commerce'], function () {
    Route::get('/currency',[CommerceController::class, 'Currency'])->name('commerce.currency');
    Route::get('/food',[CommerceController::class, 'Food'])->name('commerce.food');
});
Route::group(['prefix' => 'army'], function () {
    Route::get('/barracks',[ArmyController::class, 'Barracks'])->name('army.barracks');
    Route::get('/prisoner',[ArmyController::class, 'Prisoner'])->name('army.prisoner');
    Route::get('/horse',[ArmyController::class, 'Horse'])->name('army.horse');
});
Route::group(['prefix' => 'relationship'], function () {
    Route::get('/king',[RelationshipController::class, 'King'])->name('relationship.king');
    Route::get('/family',[RelationshipController::class, 'Family'])->name('relationship.family');
});
Route::group(['prefix' => 'asset'], function () {
    Route::get('/trade-shop',[AssetController::class, 'TradeShop'])->name('asset.trade-shop');
    Route::get('/farm',[AssetController::class, 'Farm'])->name('asset.farm');
    Route::get('/palace',[AssetController::class, 'Palace'])->name('asset.palace');
});

Route::group(['prefix' => 'king'], function () {
    Route::get('/',[KingController::class, 'Info'])->name('king.info');
    Route::get('/members',[KingController::class, 'Members'])->name('king.members');
    Route::get('/other-members',[KingController::class, 'otherMembers'])->name('king.other-members');
    Route::get('/capital',[KingController::class, 'Capital'])->name('king.capital');
});
Route::group(['prefix' => 'other-data'], function () {
    Route::get('/doctor',[OtherDataController::class, 'Doctor'])->name('other-data.doctor');
    Route::get('/hanmen',[OtherDataController::class, 'Hanmen'])->name('other-data.hanmen');
    Route::get('/quinglou',[OtherDataController::class, 'quinglou'])->name('other-data.quinglou');
    Route::get('/version',[OtherDataController::class, 'Version'])->name('other-data.version');
});
