@extends('layouts.app')
@section('content')
    <div class="main-content">
{{--@if(session('success'))--}}
{{--<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">--}}

<div aria-live="polite" aria-atomic="true" class="position-relative">
    <div class="toast-container top-0 end-0 p-3">
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Info</strong>
                <button type="button" class="btn-close" data-coreui-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ $successMessage }}
            </div>
        </div>
    </div>
</div>
{{--@endif--}}
</div>
@endsection
