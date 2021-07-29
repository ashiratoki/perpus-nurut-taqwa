//@ts-check
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react'
import { account, checkUser } from '../../../service'
import useSWR from 'swr'
import Link from 'next/link'
import NotifTransaksi from '../../../components/admin/notifTransaksi'
import NotifTransaksiLewat from '../../../components/admin/notifTransaksiLewat'
import NotifDenda from '../../../components/admin/notifDenda'


async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

export default function header() {
  const [user, setUserAccount] = useRecoilState(account);
  const transaksiCount = <NotifTransaksi/>
  const transaksiLewatCount = <NotifTransaksiLewat/>
  const dendaCount = <NotifDenda/>
  // const [transaksiCount, setTransaksiCount] = useState('')
  // const [transaksiLewatCount, setTransaksiLewatCount] = useState('')
  // const [dendaCount, setDendaCount] = useState('')
  const [transaksiCount1, setTransaksiCount1] = useState(0)
  const [transaksiLewatTempoCount1, setTransaksiLewatTempoCount1] = useState(0)
  const [dendaCount1, setDendaCount1] = useState(0)
  const [notifCount, setNotifCount] = useState(0)
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'

  useEffect(() => {
    callTransaksi()
    callTransaksiLewatTempo()
    callDenda()
    setNotif()

  }, [transaksiCount, transaksiLewatCount, dendaCount, transaksiCount1, transaksiLewatTempoCount1,dendaCount1])

  async function callTransaksi() {
    const data = await fetch(`${http}://${host}/api/tb_transaksi_notifikasi`)
    const hasil = await data.json()
    console.log(hasil)
    setTransaksiCount1(hasil.length)
    // const url = '${http}://${host}/api/tb_transaksi_notifikasi';
    // const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });
    // if (error) {
    //   console.log('eror...')
    // }
    // if (!data) {
    //   console.log('loading....')
    // }
    // console.log(data)
    // setTransaksiCount(data.length)


  }

  async function callTransaksiLewatTempo() {
    const data = await fetch(`${http}://${host}/api/tb_transaksi_notifikasi_lewat`)
    const hasil = await data.json()
    console.log(hasil)
    setTransaksiLewatTempoCount1(hasil.length)
    // const url = '${http}://${host}/api/tb_transaksi_notifikasi_lewat';
    // const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });
    // if (error) {
    //   return <div>error......</div>
    // }
    // if (!data) {
    //   return <div>loading......</div>
    // }
    // console.log(data)
    // setTransaksiLewatTempoCount(data.length)

  }

  async function callDenda() {
    const data = await fetch(`${http}://${host}/api/tb_denda_notifikasi`)
    const hasil = await data.json()
    console.log(hasil)
    setDendaCount1(hasil.length)
    // const url = '${http}://${host}/api/tb_denda_notifikasi';
    // const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });
    // if (error) {
    //   return <div>error......</div>
    // }
    // if (!data) {
    //   return <div>loading......</div>
    // }
    // console.log(data)
    // setDendaCount(data.length)

  }

  const setNotif = () => {
    let hasil = transaksiCount1 + dendaCount1 + transaksiLewatTempoCount1
    setNotifCount(hasil)
    console.log('Transaksi :' + transaksiCount1)
    console.log('Transaksi Lewat Tempo :' + transaksiLewatTempoCount1)
    console.log('Denda :' + dendaCount)
    console.log('Notif :' + notifCount)
  }

  const onLoadHandler = () => {
    callTransaksi()
    callDenda()
    setNotif()

  }



  return (
    <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top" >
      <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars" /></button>
        <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 ">
          <b><h2 style={{ color: "blue" }} > PERPUSTAKAAN  SMK NURUT TAQWA</h2></b>
        </form>
        <ul className="navbar-nav flex-nowrap ms-auto">
          <li className="nav-item dropdown d-sm-none no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i className="fas fa-search" /></a>
            <div className="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
              <form className="me-auto navbar-search w-100">
                <div className="input-group"><input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                  <div className="input-group-append"><button className="btn btn-primary py-0" type="button"><i className="fas fa-search" /></button></div>
                </div>
              </form>
            </div>
          </li>
          <li className="nav-item dropdown no-arrow mx-1">
            <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
              {/* Notif Here */}
              <span className="badge bg-danger badge-counter">{notifCount}</span><i className="fas fa-bell fa-fw" />
            </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                <h6 className="dropdown-header">Notifikasi</h6>
                <div className="dropdown-item d-flex align-items-center">
                  <div className="me-3">
                    <div className="bg-primary icon-circle"><i className="fas fa-info text-white" /></div>
                  </div>
                  <div>
                    {/* Transaksi Count */}
                    <NotifTransaksi />
                  </div>
                </div>
                <div className="dropdown-item d-flex align-items-center">
                  <div className="me-3">
                    <div className="bg-primary icon-circle"><i className="fas fa-info text-white" /></div>
                  </div>
                  <div>
                    {/* Transaksi Lewat Tempo Count */}
                    <NotifTransaksiLewat />
                  </div>
                </div>
                <div className="dropdown-item d-flex align-items-center">
                  <div className="me-3">
                    <div className="bg-primary icon-circle"><i className="fas fa-info text-white" /></div>
                  </div>
                  <div>
                    {/* Denda Belum Count */}
                    <NotifDenda />
                  </div>
                </div>
                <div className="dropdown-item text-center small text-gray-500">
                  <Link href="/admin/notifikasi">Lihat Semua Notifikasi</Link>
                </div>

              </div>
            </div>
          </li>
          <li className="nav-item dropdown no-arrow mx-1">
            <div className="shadow dropdown-list dropdown-menu dropdown-menu-end" aria-labelledby="alertsDropdown" />
          </li>

          <div className="d-none d-sm-block topbar-divider" />
          <li className="nav-item dropdown no-arrow">

            <div className="nav-item dropdown no-arrow">
              <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span className="d-none d-lg-inline me-2 text-gray-600 small">{user.nama} </span><i className="fas fa-user-cog" style={{fontSize: 24, color:'black'}} /></a>
              <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                <div />
                <div className="dropdown-item ">
                  <Link href="/" >
                    <a className='text-gray dropdown-item'>
                      <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" />&nbsp;Logout
                    </a>
                  </Link>
                </div>
              </div>

            </div>

          </li>
        </ul>
      </div>
    </nav>


  )
}
