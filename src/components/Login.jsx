import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { endpoints } from '../config/uri';
import { UserContext } from '../context/UserContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userSession, createUserSession } = useContext(UserContext);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const reqPayload = {
            email: email,
            password: password,
        };
        // Post Request
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
            createUserSession(resp);
            // TODO: Save token
            console.log(`-- Go Home --`);
        } else {
            // TODO: return Login View with message 'Servicio no disponible'
            console.log(`Status != 20X`);
            console.log(`${resp.msg}`);
        }

        setEmail('');
        setPassword('');
    };

    const myHandle = (e) => {
        e.preventDefault();
        console.log(`Go to my home`);
        createUserSession({ token: 'qwerty' });
    };

    return (
        <div>
            {userSession && <Navigate to="/home" />}

            <h1>Login</h1>
            <form onSubmit={handleSubmitLogin}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="name">Password </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
