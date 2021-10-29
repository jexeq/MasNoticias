import { withFirebase } from '../../firebase/index';
// import * as ROUTES from '../../../routes';
import { useState } from 'react';


import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';

const PasswordForgetPage = () => {
  return (
    <div>
      <PasswordForgetForm />
    </div>)
};

const INITIAL_STATE = {
  email: '',
  error: null,
};

function PasswordForgetFormBase(props) {
  const [state, setState] = useState(INITIAL_STATE)
  var history = useHistory();


  const onSubmit = event => {
    const { email } = state;

    props.firebase
      .doPasswordReset(email)
      .then(() => {
        setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        setState({ error });
      });
    alert("verifica tu casilla de correo para continuar")
    history.push('/')
    event.preventDefault();
  };

  const onChange = event => {
    setState({ [event.target.name]: event.target.value });
  };

  const { email, error } = state;

  const isInvalid = email === '';

  return (
    <div >
      <div style={{ marginTop: "10%" }} className="container">
        <div className="row content d-flex justify-content-center">
          <div className="col-md-5">
            <div className="box shadow bg-white p-4">
              <h3 className="mb-4 text-center fs-1">¿Olvidaste tu contraseña?</h3>
              <form className="mb-3" onSubmit={onSubmit}>
                <div className="form mb-3">
                  <label htmlFor="floatingInput">Ingresa tu email</label>
                  <input
                    name="email"
                    value={state.email}
                    onChange={onChange}
                    type="text"
                    placeholder="Direccion de email"
                    className="form-control"
                    id="floatingInput"
                  />
                </div>
                <div className="d-grip gap-2 mb-3 text-center">
                  <button className="btn btn-dark btn-lg border-0 rounded-0" disabled={isInvalid} type="submit">
                    Resetear contraseña
                  </button>
                </div>

                {error && <p className="text-danger text-center">{error.message}</p>}
              </form>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

const PasswordForgetLink = () => (
  <div className='container d-flex align-items-center justify-content-center'>
    <NavLink className="btn btn-dark" to={"/password-forget"}>Olvidé mi contraseña</NavLink>
  </div>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };