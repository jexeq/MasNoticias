
import './largePublicityCard.css';
export default function LargePublicityCard (props) {

    return (
        <div className='large-pub-cont'>
            <a  href={props.publicity?.redirect} target='_blank'>
                Publicidad
                <img className='large-pub-img' src={props.publicity?.url} alt="publicidad" />
            </a>
        </div>
    )
}