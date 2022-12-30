import "./UserHome.css";
import UserContactList from "./UserContactList"
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function UserHome() {
    return (
        <div className="parentContainer">
            <div id="contactsContainer">
                <div>
                    <h2>Username</h2>
                </div>
                <div>
                    <div>
                        <input type="text" placeholder="usuario" />
                        <button>Agregar</button>
                    </div>
                    <UserContactList />
                </div>
            </div>

            <div id="chatContainer">
                <div>
                    <h2>Recipient username</h2>
                </div>
                <div>
                    <h2>Chat content</h2>
                </div>
            </div>
        </div>
    );
}

export default UserHome;
