//@ts-check
import useSWR from 'swr'
import Link from 'next/link'
import { mutate } from 'swr'
import { useState, useEffect } from 'react'
import Pagination from '../../components/Pagination'

async function fetcher(url) {
    const res = await fetch(url);
    return res.json();
}
export default function tableSiswa() {
    const [deleting, setDeleting] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
    const http = host === 'localhost:3000' ? 'http' : 'https'
    const url = `${http}://${host}/api/tb_siswa_angkatan`;
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)

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
        } else if (tblDat.no_telp.toLowerCase().includes(searchTerm.toLowerCase())) {
            return tblDat
        } else if (tblDat.jenis_kelamin.toLowerCase().includes(searchTerm.toLowerCase())) {
            return tblDat
        } else if (tblDat.jurusan.toLowerCase().includes(searchTerm.toLowerCase())) {
            return tblDat
        } else if (tblDat.angkatan.toLowerCase().includes(searchTerm.toLowerCase())) {
            return tblDat
        }
        else if (tblDat.username.toLowerCase().includes(searchTerm.toLowerCase())) {
            return tblDat
        } else if (tblDat.password.toLowerCase().includes(searchTerm.toLowerCase())) {
            return tblDat
        }
    })
    //Fixed Pagination

    let indexOfLastPost = currentPage * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    //Fixed Pagintion CurrentPosts
    let currentPosts = searchArr.slice(indexOfFirstPost, indexOfLastPost)
    //Fixed Pagination CurrentPosts
    let howManyPages = Math.ceil(searchArr.length / postsPerPage)

    async function clickHandlerDelete(value1, value2) {
        const isDelete = confirm(`Apakah Anda Ingin Menghapus data ini dengan NIS ${value2}?`)
        if (isDelete) {
            deleteEntry(value1)
        }
    }

    async function deleteEntry(value) {
        setDeleting(true)
        let res = await fetch(`${http}://${host}/api/delete-siswa?id=${value}`, { method: 'DELETE' })
        let json = await res.json()
        if (!res.ok) throw Error(json.message)
        alert("Data telah dihapus  ")
        mutate(`${http}://${host}/api/tb_siswa`)
        setDeleting(false)
    }

    return (

        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
            <div className="row">
                <div className="col-md-6 text-nowrap">
                    <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"><label className="form-label">Show&nbsp;
                        <select className="d-inline-block form-select form-select-sm" value={postsPerPage} onChange={(e) => { setPostsPerPage(parseInt(e.target.value)) }}>
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
                        <th>Nama</th>
                        <th>No Telp.</th>
                        <th style={{ width: 'auto' }}>Jenis Kelamin</th>
                        <th>Jurusan</th>
                        <th>Angkatan</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map((tblDat, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{tblDat.nis}</td>
                            <td>{tblDat.nama}</td>
                            <td>{tblDat.no_telp}</td>
                            <td>{tblDat.jenis_kelamin}</td>
                            <td>{tblDat.jurusan}</td>
                            <td>{tblDat.angkatan}</td>
                            <td>{tblDat.username}</td>
                            <td>{tblDat.password}</td>

                            <td><div className="btn-group-vertical">
                                <Link href={`/admin/update-siswa?nis=${tblDat.nis}&nama=${tblDat.nama}&no_telp=${tblDat.no_telp}&jenis_kelamin=${tblDat.jenis_kelamin}&jurusan=${tblDat.jurusan}&angkatan=${tblDat.angkatan}&username=${tblDat.username}&password=${tblDat.password}&nisLama=${tblDat.nis}`}
                                ><button type="button" className="btn btn-primary mb-2">Update</button></Link>
                                <button className="btn btn-primary"
                                    disabled={deleting}
                                    value={tblDat.nis}
                                    onClick={e => clickHandlerDelete(e.target.value, tblDat.nis)}
                                    type="button"
                                    style={{ background: 'rgb(247,75,75)' }}
                                >{deleting ? 'Hapus... ' : ' Hapus'}</button>
                            </div>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
            <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
        </div>
    )
}