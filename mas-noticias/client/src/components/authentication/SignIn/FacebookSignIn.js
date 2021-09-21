import { withFirebase } from '../../firebase/index'
import './google.css';
import {  useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFacebookUser, clearUser } from '../../../redux/actions/user/userActions';
import { useHistory } from 'react-router-dom';
import { sendEmailConfirmation } from '../../../redux/actions/email/emailActions';


const FacebookButton = (props) => {
  const history = useHistory();
  return (<div >
    <RenderButton props={props} history={history} />
  </div>)
}



const FacebookBase = (props) => {
  
  const { history } = props
  const dispatch = useDispatch();
  const storeUser = useSelector(state => state.userReducer.user);

  function handleFacebook(e) {
    props.firebase
      .doSignInwithFacebook()
      .then(credentials => {
        //capturo datos con credentials.additionalUserInfo.profile  .email o .family_name o .given_name
        var user = {
          id: credentials.user.uid,
          email: credentials.additionalUserInfo.profile.email,
          name: credentials.additionalUserInfo.profile.given_name,
          lastname: credentials.additionalUserInfo.profile.family_name,
        }
        console.log("userfromFirebase: " , user)
        dispatch(getFacebookUser(user))
        // console.log("paso el dispatch?")
      })
      .catch(err => alert(err.message))
  }

  useEffect(() => {
    console.log("se ejecuto dispatch")
  }, [getFacebookUser])


  useEffect(() => {
    if (storeUser?.active !== undefined) {
      //verifica el estado active del usuario
      if (storeUser.active === true) {
        //verifica si es admin
        if (storeUser.type === "admin") {
          localStorage.setItem("mas-noticias", (storeUser.id))
          localStorage.setItem("admin", storeUser.email)
          
          history.push('/');
        } else {
          //setea el id del usuario al sessionStorage
          localStorage.setItem("mas-noticias", storeUser.id)
          localStorage.setItem("admin", null)
          
          history.push('/');
        }
        
      } else {
        //si esta inactivo arroja un mensaje
        dispatch(sendEmailConfirmation(storeUser))
        dispatch(clearUser())
        alert('El usuario esta inhabilitado, verifique su casilla de correo para continuar con el proceso o contacte al adminsitrador')
        history.push('/')
      }

    } else {
      //si user es guest, setea la session a guest
      localStorage.setItem("mas-noticias", 'guest')
    }
  }, [storeUser])

  return (
    <div className="container text-center">
      <a
        className="btn btn-outline-dark"
        role="button"
        style={{ textTransform: "none" }}
        onClick={(e) => handleFacebook(e)}
      >
        <img
          width="20px"
          height="20px"
          style={{ marginBottom: 3, marginRight: 5 }}
          alt="Facebook sign-in"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/220px-Facebook_f_logo_%282019%29.svg.png"
        />
        Ingresar con Facebook
      </a>
    </div>

  )
}

const RenderButton = withFirebase(FacebookBase)

export default FacebookButton;

export { RenderButton, FacebookButton };