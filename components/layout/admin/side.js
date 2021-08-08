//@ts-check
import Link from 'next/link'
export default function Side() {
    return(
      
        <div className='sidebar'  >
             <nav style={{height:'100%'}} className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
    <div className="container-fluid d-flex flex-column p-0" >


      {/* link beranda */}
      <Link href='/'><a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
     <div className="sidebar-brand-text mx-3 d-flex justify-content-between"><img src="../../assets/img/smk.png" style={{width: 65}} /></div>
     <div className="sidebar-brand-text mx-3 d-flex justify-content-between"><img src="/stikom.png" style={{width: 65}} /></div>
      </a></Link>
      
      <span style={{marginRight: 0, borderColor: 'rgb(255,255,255)', color: 'rgb(255,255,255)', marginTop: 6, fontSize: 18, fontFamily: 'Alata, sans-serif'}}>SMK Nurut Taqwa</span>
      <ul className="navbar-nav text-light" id="accordionSidebar" style={{marginTop: 19}}>

        <li className="nav-item">
            {/* link beranda */}
          <Link href="/admin/home"><a className="nav-link" ><i className="fas fa-tachometer-alt" style={{fontSize: 18}} /><span style={{fontSize: 18}}>&nbsp;Dashboard Admin</span></a></Link>
            {/* link register */}
          <Link href="/admin/register"><a className="nav-link"><i className="cib-openstreetmap" style={{fontSize: 18}} /><span style={{fontSize: 18}}>&nbsp;Register Siswa</span></a></Link>
          
        </li>

        <li className="nav-item dropdown">
          
            <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#" style={{color: 'rgb(255,255,255)', fontSize: 18}}><i className="fas fa-plus" style={{fontSize: 18}} />&nbsp; Tambah</a>

          <div className="dropdown-menu">

            <Link href="/admin/tambah-transaksi"><a className="dropdown-item" style={{fontSize: 16}}><i className="fa fa-folder-open" />&nbsp; &nbsp;Tambah Peminjaman</a></Link>
            <Link href="/admin/tambah-buku"><a className="dropdown-item" style={{fontSize: 16}}><i className="fa fa-book" />&nbsp; &nbsp;Tambah Buku</a></Link>
            <Link href="/admin/tambah-klasifikasi"><a className="dropdown-item" style={{fontSize: 16}}><i className="fa fa-book" />&nbsp; &nbsp;Tambah Klasifikasi Buku</a></Link>
            <Link href="/admin/tambah-denda"><a className="dropdown-item" style={{fontSize: 16}}><i className="fa fa-warning" />&nbsp; &nbsp;Tambah Denda</a></Link>
          
          </div>
        </li>
        <li className="nav-item dropdown">
          <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#" style={{color: 'rgb(255,255,255)', fontSize: 18}}><i className="fas fa-eye" style={{fontSize: 18}} />&nbsp;Lihat Data</a>
          <div className="dropdown-menu">

          <Link href='/admin/data-transaksi'><a className="dropdown-item"  style={{fontSize: 16}}><i className="fa fa-folder-open" />&nbsp; Data Peminjaman Buku</a></Link>
          <Link href ="/admin/data-denda"><a className="dropdown-item" style={{fontSize: 16}}><i className="fa fa-folder" />&nbsp; Data Denda</a></Link>
          <Link href="/admin/data-siswa"><a className="dropdown-item" href="" style={{fontSize: 16}}><i className="fa fa-user" />&nbsp; &nbsp;Data Siswa</a></Link>
          <Link href="/admin/data-buku"><a className="dropdown-item"  style={{fontSize: 16}}><i className="fa fa-book" />&nbsp; &nbsp;Data Buku</a></Link>
          <Link href="/admin/data-klasifikasi"><a className="dropdown-item"  style={{fontSize: 16}}><i className="fa fa-book" />&nbsp; &nbsp;Data Klasifikasi Buku</a></Link>
          
          </div>
        </li>


        <li className="nav-item" />
        <li className="nav-item">
          
        <Link href ="/admin/notifikasi"><a className="nav-link" ><i className="fa fa-bell" style={{fontSize: 18}} /><span style={{fontSize: 18, fontWeight: 'normal'}}>&nbsp;Notifikasi</span></a></Link>
        </li>
        <li className="nav-item">
          
        <Link href ="/"><a className="nav-link" href="index.html"><i className="far fa-user-circle" style={{fontSize: 18}} /><span style={{fontSize: 18}}>&nbsp; Log Out</span></a></Link>
        
        </li>
        
        <li className="nav-item" />
      </ul>
    </div>
  </nav>
        </div>
    )
    
}