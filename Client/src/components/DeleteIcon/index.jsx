import { TiDeleteOutline } from "react-icons/ti";
import { IconContext } from "react-icons";
import '../Styles/Feed.css';

const DeleteIcon = () => {
  return (
  <IconContext.Provider value={{className: "delete"}}>
    <TiDeleteOutline />
  </IconContext.Provider>
  );
}

export default DeleteIcon;

