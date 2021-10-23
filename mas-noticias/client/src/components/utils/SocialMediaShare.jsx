import { FacebookShareButton, WhatsappShareButton, FacebookIcon, WhatsappIcon, TwitterShareButton, TwitterIcon} from 'react-share';

export default function SocialMediaShare ({url, header, hashtag}) {
    
    return (
        <div  className='d-flex align-content-center bg-dark'>
            <FacebookShareButton
                url={url}
                quote={header}
                hashtag={hashtag}>
                <FacebookIcon iconFillColor="black" round={true} size={30}></FacebookIcon>
            </FacebookShareButton>
            <WhatsappShareButton
                url={url}
                title={header}>
                <WhatsappIcon iconFillColor="black" round={true} size={30}></WhatsappIcon>
            </WhatsappShareButton>
            <TwitterShareButton
                via={url}
                title={header}
                hashtags={[hashtag]}>
                <TwitterIcon iconFillColor="black" round={true} size={30}></TwitterIcon>
            </TwitterShareButton>
        </div>
    )
}