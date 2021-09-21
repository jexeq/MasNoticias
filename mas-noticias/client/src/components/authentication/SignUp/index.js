import React from 'react';
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { createUser, clearUser } from '../../../redux/actions/user/userActions';
import { sendEmailConfirmation } from '../../../redux/actions/email/emailActions';
import { withFirebase } from '../../firebase/index';
// import * as ROUTES from '../../../routes';
import { validateUserName, validateUserEmail } from "./errorsControl"

import { NavLink } from 'react-router-dom';
import './index.css';


const SignUpPage = () => (
  <div style={{marginTop: "5%"}}>
    <SignUpForm />
  </div>
);

const initial_state = {
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

function SignUpFormBase(props) {

  const storeUser = useSelector(state => state.userReducer.user)
  const dispatch = useDispatch();
  


  var [state, setState] = useState(initial_state)
  // var [loading, setLoading] = useState(true)
 
  var [emailError, setEmailError] = useState(false)

  const onSubmitHandler = async (e) => {

    const { name, lastname, email, passwordOne } = state;
    e.preventDefault();

    try {
      var authUser = await props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne);
      var userOk = {
        id: authUser.user.uid,
        name,
        lastname,
        email,
       
      }
      if (authUser.user.uid !== undefined) {
        dispatch(createUser(userOk))
        setState({ ...initial_state })
      } else {
        throw new Error("Se produjo un Error, por favor contactar al administrador")
      }
    } catch (error) {
      setState({ ...state, error: error })
    }
  }

  const onChangeHandler = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
    
    if (e.target.name === "email") {
      
        var validated = await validateUserEmail(e.target.value)
        setEmailError(validated)
      
    }
  }

  const { name, lastname, email, passwordOne, passwordTwo, error,} = state;

  const isInvalid =
    (passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      name === '');

  useEffect(() => {
    if (storeUser.email) {
      Swal.fire({
        icon:"success",
        title:"Correcto",
        text:"Verifica tu casilla de correo por favor",
        confirmButtonText:"Ok",
        confirmButtonColor:"#FF3001"
      })
      dispatch(sendEmailConfirmation(storeUser))
      dispatch(clearUser())
      props.history.push("/")
    }
  }, [storeUser])



  return  (
    <div className="container">
      <h3 className="mb-4 text-center fs-1">Registrarse</h3>
      <form onSubmit={onSubmitHandler} >
        <div className="row items-center">
          <div className="col-md-6">
            <div className="mb-3 mt-3">
              <label style={{ marginLeft: "3px" }}>Nombre</label>
              <input
                name="name"
                value={name}
                onChange={onChangeHandler}
                type="text"
                placeholder="Nombre"
                className="form-control"
              />
            </div>
            <div hidden={name.length > 3 || name.length === 0}
              className="alert alert-primary" role="alert">
              El Nombre de usuario debe contar con al menos 4 caracteres
            </div>
           
            <div className="mb-3 mt-3">
              <label style={{ marginLeft: "3px" }}>Apellido</label>
              <input
                name="lastname"
                value={lastname}
                onChange={onChangeHandler}
                type="text"
                placeholder="Apellido"
                className="form-control"
              />
            </div>
            <div className="mb-3 mt-3">
              <label style={{ marginLeft: "3px" }}>Email</label>
              <input
                name="email"
                value={email}
                onChange={onChangeHandler}
                type="text"
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div hidden={!emailError} className="alert alert-danger" role="alert">
              El email ya se encuentra registrado
            </div>
            <div hidden={email.length>0?email.includes("@")?true:false:true} className="alert alert-danger" role="alert">
              El email debe incluir @
            </div>
            <div className="mb-3 mt-3">
              <label style={{ marginLeft: "3px" }}>Contraseña</label>
              <input
                name="passwordOne"
                value={passwordOne}
                onChange={onChangeHandler}
                type="password"
                placeholder="Contraseña"
                className="form-control"
              />
            </div>
            <div className="mb-3 mt-3">
              <label style={{ marginLeft: "3px" }}>Confirmar contraseña</label>
              <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChangeHandler}
                type="password"
                placeholder="Confirmar Contraseña"
                className="form-control"
              />
            </div>
            <div hidden={passwordOne === passwordTwo} className="alert alert-danger" role="alert">
              Las contraseñas deben coincidir
            </div>
          </div>
          
        </div>
        <div className="d-grip gap-2 mb-3 text-center mt-4">
          <button className="btn btn-dark btn-lg border-0 rounded-0" disabled={isInvalid || emailError} type="submit">Registrarse</button>
        </div>
        {error && <p className='text-danger text-center'>{error.message}</p>}
      </form>
    </div>
  )
  //  : (<h2 className="text-center text-dark mt-5">Cargando...</h2>);
}

const SignUpLink = () => {
  return (<div>
    <hr />
    <NavLink className="text-dark" to={"/signup"}>crear cuenta</NavLink>
  </div>)
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };