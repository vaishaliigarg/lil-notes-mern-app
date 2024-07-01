import React from 'react';
import axios from 'axios';
import { AiFillEdit} from "react-icons/ai";
import { AiOutlineCloseCircle} from "react-icons/ai";
import { baseURL } from '../utils/constant';
const ToDo = ({text,id,setUpdateUI,setShowPopup,setPopupContent}) => {

const deleteTodo=()=>{
  axios.delete(`${baseURL}/delete/${id}`).then(res=>{
    console.log(res.data);
    setUpdateUI((prevState)=>!prevState)
  });
};

const updateToDo=()=>{
  setPopupContent({text,id});
  setShowPopup(true);
}
  return (
    <div className='toDo'>{text}
    <div className="icons">
        <AiFillEdit className='icon' onClick={updateToDo}/>
        <AiOutlineCloseCircle className='icon' onClick={deleteTodo}/>
    </div>
    </div>
  );
};

export default ToDo;