@extends('layouts.app')
@section('styles')
    <link href="https://cdn.jsdelivr.net/npm/jquery.json-viewer@1.4.0/json-viewer/jquery.json-viewer.css" rel="stylesheet">
@endsection
@section('scripts')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery.json-viewer@1.4.0/json-viewer/jquery.json-viewer.js"></script>
    <script>
        $(function() {
            let jsonData = @json(json_decode($dataFile));
            if (jsonData) {
                $('#jsonTree').jsonViewer(jsonData, {collapsed: true, withQuotes: true});
            }
        })
    </script>
@endsection
@section('content')

    <div class="row">
        <div class="col-sm-6">
            <div id="jsonTree"></div>
        </div>
    </div>
@endsection

