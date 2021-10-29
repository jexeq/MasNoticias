import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function SelectReportToCreate () {
    const storeUser = useSelector( state => state.userReducer.user);
    const history = useHistory();
    return (storeUser.type==='admin'||storeUser.type==='sudo'|| storeUser.type==='editor')?(
        <div className='container d-flex justify-content-center align-content-around'>
            <button className='btn-dark mt-md-5'>
                <NavLink  to='/admin/create-report/draft'> Redacción </NavLink>
            </button>
            <button className='btn-dark mt-md-5'>
                <NavLink  to='/admin/create-report/video'> Video </NavLink>
            </button>
        </div>
    ): history.push('/not-found')
}