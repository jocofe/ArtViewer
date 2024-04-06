import React, { ChangeEvent, FormEvent, useState } from "react";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
export const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        signInWithEmailAndPassword(Auth, email, password)
        .then((userCredentials) => {
            console.log(userCredentials)
        })
    }

    const submitSignIn = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <div className="signin-container">
            <form onSubmit={submitSignIn}>
                <h1>Log In</h1>
                <input type="email" placeholder="Email" value={email} onChange={handleEmailInputChange} />
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordInputChange} />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};