import React, { useState, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth, storage } from '../../config/config';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Logotype } from '../../components/Icons/icons';
import { Button } from '../../components/Buttons/Buttons';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [userUploadedAvatar, setUserUploadedAvatar] = useState<string | null>(null);
  const user = auth.currentUser;
  const providerData = user?.providerData[0];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    setIsSubmitting(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('No user is currently authenticated');
        return;
      }

      const userEmail = user.email;

      if (userEmail) {
        const userRef = doc(db, 'users', userEmail);
        await setDoc(userRef, {
          id: user.uid,
          email: userEmail,
          name: user.displayName,
          picture: userUploadedAvatar || selectedAvatar,
          username: data.username,
          location: data.location,
        });
        console.log('User data added to Firestore successfully!');
        navigate('/');
      } else {
        console.error('No user email found');
      }
    } catch (error) {
      console.error('Error adding user data to Firestore:', error);
    }
    setIsSubmitting(false);
  };

  const handleAvatarSelection = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const handleChooseBtnClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const storageRef = ref(storage, `avatars/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setUserUploadedAvatar(url);
      handleAvatarSelection('uploaded');
    }
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
                  <button type="button" className="upload__btn" onClick={handleChooseBtnClick}>
                    <Camera />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
                <div className="selector-wrapper">
                  <Button className="choose-btn" type="sub_primary">
                    Choose Image
                  </Button>
                  <h5>Or choose one of our defaults</h5>
                  <div className="options-selector">
                    {userUploadedAvatar && (
                      <div className="checkbox-container">
                        <div className="checkbox__circle">
                          <input
                            type="checkbox"
                            id="uploaded-checkbox"
                            checked={selectedAvatar === 'uploaded'}
                            onChange={() => handleAvatarSelection('uploaded')}
                          />
                          <label htmlFor="uploaded-checkbox">
                            <img className="uploaded-image" src={userUploadedAvatar} alt="Uploaded Avatar" />
                          </label>
                        </div>
                      </div>
                    )}
                    {providerData?.providerId === 'google.com' && user?.photoURL && (
                      <div className="checkbox-container">
                        <div className="checkbox__circle">
                          <input
                            type="checkbox"
                            id="google-checkbox"
                            checked={selectedAvatar === (user.photoURL ?? '')}
                            onChange={() => handleAvatarSelection(user.photoURL ?? '')}
                          />
                          <label htmlFor="google-checkbox">
                            <img className="google-image" src={user.photoURL} alt="Google profile" />
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
