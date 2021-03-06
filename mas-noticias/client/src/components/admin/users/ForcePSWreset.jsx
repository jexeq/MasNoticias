import { withFirebase } from "../../firebase/index";
import "./ButtonUsers.css";

const ForcePasswordResetButton = (props) => (
  <div>
    <ForcePasswordReset props={props} />
  </div>
);

function ForcePasswordResetBase(props) {
  
  var users = props.props.users;
  var setChanged = props.props.setChanged;
  var changed = props.props.changed;
  

  const handlePasswordReset = async (event, users) => {
    
    event.preventDefault();
    let aux = [];

    users.forEach((u) => {
      aux.push(
        props.firebase.doPasswordReset(u.email).catch((error) => {
          alert("se ha producido un error: ", error.message);
        })
      );
    });

    try {
      var forced = await Promise.all(aux);

      if (forced) {
        alert(
          "Se Forzó el cambio de contraseña para los usuarios seleccionados"
        );
      }

      setChanged(!changed);
    } catch (err) {
      console.log("se produjo un error en Promise.all : ", err.message);
    }
  };

  return (
    <div>
      <button id="buttonusers" onClick={(e) => handlePasswordReset(e, users)}>
        Forzar Reset de Contraseña
      </button>
    </div>
  );
}

export default ForcePasswordResetButton;

const ForcePasswordReset = withFirebase(ForcePasswordResetBase);

export { ForcePasswordReset };
