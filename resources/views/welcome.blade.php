@extends('layouts.app')

@section('title', 'App - Top Page')

@section('header')
    @include('partial.header')
@stop
@section('sidebar')
    @include('partial.sidebar')
@stop
@section('breadcrumb')
    @include('partial.breadcrumb')
@stop

@section('content')
    <div class="main-content">
        <div class="top-page">
            @yield('breadcrumb')
            <!-- this is content -->
            Site is under construction
        </div>
    </div>
@stop
@section('footer')
    @include('partial.footer')
@stop
