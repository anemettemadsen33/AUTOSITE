<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Auth\Access\Response;

class VehiclePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        // Anyone can view vehicles (public endpoint)
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(?User $user, Vehicle $vehicle): bool
    {
        // Anyone can view a single vehicle
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Must have create-vehicles permission (dealers and admins)
        return $user->can('create-vehicles');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Vehicle $vehicle): bool
    {
        // Admin can update any vehicle
        if ($user->hasRole('admin')) {
            return true;
        }
        
        // Dealer can only update their own vehicles
        return $user->can('edit-vehicles') && $user->id === $vehicle->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Vehicle $vehicle): bool
    {
        // Admin can delete any vehicle
        if ($user->hasRole('admin')) {
            return true;
        }
        
        // Dealer can only delete their own vehicles
        return $user->can('delete-vehicles') && $user->id === $vehicle->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Vehicle $vehicle): bool
    {
        // Only admin can restore
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Vehicle $vehicle): bool
    {
        // Only admin can force delete
        return $user->hasRole('admin');
    }
}
