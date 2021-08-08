//@ts-check

import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

export default function updateDenda() {
  const [_nama, setNama] = useState('')
  const [_nis, setNis] = useState('')
  const [_index_buku, setBuku] = useState('')
  const [_tgl_tempo, setTglTempo] = useState('')
  const [_tgl_kembali, setTglKembali] = useState('')
  const [_denda, setDenda] = useState('')
  const [_status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { nis, index_buku, tgl_tempo, tgl_kembali, denda, status, id, nisLama, index_buku_lama, nama } = router.query
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'
  useEffect(() => {
    if (typeof nis == 'string') {
      setNis(nis)
    }
    if (typeof index_buku == 'string') {
      setBuku(index_buku)
    }
    if (typeof tgl_tempo == 'string') {
      setTglTempo(tgl_tempo)
    }
    if (typeof tgl_kembali == 'string') {
      setTglKembali(tgl_kembali)
    }
    if (typeof denda == 'string') {
      setDenda(denda)
    } if (typeof status == 'string') {
      setStatus(status)
    } if (typeof nama == 'string') {
      setNama(nama)
    }
  }, [nis, index_buku, tgl_tempo, tgl_kembali, denda, status, id])

  //Darul Anwar
  //  const checkNisFormat = (value) => {
  //   let arrNis = value.split('')
  //   if(arrNis.length == 12 && arrNis[4] == '/' && arrNis[8] == '.'){
  //     setNis(value)
  //   }
  //   else{
  //     setNis(value)
  //     alert('Format Nim Salah, Mohon untuk diperbaiki, Contoh Penulisan : 1111/111.111')
  //   } 
  // }

  //Nurut Taqwa
  // const checkNisFormat = (value) => {
  //   let arrNis = value.split('')
  //   if(arrNis.length == 13 && arrNis[4] == '/' && arrNis[9] == '.'){
  //     setNis(value)
  //   }
  //   else{
  //     setNis(value)
  //     alert('Format Nim Salah, Mohon untuk diperbaiki, Contoh Penulisan : 1111/1111.111')
  //   } 
  // }

  async function submitHandler(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${http}://${host}/api/update-denda`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nis: _nis,
          index_buku: _index_buku,
          tgl_tempo: _tgl_tempo,
          tgl_kembali: _tgl_kembali,
          denda: _denda,
          status: _status,
          id: id
        }),
      })
      const json = await res.json()
      setSubmitting(false)
      if (!res.ok) throw Error(json.message)
      alert("Update data suskses")
      Router.push('/admin/data-denda')
    } catch (e) {
      throw Error(e.message)
    }
  }

  //Darul Anwar
  async function checkNis(nis) {
    let arrNis = nis.split('')
    const data = await fetch(`${http}://${host}/api/nis?nis=${nis}`)
    const hasil = await data.json()
    let alert = document.getElementById('checkErrorNis')
    console.log(hasil)
    if (arrNis.length == 12 && arrNis[4] == '/' && arrNis[8] == '.') {
      setNis(nis)
      if (hasil.length < 1 && nis != nisLama) {
        alert.innerHTML = (`${nis} tidak ada, pastikan menggunakan NIS yang sudah ada`)
        setNama('')
        setNis('')
      } else {
        setNis(nis)
        setNama(hasil[0].nama)
        alert.innerHTML = ''
      }
    }
    else {
      setNis(nis)
      setNama('')
      alert.innerHTML = ('Format NIS Salah, Mohon untuk diperbaiki, Contoh Penulisan : 1111/111.111')
    }
  }

  // Nurut Taqwa
  async function checkNis(nis) {
    let arrNis = nis.split('')
    const data = await fetch(`${http}://${host}/api/nis?nis=${nis}`)
    const hasil = await data.json()
    console.log(hasil)
    let alert = document.getElementById('checkErrorNis')
    if (arrNis.length == 13 && arrNis[4] == '/' && arrNis[9] == '.') {
      setNis(nis)
      if (hasil.length < 1 && nis != nisLama) {
        alert.innerHTML = (`${nis} tidak ada, pastikan menggunakan NIS yang sudah ada`)
        setNis('')
        setNama('')
      } else {
        setNis(nis)
        setNama(hasil[0].nama)
        alert.innerHTML = ''
      }
    }
    else {
      setNis(nis)
      setNama('')
      alert.innerHTML = ('Format NIS Salah, Mohon untuk diperbaiki, Contoh Penulisan : 1111/1111.111')
    }
  }

  async function checkNoIndexBuku(index_buku) {
    const data = await fetch(`${http}://${host}/api/index_buku?index_buku=${index_buku}`)
    const hasil = await data.json()
    let alert = document.getElementById('checkErrorIndexBuku')
    console.log(hasil)
    if (hasil.length < 1 && index_buku != index_buku_lama) {
      alert.innerHTML = (`${index_buku} tidak ada, pastikan menggunakan No Index Buku yang sudah ada`)
      setBuku('')
    } else {
      setBuku(index_buku)
      alert.innerHTML = ''
    }
  }

  return (
    <div id="wrapper" style={{ width: 'auto' }} onSubmit={submitHandler}>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">

          <div className="container-fluid">
            <h3 className="text-dark mb-4">Update Data Denda</h3>
            <div className="row mb-3">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col" style={{ width: '489.328px' }}>
                    <div className="card shadow mb-3" style={{ width: '516.328px' }}>
                      <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">Update Denda</p>
                      </div>
                      <div className="card-body">

                        <form >
                          <div className="row">
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="username"><strong>NIS</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="text" id="nis"
                                  name="username"
                                  value={_nis}
                                  onChange={(e) => setNis(e.target.value)}
                                  onBlur={(e) => checkNis(e.target.value)}
                                  required
                                  
                                />
                                </div>
                                <p id="checkErrorNis" style={{ color: 'red' }}></p>
                            </div>
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="email"><strong>No Induk Buku</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="index_buku"
                                  name="email"
                                  value={_index_buku}
                                  onChange={(e) => setBuku(e.target.value)}
                                  onBlur={(e) => checkNoIndexBuku(e.target.value)}
                                  required
                                /></div>
                                <p id="checkErrorIndexBuku" style={{ color: 'red' }}></p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Nama Siswa</strong><br /></label>
                                <input
                                  className="form-control"
                                  type=" text"
                                  value={_nama}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="date"><strong>Tanggal Tempo</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="date" id="tgl_terlambat"
                                  name="username"
                                  value={_tgl_tempo}
                                  onChange={(e) => setTglTempo(e.target.value)}
                                /></div>
                            </div>
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="date"><strong>Tanggal Kembali</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="date" id="tgl_terlambat"
                                  name="username"
                                  value={_tgl_kembali}
                                  onChange={(e) => setTglKembali(e.target.value)}
                                /></div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Denda</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="text" id="denda"
                                  name="email"
                                  value={_denda}
                                  onChange={(e) => setDenda(e.target.value)}
                                  required
                                /></div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Status</strong><br /></label>
                                <select
                                  className="form-control form-control-sm form-select"
                                  value={_status}
                                  onChange={(e) => setStatus(e.target.value)}
                                  required
                                >
                                  <option></option>
                                  <option value="Belum Mengumpulkan Rangkuman">Belum Mengumpulkan Rangkuman</option>
                                  <option value="Sudah Mengumpulkan Rangkuman">Sudah Mengumpulkan Rangkuman</option>
                                </select></div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <button
                              className="btn btn-primary btn-sm"
                              type="submit"
                              style={{ padding: '11px 8px', fontSize: 17, marginTop: 11 }}
                              disabled={submitting}
                            > {submitting ? 'Saving ...' : 'Save'}
                            </button></div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up" /></a>
    </div>


  )
}