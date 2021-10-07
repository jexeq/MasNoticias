import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../redux/actions/user/userActions';

import { withFirebase } from '../../firebase/index';


function LogOutButton() {
  
  return (
    <SignOutButton  />
  )
}


function SignOutButtonBase(props) {
  const dispatch = useDispatch();
  
  function clickHandler() {
    
    try {
      props.firebase.doSignOut();
      
      localStorage.setItem("mas-noticias", "guest")
      
      localStorage.setItem("admin", null)
      dispatch(clearUser());
      props.history.push('/')
    } catch (error) {
      console.log(error.message);
    }

  }

  return (

    <button className="btn btn-dark" type="button" onClick={clickHandler} >
      Salir
    </button>
  );
}

const SignOutButton = compose(
  withRouter,
  withFirebase,
)(SignOutButtonBase);

export default LogOutButton;
export { SignOutButton }
