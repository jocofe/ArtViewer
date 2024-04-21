import { SignGoogleProps } from "../../models/signin-google";
import classNames from "classnames";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

    useEffect(() => {
        AuthCheck();
        return () => AuthCheck();
    }, [auth]);

    const AuthCheck = onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('Exist')
        } return console.log(`Don't Exist`)
    })

    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response)

                const userCreationTime = response.user.metadata?.creationTime;

                if (userCreationTime) {
                    const creationDate = new Date(userCreationTime);
                    const currentDate = new Date();

                    if (creationDate > currentDate) {
                        navigate('/new')
                    }
                    navigate('/')
                }
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