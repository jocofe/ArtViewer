import ArtDetails from "./components/ArtDetails";
import Button from "./components/Buttons/Buttons"
import "./components/Buttons/_buttons-style.scss";




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
    </>
  );
}

export default App;
