import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
const ResetPassowrd = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState([]);

  const onToggle = (id, e) => {
    let element = document.getElementById(id);
    if (element.type === 'password') {
      element.type = 'text';
      e.classList.remove('bi-eye');
      e.classList.add('bi-eye-slash');
    } else {
      element.type = 'password';
      e.classList.remove('bi-eye-slash');
      e.classList.add('bi-eye');
    }
  };

  const handleSend = async () => {
    document.querySelector('button').disabled = true;
    document.getElementById('spinner').classList.remove('d-none');

    try {
      let result = await axios.post('http://localhost:1234/api/resetPassword?token=' + location.pathname.split('/')[3], {
        password: password
      });

      setAlert([]);
      if (
        window.confirm(
          result.data.message +
          ', Silahkan login ulang'
        )
      ) {
        navigate('/')
      }
      document.querySelector('button').disabled = false;
      document.getElementById('spinner').classList.add('d-none');
    } catch (error) {
      console.log(error.response.data.errMessage);
      setAlert(error.response.data.errMessage);
      document.querySelector('button').disabled = false;
      document.getElementById('spinner').classList.add('d-none');
    }
  };

  return (
    <div className="container-fluid bg-dark vh-100 d-flex justify-content-center align-items-center">
      <div className="card w-25">
        <div className="card-body">
          <span className="fs-2 fw-bold mb-4">MedSoc</span>
          <span className="fs-5 mb-4 ms-2">Reset Password</span>
          <div
            class={alert.length === 0 ? '' : 'alert alert-danger'}
            role="alert"
          >
            {!alert
              ? ''
              : alert.map((i) => (
                <ul>
                  <li>{i}</li>
                </ul>
              ))}
          </div>
          <hr />
          {/* <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div> */}
          <div className="input-group mb-3">
            <div class="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>
            <span className="input-group-text bg-transparent">
              <i
                className="bi bi-eye fs-3"
                onClick={(e) => onToggle('password', e.target)}
              />
            </span>
          </div>
          <div className="d-flex gap-3 justify-content-end align-items-center">
            {/* <a href='#0' className='me-5 text-decoration-none'>Forgot Password</a>

            <button
              className="btn btn-outline-dark"
              onClick={() => navigate('/register')}
            >
              Register
            </button> */}
            <button className="btn btn-dark" onClick={() => handleSend()}>
              <span
                id="spinner"
                className="d-none spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassowrd;
