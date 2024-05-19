import { SignGoogleProps } from '../../models/signin-google';
import classNames from 'classnames';
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { getAdditionalUserInfo } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GoogleIcon } from '../../components/Icons/icons';

export const SignGoogle = (props: SignGoogleProps) => {
  const { label } = props;

  const SignInGoogleClass = classNames('sign-google' || 'sign-google--white');

  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const signInWithGoogle = async () => {
    setAuthing(true);

    try {
      const userCredential: UserCredential = await signInWithPopup(auth, new GoogleAuthProvider());
      const additionalUserInfo = await getAdditionalUserInfo(userCredential);

      console.log(additionalUserInfo);

      const isNewUser = additionalUserInfo?.isNewUser;

      if (isNewUser) {
        navigate('/new-user');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setAuthing(false);
    }
  };

  return (
    <button onClick={() => signInWithGoogle()} disabled={authing} className={SignInGoogleClass}>
      <GoogleIcon className="icon" />
      {label}
    </button>
  );
};
