import { TopBar } from "./layouts/Topbar/TopBar";
import { Footer } from "./layouts/Footer/Footer";
import { IconButton } from "./components/Buttons/IconButton";
import { Menu } from "./components/Icons/icons";
import { ArtCard } from "./components/ArtCard/ArtCard";
import { Button } from "./components/Buttons/Buttons";
import "./styles/index.scss";
import { SignIn } from "./features/authentication/SignIn";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/config";
import { SignUp } from "./features/authentication/SingUp";
import { DropdownButton } from "./components/Buttons/DropdownBtn";

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
          <Button label="Primary" size="small" type="primary"/>
          <Button label="Primary" type="primary" size='medium'/>
          <Button label="Primary" size="large" type="primary"/>
        </div>
        <div>
          <Button label="SubPrimary" type="sub_primary" size="small"/>
          <Button label="SubPrimary" type="sub_primary" size='medium'/>
          <Button label="SubPrimary" type="sub_primary" size="large"/>
        </div>
        <div>
          <Button label="Secondary" type="secondary" size="small"/>
          <Button label="Secondary" type="secondary" size='medium'/>
          <Button label="Secondary" type="secondary" size="large"/>
        </div>
        <div>
          <Button label="Default" type="default" size="small"/>
          <Button label="Default" type="default" size='medium'/>
          <Button label="Default" type="default" size="large"/>
        </div>
        <DropdownButton 
        label="Example" 
        options={['Example', 'Example']}  
        onOptionSelect={(option) => {option}} />
      <SignIn />
      <SignUp />
      <IconButton icon={<Menu />} onClick={() => (console.log('clicked'))} />
      <TopBar /> 
      <Footer/>
    </>
  );
}

export default App;
