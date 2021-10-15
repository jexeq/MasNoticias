

export default function PublicityDetailCard (publicity) {

    function checkPublicityType (publicity) {
        switch(publicity.type) {
            case "small":
                return <img style={{"width": "150px", "height": "150px"}} src={publicity.url} alt="" />;
            case "medium":
                return <img style={{"width": "400px", "height": "400px"}} src={publicity.url} alt="" />;
            case "large": 
                return <img style={{"width": "750px", "height": "auto"}} src={publicity.url} alt="" />;    
            case "banner": 
                return <img style={{"width": "100%", "height": "200px"}} src={publicity.url} alt="" />;    
                default: return <img src={publicity.url} alt="" />
        }
    }

    return (
    <div>
        <label> Propietario </label>
        <h6>{publicity.owner}</h6>
        <label> Fecha de Inicio </label>
        <p> {publicity.init} </p>
        <label > Fecha de Fin </label>
        <p> {publicity.end }</p>
        <label> Prioridad asignada </label>
        <p> {publicity.priority} </p>
        <label > Tipo de Publicidad </label>
        <p> {publicity.type} </p>
        <label >Estado de la Publicidad </label>
        <p> {publicity.state } </p>
        <label > vista previa </label>
        {checkPublicityType(publicity)}
        <hr />
    </div>)
}