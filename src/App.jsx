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
        <button type="button" onClick={() => setPopup(true)}>
          Click Me!
        </button>
      )}
    </>
  );
}

export default App;
