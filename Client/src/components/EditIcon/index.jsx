import { FiEdit } from "react-icons/fi";
import { IconContext } from "react-icons";
import '../Styles/Feed.css';

const DeleteIcon = () => {
  return (
    <IconContext.Provider value={{className: "delete"}}>
    <FiEdit />
  </IconContext.Provider>
  );
}

export default DeleteIcon;

