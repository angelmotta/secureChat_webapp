import { useContext } from 'react';
import { UserContext } from '../context/UserContext'
import { endpoints } from '../config/uri';


function UserContactCard({ contact, setContact }) {
    const { userSession } = useContext(UserContext);

    const handleGetChat = async (e, contactObj) => {
        e.preventDefault();
        // Update contact selected
        console.log(`Update contact`);
        console.log(contactObj.firstname);
        setContact(contactObj.firstname);

        console.log(`Getting chat from ${contactObj.email}`);
        // Send Get Request
        let response;
        try {
            response = await fetch(endpoints.chat + '?' + new URLSearchParams({email : contactObj.email}), {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: userSession.token,
                },
            });
        } catch (e) {
            console.log(`Catch request error: Servicio no disponible`);
            console.log(e);
            return;
        }

        let data = await response.json();
        if (response.ok) {
            // HTTP-status is 200-299
            // Render chat content in UI
            console.log(`-- Chat content here --`);
            console.log(data)
            // Return component ChatContent
            // <UserContactCard key={idx} contact={contact} />
        } else {
            // TODO: return Login View with message 'Servicio no disponible'
            console.log(`Status != 200 series`);
            console.log(`${data.msg}`);
        }
    }

    return (
        <a href="#" onClick={(e) => handleGetChat(e, contact)}>
            <div className="contactCard">
                <h4 className="textContactCard"><b>{contact.firstname + " " + contact.lastname}</b></h4>
                <p className="textContactCard">{contact.email}</p>
            </div>
        </a>);
}

export default UserContactCard;
