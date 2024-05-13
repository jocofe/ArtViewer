import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../config/config';
import { ArrowLeft } from '../Icons/icons';
import { collection, addDoc } from 'firebase/firestore';
import { validateEmail, validatePasswordLength } from '../../utils/validation';

type TermsCheckboxProps = {
    checked: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onChange }) => {
  return (
    <div className="terms">
      <input className='terms__checkbox' type="checkbox" id="terms" checked={checked} onChange={onChange} />
      <p className='terms__text'>I agree with ArtViewer <a className='sign-up-page__link' href="">Terms of Service</a>, <a  className='sign-up-page__link' href="">Privacy Policy</a>, and default <a  className='sign-up-page__link' href="">Notification Settings</a>.</p>
    </div>
  );
};

type SignUpFormProps = {
  onHideForm: () => void;
};

export const SignUpForm: React.FC<SignUpFormProps> = ({ onHideForm }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!termsAccepted) {
      setError('You must accept the terms and conditions to sign up.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePasswordLength(password)) {
      setError('Please enter a password with at least 6 characters');
      return;
    }

    try {
      // Create new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);

      // Add user data to FIRESTORE -> TODO
      const userRef = collection(firestore, 'users');
      await addDoc(userRef, {
        name, 
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Reset form
      setEmail('');
      setPassword('');
      setName('');

      //Success alert message
      alert('User created succesfully');
      } catch (error) {
        // Error alert message
        setError('Unknown error occurred');
      }
  };

  return (
    <form onSubmit={handleSubmit} className='sign-up-form'>
      <ArrowLeft onClick={onHideForm} className='sign-up-form__back' />
      <h4 className='sign-up-form__head h4--bold'>Sign up to ArtViewer</h4>
      <div className='sign-up-form__name'>
        <div className='sign-up-form__name-section'>
          <h5>Name</h5>
          <input 
            className='sign-up-form__input' 
            type="text" 
            placeholder='Name' 
            value={name} 
            onChange={(event) => setName(event.target.value)}
            required 
            />
        </div>
        <div className='sign-up-form__name-section'>
          <h5>Username</h5>
          <input 
            className='sign-up-form__input' 
            type="text" placeholder='Username' 
            value={username} 
            onChange={(event) => setUsername(event.target.value)}
            required
            />
        </div>
      </div>
      <div>
        <h5>Email</h5>
        <input 
          className='sign-up-form__input' 
          type="text" 
          placeholder='Email' 
          value={email} 
          onChange={(event) => setEmail(event.target.value)} 
          required
          />
      </div>
      <div>
        <h5>Password</h5>
        <input 
          className='sign-up-form__input' 
          type="text" 
          placeholder='6+ characters' 
          value={password} 
          onChange={(event) => setPassword(event.target.value)} 
          required
          />
      </div>
      <TermsCheckbox checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" className='sign-up-form__btn'>Create Account</button>

      <div>
          <p className="sign-up-page__sign-in">Already have an account? <a className='sign-up-page__link--bold' href="/signin">Sign In</a> </p>
        </div>
    </form>
  );
};