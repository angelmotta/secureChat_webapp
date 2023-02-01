import "./SendMessageForm.css";
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext'
import { endpoints } from '../config/uri';

function SendMessageForm({ contact, setContact }) {
    const [newMessage, setNewMessage] = useState('');
    const { userSession } = useContext(UserContext);
    
    console.log(`SendMessageForm contactReceived:`);
    console.log(contact);

    const handleSubmit = async (e, contactObj) => {
        e.preventDefault();
        console.log(`Event: POST Request Send new message`);
        console.log(contactObj);
        const requestMessage = {
            receiver: contactObj.email,
            message: newMessage,
        };
        // Send Post Request
        let response;
        try {
            response = await fetch(endpoints.sendMessage, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: userSession.token,
                },
                body: JSON.stringify(requestMessage),
            });
        } catch (e) {
            console.log(`Catch request error: Servicio no disponible`);
            console.log(e);
        }

        if (response?.ok) {
            let newMessageSent = await response.json();
            // Insert new message in user's listMessage and Update state
            setContact(contactObj => ({
                ...contactObj,
                messages: [...contactObj.messages, newMessageSent]
            }));
            console.log(contactObj);
            // Reset newMessage state and input field
            setNewMessage('');
        } else {
            // TODO: return View with message 'Servicio no disponible'
            console.log(`Status Not 200 series`);
            console.log(`${resp.msg}`);
        }
    };

    return(
        <form className="sendForm" onSubmit={(e) => handleSubmit(e, contact)}>
            <input
                placeholder="Let's connect"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                autoFocus
            />
            <button>Enviar</button>
        </form>
    );
}

export default SendMessageForm;