//@ts-check
import useSWR from 'swr'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'
import Moment from 'react-moment'
import Pagination from '../../components/Pagination'
import {LoginState, SessionState} from '../../service/AtomState'
import {account, } from '../../service'
import { useRecoilState } from 'recoil';

export default function CardPinjamanSaya() {
  const router = useRouter()
  const { nis } = router.query
  // const [user , setUserAccount] = useRecoilState(account);
  // const [session ,setSession] = useRecoilState(SessionState)
  // const [login , setLogin] = useRecoilState(LoginState);
  async function fetcher(url) {
    const res = await fetch(url);
    return res.json();
  }
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'
  const url = `${http}://${host}/api/tb_klasifikasi_pinjaman?nis=${nis}`;

  const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });
  console.log(data)
  if (error) {
    return <div>error......</div>
  }
  if (!data) {
    return <div>loading......</div>
  }

  // const [currentPage, setCurrentPage] = useState(1)
  // const [postsPerPage, setPostsPerPage] = useState(10)

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
  // const howManyPages = Math.ceil(data.length / postsPerPage)


  return (
    <>
    <div className="row" style={{ borderBottomStyle: 'solid', borderBottomColor: 'var(--bs-blue)', marginTop:'70px' }}>
                        <h1 style={{ fontSize: 25 }}>RIWAYAT PEMINJAMAN</h1>
    </div>
      {data.map((tblDat, index) => {
        return (
          <div>
            <div className="row" style={{ borderBottomStyle: 'solid', borderBottomColor: 'var(--bs-blue)' }} key={index}>
              <div className="col-md-4"><img src={tblDat.gambar} style={{ height: 186, width: '141.781px', margin: 6, padding: 5, marginLeft: 83 }} /></div>
              <div className="col" style={{ filter: 'blur(0px)' }}>
                <h1 style={{  color:'black' }}><b>{tblDat.judul}</b></h1>
                <p className="text-black" style={{ color:'black' }}>
                  <b>Index Buku</b> : {tblDat.index_buku} | <b>Tgl-Pinjam</b> : <Moment format="DD/MM/YYYY">{tblDat.tgl_pinjam}</Moment> | <b>Tgl-Tempo</b> : <Moment format="DD/MM/YYYY">{tblDat.tgl_masuk}</Moment><br />
                  <b>Tgl-Kembali</b> : {tblDat.tgl_kembali}
                </p>
              </div>
            </div>
          </div>
        )
      })}
      {/* <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} /> */}
    </>
  )

}
