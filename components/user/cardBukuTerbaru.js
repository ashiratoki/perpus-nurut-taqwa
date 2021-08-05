//@ts-check

import useSWR from 'swr'
import Link from 'next/link'
import { useState } from 'react'
import { Navbar, Nav, InputGroup, Form, FormControl, Button, Container } from 'react-bootstrap'
import Pagination from '../../components/Pagination'


async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}
export default function CarBukuTerbaru(props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(9)
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'

  const url = `${http}://${host}/api/tb_klasifikasi_terbaru`;

  const { data, error } = useSWR(url, fetcher);

  if (error) {
    return <div>error......</div>
  }
  if (!data) {
    return <div>loading......</div>
  }
  //Fixed Pagination
  let searchArr = data.filter((cardBuku) => {
    if (searchTerm == "") {
      return cardBuku
    } else if (cardBuku.judul.toLowerCase().includes(searchTerm.toLowerCase())) {
      return cardBuku
    }

  })
  //Fixed Pagination

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //Fixed Pagintion CurrentPosts hapus filter di bawah
  let currentPosts = searchArr.slice(indexOfFirstPost, indexOfLastPost)
  //Fixed Pagination CurrentPosts
  const howManyPages = Math.ceil(searchArr.length / postsPerPage)


  return (
    <div style={{ marginTop: '50px' }}>

      <div className="col-md-6">
        <form>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Search Buku" onChange={event => { setSearchTerm(event.target.value) }} />
            </InputGroup.Prepend>
            <Link href="/user/cari"><Button className=" btn btn-dark disabled fas fa-search "> </Button></Link>
          </InputGroup>
        </form>
      </div>
      <div className='row'>
        {currentPosts.map((cardBuku, index) =>
          <div
            className="col-sm-6 col-lg-4 item"
            style={{ color: 'var(--bs-dark)' }}>

            <img
              className="img-fluid"
              src={cardBuku.gambar}
              style={{ height: '258.141px' }}
            />
            <h3
              className="name"
              style={{ color: 'var(--bs-dark)' }}
            ><b>{cardBuku.judul}</b>
            </h3>

            <div>
              <h6 style={{color:'black'}}>
                <b>Pengarang : </b>{cardBuku.pengarang}
              </h6>
              <h6 style={{color:'black'}}>
                <b>Penerbit : </b> {cardBuku.penerbit}
              </h6>
              <h6 style={{color:'black'}}>
                <b>Tahun Terbit : </b> {cardBuku.tahun_terbit}
              </h6>
            </div>          

            <p
              className="name"
              style={{ marginBottom: 10, marginTop: 7 }}
            ><b>Tersedia untuk dipinjam : </b>{cardBuku.tersedia}<br />
            </p>

            <Link href={`/user/detailBuku/?id=${cardBuku.id}`}>
              <div className=" ">
                <div className="text-center">
                  <a
                    className="btn btn-success text-white mt-auto"

                  >Pinjam Buku
                  </a>
                </div>
              </div>
            </Link>


          </div>
        )}
        {/* Tambahan Pagination Make Sure Math.ceil adalah searchArr.length */}
        <p className='mt-3 mb-3'>Memuat {searchArr.length} data Buku Terbaru</p>
        <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  )
}