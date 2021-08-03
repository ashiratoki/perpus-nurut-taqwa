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
export default function CardCari(props) {
  const [searchTerm, setSearchTerm] = useState('')
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)
  const http = host === 'localhost:3000' ? 'http' : 'https'
  const url = `${http}://${host}/api/tb_klasifikasi`

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
    <div style={{ marginTop: '100px' }}>
      <div className="col-md-6">

        <form>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Search" onChange={event => { setSearchTerm(event.target.value) }} />
            </InputGroup.Prepend>
            <Link href="/user/cari"><Button className=" btn btn-dark disabled fas fa-search "> </Button></Link>
          </InputGroup>
        </form>
      </div>
      <div className='row'>

        {currentPosts.map((cardBuku, index) =>
          <div className="col-sm-6 mb-4 item">
            <div className="row" key={index}>

              <div className="col-md-12 col-lg-5" style={{ background: 'var(--bs-white)' }}>
                <a href="#"><img
                  className="img-fluid"
                  src={cardBuku.gambar}
                  style={{ height: '203.281px', marginLeft: 38, width: 147 }} />
                </a>
              </div>

              <div className="col" style={{marginTop:'20px'}}>
                <h3 className="name" style={{color:'black'}}>
                  {cardBuku.judul}
                </h3>
                <span style={{color:'black'}}>
                  <b>Tersedia untuk dipinjam : </b> {cardBuku.tersedia} <br/> <b>Penerbit : </b>{cardBuku.penerbit}
                </span><br/>
                <span className="description" style={{ color:'black' }}>
                  <b>Pengarang : </b>{cardBuku.pengarang} <br/> <b> Tahun Terbit : </b> {cardBuku.tahun_terbit}<br />
                </span>

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

            </div>
          </div>
        )}
        <p className='mt-3 mb-3'>Memuat {searchArr.length} hasil Pencarian</p>
        <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
      </div>
    </div>

  )
}

