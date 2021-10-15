import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions/user/userActions";
import "./ButtonUsers.css";

export default function BannAdminUser(props) {
  const dispatch = useDispatch();

  var users = props.users;
  var setChanged = props.setChanged;
  var changed = props.changed;
  var aux = [];

  function toogleActive(e, users) {
    users.forEach((u) => {
      aux.push({ id: u.id, changes: { active: !u.active } });
    });
    dispatch(updateUser(aux));
    setChanged(!changed);
    console.log("changed AHORA ES es: ", changed);
  }

  return (
    <div>
      <button id="buttonusers" onClick={(e) => toogleActive(e, users)}>
        Habilitar/Inhabilitar Usuarios
      </button>
    </div>
  );
}
