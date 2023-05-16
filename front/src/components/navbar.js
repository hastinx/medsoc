import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'
import { clear } from '../redux/allContentSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout())
        dispatch(clear())
    }

    useEffect(() => {

        if (user.email === '') {
            navigate('/')
        }
    }, [user])
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">MedSoc</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to='/home'>Home</Link>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled">Disabled</a>
                        </li> */}
                    </ul>
                    <ul className='navbar-nav mb-2 mb-lg-0'>
                        <li className="nav-item dropstart">
                            <a className="nav-link dropdown-toggle" href="#0" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {user.username}
                                <img
                                    src={user.photoProfile}
                                    alt=""
                                    className="rounded-circle mx-3"
                                    style={{ width: '40px', height: '40px' }}
                                />
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to='/account'>Profile</Link></li>
                                <li><Link className="dropdown-item" to='/account/content/create'>Create Post</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href='#0' onClick={() => handleLogout()}>Log out</a></li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar