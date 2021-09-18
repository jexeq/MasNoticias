import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../redux/actions/user/index';

import { withFirebase } from '../../FireBase/context';


function LogOutButton() {
  
  return (
    <SignOutButton />
  )
}


function SignOutButtonBase(props) {
  const dispatch = useDispatch();
  

  function clickHandler() {
    
    try {
      props.firebase.doSignOut();
      
      localStorage.setItem("pg_merceria", "guest")
      
      localStorage.setItem("admin", null)
      dispatch(clearUser());
      props.history.push('/')
    } catch (error) {
      console.log(error.message);
    }

  }

  return (

    <button type="button" onClick={clickHandler} className="btn btn-block btn-black rm-border">

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
// export default withFirebase(SignOutButton);


// export function SignOutButton  ({ firebase }) {
//     return (<button type="button" onClick={firebase.doSignOut}>
//     Sign Out
//   </button>)

// }



// export default withFirebase(SignOutButton);

// export {SignOutButton};