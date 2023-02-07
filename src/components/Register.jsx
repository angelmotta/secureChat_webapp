import "./Register.css";
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { endpoints } from '../config/uri';
import { UserContext } from '../context/UserContext';

function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        console.log(`firstname: ${firstname}`);
        console.log(`lastname: ${lastname}`);
        console.log(`email: ${email}`);
        console.log(`password: ${password}`);
        
        const reqPayload = {
            firstname,
            lastname,
            email,
            password,
        }
        console.log(`request payload:`);
        console.log(reqPayload);

        // Send Register Post request
        let response;
        try {
            response = await fetch(endpoints.register, {
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

        if (response?.ok) {
            let myProfile = await response.json();
            // expected userSession: {firstname, lastname, contacts[], token}
            createUserSession(myProfile);
            navigate("/home");
        } else {
            // TODO: return View with message 'Servicio no disponible'
            console.log(`Status Not 200 series`);
            let respError = await response.json();
            console.log(respError.message); // get custom message from Backend
        }
    }

    return(
        <div className="registerDiv">
                <h1 id="productTitle">Let's Connect</h1>
                <form className="formRegister" onSubmit={handleSubmitRegister}>
                    <input
                        placeholder="First name"
                        type="text"
                        name="firstname"
                        id="firstname"
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                        required
                    />
                    <input
                        placeholder="Last name"
                        type="text"
                        name="lastname"
                        id="lastname"
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                        required
                    />
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
                    <button className="button">Create Account</button>
                    <hr />
                    <Link to="/">I already have an account</Link>
                </form>
            </div>
    );
}

export default Register;