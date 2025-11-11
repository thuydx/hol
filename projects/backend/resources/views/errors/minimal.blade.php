@extends('errors::layout')
@section('title', __('Error'))
@section('content')
    <row class="justify-content-md-center">
        <div class="col-fluid col-md-12">
            <div class="card">
                <div class="card-header">
                    <h1 class="text-center">@yield('code')</h1>
                </div>
                <div class="card-body">
                    <h3 class="text-center">@yield('message')</h3>
                </div>
                <div class="card-footer text-center">
                    <a href="{{ url()->previous() }}" class="btn btn-primary">{{ __('app.common.back') }}</a>
                    <a href="{{ url('/') }}" class="btn btn-secondary">{{ __('app.common.home') }}</a>
                </div>
            </div>
        </div>
    </row>
@endsection
