import { SignGoogle } from "../../components/Form/SignGoogle";
import '../../styles/index.scss';

export const SignInPage = () => {
    return (
        <div className="signinpage-wrapper">
            <div className="topbar topbar--absolute topbar--white"></div>
            <div className="imgsign-wrapper"></div>
            <div className="sign-wrapper">
            <h4 className="h4--bold">Sign In to ArtViewer</h4>
            <SignGoogle label="Sign In With Google"/>
            </div>
        </div>
    );     
}