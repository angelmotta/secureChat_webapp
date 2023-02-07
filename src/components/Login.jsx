import "./Login.css"
import { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { endpoints } from '../config/uri';
import { UserContext } from '../context/UserContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { userSession, createUserSession } = useContext(UserContext);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const reqPayload = {
            email: email,
            password: password,
        };
        // Send Post Request
        let response;
        try {
            response = await fetch(endpoints.login, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(reqPayload),
            });
        } catch (e) {
            console.log(`Catch request error: Servicio no disponible`);
            console.log(e);
        }

        let resp = await response.json();
        if (response.ok) {
            // HTTP-status is 200-299
            // save userSession
            resp.email = email;
            // Add messages array
            for (let i = 0; i < resp.contacts.length; i++) {
                resp.contacts[i].messages = [];
            }
            console.log(`muted contacts`);
            console.log(resp.contacts);
            createUserSession(resp);
            // TODO: Save token
            console.log(`-- Go Home --`);
            console.log(`MyUserSession:`, resp);
        } else {
            // TODO: return Login View with message 'Servicio no disponible'
            console.log(`Status != 20X`);
            console.log(`${resp.msg}`);
        }

        setEmail('');
        setPassword('');
    };

    const handleRegister = () => {
        navigate("/register");
    }

    return (
        <div id="parentLogin">
            {userSession && <Navigate to="/home" />}

            <h1 id="productTitle">Let's Connect</h1>
            <form className="formLogin" onSubmit={handleSubmitLogin}>
                    <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button className="button">Login</button>
                    <hr></hr>
                    <button type="button" id="registerButton" onClick={handleRegister}>Create account</button>
            </form>
        </div>
    );
}

export default Login;
