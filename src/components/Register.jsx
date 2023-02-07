import "./Register.css";

function Register() {
    console.log("render Register");
    return(
        <div className="registerDiv">
                <h1 id="productTitle">Let's Connect</h1>
                <form className="formRegister">
                    <input
                        placeholder="First name"
                        type="text"
                        name="name"
                        id="firstname"
                        // onChange={(e) => setEmail(e.target.value)}
                        // value=""
                        required
                    />
                    <input
                        placeholder="Last name"
                        type="text"
                        name="name"
                        id="lastname"
                        // onChange={(e) => setEmail(e.target.value)}
                        // value=""
                        required
                    />
                    <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        id="email"
                        // onChange={(e) => setEmail(e.target.value)}
                        // value=""
                        required
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        id="password"
                        // onChange={(e) => setPassword(e.target.value)}
                        // value={password}
                        required
                    />
                    <button className="button">Create Account</button>
                    <hr></hr>
                    <a href="https://www.google.com">I already have an account</a>
                </form>
            </div>
    );
}

export default Register;