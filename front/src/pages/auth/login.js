import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { content, login } from '../../redux/userSlice';
import { add } from '../../redux/allContentSlice';
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
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

  const handleLogin = async () => {
    document.querySelector('button').disabled = true;
    document.getElementById('spinner').classList.remove('d-none');

    try {
      let result = await axios.post('http://localhost:1234/api/login', {
        account: account,
        password: password,
      });

      let results = result.data.data;
      console.log(results);
      dispatch(login({
        isverified: results[0].isverified,
        email: results[0].email,
        username: results[0].username,
        token: results[0].token,
        photoProfile: results[0].image,
        fullname: results[0].fullname,
        bio: results[0].bio
      }))

      for (let i = 0; i < results.length; i++) {
        dispatch(content({ data: { 'id_content': results[i].id_content, 'img_content': results[i].img_content, 'caption': results[i].caption } }))
        dispatch(add({ data: { 'id_content': results[i].id_content, 'img_content': results[i].img_content, 'caption': results[i].caption } }))
      }

      navigate('/home');

      setAlert([]);
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
          <span className="fs-5 mb-4 ms-2">Login</span>
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
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => setAccount(e.target.value)}
            />
            <label>Username or Email</label>
          </div>
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
            <a href='#0' className='me-5 text-decoration-none' onClick={() => navigate('/resetPassword')}>Forgot Password</a>

            <button
              className="btn btn-outline-dark"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
            <button className="btn btn-dark" onClick={() => handleLogin()}>
              <span
                id="spinner"
                className="d-none spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
