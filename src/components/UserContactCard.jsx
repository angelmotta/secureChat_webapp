import { useContext } from 'react';
import { UserContext } from '../context/UserContext'
import { endpoints } from '../config/uri';


function UserContactCard({ contact, setContact }) {
    console.log(`UserContactCard`);
    console.log(contact);

    const { userSession } = useContext(UserContext);

    const handleGetChat = async (e, contactObj) => {
        e.preventDefault();
        // Update contact selected
        console.log(`Update contact Info`);
        console.log(contactObj.firstname);
        setContact(contactObj);

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

        if (response?.ok) {
            // HTTP-status is 200-299
            let data = await response.json();
            console.log("get response:", data);
            // Update array of messages to active contactObject
            // Doesn't work in second click selection of card
            // contactObj.messages = data.messages;
            // setContact(contactObj);
            // Solution 1
            // const updatedContact = {
            //     ...contactObj,
            //     messages: [...data.messages],
            // }
            // console.log(updatedContact);
            // other
            // setContact(updatedContact);
            // Solution 2
            setContact(prevState => ({
                ...prevState,
                messages: [...data.messages]
            }));
        } else {
            console.log(`Status != 200 series`);
            console.log(`${data.message}`);
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
