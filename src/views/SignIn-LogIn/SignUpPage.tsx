import { SignGoogle } from '../../features/authentication/SignGoogle';

export const SignUpPage = () => {
  return (
    <div className="signinpage-wrapper">
      <div className="topbar topbar--absolute topbar--white"></div>
      <div className="imgsign-wrapper"></div>
      <div className="sign-wrapper">
        <div className="sign__content">
          <h4 className="h4--bold">Sign In to ArtViewer</h4>
          <SignGoogle label="Sign In With Google" />
          <div className="sing__separator">
            <hr />
            <p className="p--separator">or sign up with email</p>
            <hr />
          </div>
          <div className="noaccount-wrapper">
            <p className="subtext">Already have an account?</p>
            <a href="/signup">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};
