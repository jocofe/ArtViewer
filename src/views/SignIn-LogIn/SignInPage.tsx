import { SignGoogle } from "../../components/Form/SignGoogle";
import { SignIn } from "../../features/authentication/SignIn";
import '../../styles/index.scss';

//TODO Arreglar botón de Sign In with Google si el usuario cierra el popup que vuelva a enabled
//Implementar errores en login si el usuario no existe o la contraseña es erronea

export const SignInPage = () => {
    return (
        <div className="signinpage-wrapper">
            <div className="topbar topbar--absolute topbar--white"></div>
            <div className="imgsign-wrapper"></div>
            <div className="sign-wrapper">
                <div className="sign__content">
                    <h4 className="h4--bold">Sign In to ArtViewer</h4>
                    <SignGoogle label="Sign In With Google"/>
                    <div className="sing__separator">
                        <hr />
                        <p className="p--separator">
                            or sign in with email
                        </p>
                        <hr />
                    </div>
                    <SignIn />
                    <div className="noaccount-wrapper">
                        <p className="subtext">Don't have an account?</p>
                        <a href="/signup">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    );     
}