import { ChangeEvent, FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/config";
import '../../styles/index.scss'

export const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const submitSignIn = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="signincomp-wrapper">
            <form className="signincomp__container" onSubmit={submitSignIn}>
                <div className="input-wrapper">
                    <label>Email</label>
                <input className='signincomp__input' type="email" value={email} onChange={handleEmailInputChange} />
                </div>
                <div className="input-wrapper">
                    <div className="label-wrapper">
                    <label>Password</label>
                    <a href="#">Forgot?</a>
                    </div>
                    <input className='signincomp__input' type="password" value={password} onChange={handlePasswordInputChange} />
                </div>
                
                <button className='btnsign--white' type="submit">Sign In</button>
            </form>
        </div>
    );
};