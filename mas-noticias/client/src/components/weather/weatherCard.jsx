
export default function weatherCard (singleReport) {

    var day = singleReport.dt_txt.split(" ")[0].split("-")[2];
    var month =  singleReport.dt_txt.split(" ")[0].split("-")[1];
    var hour =  singleReport.dt_txt.split(" ")[1].split(":")[0];

    return (
        <div>
            <img src={singleReport.weather[0].icon} alt={singleReport.weather.description} />
            <div translate="yes">{singleReport.weather[0].main}</div>
            <div>Min {singleReport.main.temp_min}</div>
            <div>Max {singleReport.main.temp_max}</div>
            <div>{hour} hs - {day}/{month}</div>

        </div>
    )
}