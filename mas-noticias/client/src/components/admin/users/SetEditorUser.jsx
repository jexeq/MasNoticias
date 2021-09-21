import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions/user/userActions";
import "./ButtonUsers.css";

export default function SetEditorUser(props) {
  const dispatch = useDispatch();

  var users = props.users;
  var setChanged = props.setChanged;
  var changed = props.changed;
  
  var aux = [];

  function toogleEditor(e, users) {
    users.forEach((u) => {
      if(u.type != "editor") {
        aux.push({ id: u.id, changes: { type: "editor" } });
      }
      if(u.type === "editor") {
        aux.push({ id: u.id, changes: { type: "guest" } });
      }
    });
    dispatch(updateUser(aux));
    setChanged(!changed);
    
    aux = [];
  }

  return (
    <div>
      <button id="buttonusers" onClick={(e) => toogleEditor(e, users)}>
        Otorgar / Quitar Permisos de Editor
      </button>
    </div>
  );
}