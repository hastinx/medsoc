import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleRegister = async () => {
    document.getElementById('register').disabled = true;
    document.getElementById('spinner').classList.remove('d-none');

    try {
      let result = await axios.post('http://localhost:1234/api/register', {
        username: username,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      });

      if (
        window.confirm(
          result.data.message + ', Link verifikasi terkirim ke email '
        )
      ) {
        window.open('/');
      }
      setAlert([]);
      document.getElementById('register').disabled = false;
      document.getElementById('spinner').classList.add('d-none');
    } catch (error) {
      console.log(error.response.data.errMessage);
      setAlert(error.response.data.errMessage);
      document.getElementById('register').disabled = false;
      document.getElementById('spinner').classList.add('d-none');
    }
  };

  useEffect(() => { }, []);
  return (
    <div className="container-fluid bg-dark vh-100 d-flex justify-content-center align-items-center">
      <div className="card w-25">
        <div className="card-body">
          <span className="fs-2 fw-bold mb-4">MedSoc</span>
          <span className="fs-5 mb-4 ms-2">Register</span>
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
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="input-group mb-3">
            <div className="form-floating">
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
          <div className="input-group mb-3">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="conf-password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <label>Confirm Password</label>
            </div>
            <span className="input-group-text bg-transparent">
              <i
                className="bi bi-eye fs-3"
                onClick={(e) => onToggle('conf-password', e.target)}
              />
            </span>
            <div className="invalid-feedback" id="feedback">
              Confirm Password mismatch password
            </div>
          </div>
          <div className="d-flex gap-3 justify-content-end">
            <button
              className="btn btn-outline-dark"
              onClick={() => navigate('/')}
            >
              Login
            </button>
            <button
              className="btn btn-dark"
              id="register"
              onClick={() => handleRegister()}
            >
              <span
                id="spinner"
                className="d-none spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
