import React, { useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    // as soon as component loads
    useEffect(() => {
        // Put the user into state
        authContext.loadUser();

        // eslint-disable-next-line
    }, []); // should run when component loads

    return (
        <div className="grid-2">
            <div>
                {/* Contact Form */}
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home;
