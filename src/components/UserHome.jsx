import "./UserHome.css";
import UserContactCard from "./UserContactCard";
import ChatContent from "./ChatContent";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

function UserHome() {
    const { userSession } = useContext(UserContext);
    const [activeContact, setActiveContact] = useState('');

    return (
        <div className="parentContainer">
                <div id="userInfo">
                    <h2>{userSession.firstname}</h2>
                </div>
                <div id="menuUser">
                    <div id="addContact">
                        <input type="text" placeholder="usuario" />
                        <button>Agregar</button>
                    </div>
                    <div id="listContacts">
                        {userSession.contacts.map((contact, idx) => (
                            <UserContactCard key={idx} contact={contact} setContact={setActiveContact}/>
                        ))}
                    </div>
                </div>

            <div id="contactInfo">
                <h2>{activeContact.firstname}</h2>
            </div>
            
            <div id="content">
                <div id="chatContent">
                    {/* {activeContact && activeContact.messages.map((message) => (
                        <p key={message._id}>{message.message}</p>
                    ))} */}
                    { activeContact && activeContact.messages.map((message) => (
                        <ChatContent key={message._id} message={message} myEmail={userSession.email} />
                    ))}
                </div>
                <div id="messageContent">
                    <input type="text" placeholder="Aa"/>
                    <button>Enviar</button>
                </div>
            </div>

        </div>
    );
}

export default UserHome;
