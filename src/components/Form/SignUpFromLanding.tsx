import { useState } from 'react';
import { SignGoogle } from '../../features/authentication/SignGoogle';
import { Button } from '../Buttons/Buttons';
import { TermsCheckbox } from '../TermsCheckbox/TermsCheckbox';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/config';
import { doc, setDoc } from 'firebase/firestore';
import { PASSWORD_MIN_LENGTH, validateEmail } from '../../utils/validation';

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

interface Error {
  code: string;
  message: string;
}

export const SignUpFromLanding: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    if (!termsAccepted) {
      alert('Please accept terms and conditions');
      return;
    }
    setIsSubmitting(true);
    try {
      const { email, password, name } = data;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userEmail = user.email;

      if (userEmail) {
        const userRef = doc(db, 'users', userEmail);
        await setDoc(userRef, {
          id: user.uid,
          email: userEmail,
          name,
          provider: 'manual-register',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log('user data added to Firestore');
        navigate('/new-user');
      } else {
        setErrorMessage('Unknown error occurred');
      }
    } catch (error) {
      const errorCode = (error as Error).code;
      if (errorCode === 'auth/email-already-in-use') {
        setErrorMessage('Email has alredy been taken');
      } else {
        setErrorMessage(`Error adding user data to Firestore: ${(error as Error).message}`);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form sign-up-landing">
        <h4>Sign up to ArtViewer</h4>
        {errorMessage && <span className="error">{errorMessage}</span>}
        {errors.name && <span className="error">{errors.name.message}</span>}
        {errors.password && <span className="error">{errors.password.message}</span>}
        <div>
          <h5>Name</h5>
          <input
            type="text"
            placeholder="Name"
            className="sign-up-form__input"
            {...register('name', { required: 'Name is required' })}
          />
        </div>
        <div>
          <h5>Email</h5>
          <input
            type="text"
            placeholder="Email"
            className="sign-up-form__input"
            {...register('email', {
              required: 'Email is required',
              validate: {
                isValidEmail: value => validateEmail(value) || 'Enter a valid email address',
              },
            })}
          />
        </div>
        <div>
          <h5>Password</h5>
          <input
            type="password"
            placeholder="6+ characters"
            className="sign-up-form__input"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: PASSWORD_MIN_LENGTH,
                message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
              },
            })}
          />
        </div>
        <div className="sign-up-page__separator">
          <hr />
          <p className="sign-up-page__p">or sign up with email</p>
          <hr />
        </div>
        <SignGoogle label="Sign Up with Google" type="singup" className="sign-google--white" />
        <TermsCheckbox checked={termsAccepted} onChange={event => setTermsAccepted(event.target.checked)} />
        <Button className="sign-up-form__btn" color="sub_primary" type="submit" disabled={isSubmitting}>
          Create Account
        </Button>
      </form>
    </div>
  );
};
