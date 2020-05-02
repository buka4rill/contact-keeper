import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);

    // Initial ref value
    const text = useRef('');

    const { filterContacts, clearFilter, filtered } = contactContext;

    useEffect(() => {
        if (filtered) {
            text.current.value = ''; // text.current.value from useRef
        }
    }, []);
    
    const onChange = (e) => {
        // value of input
        if (text.current.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }
    
    return (
        <form>
           <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange} /> 
        </form>
    )
}

export default ContactFilter;
