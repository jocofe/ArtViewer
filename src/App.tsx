import ArtDetails from "./components/ArtDetails";
import Button from "./components/Buttons/Buttons"
import "./components/Buttons/_buttons-style.scss";
import { SignIn } from "./components/Auth/SignIn";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/config";
import { SignUp } from "./components/Auth/SingUp";


export const Firebase = initializeApp(firebaseConfig);

function App() {
  return (
    <>
      <h1>Art Viewer</h1>
      <p >
        Pruebas
      </p>
      <ArtDetails />
        <Button label="Small" size="small" />
        <Button label="Default" />
        <Button label="Large"size="large" />
      <SignIn />
      <SignUp />
    </>
  );
}

export default App;
