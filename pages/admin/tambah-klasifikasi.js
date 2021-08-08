//@ts-check
import { useState } from 'react'
import TableKlasifikasi from '../../components/admin/tableKlasifikasi'

export default function TambahBuku() {
  const data = []
  const [no_klasifikasi, setNoKlasifikasi] = useState('')
  const [judul, setJudul] = useState('')
  const [pengarang, setPengarang] = useState('')
  const [penerbit, setPenerbit] = useState('')
  const [tahun_terbit, setTahunTerbit] = useState('')
  const [stok, setStok] = useState('')
  const [tersedia, setTersedia] = useState('')
  const [rak, setRak] = useState('')
  const [baris, setBaris] = useState('')
  const [gambar, setGambar] = useState(null)
  const [selectedFile, setSelectedFile] = useState('')
  const [file, setFile] = useState('')
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'

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

  const clearInput = () => {
    setNoKlasifikasi('');
    setJudul('');
    setPengarang('');
    setPenerbit('');
    setTahunTerbit('');
    setStok('');
    setTersedia('');
    setRak('');
    setBaris('');
    setGambar('');
    setFile('')
    setSelectedFile('')
  }

  //Darul Anwar
  async function checkNoKlasifikasi(value) {
    let arrNK = value.split('')
    const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${value}`)
    const hasil = await data.json()
    let alert = document.getElementById('checkErrorNoKlasifikasi')
    console.log(hasil)
    if(arrNK.length == 5 && arrNK[3] == '.'){
      if (hasil.length >= 1) {
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
    const data = await fetch(`${http}://${host}/api/no_klasifikasi?no_klasifikasi=${value}`)
    const hasil = await data.json()
    let alert = document.getElementById('checkErrorNoKlasifikasi')
    console.log(hasil)
    console.log((arrAlphabet.indexOf(arrNK[0])>-1), arrNK[4] == '.', 
    (arrAlphabet.indexOf(arrNK[6])>-1), (arrAlphabet.indexOf(arrNK[7])>-1), (arrAlphabet.indexOf(arrNK[8])>-1),
    (arrNumber.indexOf(arrNK[1])>-1), (arrNumber.indexOf(arrNK[2])>-1), (arrNumber.indexOf(arrNK[3])>-1),
    (arrNumber.indexOf(arrNK[5])>-1))
    // if(arrNK.length >= 9 && (arrAlphabet.indexOf(arrNK[0])>-1) && arrNK[4] == '.' 
    //     && (arrAlphabet.indexOf(arrNK[6])>-1) && (arrAlphabet.indexOf(arrNK[7])>-1) && (arrAlphabet.indexOf(arrNK[8])>-1)
    //     && (arrNumber.indexOf(arrNK[1])>-1) && (arrNumber.indexOf(arrNK[2])>-1) && (arrNumber.indexOf(arrNK[3])>-1)
    //     && (arrNumber.indexOf(arrNK[5])>-1)
    //     ){
      setNoKlasifikasi(value)
      if (hasil.length >= 1) {
        alert.innerHTML = (`No. Klasifikasi ${no_klasifikasi} sudah terdaftar`)
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

  async function submitHandler(e) {
    // setSubmitting(true)
    e.preventDefault()
    try {
      const res = await fetch(`${http}://${host}/api/create-klasifikasi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          no_klasifikasi, judul, pengarang, penerbit, tahun_terbit, stok, tersedia,
          gambar, rak, baris,
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
            <h3 className="text-dark mb-4">Tambah Data Klasifikasi</h3>
            <div className="row mb-3">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col" style={{ width: '489.328px' }}>
                    <div className="card shadow mb-3" style={{ width: '800px' }}>
                      <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">Tambah Klasifikasi</p>
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
                              <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Judul Buku</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="judul"
                                  value={judul}
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
                                  value={pengarang}
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
                                  value={penerbit}
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
                                  value={tahun_terbit}
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
                                  value={stok}
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
                                  value={tersedia}
                                  onChange={(e) => setTersedia(e.target.value)}
                                  required
                                /></div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Rak</strong><br /></label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="username-2"
                                  value={rak}
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
                                  value={baris}
                                  onChange={(e) => setBaris(e.target.value)}
                                  required
                                />
                              </div>
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
                                required
                              />

                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Gambar Sampul Buku</strong><br /></label></div>
                            </div>
                            <div className="col">
                                <img
                                  src={gambar}
                                  alt="Gambar Sampul Buku"
                                  style={{ width: '70px', height: '70px' }}
                                />
                            </div>
                          </div>

                          <div className="mb-3">
                            <button
                              className="btn btn-primary btn-sm"
                              type="submit"
                              style={{ padding: '11px 8px', fontSize: 17, marginTop: 11 }}>
                              Tambah Klasifikasi Buku</button></div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow">
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">Tabel Klasifikasi Buku</p>
              </div>
              <div className="card-body">
                <div className="table-responsive" style={{ maxWidth: "auto" }} id="dataTable-1" role="grid" aria-describedby="dataTable_info">
                  <TableKlasifikasi />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up" /></a>
    </div>


  )
}