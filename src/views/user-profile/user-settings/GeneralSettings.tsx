import { useContext, useEffect, useState } from "react";
import { Button } from "../../../components/Buttons/Buttons";
import { UserContext } from "../../../context/UserContextProvider";
import { auth, db } from "../../../config/config";
import { doc, updateDoc } from "firebase/firestore";
import { updateEmail } from "firebase/auth";

export const GeneralSettings = () => {
  const { userData } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (userData) {
      setUsername(userData.username || '');
      setEmail(userData.email || '')
    }
  }, [userData]);


  const handleSaveChanges = async () => {
    setMessage(null); // Reset the message
    const user = auth.currentUser;
    if (user && user.email) {
      const userEmail = user.email;

      try {
        const userDocRef = doc(db, 'users', userEmail);

        await updateDoc(userDocRef, {
          name: username,
          email: email,
        });

        // Optionally update the email in Firebase Authentication
        if (email !== user.email) {
          await updateEmail(user, email);
        }

        setMessage('Changes saved successfully');
      } catch (error) {
        console.error('Error updating user data:', error);
        setMessage('Failed to save changes');
      }
    }
  };

  return (
    <div className="settings">
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
        <Button size="small" onClick={handleSaveChanges}>Save changes</Button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};
