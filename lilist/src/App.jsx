import React, { useState, useEffect } from "react";

import ToDo from "./components/ToDo";
import Popup from "./components/Popup";
import axios from "axios";
import { baseURL } from "./utils/constant";
const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setinput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent,setPopupContent]=useState({});
  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);
  const saveToDo = () => {
    axios
      .post(`${baseURL}/save`, { toDo: input })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setinput("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">Little Memo</h1>
      <div>
        <h4 className ="subheading">Stay Organized, Stay Simple with Little Memo</h4>
      </div>
        <div className="input_holder">
          <input
            value={input}
            onChange={(e) => setinput(e.target.value)}
            type="text"
            placeholder="Add a ToDo...."
          />
          <button onClick={saveToDo}>Add</button>
        </div>
        <div className="list">
          {toDos.map((e1) => (
            <ToDo
              key={e1._id}
              text={e1.toDo}
              id={e1._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
            />
          ))}
        </div>
      </div>
      {showPopup && <Popup  setShowPopup={setShowPopup} popupContent={popupContent} setUpdateUI={setUpdateUI}/>}
    </main>
  );
};

export default App;
