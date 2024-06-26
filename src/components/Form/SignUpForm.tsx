import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { db } from '../../config/config';
import { doc, setDoc } from 'firebase/firestore';
import { ArrowLeft } from '../Icons/icons';
import { Button } from '../Buttons/Buttons';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { PASSWORD_MIN_LENGTH, validateEmail, validatePasswordLength } from '../../utils/validation';
import { TermsCheckbox } from '../TermsCheckbox/TermsCheckbox';
import { FormInputs, FirebaseError } from '../../models/forms';
import { useClearsMessage } from '../../hooks/useClearMessage';

export const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const { error, setError } = useClearsMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const auth = getAuth();

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    if (!termsAccepted) {
      setError('Please accept the terms and conditions');
      return;
    }
    setIsSubmitting(true);
    try {
      const { email, password, name } = data;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userEmail = user.email;

      // Actualiza el perfil del usuario para establecer el displayName
      await updateProfile(user, { displayName: name });

      if (userEmail) {
        const userRef = doc(db, 'users', userEmail);
        await setDoc(userRef, {
          id: user.uid,
          email: userEmail,
          name: user.displayName,
          provider: 'manual-register',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        navigate('/new-user');
      } else {
        setError('Unknown error occurred');
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError.code === 'auth/email-already-in-use') {
        setError('Email has already been taken');
      } else {
        setError(`Error adding user data to Firestore: ${firebaseError.message}`);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
      <ArrowLeft onClick={() => navigate(-1)} className="sign-up-form__back" />
      <h4>Sign up to ArtViewer</h4>
      {error && <span className="error">{error}</span>}
      {errors.name && <span className="error">{errors.name.message}</span>}
      {errors.password && <span className="error">{errors.password.message}</span>}
      <div>
        <h5>Name</h5>
        <input
          type="text"
          className="sign-up-form__input"
          placeholder="Name"
          {...register('name', { required: 'Name is required' })}
        />
      </div>
      <div>
        <h5>Email</h5>
        {errors.email && <span className="error">{errors.email.message}</span>}
        <input
          type="text"
          className="sign-up-form__input"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            validate: {
              isValidEmail: value => validateEmail(value) || 'Invalid email address',
            },
          })}
        />
      </div>
      <div>
        <h5>Password</h5>
        <input
          type="password"
          className="sign-up-form__input"
          placeholder="6+ characters"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: PASSWORD_MIN_LENGTH,
              message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
            },
            validate: {
              isValidPassword: value => validatePasswordLength(value) || 'Password is too short',
            },
          })}
        />
      </div>
      <TermsCheckbox checked={termsAccepted} onChange={event => setTermsAccepted(event.target.checked)} />
      <Button className="sign-up-form__btn" color="sub_primary" disabled={isSubmitting} type="submit">
        Create Account
      </Button>
    </form>
  );
};
