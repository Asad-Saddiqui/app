import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { get_permissions, selectPermissions } from '../App/Slice/permissionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkAccess } from '../utils/helper';

const PrivateRoutes = ({ requiredRole }) => {
    const permissions = useSelector(selectPermissions)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_permissions())
    }, [])

    let role;
    if (requiredRole === 'ADMIN') {
        role = "Admin"
    } else if (requiredRole === 'ACCOUNTANT') {
        role = "Accountant"
    } else if (requiredRole === 'DATA_ENTRY') {
        role = "DataEntry"
    } else if (requiredRole === 'MANAGER') {
        role = "Manager"
    }

    const isAccess = checkAccess(Cookies, role, "View")

    const userIdCookie = Cookies.get('accessToken') ? Cookies.get('accessToken') : null;



    const roles = Cookies.get('roles') ? JSON.parse(Cookies.get('roles')) : [];
    const isUserRights = Boolean(permissions?.roles.includes(requiredRole) || roles.includes(requiredRole));
    const isAuthenticated = Boolean(userIdCookie);




    return (isAuthenticated && isUserRights && isAccess) ? <Outlet /> : <Navigate to="*" />;

}
export default PrivateRoutes;
