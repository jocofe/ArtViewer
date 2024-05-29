import { SignGoogle } from '../../features/authentication/SignGoogle';
import { useState } from 'react';
import { SignUpForm } from '../../components/Form/SignUpForm';

export const SignUpPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-page__img"></div>
      <div className={`sign-up-page__content ${showForm ? 'hidden' : ''}`}>
        <h4 className="h4--bold sign-up-page__title">Sign Up to ArtViewer</h4>
        <SignGoogle className="sign-google--white" label="Sign Up With Google" />
        <div className="sign-up-page__separator">
          <hr />
          <p className="sign-up-page__p">or sign up with email</p>
          <hr />
        </div>
        <button className="sign-up-page__btn" onClick={handleShowForm}>
          Sign Up
        </button>
        <div className="sign-up-page-politics">
          <p className="sign-up-page__terms">
            By creating an account you agree with our
            <a className="sign-up-page__link" href="">
              Terms of Service
            </a>
            and{' '}
            <a className="sign-up-page__link" href="">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="sign-up-page__already">
          <p className="sign-up-page__sign-in">Already have an account? </p>
          <a className="sign-up-page__link--bold" href="/signin">
            Sign In
          </a>
        </div>
      </div>
      {showForm && (
        <div className="sign-up-page__content">
          <SignUpForm />
        </div>
      )}
    </div>
  );
};
