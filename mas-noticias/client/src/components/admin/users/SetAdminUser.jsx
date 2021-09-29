import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions/user/userActions";
import "./ButtonUsers.css";

export default function SetAdminUser(props) {
  const dispatch = useDispatch();

  var users = props.users;
  var setChanged = props.setChanged;
  var changed = props.changed;
  
  var aux = [];

  function toogleAdmin(e, users) {
    users.forEach((u) => {
      if(u.type != "admin") {
        aux.push({ id: u.id, changes: { type: "admin" } });
      }
      if(u.type === "admin") {
        aux.push({ id: u.id, changes: { type: "editor" } });
      }
    });
    dispatch(updateUser(aux));
    setChanged(!changed);
    
    aux = [];
  }

  return (
    <div>
      <button id="buttonusers" onClick={(e) => toogleAdmin(e, users)}>
        Otorgar / Quitar Permisos de Admin
      </button>
    </div>
  );
}
