import { DefaultAvatar } from '../Avatar/DefaultAvatar';
import { Button } from '../Buttons/Buttons';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContextProvider';
import { NavLink } from 'react-router-dom';

export const ProfileCard = () => {
  const { userData } = useContext(UserContext);
  const [fullName, setFullName] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [picture, setPicture] = useState<string | null>(null);

  useEffect(() => {
    if (userData && userData.name && userData.location && userData.picture) {
      setFullName(userData.name);
      setLocation(userData.location);
      setPicture(userData.picture);
    }
  }, [userData]);

  return (
    <div className="profilecard-wrapper">
      <div className="profile-picture">
        {picture ? <img src={picture} alt="User Profile" className="profilecard-image" /> : <DefaultAvatar />}
      </div>
      <div className="profilecard-info">
        <h1 className="h3 profilecard__name">{fullName}</h1>
        <h3 className="h4 profilecard__location">{location}</h3>
        <Button component={NavLink} to={`settings/general`} className="btn-link--black" color="sub_primary">
          Edit Profile
        </Button>
      </div>
    </div>
  );
};
