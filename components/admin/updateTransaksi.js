//@ts-check
import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

export default function updateTransaksi() {
  const data = []
  const [_nis, setNis] = useState('')
  const [_nama, setNama] = useState('')
  const [_index_buku, setIndexBuku] = useState('')
  const [_no_klasifikasi, setNoKlasifikasi] = useState('')
  const [_tgl_pinjam, setTglPinjam] = useState('')
  const [_tgl_tempo, setTglTempo] = useState('')
  const [_tgl_kembali, setTglKembali] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { nis, index_buku, no_klasifikasi, tgl_pinjam, tgl_tempo, tgl_kembali, id_transaksi, nisLama, index_buku_lama, no_klasifikasi_lama,nama } = router.query
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'
  useEffect(() => {
    if (typeof nis == 'string') {
      setNis(nis)
    }
    if (typeof index_buku == 'string') {
      setIndexBuku(index_buku)
    } if (typeof no_klasifikasi == 'string') {
      setNoKlasifikasi(no_klasifikasi)
    }
    if (typeof tgl_pinjam == 'string') {
      setTglPinjam(tgl_pinjam)
    }
    if (typeof tgl_tempo == 'string') {
      setTglTempo(tgl_tempo)
    }
    if (typeof tgl_kembali == 'string') {
      setTglKembali(tgl_kembali)
    }if (typeof nama == 'string') {
      setNama(nama)
    }
  }, [nis, index_buku, no_klasifikasi, tgl_pinjam, tgl_tempo, tgl_kembali, id_transaksi,nama])

  // Darul Anwar
  async function checkNis(nis) {
    let arrNis = nis.split('')
    const data = await fetch(`${http}://${host}/api/nis?nis=${nis}`)
    const hasil = await data.json()
    let alert = document.getElementById('checkErrorNis')
    console.log(hasil)
    if (arrNis.length == 12 && arrNis[4] == '/' && arrNis[8] == '.') {
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
      if (hasil.length < 1 && nis != nisLama) {
        alert.innerHTML = (`${nis} tidak ada, pastikan menggunakan NIS yang sudah ada`)
        setNis('')
        setNama('')
      }else{
        setNis(nis)
        setNama('')
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

  async function checkNoIndexBuku(index_buku) {
    const data = await fetch(`${http}://${host}/api/index_buku?index_buku=${index_buku}`)
    const hasil = await data.json()
    let alert = document.getElementById('checkErrorIndexBuku')
    console.log(hasil)
    if (hasil.length < 1 && index_buku != index_buku_lama) {
      alert.innerHTML = (`${index_buku} tidak ada, pastikan menggunakan No Index Buku yang sudah ada`)
      setIndexBuku('')
      setNoKlasifikasi('')
    }else if(hasil.length == 1 || index_buku == index_buku_lama){
      setNoKlasifikasi(hasil[0].no_klasifikasi)
      alert.innerHTML = ''
    }
  }

  // async function checkNoKlasifikasi(no_klasifikasi) {
  //   const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${no_klasifikasi}`)
  //   const hasil = await data.json()
  //   console.log(hasil)
  //   if (hasil.length < 1 && no_klasifikasi != no_klasifikasi_lama) {
  //     alert(`${no_klasifikasi} tidak ada, pastikan menggunakan No Klasifikasi yang sudah ada`)
  //     setNoKlasifikasi('')
  //   }
  // }

  //Darul Anwar
  // async function checkNoKlasifikasi(value) {
  //   let arrNK = value.split('')
  //   const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${no_klasifikasi}`)
  //   const hasil = await data.json()
  //   console.log(hasil)
  //   if(arrNK.length == 5 && arrNK[3] == '.'){
  //     setNoKlasifikasi(value)
  //     if (hasil.length < 1 && no_klasifikasi != no_klasifikasi_lama) {
  //       alert(`No. Klasifikasi ${value} tidak ada, pastikan menggunakan No. Klasifikasi yang sudah ada`)
  //       setNoKlasifikasi('')
  //     }else{
  //       setNoKlasifikasi(value)
  //     }
  //   }
  //   else{
  //     setNoKlasifikasi(value)
  //     alert('Format Penulisan No.Klasifikasi Salah, Mohon untuk diperbaiki, Contoh Penulisan : 006.6')
  //   } 
  // }

  //Nurut Taqwa
  // async function checkNoKlasifikasi(value) {
  //   let arrNK = value.split('')
  //   let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  //   let arrAlphabet = alphabet.split('')
  //   let number = '1234567890'
  //   let arrNumber = number.split('')
  //   const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${no_klasifikasi}`)
  //   const hasil = await data.json()
  //   console.log(hasil)
  //   console.log((arrAlphabet.indexOf(arrNK[0])>-1), arrNK[4] == '.', 
  //   (arrAlphabet.indexOf(arrNK[6])>-1), (arrAlphabet.indexOf(arrNK[7])>-1), (arrAlphabet.indexOf(arrNK[8])>-1),
  //   (arrNumber.indexOf(arrNK[1])>-1), (arrNumber.indexOf(arrNK[2])>-1), (arrNumber.indexOf(arrNK[3])>-1),
  //   (arrNumber.indexOf(arrNK[5])>-1))
  //   if(arrNK.length == 9 && (arrAlphabet.indexOf(arrNK[0])>-1) && arrNK[4] == '.' 
  //       && (arrAlphabet.indexOf(arrNK[6])>-1) && (arrAlphabet.indexOf(arrNK[7])>-1) && (arrAlphabet.indexOf(arrNK[8])>-1)
  //       && (arrNumber.indexOf(arrNK[1])>-1) && (arrNumber.indexOf(arrNK[2])>-1) && (arrNumber.indexOf(arrNK[3])>-1)
  //       && (arrNumber.indexOf(arrNK[5])>-1)
  //       ){
  //     setNoKlasifikasi(value)
  //     if (hasil.length < 1 && no_klasifikasi != no_klasifikasi_lama) {
  //       alert(`No. Klasifikasi ${value} tidak ada, pastikan menggunakan No. Klasifikasi yang sudah ada`)
  //       setNoKlasifikasi('')
  //     }else{
  //       setNoKlasifikasi(value)
  //     }
  //   }
  //   else{
  //     setNoKlasifikasi(value)
  //     alert('Format Penulisan No.Klasifikasi Salah, Mohon untuk diperbaiki, Contoh Penulisan : P629.4SUR')
  //   } 
  // }

  async function submitHandler(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${http}://${host}/api/update-transaksi`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nis: _nis,
          index_buku: _index_buku,
          no_klasifikasi: _no_klasifikasi,
          tgl_pinjam: _tgl_pinjam,
          tgl_tempo: _tgl_tempo,
          tgl_kembali: _tgl_kembali,
          id_transaksi: id_transaksi
        }),
      })
      const json = await res.json()
      setSubmitting(false)
      if (!res.ok) throw Error(json.message)

      alert(`Update Data Sukses`)
      Router.push('/admin/data-transaksi')
    } catch (e) {
      throw Error(e.message)
    }
  }
  return (
    <div>
      <div className="container-fluid">
        <h3 className="text-dark mb-4">Update Peminjaman</h3>
        <div className="row mb-3">
          <div className="col-lg-8">
            <div className="row">
              <div className="col">
                <div className="card shadow mb-3">
                  <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Update Peminjaman</p>
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
                              value={_nis}
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
                              value={_index_buku}
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
                              value={_nama}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3"><label className="form-label" htmlFor="email"><strong>No Klasifikasi Buku</strong></label>
                            <input
                              className="form-control"
                              type="text"
                              id="siswaPengembalian"
                              value={_no_klasifikasi}
                              onChange={(e) => setNoKlasifikasi(e.target.value)}
                              readOnly
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row" id="Tanggal">
                        <div className="col" id="tgl-pinjam">
                          <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>Tanggal Pinjam</strong></label>
                            <input
                              className="form-control"
                              type="date"
                              value={_tgl_pinjam}
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
                              value={_tgl_tempo}
                              onChange={(e) => setTglTempo(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                      </div>
                      <div className="col" id="tgl-tempo">
                        <div className="mb-3"><label className="form-label" htmlFor="judul Buku"><strong>Tanggal Kembali</strong></label>
                          <input
                            className="form-control"
                            type="date"
                            value={_tgl_kembali}
                            onChange={(e) => setTglKembali(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-primary btn-sm"
                          type="submit"
                          style={{ padding: '11px 8px', fontSize: 17, marginTop: 11 }}
                          disabled={submitting}
                        > {submitting ? 'Saving ...' : 'Save'}</button>
                        <button className="btn btn-primary btn-sm" type="submit" style={{ padding: '11px 8px', fontSize: 17, marginTop: 11, marginLeft: 39 }}>Scan Barcode</button></div>
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