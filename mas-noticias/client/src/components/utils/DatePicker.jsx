import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

export default function DatePickerComponent (props) {
    const { setDate } = props;
    const [ state, setState ] = useState( { date: new Date()});

    function dateHandler (date) {
        setState({ date: date})
    }

    

    return (
        <div>
            <DatePicker 
                selected={state.date} 
                onChange={(date)=> dateHandler(date) } 
                onSelect={ (date) => setDate(date)}
            />
        </div>
    )

}