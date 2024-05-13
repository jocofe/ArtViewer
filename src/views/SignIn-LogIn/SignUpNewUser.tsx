import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../config/config';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Logotype } from '../../components/Icons/icons';
import { Button } from '../../components/Buttons/Buttons';

interface FormInputs {
  username: string;
  location: string;
  picture: string;
}

export const SignUpNewUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null); // Estado para almacenar el avatar seleccionado
  const user = auth.currentUser;
  const providerData = user?.providerData[0];

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    setIsSubmitting(true);
    try {
      if (user) {
        const userEmail = user?.email;

        if (userEmail) {
          const userRef = doc(db, 'users', userEmail);
          await setDoc(userRef, {
            id: user.uid,
            email: userEmail,
            name: user.displayName,
            picture: user.photoURL,
            username: data.username,
            location: data.location,
          });
          console.log('User data added to Firestore successfully!');
          navigate('/');
        } else {
          console.error('No user is currently authenticated');
        }
      }
    } catch (error) {
      console.error('Error adding user data to Firestore:', error);
    }
    setIsSubmitting(false);
  };

  const handleAvatarSelection = (avatar: string) => {
    setSelectedAvatar(avatar === selectedAvatar ? null : avatar); // Cambiar el avatar seleccionado si es diferente al actual
  };

  return (
    <div className="newuser-wrapper">
      <div className="topbar topbar--absolute topbar--black">
        <Link to={`/`}>
          <Logotype />
        </Link>
      </div>
      <div className="info-wrapper">
        <div className="info__form">
          <h1 className="h3">Welcome! Let's create your profile</h1>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrapper">
              <label className="h4">Choose a username</label>
              <input
                className="input__box"
                placeholder="Enter a username"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <span>{errors.username.message}</span>}
            </div>
            <div className="input-wrapper">
              <label className="h4">Add your location</label>
              <input
                className="input__box"
                placeholder="Enter a location"
                {...register('location', { required: 'Location is required' })}
              />
              {errors.location && <span>{errors.location.message}</span>}
            </div>
            <div className="input-wrapper">
              <label className="h4">Add an avatar</label>
              <div className="options-wrapper">
                <div className="upload-wrapper">
                  <button className="upload__btn">
                    <Camera />
                  </button>
                </div>
                <div className="selector-wrapper">
                  <Button className="choose-btn" type="sub_primary">
                    Choose Image
                  </Button>
                  <h5>Or choose one of our defaults</h5>
                  <div className="options-selector">
                    {providerData?.providerId === 'google.com' && user?.photoURL && (
                      <div className="checkbox-container">
                        <div className="checkbox__circle">
                          <input
                            type="checkbox"
                            id="google-checkbox"
                            checked={selectedAvatar === 'google'}
                            onChange={() => handleAvatarSelection('google')}
                          />
                          <label htmlFor="google-checkbox">
                            <img className="google-image" src={user?.photoURL} alt="Google profile" />
                          </label>
                        </div>
                      </div>
                    )}

                    <div className="checkbox-container">
                      <div className="checkbox__circle">
                        <input
                          type="checkbox"
                          id="default-checkbox"
                          checked={selectedAvatar === 'default'}
                          onChange={() => handleAvatarSelection('default')}
                        />
                        <label htmlFor="default-checkbox">{user?.displayName?.charAt(0)}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button className="submit-btn" type="sub_primary" disabled={isSubmitting}>
              Continue
            </Button>
          </form>
        </div>
      </div>
      <div className="imgsetup-wrapper"></div>
    </div>
  );
};
