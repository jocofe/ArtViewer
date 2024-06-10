import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContextProvider';
import { Loading } from '../Icons/icons';
import { useClearsMessage } from '../../hooks/useClearMessage';

export const DefaultAvatar = () => {
  const { userData } = useContext(UserContext); // Obtenemos los datos del usuario del contexto
  const [initial, setInitial] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { error, setError } = useClearsMessage();

  useEffect(() => {
    if (userData && userData.name) {
      setInitial(userData.name.charAt(0));
      setIsLoading(false);
    } else {
      setError('Error setting default avatar');
      setIsLoading(false);
    }
  }, [userData]); // Actualizamos el estado cuando cambia userData

  if (isLoading) {
    return <div><Loading className='loading-animation'/></div>;
  };

  if (error) {
    return <div>{error}</div>;
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