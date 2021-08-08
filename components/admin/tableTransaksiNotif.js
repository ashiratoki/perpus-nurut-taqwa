//@ts-check
import useSWR from 'swr'
import Link from 'next/link'
import { mutate } from 'swr'
import { useState } from 'react'
import Moment from 'react-moment'
import Pagination from '../../components/Pagination'


async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}
export default function tableTransaksi() {
  const [deleting, setDeleting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'
  const url = `${http}://${host}/api/tb_transaksi_notifikasi`;
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)

  const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });


  if (error) {
    return <div>error......</div>
  }
  if (!data) {
    return <div>loading......</div>
  }
  console.log(data);

   //Fixed Pagination
   let searchArr = data.filter((tblDat) => {
    if (searchTerm == "") {
      return tblDat
    } else if (tblDat.nis.toLowerCase().includes(searchTerm.toLowerCase())) {
      return tblDat
    } else if (tblDat.nama.toLowerCase().includes(searchTerm.toLowerCase())) {
      return tblDat
    }else if (tblDat.index_buku.toLowerCase().includes(searchTerm.toLowerCase())) {
      return tblDat
    } else if (tblDat.no_klasifikasi.toLowerCase().includes(searchTerm.toLowerCase())) {
      return tblDat
    } else if (tblDat.tgl_pinjam.toLowerCase().includes(searchTerm.toLowerCase())) {
      return tblDat
    } else if (tblDat.tgl_tempo.toLowerCase().includes(searchTerm.toLowerCase())) {
      return tblDat
    } else if (tblDat.tgl_kembali.toLowerCase().includes(searchTerm.toLowerCase())) {
      return tblDat
    }
  })
//Fixed Pagination

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
   //Fixed Pagintion CurrentPosts hapus filter di bawah
   let currentPosts = searchArr.slice(indexOfFirstPost, indexOfLastPost)
   //Fixed Pagination CurrentPosts
  const howManyPages = Math.ceil(searchArr.length / postsPerPage)

  async function clickHandlerDelete(value1, value2) {
    const isDelete = confirm(`Apakah Anda Ingin Menghapus data ini dengan NIS ${value2}?`)
    if (isDelete) {
      deleteEntry(value1)
    }
  }

  async function deleteEntry(value) {
    setDeleting(true)
    let res = await fetch(`${http}://${host}/api/delete-transaksi?id=${value}`, { method: 'DELETE' })
    let json = await res.json()
    if (!res.ok) throw Error(json.message)
    alert("Data telah dihapus")
    mutate(`${http}://${host}/api/tb_transaksi`)
    setDeleting(false)
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6 text-nowrap">
          <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"><label className="form-label">Show&nbsp;
            <select className="d-inline-block form-select form-select-sm" value={postsPerPage} onChange={(e) => { setPostsPerPage(e.target.value) }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>&nbsp;</label></div>
        </div>
        <div className="col-md-6">
          <div className="text-md-end dataTables_filter" id="dataTable_filter"><label className="form-label">
            <input type="search"
              className="form-control form-control-sm"
              aria-controls="dataTable" placeholder="Search"
              onChange={event => { setSearchTerm(event.target.value) }} /></label></div>
        </div>
      </div>
      {/* Tambahan Pagination Make Sure Math.ceil adalah searchArr.length */}
      <p>Memuat {searchArr.length} data, Jumlah keseluruhan data adalah {data.length} data</p>
      <table className="table my-0" id="dataTable">
        <thead>
          <tr>
            <th style={{ width: 'auto' }}>No</th>
            <th>NIS</th>
            <th>Nama Siswa</th>
            <th>No Telp.</th>
            <th>Jurusan</th>
            <th>Angkatan</th>
            <th>No. Induk Buku</th>
            <th>No Klasifikasi</th>
            <th>Tgl-Pinjam</th>
            <th>Tgl-Tempo</th>
            <th>Tgl-Kembali</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((tblDat, index) =>
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{tblDat.nis}</td>
              <td>{tblDat.nama}</td>
              <td>{tblDat.no_telp}</td>
              <td>{tblDat.jurusan}</td>
              <td>{tblDat.angkatan}</td>
              <td>{tblDat.index_buku}</td>
              <td>{tblDat.no_klasifikasi}</td>
              {/* <td><Moment format="DD/MM/YYYY">{tblDat.tgl_pinjam}</Moment></td>
                <td><Moment format="DD/MM/YYYY">{tblDat.tgl_tempo}</Moment></td>
                <td id={index} >{(tblDat.tgl_kembali == '-') ?  `-` : <Moment format="DD/MM/YYYY">{tblDat.tgl_kembali}</Moment>}</td> */}
              <td><Moment format="DD/MM/YYYY">{tblDat.tgl_pinjam}</Moment></td>
              <td><Moment format="DD/MM/YYYY">{tblDat.tgl_tempo}</Moment></td>
              <td id={index} >{(tblDat.tgl_kembali == 'belum kembali') ? `Belum Kembali` : <Moment format="DD/MM/YYYY">{tblDat.tgl_kembali}</Moment>}</td>
              <td><div className="btn-group-vertical btn-group-sm">
                <Link
                  href={`/admin/update-transaksi?nis=${tblDat.nis}&index_buku=${tblDat.index_buku}&&no_klasifikasi=${tblDat.no_klasifikasi}&tgl_pinjam=${tblDat.tgl_pinjam_fix}&tgl_tempo=${tblDat.tgl_tempo_fix}&tgl_kembali=${tblDat.tgl_kembali}&id_transaksi=${tblDat.id_transaksi}&nisLama=${tblDat.nis}&index_buku_lama=${tblDat.index_buku}&no_klasifikasi_lama=${tblDat.no_klasifikasi}`}
                ><button type="button" className="btn btn-primary mb-2">Update</button></Link>
              </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
    </div>
  )
}
