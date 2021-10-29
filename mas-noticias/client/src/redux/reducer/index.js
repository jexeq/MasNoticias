import { combineReducers } from 'redux';
import publicityReducer from '../actions/publicity/publicityReducer';
import reportReducer from "../actions/report/reportReducer";
import sectionReducer from "../actions/section/sectionReducer";
import tagReducer from '../actions/tag/tagReducer';
import userReducer from '../actions/user/userReducer';
import weatherReducer from '../actions/weather/weatherReducer';
import mailReducer from '../actions/email/emailReducer';
import videoReducer from '../actions/video/videoReducer';

const rootReducer = combineReducers(
    {
        publicityReducer,
        reportReducer,
        sectionReducer,
        tagReducer,
        userReducer,
        weatherReducer,
        mailReducer,
        videoReducer
    }
);

export default rootReducer;