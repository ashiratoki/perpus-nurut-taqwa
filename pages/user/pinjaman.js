//@ts-check
import CardPinjamanSaya from '../../components/user/cardPinjamanSaya'

export default function Pinjaman() {
    const dataPinjam = [{ judulBuku: "Pemograman Web", tglPinjam: "2021-03-20", imgUrl: '../../assets/img/buku-smk-kelas-10-pemrograman-webpdf-1-638.jpg' },
    { judulBuku: "Sistem Operasi", tglPinjam: "2021-03-04", imgUrl: "../../assets/img/images.jpg" }]
    return (
        <div>
            <div>
            </div>
            <div id="cari-buku" style={{ background: 'var(--bs-white)' }}>
                <div className="container" style={{ marginTop: 18 }}>
                    <div className="row" style={{ borderBottomStyle: 'solid', borderBottomColor: 'var(--bs-blue)' }}>
                        <h1 style={{ fontSize: 25 }}>RIWAYAT PEMINJAMAN</h1>
                    </div>
                    <div style={{marginTop:'50px'}}>
                        <CardPinjamanSaya />
                    </div>
                    {/* Here Card Pinjam  */}
                </div>
            </div>
        </div>
    )
}