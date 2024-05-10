import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/config';

type InputFieldProps = {
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    type?: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
};

type TermsCheckboxProps = {
    checked: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onChange }) => {
  return (
    <div className="terms-wrapper">
      <input type="checkbox" id="terms" checked={checked} onChange={onChange} />
      <label htmlFor="terms">I accept the terms and conditions</label>
    </div>
  );
};

export const SignUpForm = () => {
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
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      // TODO: Create a user document with name, username, and email
    } catch (error) {
      setError('Unknown error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <InputField label="Name" value={name} onChange={(event) => setName(event.target.value)} />
      <InputField label="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
      <InputField label="Email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
      <InputField label="Password" value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
      <TermsCheckbox checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Sign Up</button>
    </form>
  );
};