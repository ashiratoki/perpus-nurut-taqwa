//@ts-check
import TabelSiswa from '../../components/admin/tabelSiswa'
import TabelSiswaAngkatan from '../../components/admin/tabelSiswaAngkatan'
import Router, { useRouter } from 'next/router'
export default function dataSiswa() {

    const router = useRouter()
    return (
        <div className="container-fluid">
            <h3 className="text-dark mb-4">Data Siswa Anggota Perpustakaan</h3>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Tabel Data Siswa Anggota Perpustakaan</p>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <TabelSiswa />
                    </div>
                </div>
            </div>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Anggota Perpustakaan yang sudah 3 Tahun </p>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <TabelSiswaAngkatan />
                    </div>
                </div>
            </div>
        </div>

    )
}