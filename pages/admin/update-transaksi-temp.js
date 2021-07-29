//@ts-check
import TableTransaksi from "../../components/admin/tableTransaksi"
import TableTransaksiTemp from "../../components/admin/tableTransaksiTemp"

export default function TambahPeminjaman(){

  const dataPinjam=[{no:'01' ,idPinjam: 'P01',idSiswa: 'S01', idBuku: 'B01', tglPinjam : '12-01-2021', tglTempo: '20-02-2021', tglKembali: '-' },
  {idSiswa: 'S01', idBuku: 'B01', tglPinjam : '12-01-2021', tglTempo: '21-01-2021', tglKembali: '-' },
  {idSiswa: 'S01', idBuku: 'B01', tglPinjam : '12-01-2021', tglTempo: '22-01-2021', tglKembali: '-' },
  {idSiswa: 'S01', idBuku: 'B01', tglPinjam : '12-01-2021', tglTempo: '13-08-2021', tglKembali: '-' },
  {idSiswa: 'S01', idBuku: 'B01', tglPinjam : '12-01-2021', tglTempo: '15-08-2021', tglKembali: '-' }]
  const dataPinjamTemp=[{no:'01' ,idPinjam: 'P01',idSiswa: 'S01', idBuku: 'B01', tglPinjam : '12-01-2021', tglTempo: '20-02-2021'},
  {idSiswa: 'S01', idBuku: 'B01', tglPinjam : '12-01-2021', tglTempo: '21-01-2021'},
  {idSiswa: 'S01', idBuku: 'B01', tglPinjam : '12-01-2021', tglTempo: '22-01-2021'},
  {idSiswa: 'S01', idBuku: 'B01', tglPinjam : '12-01-2021', tglTempo: '13-08-2021'},
  {idSiswa: 'S01', idBuku: 'B01', tglPinjam : '12-01-2021', tglTempo: '15-08-2021'}]
    return(
        <div>
  <div className="container-fluid">
    <h3 className="text-dark mb-4">Update Transaksi Pending</h3>
    <div className="row mb-3">
      <div className="col-lg-8">
        <div className="row mb-3 d-none">
          <div className="col">
            <div className="card textwhite bg-primary text-white shadow">
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col">
                    <p className="m-0">Peformance</p>
                    <p className="m-0"><strong>65.2%</strong></p>
                  </div>
                  <div className="col-auto"><i className="fas fa-rocket fa-2x" /></div>
                </div>
                <p className="text-white-50 small m-0"><i className="fas fa-arrow-up" />&nbsp;5% since last month</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card textwhite bg-success text-white shadow">
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col">
                    <p className="m-0">Peformance</p>
                    <p className="m-0"><strong>65.2%</strong></p>
                  </div>
                  <div className="col-auto"><i className="fas fa-rocket fa-2x" /></div>
                </div>
                <p className="text-white-50 small m-0"><i className="fas fa-arrow-up" />&nbsp;5% since last month</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card shadow mb-3">
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">Tambah Peminjaman Buku</p>
              </div>
              <div className="card-body">
                <form id="Form-Pengembalian">
                  <div className="row">
                    <div className="col">
                      <div className="mb-3"><label className="form-label" htmlFor="username"><strong>ID</strong>&nbsp;Buku<br /></label><input className="form-control" type="text" id="namaPengembalian" placeholder="Isi Nama" name="username" /></div>
                    </div>
                    <div className="col">
                      <div className="mb-3"><label className="form-label" htmlFor="email"><strong>ID</strong>&nbsp;Siswa</label><input className="form-control" type="text" id="siswaPengembalian" placeholder="ID Siswa" name="email" /></div>
                    </div>
                  </div>
                  <div className="row" id="Tanggal">
                    <div className="col" id="tgl-pinjam">
                      <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>Tgl - Pinjam</strong></label><input className="form-control" type="date" /></div>
                    </div>
                    <div className="col" id="tgl-tempo">
                      <div className="mb-3"><label className="form-label" htmlFor="last_name"><strong>Tgl - Tempo</strong></label><input className="form-control" type="date" /></div>
                    </div>
                  </div>
                  <div className="mb-3"><button className="btn btn-primary btn-sm" type="submit" style={{padding: '11px 8px', fontSize: 17, marginTop: 11}}>Update Data</button><button className="btn btn-primary btn-sm" type="submit" style={{padding: '11px 8px', fontSize: 17, marginTop: 11, marginLeft: 39}}>Cetak Barcode</button></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="card shadow">
      <div className="card-header py-3">
        <p className="text-primary m-0 fw-bold">Tabel Transaksi Pending</p>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 text-nowrap">
            <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"><label className="form-label">Show&nbsp;<select className="d-inline-block form-select form-select-sm">
                  <option value={10} selected>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>&nbsp;</label></div>
          </div>
          <div className="col-md-6">
            <div className="text-md-end dataTables_filter" id="dataTable_filter"><label className="form-label"><input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" /></label></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 align-self-center">
            <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Showing 1 to 10 of 27</p>
          </div>
          <div className="col-md-6">
            <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
              <ul className="pagination">
                <li className="page-item disabled"><a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="table-responsive table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">
         <TableTransaksiTemp tableData = {dataPinjamTemp}/>
        </div>
      </div>
    </div>
    <div className="card shadow">
      <div className="card-header py-3">
        <p className="text-primary m-0 fw-bold">Tabel Data Transaksi</p>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 text-nowrap">
            <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"><label className="form-label">Show&nbsp;<select className="d-inline-block form-select form-select-sm">
                  <option value={10} selected>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>&nbsp;</label></div>
          </div>
          <div className="col-md-6">
            <div className="text-md-end dataTables_filter" id="dataTable_filter"><label className="form-label"><input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" /></label></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 align-self-center">
            <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Showing 1 to 10 of 27</p>
          </div>
          <div className="col-md-6">
            <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
              <ul className="pagination">
                <li className="page-item disabled"><a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="table-responsive table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">
         <TableTransaksi tableData = {dataPinjam}/>
        </div>
      </div>
    </div>
  </div>
  <footer className="bg-white sticky-footer">
    <div className="container my-auto">
      <div className="text-center my-auto copyright"><span>Powered by STIKOM PGRI BANYUWANGI ©&nbsp; 2021</span></div>
    </div>
  </footer>
  <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up" /></a>
</div>


    )
}