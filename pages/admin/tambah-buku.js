//@ts-check
import { useState, useEffect } from 'react'
import TableBuku from '../../components/admin/tableBuku'


export default function TambahBuku() {
  const data = []
  const [index_buku, setIndexBuku] = useState('')
  const [no_klasifikasi, setNoKlasifikasi] = useState('')
  const [judul, setJudul] = useState('')
  const [pengarang, setPengarang] = useState('')
  const [penerbit, setPenerbit] = useState('')
  const [stok, setStok] = useState('')
  const [tersedia, setTersedia] = useState('')
  const [status, setStatus] = useState('')
  const [rak, setRak] = useState('')
  const [baris, setBaris] = useState('')
  const [tgl_masuk, setTglMasuk] = useState('')
  const [gambar, setGambar] = useState('')
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'
  const clearInput = () => {
    setIndexBuku('');
    setNoKlasifikasi('');
    setJudul('');
    setPengarang('');
    setPenerbit('');
    setStok('');
    setTersedia('');
    setStatus('');
    setRak('');
    setBaris('');
    setTglMasuk('');
    setGambar('')
  }

  // Darul Anwar
  // async function checkNoKlasifikasi(value) {
  //   let arrNK = value.split('')
  //   const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${no_klasifikasi}`)
  //   const hasil = await data.json()
  //   let alert = document.getElementById('checkErrorNoKlasifikasi')
  //   console.log(hasil)
  //   if(arrNK.length >= 5 && arrNK[3] == '.'){
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

  // Nurut Taqwa
  async function checkNoKlasifikasi(value) {
    let arrNK = value.split('')
    let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let arrAlphabet = alphabet.split('')
    let number = '1234567890'
    let arrNumber = number.split('')
    let alert = document.getElementById('checkErrorNoKlasifikasi')
    const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${no_klasifikasi}`)
    const hasil = await data.json()
    console.log(hasil)
    console.log((arrAlphabet.indexOf(arrNK[0]) > -1), arrNK[4] == '.',
      (arrAlphabet.indexOf(arrNK[6]) > -1), (arrAlphabet.indexOf(arrNK[7]) > -1), (arrAlphabet.indexOf(arrNK[8]) > -1),
      (arrNumber.indexOf(arrNK[1]) > -1), (arrNumber.indexOf(arrNK[2]) > -1), (arrNumber.indexOf(arrNK[3]) > -1),
      (arrNumber.indexOf(arrNK[5]) > -1))
    // if (arrNK.length >= 9 && (arrAlphabet.indexOf(arrNK[0]) > -1) && arrNK[4] == '.'
    //   && (arrAlphabet.indexOf(arrNK[6]) > -1) && (arrAlphabet.indexOf(arrNK[7]) > -1) && (arrAlphabet.indexOf(arrNK[8]) > -1)
    //   && (arrNumber.indexOf(arrNK[1]) > -1) && (arrNumber.indexOf(arrNK[2]) > -1) && (arrNumber.indexOf(arrNK[3]) > -1)
    //   && (arrNumber.indexOf(arrNK[5]) > -1)
    // ) {
      setNoKlasifikasi(value)
      if (hasil.length < 1) {
        alert.innerHTML = `*No. Klasifikasi ${value} tidak ada, pastikan menggunakan No. Klasifikasi yang sudah ada`
        setNoKlasifikasi('')
      } else {
        setNoKlasifikasi(value)
        alert.innerHTML = ''
      }
    // }
    // else {
    //   alert.innerHTML = '*Format Penulisan No.Klasifikasi Salah, Mohon untuk diperbaiki, Contoh Penulisan : P629.4SUR'
    //   setNoKlasifikasi(value)
    // }

  }

  async function checkNoIndexBuku(index_buku) {
    const data = await fetch(`${http}://${host}/api/index_buku?index_buku=${index_buku}`)
    const hasil = await data.json()
    let alert = document.getElementById('checkErrorIndexBuku')
    console.log(hasil)
    if (hasil.length >= 1) {
      alert.innerHTML = `*${index_buku} sudah terdaftar`
      setIndexBuku('')
    }else{
      alert.innerHTML = ''
    }
  }

  async function submitHandler(e) {
    // setSubmitting(true)
    e.preventDefault()
    try {
      const res = await fetch(`${http}://${host}/api/create-buku`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          index_buku, no_klasifikasi, status, tgl_masuk
        }),
      })
      // setSubmitting(false)
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      // Router.push('/')
      clearInput();
      alert("Penambahan Data Sukses")
    } catch (e) {
      throw Error(e.message)
    }
  }
  return (
    <div id="wrapper" style={{ width: 'auto' }}>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">

          <div className="container-fluid">
            <h3 className="text-dark mb-4">Tambah Data Buku</h3>
            <div className="row mb-3">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col" style={{ width: '489.328px' }}>
                    <div className="card shadow mb-3" style={{ width: '516.328px' }}>
                      <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">Tambah Buku</p>
                      </div>
                      <div className="card-body">
                        <form onSubmit={submitHandler}>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="index_buku"><strong>No Induk Buku</strong>&nbsp;<br /></label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="index_buku"
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
                              <div className="mb-3"><label className="form-label" htmlFor="no_klasifikasi"><strong>No Klasifikasi Buku</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="no_klasifikasi"
                                  value={no_klasifikasi}
                                  onChange={(e) => setNoKlasifikasi(e.target.value)}
                                  onBlur={(e) => checkNoKlasifikasi(e.target.value)}
                                  required
                                />
                              </div>
                              <p id="checkErrorNoKlasifikasi" style={{ color: 'red' }}></p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Tanggal Masuk</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="date"
                                  id="tgl-masuk"
                                  value={tgl_masuk}
                                  onChange={(e) => setTglMasuk(e.target.value)}
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
                                  onChange={(e) => setStatus(e.target.value)}
                                  required
                                >
                                  <option></option>
                                  <option value="Normal">Normal</option>
                                  <option value="Rusak">Rusak</option>
                                  <option value="Hilang">Hilang</option>
                                </select></div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <button
                              className="btn btn-primary btn-sm"
                              type="submit"
                              style={{ padding: '11px 8px', fontSize: 17, marginTop: 11 }}>
                              Tambah Buku</button></div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow">
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">Tabel Buku</p>
              </div>
              <div className="card-body">
                <div className="table-responsive" style={{ maxWidth: "auto" }} id="dataTable-1" role="grid" aria-describedby="dataTable_info">
                  <TableBuku />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}