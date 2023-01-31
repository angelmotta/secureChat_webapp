import "./UserHome.css";
import UserContactCard from "./UserContactCard";
import ChatContent from "./ChatContent";
import SendMessageForm from "./SendMessageForm";
import AddContact from "./AddContact";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

function UserHome() {
    const { userSession } = useContext(UserContext);
    const [activeContact, setActiveContact] = useState('');

    console.log(`UserHome: Active contact`);
    console.log(activeContact);
    let lenMessages = activeContact?.messages;
    let numMessages = lenMessages ? lenMessages.length : "not defined yet";
    console.log(`len messages: ${numMessages}`);
    return (
        <div className="parentContainer">
                <div id="userInfo">
                    <h2>{userSession.firstname}</h2>
                </div>
                <div id="menuUser">
                    <div id="addContact">
                        <AddContact />
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
                    { activeContact && activeContact.messages.map((message) => (
                        <ChatContent key={message._id} message={message} myEmail={userSession.email} />
                    ))}
                </div>
                <div id="newMessage">
                    <SendMessageForm contact={activeContact} setContact={setActiveContact}/>
                </div>
            </div>

        </div>
    );
}

export default UserHome;
