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
          <SignGoogle className='sign-google--white' label="Sign Up With Google"/>
          <div className="sign-up-page__separator">
            <hr />
            <p className="sign-up-page__p">or sign up with email</p>
            <hr />
          </div>
          {showForm? (
            <SignUpForm />
          ) : (
            <button className='sign-up-page__btn' onClick={handleShowForm}>Sign Up</button>
          )}
          <div>
            <p className='sign-up-page__terms'>By creating an account you agree with our <a className='sign-up-page__link' href="">Terms of Service</a>, <a  className='sign-up-page__link' href="">Privacy Policy</a>, and our default <a  className='sign-up-page__link' href="">Notification Settings</a>.</p>
          </div>
          <div>
            <p className="sign-up-page__sign-in">Already have an account? <a className='sign-up-page__link--bold' href="/signin">Sign In</a> </p>
          </div>
        </div>
      </div>
  );
};
