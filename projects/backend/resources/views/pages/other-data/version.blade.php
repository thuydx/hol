@extends('layouts.app')

@section('title', __('other.version'))

@section('content')
    <div class="main-content">
        <div class="top-page">
            <!-- this is content -->
            <h3>{{ __('other.version') }}</h3>
            <p>{{ $version }}</p>
        </div>
    </div>
@stop
