import { FormEvent, useState } from "react";
import { Button } from "../../../components/Buttons/Buttons";
import { changePassword } from "../../../features/authentication/ChangePassword";



export const PasswordSettings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('change password button clicked');
    // Verify that inputs are not empty
    if(!oldPassword || !newPassword) {
      setMessage('Please fill both password fields');
      return;
    }

    console.log('old password', oldPassword);
    console.log('New Password', newPassword);
    try {
      await changePassword(oldPassword, newPassword);
      setMessage('');
      setOldPassword('');
      setNewPassword('');

    } catch (error) {
      setMessage('Error changing password');
    }
    setMessage('password changed succesfully');
  }
  return(
    <div className="settings">
      <form onSubmit={handleChangePassword}>
    <p>Old password</p>
    <input 
      type="password"
      value={oldPassword}
      onChange={(event) => setOldPassword(event.target.value)}
    />
    <p>New password</p>
    <input 
      type="password" 
      value={newPassword}
      onChange={(event) => setNewPassword(event.target.value)}
    />
    <p>{message}</p>
  <div className="settings-btn">
    <Button size="small" type="submit">Save changes</Button>
  </div>
  </form>
</div>
  );
};
