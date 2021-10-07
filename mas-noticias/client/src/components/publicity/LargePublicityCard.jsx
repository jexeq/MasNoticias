
import './largePublicityCard.css';
export default function LargePublicityCard (props) {

    return (
        <div className='large-pub-cont'>
            <a  href={props.publicity?.redirect} target='_blank'>
                publicidad
                <img className='large-pub-img' src={props.publicity?.url} alt="publicidad" />
            </a>
        </div>
    )
}