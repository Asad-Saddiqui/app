import React, { useState } from 'react';
import CreateCharges from '../Forms/CreateCharges';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import ReportTable from './ReportTable';

const Charges = ({ componentRef, isModalOpen, closeModal }) => {



  const handleSubmit = (formData) => {
    console.log('Form Data Submitted:', formData);
    // Handle form data submission (e.g., API call)
  };

  return (
    <div>
    
     
      <ReportTable componentRef={componentRef} />


    </div>
  );
};


export default Charges