import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContextProvider';
import { Loading } from '../Icons/icons';

export const DefaultAvatar = () => {
  const { userData } = useContext(UserContext); // Obtenemos los datos del usuario del contexto
  const [initial, setInitial] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData && userData.name) {
      setInitial(userData.name.charAt(0));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [userData]); // Actualizamos el estado cuando cambia userData

  if (isLoading) {
    return <div><Loading className='loading-animation'/></div>;
  };

  return (
    <div className="avatar-default">
      {userData?.picture ? (
         <img src={userData.picture} alt="User Profile" className="avatar-default" />
      ) : (
        initial
      )}
    </div>
    );
};