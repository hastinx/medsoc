import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [comment, setComment] = useState('');
  const user = useSelector((state) => state.user);
  const getAllContent = async () => {
    try {
      let result = await axios.get('http://localhost:1234/api/user/content');
      console.log(result.data.data);
      let results = result.data.data;
      setContent(results);
    } catch (error) {
      console.log(error);
    }
  };
  // var startDate = new Date();
  // // Do your operations
  // var endDate = new Date();
  // var seconds = (new Date().getTime() - i.createdAt.getTime()) / 1000;
  const handleComment = async (e) => {
    try {
      let result = await axios.post('http://localhost:1234/api/comment', {
        comment: comment,
        id_content: e.id,
        email: user.email,
      });

      console.log(result);
      if (result.data.status) {
        getAllContent();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (data, like) => {
    try {
      let apiUrl = '';
      if (like && like.fullname === user.fullname && like.like_status === 1) {
        apiUrl = 'http://localhost:1234/api/unlike?id=' + like.id;
      } else {
        apiUrl = 'http://localhost:1234/api/like';
      }

      console.log(apiUrl);
      let result = await axios.post(apiUrl, {
        id_content: data.id,
        email: user.email,
      });

      console.log(result);
      if (result.data.status) {
        getAllContent();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderComment = (comment, id, fullname) => {
    let i = 0;
    let html = '';
    while (i < comment.length) {
      if (id === comment[i].id_content) {
        if (i < 5) {
          html = `<ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="fw-bold ps-3 me-3">{k.fullname}</span>{' '}
                <span style={{ marginRight: '3px' }}>{k.comment}</span>
                ${
                  fullname === user.fullname
                    ? '<button className="btn btn-sm text-primary">reply</button>'
                    : ''
                }
              </li>
            </ul>`;
        }
      }
    }
    return html;
  };
  useEffect(() => {
    getAllContent();
  }, []);
  return (
    <div className="continer-fluid bg-secondary h-100 ">
      <Navbar />
      <div className="container d-flex align-items-center flex-column mt-5">
        {content.length > 0 ? (
          content.map((i) => (
            <>
              <div className="card w-50 mt-5">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <img
                      src={i.photo}
                      alt=""
                      className="rounded-circle mx-3"
                      style={{ width: '40px', height: '40px' }}
                    />
                    <span>{i.fullname}</span>
                  </div>

                  <span>
                    <i className="bi bi-clock me-1" />
                    {i.uptime}
                  </span>
                </div>
                <img
                  src={i.image}
                  className="card-img-top"
                  alt=""
                  data-bs-toggle="modal"
                  data-bs-target={`#detail${i.id}`}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {' '}
                    <span
                      className="me-3 fs-3"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleLike(i, i.like)}
                    >
                      {i.like &&
                      i.like.fullname === user.fullname &&
                      i.like.like_status === 1 ? (
                        <i className="bi bi-heart-fill text-danger" />
                      ) : (
                        <i className="bi bi-heart" />
                      )}
                    </span>
                    <span
                      style={{ cursor: 'pointer' }}
                      className="me-3 fs-3"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapseExample${i.id}`}
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <i className="bi bi-chat" />
                    </span>
                    <div class="collapse" id={`collapseExample${i.id}`}>
                      <div class="card card-body">
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="text comment"
                            aria-label="comment"
                            aria-describedby="button-addon2"
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <button
                            class="btn btn-dark"
                            type="button"
                            onClick={() => handleComment(i)}
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapseExample${i.id}`}
                            aria-expanded="false"
                            aria-controls="collapseExample"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </h5>
                  <p className="card-text">
                    <span className="fw-bold me-1">
                      {i.countLike ? i.countLike.totallike : '0'}
                    </span>{' '}
                    Likes
                  </p>
                  {i.caption !== '' ? (
                    <p className="card-text">
                      <span className="fw-bold me-3">{i.fullname}</span>{' '}
                      {i.caption}
                    </p>
                  ) : (
                    ''
                  )}
                </div>
                {i.comment
                  ? i.comment.length > 0
                    ? i.comment.map((k, l) =>
                        i.id === k.id_content ? (
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <span className="fw-bold ps-3 me-3">
                                {k.fullname}
                              </span>{' '}
                              <span style={{ marginRight: '3px' }}>
                                {k.comment}
                              </span>
                              <span
                                style={{ marginRight: '3px', fontSize: '11px' }}
                              >
                                <i className="bi bi-dot" /> {k.cmtime}
                              </span>
                              {i.fullname === user.fullname ? (
                                <button className="btn btn-sm text-primary">
                                  reply
                                </button>
                              ) : (
                                ''
                              )}
                            </li>
                          </ul>
                        ) : (
                          ''
                        )
                      )
                    : ''
                  : ''}
              </div>
              <div
                class="modal fade"
                id={`detail${i.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header d-flex justify-content-between align-items-center">
                      <div>
                        <img
                          src={i.photo}
                          alt=""
                          className="rounded-circle mx-3"
                          style={{ width: '40px', height: '40px' }}
                        />
                        <span className="me-5">{i.fullname}</span>
                      </div>

                      <span>
                        <i className="bi bi-clock me-1" />
                        {i.uptime}
                      </span>

                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <img src={i.image} className="card-img-top mb-3" alt="" />
                      <p className="card-text">
                        <span className="fw-bold me-1">
                          {i.countLike ? i.countLike.totallike : '0'}
                        </span>{' '}
                        Likes
                      </p>
                      {i.caption !== '' ? (
                        <p className="card-text">
                          <span className="fw-bold me-3">{i.fullname}</span>{' '}
                          {i.caption}
                        </p>
                      ) : (
                        ''
                      )}

                      <hr />
                      {i.comment
                        ? i.comment.length > 0
                          ? i.comment.map((k) =>
                              i.id === k.id_content ? (
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item">
                                    <span className="fw-bold ps-3 me-3">
                                      {k.fullname}
                                    </span>{' '}
                                    <span style={{ marginRight: '3px' }}>
                                      {k.comment}
                                    </span>
                                  </li>
                                </ul>
                              ) : (
                                ''
                              )
                            )
                          : ''
                        : ''}
                    </div>
                    <div class="d-flex flex-column justify-content-start"></div>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};

export default List;
