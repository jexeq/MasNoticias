import { useHistory } from "react-router";
import './NotFound.css';

export default function NotFound() {
  var history = useHistory();

  function handleClick() {
    history.push("/");
  }
  return (
    <div className="not-found text-center" style={{marginTop:"150px"}}>
      <img
        className="not-found"
        src="https://onlinezebra.com/wp-content/uploads/2019/01/error-404-not-found.jpg"
        alt="404 - No se encontró la Página solicitada"
      />
      {/* <Link to='/Home' style={{ textDecoration: 'none' }}> */}
      <button
        className="btn btn-block btn-black rm-border"
        onClick={handleClick}
      >
        Volver al Inicio!
      </button>
      {/* </Link> */}
    </div>
  );
}