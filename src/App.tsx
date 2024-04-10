import { ArtCard } from "./components/ArtCard/ArtCard";
import { Button } from "./components/Buttons/Buttons";
import "./styles/index.scss";
import { SignIn } from "./features/authentication/SignIn";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/config";
import { SignUp } from "./features/authentication/SingUp";

export const Firebase = initializeApp(firebaseConfig);

function App() {
  return (
    <>
      <h1>Art Viewer</h1>
      <p >
        Pruebas
      </p>
      <ArtCard
      imageURL="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1920px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg"
      title="The birth of Venus"
      author="Boticelli"
      date="1480"
      />
        <div>
          <Button label="Primary" size="small"/>
          <Button label="Primary"/>
          <Button label="Primary" size="large"/>
        </div>
        <div>
          <Button label="SubPrimary" type="sub_primary" size="small"/>
          <Button label="SubPrimary" type="sub_primary"/>
          <Button label="SubPrimary" type="sub_primary" size="large"/>
        </div>
        <div>
          <Button label="Secondary" type="secondary" size="small"/>
          <Button label="Secondary" type="secondary"/>
          <Button label="Secondary" type="secondary" size="large"/>
        </div>
        <div>
          <Button label="Default" type="default" size="small"/>
          <Button label="Default" type="default"/>
          <Button label="Default" type="default" size="large"/>
        </div>
      <SignIn />
      <SignUp />
    </>
  );
}

export default App;
