import "./UserHome.css";
import UserContactList from "./UserContactList";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function UserHome() {
    const { userSession } = useContext(UserContext);
    return (
        <div className="parentContainer">
                <div id="userInfo">
                    <h2>{userSession.firstname}</h2>
                </div>
                <div id="menuUser">
                    <div>
                        <input type="text" placeholder="usuario" />
                        <button>Agregar</button>
                    </div>
                    <div>
                        {userSession.contacts.map((contact, idx) => (
                            <UserContactList key={idx} contact={contact} />
                        ))}
                    </div>
                </div>

            <div id="contactInfo">
                <h2>Recipient username</h2>
            </div>
            
            <div id="content">
                <div id="chatContent">
                    <h2>Chat content</h2>
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
