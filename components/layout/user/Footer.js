//@ts-check


export default function footer(){
    return(
        <footer className="footer-basic" style={{height: "342.219px;",background: "white"}}>
        <ul className="list-inline"></ul>
        <footer className="footer-clean" style={{height: "320.219px",background: "white",color: "rgb(255,255,255);"}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-4 col-md-3 item" style={{width: "286px;"}}>
                        <h3>Alamat Sekolah :</h3>
                        <p>SMK "NURUT TAQWA" SONGGON, Dusun Cemoro, Balak, Songgon, Kabupaten Banyuwangi, Jawa Timur 68463</p>
                    </div>
                    <div className="col-sm-4 col-md-3 item" style={{width: "273px;"}}>
                        <h3>Nomor Admin Perpustakaan :</h3>
                        <p>BU RENI +62 812-3279-0730</p>
                    </div>
                    <div className="col-sm-4 col-md-3 item" style={{background: "#2E8B57;"}}><img src="/smk.png" alt="Picture of the author" style={{width:'140px', height:'140px', margin:'auto'}} className="d-flex m-auto"/>
                        <h3 style={{marginTop: "13px;"}}>SMK NURUT TAQWA</h3>
                        <p>Menjunjung tinggi Ilmu Pengetahuan</p>
                    </div>
                </div>
                <div className="row" style={{background: "#2E8B57;"}}>
                    <div className="col-md-12">
                        <p className="copyright">Powered by SMK NURUT TAQWA SONGGON © 2021</p>
                    </div>
                </div>
            </div>
        </footer>
    </footer>

    )
}