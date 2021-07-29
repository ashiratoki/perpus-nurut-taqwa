//@ts-check
export default function CardRiwayatPinjaman (props){
    return(
        <div>
        <div className="row" style={{borderBottomStyle: 'solid', borderBottomColor: 'var(--bs-blue)'}}>
                <div className="col-md-4"><img src={props.imgUrl} style={{height: 186, width: '141.781px', margin: 6, padding: 5, marginLeft: 83}} /></div>
                <div className="col" style={{filter: 'blur(0px)'}}>
                    <h1 style={{fontSize: 18}}>{props.judulBuku}</h1>
                    <p>ID Pinjam : {props.idPinjam} | Tgl-Pinjam : {props.tglPinjam}<br /></p><a href="/user/kembali"><button className="btn btn-primary" type="button" style={{fontFamily: '#2E8B57', borderRadius: 68, background: '#2E8B57'}}>Kembalikan</button></a>
                </div>
            </div>
        </div>
    )
}