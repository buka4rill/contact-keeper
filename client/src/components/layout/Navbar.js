import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, logout, user } = authContext;
    const { clearContacts } = contactContext;

    const onLogout = () => {
        logout();

        // Clear contacts from state
        clearContacts();
    }


    // Divide links based on if logged in or not
    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name} </li>
            <li>
                <a href="#!" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm"> Logout </span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'> Register </Link>
            </li>
            <li>
                <Link to='/login'> Login </Link>
            </li>
        </Fragment>
    );


    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}></i> {title}
            </h1>
            <ul>
                {/* <li>
                    <Link to='/'> Home </Link>
                </li>
                <li>
                    <Link to='/about'> About </Link>
                </li> */}

                {/* If authenticated, do authlinks else guestlinks */}
                {isAuthenticated ? authLinks : guestLinks}

            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}


export default Navbar;
