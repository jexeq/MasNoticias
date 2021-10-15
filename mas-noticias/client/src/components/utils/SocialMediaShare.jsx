import { FacebookShareButton, WhatsappShareButton, FacebookIcon, WhatsappIcon, TwitterShareButton, TwitterIcon} from 'react-share';

export default function SocialMediaShare ({url, header, hashtag}) {
    
    return (
        <div className='d-flex align-content-center'>
            <FacebookShareButton
                url={url}
                quote={header}
                hashtag={hashtag}>
                <FacebookIcon iconFillColor="white" round={true} size={40}></FacebookIcon>
            </FacebookShareButton>
            <WhatsappShareButton
                url={url}
                title={header}>
                <WhatsappIcon iconFillColor="white" round={true} size={40}></WhatsappIcon>
            </WhatsappShareButton>
            <TwitterShareButton
                via={url}
                title={header}
                hashtags={[hashtag]}>
                <TwitterIcon iconFillColor="white" round={true} size={40}></TwitterIcon>
            </TwitterShareButton>
        </div>
    )
}