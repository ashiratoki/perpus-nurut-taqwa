//@ts-check

import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import useSWR from 'swr'
import { mutate } from 'swr'
import Moment from 'react-moment'
import Link from 'next/link'



async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}



export default function cardDetail() {
  const router = useRouter()
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const { id } = router.query
  const http = host === 'localhost:3000' ? 'http' : 'https'
  const url = `${http}://${host}/api/tes?id=${id}`;

  const { data, error } = useSWR(url, fetcher);

  if (error) {
    return <div>error......</div>
  }
  if (!data) {
    return <div>loading......</div>
  }

  return (
    <div id="body-buku" style={{ marginTop: '100px' }}>
      <section className="article-clean" style={{ background: 'var(--bs-white)', paddingBottom: 78 }}>
        <div className="container" style={{ paddingTop: '-138px', paddingBottom: '-36px', marginBottom: 20 }}>
          <div className="row">
            <div className="col-lg-10 col-xl-8 offset-lg-1 offset-xl-2">
              <div
                className="m-auto justify-content-lg-center align-items-lg-center"
                id="image"
              ><img
                  className="d-flex d-xl-flex flex-shrink-1 justify-content-center align-items-center justify-content-xl-start align-items-xl-center"
                  src={data[0].gambar}


                  // alt={ini}
                  style={{ width: 200, margin: 'auto' }}
                />
              </div>

              <div className="intro">
                <h1
                  className="text-center"
                  style={{ marginTop: 20 }}
                >{data[0].judul}
                </h1>
              </div>
              <div className="text">
                <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '-2px' }}>Penerbit : {data[0].penerbit}</p>
                <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 0 }}>Pengarang : {data[0].pengarang}</p>
                <h2 style={{ textAlign: 'center', marginBottom: 14, marginTop: 4 }}>Tersedia :{data[0].tersedia}</h2>
              </div>

              <div id="button">
                <Link href={`/user/pinjamansukses?id=${data[0].id}`}>
                  <div className=" ">
                    <div className="text-center">
                      <a
                        className="btn btn-success text-white mt-auto"style={{height:'60px',width:'200px', fontSize:'29px'}}

                      >Pinjam
                      </a>
                    </div>
                  </div>
                </Link>
              </div>

              <div id="button-kembali" style={{ marginTop: 13, marginBottom: '-80px', paddingTop: '-12px', paddingBottom: '-29px' }}>
                <Link href="/user/cari">
                  <div className=" ">
                    <div className="text-center">
                      <a
                        className="btn btn-warning text-white mt-auto" style={{height:'60px',width:'200px', fontSize:'29px'}}

                      >Kembali
                      </a>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}