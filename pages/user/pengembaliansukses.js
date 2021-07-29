//@ts-check
export default function pengembaliansukses (){
    return (
    <div>
        <div className="row" style={{height: 452}}>
            <div className="col">
                <div className="bs-callout bs-callout-success">
                    <h4>Buku ini akan dikembalikan</h4>
                    <p>Buku akan dikembalikan<br /><strong>Mohon tunjukkan ID Pinjam ke Admin</strong></p>
                    <h1>ID PINJAM : P001</h1>
                    <p><strong>Jika sudah menunjukkan ke Admin, klik Tombol selesai untuk menyelesaikan pengembalian buku.</strong></p><a href="riwayat-pinjaman.html"><button className="btn btn-primary" type="button" style={{fontSize: 17, background: 'rgb(0,166,36)'}}>Selesai</button></a>
                    <p><strong>Kembalikan buku di Rak A baris ke-6</strong></p><a id="buttonKembali" href="home"><button className="btn btn-primary" type="button" style={{fontSize: 17, background: 'rgb(210,42,32)'}}>Kembali</button></a>
                </div>
            </div>
        </div>
    </div>

    )
}