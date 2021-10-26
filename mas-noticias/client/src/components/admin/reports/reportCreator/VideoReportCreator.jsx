import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";


export default function VideoReportCreator () {
    const dispatch = useDispatch();
    const history = useHistory();
    const storeUser = useSelector( state => state.userReducer.user);
    
}