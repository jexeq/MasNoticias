import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import { useEffect } from "react";
import { updateUser, getUser } from "../../../redux/actions/user/userActions";
import Swal from 'sweetalert2'
import * as logo from "../../../images/mas-noticias.png";

 
export default function AccountConfirmation(props) {
 
  const history = useHistory()
  const dispatch = useDispatch()

  var search = props.location.search

  var id = search.split("&")[1].split("=")[1];

  var activateUser = [
    {
      id: id,
      changes: { active: true }
    }
  ]


  useEffect(()=>{
    dispatch(updateUser(activateUser))
    localStorage.setItem("mas-noticias", id)
    dispatch(getUser(id))
    show()
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])

 
  function  show (props) {
    Swal.fire({
      title: '¡Gracias por registrarte!',
      showDenyButton: true,
      imageUrl: logo,
      imageWidth: 400,
      imageHeight: 400,
      confirmButtonColor: "#212529",
      denyButtonColor: "#212529 ",
      confirmButtonText: `Ver Noticias`,
      denyButtonText: `Mi cuenta`,
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/");
      } else if (result.isDenied) {
        history.push("/user/mydata")
      }
    })
  }

  return (
     <div></div>
    )
}