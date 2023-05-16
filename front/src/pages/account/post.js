import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../../redux/allContentSlice';
import { content } from '../../redux/userSlice';
const PostContent = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [upload, setUpload] = useState(null);

  const handleUpload = async (e) => {
    console.log(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    setUpload(e.target.files[0]);
  };

  const handlePost = async () => {
    let formData = new FormData();
    formData.append('image', upload);
    formData.append('caption', caption);
    try {
      let result = await axios.post(
        'http://localhost:1234/api/user/content?email=' +
        user.email,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      let results = result.data.data[0]
      console.log(results)
      dispatch(content({ data: { 'id_content': results.id, 'img_content': results.image, 'caption': results.caption } }))
      dispatch(add({ data: results }))
      navigate('/home')
    } catch (error) {
      console.log(error);
    }
  };
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
              id="content"
              accept="image/*"

              onChange={(e) => handleUpload(e)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="inputPassword" className="col-sm-2 col-form-label text-white">
            Caption
          </label>
          <div className="col-sm-10">
            <textarea
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="caption"
              onChange={(e) => setCaption(e.target.value)}

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
                <button className="btn btn-light" onClick={() => navigate('/home')}>cancel</button>
                <button className="btn btn-primary" onClick={() => handlePost()}>save</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
