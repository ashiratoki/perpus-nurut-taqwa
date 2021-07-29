//@ts-check
import ShowTable from "../../components/admin/tableRiwayatAktifitas";


export default function RiwayatAktifitas(){

  const dataAktifitas=[{idAktifitas: 'A01', 
  tanggal: '12-03-2021', aktifitas: 'Buku sudah di kembalikan', },
  {idAktifitas: 'A02', 
  tanggal: '12-03-2021', aktifitas: 'Buku sudah di kembalikan', },
  {idAktifitas: 'A03', 
  tanggal: '12-03-2021', aktifitas: 'Buku sudah di kembalikan', },
  {idAktifitas: 'A04', 
  tanggal: '12-03-2021', aktifitas: 'Buku sudah di kembalikan', },
  {idAktifitas: 'A05', 
  tanggal: '12-03-2021', aktifitas: 'Buku sudah di kembalikan', },
  {idAktifitas: 'A06', 
  tanggal: '12-03-2021', aktifitas: 'Buku sudah di kembalikan', }]


    return(
  <div id="wrapper">
  <div className="d-flex flex-column" id="content-wrapper">
    <div id="content">
      <div className="container-fluid" style={{paddingTop:'50px'}}>
  
        <h3 className="text-dark mb-4" style={{width:'50%', marginLeft:'250px'}}> Riwayat Aktifitas</h3>
        <div className="card shadow" style={{width:'50%', marginLeft:'250px'}}>
       
          <div className="card-header py-3">
            <p className="text-primary m-0 fw-bold">Tabel Riwayat Aktifitas</p>
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
          
            <div className='row'>
              <ShowTable tableData = {dataAktifitas}/>
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
          </div>
        </div>
      </div>
    </div>
    <footer className="bg-white sticky-footer">
      <div className="container my-auto">
        <div className="text-center my-auto copyright"><span>Powered by STIKOM PGRI BANYUWANGI ©&nbsp; 2021</span></div>
      </div>
    </footer>
  </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up" /></a>
</div>

    )
}