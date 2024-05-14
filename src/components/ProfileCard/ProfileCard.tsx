import { ProfileImageProps, useUserProfilePhoto } from '../../hooks/useUserProfileImg';
import { DefaultAvatar } from '../Avatar/DefaultAvatar';
import { Button } from '../Buttons/Buttons';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContextProvider';

export const ProfileCard = () => {
  const userProfilePhoto: ProfileImageProps | null = useUserProfilePhoto();
  const { userData } = useContext(UserContext);
  const [fullName, setFullName] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    if (userData && userData.name && userData.location) {
      setFullName(userData.name);
      setLocation(userData.location);
    }
  }, [userData]);

  return (
    <div className="profilecard-wrapper">
      <div className="profile-picture">
        {userProfilePhoto && userProfilePhoto.imageUrl !== 'default' ? (
          <img src={userProfilePhoto.imageUrl} alt="User Profile" className="profilecard-image" />
        ) : (
          <DefaultAvatar />
        )}
      </div>
      <div className="profilecard-info">
        <h1 className="h3 profilecard__name">{fullName}</h1>
        <h3 className="h4 profilecard__location">{location}</h3>
        <Button className="edit-btn" type="sub_primary">
          Edit Profile
        </Button>
      </div>
    </div>
  );
};
