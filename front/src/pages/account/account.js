import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { deleteContent } from '../../redux/userSlice';

const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const handleDelete = async (e) => {
    try {
      let result = await axios.post(
        'http://localhost:1234/api/user/content/delete?id=' + e.id_content
      );
      if (result.data.status) dispatch(deleteContent({ id: e.id_content }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    try {
      let result = await axios.post(
        'http://localhost:1234/api/user/content/update?id=' + e.id_content,
        { caption: caption }
      );
      if (result.data.status) navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid bg-dark vh-100">
      <Navbar />
      <div className="container mt-5 w-50">
        <div className="d-flex justify-content-center">
          <img
            src={
              user.photoProfile
                ? user.photoProfile
                : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
            }
            alt=""
            className="rounded-circle me-5"
            style={{ width: '200px', height: '200px', objectFit: 'contain' }}
          />
          <div className="d-flex flex-column">
            <div className="input-group">
              <h3 className="text-white me-5">{user.fullname}</h3>
              <button
                className="btn btn-light rounded-pill"
                onClick={() => navigate('/account/edit')}
              >
                Edit Profil
              </button>
              <button
                className="btn btn-dark rounded-pill"
                onClick={() => navigate('/resetPassword')}
              >
                Reset Password
              </button>
            </div>
            <div className="d-flex gap-5 mt-3">
              <span className="text-white">200 Post</span>
              <span className="text-white">200 Followers</span>
              <span className="text-white">200 Following</span>
            </div>
            <div className="mt-3">
              <span className="text-white text-wrap">{user.username}</span>
            </div>
            <div className="mt-3">
              <span className="text-white text-wrap">{user.email}</span>
            </div>
            <div className="mt-3">
              <span className="text-white text-wrap">{user.bio}</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="container mt-5 d-flex justify-content-center flex-wrap">
          {user.content
            ? user.content.map((i) => (
                <div
                  className="card m-1"
                  style={{ width: '18rem' }}
                  key={i.id_content}
                >
                  <div className="card-header d-flex justify-content-end gap-2">
                    <i
                      className="bi bi-pencil"
                      style={{ cursor: 'pointer' }}
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapseExample${i.id_content}`}
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    />
                    <i
                      className="bi bi-trash"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDelete(i)}
                    />
                  </div>
                  <div class="collapse" id={`collapseExample${i.id_content}`}>
                    <div class="card card-body">
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Caption"
                          aria-label="caption"
                          aria-describedby="button-addon2"
                          onChange={(e) => setCaption(e.target.value)}
                        />
                        <button
                          class="btn btn-dark"
                          type="button"
                          onClick={() => handleUpdate(i)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                  <img src={i.img_content} className="card-img-top" alt="..." />
                  {/* <div className="card-body">
              <p className="card-text">{i.caption}</p>
            </div> */}
                </div>
              ))
            : ''}
        </div>
      </div>
    </div>
  );
};

export default Account;
