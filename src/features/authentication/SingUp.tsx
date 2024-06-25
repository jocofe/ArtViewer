import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/config';
import { ChangeEvent, FormEvent } from 'react';
import { useClearsMessage } from '../../hooks/useClearMessage';

export const useSignUp = () => {
  const { error, setError } = useClearsMessage();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleUsernameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleTermsCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
  };

  const submitSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!termsAccepted) {
      setError('You must accept the terms and conditions to sign up.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      // TODO: Add code to create a user document with name, username, and email
    } catch (error) {
      setError('Unknown error occurred');
    }
  };

  return {
    name,
    username,
    email,
    password,
    termsAccepted,
    error,
    handleNameInputChange,
    handleUsernameInputChange,
    handleEmailInputChange,
    handlePasswordInputChange,
    handleTermsCheckboxChange,
    submitSignUp,
  };
};
