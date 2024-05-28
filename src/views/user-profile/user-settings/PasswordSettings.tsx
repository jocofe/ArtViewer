import { Button } from "../../../components/Buttons/Buttons";

export const PasswordSettings = () => {
  return(
    <div className="settings">
    <p>Old password</p>
    <input 
      type="text"
    />
    <p>New password</p>
    <input 
      type="text" 
    />
  <div className="settings-btn">
    <Button size="small">Save changes</Button>
  </div>
</div>
  );
};
