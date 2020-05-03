import React, { useReducer } from 'react';
import axios from 'axios';
// import {v4 as uuid} from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    SET_CURRENT,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';

// Create initial state
const ContactState = props => {
    const initialState = {
        // contacts: [
        //     {
        //         id: 1,
        //         name: 'Tosin Agbaje',
        //         email: 'tAgba@gmail.com',
        //         phone: '111-111-1111',
        //         type: 'personal'
        //     },
        //     {
        //         id: 2,
        //         name: 'Sara Watson',
        //         email: 'sara@gmail.com',
        //         phone: '222-222-2222',
        //         type: 'personal'
        //     },
        //     {
        //         id: 3,
        //         name: 'Cynthia Alumunku',
        //         email: 'cynta@gmail.com',
        //         phone: '333-232-3222',
        //         type: 'professional'
        //     }
        // ],
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');

            dispatch({ 
                type: GET_CONTACTS, 
                payload: res.data 
            });
        } catch (err) {
            dispatch({ 
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }

        // dispatch({ type: ADD_CONTACT, payload: contact });
    }

    // Add Contact
    const addContact = async contact => {
        // Mongodb adds an id, so we use UUID to generate id
        // contact.id = uuid();

        // Create headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);

            dispatch({ 
                type: ADD_CONTACT, 
                payload: res.data 
            });
        } catch (err) {
            dispatch({ 
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }

        // dispatch({ type: ADD_CONTACT, payload: contact });
    }

    // Delete Contact
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);

            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (err) {
            dispatch({ 
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }

        // dispatch({ type: DELETE_CONTACT, payload: id });
    }

    // Update Contact
    const updateContact = async contact => {
        // Create headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

            dispatch({ 
                type: UPDATE_CONTACT, 
                payload: res.data
            });
        } catch (err) {
            dispatch({ 
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }


        // dispatch({ type: UPDATE_CONTACT, payload: contact });
    }
    
    // Clear Contact
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    }


    // Set Current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }


    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }


    // Filter Contact
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    }


    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    return (
        <ContactContext.Provider
         value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts, 
            clearContacts
         }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};


export default ContactState;