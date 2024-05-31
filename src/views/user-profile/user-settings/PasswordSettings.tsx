import { FormEvent, useState } from 'react';
import { Button } from '../../../components/Buttons/Buttons';
import { changePassword } from '../../../features/authentication/changePassword';

export const PasswordSettings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('change password button clicked');
    // Verify that inputs are not empty
    if (!oldPassword || !newPassword) {
      setMessage('Please fill both password fields');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);
      setMessage('Password changed succesfylly');
      setOldPassword('');
      setNewPassword('');
    } catch (error: unknown) {
      const firebaseError = error as Error;
      if (firebaseError.message === 'Incorrect old password.') {
        setMessage('Incorrect old password.');
      } else {
        setMessage('Error changing password');
      }
    }
  };

  return (
    <>
      <form onSubmit={handleChangePassword} className="settings">
        <p>Old password</p>
        <input type="password" value={oldPassword} onChange={event => setOldPassword(event.target.value)} />
        <p>New password</p>
        <input type="password" value={newPassword} onChange={event => setNewPassword(event.target.value)} />
        <p className="error">{message}</p>
        <div className="settings-btn">
          <Button size="small" type="submit">
            Save changes
          </Button>
        </div>
      </form>
    </>
  );
};
