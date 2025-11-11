@extends('layouts.app')

@section('title', 'App - Top Page')

{{--@section('header')--}}
{{--    @include('partial.header')--}}
{{--@stop--}}
{{--@section('sidebar')--}}
{{--    @include('partial.sidebar')--}}
{{--@stop--}}
@section('style-libraries')
    <link href="css/simplebar.css" rel="stylesheet">
@stop
@section('content')
    <div class="main-content">
        <div class="top-page">
            <!-- this is content -->
            <p>{{ __('messages.under-construction') }}</p>
        </div>
    </div>
@stop
{{--@section('footer')--}}
{{--    @include('partial.footer')--}}
{{--@stop--}}
