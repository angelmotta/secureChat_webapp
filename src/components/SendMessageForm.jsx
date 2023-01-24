import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext'
import { endpoints } from '../config/uri';

function SendMessageForm({contact, setContact}) {
    const [newMessage, setNewMessage] = useState('');
    const { userSession } = useContext(UserContext);
    
    console.log(`contactReceived:`);
    console.log(contact);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`Initial contact Object`);
        console.log(contact);
        const requestMessage = {
            receiver: contact.email,
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

        let resp = await response.json();
        if (response.ok) {
            // HTTP-status is 200-299
            // append newMessage to messages Object
            // Update new message in contact Object
            console.log(`Update message list of Contact Object`);
            const newObjectMessage = {
                _id: 'testid123',
                sender: userSession.email,
                receiver: contact.email,
                message: newMessage,
            }
            contact.messages.push(newObjectMessage);
            setContact(contact);
            console.log(contact);
            
        } else {
            // TODO: return View with message 'Servicio no disponible'
            console.log(`Status != 200 series`);
            console.log(`${resp.msg}`);
        }
        
        // Reset newMessage state and input field
        setNewMessage('');
    };

    return(
        <form onSubmit={handleSubmit}>
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