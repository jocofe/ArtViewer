import { SignGoogle } from '../../components/Form/SignGoogle';
import '../../styles/index.scss';
import React from 'react';
import { SignUpForm } from '../../components/Form/SignUpForm';

export const SignUpPage = () => {
  const [showForm, setShowForm] = React.useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div className="signuppage-wrapper">
      <div className="topbar topbar--absolute topbar--white"></div>
      <div className="imgsign-wrapper"></div>
      <div className="sign-wrapper">
        <div className="sign__content">
          <h4 className="h4--bold">Sign Up to ArtViewer</h4>
          <SignGoogle label="Sign Up With Google" />
          <div className="sing__separator">
            <hr />
            <p className="p--separator">or sign up with email</p>
            <hr />
          </div>
          {showForm? (
            <SignUpForm />
          ) : (
            <button onClick={handleShowForm}>Sign Up</button>
          )}
          <div className="haveaccount-wrapper">
            <p className="subtext">Already have an account?</p>
            <a href="/signin">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};
