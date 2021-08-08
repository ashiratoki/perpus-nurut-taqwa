//@ts-check
import TabelTransaksi from '../../components/admin/tableTransaksi'

export default function dataPeminjamAktif() {
  return (
    <div className="container-fluid">
      <h3 className="text-dark mb-4">Tabel Peminjaman</h3>
      <div className="card shadow">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold">Data Peminjaman Buku, Update Tanggal Kembali jika sudah mengembalikan</p>
        </div>
        <div className="card-body">

          <div className="table-responsive">
            <TabelTransaksi />
          </div>
        </div>
      </div>
    </div>


  )
}