//@ts-check
import TabelTransaksiNotif from '../../components/admin/tableTransaksiNotif'
import TabelTransaksiNotifLewat from '../../components/admin/tableTransaksiNotifLewat'
import TabelDendaNotifikasi from '../../components/admin/tableDendaNotifikasi'
export default function Notifikasi() {

    return (
        <div className="container-fluid">
            <h3 className="text-dark mb-4">Tabel Notifikasi yang Mendekati Tanggal Tempo</h3>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Tabel Data Transaksi yang Hampir Mendekati Tanggal Tempo</p>
                </div>
                <div className="card-body">

                    <div className="table-responsive">
                        <TabelTransaksiNotif />
                    </div>
                </div>
            </div>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Tabel Notifikasi yang Melewati Tanggal Tempo</p>
                </div>
                <div className="card-body">

                    <div className="table-responsive">
                        <TabelTransaksiNotifLewat />
                    </div>
                </div>
            </div>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Tabel Denda yang Belum Membayar</p>
                </div>
                <div className="card-body">

                    <div className="table-responsive">
                        <TabelDendaNotifikasi />
                    </div>
                </div>
            </div>
        </div>

    )
}