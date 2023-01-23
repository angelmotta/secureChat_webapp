import { createContext, useState, useEffect } from 'react';

export const ContactContext = createContext();

export function ContactContextProvider(props) {
    const [contactInfo, setContact] = useState({});

    useEffect(() => {
        setContact({});
    }, {});

    function createContact(contact) {
        const selectedContact = {
            firstname: contact.firstname,
        };
        setContact(selectedContact);
    }

    function deleteContact() {
        setContact({});
    }

    const objContext = {
        contactInfo,
        createContact,
        deleteContact,
    };

    return (
        <ContactContext.Provider value={objContext}>
            {props.children}
        </ContactContext.Provider>
    );
}

export default ContactContext;