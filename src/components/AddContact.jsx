import "./AddContact.css";
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext'

function AddContact() {
    const [newContact, setNewContact] = useState('');
    const { userSession } = useContext(UserContext);    

    const handleSubmit = async (e, contactObj) => {
        console.log(`POST addContact request`);
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