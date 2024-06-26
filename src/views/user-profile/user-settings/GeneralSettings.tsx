import { useContext, useEffect, useState } from "react";
import { Button } from "../../../components/Buttons/Buttons";
import { UserContext } from "../../../context/UserContextProvider";
import { auth, db } from "../../../config/config";
import { doc, updateDoc } from "firebase/firestore";
import { updateEmail } from "firebase/auth";
import { useClearsMessage } from "../../../hooks/useClearMessage";

export const GeneralSettings = () => {
  const { userData } = useContext(UserContext);
  const { message, setMessage, error, setError } = useClearsMessage();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (userData) {
      setUsername(userData.username || '');
      setEmail(userData.email || '')
    }
  }, [userData]);


  const handleSubmitChanges = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = auth.currentUser;
    if (user && user.email) {
      const userEmail = user.email;

      try {
        const userDocRef = doc(db, 'users', userEmail);

        await updateDoc(userDocRef, {
          username: username,
          email: email,
        });

        // Optionally update the email in Firebase Authentication
        if (email !== user.email) {
          await updateEmail(user, email);
        }
        setMessage('Your changes have been succesfully saved!');
      } catch (error) {
        setError('Failed to save changes');
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitChanges} className="settings">
        <p>Username</p>
        <input 
          type="text"
          placeholder={username}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <p>Email</p>
        <input 
          type="text" 
          placeholder={email}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="settings-btn">
          <Button size="small" type="submit">Save changes</Button>
        </div>
        {message && !error && ( 
          <p className="settings-message">{message}</p>
        )}
        {error && !message && (
          <p className="settings-error">{error}</p>
        )}
      </form>
    </>
  );
};
