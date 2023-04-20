import React, { useState } from 'react'
import '../styles/layout.css'

import { useAuth0 } from '@auth0/auth0-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function Layout() {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const { logout: auth0Logout } = useAuth0()
    const [stateMenuPhone, setStateMenuPhone] = useState(false)
    const [stateMenu, setStateMenu] = useState(true)
    const navigate = useNavigate()
    console.log(user)
    return (<>

        <div className='container-layout'>
            {/* <MENU-BAR> */}
            <div className="btnMenu">
                <span onClick={() => setStateMenuPhone(!stateMenuPhone)} className="material-symbols-outlined">
                    menu
                </span>
            </div>
            <div className={stateMenuPhone ? 'showPhone' : 'menuPhone'}>
                <div className='btnMenuPhone'>
                    <button onClick={() => setStateMenuPhone(!stateMenuPhone)} className="btnMenu">
                        x
                    </button>
                </div>

                <div className='actionUser'>
                    <ul>
                        <li onClick={() => { setStateMenuPhone(!stateMenuPhone) }}>
                            <Link to='/'>
                                <span className="material-symbols-outlined">
                                    home
                                </span>
                                Home
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* </MENU-BAR> */}
            <p onClick={() => navigate('/')}>Home
                <span className="material-symbols-outlined">
                    home
                </span>
            </p>
            {isAuthenticated ?
                <>
                    <button className='button3' onClick={() => setStateMenu(!stateMenu)}>
                        <img src={user.picture} alt="" id="person" />
                    </button>
                </>
                :
                <>
                    <button onClick={() => loginWithRedirect()} className='button1'>
                        Login
                    </button>
                </>
            }
            {/* <SIDE-BAR> */}
            {isAuthenticated &&
                <div className={stateMenu ? 'menu' : 'show'}>
                    <div className="postnav">
                    </div>
                    <nav>
                        <div className='dateUser'>
                            <div>
                                <h4>Usuario: {user.name}</h4>
                                <h6>Email: {user.email}</h6>
                            </div>
                            <button className='button3' onClick={() => setStateMenu(!stateMenu)}>
                                X
                            </button>
                        </div>
                        <div className='actionUser'>
                            <ul>
                                <li onClick={() => {
                                    setStateMenu(!stateMenu)
                                    navigate('/Upload')
                                }} >
                                    <span className="material-symbols-outlined">
                                        upload
                                    </span>
                                    Upload
                                </li>
                                <li onClick={() => {
                                    setStateMenu(!stateMenu)
                                    navigate('/Favorite')
                                }} >
                                    <span className="material-symbols-outlined">
                                        favorite
                                    </span>
                                    Favorite
                                </li>
                                <li onClick={() => {
                                    setStateMenu(!stateMenu)
                                    navigate('/Collection')
                                }} >
                                    <span className="material-symbols-outlined">
                                        book
                                    </span>
                                    Collection
                                </li>
                                <li onClick={() => {
                                    setStateMenu(!stateMenu)
                                    navigate('/Setting')
                                }} >
                                    <span className="material-symbols-outlined">
                                        settings
                                    </span>
                                    Setting
                                </li>
                                <li onClick={() => {
                                    auth0Logout({ returnTo: window.location.origin })
                                    setStateMenu(!stateMenu)
                                }}>
                                    <span className="material-symbols-outlined">
                                        logout
                                    </span>
                                    <Link>Logout</Link>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </div>
            }
            {/* </SIDE-BAR> */}
        </div>
        <Outlet />
    </>)
}

export default Layout