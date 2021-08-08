//@ts-check
import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Moment from 'react-moment'

export default function updateTransaksi() {
  const data = []
  const [_index_buku, setIndexBuku] = useState('')
  const [_no_klasifikasi, setNoKlasifikasi] = useState('')
  const [_status, setStatus] = useState('')
  const [_tgl_masuk, setTglMasuk] = useState('')
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const { index_buku, no_klasifikasi, status, tgl_masuk, id_buku, index_buku_lama, no_klasifikasi_lama } = router.query
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'
  
  useEffect(() => {
    if (typeof index_buku == 'string') {
      setIndexBuku(index_buku)
    }
    if (typeof no_klasifikasi == 'string') {
      setNoKlasifikasi(no_klasifikasi)
    }
    if (typeof status == 'string') {
      setStatus(status)
    }
    if (typeof tgl_masuk == 'string') {
      setTglMasuk(tgl_masuk)
    }
  }, [index_buku, no_klasifikasi, status, tgl_masuk, id_buku, index_buku_lama])

  //Darul Anwar
  // async function checkNoKlasifikasi(value) {
  //   let arrNK = value.split('')
  //   const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${value}`)
  //   const hasil = await data.json()
  //   let alert = document.getElementById('checkErrorNoKlasifikasi')
  //   console.log(hasil)
  //   if (arrNK.length == 5 && arrNK[3] == '.') {
  //     setNoKlasifikasi(value)
  //     if (hasil.length == 0 && value != no_klasifikasi_lama) {
  //       alert.innerHTML = (`No. Klasifikasi ${value} tidak ada, pastikan menggunakan No. Klasifikasi yang sudah ada`)
  //       setNoKlasifikasi('')
  //     } else {
  //       setNoKlasifikasi(value)
  //       alert.innerHTML = ''
  //     }
  //   }
  //   else {
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
    let alert = document.getElementById('checkErrorNoKlasifikasi')
    const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${value}`)
    const hasil = await data.json()
    console.log('array hasil')
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
      if (hasil.length == 0 && value != no_klasifikasi_lama) {
        alert.innerHTML = (`No. Klasifikasi ${value} tidak ada, pastikan menggunakan No. Klasifikasi yang sudah ada`)
        setNoKlasifikasi('')
      } else {
        setNoKlasifikasi(value)
        alert.innerHTML = ''
      }
    // }
    // else {
    //   setNoKlasifikasi(value)
    //   alert.innerHTML = ('Format Penulisan No.Klasifikasi Salah, Mohon untuk diperbaiki, Contoh Penulisan : P629.4SUR')
    // }
  }

  async function checkNoIndexBuku(value) {
    const data1 = await fetch(`${http}://${host}/api/index_buku?index_buku=${value}`)
    const hasil1 = await data1.json()
    let alert = document.getElementById('checkErrorIndexBuku')
    // const data2 = await fetch(`${http}://${host}/api/?index_buku=${index_buku_lama}`)
    // const hasil2 = await data2.json()
    // console.log(hasil1)
    // console.log(hasil2)
    console.log(index_buku_lama)
    if (hasil1.length >= 1 && value != index_buku_lama) {
      alert.innerHTML = (`${value} sudah terdaftar`)
      setIndexBuku('')
    }else{
      alert.innerHTML = ''
    }
  }

  async function submitHandler(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${http}://${host}/api/update-buku`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          index_buku: _index_buku,
          no_klasifikasi: _no_klasifikasi,
          status: _status,
          tgl_masuk: _tgl_masuk,
          id_buku: id_buku
        }),
      })
      const json = await res.json()
      setSubmitting(false)
      if (!res.ok) throw Error(json.message)

      alert(`Update Buku Sukses`)
      Router.push('/admin/data-buku')
    } catch (e) {
      throw Error(e.message)
    }
  }

  // let tgl = <Moment format="MM/DD/YYYY">{_tgl_masuk.toString()}</Moment>

  return (
    <div>
      <div className="container-fluid">
        <h3 className="text-dark mb-4">Update Buku</h3>
        <div className="row mb-3">
          <div className="col-lg-8">
            <div className="row">
              <div className="col">
                <div className="card shadow mb-3">
                  <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Meng-update Buku</p>
                  </div>
                  <div className="card-body">
                    <form id="Form-Transaksi" onSubmit={submitHandler}>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3"><label className="form-label" htmlFor="username"><strong>No. Induk Buku</strong><br /></label>
                            <input
                              className="form-control"
                              type="text"
                              id="namaPengembalian"
                              value={_index_buku}
                              onChange={(e) => setIndexBuku(e.target.value)}
                              onBlur={(e) => checkNoIndexBuku(e.target.value)}
                              required
                            />
                            <p id="checkErrorIndexBuku" style={{ color: 'red' }}></p>
                          </div>
                        </div>
                      </div>
                      <div className="row" id="Tanggal">
                        <div className="row">
                          <div className="col">
                            <div className="mb-3"><label className="form-label" htmlFor="email"><strong>No Klasifikasi Buku</strong></label>
                              <input
                                className="form-control"
                                type="text"
                                id="siswaPengembalian"
                                value={_no_klasifikasi}
                                onChange={(e) => setNoKlasifikasi(e.target.value)}
                                onBlur={(e) => checkNoKlasifikasi(e.target.value)}
                                required
                              />
                              <p id="checkErrorNoKlasifikasi" style={{ color: 'red' }}></p>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className="row" id="Tanggal">
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
                                <option value="Normal">Normal</option>
                                <option value="Rusak">Rusak</option>
                                <option value="Hilang">Hilang</option>
                              </select></div>
                          </div>
                        </div>
                      </div>
                      <div className="row" id="Tanggal">
                        <div className="col" id="tgl-pinjam">
                          <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>Tanggal Masuk Buku</strong></label>
                            <input
                              className="form-control"
                              type="date"
                              value={_tgl_masuk}
                              onChange={(e) => setTglMasuk(e.target.value)}
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
                          disabled={submitting}
                        > {submitting ? 'Updating Buku ...' : 'Update'}</button>
                        <button className="btn btn-primary btn-sm" type="submit" style={{ padding: '11px 8px', fontSize: 17, marginTop: 11, marginLeft: 39 }}>Cetak Barcode</button></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}