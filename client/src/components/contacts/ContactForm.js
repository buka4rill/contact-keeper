import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    const { addContact, updateContact, clearCurrent, current } = contactContext;

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    useEffect(() => {
        // If edit button is clicked
        if (current !== null) {
            // Set form to contact current data
            setContact(current);
        } else {
            // Clear it
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current]); // Function to run if these values are changed

    const { name, email, phone, type } = contact;

    const onChange = e => 
        setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (current === null) {
            // Add Contacts
            addContact(contact);
        } else {
            // Update contact
            updateContact(contact);
        }  

        // clear form fields
        clearAll();
    }

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2 className="text-primary"> {current ? 'Edit Contact' : 'Add Contact'} </h2>
                <input 
                 type="text" 
                 name="name" 
                 placeholder="Name" 
                 value={name} 
                 onChange={onChange} 
                />
                
                <input 
                 type="email" 
                 name="email" 
                 placeholder="Email" 
                 value={email} 
                 onChange={onChange} 
                />
                
                <input 
                 type="text" 
                 name="phone" 
                 placeholder="Phone" 
                 value={phone} 
                 onChange={onChange} 
                />
                
                <h5> Contact Type </h5>
                <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} /> Personal{' '}
                <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} /> Professional{' '}
            
                <div>
                    <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block" />
                </div>

                {/* Clear button */}
                {current && <div>
                    <button className="btn btn-light btn-block" onClick={clearAll}>
                        Clear
                    </button>
                </div>}
            </form>
        </div>
    )
}

export default ContactForm;
