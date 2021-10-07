import './mediumPublicityCard.css';
export default function MediumPublicityCard (props) {

    return (
        <div className='medium-pub-cont'>
            <a  href={props.publicity?.redirect} target='_blank'>
                publicidad
                <img className='medium-pub-img' src={props.publicity?.url} alt="publicidad" />
            </a>
        </div>
    )
}