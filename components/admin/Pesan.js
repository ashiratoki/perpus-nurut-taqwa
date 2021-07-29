//@ts-check
export default function pesan(props){
    return(
        
            <div className="row" id="notifikasiSukses">
                <div className="col-md-11">
                    <div className="card " style={{marginTop: '13px',marginLeft :'10px'}}>
                        <div className="card-body">
                            <div id="div-header">
                            <div className="d-inline-flex bg-success icon-circle"><i className="fa fa-check d-inline-block" style={{fontSize: 20, background: 'rgba(78,115,223,0)', color: 'rgb(255,255,255)'}} /></div>
                            <h3 className="d-inline-flex" style={{marginLeft: 18}}>{props.type}</h3>
                            </div><span>{props.time}</span>
                            <p className="card-text fw-bold">{props.isi}</p><a className="card-link" href="#">Klik disini untuk menuju data</a>
                        </div>
                    </div>
                </div>
            </div>
        
    )
}