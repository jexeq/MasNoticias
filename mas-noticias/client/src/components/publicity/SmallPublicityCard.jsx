
import './smallPublicityCard.css';

export default function SmallPublicityCard (props) {
   
    return (
        <div className='small-pub-cont'>
            <a  href={props.publicity?.redirect} target='_blank' rel='noreferrer'>
                Publicidad
                <img className='small-pub-img' src={props.publicity?.url} alt="publicidad" />
            </a>
        </div>
    )
    
}