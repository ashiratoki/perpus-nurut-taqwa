//@ts-check
import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

export default function updateKlasifikasi() {
  const data = []
  const [_no_klasifikasi, setNoKlasifikasi] = useState('')
  const [_judul, setJudul] = useState('')
  const [_pengarang, setPengarang] = useState('')
  const [_penerbit, setPenerbit] = useState('')
  const [_tahun_terbit, setTahunTerbit] = useState('')
  const [_stok, setStok] = useState('')
  const [_tersedia, setTersedia] = useState('')
  const [_gambar, setGambar] = useState(null)
  const [_rak, setRak] = useState('')
  const [_baris, setBaris] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [file, setFile] = useState('')
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const { no_klasifikasi, judul, pengarang, penerbit, tahun_terbit, stok, tersedia, gambar, rak, baris, id, no_klasifikasi_lama } = router.query

  // async function checkNoKlasifikasi(no_klasifikasi) {
  //   const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${no_klasifikasi}`)
  //   const hasil = await data.json()
  //   console.log(hasil)
  //   if (hasil.length >= 1 && no_klasifikasi != no_klasifikasi_lama) {
  //     alert(`${no_klasifikasi} sudah terdaftar`)
  //     setNoKlasifikasi('')
  //   }
  // }

  //Darul Anwar
  async function checkNoKlasifikasi(value) {
    let arrNK = value.split('')
    const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${value}`)
    const hasil = await data.json()
    let alert = document.getElementById('checkErrorNoKlasifikasi')
    if(arrNK.length == 5 && arrNK[3] == '.'){
      setNoKlasifikasi(value)
      if (hasil.length >= 1 && value != no_klasifikasi_lama) {
        alert.innerHTML = (`No. Klasifikasi ${value} sudah terdaftar`)
        setNoKlasifikasi('')
      }else{
        setNoKlasifikasi(value)
        alert.innerHTML = ''
      }
    }
    else{
      setNoKlasifikasi(value)
      alert.innerHTML = ('Format Penulisan No.Klasifikasi Salah, Mohon untuk diperbaiki, Contoh Penulisan : 006.6')
    } 
  }

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
    // if(arrNK.length >= 4 && (arrAlphabet.indexOf(arrNK[0])>-1) && arrNK[4] == '.' 
    //     // && (arrAlphabet.indexOf(arrNK[6])>-1) && (arrAlphabet.indexOf(arrNK[7])>-1) && (arrAlphabet.indexOf(arrNK[8])>-1)
    //     // && (arrNumber.indexOf(arrNK[1])>-1) && (arrNumber.indexOf(arrNK[2])>-1) && (arrNumber.indexOf(arrNK[3])>-1)
    //     // && (arrNumber.indexOf(arrNK[5])>-1)
    //     ){
      setNoKlasifikasi(value)
      if (hasil.length >= 1 && value != no_klasifikasi_lama) {
        alert.innerHTML = (`No. Klasifikasi ${value} sudah terdaftar`)
        setNoKlasifikasi('')
      }else{
        setNoKlasifikasi(value)
        alert.innerHTML = ''
      }
    // }
    // else{
    //   setNoKlasifikasi(value)
    //   alert.innerHTML = ('Format Penulisan No.Klasifikasi Salah, Mohon untuk diperbaiki, Contoh Penulisan : P629.4SUR')
    // } 
  }

  async function getGambar(no_klasifikasi) {
    const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${no_klasifikasi}`)
    const hasil = await data.json()
    setGambar(hasil[0].gambar)
  }

  const onSelectImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    const _file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = function () {
      setFile(_file);
      setGambar(reader.result);
    }
    reader.readAsDataURL(_file)
  }

  useEffect(() => {
    getGambar(no_klasifikasi_lama)
    if (typeof no_klasifikasi == 'string') {
      setNoKlasifikasi(no_klasifikasi)
    }
    if (typeof judul == 'string') {
      setJudul(judul)
    }
    if (typeof pengarang == 'string') {
      setPengarang(pengarang)
    }
    if (typeof penerbit == 'string') {
      setPenerbit(penerbit)
    }
    if (typeof tahun_terbit == 'string') {
      setTahunTerbit(tahun_terbit)
    }
    if (typeof stok == 'string') {
      setStok(stok)
    }
    if (typeof tersedia == 'string') {
      setTersedia(tersedia)
    }
    if (typeof rak == 'string') {
      setRak(rak)
    }
    if (typeof baris == 'string') {
      setBaris(baris)
    }
  }, [no_klasifikasi, judul, pengarang, penerbit, tahun_terbit, stok, tersedia, gambar, rak, baris, id])

  async function submitHandler(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${http}://${host}/api/update-klasifikasi`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          no_klasifikasi: _no_klasifikasi,
          judul: _judul,
          pengarang: _pengarang,
          penerbit: _penerbit,
          tahun_terbit: _tahun_terbit,
          stok: _stok,
          tersedia: _tersedia,
          gambar: _gambar,
          rak: _rak,
          baris: _baris,
          id: id
        }),
      })
      const json = await res.json()
      setSubmitting(false)
      if (!res.ok) throw Error(json.message)

      alert(`Update Data Sukses`)
      Router.push('/admin/data-klasifikasi')
    } catch (e) {
      throw Error(e.message)
    }
  }
  return (
    <div id="wrapper" style={{ width: 'auto' }}>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">

          <div className="container-fluid">
            <h3 className="text-dark mb-4">Update Klasifikasi</h3>
            <div className="row mb-3">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col" style={{ width: '489.328px' }}>
                    <div className="card shadow mb-3" style={{ width: '800px' }}>
                      <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">Update Data Klasifikasi Buku</p>
                      </div>
                      <div className="card-body">
                        <form onSubmit={submitHandler}>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="index_buku"><strong>No Klasifikasi</strong>&nbsp;<br /></label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="index_buku"
                                  value={_no_klasifikasi}
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
                              <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Judul Buku</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="judul"
                                  value={_judul}
                                  onChange={(e) => setJudul(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Pengarang</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="pengarang"
                                  value={_pengarang}
                                  onChange={(e) => setPengarang(e.target.value)}
                                  required
                                /></div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Penerbit</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="username"
                                  value={_penerbit}
                                  onChange={(e) => setPenerbit(e.target.value)}
                                  required
                                /></div>
                            </div>
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Tahun Terbit</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="email"
                                  value={_tahun_terbit}
                                  onChange={(e) => setTahunTerbit(e.target.value)}
                                  required
                                /></div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Stok</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="username"
                                  value={_stok}
                                  onChange={(e) => setStok(e.target.value)}
                                  required
                                /></div>
                            </div>
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Tersedia</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="email"
                                  value={_tersedia}
                                  onChange={(e) => setTersedia(e.target.value)}
                                  required
                                /></div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">

                              <label htmlFor="upload">
                                <strong>
                                  Gambar Sampul Buku
                                    </strong>
                              </label>
                              <input
                                className='form-control'
                                id="uploadGambar"
                                type="file"
                                onChange={onSelectImage}
                              />

                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Rak</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="username-2"
                                  value={_rak}
                                  onChange={(e) => setRak(e.target.value)}
                                  required
                                /></div>
                            </div>
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Baris</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="username-2"
                                  value={_baris}
                                  onChange={(e) => setBaris(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Gambar Sampul Buku</strong><br /></label></div>
                            </div>
                            <div className="col">
                                <img
                                  src={_gambar}
                                  alt='Gambar Sampul Buku'
                                  style={{ width: '70px', height: '70px' }}
                                />
                            </div>
                          </div>


                          <div className="mb-3">
                            <button
                              className="btn btn-primary btn-sm"
                              type="submit"
                              style={{ padding: '11px 8px', fontSize: 17, marginTop: 11 }}>
                              Update</button></div>
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