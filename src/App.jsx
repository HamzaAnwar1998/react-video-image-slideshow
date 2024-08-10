import { useState } from "react";
import Popup from "./Popup";

function App() {
  // popup
  const [popup, setPopup] = useState(true);

  return (
    <>
      {popup ? (
        <Popup setPopup={setPopup} />
      ) : (
        <>
          <h1>React Video/Image Slideshow</h1>
          <button type="button" onClick={() => setPopup(true)}>
            Click Me To Start Slideshow!
          </button>
        </>
      )}
    </>
  );
}

export default App;
