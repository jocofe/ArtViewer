import { ChangeEvent, FormEvent, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/config';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submitSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log(userCredential);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="signin-container">
      <form onSubmit={submitSignUp}>
        <h1>Sing Up</h1>
        <input type="email" placeholder="Email" value={email} onChange={handleEmailInputChange} />
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordInputChange} />
        <button type="submit">Sing Up</button>
      </form>
    </div>
  );
};
