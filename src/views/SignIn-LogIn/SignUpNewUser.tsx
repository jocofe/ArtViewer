import { useState, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth, storage } from '../../config/config';
import { Link, useNavigate } from 'react-router-dom';
import { IconLogotype, Logotype } from '../../components/Icons/icons';
import { Button } from '../../components/Buttons/Buttons';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FormNewUserInputs } from '../../models/forms';
import { useGetRandomImgApi } from '../../hooks/useGetRandomImgApi';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const SignUpNewUser = () => {
  const apiUrl = 'https://api.vam.ac.uk/v2/objects/search?q=oil%20canvas&min_length=2&max_length=16&images_exist=true&order_sort=asc&page=1&page_size=15&cluster_size=20&images=false&random=false';
  const { imageId, loading, systemNumber } = useGetRandomImgApi(apiUrl);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormNewUserInputs>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [userUploadedAvatar, setUserUploadedAvatar] = useState<string | null>(null);
  const user = auth.currentUser;
  const providerData = user?.providerData[0];
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isCollapse = useMediaQuery('(max-width: 1100px)');


  const onSubmit: SubmitHandler<FormNewUserInputs> = async data => {
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
        await updateDoc(userRef, {
          picture: userUploadedAvatar || selectedAvatar,
          username: data.username,
          location: data.location,
          updatedAt: new Date(),
        });
        console.log('User data added to Firestore successfully!');
        navigate('/');
      } else {
        console.error('No user email found');
      }
    } catch (error) {
      console.error('Error adding user data to Firestore:', error);
    } finally {
      setIsSubmitting(false); // Establecer isSubmitting en false independientemente del resultado del envío del formulario
    }
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
      handleAvatarSelection(url);
    }
  };

  return (
    <div className="newuser-wrapper">
      <div className="newuserpanel-wrapper">
        <div className="topbar topbar--black">
          <Link to={'/'}>{isCollapse ? <IconLogotype className="icon" /> : <Logotype className="logotype" />}</Link>
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
                  <div className="selector-wrapper">
                    <Button
                      type="button"
                      className="choose-btn"
                      color="sub_primary"
                      onClick={() => {
                        handleChooseBtnClick(); // Llamar a la función handleChooseBtnClick para abrir el explorador de archivos
                      }}
                    >
                      Upload Image
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <h5>Upload an image or choose one of our defaults</h5>
                    <div className="options-selector">
                      {providerData?.providerId === 'google.com' && user?.photoURL && (
                        <div className="checkbox-container">
                          <div className="checkbox__circle">
                            <input
                              type="checkbox"
                              id="google-checkbox"
                              checked={selectedAvatar === user.photoURL}
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
                      {userUploadedAvatar && (
                        <div className="checkbox-container">
                          <div className="checkbox__circle">
                            <input
                              type="checkbox"
                              id="uploaded-checkbox"
                              checked={selectedAvatar === userUploadedAvatar}
                              onChange={() => handleAvatarSelection(userUploadedAvatar)}
                            />
                            <label htmlFor="uploaded-checkbox">
                              <img className="uploaded-image" src={userUploadedAvatar} alt="Uploaded profile" />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Button type="submit" className="submit-btn btn-link--black" disabled={isSubmitting}>
                Continue
              </Button>
            </form>
          </div>
        </div>
      </div>
      {!loading && imageId && (
        <div
          className={`imgnewuser-wrapper`}
          key={imageId}
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: `url(https://framemark.vam.ac.uk/collections/${imageId}/full/full/0/default.jpg)`,
          }}
        >
          {loading ? <div>Loading...</div> : null}
          <Link className="expanded-anchor" to={`/art-piece/${systemNumber}`}></Link>
        </div>
      )}
    </div>
  );
};
