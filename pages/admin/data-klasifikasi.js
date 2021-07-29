//@ts-check
import TabelKlasifikasi from '../../components/admin/tableKlasifikasi'
import TabelKlasifikasiTersedia from '../../components/admin/tableKlasifikasiTersedia'
export default function dataSiswa() {

    return (
        <div className="container-fluid">
            <h3 className="text-dark mb-4">Data Klasifikasi Buku</h3>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Tabel Data Klasifikasi Buku</p>
                </div>
                <div className="card-body">

                    <div className="table-responsive">
                        <TabelKlasifikasi />
                    </div>
                </div>
            </div>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Tabel Klasifikasi Tersedia Kurang dari Stok</p>
                </div>
                <div className="card-body">

                    <div className="table-responsive">
                        <TabelKlasifikasiTersedia />
                    </div>
                </div>
            </div>
        </div>

    )
}