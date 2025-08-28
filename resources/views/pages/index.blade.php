@extends('layouts.app')

@section('title', 'Upload JSON File')

@section('content')
    <div class="main-content">
        <h1>Upload JSON File</h1>
        <form action="{{ route('upload') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div>
                <label for="json_file">Choose JSON File:</label>
                <input type="file" name="json_file" id="json_file" required>
            </div>
            <button type="submit">Upload</button>
        </form>

        @if (isset($uploadedData))
{{--            <h2>Uploaded Data:</h2>--}}
{{--            <pre>{{ json_encode($uploadedData, JSON_PRETTY_PRINT) }}</pre>--}}

        @endif
    </div>
@stop
