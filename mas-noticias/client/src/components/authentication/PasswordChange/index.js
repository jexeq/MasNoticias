
import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../FireBase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../routes'
import NotFound from '../../../views/NotFound/NotFound';
import "./index.css"
import { deleteReview } from './../../../redux/actions/review/index';

const PasswordChangePage = () => {

  const authUser = localStorage.getItem("pg_merceria");

  return (<div>
    <PasswordChangeForm />
  </div>)
}


const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};



function PasswordChangeFormBase(props) {
  const [state, setState] = useState(INITIAL_STATE)
  const [isInvalid, setIsInvalid] = useState(true)


  const onSubmit = event => {

    const { passwordOne } = state;

    props.firebase
      .doPasswordUpdate(passwordOne)
      .doSignOut()
      .then(() => {
        //aqui debe ir el dispatch al back con la actuaizacion del PW
        setState({ ...INITIAL_STATE });
        props.history.push('/signin')
      })
      .catch(error => {
        setState({ error });
      });

    event.preventDefault()

  };

  const onChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };


  const { passwordOne, passwordTwo, error } = state;




  useEffect(() => {
    if (passwordOne !== passwordTwo || passwordOne === '') {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }
  }, [state])

  return (
    <form className="mb-3" onSubmit={onSubmit}>
      <fieldset className="fieldset password" style={{ display: "block" }}>
        <legend className="legend">
          <span className="change-email-password">Cambio de contraseña</span>
        </legend>
        <br />
        <div className="field password current required" style={{ display: "block" }}>
          <label className="label" htmlFor="current-password">
            <span>Contraseña actual</span>
          </label>
          <div className="control">
            <input
              id="current-password"
              name="currentPassword"
              value={passwordOne}
              onChange={onChange}
              type="password"
              placeholder="Contraseña Actual"
              className="form-control"
            />
          </div>
        </div>
        <div className="field new password required" style={{ display: "block" }}>
          <label className="label" htmlFor="password">
            <span>Nueva contraseña</span>
          </label>
          <div className="control">
            <input
              id="password"
              name="passwordOne"
              value={passwordOne}
              onChange={onChange}
              type="password"
              placeholder="Nueva Contraseña"
              className="form-control"
            />
          </div>
        </div>
        <div className="field confirm password required" style={{ display: "block" }}>
          <label className="label" htmlFor="password-confirmation">
            <span>Confirmar contraseña</span>
          </label>
          <div className="control">
            <input
              id="password-confirmation"
              name="passwordTwo"
              value={passwordTwo}
              onChange={onChange}
              type="password"
              placeholder="Confirmar nueva contraseña"
              className="form-control mt-3"
            />
          </div>
        </div>
        {isInvalid && state.passwordOne !== '' ? <div>las contraseñas deben coincidir</div> : null}
        <div className="actions-toolbar">
          <div className="primary">
          <button disabled={isInvalid} className="action save primary" type="submit">
             <span>Cambiar mi contraseña </span> 
          </button>
          </div>
        </div>
        {error && <p>{error.message}</p>}
      </fieldset>
    </form>
  );
}

const PasswordChangeLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_CHANGE}>Cambiar mi contraseña</Link>
  </p>
);


export default PasswordChangePage;

const PasswordChangeForm = withFirebase(PasswordChangeFormBase);

export { PasswordChangeForm, PasswordChangeLink };

