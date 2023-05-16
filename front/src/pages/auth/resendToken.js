import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const ResendToken = () => {
  const location = useLocation();
  const user = useSelector(state => state.user)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const verifiy = async () => {
  //   try {
  //     let result = await axios.get(
  //       'http://localhost:1234/api/verification?token=' +
  //       location.pathname.split('/')[3]
  //     );

  //     console.log(result.data);
  //   } catch (error) {
  //     console.log(error);
  //     alert(error.response.data.message);
  //   }
  // };

  const resendLink = async () => {
    try {
      let result = await axios.get(
        'http://localhost:1234/api/resendVerification?email=' +
        user.email
      );


      if (
        window.confirm(
          result.data.message +
          ', Verification link has been sent to your email'
        )
      ) {
        return;
      }
    } catch (error) {
      //   console.log(error);
      Swal.fire(error.response.data.message);
    }
  };

  //   useEffect(() => {
  //     verifiy();
  //   }, [verifiy]);
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card">
        <div className="card-body">
          <button className="btn btn-dark" onClick={() => resendLink()}>
            Resend verification link
          </button> or <Link to={`/register/verification/${user.token}`}>Verify</Link>
        </div>
      </div>
    </div>
  );
};

export default ResendToken;
