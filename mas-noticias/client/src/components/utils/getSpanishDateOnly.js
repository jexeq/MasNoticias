

export default function getSpanishDateOnly (prevDate , style) {
    var actualDate = new Date().toDateString();
    var splitedDate;
    
    if(prevDate !== undefined){
        splitedDate = prevDate.split(" ")
    }else{
        splitedDate = actualDate.split(" ")
    }
    
    var spanishDay;
    var spanishMonth;

    switch(splitedDate[0]){
        case "Mon": spanishDay = "Lunes"
                    break;
        case "Tu":  spanishDay = "Martes"
                    break;  
        case "Tue": spanishDay = "Martes"
                    break;
        case "Tues":  spanishDay = "Martes"
                    break;  
        case "Wed":  spanishDay = "Miércoles"
                    break;
        case "Th": spanishDay = "Jueves"
                    break;   
        case "Thu": spanishDay = "Jueves"
                    break;      
        case "Thur": spanishDay = "Jueves"
                    break;
        case "Thurs": spanishDay = "Jueves"
                    break;  
        case "Fri": spanishDay = "Viernes" 
                    break; 
        case "Sat": spanishDay = "Sábado"
                    break;                     
        case "Sun": spanishDay = "Domingo"
                    break; 
        default: spanishDay = "Domingo";                       
    }

    switch(splitedDate[1]) {
        case "Jan": spanishMonth = "Enero"
        break;
        case "Feb": spanishMonth = "Febrero"
        break;
        case "Mar": spanishMonth = "Marzo"
        break;
        case "Apr": spanishMonth = "Abril"
        break;
        case "May": spanishMonth = "Mayo"
        break;
        case "Jun": spanishMonth = "Junio"
        break;
        case "Jul": spanishMonth = "Julio"
        break;
        case "Aug": spanishMonth = "Agosto"
        break;
        case "Sep": spanishMonth = "Septiembre"
        break;
        case "Sept": spanishMonth = "Septiembre"
        break;
        case "Oct": spanishMonth = "Octubre"
        break;
        case "Nov": spanishMonth = "Noviembre"
        break;
        case "Dec": spanishMonth = "Diciembre"
        break;

        default: spanishMonth = "Diciembre"
    }

   

    const spanishDateString = spanishDay + " " + splitedDate[2] + " de " + spanishMonth + " de " + splitedDate[3];
    return (
        <div style={style}>
            <span>{spanishDateString}</span>
        </div>
    )
}