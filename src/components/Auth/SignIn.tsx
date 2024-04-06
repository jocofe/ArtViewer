import React, { useState } from "react";

export const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="signin-container">
            <form>
                <h1>Log In</h1>
                <input type="email" placeholder="Email" value={email} />
                <input type="password" placeholder="Password" value={password} />
            </form>
        </div>
    );
};