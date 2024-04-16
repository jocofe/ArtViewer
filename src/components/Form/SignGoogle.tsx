import { SignGoogleProps } from "../../models/signin-google";
import classNames from "classnames";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../../styles/index.scss';
import { GoogleIcon } from "../Icons/icons";


export const SignGoogle = (props: SignGoogleProps) => {
    const { label } = props;

    const SignInGoogleClass = classNames(
        'sign-google',
    );

    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);

    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response.user.uid)
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
                setAuthing(false);
            })
    }

    return (
        <button onClick={() => signInWithGoogle()} disabled={authing} className={SignInGoogleClass}><GoogleIcon className="icon"/>{label}</button>
    );
}