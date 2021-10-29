import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';

export default function DatePickerComponent (props) {
    const { setDate, previousDate } = props;
    const [ state, setState ] = useState( { date: previousDate?new Date(previousDate):new Date()});

    function dateHandler (date) {
        setState({ date: date})
    }

    useEffect(()=>{
        
        if(previousDate) {
            setState({date: new Date(previousDate)})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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