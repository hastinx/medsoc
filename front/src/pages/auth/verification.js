import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Verification = () => {
  const location = useLocation();
  const navigate = useNavigate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const verifiy = async () => {
    try {
      let result = await axios.get(
        'http://localhost:1234/api/verification?token=' +
        location.pathname.split('/')[3]
      );

      alert(result.data.message);
      navigate('/');
    } catch (error) {
      console.log(error);
      alert(error.response.data.message)
      navigate('/')
    }
  };

  useEffect(() => {
    verifiy();
  }, [verifiy]);
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100"></div>
  );
};

export default Verification;
