//@ts-check
import TableTransaksi from "../../components/admin/tableTransaksi"
import { useState } from 'react'

export default function TambahTransaksi() {


  const data = []
  const [nis, setNis] = useState('')
  const [nama, setNama] = useState('')
  const [index_buku, setIndexBuku] = useState('')
  const [tgl_pinjam, setTglPinjam] = useState('')
  const [tgl_tempo, setTglTempo] = useState('')
  const [tgl_kembali, setTglKembali] = useState('')
  const [no_klasifikasi, setNoKlasifikasi] = useState('')
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'

  const callTanggal = (value) => {
    setTglTempo(value)
    setTglKembali('belum kembali')
  }
  const clearInput = () => {
    setNis('')
    setIndexBuku('')
    setNoKlasifikasi('')
    setTglPinjam('')
    setTglTempo('')
    setTglKembali('')
  }

  //Darul Anwar
  // const checkNisFormat = (value) => {
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


  //Darul Anwar
  async function checkNis(nis) {
    let arrNis = nis.split('')
    const data = await fetch(`${http}://${host}/api/nis?nis=${nis}`)
    const hasil = await data.json()
    let alert = document.getElementById('checkErrorNis')
    console.log(hasil)
    if(arrNis.length == 12 && arrNis[4] == '/' && arrNis[8] == '.'){
      setNis(nis)
      if (hasil.length < 1) {
        alert.innerHTML = (`${nis} tidak ada, pastikan menggunakan NIS yang sudah ada`)
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
        alert.innerHTML = (`${nis} tidak ada, pastikan menggunakan NIS yang sudah ada`)
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

  async function checkNoIndexBuku(value) {
    const data1 = await fetch(`${http}://${host}/api/index_buku?index_buku=${value}`)
    const hasil1 = await data1.json()
    let alert = document.getElementById('checkErrorIndexBuku')
    // const data2 = await fetch(`${http}://${host}/api/index_buku?index_buku=${index_buku_lama}`)
    // const hasil2 = await data2.json()
    // console.log(hasil1)
    // console.log(hasil2)
    if (hasil1.length < 1) {
      alert.innerHTML = (`${value} tidak ada, pastikan menggunakan No. Index yang sudah ada`)
      setIndexBuku('')
      setNoKlasifikasi('')  
    }else{
      alert.innerHTML = ''
      setNoKlasifikasi(hasil1[0].no_klasifikasi)
    }
  }

  //Lama
  // async function checkNoKlasifikasi(no_klasifikasi) {
  //   const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${no_klasifikasi}`)
  //   const hasil = await data.json()
  //   console.log(hasil)
  //   if (hasil.length < 1) {
  //     alert(`${no_klasifikasi} tidak ada, pastikan menggunakan No Klasifikasi yang sudah ada`)
  //     setNoKlasifikasi('')
  //   }
  // }

  // Darul Anwar
  // async function checkNoKlasifikasi(value) {
  //   let arrNK = value.split('')
  //   const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${value}`)
  //   const hasil = await data.json()
  //   let alert = document.getElementById('checkErrorNoKlasifikasi')
  //   console.log(hasil)
  //   if(arrNK.length == 5 && arrNK[3] == '.'){
  //     setNoKlasifikasi(value)
  //     if (hasil.length < 1) {
  //       alert.innerHTML = (`No. Klasifikasi ${value} tidak ada, pastikan menggunakan No. Klasifikasi yang sudah ada`)
  //       setNoKlasifikasi('')
  //     }else{
  //       setNoKlasifikasi(value)
  //       alert.innerHTML = ''
  //     }
  //   }
  //   else{
  //     setNoKlasifikasi(value)
  //     alert.innerHTML = ('Format Penulisan No.Klasifikasi Salah, Mohon untuk diperbaiki, Contoh Penulisan : 006.6')
  //   } 
  // }

  //Nurut Taqwa
  async function checkNoKlasifikasi(value) {
    let arrNK = value.split('')
    let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let arrAlphabet = alphabet.split('')
    let number = '1234567890'
    let arrNumber = number.split('')
    const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${value}`)
    const hasil = await data.json()
    let alert = document.getElementById('checkErrorNoKlasifikasi')
    console.log(hasil)
    console.log((arrAlphabet.indexOf(arrNK[0])>-1), arrNK[4] == '.', 
    (arrAlphabet.indexOf(arrNK[6])>-1), (arrAlphabet.indexOf(arrNK[7])>-1), (arrAlphabet.indexOf(arrNK[8])>-1),
    (arrNumber.indexOf(arrNK[1])>-1), (arrNumber.indexOf(arrNK[2])>-1), (arrNumber.indexOf(arrNK[3])>-1),
    (arrNumber.indexOf(arrNK[5])>-1))
    if(arrNK.length == 9 && (arrAlphabet.indexOf(arrNK[0])>-1) && arrNK[4] == '.' 
        && (arrAlphabet.indexOf(arrNK[6])>-1) && (arrAlphabet.indexOf(arrNK[7])>-1) && (arrAlphabet.indexOf(arrNK[8])>-1)
        && (arrNumber.indexOf(arrNK[1])>-1) && (arrNumber.indexOf(arrNK[2])>-1) && (arrNumber.indexOf(arrNK[3])>-1)
        && (arrNumber.indexOf(arrNK[5])>-1)
        ){
      setNoKlasifikasi(value)
      if (hasil.length < 1) {
        alert.innerHTML = (`No. Klasifikasi ${value} tidak ada, pastikan menggunakan No.Klasifikasi yang sudah ada`)
        setNoKlasifikasi('')
      }else{
        setNoKlasifikasi(value)
        alert.innerHTML = ''
      }
    }
    else{
      setNoKlasifikasi(value)
      alert.innerHTML = ('Format Penulisan No.Klasifikasi Salah, Mohon untuk diperbaiki, Contoh Penulisan : P629.4SUR')
    } 
  }

  async function minusTersedia(e) {
    e.preventDefault()
    try {
      const res = await fetch(`${http}://${host}/api/update-tersedia`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          no_klasifikasi

        }),
      })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)

      alert(`Update Buku Sukses ${no_klasifikasi}`)
    } catch (e) {
      throw Error(e.message)
    }
  }

  async function submitHandler(e) {
    // setSubmitting(true)
    e.preventDefault()
    try {
      const res = await fetch(`${http}://${host}/api/create-transaksi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nis,
          index_buku,
          no_klasifikasi,
          tgl_pinjam,
          tgl_tempo,
          tgl_kembali
        }),
      })
      // setSubmitting(false)
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      // Router.push('/')
      clearInput()
      minusTersedia(e)
      alert("Penambahan Data Sukses")
    } catch (e) {
      throw Error(e.message)
    }
  }
  return (
    <div>
      <div className="container-fluid">
        <h3 className="text-dark mb-4">Tambah Peminjaman</h3>
        <div className="row mb-3">
          <div className="col-lg-8">

            <div className="row">
              <div className="col">
                <div className="card shadow mb-3">
                  <div className="card-header py-3">
                  </div>
                  <div className="card-body">
                    <form id="Form-Transaksi" onSubmit={submitHandler}>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3"><label className="form-label" htmlFor="username"><strong>NIS</strong><br /></label>
                            <input
                              className="form-control"
                              type="text"
                              id="namaPengembalian"
                              value={nis}
                              onChange={(e) => setNis(e.target.value)}
                              onBlur={(e) => checkNis(e.target.value)}
                              required
                            />
                            <p id="checkErrorNis" style={{ color: 'red' }}></p>
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3"><label className="form-label" htmlFor="email"><strong>No Induk Buku</strong></label>
                            <input
                              className="form-control"
                              type="text"
                              id="siswaPengembalian"
                              value={index_buku}
                              onChange={(e) => setIndexBuku(e.target.value)}
                              onBlur={(e) => checkNoIndexBuku(e.target.value)}
                              required
                            />
                            <p id="checkErrorIndexBuku" style={{ color: 'red' }}></p>
                          </div>
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
                          <div className="mb-3"><label className="form-label" htmlFor="username"><strong>No Klasifikasi Buku</strong><br /></label>
                            <input
                              className="form-control"
                              type="text"
                              id="namaPengembalian"
                              value={no_klasifikasi}
                              onChange={(e) => setNoKlasifikasi(e.target.value)}
                              readOnly
                              required
                            />
                            <p id="checkNoKlasifikasi" style={{ color: 'red' }}></p>
                          </div>
                        </div>
                      </div>
                      <div className="row" id="Tanggal">
                        <div className="col" id="tgl-pinjam">
                          <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>Tanggal Pinjam</strong></label>
                            <input
                              className="form-control"
                              type="date"
                              value={tgl_pinjam}
                              onChange={(e) => setTglPinjam(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col" id="tgl-tempo">
                          <div className="mb-3"><label className="form-label" htmlFor="judul Buku"><strong>Tanggal Tempo</strong></label>
                            <input
                              className="form-control"
                              type="date"
                              value={tgl_tempo}
                              onChange={(e) => callTanggal(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                      </div>

                      <div className="mb-3">
                        <button
                          className="btn btn-primary btn-sm"
                          type="submit"
                          style={{ padding: '11px 8px', fontSize: 17, marginTop: 11 }}
                        >Tambah Transaksi</button>
                        <button className="btn btn-primary btn-sm" type="submit" style={{ padding: '11px 8px', fontSize: 17, marginTop: 11, marginLeft: 39 }}>Scan Barcode</button></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow">
          <div className="card-header py-3">
            <p className="text-primary m-0 fw-bold">Tabel Data Transaksi</p>
          </div>
          <div className="card-body">

            <div className="table-responsive table mt-2" id="dataTable-1" role="grid" style={{ width: "auto" }} aria-describedby="dataTable_info">
              <TableTransaksi />
            </div>

          </div>
        </div>
      </div>
      <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up" /></a>
    </div>


  )
}