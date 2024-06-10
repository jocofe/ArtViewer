import { FormEvent, useState } from 'react';
import { Button } from '../../../components/Buttons/Buttons';
import { changePassword } from '../../../features/authentication/changePassword';
import { useClearsMessage } from '../../../hooks/useClearMessage';

export const PasswordSettings = () => {
  const { error, setError, message, setMessage } = useClearsMessage();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Verify that inputs are not empty
    if (!oldPassword || !newPassword) {
      setError('Please fill both password fields');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
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
        setError('Incorrect old password.');
      } else {
        setError('Error changing password');
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
        <div className="settings-btn">
          <Button size="small" type="submit">
            Save changes
          </Button>
        </div>
        {message && (
            <p className='settings-message'>{message}</p>
          )}
          {error && (
            <p className='settings-error'>{error}</p>
          )}
      </form>
    </>
  );
};
