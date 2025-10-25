<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\LeasingApplication;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LeasingApplicationController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $applications = LeasingApplication::with(['vehicle', 'applicant'])
            ->where('applicant_id', $user->id)
            ->orderBy('created_at', 'desc')->paginate(15);
        return response()->json(['success' => true, 'data' => $applications]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'vehicle_id' => 'required|exists:vehicles,id',
            'applicant_type' => 'required|in:individual,company',
            'down_payment_percentage' => 'required|numeric|min:30|max:80',
            'term_months' => 'required|integer|in:12,24,36,48,60,72,84',
            'apr' => 'required|numeric|min:3.9|max:12.9',
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }
        try {
            $vehicle = Vehicle::findOrFail($request->vehicle_id);
            $application = LeasingApplication::create([
                'vehicle_id' => $vehicle->id,
                'applicant_id' => Auth::id(),
                'vehicle_price' => $vehicle->price,
            ] + $request->all());
            $application->calculateLeasingTerms();
            $application->save();
            return response()->json(['success' => true, 'data' => $application], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
