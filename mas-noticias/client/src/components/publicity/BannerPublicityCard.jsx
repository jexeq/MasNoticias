import './bannerPublicity.css';
export default function BannerPublicityCard (props) {

    return (
        <div className='banner-pub-cont'>
            <a  href={props.publicity?.redirect} target='_blank'>
                publicidad
                <img className='banner-pub-img' src={props.publicity?.url} alt="publicidad" />
            </a>
        </div>
    )
}