import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContextProvider';

export const DefaultAvatar = () => {
  const { userData } = useContext(UserContext); // Obtenemos los datos del usuario del contexto
  const [initial, setInitial] = useState<string | null>(null);

  useEffect(() => {
    if (userData && userData.name) {
      setInitial(userData.name.charAt(0));
    }
  }, [userData]); // Actualizamos el estado cuando cambia userData

  return <div className="avatar-default">{initial}</div>;
};
