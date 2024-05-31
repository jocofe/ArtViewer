import { SignGoogle } from '../../features/authentication/SignGoogle';
import { SignIn } from '../../features/authentication/SignIn';

export const SignInPage = () => {
  return (
    <div className="signinpage-wrapper">
      <div className="imgsign-wrapper"></div>
      <div className="sign-wrapper">
        <div className="sign__content">
          <h4 className="h4--bold">Sign In to ArtViewer</h4>
          <SignGoogle label="Sign In With Google" />
          <div className="sing__separator">
            <hr />
            <p className="p--separator">or sign in with email</p>
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
};
