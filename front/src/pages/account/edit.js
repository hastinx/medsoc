import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/userSlice';

const EditProfile = () => {
  const navigate = useNavigate();
  const dispacth = useDispatch()
  const user = useSelector(state => state.user)
  console.log(user)
  const [image, setImage] = useState(
    ''
  );
  const [upload, setUpload] = useState(null);
  const [fullname, setFullname] = useState(user.fullname);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);

  const handleUpload = async (e) => {
    console.log(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    setUpload(e.target.files[0]);
  };

  const handleUpdate = async () => {
    let formData = new FormData();
    formData.append('image', upload);
    formData.append('username', username);
    formData.append('fullname', fullname);
    formData.append('bio', bio);
    try {
      let result = await axios.post(
        'http://localhost:1234/api/user/upload/profile?email=' +
        user.email,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      let results = result.data.data[0]

      dispacth(updateProfile({
        isverified: results.isverified,
        email: results.email,
        username: results.username,
        token: results.token,
        photoProfile: results.image,
        fullname: results.fullname,
        bio: results.bio
      }))

      navigate('/account')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setImage(user.photoProfile)
    setFullname(user.fullname)
    setUsername(user.username)
    setBio(user.bio)
  }, [user]);
  return (
    <div className="container-fluid bg-dark vh-100">
      <Navbar />
      <div className="container w-50 mt-5">
        <div className="mb-3 row">
          <div className="col-sm-2">
            <img
              src={image}
              alt=""
              className="rounded-circle me-5"
              style={{ width: '100px', height: '100px' }}
            />
          </div>
          <div className="col-sm-10 d-flex align-items-center">
            <input
              type="file"
              className="form-control"
              id="profile"
              accept="image/*"

              onChange={(e) => handleUpload(e)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            for="staticEmail"
            className="col-sm-2 col-form-label text-white"
          >
            Full name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="staticEmail"
              placeholder="full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            for="staticEmail"
            className="col-sm-2 col-form-label text-white"
          >
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="staticEmail"
              placeholder="account name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            for="staticEmail"
            className="col-sm-2 col-form-label text-white"
          >
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control-plaintext text-white"
              id="staticEmail"
              placeholder="account name"
              value={user.email}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            for="inputPassword"
            className="col-sm-2 col-form-label text-white"
          >
            Bio
          </label>
          <div className="col-sm-10">
            <textarea
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-sm-12 d-flex justify-content-end gap-3">
            {user.isverified === 0 ? (
              <button
                className="btn btn-warning"
                onClick={() => navigate('/register/resendToken')}
              >
                verify
              </button>
            ) : (
              <>
                <button
                  className="btn btn-light"
                  onClick={() => navigate('/home')}
                >
                  cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdate()}
                >
                  save
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
