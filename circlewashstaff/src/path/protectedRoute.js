import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
export function ProtectedRoute(props) {
    if(props.user.role === props.role){
        return <Outlet />;
    }
    return <Navigate to='/signin' />;
}