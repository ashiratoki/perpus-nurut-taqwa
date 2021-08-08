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
export default function tableKlasifikasi() {
  const [deleting, setDeleting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'
  const url = `${http}://${host}/api/tb_klasifikasi`;
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)

  const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });

  if (error) {
    return <div>error......</div>
  }
  if (!data) {
    return <div>loading......</div>
  }

  //Fixed Pagination
  let searchArr = data.filter((tblDat) => {
    if (searchTerm == "") {
      return tblDat
    } else if (tblDat.no_klasifikasi.toLowerCase().includes(searchTerm.toLowerCase())) {
      return tblDat
    } else if (tblDat.judul.toLowerCase().includes(searchTerm.toLowerCase())) {
      return tblDat
    } else if (tblDat.pengarang.toLowerCase().includes(searchTerm.toLowerCase())) {
      return tblDat
    } else if (tblDat.penerbit.toLowerCase().includes(searchTerm.toLowerCase())) {
      return tblDat
    } else if (tblDat.tahun_terbit.toLowerCase().includes(searchTerm.toLowerCase())) {
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
    const isDelete = confirm(`Apakah Anda Ingin Menghapus data ini dengan No Klasifikasi ${value2}?`)
    if (isDelete) {
      deleteEntry(value1)
    }
  }

  async function deleteEntry(value) {
    setDeleting(true)
    let res = await fetch(`${http}://${host}/api/delete-klasifikasi?id=${value}`, { method: 'DELETE' })
    let json = await res.json()
    if (!res.ok) throw Error(json.message)
    alert("Data telah dihapus")
    mutate(`${http}://${host}/api/tb_klasifikasi`)
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
            <th style={{ width: 93 }}>No</th>
            <th>No Klasifikasi</th>
            <th>Judul</th>
            <th>Pengarang</th>
            <th>Penerbit</th>
            <th>Tahun Terbit</th>
            <th>Stok</th>
            <th>Tersedia</th>
            <th>Gambar</th>
            <th>Rak</th>
            <th>Baris</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((tblDat, index) =>
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{tblDat.no_klasifikasi}</td>
              <td>{tblDat.judul}</td>
              <td>{tblDat.pengarang}</td>
              <td>{tblDat.penerbit}</td>
              <td>{tblDat.tahun_terbit}</td>
              <td>{tblDat.stok}</td>
              <td>{tblDat.tersedia}</td>
              <td>
                <img
                  className="rounded-circle"
                  src={tblDat.gambar}
                  alt="Sampul Buku"
                  style={{ width: '70px', height: '70px' }}
                />
              </td>
              <td>{tblDat.rak}</td>
              <td>{tblDat.baris}</td>
              {/* <td><Moment format="DD/MM/YYYY">{tblDat.tgl_kembali}</Moment></td> */}
              <td><div className="btn-group-vertical btn-group-sm">
                <Link
                  href={`/admin/update-klasifikasi?no_klasifikasi=${tblDat.no_klasifikasi}&judul=${tblDat.judul}&pengarang=${tblDat.pengarang}&penerbit=${tblDat.penerbit}&tahun_terbit=${tblDat.tahun_terbit}&stok=${tblDat.stok}&tersedia=${tblDat.tersedia}&rak=${tblDat.rak}&baris=${tblDat.baris}&id=${tblDat.id}&no_klasifikasi_lama=${tblDat.no_klasifikasi}`}
                ><button type="button" className="btn btn-primary mb-2">Update</button></Link>
                <button className="btn btn-primary"
                  disabled={deleting}
                  value={tblDat.id}
                  onClick={e => clickHandlerDelete(e.target.value, tblDat.no_klasifikasi)}
                  type="button"
                  style={{ marginLeft: 'auto', background: 'rgb(247,75,75)' }}
                >{deleting ? 'Hapus... ' : ' Hapus'}</button>
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