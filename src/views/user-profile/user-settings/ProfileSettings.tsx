import { doc, updateDoc } from "firebase/firestore";
import { DefaultAvatar } from "../../../components/Avatar/DefaultAvatar";
import { Button } from "../../../components/Buttons/Buttons";
import { db, storage } from "../../../config/config";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../context/UserContextProvider";

export const ProfileSettings = () => {
  const { userData, updateUserProfilePhoto, updateUserProfileName } = useContext(UserContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [picture, setPicture] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string>(userData?.name || '');
  const [location, setLocation] = useState<string>(userData?.location || '');

  useEffect(() => {
    if (userData) {
      setPicture(userData.picture || undefined);
    }
  }, [userData]);

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
        await updateDoc(userDocRef, { picture: url }); // Actualizar el estado en el context
        updateUserProfilePhoto(url) // Actualiza la imagen que se muestra
      }
    }
  };

  const handleFileDelete = async () => {
    if (userData?.email) {
      const userDocRef = doc(db, 'users', userData.email);

      // Obtener referencia a la imagen actual
      if (picture && picture !== 'default') {
        const pictureRef = ref(storage, picture);

        // Borrar la imagen del almacenamiento
        try {
          await deleteObject(pictureRef);
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      }

      // Actualizar el documento del usuario en Firestore para establecer picture en null
      await updateDoc(userDocRef, { picture: null });

      // Actualizar el estado y el contexto
      updateUserProfilePhoto(null);
      setPicture(undefined);
    }
  };;

  const handleSaveChanges = async () => {
    if (userData?.email) {
      const userDocRef = doc(db, 'users', userData.email);
      await updateDoc(userDocRef, { name, location });

      //Actualizar el nombre en el contexto
      updateUserProfileName(name)
    }
  };

  return (
    <div className="settings">
      <div className="settings-picture">
        <div className="profile-picture-settings">
        {picture && picture !== 'default' ? (
            <img src={picture} alt="User Profile" className="profilecard-image" />
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
        <Button color="sub_primary" onClick={handleFileDelete}>Delete</Button>
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