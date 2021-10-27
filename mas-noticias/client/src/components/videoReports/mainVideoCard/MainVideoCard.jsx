import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import YouTube from 'react-youtube';
import "./mainVideo.css";

export default function MainVideoCard (props) {
    
    const {videoReport, tagName, sectionName} = props
    const [loading, setLoading] = useState(true)

    console.log("videoReport.title1" ,videoReport.title1 )
    useEffect(()=>{
        if(videoReport?.title1) {
            setLoading(false)
        }else{
            setLoading(true)
        }

    },[videoReport])

    const opts = {
        height: '300',
        width: '400',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      function onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }  


    return !loading?(
        <div >
            <div className='d-flex flex-column align-items-center justify-content-center text-cont'>
                <div className="tag-cont">
                    {tagName}
                </div>
                <NavLink className='NavLink' to={`/video/${videoReport?.id}`}>
                    <h4 >{videoReport.title1}</h4>
                </NavLink>
                <div >
                    <YouTube videoId={videoReport.video} opts={opts} onReady={onReady}/>
                </div>
                <div className='title2-cont'>
                    <p>{videoReport?.title2}</p>
                </div>
            </div>
        </div>
    ): <span></span>
}