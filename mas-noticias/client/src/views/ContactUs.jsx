import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { sendEmailConsult } from '../redux/actions/email/emailActions';

export default function ContactUs () {
    const dispatch = useDispatch();

    const initial_state = {name:'', email:'', phone:'', consult:''};
    const [message, setMessage] = useState(initial_state) ;
    const {name, email, phone, consult} = message;
    const [emailError, setEmailError] = useState(true)

    function onchangeHandler (e) {
        e.preventDefault();

        if(e.target.name==='email'&& e.target.value.length>3) {
            const isEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
            isEmail.test(e.target.value)? setEmailError(false):setEmailError(true);
            console.log("emailError?" , emailError)
        }

        setMessage({...message, [e.target.name]:e.target.value})
    }
    
    function onSubmitHandler (e) {
        e.preventDefault();
        dispatch(sendEmailConsult(message))
    }

    return (
        <div >
            <form onSubmit={onSubmitHandler} className='d-md-flex flex-lg-column align-items-center'>
                <h3>Sus Datos</h3>
                <input className='col-md-5 form-text' type="text" name='name' value={name} placeholder='Nombre y Apellido' onChange={onchangeHandler}/>
                <label className='danger' hidden={name}>*Campo Obligatorio</label>
                <input className='col-md-5 form-text' type="text" name='email' value={email} placeholder='Email' onChange={onchangeHandler}/>
                <label className='danger' hidden={email}>*Campo Obligatorio</label>
                <label hidden={!email||!emailError} className='danger'>Debe ingresar un email válido</label>
                <input className='col-md-5 form-text' type="text" name='phone' value={phone} placeholder='Teléfono' onChange={onchangeHandler}/>
                <label className='danger' hidden={phone}>*Campo Obligatorio</label>
                <hr />
                <h3>Su Consulta: </h3>
                <textarea  className='col-md-5 form-text' type="textarea" name='consult'value={consult} placeholder='Describa aquí su consulta' onChange={onchangeHandler}/>
                <hr />
                <button className="btn-primary col-md-1" disabled={!name||!email||!phone||!consult} type='submit'> Enviar </button>
            </form>

        </div>
    )
}