//@ts-check
import TabelTransaksiNotif from '../../components/admin/tableTransaksiNotif'

export default function dataPeminjamAktif() {
  return (
    <div className="container-fluid">
      <h3 className="text-dark mb-4">Data Peminjaman Hampir Mendekati Tanggal Tempo</h3>
      <div className="card shadow">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold">Tabel Data Peminjaman Hampir Mendekati Tanggal Tempo</p>
        </div>
        <div className="card-body">
          {/* Tabel disini */}
          <TabelTransaksiNotif />
        </div>
      </div>
    </div>


  )
}