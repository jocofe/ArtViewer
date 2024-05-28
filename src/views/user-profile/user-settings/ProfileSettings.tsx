import { doc, updateDoc } from "firebase/firestore";
import { DefaultAvatar } from "../../../components/Avatar/DefaultAvatar";
import { Button } from "../../../components/Buttons/Buttons";
import { db, storage } from "../../../config/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useRef, useState } from "react";
import { ProfileImageProps, useUserProfilePhoto } from "../../../hooks/useUserProfileImg";
import { UserContext } from "../../../context/UserContextProvider";

export const ProfileSettings = () => {
  const { userData, updateUserProfilePhoto } = useContext(UserContext);
  const userProfilePhoto: ProfileImageProps | null = useUserProfilePhoto();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>(userData?.name || '');
  const [location, setLocation] = useState<string>(userData?.location || '');

  const handleChooseBtnClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const storageRef = ref(storage, `avatars/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      if ( userData?.email) {
        const userDocRef = doc(db, 'users', userData.email);
        await updateDoc(userDocRef, { photoURL: url }); // Actualizar el estado en el context
        updateUserProfilePhoto(url) // Actualiza la imagen que se muestra
      }
    }
  };

  const handleSaveChanges = async () => {
    if (userData?.email) {
      const userDocRef = doc(db, 'users', userData.email);
      await updateDoc(userDocRef, { name, location });
    }
  };

  return (
    <div className="settings">
      <div className="settings-picture">
        <div className="profile-picture-settings">
          {userProfilePhoto && userProfilePhoto.imageUrl !== 'default' ? (
            <img src={userProfilePhoto.imageUrl} alt="User Profile" className="profilecard-image" />
          ) : (
            <div className="profile-picture-settings">
              <DefaultAvatar />
            </div>
          )}
        </div>
        <Button color="sub_primary" onClick={handleChooseBtnClick}>Upload new picture</Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept="image/*"
        />
        <Button color="sub_primary">Delete</Button>
      </div>
      <p>Name</p>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Location</p>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <div className="settings-btn">
        <Button size="small" onClick={handleSaveChanges}>Save changes</Button>
      </div>
    </div>
  );
};
