import "./AddContact.css";
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { endpoints } from '../config/uri';

function AddContact() {
    const [newContact, setNewContact] = useState('');
    const { userSession, createUserSession } = useContext(UserContext);    

    const handleSubmit = async (e) => {
        console.log(`POST addContact request`);
        e.preventDefault();
        const requestNewContact = {
            contact: newContact,
        }
        // Send Post Request
        let response;
        try {
            response = await fetch(endpoints.addContact, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: userSession.token,
                },
                body: JSON.stringify(requestNewContact),
            });
        } catch (e) {
            console.log(`Catch Request Error: Servicio no disponible`);
            console.log(e);
        }

        let dataResp;
        if (response?.ok) {
            console.log(`Add contact Post Request OK:`);
            dataResp = await response.json();
            console.log(`new user added`);
            console.log(dataResp);
            createUserSession( userSession => ({
                ...userSession,
                contacts: [...userSession.contacts, dataResp],
            }));
            // Reset state
            setNewContact('');
        } else {
            console.log(`Add Contact - Status Not 200 series`);
            console.log(`HTTP Status code: ${response?.status}`);
            dataResp = await response.json();
            console.log(dataResp?.message); // Display to the user
        }
    }

    return(
        <form className="addContactForm" onSubmit={(e) => handleSubmit(e)}>
            <input
                placeholder="Add contact"
                onChange={(e) => setNewContact(e.target.value)}
                value={newContact}
            />
            <button>Add</button>
        </form>
    );
}

export default AddContact;