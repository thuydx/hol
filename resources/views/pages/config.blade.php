@extends('layouts.app')

@section('title', 'Upload JSON File')

@section('content')
    <div class="row">
        <div class="col-sm-6">
            <h3>Upload JSON File</h3>
            <form id="uploadSaveFileForm" action="{{ route('upload') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="input-group mb-3">
                    <input type="file" name="json_file" class="form-control" id="uploadSaveFile"
                           aria-describedby="uploadSaveFile" aria-label="Upload" required>
                    <button class="btn btn-outline-secondary" type="submit" id="uploadSaveFile" >Upload</button>
                </div>
                @if ($message)
                    <div class="input-group-append">You have uploaded! The new file will overwrite!</div>
                @endif
            </form>
        </div>
    </div>
@stop
