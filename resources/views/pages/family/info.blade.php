@extends('layouts.app')

@section('title', __('family.info.title'))

@section('content')
    <div class="row">
        <div class="col-sm-8">
            <div class="card mb-4">
                <div class="card-header"><strong>{{ __('family.info.title') }}</strong></div>
                <div class="card-body">
                    <table class="table table-striped table-hover">
                        <thead class="">
                        <tr>
                            <th scope="col">key</th>
                            <th scope="col">values</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($familyInfo as $key => $value)
                        <tr>
                            <td>{{ $key }}</td>
                            <td>{{ $value }}</td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="row">
                <div class="col">
                    <div class="card mb-4">
                        <div class="card-header"><strong>{{ __('family.info.family-subname') }}</strong></div>
                        <div class="card-body">
                            <table class="table table-striped table-hover">
                                <thead class="">
                                <tr>
                                    <th scope="col">{{ __('family.info.subname') }}</th>
                                    <th scope="col">{{ __('family.info.level') }}</th>
                                    <th scope="col">{{ __('family.info.position') }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($firstName as $name)
                                    @php
                                        $name = explode('|', $name);
                                    @endphp
                                <tr>
                                    <th scope="row">{{ $name[0] }}</th>
                                    <td>{{ __('family.info.level') }} {{ $name[1] }}</td>
                                    <td>{{ __('family.info.position-num') }} {{ $name[2] + 1 }}</td>
                                </tr>
                                @endforeach

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Force next columns to break to new line at md breakpoint and up -->
                <div class="w-100 d-none d-md-block"></div>

                <div class="col">
                    <div class="card mb-4">
                        <div class="card-header"><strong>{{ __('family.info.master') }}</strong></div>
                        <div class="card-body">
                            <table class="table table-striped table-hover">
                                <thead class="">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Attribute</th>
                                    <th scope="col">level</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">{{ $master[0] }}</th>
                                    <td>{{ $master[1] }}</td>
                                    <td>{{ $master[2] }}</td>
                                    <td>{{ $master[3] }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@stop
