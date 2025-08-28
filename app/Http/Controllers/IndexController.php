<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(Request $request)
    {
        return view('pages/index');
    }

    public function upload(Request $request)
    {
        // Validate the uploaded file
        $request->validate([
            'json_file' => 'required|file|mimes:json|max:2048', // Ensure it's a JSON file
        ]);
        $file = $request->file('json_file');
        $fileName = $file->getClientOriginalName();
        // Store the uploaded file
        $path = $file->storeAs('uploads/json', $fileName);

        // Full path to the stored file
        $fullPath = storage_path('app/private/' . $path);
        // Read and decode the JSON file
        $jsonData = json_decode(file_get_contents($fullPath), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return back()->withErrors(['json_file' => 'Invalid JSON file.']);
        }

        return redirect()->route('update')->with('success', 'File uploaded successfully!');
    }

    public function update(Request $request)
    {
        $successMessage = session('success'); // Retrieve the success message from the session

        return view('pages/update', [
            'successMessage' => $successMessage,
        ]);
    }
}
