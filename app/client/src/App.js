import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLayout from './Layout/AdminLayout';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import OTPForm from './Pages/Otp';
import Dashobard from './Pages/Admin/Dashobard';
import AccountantLayout from './Layout/AccountantLayout';
import AccountantDashboard from './Pages/Accountant/AccountantDashboard';
import Unauthorized from './Pages/Unauthorized';
import PrivateRoutes from './Private/PrivateRoutes';
import "./App.css";
import Branch from './Pages/Admin/Branch';
import Inventory from './Pages/Admin/Inventory';
import Users from './Pages/Admin/Users';
import Customer from './Pages/Admin/Customer';
import SaleReport from './Pages/Reports/SaleReport';
import TransectionReport from './Pages/Reports/TransectionReport';
import PlotRegistration from './Pages/Admin/PlotRegistration';
import PlotTransfer from './Pages/Admin/PlotTransfer';
import Block from './Pages/Admin/Block';
import DataOperatoLayout from './Layout/DataOperatorLayout';
import FileTransfer from './Pages/Accountant/FileTransfer';
import FileReport from './Pages/Accountant/FileReport';
import Owner from './Pages/Admin/Owner';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/otp" element={<OTPForm />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoutes requiredRole="ACCOUNTANT" />}>
        <Route path="Accountant" element={<AccountantLayout />}>
          <Route index element={<AccountantDashboard />} />
          <Route path='registration/plot-transfer' element={<FileTransfer account="account" />} />
          <Route path='file-report' element={<FileReport />} />
          <Route path='Owner' element={<Owner />} />

        </Route>
      </Route>
      <Route element={<PrivateRoutes requiredRole="DATA_ENTRY" />}>
        <Route path="Data_entry" element={<DataOperatoLayout />}>
          <Route index element={<AccountantDashboard />} />
          <Route path='phase' element={<Branch />} />
          <Route path='block' element={<Block />} />
          <Route path='registration/Plots' element={<PlotRegistration />} />
          <Route path='Owner' element={<Owner />} />
          <Route path='registration/plot-transfer' element={<PlotTransfer />} />
        </Route>
      </Route>
      <Route element={<PrivateRoutes requiredRole="MANAGER" />}>
        <Route path="Management" element={<AccountantLayout />}>
          <Route index element={<AccountantDashboard />} />
          <Route path='Owner' element={<Owner />} />

          <Route path='registration/plot-transfer' element={<FileTransfer account="managment" />} />
        </Route>
      </Route>

      <Route element={<PrivateRoutes requiredRole="ADMIN" />}>
        <Route path="Admin" element={<AdminLayout account="admin" />}>

          <Route index element={<Dashobard />} />
          <Route path='inventory' element={<Inventory />} />
          <Route path='Owner' element={<Owner />} />
          <Route path='users' element={<Users />} />
          <Route path='customers' element={<Customer />} />
          <Route path='sales/report' element={<SaleReport />} />
          <Route path='sales/transactions' element={<TransectionReport />} />
          <Route path='registration/plot-transfer' element={<FileTransfer account="admin" />} />


        </Route>
      </Route>


      {/* Unauthorized Route */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Catch-All Route */}
      <Route path="*" element={<Navigate to="/unauthorized" replace />} />
    </Routes>
  );
}

export default App;
