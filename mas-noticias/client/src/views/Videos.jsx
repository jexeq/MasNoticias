import { getActiveVideo } from "../redux/actions/video/videoActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import MainVideoCard from "../components/videoReports/mainVideoCard/MainVideoCard";

export default function Videos () {
    const dispatch = useDispatch();
    const storeVideos = useSelector( state => state.videoReducer.videos);
    const [loading, setLoading] = useState(true);

    useEffect( ()=>{
        if(!storeVideos?.length>0){
            dispatch(getActiveVideo());
        }else{
            setLoading(false)
        }
    },[storeVideos])

    return !loading&&(
        <div >
            <div className='flex-column justify-content-center align-items-center'>
                {storeVideos?storeVideos.map( v => 
                    <div >
                        <MainVideoCard id={v.id} videoReport={v} />
                    </div>
                    ): <h4> No hay Videos </h4>}
            </div>
        </div>
    )
}