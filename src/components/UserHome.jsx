import "./userHome.css";
import UserContactList from "./UserContactList";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function UserHome() {
    const { userSession } = useContext(UserContext);
    return (
        <div className="parentContainer">
            <div id="contactsContainer">
                <div>
                    <h2>{userSession.firstname}</h2>
                </div>
                <div>
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
            </div>

            <div id="chatContainer">
                <div>
                    <h2>Recipient username</h2>
                </div>
                <div>
                    <h2>Chat content</h2>
                </div>
                <div>
                    <input type="text" placeholder="Aa"/>
                    <button>Enviar</button>
                </div>
            </div>
        </div>
    );
}

export default UserHome;
