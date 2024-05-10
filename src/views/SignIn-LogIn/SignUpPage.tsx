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
    <div className="sign-up-page">
      <div className="topbar topbar--absolute topbar--white"></div>
      <div className="sign-up-page__img"></div>
        <div className="sign-up-page__content">
          <h4 className="h4--bold sign-up-page__title">Sign Up to ArtViewer</h4>
          <SignGoogle label="Sign Up With Google" />
          <div className="sign-up-page__separator">
            <hr />
            <p className="sign-up-page__text">or sign up with email</p>
            <hr />
          </div>
          {showForm? (
            <SignUpForm />
          ) : (
            <button className='sign-up-page__btn' onClick={handleShowForm}>Sign Up</button>
          )}
          <div className="haveaccount-wrapper">
            <p className="subtext">Already have an account?</p>
            <a href="/signin">Sign In</a>
          </div>
        </div>
      </div>
  );
};
