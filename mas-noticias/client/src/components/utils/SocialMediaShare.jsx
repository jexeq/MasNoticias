import { FacebookShareButton, WhatsappShareButton, FacebookIcon, WhatsappIcon, TwitterShareButton, TwitterIcon} from 'react-share';

export default function SocialMediaShare ({url, header, hashtag}) {
    
    return (
        <div className='d-flex align-content-center'>
            <FacebookShareButton
                url={url}
                quote={header}
                hashtag={hashtag}>
                <FacebookIcon logoFillColor="white" rounded={true} size={40}></FacebookIcon>
            </FacebookShareButton>
            <WhatsappShareButton
                url={url}
                title={header}>
                <WhatsappIcon logoFillColor="white" rounded={true} size={40}></WhatsappIcon>
            </WhatsappShareButton>
            <TwitterShareButton
                via={url}
                title={header}
                hashtags={[hashtag]}>
                <TwitterIcon logoFillColor="white" rounded={true} size={40}></TwitterIcon>
            </TwitterShareButton>
        </div>
    )
}