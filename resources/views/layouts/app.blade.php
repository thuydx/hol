<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel CoreUI</title>
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body>
<div class="wrapper">
    @include('layouts.sidebar') {{-- Example: Include a sidebar partial --}}
    <div class="content">
        @include('layouts.header') {{-- Example: Include a header partial --}}
        <main class="c-main">
            <div class="container-fluid">
                @yield('content') {{-- Content will be injected here --}}
            </div>
        </main>
    </div>
</div>
</body>
</html>
