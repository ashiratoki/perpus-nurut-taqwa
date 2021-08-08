//@ts-check
import { useState } from 'react'
import TableDenda from '../../components/admin/tableDenda'
import Dendaperhari from '../../components/admin/dendaPerhari'
import useSWR from 'swr'
export default function TambahDenda(){
  const [nama, setNama] = useState('')
  const [nis, setNis] = useState('')
  const [index_buku, setBuku] = useState('')
  const [tgl_tempo, setTglTempo] = useState('')
  const [tgl_kembali, setTglKembali] = useState('')
  const [dendaPerHari, setDendaPerHari] = useState()
  const [denda, setDenda] = useState('')
  const [status, setStatus] = useState('')
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'

  const clearInput = () => {
    setNis('')
    setBuku('')
    setTglTempo('')
    setTglKembali('')
    setDenda('')
    setStatus('')
  }

  // Darul Anwar
   async function checkNis(nis) {
    let arrNis = nis.split('')
    const data = await fetch(`${http}://${host}/api/nis?nis=${nis}`)
    const hasil = await data.json()
    let alert = document.getElementById('checkErrorNis')
    console.log(hasil)
    if(arrNis.length == 12 && arrNis[4] == '/' && arrNis[8] == '.'){
      setNis(nis)
      if (hasil.length < 1) {
        alert.innerHTML = (`NIS ${nis} tidak ada, pastikan menggunakan NIS yang sudah ada`)
        setNis('')
        setNama('')
      }else{
        setNis(nis)
        setNama(hasil[0].nama)
        alert.innerHTML = ''
      }
    }
    else{
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
    let alert = document.getElementById('checkErrorNis')
    console.log(hasil)
    if(arrNis.length == 13 && arrNis[4] == '/' && arrNis[9] == '.'){
      setNis(nis)
      if (hasil.length < 1) {
        alert.innerHTML = (`NIS ${nis} tidak ada, pastikan menggunakan NIS yang sudah ada`)
        setNis('')
        setNama('')
      }else{
        setNis(nis)
        setNama(hasil[0].nama)
        alert.innerHTML = ''
      }
    }
    else{
      setNis(nis)
      setNama('')
      alert.innerHTML = ('Format NIS Salah, Mohon untuk diperbaiki, Contoh Penulisan : 1111/1111.111')
    } 
    
  }

  async function checkNoIndexBuku(index_buku){
    const data = await fetch(`${http}://${host}/api/index_buku?index_buku=${index_buku}`)
    const hasil = await data.json()
    let alert = document.getElementById('checkErrorIndexBuku')
    console.log(hasil)
    if(hasil.length < 1){
       alert.innerHTML = (`${index_buku} tidak ada, pastikan menggunakan No Index Buku yang sudah ada`)
       setBuku('')
    }else{
      setBuku(index_buku)
      alert.innerHTML = ''
    }
  }

  async function hitungDenda(){
    const data = await fetch(`${http}://${host}/api/tb_dendaperhari`)
    const hasil = await data.json()
    console.log(hasil)
    let dateTempo = new Date(tgl_tempo)
    let dateKembali = new Date(tgl_kembali)
    let differenceInTime = dateKembali.getTime() - dateTempo.getTime()
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);
    setDendaPerHari(hasil[0].denda_perhari)
    let dendaTemp = parseInt(hasil[0].denda_perhari)
    let denda = dendaTemp * differenceInDays
    console.log(dateTempo)
    console.log(dateKembali)
    console.log(dendaTemp)
    console.log(differenceInDays)
    console.log(denda)
    setDenda(denda.toString())
  }

  const callFunction = (value) => {
    setTglKembali(value)
    hitungDenda()
  }

  async function submitHandler(e) {
    // setSubmitting(true)
    e.preventDefault()
    try {
      const res = await fetch(`${http}://${host}/api/create-denda`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nis,
          index_buku,
          tgl_tempo,
          tgl_kembali,
          denda,
          status
        }),
      })
      // setSubmitting(false)
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      // Router.push('/')
      alert("Penambahan Data Sukses")
      clearInput()
    } catch (e) {
      throw Error(e.message)
    }
  }

    return(
 <div id="wrapper" style={{width: 'auto'}}>
  <div className="d-flex flex-column" id="content-wrapper">
    <div id="content">
      <div className="container-fluid">
        <h3 className="text-dark mb-4">Tambah Data Denda</h3>
        <div className="row mb-3">
          <div className="col-lg-8">
            <div className="row">
              <div className="col" style={{width: '489.328px'}}>
                <div className="card shadow mb-3" style={{width: '516.328px'}}>
                  <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Tambah Denda</p>
                  </div>
                  <div className="card-body">

                    <form onSubmit={submitHandler}>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3"><label className="form-label" htmlFor="username"><strong>NIS</strong><br /></label>
                          <input 
                            className="form-control" 
                            type="text" id="nis" 
                            name="username" 
                            value = {nis} 
                            onChange = {(e) => setNis(e.target.value)}
                            onBlur = {(e) => checkNis(e.target.value)}
                            required
                          /></div>
                          <p id="checkErrorNis" style={{ color: 'red' }}></p>
                        </div>
                        <div className="col">
                          <div className="mb-3"><label className="form-label" htmlFor="email"><strong>No Induk Buku</strong><br /></label>
                          <input 
                            className="form-control" 
                            type="text" 
                            id="index_buku" 
                            name="email" 
                            value = {index_buku} 
                            onChange = {(e) => setBuku(e.target.value)}
                            onBlur = {(e) => checkNoIndexBuku(e.target.value)}
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
                              type="text"
                              value={nama}
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
                            type="date" 
                            value = {tgl_tempo} 
                            onChange = {(e) => setTglTempo(e.target.value)}
                            required
                          /></div>
                        </div>
                        <div className="col">
                          <div className="mb-3"><label className="form-label" htmlFor="date"><strong>Tanggal Kembali</strong><br /></label>
                          <input 
                            className="form-control" 
                            type="date" 
                            name="username" 
                            value = {tgl_kembali} 
                            onChange = {(e) => setTglKembali(e.target.value)}
                            onBlur = {() => hitungDenda()}
                            required
                          /></div>
                        </div>
                      </div>
                      <div className="row">
                      <div className="col">
                            <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Denda Per Hari</strong><br /></label>
                            <input 
                              className="form-control" 
                              type="text" id="denda" 
                              readOnly
                              name="email" 
                              value = {dendaPerHari}
                              required 
                            /></div>
                        </div>
                        <div className="col">
                            <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Denda</strong><br /></label>
                            <input 
                              className="form-control" 
                              type="text" id="denda"  
                              name="email" 
                              readOnly
                              value = {denda} 
                              onChange = {(e) => setDenda(e.target.value)}
                              required
                            /></div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Status</strong><br /></label>
                          <select 
                          className="form-control form-control-sm form-select"
                          value={status}
                          onChange = {(e) => setStatus(e.target.value)}
                          required
                          >
                            <option></option>
                            <option value="Belum Mengumpulkan Rangkuman">Belum Mengumpulkan Rangkuman</option>
                            <option value="Sudah Mengumpulkan Rangkuman">Sudah Mengumpulkan Rangkuman</option>
                          </select></div>
                        </div>
                      </div>
                      
                      
                      <div className="mb-3"><button className="btn btn-primary btn-sm" type="submit" style={{padding: '11px 8px', fontSize: 17, marginTop: 11}}>Tambah Denda</button></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow" style={{width: 'auto'}}>
          <div className="card-header py-3">
            <p className="text-primary m-0 fw-bold">Tabel Denda</p>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 text-nowrap">

              <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
            <Dendaperhari/>
        </div>  
        </div>
            </div>
            <div className="table-responsive table mt-2" style={{maxWidth:"auto"}} id="dataTable-1" role="grid" aria-describedby="dataTable_info">
            <TableDenda/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up" /></a>
</div>

  
    )
}